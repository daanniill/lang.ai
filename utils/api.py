from livekit.agents import llm
import enum
from typing import Annotated
import logging

#defining a sample class for now that will later serve as the api for the agent to interact with database
class TutorFnc(llm.FunctionContext):
    def __init__(self):
        super().__init__()