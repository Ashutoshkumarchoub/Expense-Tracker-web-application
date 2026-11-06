# Expense Tracker – Full-Stack Expense Management Application

A full-stack Expense Tracker application built to simplify personal expense management and financial monitoring. It allows users to manage expense records through an interactive web interface, visualize spending patterns, and receive automated email notifications when expenses exceed a configured spending threshold.

The application uses React.js for the frontend, Node.js and Express.js for backend API development, MongoDB Atlas for database management, and a dedicated background service for automated expense monitoring and email notifications.

## Features

- **Expense Management:** Add, view, update, and delete expense records.
- **Expense Tracking:** Store and manage financial transactions using MongoDB.
- **Interactive Dashboard:** Visualize expense distribution and spending patterns using charts.
- **Search Functionality:** Search and manage expense records easily.
- **Automated Email Alerts:** Receive email notifications when expenses exceed the configured spending threshold.
- **Scheduled Background Processing:** Use Node-Cron to execute automated background tasks.
- **Email Integration:** Send automated notifications using Nodemailer and SMTP.
- **Modular Architecture:** Separate frontend, backend API, and background processing components.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, Tailwind CSS |
| Frontend Tooling | Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Background Processing | Node-Cron |
| Email Notifications | Nodemailer, SMTP |
| Development Tools | VS Code, Git, GitHub |

## Project Architecture

```text
Expense Tracker/
│
├── Backend/
│   ├── models/                  # Database schemas
│   ├── index.js                 # Express API entry point
│   └── package.json             # Backend dependencies
│
├── Backgroundservices/
│   ├── EmailService/            # Expense threshold monitoring
│   ├── helpers/                 # Email configuration
│   ├── models/                  # Database schemas
│   ├── index.js                 # Background service entry point
│   └── package.json             # Background service dependencies
│
├── Frontend/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Frontend assets
│   │   ├── App.css              # Application styles
│   │   ├── App.jsx              # Main React component
│   │   ├── index.css            # Global styles
│   │   ├── main.jsx             # React entry point
│   │   └── requestMethods.js    # API request configuration
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

Install the following tools before running the application:

- [Node.js](https://nodejs.org/) (Version 18 or later recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas)
- Gmail account with Google 2-Step Verification enabled (for email notifications)

Nodemon is also required to run the backend and background service using the commands below.

Install Nodemon globally if it is not already available:

```bash
npm install -g nodemon
```

## Installation and Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ashutoshkumarchoub/Expense-Tracker-web-application.git

cd Expense-Tracker-web-application
```

### 2. Configure MongoDB Atlas

1. Create an account on MongoDB Atlas.
2. Create a MongoDB cluster.
3. Create a database user with appropriate permissions.
4. Configure network access for your development environment.
5. Copy your MongoDB connection string.

### 3. Configure Environment Variables

The backend and background service require separate environment configuration files.

**Backend Environment Configuration**

Create a `.env` file inside the `Backend/` directory:

```env
PORT=5000
DB_CONNECTION=mongodb+srv://<username>:<password>@<cluster-url>/ExpenseTracker?retryWrites=true&w=majority
```

**Background Service Environment Configuration**

Create a `.env` file inside the `Backgroundservices/` directory:

```env
PORT=5001
DB_CONNECTION=mongodb+srv://<username>:<password>@<cluster-url>/ExpenseTracker?retryWrites=true&w=majority

EMAIL=your_sending_email@gmail.com
PASSWORD=your_16_digit_google_app_password
ADMIN_EMAIL=your_receiving_email@gmail.com
```

Replace the placeholders with your actual MongoDB and email credentials.

**Important Security Notes:**

- Never upload `.env` files to GitHub.
- Never expose MongoDB credentials or email passwords.
- Use a Google App Password instead of your regular Gmail password.
- Keep database access restricted to trusted users and environments.

### 4. Install Dependencies

Install dependencies separately for each component.

**Backend**

```bash
cd Backend
npm install
```

**Background Service**

```bash
cd ../Backgroundservices
npm install
```

**Frontend**

```bash
cd ../Frontend
npm install
```

## Running the Application

The project contains three independent components. Open three separate terminals from the main project directory.

### Terminal 1 – Backend API

```bash
cd Backend
nodemon index.js
```

The backend uses Express.js to handle API requests and MongoDB operations.

Configured backend port: `5000`

### Terminal 2 – Background Email Service

```bash
cd Backgroundservices
nodemon index.js
```

The background service uses Node-Cron to schedule expense monitoring tasks and Nodemailer to send email notifications.

Configured background service port: `5001`

### Terminal 3 – Frontend Application

```bash
cd Frontend
npm run dev
```

Vite starts the React development server.

Open the local URL displayed in your terminal to access the Expense Tracker application.

## Automated Email Notification Workflow

The application includes a dedicated background service for monitoring expense activity.

The general workflow is:

1. Expense information is stored in MongoDB.
2. The background service connects to the database.
3. Node-Cron schedules the monitoring task.
4. Expense records are checked against the configured spending threshold.
5. When the threshold condition is met, Nodemailer sends an email notification to the configured recipient.

This helps administrators monitor spending and receive timely notifications about expenses exceeding the configured limit.

## Database Management

MongoDB Atlas is used as the cloud database solution.

Mongoose provides object data modeling (ODM) for interacting with MongoDB collections.

Both the backend and background service use the configured MongoDB connection string to access the application database.

## Deployment

The application can be deployed using separate hosting platforms for its frontend, backend, and background service.

| Component | Suggested Platform |
|---|---|
| Frontend | Vercel |
| Backend API | Render Web Service |
| Background Service | Render Background Worker |
| Database | MongoDB Atlas |

### Deployment Overview

**Frontend Deployment**
- Connect the GitHub repository to Vercel.
- Set the frontend project root directory to `Frontend`.
- Configure the production build command as `npm run build`.
- Configure the output directory as `dist`.
- Update the frontend API configuration to use the deployed backend URL.

**Backend Deployment**
- Deploy the `Backend` directory as a Node.js web service.
- Configure the required environment variables.
- Use `node index.js` as the production start command.
- Configure MongoDB Atlas network access.

**Background Service Deployment**
- Deploy the `Backgroundservices` directory as a background worker.
- Configure the required database and email environment variables.
- Use `node index.js` as the production start command.
- Ensure the background worker remains active to execute scheduled tasks.

**Database Deployment**
- Use MongoDB Atlas as the production database.
- Configure secure database credentials and network access.

The production deployment will be documented here after it has been completed and tested.

## Security Best Practices

- Store credentials and sensitive configuration in environment variables.
- Exclude `.env` files from Git tracking.
- Use Google App Passwords for SMTP authentication.
- Secure MongoDB Atlas database access.
- Validate and sanitize incoming application data.
- Use HTTPS for production communication.
- Avoid exposing sensitive information in application logs.

## Future Enhancements

- Monthly and yearly expense reports.
- Budget creation and spending limit management.
- Advanced expense analytics and visualizations.
- Improved dashboard and reporting features.
- User authentication and personalized expense management.
- Enhanced notification and monitoring capabilities.

## Author

**Ashutosh Kumar Choubey**

- GitHub: [Ashutoshkumarchoub](https://github.com/Ashutoshkumarchoub)
- Project Repository: [Expense Tracker – Full-Stack Application](https://github.com/Ashutoshkumarchoub/Expense-Tracker-web-application)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.