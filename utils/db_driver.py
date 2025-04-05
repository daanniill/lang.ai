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
