# Module: Backend Functions - send-auth-email Edge Function

> **Module**: 02-backend-functions
> **Status**: Ready for Implementation
> **Dependencies**: None

## Overview

This module contains the complete implementation of the `send-auth-email` Supabase Edge Function that handles the Send Email Auth Hook.

## Edge Function: `send-auth-email`

### Full Implementation

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_SENDER_EMAIL = Deno.env.get("BREVO_SENDER_EMAIL") || "noreply@monolitehr.com";
const BREVO_SENDER_NAME = Deno.env.get("BREVO_SENDER_NAME") || "Monolite HR";
const SEND_EMAIL_HOOK_SECRET = Deno.env.get("SEND_EMAIL_HOOK_SECRET");

interface AuthHookPayload {
  user: {
    id: string;
    email: string;
    user_metadata?: {
      name?: string;
      surname?: string;
      i18n?: string;
      language?: string;
    };
  };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: string;
    site_url: string;
    token_new?: string;
    token_hash_new?: string;
  };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Determine language from user metadata
function getUserLanguage(user: AuthHookPayload["user"]): string {
  const metadata = user.user_metadata;
  if (metadata?.i18n) return metadata.i18n;
  if (metadata?.language) return metadata.language;
  return "en";
}

// Generate confirmation URL with deep link
function generateConfirmationURL(emailData: AuthHookPayload["email_data"]): string {
  const params = new URLSearchParams({
    token_hash: emailData.token_hash,
    type: emailData.email_action_type,
    redirect_to: emailData.redirect_to || "",
  });
  return `monolite-hr://auth/callback?${params.toString()}`;
}

// Get user display name
function getUserName(user: AuthHookPayload["user"]): string {
  const metadata = user.user_metadata;
  if (metadata?.name && metadata?.surname) {
    return `${metadata.name} ${metadata.surname}`;
  }
  if (metadata?.name) return metadata.name;
  return "";
}

