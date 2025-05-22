import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, token } = body;
    console.log("body = ", body);

    if (!userId || !token) {
      return NextResponse.json({ message: 'userId and token are required' }, { status: 400 });
    }

    const BACKEND_API_URL = process.env.NEXT_PUBLIC_NOTIFICATION_API_URL;

    const response = await fetch(`${BACKEND_API_URL}/api/notification/register-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId, token}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Failed to save token' },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: 'Token saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving token:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

