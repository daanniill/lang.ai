import { NextResponse, NextRequest } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

interface SessionUser {
    name: string;
    email: string;
    image?: string;
}

export async function POST(request: NextRequest) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    const client = new OAuth2Client(clientId);

    if (!clientId || !clientSecret || !redirectUri) {
        return NextResponse.json(
            { error: "Server misconfiguration" },
            { status: 500 }
        );
    }
    const body = await request.json();
    const idToken = body.credential
    if (!idToken) {
        return NextResponse.json({
            error: "No credential provided"
        },
        {
            status: 400
        })
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: clientId
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return NextResponse.json({
                error: "invalid token"
            },
            {status: 401})
        }

        const { email, name, picture, sub} = payload;
        console.log(email)
        console.log(name)
        return NextResponse.json({success: true, user: {email, name, picture, sub}})
    } catch(error) {
        return NextResponse.json(
            {error: error instanceof Error ? error.message: "Auth failed"},
            { status: 401 }
        )
    }
}