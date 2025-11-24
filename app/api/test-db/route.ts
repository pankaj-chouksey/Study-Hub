import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

/**
 * Test endpoint to verify MongoDB connection
 * GET /api/test-db
 */
export async function GET() {
  try {
    // Attempt to connect to MongoDB
    await dbConnect();

    // Check connection state
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    const isConnected = connectionState === 1;

    return NextResponse.json({
      success: true,
      message: isConnected
        ? "✅ MongoDB is connected successfully!"
        : "⚠️ MongoDB connection is in progress...",
      details: {
        status: states[connectionState as keyof typeof states],
        database: mongoose.connection.db?.databaseName || "Not connected",
        host: mongoose.connection.host || "Not connected",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "❌ Failed to connect to MongoDB",
        error: error.message,
        hint: "Check your MONGODB_URI in .env.local file",
      },
      { status: 500 }
    );
  }
}
