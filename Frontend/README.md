#  Expense Tracker with Automated Email Alerts

A full-stack Expense Management application equipped with automated background services. The application tracks financial entries and leverages an automated, cron-scheduled system to analyze spending thresholds and notify the administrator via secure email alerts if expenses cross safe boundaries.

---

##  Tech Stack

- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js
- **Database:** MongoDB Atlas (via Mongoose ODM)
- **Task Scheduling:** Node-Cron
- **Mailing Engine:** Nodemailer (via SMTP)

---

##  Project Architecture

```text
Expense Tracker/
├── Backend/                 # Main REST API Server
│   ├── models/              # Database Schemas
│   ├── index.js             # Express Entry Point
│   └── package.json
├── Backgroundservices/     # Automated Microservices
│   ├── EmailService/        # Threshold Analysis & Warning Logic
│   ├── helpers/             # Nodemailer Configuration
│   ├── models/              # Independent DB Schemas
│   ├── index.js             # Cron Engine Entry Point
│   └── package.json
└── README.md
```

---

##  Installation & Local Setup

Follow these steps to get both services running locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18+ recommended) and Git installed.

### 1. Clone the Repository
```bash
git clone https://github.com
cd "Expense Tracker"
```

### 2. Configure Environment Variables
You must set up separate `.env` files for both applications to securely hold database secrets and credentials.

#### 🔹 Setup Backend Environment
Create a `.env` file inside the `Backend/` folder:
```ini
PORT=5000
DB_CONNECTION=mongodb+srv://<username>:<password>@cluster0.fyhcc.mongodb.net/ExpenseTracker?retryWrites=true&w=majority
```

#### 🔹 Setup Background Services Environment
Create a `.env` file inside the `Backgroundservices/` folder:
```ini
PORT=5001
DB_CONNECTION=mongodb+srv://<username>:<password>@cluster0.fyhcc.mongodb.net/ExpenseTracker?retryWrites=true&w=majority
EMAIL=your_sending_gmail@gmail.com
PASSWORD=your_16_digit_google_app_password
ADMIN_EMAIL=your_receiving_email@gmail.com
```

---

## 🚀 Running the Project

Open two separate terminal windows to launch both architectures concurrently.

### Terminal 1: Spin up the API Server
```bash
cd Backend
npm install
npm run dev   # Runs using nodemon on port 5000
```

### Terminal 2: Spin up the Automated Email Service
```bash
cd Backgroundservices
npm install
nodemon index.js   # Runs using nodemon on port 5001
```

---

##  Security & Deployment Notes

- **Google App Passwords:** To prevent SMTP authentication blocks, make sure `PASSWORD` uses a 16-character Google App Password rather than your standard account login.
- **Database IP Access Lists:** If deploying to a hosting provider or running on a fresh network, verify your cloud hosting IP or server environment is whitelisted under **Network Access** in MongoDB Atlas.
