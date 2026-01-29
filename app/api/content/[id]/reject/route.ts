import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";

// PUT /api/content/[id]/reject - Reject content
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const content = await Content.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    ).populate("uploaderId", "name email avatar role branch year points createdAt");

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: content,
      message: "Content rejected successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
