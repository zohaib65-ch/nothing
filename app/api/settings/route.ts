import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SettingsModel } from "@/models/Settings";
import { INITIAL_SETTINGS } from "@/constants/seedData";

export async function GET() {
  try {
    await connectToDatabase();
    let settings = null;
    try {
      settings = await SettingsModel.findOne({});
    } catch {
      settings = null;
    }

    if (!settings) {
      try {
        settings = await SettingsModel.create(INITIAL_SETTINGS);
      } catch {
        settings = INITIAL_SETTINGS as any;
      }
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(INITIAL_SETTINGS);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    let settings = await SettingsModel.findOne({});
    if (settings) {
      settings = await SettingsModel.findByIdAndUpdate(settings._id, body, { new: true });
    } else {
      settings = await SettingsModel.create(body);
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(INITIAL_SETTINGS);
  }
}
