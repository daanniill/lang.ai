import { NextResponse, NextRequest } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { neon } from '@neondatabase/serverless';

// To-do:
// Spanish, Russian, English options for language choices

interface SessionUser {
    name: string;
    email: string;
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

        const params: SessionUser = {
            name: name!,
            email: email!
        }
        const connString = process.env.DB_CONNECTION_STRING!

        if (!connString) {
            throw new Error('Unable to establish connection to the database')
        }

        const sql = neon(connString); // ! asserts that this is string so TS will stop screaming at me
                await sql`
                INSERT INTO Students (name, email)
                VALUES (${params.name}, ${params.email})
                ON CONFLICT (email) DO NOTHING;`;

        return NextResponse.json({success: true, user: {email, name, picture, sub}})
    } catch(error) {
        return NextResponse.json(
            {error: error instanceof Error ? error.message: "Auth failed"},
            { status: 401 }
        )
    }
}