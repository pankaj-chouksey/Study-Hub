import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email });

    // For security, don't reveal if email exists or not
    // Always return success message
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, we've sent a password reset link.",
      });
    }

    // Check if user has a password (not OAuth-only user)
    const userWithPassword = await User.findOne({ email }).select("+password");
    if (!userWithPassword || !userWithPassword.password) {
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, we've sent a password reset link.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token expires in 1 hour

    // Save reset token to user (need to select resetToken fields)
    userWithPassword.resetToken = resetToken;
    userWithPassword.resetTokenExpiry = resetTokenExpiry;
    await userWithPassword.save();

    // In production, you would send an email here with the reset link
    // For now, we'll return the token in development (remove in production)
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

    // TODO: Send email with reset link
    // await sendPasswordResetEmail(user.email, resetUrl);

    // In development, log the reset URL (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log("Password reset link:", resetUrl);
    }

    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, we've sent a password reset link.",
      // Remove this in production - only for development
      ...(process.env.NODE_ENV === "development" && { resetUrl }),
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}

