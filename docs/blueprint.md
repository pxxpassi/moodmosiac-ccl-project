# **App Name**: MoodMosiac

## Core Features:

- User Authentication: Allow users to register and log in using JWT-based authentication to secure their mood entries.
- Mood Entry: Enable users to record their daily mood by selecting a color, entering a reflection text, and uploading an image. Store these entries with the date.
- Heatmap Visualization: Display a yearly mood heatmap based on user entries, providing a visual overview of their mood trends. Color-code the heatmap based on the number of entries per day.

## Style Guidelines:

- Primary color: Soft lavender (#E6E6FA) for a calming effect.
- Secondary color: Light gray (#D3D3D3) for backgrounds and subtle elements.
- Accent: Teal (#008080) for interactive elements and highlights.
- Clean and readable sans-serif font for body text.
- Use simple, line-based icons for a modern and minimalist look.
- Use a clean, grid-based layout with plenty of white space for a calming and organized feel.
- Subtle transitions and animations for a smooth user experience.

## Original User Request:
Tech Stack
Frontend: React JS or plain HTML/CSS/JS

Backend: Node.js (Express) or Flask (Python)

Database: MongoDB Atlas (DBaaS) or AWS RDS (MySQL/Postgres)

Storage: AWS S3 (for user image uploads)

Authentication: JWT-based (custom) OR AWS Cognito (if you want managed auth)

Hosting: AWS EC2 (Ubuntu Server)

Security: AWS IAM, S3 bucket policies, HTTPS (SSL/TLS)

🧩 High-Level Feature Flow
1. User Authentication

Step	Service/Tech
User Registers / Logs in	Backend handles it via JWT OR integrate AWS Cognito for user management
Secure user sessions	Store JWT tokens in browser LocalStorage or secure cookies
2. User Dashboard (after login)

Section	Functionality	AWS Services
Current Date Card	"How was your day?" + mood color picker + small reflection text input + image upload	
Upload Image	Upload selected image to S3 bucket securely	AWS S3
Save Entry	Save date, mood color, reflection text, image URL into database	MongoDB Atlas or AWS RDS
3. Heatmap Visualization

Feature	How it works
Show yearly heatmap	Based on number of entries per day (similar to GitHub contributions graph)
Data Source	Query user entries for the year and build a color-coded heatmap
✅ You can use a heatmap library like react-calendar-heatmap or create a custom visualization using Chart.js.

4. Monthly Collage (Bonus Feature)

Feature	How it works
Show monthly collages	Fetch all uploaded images for a given month from DB or S3
Create collage layout	Randomly position images inside a grid on frontend
Optional	Use a simple library like html2canvas if you want to create downloadable collages!
🔥 AWS Cloud Deployment Steps
1. Backend Setup
Create an EC2 Ubuntu instance.

SSH into it and install Node.js (or Python for Flask).

Set up your backend server code.

Install MongoDB client (if needed) or connect to AWS RDS.

2. Frontend Setup
You can either:

Host it separately using Netlify/Vercel

OR serve it directly via your backend server (Express.static or Flask send_from_directory)

3. Storage Setup
Create an AWS S3 Bucket for image uploads.

Configure CORS policy to allow frontend to upload images.

Set bucket permissions securely (only allow upload/download with proper signed URLs).

4. Security Setup
Create IAM Role/User with S3 access only for your application.

Use HTTPS:

Set up SSL Certificate using Let's Encrypt or AWS ACM + Nginx.

Protect API routes with JWT Auth or integrate AWS Cognito for users.

Set S3 to private by default — images accessed using signed URLs.

5. Monitoring and Maintenance
Use AWS CloudWatch to monitor your EC2 instance metrics (optional but impressive!).

Regular database backups (automatic snapshots if RDS).

🗂 Suggested Database Schema
json
Copy
Edit
{
  "userId": "abc123",
  "entryDate": "2025-04-27",
  "moodColor": "#FFCC00",
  "reflection": "Today was peaceful and calm.",
  "imageUrl": "https://yourbucket.s3.amazonaws.com/userid/2025-04-27.jpg",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
This structure makes it easy to query entries by user and by date.

📋 Summary Checklist
✅ EC2 instance set up
✅ Backend with JWT auth (or Cognito)
✅ DBaaS: MongoDB Atlas / AWS RDS
✅ S3 Bucket for images (Storage as a Service)
✅ IAM & S3 security setup (Security as a Service)
✅ Frontend connected to backend
✅ Heatmap Visualization
✅ Collage Generator
  