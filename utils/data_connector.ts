import { neon } from '@neondatabase/serverless';

const connString = process.env.DB_CONNECTION_STRING!

if (!connString) {
    throw new Error('Unable to establish connection to the database')
}

const sql = neon(connString); // ! asserts that this is string so TS will stop screaming at me
export async function query(sqlQuery: string) {
    try {
        const response = await sql`${sqlQuery}`
        return response;
    } catch(error) {
        console.error('Database query failed', error)
        throw new Error('Database query failed');
    }
}