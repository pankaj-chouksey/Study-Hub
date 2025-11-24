import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";
import User from "@/models/User";

// GET /api/content - Get all content with filters
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const department = searchParams.get("department");
    const branch = searchParams.get("branch");
    const year = searchParams.get("year");
    const subject = searchParams.get("subject");
    const topic = searchParams.get("topic");
    const type = searchParams.get("type");

    const query: any = {};

    if (status) query.status = status;
    if (department) query.department = department;
    if (branch) query.branch = branch;
    if (year) query.year = year;
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;
    if (type) query.type = type;

    const content = await Content.find(query)
      .populate("uploaderId", "name email avatar role branch year points createdAt")
      .sort({ createdAt: -1 })
      .lean();

    // Ensure all content has uploader data (even if populate failed)
    const contentWithUploaders = content.map((item: any) => ({
      ...item,
      uploaderId: item.uploaderId || {
        _id: "unknown",
        name: "Unknown User",
        email: "",
        role: "student",
        branch: "",
        year: "",
        points: 0,
      },
    }));

    return NextResponse.json({ success: true, data: contentWithUploaders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/content - Create new content
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      title,
      description,
      type,
      fileUrl,
      videoUrl,
      department,
      branch,
      year,
      subject,
      topic,
      uploaderId,
      tags = [],
    } = body;

    // Validate required fields
    if (!title || !description || !type || !uploaderId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findById(uploaderId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Create content
    const content = await Content.create({
      title,
      description,
      type,
      fileUrl,
      videoUrl,
      department,
      branch,
      year,
      subject,
      topic,
      uploaderId,
      tags,
      status: "pending",
    });

    // Populate uploader info
    await content.populate("uploaderId", "name email avatar role");

    return NextResponse.json(
      { success: true, data: content },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
