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
    if (!title || !type || !uploaderId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title, type, and uploaderId are required" },
        { status: 400 }
      );
    }

    // Description is optional, use empty string if not provided
    const contentDescription = description || ""

    // Validate that either fileUrl or videoUrl is provided
    if (!fileUrl && !videoUrl) {
      return NextResponse.json(
        { success: false, error: "Either fileUrl or videoUrl must be provided" },
        { status: 400 }
      );
    }

    // For content types that require subject and topic (not syllabus/timetable)
    const requiresSubject = type !== "syllabus" && type !== "timetable"
    if (requiresSubject && (!subject || !topic)) {
      return NextResponse.json(
        { success: false, error: "Subject and topic are required for this content type" },
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

    // Create content - always provide defaults for optional fields
    const contentData: any = {
      title,
      description: contentDescription || "",
      type,
      department,
      branch,
      year,
      subject: subject || "",
      topic: topic || "",
      uploaderId,
      tags: tags || [],
      status: "pending",
    };

    // Only include fileUrl or videoUrl if provided
    if (fileUrl) {
      contentData.fileUrl = fileUrl;
    }
    if (videoUrl) {
      contentData.videoUrl = videoUrl;
    }

    const content = await Content.create(contentData);

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