// Email templates
const emailTemplates = {
  en: {
    signup: {
      subject: "Confirm Your Email - Monolite HR",
      getHtml: (confirmUrl: string, token: string, userName: string) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; margin: 0;">Monolite HR</h1>
            </div>
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Welcome${userName ? `, ${userName}` : ""}!</h2>
            <p style="margin-bottom: 20px;">Thank you for signing up for Monolite HR. Please confirm your email address to complete your registration.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background-color: #FFD700; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Confirm Email</a>
            </div>
            <p style="margin-bottom: 20px;">Or enter this code manually: <strong>${token}</strong></p>
            <p style="margin-bottom: 20px;">If you didn't create an account, you can safely ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${confirmUrl}</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Monolite HR. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      getText: (confirmUrl: string, token: string, userName: string) => `
Welcome${userName ? `, ${userName}` : ""}!

Thank you for signing up for Monolite HR. Please confirm your email address to complete your registration.

Confirm your email: ${confirmUrl}

Or enter this code manually: ${token}

If you didn't create an account, you can safely ignore this email.

© ${new Date().getFullYear()} Monolite HR. All rights reserved.
      `,
    },
    recovery: {
      subject: "Reset Your Password - Monolite HR",
      getHtml: (confirmUrl: string, token: string) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; margin: 0;">Monolite HR</h1>
            </div>
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Reset Your Password</h2>
            <p style="margin-bottom: 20px;">We received a request to reset your password. Click the button below to choose a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background-color: #FFD700; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Reset Password</a>
            </div>
            <p style="margin-bottom: 20px;">Or enter this code manually: <strong>${token}</strong></p>
            <p style="margin-bottom: 20px;">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            <p style="margin-bottom: 20px;">This link will expire in 24 hours for security reasons.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${confirmUrl}</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Monolite HR. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      getText: (confirmUrl: string, token: string) => `
Reset Your Password - Monolite HR

We received a request to reset your password.

Reset your password: ${confirmUrl}

Or enter this code manually: ${token}

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

This link will expire in 24 hours for security reasons.

© ${new Date().getFullYear()} Monolite HR. All rights reserved.
      `,
    },
    magiclink: {
      subject: "Your Login Link - Monolite HR",
      getHtml: (confirmUrl: string, token: string) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Login Link</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; margin: 0;">Monolite HR</h1>
            </div>
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Your Login Link</h2>
            <p style="margin-bottom: 20px;">Click the button below to log in to your account:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background-color: #FFD700; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Log In</a>
            </div>
            <p style="margin-bottom: 20px;">Or enter this code manually: <strong>${token}</strong></p>
            <p style="margin-bottom: 20px;">If you didn't request this link, you can safely ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${confirmUrl}</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Monolite HR. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      getText: (confirmUrl: string, token: string) => `
Your Login Link - Monolite HR

Click the link below to log in to your account:

${confirmUrl}

Or enter this code manually: ${token}

If you didn't request this link, you can safely ignore this email.

© ${new Date().getFullYear()} Monolite HR. All rights reserved.
      `,
    },
    email_change: {
      subject: "Confirm Email Change - Monolite HR",
      getHtml: (confirmUrl: string, token: string) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Email Change</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; margin: 0;">Monolite HR</h1>
            </div>
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Confirm Email Change</h2>
            <p style="margin-bottom: 20px;">Click the button below to confirm your new email address:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background-color: #FFD700; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Confirm Email Change</a>
            </div>
            <p style="margin-bottom: 20px;">Or enter this code manually: <strong>${token}</strong></p>
            <p style="margin-bottom: 20px;">If you didn't request this change, please contact support immediately.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${confirmUrl}</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Monolite HR. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      getText: (confirmUrl: string, token: string) => `
Confirm Email Change - Monolite HR

Click the link below to confirm your new email address:

${confirmUrl}

Or enter this code manually: ${token}

If you didn't request this change, please contact support immediately.

© ${new Date().getFullYear()} Monolite HR. All rights reserved.
      `,
    },
  },
  it: {
    signup: {
      subject: "Conferma la tua Email - Monolite HR",
      getHtml: (confirmUrl: string, token: string, userName: string) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Conferma la tua Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; margin: 0;">Monolite HR</h1>
            </div>
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Benvenuto/a${userName ? `, ${userName}` : ""}!</h2>
            <p style="margin-bottom: 20px;">Grazie per esserti registrato/a su Monolite HR. Conferma il tuo indirizzo email per completare la registrazione.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background-color: #FFD700; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Conferma Email</a>
            </div>
            <p style="margin-bottom: 20px;">Oppure inserisci questo codice manualmente: <strong>${token}</strong></p>
            <p style="margin-bottom: 20px;">Se non hai creato un account, puoi ignorare questa email in tutta sicurezza.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">Se il pulsante non funziona, copia e incolla questo link nel tuo browser:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${confirmUrl}</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Monolite HR. Tutti i diritti riservati.</p>
          </div>
        </body>
        </html>
      `,
      getText: (confirmUrl: string, token: string, userName: string) => `
Benvenuto/a${userName ? `, ${userName}` : ""}!

Grazie per esserti registrato/a su Monolite HR. Conferma il tuo indirizzo email per completare la registrazione.

Conferma la tua email: ${confirmUrl}

Oppure inserisci questo codice manualmente: ${token}

Se non hai creato un account, puoi ignorare questa email in tutta sicurezza.

© ${new Date().getFullYear()} Monolite HR. Tutti i diritti riservati.
      `,
    },
    recovery: {
      subject: "Reimposta la tua Password - Monolite HR",
      getHtml: (confirmUrl: string, token: string) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reimposta la tua Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; margin: 0;">Monolite HR</h1>
            </div>
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Reimposta la tua Password</h2>
            <p style="margin-bottom: 20px;">Abbiamo ricevuto una richiesta per reimpostare la tua password. Clicca sul pulsante qui sotto per scegliere una nuova password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background-color: #FFD700; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Reimposta Password</a>
            </div>
            <p style="margin-bottom: 20px;">Oppure inserisci questo codice manualmente: <strong>${token}</strong></p>
            <p style="margin-bottom: 20px;">Se non hai richiesto la reimpostazione della password, puoi ignorare questa email. La tua password rimarrà invariata.</p>
            <p style="margin-bottom: 20px;">Questo link scadrà tra 24 ore per motivi di sicurezza.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">Se il pulsante non funziona, copia e incolla questo link nel tuo browser:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${confirmUrl}</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Monolite HR. Tutti i diritti riservati.</p>
          </div>
        </body>
        </html>
      `,
      getText: (confirmUrl: string, token: string) => `
Reimposta la tua Password - Monolite HR

Abbiamo ricevuto una richiesta per reimpostare la tua password.

Reimposta la tua password: ${confirmUrl}

Oppure inserisci questo codice manualmente: ${token}

Se non hai richiesto la reimpostazione della password, puoi ignorare questa email. La tua password rimarrà invariata.

Questo link scadrà tra 24 ore per motivi di sicurezza.

© ${new Date().getFullYear()} Monolite HR. Tutti i diritti riservati.
      `,
    },
    magiclink: {
      subject: "Il tuo Link di Accesso - Monolite HR",
      getHtml: (confirmUrl: string, token: string) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Il tuo Link di Accesso</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; margin: 0;">Monolite HR</h1>
            </div>
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Il tuo Link di Accesso</h2>
            <p style="margin-bottom: 20px;">Clicca sul pulsante qui sotto per accedere al tuo account:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background-color: #FFD700; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Accedi</a>
            </div>
            <p style="margin-bottom: 20px;">Oppure inserisci questo codice manualmente: <strong>${token}</strong></p>
            <p style="margin-bottom: 20px;">Se non hai richiesto questo link, puoi ignorare questa email in tutta sicurezza.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">Se il pulsante non funziona, copia e incolla questo link nel tuo browser:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${confirmUrl}</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Monolite HR. Tutti i diritti riservati.</p>
          </div>
        </body>
        </html>
      `,
      getText: (confirmUrl: string, token: string) => `
Il tuo Link di Accesso - Monolite HR

Clicca sul link qui sotto per accedere al tuo account:

${confirmUrl}

Oppure inserisci questo codice manualmente: ${token}

Se non hai richiesto questo link, puoi ignorare questa email in tutta sicurezza.

© ${new Date().getFullYear()} Monolite HR. Tutti i diritti riservati.
      `,
    },
    email_change: {
      subject: "Conferma Cambio Email - Monolite HR",
      getHtml: (confirmUrl: string, token: string) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Conferma Cambio Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; margin: 0;">Monolite HR</h1>
            </div>
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Conferma Cambio Email</h2>
            <p style="margin-bottom: 20px;">Clicca sul pulsante qui sotto per confermare il tuo nuovo indirizzo email:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background-color: #FFD700; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Conferma Cambio Email</a>
            </div>
            <p style="margin-bottom: 20px;">Oppure inserisci questo codice manualmente: <strong>${token}</strong></p>
            <p style="margin-bottom: 20px;">Se non hai richiesto questo cambio, contatta immediatamente il supporto.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">Se il pulsante non funziona, copia e incolla questo link nel tuo browser:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${confirmUrl}</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} Monolite HR. Tutti i diritti riservati.</p>
          </div>
        </body>
        </html>
      `,
      getText: (confirmUrl: string, token: string) => `
Conferma Cambio Email - Monolite HR

Clicca sul link qui sotto per confermare il tuo nuovo indirizzo email:

${confirmUrl}

Oppure inserisci questo codice manualmente: ${token}

Se non hai richiesto questo cambio, contatta immediatamente il supporto.

© ${new Date().getFullYear()} Monolite HR. Tutti i diritti riservati.
      `,
    },
  },
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Verify webhook signature
    if (!SEND_EMAIL_HOOK_SECRET) {
      console.error("SEND_EMAIL_HOOK_SECRET is not set");
      return new Response(
        JSON.stringify({ error: "Webhook secret not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);

    // Verify the webhook signature
    const hookSecret = SEND_EMAIL_HOOK_SECRET.replace("v1,whsec_", "");
    const wh = new Webhook(hookSecret);

    let verifiedPayload: AuthHookPayload;
    try {
      verifiedPayload = wh.verify(payload, headers) as AuthHookPayload;
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return new Response(
        JSON.stringify({ error: "Invalid webhook signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { user, email_data } = verifiedPayload;

    // Validate required fields
    if (!user?.email || !email_data?.email_action_type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: user.email or email_data.email_action_type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user language and name
    const language = getUserLanguage(user);
    const userName = getUserName(user);
    const confirmUrl = generateConfirmationURL(email_data);

    // Get the appropriate template
    const langTemplates = emailTemplates[language as keyof typeof emailTemplates] || emailTemplates.en;
    const emailType = email_data.email_action_type as keyof typeof langTemplates;
    const template = langTemplates[emailType] || langTemplates.signup;

    // Generate email content
    const subject = template.subject;
    const htmlContent = template.getHtml(confirmUrl, email_data.token, userName);
    const textContent = template.getText(confirmUrl, email_data.token, userName);

    console.log(`Sending ${email_data.email_action_type} email to ${user.email} in ${language}`);

    // Send email via Brevo API
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_SENDER_NAME,
          email: BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: user.email,
            name: userName || undefined,
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
        textContent: textContent,
        headers: {
          "X-Mailer": "Monolite HR v1.0",
        },
        tags: ["auth", email_data.email_action_type],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Brevo API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: errorData }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log(`Email sent successfully. MessageId: ${data.messageId}`);

    // Return empty 200 response (required by Supabase Auth Hook)
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-auth-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

## Deployment Command

Deploy via MCP:

```
mcp__supabase__deploy_edge_function(
  name: "send-auth-email",
  entrypoint_path: "index.ts",
  verify_jwt: false,
  files: [
    { name: "index.ts", content: "<full code above>" }
  ]
)
```

## Post-Deployment Steps

1. **Generate hook secret** in Supabase Dashboard:
   - Go to Authentication > Hooks
   - Click "Enable" for Send Email hook
   - Generate a new secret

2. **Set the secret** as environment variable:
   ```bash
   supabase secrets set SEND_EMAIL_HOOK_SECRET=v1,whsec_<your_secret>
   ```

3. **Configure the hook**:
   - Set hook URL: `https://<project-ref>.supabase.co/functions/v1/send-auth-email`
   - Save configuration

## Testing

Test with curl:
```bash
curl -X POST https://<project-ref>.supabase.co/functions/v1/send-auth-email \
  -H "Content-Type: application/json" \
  -H "webhook-id: test" \
  -H "webhook-timestamp: $(date +%s)" \
  -H "webhook-signature: <signature>" \
  -d '{
    "user": { "email": "test@example.com" },
    "email_data": {
      "email_action_type": "signup",
      "token": "123456",
      "token_hash": "abc123",
      "redirect_to": "",
      "site_url": "https://example.com"
    }
  }'
```
