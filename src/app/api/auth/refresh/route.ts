import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { signAccessToken, signRefreshToken, verifyRefreshToken, parseExpiryToSeconds } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    const payload = await verifyRefreshToken(refreshToken);
    if (!payload || !payload.sub) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    await dbConnect();
    const admin = await Admin.findById(payload.sub);
    
    if (!admin || admin.refreshToken !== refreshToken) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    const newAccessToken = await signAccessToken({ username: admin.username, sub: admin._id.toString() });
    const newRefreshToken = await signRefreshToken({ username: admin.username, sub: admin._id.toString() });

    admin.refreshToken = newRefreshToken;
    await admin.save();

    const response = NextResponse.json({ success: true }, { status: 200 });

    const accessMaxAge = parseExpiryToSeconds(process.env.JWT_ACCESS_EXPIRY || '15m');
    const refreshMaxAge = parseExpiryToSeconds(process.env.JWT_REFRESH_EXPIRY || '7d');

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: accessMaxAge,
      path: '/',
    });

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: refreshMaxAge,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
