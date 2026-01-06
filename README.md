<h1>🎯 Task Management System</h1>

A modern task management application built with Next.js, TypeScript, and Prisma. Keep track of your tasks, mark them as completed, and manage them with a clean, responsive UI.

<h2>📸 Features</h2>

✨ <strong>Task Management</strong>
<ul>
  <li>Create, view, edit, and delete tasks</li>
  <li>Mark tasks as pending or completed</li>
  <li>View detailed task information, including creation and last updated timestamps</li>
</ul>

💻 <strong>User Authentication</strong>
<ul>
  <li>Tasks are user-specific</li>
  <li>Unauthorized users cannot access tasks</li>
  <li>All actions are secured via server-side authentication</li>
</ul>

🎨 <strong>Responsive UI</strong>
<ul>
  <li>Designed using Tailwind CSS for a modern look and feel</li>
  <li>Reusable components like Button, Badge, Card, Input, and Textarea</li>
  <li>Clean and intuitive navigation between task list, details, and edit pages</li>
</ul>

<h2>📖 Getting Started</h2>

1️⃣ Clone the repository

<pre>
git clone https://github.com/ransharirodrigo/TaskManagementSystem.git
cd TaskManagementSystem
</pre>

2️⃣ Install dependencies

<pre>
npm install
</pre>

3️⃣ Set up environment variables  

Create a <code>.env.local</code> file in the project root:

<pre>
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret-key"
</pre>

⚠️ Important: Replace <code>your-database-url</code> with your Prisma database connection string (e.g., PostgreSQL, MySQL, or SQLite).  

4️⃣ Run Prisma migrations  

<pre>
npx prisma migrate dev
</pre>

5️⃣ Start the development server

<pre>
npm run dev
</pre>

Open <strong>http://localhost:3000</strong> in your browser to access the application.  

<h2>🗂 Folder Structure Overview</h2>

<pre>
/app
  /tasks
    /[id]
      page.tsx          # Task detail page
      edit/page.tsx     # Task edit page
  /api
    /tasks
      route.ts          # API routes for task CRUD operations
/public                  # Static assets like images
/lib
  prisma.ts               # Prisma client instance
  auth-server.ts          # Server-side auth functions
/components
  /ui
    Button.tsx
    Badge.tsx
    Card.tsx
    Input.tsx
    Textarea.tsx
/types.ts                # TypeScript types for Task and TaskStatus
/utils.ts                # Utility functions (e.g., formatDateTime)
.env.local               # Environment variables (DATABASE_URL, NEXTAUTH_SECRET)
</pre>

<h2>💡 Tips & Recommendations</h2>

<ul>
  <li>Ensure <code>DATABASE_URL</code> points to a valid database before running migrations</li>
  <li>Use TypeScript for type safety and better developer experience</li>
  <li>Customize Tailwind classes in <code>globals.css</code> to fit your design preferences</li>
  <li>All API routes are protected; make sure you handle authentication properly when extending features</li>
  <li>For production deployment (Vercel, Netlify, etc.), add <code>DATABASE_URL</code> and <code>NEXTAUTH_SECRET</code> as environment variables</li>
</ul>

<h2>📄 Next Steps</h2>

<ul>
  <li>Implement user authentication and session management if not done yet</li>
  <li>Add search, filter, and pagination for tasks</li>
  <li>Add testing for API routes and UI components</li>
</ul>
