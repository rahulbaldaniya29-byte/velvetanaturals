import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set(
    'customer_auth',
    '',
    {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    }
  );

  return response;
}