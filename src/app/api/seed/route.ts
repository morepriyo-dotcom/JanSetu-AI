import { NextResponse } from "next/server";
import { seedDemoData } from "@/lib/complaintsStore";

export async function POST() {
  try {
    const seeded = await seedDemoData();
    return NextResponse.json({
      success: true,
      message: "Successfully seeded 8 realistic civic complaints.",
      count: seeded.length,
      data: seeded,
    });
  } catch (error: any) {
    console.error("API /api/seed error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed demo complaints." },
      { status: 500 }
    );
  }
}
