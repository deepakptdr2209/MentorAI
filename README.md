🚀 MentorAI
MentorAI is a next-generation platform designed to empower job seekers and professionals by offering:

📝 Resume Builder
📄 Cover Letter Generator
🌐 Industry Insights
🎯 Mock Interviews with Quizzes
🎯 Features
📝 1. Resume Builder
Effortlessly create a professional resume using our user-friendly builder.

🌟 ATS-Optimized: Get a resume tailored for Applicant Tracking Systems (ATS).
🔥 Custom Sections: Add experience, skills, education, and projects easily.
🚀 Feedback & Scoring: Get AI-generated feedback and resume scores.
📄 2. Cover Letter Generator
Create personalized, job-specific cover letters in seconds.

💡 Company-Specific Tailoring: Automatically include the company name, job title, and relevant details.
⚡ Editable Template: Customize the tone, structure, and content as per your needs.
✨ AI-Powered Improvements: Get improvement suggestions for better readability.
🌐 3. Industry Insights
Stay ahead with real-time industry trends and salary insights.

📊 Salary Range & Growth Rate: See minimum, maximum, and median salaries for specific roles.
🔥 In-Demand Skills: Discover top skills required in different industries.
📈 Market Outlook: View industry forecasts (Positive, Neutral, Negative).
🎯 4. Mock Interviews with Quizzes
Prepare for job interviews with interactive mock interviews.

✅ Quiz Categories:
🛠️ Technical Skills
💡 Behavioral Questions
⚙️ Situational Scenarios
🔥 Real-Time Feedback:
See correct answers and get improvement tips after the quiz.
🚀 Score Insights:
Get an overall score breakdown and AI-generated suggestions for improvement.
🚀 Tech Stack
MentorAI is built using a modern and scalable tech stack:

⚙️ Backend:
PostgreSQL → Database for storing user profiles, resumes, assessments, and insights.
Prisma ORM → For efficient database management and querying.
🌐 Frontend:
Next.js (React) → For a fast and seamless user interface.
Tailwind CSS → For a sleek and responsive design.
🔥 Authentication:
Clerk.js → For secure and efficient user authentication.
💡 APIs & AI:
OpenAI API → For AI-powered resume feedback, cover letter improvements, and mock interview questions.
⚙️ Installation & Setup
✅ 1. Clone the Repository
bash
Copy
Edit
git clone <repo-url>
cd mentorai
⚙️ 2. Install Dependencies
bash
Copy
Edit
npm install
🔥 3. Set Environment Variables
Create a .env file in the root folder with the following environment variables:

plaintext
Copy
Edit
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/mentorai
NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-backend-api-key>
OPENAI_API_KEY=<your-openai-api-key>
🚀 4. Run the Development Server
bash
Copy
Edit
npm run dev
The app will run at:
arduino
Copy
Edit
http://localhost:3000
⚡ Usage
1️⃣ Resume Builder
Go to /resume-builder.
Fill in your details and generate your resume.
Download the PDF version or copy the Markdown content.
2️⃣ Cover Letter
Go to /cover-letter.
Enter the job title, company name, and description.
Generate a personalized cover letter.
3️⃣ Industry Insights
Go to /industry-insights.
Select an industry to view:
Salary ranges
In-demand skills
Market trends
4️⃣ Mock Interview
Go to /mock-interview.
Choose a quiz category.
Answer questions and receive:
Instant feedback
Improvement tips
Score breakdown
