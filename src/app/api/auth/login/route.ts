import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken, parseExpiryToSeconds } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const accessToken = await signAccessToken({ username: admin.username, sub: admin._id.toString() });
    const refreshToken = await signRefreshToken({ username: admin.username, sub: admin._id.toString() });

    // Store refresh token in db
    admin.refreshToken = refreshToken;
    await admin.save();

    const response = NextResponse.json({ success: true }, { status: 200 });

    const accessMaxAge = parseExpiryToSeconds(process.env.JWT_ACCESS_EXPIRY || '15m');
    const refreshMaxAge = parseExpiryToSeconds(process.env.JWT_REFRESH_EXPIRY || '7d');

    // Set cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: accessMaxAge,
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: refreshMaxAge,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
