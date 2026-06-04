import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    ).toISOString();

    await supabase.from('email_otps').insert({
      email,
      otp,
      expires_at: expiresAt,
    });

    await resend.emails.send({
      from: 'Velveta Naturals <onboarding@resend.dev>',
      to: email,
      subject: 'Your Login OTP',
html: `
<div style="
  background:#f5f1e8;
  padding:15px;
  font-family:Arial,sans-serif;
">

  <div style="
    max-width:500px;
    margin:auto;
    background:#0f1115;
    border-radius:25px;
    overflow:hidden;
  ">

    <div style="
      background:linear-gradient(135deg,#173926,#2f5d43);
      padding:35px 20px;
      text-align:center;
    ">

      <h1 style="
        color:#c3955d;
        font-size:34px;
        margin:0;
        letter-spacing:2px;
      ">
        VELVETA
      </h1>

      <p style="
        color:white;
        margin-top:12px;
        font-size:15px;
      ">
        Premium Ayurvedic Wellness
      </p>

    </div>

    <div style="
      padding:35px 25px;
      text-align:center;
      color:white;
    ">

      <h2 style="
        font-size:28px;
        margin-bottom:20px;
      ">
        Login Verification
      </h2>

      <p style="
        color:#d4d4d4;
        line-height:1.8;
        font-size:16px;
      ">
        Use the OTP below to securely login to your Velveta Naturals account.
      </p>

      <div style="
        background:#1d1d1d;
        border-radius:22px;
        padding:28px 20px;
        margin-top:30px;
      ">

        <p style="
          color:#cfcfcf;
          font-size:16px;
          margin-bottom:15px;
        ">
          Your OTP Code
        </p>

        <h1 style="
          color:#c3955d;
          font-size:48px;
          letter-spacing:8px;
          margin:0;
        ">
          ${otp}
        </h1>

      </div>

      <p style="
        margin-top:25px;
        color:#bdbdbd;
        font-size:14px;
      ">
        This OTP is valid for 10 minutes.
      </p>

    </div>

    <div style="
      background:#173926;
      text-align:center;
      padding:20px;
    ">

      <p style="
        color:white;
        margin:0;
        font-size:14px;
      ">
        © 2026 Velveta Naturals
      </p>

    </div>

  </div>

</div>
`,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}