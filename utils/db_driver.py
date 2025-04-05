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
    
    def _init_db(self):
        with self._get_connection() as conn:
            # Drop existing tables to ensure a clean reset 
            cursor = conn.cursor()

            cursor.execute("DROP TABLE IF EXISTS Transcripts CASCADE;")
            cursor.execute("DROP TABLE IF EXISTS Sessions CASCADE;")
            cursor.execute("DROP TABLE IF EXISTS Students CASCADE;")

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS Students (
                    student_id serial PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE,
                    phone_number VARCHAR(16) UNIQUE,
                    skill_level TEXT,
                    strengths TEXT,
                    weaknesses TEXT
                );
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS Sessions (
                    session_id serial PRIMARY KEY,
                    student_id INT REFERENCES Students(student_id) ON DELETE CASCADE,
                    session_summary TEXT,
                    session_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS Transcripts (
                    transcript_id serial PRIMARY KEY,
                    student_id INT REFERENCES Students(student_id) ON DELETE CASCADE,
                    session_id INT REFERENCES Sessions(session_id) ON DELETE CASCADE,
                    transcript TEXT
                );
            """)
            conn.commit()

    def add_student(self, name: str, email: str, phone_number: str,
                    skill_level: Optional[str], strengths: Optional[str], weaknesses: Optional[str]) -> Student:
        # Add a new student to the database
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO Students (name, email, phone_number, skill_level, strengths, weaknesses)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING *;
            """, (name, email, phone_number, skill_level, strengths, weaknesses))
            conn.commit()
            return Student(**cursor.fetchone())
        
    def get_student_by_id(self, student_id: int) -> Optional[Student]:
        # Retrieve a student by ID
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM Students WHERE student_id = %s;", (student_id,))
            row = cursor.fetchone()
            return Student(**row) if row else None
