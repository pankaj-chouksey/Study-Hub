import { toast as sonnerToast } from "sonner";

/**
 * Toast notification utilities with pre-configured variants
 * Uses sonner for toast notifications with custom styling
 */

export const toast = {
  /**
   * Success toast - for successful operations
   */
  success: (message: string, description?: string) => {
    return sonnerToast.success(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Error toast - for failed operations
   */
  error: (message: string, description?: string) => {
    return sonnerToast.error(message, {
      description,
      duration: 5000,
    });
  },

  /**
   * Info toast - for informational messages
   */
  info: (message: string, description?: string) => {
    return sonnerToast.info(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Warning toast - for warning messages
   */
  warning: (message: string, description?: string) => {
    return sonnerToast.warning(message, {
      description,
      duration: 4500,
    });
  },

  /**
   * Loading toast - for ongoing operations
   * Returns a toast ID that can be used to update or dismiss the toast
   */
  loading: (message: string, description?: string) => {
    return sonnerToast.loading(message, {
      description,
      duration: Infinity, // Don't auto-dismiss loading toasts
    });
  },

  /**
   * Promise toast - automatically handles loading, success, and error states
   */
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },

  /**
   * Dismiss a specific toast by ID
   */
  dismiss: (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId);
  },

  /**
   * Custom toast with full control
   */
  custom: (message: string, options?: Parameters<typeof sonnerToast>[1]) => {
    return sonnerToast(message, options);
  },
};

/**
 * Pre-configured toast messages for common actions
 */
export const toastMessages = {
  // Upload actions
  upload: {
    success: "Content uploaded successfully!",
    successDescription: "Your content will be visible after admin approval.",
    error: "Failed to upload content",
    errorDescription: "Please try again or contact support.",
    loading: "Uploading content...",
  },

  // Approval actions
  approval: {
    approved: "Content approved successfully",
    rejected: "Content rejected",
    error: "Failed to process approval",
  },

  // Authentication
  auth: {
    loginSuccess: "Welcome back!",
    loginError: "Failed to log in",
    logoutSuccess: "Logged out successfully",
    signupSuccess: "Account created successfully!",
    signupError: "Failed to create account",
    passwordResetSent: "Password reset link sent to your email",
    passwordResetError: "Failed to send password reset link",
  },

  // Content actions
  content: {
    deleted: "Content deleted successfully",
    deleteError: "Failed to delete content",
    updated: "Content updated successfully",
    updateError: "Failed to update content",
    downloaded: "Download started",
    downloadError: "Failed to download content",
  },

  // Discussion actions
  discussion: {
    postCreated: "Post created successfully",
    postError: "Failed to create post",
    commentAdded: "Comment added successfully",
    commentError: "Failed to add comment",
    upvoted: "Upvoted successfully",
    upvoteError: "Failed to upvote",
  },

  // User actions
  user: {
    profileUpdated: "Profile updated successfully",
    profileError: "Failed to update profile",
    followSuccess: "User followed successfully",
    followError: "Failed to follow user",
  },

  // Admin actions
  admin: {
    userBanned: "User banned successfully",
    userUnbanned: "User unbanned successfully",
    userError: "Failed to update user status",
    settingsUpdated: "Settings updated successfully",
    settingsError: "Failed to update settings",
  },

  // Generic messages
  generic: {
    success: "Operation completed successfully",
    error: "Something went wrong",
    loading: "Processing...",
    saved: "Changes saved",
    saveError: "Failed to save changes",
    copied: "Copied to clipboard",
    copyError: "Failed to copy to clipboard",
  },
};
