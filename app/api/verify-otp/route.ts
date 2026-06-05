    import { NextResponse } from 'next/server';
    import { createClient } from '@supabase/supabase-js';

    const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        const { data, error } = await supabase
        .from('email_otps')
        .select('*')
        .eq('email', email)
        .eq('otp', otp)
        .order('id', { ascending: false })
        .limit(1);

        if (error || !data || data.length === 0) {
        return NextResponse.json(
            { success: false, message: 'Invalid OTP' },
            { status: 400 }
        );
        }

        const record = data[0];

        if (
        new Date(record.expires_at).getTime() <
        Date.now()
        ) {
        return NextResponse.json(
            { success: false, message: 'OTP Expired' },
            { status: 400 }
        );
        }

        const response = NextResponse.json({
    success: true,
    });
    await supabase
    .from('email_otps')
    .delete()
    .eq('id', record.id);
    response.cookies.set(
    'customer_auth',
    'logged_in',
    {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
    }
    );

    return response;
    } catch {
        return NextResponse.json(
        { success: false },
        { status: 500 }
        );
    }
    }