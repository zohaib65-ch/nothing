import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/User";
import { signAdminToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const searchUsername = username.toLowerCase().trim();
    let user = await UserModel.findOne({
      $or: [{ username: searchUsername }, { email: searchUsername }],
    });

    // Auto-create default admin account on first run if missing
    if (!user && (searchUsername === "admin" || searchUsername === "admin@nothing.tech")) {
      const defaultPasswordHash = await bcrypt.hash("admin123", 10);
      try {
        user = await UserModel.create({
          username: "admin",
          email: "admin@nothing.tech",
          passwordHash: defaultPasswordHash,
          role: "admin",
        });
      } catch {
        user = await UserModel.findOne({ username: "admin" });
      }
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signAdminToken({
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user._id.toString(), username: user.username, role: user.role },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 500 });
  }
}
