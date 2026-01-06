<h1>🎯 Task Management System</h1>

A modern task management application built with Next.js (App Router), TypeScript, Prisma, and Tailwind CSS.  
Manage tasks efficiently: create, view, edit, delete, and mark them as completed with a clean, responsive interface.

<h2>📸 Features</h2>

✨ <strong>Task Management</strong>
<ul>
  <li>Create, view, edit, and delete tasks</li>
  <li>Mark tasks as pending or completed</li>
  <li>View detailed task information, including creation and last updated timestamps</li>
  <li>Task list page with pagination and navigation</li>
</ul>

💻 <strong>User Authentication</strong>
<ul>
  <li>Tasks are user-specific</li>
  <li>All actions are secured via JWT authentication</li>
  <li>Unauthorized users cannot access task details or perform actions</li>
</ul>

🎨 <strong>Responsive UI</strong>
<ul>
  <li>Designed using Tailwind CSS for modern styling</li>
  <li>Reusable UI components: Button, Badge, Card, Input, Textarea</li>
  <li>Clean and intuitive navigation between task list, task details, edit, and new task pages</li>
</ul>

<h2>📖 Getting Started</h2>

1️⃣ Clone the repository:

<pre>
git clone https://github.com/ransharirodrigo/TaskManagementSystem.git
cd TaskManagementSystem
</pre>

2️⃣ Install dependencies:

<pre>
npm install
</pre>

3️⃣ Set up environment variables  

Create a <code>.env</code> file in the project root and copy the content in  <code>.env.example</code>

<pre>
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
</pre>

⚠️ Make sure to set a strong <code>JWT_SECRET</code> for authentication.  

  Generate a secure JWT secret:

   On macOS/Linux : 
   openssl rand -base64 32
   
   On Windows (PowerShell) : 
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

4️⃣ Run Prisma migrations (if needed):

<pre>
npx prisma migrate dev
</pre>

5️⃣ Start the development server:

<pre>
npm run dev
</pre>

Open <strong>http://localhost:3000</strong> in your browser to access the application.  

<h2>🗂 Folder Structure Overview</h2>

<pre>
/app
  /api
    /auth
      /login
        route.ts      # API route for logging in
      /logout
        route.ts      # API route for logging out
      /me
        route.ts      # API route for fetching current user
      /register
        route.ts      # API route for user registration
    /tasks
      /[id]
        route.ts      # API route for task CRUD by ID
  /auth
    /login
      page.tsx        # Login page
    /register
      page.tsx        # Registration page
  /tasks
    /[id]
      edit
        page.tsx      # Edit task page
      page.tsx        # Task details page
    /new
      page.tsx        # Create new task page
    page.tsx          # Task list page
  favicon.ico
  globals.css
  layout.tsx
  page.tsx            # Home page
/public                  # Static assets
/lib
  prisma.ts             # Prisma client instance
  auth-server.ts        # Server-side authentication functions (JWT validation)
  utils.ts              # Helper functions 
/components
  /ui
    Button.tsx
    Badge.tsx
    Card.tsx
    Input.tsx
    Textarea.tsx
/types.ts               # TypeScript types for Task and TaskStatus
.env                    # Environment variables (DATABASE_URL, JWT_SECRET)
</pre>

<h2>🧪 Testing</h2>

This project includes a meaningful test suite implemented using <strong>Jest</strong> and <strong>React Testing Library</strong>.  
The tests focus on validating core application behavior, authentication enforcement, and UI rendering, without introducing unnecessary complexity.

<h3>🔧 Testing Tools</h3>
<ul>
  <li><strong>Jest</strong> – JavaScript testing framework</li>
  <li><strong>React Testing Library</strong> – UI component testing</li>
  <li><strong>Node Fetch</strong> – Integration testing for API routes</li>
</ul>

<h3>▶️ How to Run Tests</h3>

1️⃣ Make sure dependencies are installed:

<pre>
npm install
</pre>

2️⃣ Start the development server (required for API integration tests):

<pre>
npm run dev
</pre>

3️⃣ In a separate terminal, run the test suite:

<pre>
npm test
</pre>

Jest will run in watch mode and re-run tests automatically when files change.

<h3>📌 What Is Tested</h3>

<strong>1️⃣ API Integration Tests</strong> (<code>__tests__/api</code>)
<ul>
  <li>Unauthorized access to protected task routes</li>
  <li>Accessing a non-existing task</li>
  <li>Updating a non-existing task</li>
  <li>Deleting a non-existing task</li>
</ul>

These tests ensure:
<ul>
  <li>JWT authentication is enforced</li>
  <li>Route protection works correctly</li>
  <li>Error handling behaves as expected</li>
</ul>

<strong>2️⃣ UI Component Tests</strong> (<code>__tests__/components</code>)
<ul>
  <li>TaskCard component renders task title and description</li>
  <li>Correct task status badge is displayed</li>
</ul>

These tests ensure:
<ul>
  <li>Reusable UI components render correctly</li>
  <li>Task data is displayed accurately</li>
</ul>

<h3>🎯 Testing Scope & Rationale</h3>

The current test coverage intentionally focuses on:
<ul>
  <li>Authentication and authorization logic</li>
  <li>API error scenarios and route protection</li>
  <li>Critical UI component rendering</li>
</ul>
