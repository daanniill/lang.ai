from api import TutorFnc
from livekit.agents import llm
from openai import OpenAI
import aiofiles

import logging

client = OpenAI()

logger = logging.getLogger("user-data")
logger.setLevel(logging.INFO)

async def updateTranscript(msg: llm.ChatMessage):
    async with aiofiles.open("transcript.txt", "a") as file:
        logger.info("written")
        await file.write(f"{msg.content}")

def getTranscript():
    file = open("transcript.txt", "r")
    return file.read()


def getSumarry():
    file = open("transcript.txt", "r")
    transc = file.read()
    response = client.responses.create(
        model="gpt-4o",
        input= f"Summarize this transcript in at most 100 words: {transc}"
    )

    return(response.output_text)