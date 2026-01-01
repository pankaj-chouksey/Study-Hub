# Email Setup Guide - Password Reset

This guide explains how to set up email sending for password reset functionality using Resend.

## Overview

The platform uses [Resend](https://resend.com) for sending password reset emails. Resend is a modern email API that's easy to set up and provides excellent deliverability.

## Setup Steps

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### 2. Get Your API Key

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Adhyayan Production")
4. Copy the API key (you'll only see it once!)

### 3. Verify Your Domain (Optional but Recommended)

For production, you should verify your domain:

1. Go to [Resend Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `adhyayan.edu`)
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)

**Note:** For testing, you can use Resend's default domain which allows sending to any email address.

### 4. Set Up Environment Variables

Add these to your `.env.local` file (for development) and Vercel environment variables (for production):

```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Email sender address
# Use your verified domain for production: noreply@yourdomain.com
# For testing, use Resend's default: onboarding@resend.dev
RESEND_FROM_EMAIL=Adhyayan <noreply@adhyayan.edu>

# Your app URL (should already exist)
NEXTAUTH_URL=http://localhost:3000  # Development
# NEXTAUTH_URL=https://yourdomain.com  # Production
```

### 5. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `/forgot-password`
3. Enter a valid user email
4. Check the email inbox for the password reset link
5. Click the link and reset your password

## How It Works

1. **User requests password reset** → Enters email on `/forgot-password` page
2. **System generates token** → Creates a secure, time-limited reset token (expires in 1 hour)
3. **Email is sent** → Resend sends a beautifully formatted email with reset link
4. **User clicks link** → Redirected to `/reset-password?token=...`
5. **User sets new password** → Password is hashed and saved, token is invalidated

## Email Template

The password reset email includes:
- Professional HTML design matching Adhyayan branding
- Clear call-to-action button
- Plain text fallback
- Security information (1-hour expiration)
- Direct link as backup

## Troubleshooting

### Emails not sending?

1. **Check API key**: Make sure `RESEND_API_KEY` is set correctly
2. **Check from email**: Ensure `RESEND_FROM_EMAIL` uses a verified domain
3. **Check console**: Look for error messages in server logs
4. **Check Resend dashboard**: View email logs and delivery status

### Development mode fallback

If email sending fails in development, the reset URL is shown in:
- Server console logs
- Toast notification (if enabled)

This allows testing without email setup.

### Rate Limits

Resend free tier: 100 emails/day
- Upgrade for higher limits if needed
- Monitor usage in Resend dashboard

## Security Features

- ✅ Tokens expire after 1 hour
- ✅ Tokens are single-use (invalidated after password reset)
- ✅ Secure token generation (32-byte random hex)
- ✅ No email enumeration (always returns success message)
- ✅ Password hashing with bcrypt (12 rounds)

## Alternative Email Services

If you prefer a different email service, you can modify `lib/email.ts` to use:

- **SendGrid**: Popular, 100 emails/day free
- **AWS SES**: Very cheap, requires AWS account
- **Nodemailer**: Use with any SMTP server (Gmail, Outlook, etc.)
- **Mailgun**: 5,000 emails/month free

## Support

For issues with:
- **Resend service**: Check [Resend Documentation](https://resend.com/docs)
- **Email delivery**: Check spam folder, verify domain
- **Code issues**: Check server logs and error messages

