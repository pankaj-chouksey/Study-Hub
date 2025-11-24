# Toast Notifications Guide

This guide explains how to use the toast notification system in the Study Platform application.

## Overview

The application uses [Sonner](https://sonner.emilkowal.ski/) for toast notifications, wrapped in a custom utility for consistent styling and messaging across the app.

## Installation

Toast notifications are already configured in the application. The `Toaster` component is included in the root layout and automatically supports light/dark themes.

## Basic Usage

Import the toast utility in your component:

```typescript
import { toast, toastMessages } from "@/lib/toast";
```

### Success Toast

```typescript
// Simple success message
toast.success("Operation completed!");

// With description
toast.success("Upload successful", "Your file has been uploaded");

// Using pre-configured messages
toast.success(
  toastMessages.upload.success,
  toastMessages.upload.successDescription
);
```

### Error Toast

```typescript
// Simple error message
toast.error("Something went wrong");

// With description
toast.error("Upload failed", "Please try again later");

// Using pre-configured messages
toast.error(
  toastMessages.upload.error,
  toastMessages.upload.errorDescription
);
```

### Info Toast

```typescript
toast.info("New features available", "Check out the latest updates");
```

### Warning Toast

```typescript
toast.warning("Session expiring", "Please save your work");
```

### Loading Toast

```typescript
// Show loading toast
const toastId = toast.loading("Processing...");

// Later, dismiss it
toast.dismiss(toastId);

// Or update it to success
toast.dismiss(toastId);
toast.success("Complete!");
```

## Advanced Usage

### Promise Toast

Automatically handles loading, success, and error states:

```typescript
const uploadPromise = uploadFile(file);

toast.promise(uploadPromise, {
  loading: "Uploading file...",
  success: "File uploaded successfully!",
  error: "Failed to upload file",
});
```

With dynamic messages:

```typescript
toast.promise(uploadPromise, {
  loading: "Uploading...",
  success: (data) => `Uploaded ${data.filename}`,
  error: (err) => `Error: ${err.message}`,
});
```

### Custom Toast

For full control:

```typescript
toast.custom("Custom message", {
  description: "Additional details",
  duration: 5000,
  action: {
    label: "Undo",
    onClick: () => console.log("Undo clicked"),
  },
});
```

## Pre-configured Messages

The `toastMessages` object contains pre-configured messages for common actions:

### Upload Actions

```typescript
toastMessages.upload.success // "Content uploaded successfully!"
toastMessages.upload.successDescription // "Your content will be visible after admin approval."
toastMessages.upload.error // "Failed to upload content"
toastMessages.upload.loading // "Uploading content..."
```

### Approval Actions

```typescript
toastMessages.approval.approved // "Content approved successfully"
toastMessages.approval.rejected // "Content rejected"
toastMessages.approval.error // "Failed to process approval"
```

### Authentication

```typescript
toastMessages.auth.loginSuccess // "Welcome back!"
toastMessages.auth.loginError // "Failed to log in"
toastMessages.auth.logoutSuccess // "Logged out successfully"
toastMessages.auth.signupSuccess // "Account created successfully!"
```

### Content Actions

```typescript
toastMessages.content.deleted // "Content deleted successfully"
toastMessages.content.updated // "Content updated successfully"
toastMessages.content.downloaded // "Download started"
```

### Discussion Actions

```typescript
toastMessages.discussion.postCreated // "Post created successfully"
toastMessages.discussion.commentAdded // "Comment added successfully"
toastMessages.discussion.upvoted // "Upvoted successfully"
```

### Generic Messages

```typescript
toastMessages.generic.success // "Operation completed successfully"
toastMessages.generic.error // "Something went wrong"
toastMessages.generic.saved // "Changes saved"
toastMessages.generic.copied // "Copied to clipboard"
```

## Real-world Examples

### Form Submission

```typescript
const handleSubmit = async (formData: FormData) => {
  // Validation
  if (!formData.title) {
    toast.error("Validation Error", "Title is required");
    return;
  }

  // Submit with promise toast
  const submitPromise = fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  toast.promise(submitPromise, {
    loading: "Submitting...",
    success: "Submitted successfully!",
    error: "Failed to submit",
  });
};
```

### File Upload

```typescript
const handleUpload = async (file: File) => {
  const toastId = toast.loading(toastMessages.upload.loading);

  try {
    await uploadFile(file);
    toast.dismiss(toastId);
    toast.success(
      toastMessages.upload.success,
      toastMessages.upload.successDescription
    );
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(
      toastMessages.upload.error,
      toastMessages.upload.errorDescription
    );
  }
};
```

### Copy to Clipboard

```typescript
const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(toastMessages.generic.copied);
  } catch (error) {
    toast.error(toastMessages.generic.copyError);
  }
};
```

### Approval Actions

```typescript
const handleApprove = async (contentId: string) => {
  try {
    await approveContent(contentId);
    toast.success(toastMessages.approval.approved);
  } catch (error) {
    toast.error(toastMessages.approval.error);
  }
};

const handleReject = async (contentId: string) => {
  try {
    await rejectContent(contentId);
    toast.info(toastMessages.approval.rejected);
  } catch (error) {
    toast.error(toastMessages.approval.error);
  }
};
```

## Best Practices

1. **Use pre-configured messages** when available for consistency
2. **Keep messages concise** - users should understand at a glance
3. **Use appropriate toast types**:
   - Success: Completed actions
   - Error: Failed operations
   - Info: Informational updates
   - Warning: Cautionary messages
   - Loading: Ongoing operations
4. **Provide descriptions** for important actions
5. **Use promise toasts** for async operations when possible
6. **Dismiss loading toasts** when operations complete
7. **Don't overuse toasts** - only for important feedback

## Customization

### Duration

```typescript
toast.success("Quick message", { duration: 2000 }); // 2 seconds
toast.error("Important error", { duration: 10000 }); // 10 seconds
```

### Position

The toast position is configured globally in the `Toaster` component. To change it, update the component in `app/layout.tsx`:

```typescript
<Toaster position="top-right" />
```

### Theme

Toasts automatically adapt to the current theme (light/dark mode). The theme is managed by `next-themes` and configured in the `Toaster` component.

## Accessibility

- Toasts include proper ARIA attributes
- Screen readers announce toast messages
- Toasts can be dismissed with keyboard (Escape key)
- Icons provide visual context for different toast types

## API Reference

### toast.success(message, description?)

Shows a success toast.

### toast.error(message, description?)

Shows an error toast.

### toast.info(message, description?)

Shows an info toast.

### toast.warning(message, description?)

Shows a warning toast.

### toast.loading(message, description?)

Shows a loading toast. Returns a toast ID.

### toast.promise(promise, messages)

Shows loading/success/error toasts based on promise state.

### toast.dismiss(toastId?)

Dismisses a specific toast or all toasts if no ID provided.

### toast.custom(message, options?)

Shows a custom toast with full control over options.

## Troubleshooting

### Toasts not appearing

1. Ensure `<Toaster />` is included in your root layout
2. Check that you're importing from `@/lib/toast`
3. Verify the toast is being called (check console logs)

### Toasts not themed correctly

1. Ensure `ThemeProvider` wraps your app
2. Check that `suppressHydrationWarning` is on the `<html>` tag
3. Verify the Toaster component uses `useTheme` hook

### Multiple toasts stacking

This is normal behavior. To limit toasts, dismiss previous ones:

```typescript
toast.dismiss(); // Dismiss all
toast.success("New message");
```
