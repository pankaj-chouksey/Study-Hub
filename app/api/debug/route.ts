import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";
import User from "@/models/User";

/**
 * Debug endpoint to check database state
 * GET /api/debug
 */
export async function GET() {
  try {
    await dbConnect();

    // Get counts
    const userCount = await User.countDocuments();
    const contentCount = await Content.countDocuments();
    const pendingCount = await Content.countDocuments({ status: "pending" });
    const approvedCount = await Content.countDocuments({ status: "approved" });

    // Get sample data
    const users = await User.find().limit(5).lean();
    const pendingContent = await Content.find({ status: "pending" })
      .populate("uploaderId")
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      stats: {
        users: userCount,
        totalContent: contentCount,
        pending: pendingCount,
        approved: approvedCount,
      },
      sampleData: {
        users: users.map((u) => ({
          id: u._id,
          name: u.name,
          email: u.email,
        })),
        pendingContent: pendingContent.map((c) => ({
          id: c._id,
          title: c.title,
          status: c.status,
          uploader: c.uploaderId,
        })),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
