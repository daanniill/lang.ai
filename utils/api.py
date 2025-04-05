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
            StudentDeatils.Student_id: "",
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
    def get_student_details(self):
        logger.info("get student details")
        return f"The student details are: {self.get_student_str()}"

