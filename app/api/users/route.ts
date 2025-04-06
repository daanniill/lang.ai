import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    const connString = process.env.DB_CONNECTION_STRING!

    if (!connString) {
        throw new Error('Unable to establish connection to the database')
    }
    const { email } = await request.json();
    if (email) {
    const sql = neon(connString); // ! asserts that this is string so TS will stop screaming at me
        const results = await sql`SELECT * from Students WHERE email = ${email};`;
        const data = results[0]
        return NextResponse.json({data})
    }

    return NextResponse.json({})


}
