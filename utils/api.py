from livekit.agents import llm
import enum
from typing import Annotated
import logging
from db_driver import LanguageLearningDB

db = LanguageLearningDB("postgresql://polyglot_owner:npg_AHDM8QTR4xlb@ep-curly-surf-a6rbqtd5-pooler.us-west-2.aws.neon.tech/polyglot?sslmode=require")

# Implementing some logging functions so we can see how the llm is going to use the functions provided by the api
logger = logging.getLogger("user-data")
logger.setLevel(logging.INFO)

class StudentDeatils(enum.Enum):
    Student_id = "student_id"
    Name = "name"
    Language = "language"
    Skill_Level = "skill_level"  # e.g., Beginner, Intermediate, Advanced
    Strengths = "strengths"
    Weaknesses = "weaknesses"

#defining a sample class for now that will later serve as the api for the agent to interact with database
class TutorFnc(llm.FunctionContext):
    def __init__(self):
        super().__init__()
        
        self._student_details = {
            StudentDeatils.Student_id: 0,
            StudentDeatils.Name: "",
            StudentDeatils.Language: "",
            StudentDeatils.Skill_Level: "",
            StudentDeatils.Strengths: "",
            StudentDeatils.Weaknesses: "",
        }
    
    # pulling the student details from the _student_details dict and formatting it so the llm can understand
    def get_student_str(self):
        student_str="" 
        for key, value in self._student_details.items():
            student_str += f"{key}: {value}"
        
        return student_str
    
    @llm.ai_callable(description="get details on current student")
    def get_student_details(self, student_id: Annotated[str, llm.TypeInfo(description="The student id of the student to lookup")]):
        logger.info("lookup student - student_id: %s", student_id)

        result = db.get_student_by_id(student_id)
        if result is None:
            return "Student not found"
        
        self._student_details = {
            StudentDeatils.Student_id: result.student_id,
            StudentDeatils.Name: result.name,
            StudentDeatils.Language: result.language,
            StudentDeatils.Skill_Level: result.skill_level,
            StudentDeatils.Strengths: result.strengths,
            StudentDeatils.Weaknesses: result.weaknesses,
        }

        return f"The student details are: {self.get_student_str()}"
    
    def add_student(
        self, 
        student_id: Annotated[int, llm.TypeInfo(description="The student id of the student")],
        name: Annotated[str, llm.TypeInfo(description="The name of the student")],
        email: Annotated[str, llm.TypeInfo(description="The email of the student")],
        phone_number: Annotated[str, llm.TypeInfo(description="The email of the student")],
        language: Annotated[str, llm.TypeInfo(description="The language of the student")],
        skill_level: Annotated[str, llm.TypeInfo(description="The skill level of the student")],
        strengths: Annotated[str, llm.TypeInfo(description="The strengths of the student")],
        weaknesses: Annotated[str, llm.TypeInfo(description="The weaknesses of the student")],
    ):
        logger.info("add student - student id: %s, name: %s, email: %s, phone_number: %s, language: %s, skill level: %s, strengths: %s, weaknesses: %s", student_id, name, email, phone_number, language, skill_level, strengths, weaknesses)
        result = db.add_student(student_id, name, email, phone_number, language, skill_level, strengths, weaknesses)
        if result is None:
            return "Failed to add student"
        
        self._student_details = {
            StudentDeatils.Student_id: result.student_id,
            StudentDeatils.Name: result.name,
            StudentDeatils.Language: result.language,
            StudentDeatils.Skill_Level: result.skill_level,
            StudentDeatils.Strengths: result.strengths,
            StudentDeatils.Weaknesses: result.weaknesses,
        }

        return "Student Added!"

