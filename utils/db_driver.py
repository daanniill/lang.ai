import psycopg2
from psycopg2.extras import RealDictCursor
from dataclasses import dataclass
from typing import Optional, List
from contextlib import contextmanager
import random
from datetime import datetime

@dataclass
class Student:
    student_id: int
    name: str
    email: str
    phone_number: str
    skill_level: Optional[str]
    strengths: Optional[str]
    weaknesses: Optional[str]
    language_used: str

@dataclass
class Session:
    session_id: int
    student_id: int
    session_summary: Optional[str]
    session_date: datetime
    transcript: str
    
class LanguageLearningDB:
    def __init__(self, db_url: str):
        # initialize db with connection url
        self.db_url = db_url

    @contextmanager
    def _get_connection(self):
        # context manager for postgresql connection
        conn = psycopg2.connect(self.db_url, cursor_factory=RealDictCursor)
        try:
            yield conn
        finally:
            conn.close()        

    def add_student(self, name: str, email: str, phone_number: str,
                    skill_level: Optional[str], strengths: Optional[str],
                    weaknesses: Optional[str], language_used: str) -> Student:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO Students (name, email, phone_number, skill_level, strengths, weaknesses, language_used)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING *;
            """, (name, email, phone_number, skill_level, strengths, weaknesses, language_used))
            conn.commit()
            return Student(**cursor.fetchone())
        
    def get_student_by_id(self, student_id: int) -> Optional[Student]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM Students WHERE student_id = %s;", (student_id,))
            row = cursor.fetchone()
            return Student(**row) if row else None
        
    def create_session(self, student_id: int, session_summary: Optional[str], transcript: Optional[str]) -> Session:
        """Create a session for a student."""
        # create a session with random 5 digit in session id and current datetime
        session_id = random.randint(10000, 99999)
        session_date = datetime.now()

        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO Sessions (session_id, student_id, session_summary, session_date, transcript)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING *;
            """, (session_id, student_id, session_summary, session_date, transcript))
            row = cursor.fetchone()
            conn.commit()
            return Session(**row)
    
    def list_sessions_for_student(self, student_id: int) -> List[Session]:
        """Return all sessions for a student."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM Sessions WHERE student_id = %s ORDER BY session_date DESC;", (student_id,))
            rows = cursor.fetchall()
            return [Session(**row) for row in rows]
