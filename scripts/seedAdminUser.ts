import bcrypt from "bcryptjs";
import { connectToDatabase } from "../lib/mongodb";
import { UserModel } from "../models/User";

async function seedAdminUser() {
  console.log("Connecting to MongoDB...");
  await connectToDatabase();
  console.log("✓ Connected to MongoDB\n");

  const username = "admin";
  const email = "admin@nothing.tech";
  const rawPassword = "admin123";

  console.log(`Seeding Admin User...`);
  console.log(`  Username: ${username}`);
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${rawPassword}\n`);

  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const adminUser = await UserModel.findOneAndUpdate(
    { username },
    {
      username,
      email,
      passwordHash,
      role: "admin",
    },
    { upsert: true, returnDocument: "after", runValidators: true }
  );

  console.log("✓ Admin User Seeded Successfully!");
  console.log(`  User ID: ${adminUser._id}`);
  console.log(`  Role:    ${adminUser.role}`);
  console.log("\nYou can now login to the admin panel at /admin/login with:");
  console.log(`  Username: admin`);
  console.log(`  Password: admin123\n`);

  process.exit(0);
}

seedAdminUser().catch((err) => {
  console.error("✗ Failed to seed admin user:", err);
  process.exit(1);
});
