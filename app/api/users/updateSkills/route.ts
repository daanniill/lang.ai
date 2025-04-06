import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
<<<<<<< HEAD
    const { email, skillLevel, strengths, weaknesses } = await req.json();
=======
    const { email, skillLevel, strengths, weaknesses, userLanguage } = await req.json();
    console.log(skillLevel)
    console.log(userLanguage)
>>>>>>> bff18f7ef3f8beb623d0b4437470926f962f45a6
    const connString = process.env.DB_CONNECTION_STRING!

    if (!connString) {
        throw new Error('Unable to establish connection to the database')
    }
    const sql = neon(connString); 
    const result = await sql`
      UPDATE Students
      SET skill_level = ${skillLevel},
          strengths = ${strengths},
<<<<<<< HEAD
          weaknesses = ${weaknesses}
      WHERE email = ${email}
      RETURNING email, skill_level, strengths, weaknesses;
=======
          weaknesses = ${weaknesses},
          language_used = ${userLanguage}
      WHERE email = ${email}
      RETURNING email, skill_level, strengths, weaknesses,language_used;
>>>>>>> bff18f7ef3f8beb623d0b4437470926f962f45a6
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
