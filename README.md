# 🛡️ Fullstack Log Analyzer –Project

This is a full-stack cybersecurity log analysis tool developed as a take-home exercise. It allows users to upload log files, analyze them for suspicious activity, and view the results through a responsive web interface with anomaly detection capabilities.

---

## 📦 Tech Stack

| Frontend              | Backend               |
|-----------------------|------------------------|
| React + TypeScript    | Python + Flask         |
| Axios                 | Flask-CORS             |
| Vercel                | Render                 |

---

## 🚀 Live Demo

- **Frontend**: [https://fullstack-log-analyzer.vercel.app](https://fullstack-log-analyzer.vercel.app)
- **Backend**: [https://fullstack-log-analyzer-backend.onrender.com](https://fullstack-log-analyzer-backend.onrender.com)

👤 Demo Credentials
Username: admin
Password: password123
You can also register your own user accounts (stored in browser localStorage).
---

## 📁 Project Structure

fullstack-log-analyzer/
├── frontend/ # React + TypeScript (Vercel)
├── backend/ # Flask + AI logic (Render)
│ ├── app.py
│ ├── parser.py
│ └── requirements.txt


---

## ⚙️ Instructions to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Gudalasaipraneeth/fullstack-log-analyzer.git
cd fullstack-log-analyzer


**2. Run the Backend (Flask)**
cd backend
pip install -r requirements.txt
python app.py
By default, Flask runs at http://localhost:5000

**3. Run the Frontend (React)**
cd ../frontend
npm install

Create a .env file in the frontend/ folder:
REACT_APP_API_URL=http://localhost:5000
Then:

npm start
Frontend runs at http://localhost:3000

---

## 🤖 AI Model / Anomaly Detection Logic
No external ML model is used — this project uses rule-based AI logic for fast and explainable detection.

Rules:
Rule 1: Any log entry with action = Blocked and status_code = 403 is flagged as an anomaly.
→ Reason: "Blocked request with status 403"
→ Confidence: 85%

Rule 2: Any IP making more than 5 requests in a single file is flagged.
→ Reason: "Unusual number of requests from a single IP"
→ Confidence: 95%

Each anomaly includes:

A flag

A reason string

A confidence score between 0.85 and 0.95

These are shown in the frontend table and highlighted in red.

---

** Example Log Files**
"Mon Jun 20 15:29:11 2022","new-gre","HTTP","eby.com/","Blocked","Ebay","Consumer Apps","72","14061","0","0","Productivity Loss","Shopping and Auctions","Online Shopping","None","None","0","None","None","new-gre","Default Department","172.17.3.49","66.211.175.229","GET","403","curl/7.68.0","None","FwFilter","Firewall_1","Other","None","NA","NA","N/A"
"Mon Jun 20 15:30:12 2022","admin","HTTP","google.com/","Allowed","Google","Search","90","2300","0","0","None","Search Engines","Web","None","None","0","None","None","admin","IT","192.168.0.15","172.217.3.110","GET","200","Mozilla/5.0","None","FwFilter","Firewall_1","Other","None","NA","NA","N/A"

---
## 🤖 Where I Used AI/LLMs in This Project
I used an LLM (ChatGPT) during this project to enhance development speed and clarity. Here's how it helped:

Code scaffolding:
I used AI to generate starter templates and structure for:
  The Flask backend (app.py)
  The React file upload handler
  The login and registration forms
  Basic frontend styling and layout


README.md generation:
I used the LLM to help draft a clear, well-organized README.md, and then customized the content to match my actual implementation and project decisions.
