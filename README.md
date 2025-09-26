Sweet Shop Management System
A full-stack application for managing a sweet shop, built with Node.js/Express, PostgreSQL (via Supabase), and a React frontend using Vite and TailwindCSS. This project follows Test-Driven Development (TDD) practices and uses JSON Web Tokens (JWT) for authentication. Users can register, log in, browse sweets, and purchase them, while admins can manage the inventory (add, update, delete, and restock sweets).
Features

User Authentication: Register and log in with a username and password.
User Dashboard: Browse sweets, search by name, category, or price range, and purchase sweets.
Admin Dashboard: Add, update, delete, and restock sweets (admin-only).
Responsive UI: Built with TailwindCSS for a mobile-friendly experience.
TDD: Includes Jest tests for the backend and Vitest tests for the frontend.

Prerequisites

Node.js: v16 or higher
PostgreSQL: Managed via Supabase
Git: For cloning the repository
Browser: For accessing the frontend

Setup Instructions
Backend

Clone the Repository:
git clone https://github.com/Mansi642000/SweetShop.git
cd SweetShop/backend


Install Dependencies:
npm install


Set Up Environment Variables:Create a .env file in the backend directory with:
DATABASE_URL=postgresql://postgres:******@db.fqaatmirgoevhztlxfga.supabase.co:5432/postgres
JWT_SECRET=your_jwt_secret
PORT=5000


Replace your_jwt_secret with a secure secret key (e.g., a random string).
Ensure the DATABASE_URL matches your Supabase or local PostgreSQL setup.


Set Up Database:Connect to your PostgreSQL database (e.g., via psql or Supabase dashboard) and run:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);

CREATE TABLE sweets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity >= 0)
);


Run the Backend:
npm run dev

The backend runs on http://localhost:5000.

Run Tests:
npm test

This runs Jest tests with coverage reports for authentication and sweets endpoints.


Frontend

Navigate to Frontend:
cd ../frontend


Install Dependencies:
npm install


Run the Frontend:
npm run dev

The frontend runs on http://localhost:5173.

Run Tests:
npm run test

This runs Vitest tests for React components.


Registering and Signing In

Register:
Go to http://localhost:5173/register.
Enter a unique username (e.g., testuser) and a password (e.g., Test@123).
Click Register to create a user and be redirected to the dashboard.
Note: Usernames must be unique. Passwords should be secure (e.g., 8+ characters with letters, numbers, and symbols).


Sign In:
Go to http://localhost:5173/login.
Enter the registered username and password (e.g., testuser, Test@123).
Click Login to access the dashboard.


Admin User:
Register a user (e.g., username: adminuser, password: Admin@123).
Update the role to admin in the database:UPDATE users SET role = 'admin' WHERE username = 'adminuser';


Connect to Supabase:psql postgresql://postgres:IncSweetShop06@db.fqaatmirgoevhztlxfga.supabase.co:5432/postgres




Log in as adminuser to access the admin dashboard (http://localhost:5173/admin) for managing sweets.



Example Usage

Register a User:
URL: http://localhost:5173/register
Input: username: testuser, password: Test@123
Outcome: Redirected to http://localhost:5173/ with Welcome, testuser in the navbar.


Sign In:
URL: http://localhost:5173/login
Input: username: testuser, password: Test@123
Outcome: Redirected to dashboard with sweets list and purchase options.


Admin Features:
Log in as an admin user (e.g., adminuser, Admin@123).
Go to http://localhost:5173/admin to add, edit, delete, or restock sweets.



My AI Usage

AI Tools Used: GitHub Copilot
How I Used Them:
Generated boilerplate code for Express controllers, Jest tests, React components, Vitest tests, and TailwindCSS styles.
Assisted in structuring the project folder and drafting README content.
Suggested API service patterns and responsive UI designs.


Reflection:
AI tools significantly sped up development by providing initial code structures and styling.
I manually reviewed and customized all AI-generated code to ensure it met the TDD Kata requirements, including proper error handling, test coverage, and responsive design.



Test Report

Backend:
Run npm test in the backend directory to generate a coverage report.
Current coverage (approximate):
Lines: 85%
Functions: 90%
Branches: 80%


Tests cover authentication (register, login) and sweets management (CRUD, purchase, restock).


Frontend:
Run npm run test in the frontend directory to test React components.
Tests cover rendering and form submission for Login and Register components.


Troubleshooting

Registration Fails (Username already exists): Ensure the username is unique. Check the users table:SELECT * FROM users;


Login Fails (Invalid credentials): Verify the username and password match a registered user.
Network Errors: Ensure the backend (http://localhost:5000) and frontend (http://localhost:5173) are running. Test the API:curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"testuser","password":"Test@123"}'


Database Issues: Verify the DATABASE_URL in backend/.env and test the connection:psql postgresql://postgres:IncSweetShop06@db.fqaatmirgoevhztlxfga.supabase.co:5432/postgres



Deployment (Optional)

Backend: Deploy to Render or Heroku:cd backend
git push heroku main


Frontend: Deploy to Vercel:cd frontend
vercel



Update this README with live demo links after deployment.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes with AI usage documentation if applicable.
Push to the branch (git push origin feature/your-feature).
Open a pull request.
