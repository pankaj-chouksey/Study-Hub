import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

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

    // Generate reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

    // Send password reset email
    const emailResult = await sendPasswordResetEmail({
      email: userWithPassword.email,
      resetUrl,
      userName: userWithPassword.name,
    });

    // If email sending fails, still return success (security best practice)
    // but log the error for debugging
    if (!emailResult.success) {
      console.error("Failed to send password reset email:", emailResult.error);
      // In development, return the URL as fallback
      if (process.env.NODE_ENV === "development") {
        console.log("Password reset link (fallback):", resetUrl);
        return NextResponse.json({
          success: true,
          message: "If an account with that email exists, we've sent a password reset link.",
          resetUrl, // Only in development
        });
      }
    }

    // In development, also log the reset URL for testing
    if (process.env.NODE_ENV === "development") {
      console.log("Password reset link:", resetUrl);
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, we've sent a password reset link.",
        resetUrl, // Only in development
      });
    }

    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, we've sent a password reset link.",
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}

