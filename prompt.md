prompt.md — AI-Assisted Development Log
1. Project Overview
Name (working): ChatDigest Problem: Long group chats (WhatsApp, Slack, Discord, Teams) are hard to catch up on. Key decisions, tasks, and questions get buried. Solution: Users sign in, paste or upload a chat export, and get an AI summary: TL;DR, key points, decisions, action items (with owners), and open questions. Summaries are saved to the user's history. Target users: Students, teams, community admins, anyone catching up on busy chats.

MVP features

Email/password sign-up and sign-in
Paste text or upload a .txt chat export
AI summary with structured sections
Saved summary history per user (view, delete)
Copy summary to clipboard
Stretch (if time allows)

Summary length / tone options
Ask follow-up questions about a chat
2. Tech Stack & Architecture
Frontend: React 19, TanStack Start/Router, Tailwind CSS v4, shadcn/ui
Backend: Lovable Cloud (database, auth), TanStack server functions
AI: Lovable AI Gateway, model openai/gpt-6-astra via the Vercel AI SDK (Responses API, streaming)
Browser (React UI)
   |  paste/upload chat
   v
Server function (auth required) --> Lovable AI Gateway --> structured summary
   |
   v
Lovable Cloud DB: summaries (user_id, title, source_text, summary, created_at)
   with row-level security: users only see their own rows
3. AI Code Generation
#	Prompt / instruction	Tool / model	Purpose	Files affected	Outcome
1	Uploaded "MASTER PROMPT — VIBE CODING HACKATHON" (asks for planning, prompt.md, then wait for confirmation)	Lovable agent	Kick off planning	—	Agent asked clarifying questions
2	Answers: idea "Summary for chats"; AI core to app; accounts yes; under 6 hours	Lovable agent	Define MVP	prompt.md	This file created. No app code written yet.
4. Debugging
No entries yet.

5. AI Features & Design
Summary prompt design: to be recorded when implemented.
UI/UX direction: to be recorded when implemented.
6. Testing & Improvements
No entries yet.

7. Final Summary
To be completed at the end of the hackathon.

Development Plan (under 6 hours)
Design system + landing / sign-in pages (~45 min)
Enable Lovable Cloud, auth, summaries table with RLS (~45 min)
Summarize server function with AI Gateway (~1 h)
New summary page (paste/upload, result view) (~1 h)
History list + detail + delete (~45 min)
Testing, polish, update prompt.md (~45 min)
