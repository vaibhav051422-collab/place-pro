from app.services.gemini_service import improve_resume

print("Starting Gemini Test...")

resume = """
Prajjwal Singh

Skills:
Python
Java
React
FastAPI
AWS
Git
SQL

Projects:
NovaPass
FriendBook
NewsScope

Education:
B.Tech Computer Science Engineering

Experience:
No Internship
"""

print("Sending request to Gemini...")

result = improve_resume(resume)

print("Response received!\n")

print(result)

print("\nTest completed successfully.")