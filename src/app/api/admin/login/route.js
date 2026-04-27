// POST /api/admin/login
import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Please fill all fields' }, { status: 400 });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ email });
    return NextResponse.json({ success: true, token });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
