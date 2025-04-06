import psycopg2
from psycopg2.extras import RealDictCursor
from dataclasses import dataclass
from typing import Optional, List
from contextlib import contextmanager
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

@dataclass
class Transcript:
    transcript_id: int
    student_id: int
    session_id: int
    transcript: str

class LanguageLearningDB:
    def __init__(self, db_url: str):
        # initialize db with connection url
        self.db_url = db_url
        self._init_db()

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
