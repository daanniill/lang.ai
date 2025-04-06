import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, skillLevel, strengths, weaknesses, userLanguage } = await req.json();
    console.log(skillLevel)
    console.log(userLanguage)
    const connString = process.env.DB_CONNECTION_STRING!

    if (!connString) {
        throw new Error('Unable to establish connection to the database')
    }
    const sql = neon(connString); 
    const result = await sql`
      UPDATE Students
      SET skill_level = ${skillLevel},
          strengths = ${strengths},
          weaknesses = ${weaknesses},
          language_used = ${userLanguage}
      WHERE email = ${email}
      RETURNING email, skill_level, strengths, weaknesses,language_used;
    `;

    if (result.length > 0) {
      return NextResponse.json({ success: true, updatedStudent: result[0] });
    } else {
      return NextResponse.json({ success: false, message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ success: false, message: 'Failed to update student' });
  }
}
