# Carlos Chirenda - Developer Portfolio Website

A highly responsive, modern, and professional developer portfolio website for Carlos Chirenda (NUST Computer Science student & aspiring Software Engineer). The application is built using a **Flask** backend with **WTForms** validation and a dynamic, glassmorphic dark-themed frontend using vanilla **HTML5, CSS3, and JavaScript (ES6+)**.

---

## 🚀 Key Features

- **Hero & Landing Section**: High impact visual ecosystem highlighting internship status for 2026.
- **Interactive Tech Stack Badges**: Structured categorizations (Languages, Web/Mobile, IoT/Hardware, Data/AI, Security) with visual tags.
- **Featured Projects**: Clean CSS Grid cards with visual indicator colors, tech tags, and source code link anchors.
- **Credentials & Timeline**: Double-column configuration showing certifications (Google Cybersecurity, Udacity AI) and Enactus university activities.
- **Opportunities Callout**: High-contrast highlight card targeting software engineering placements.
- **AJAX Contact Form**: Modern input fields incorporating CSRF tokens and real-time backend validation error rendering without page reload.
- **Robust Error Pages**: Custom styled 404 & 500 error pages to keep navigation consistent.

---

## 📂 Folder Structure

```text
Carlos_Chirenda Portfolio/
├── app.py                  # Flask Application Server (routes, form validation, logger)
├── requirements.txt        # Python dependency specifications
├── .env                    # Flask local environment configurations
├── README.md               # Setup and deployment instructions
├── static/
│   ├── css/
│   │   └── style.css       # Core design tokens, gradients, layout, animations, and media rules
│   └── js/
│       └── main.js         # Navigation triggers, active section spy, and AJAX contact handling
└── templates/
    ├── base.html           # Main HTML boiler layout, navigation menus, and global alerts
    ├── index.html          # Portfolio content templates
    ├── 404.html            # Custom page not found error handler
    └── 500.html            # Custom internal server error handler
```

---

## 🛠️ Local Installation & Setup

Follow these steps to run the portfolio on your local machine:

### 1. Prerequisites
Ensure you have **Python 3.8+** installed on your system. You can verify this by running:
```bash
python --version
```

### 2. Clone/Navigate to the Directory
Open your terminal (PowerShell, Command Prompt, or Bash) and navigate to the project directory:
```bash
cd "c:/Users/Hp/OneDrive/Desktop/Projects/Carlos_Chirenda Portfolio"
```

### 3. Setup Virtual Environment (Recommended)
Create and activate a virtual environment to keep your global packages isolated:

**On Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies
Install all required libraries using the package manager:
```bash
pip install -r requirements.txt
```

### 5. Run the Application
Start the Flask development server:
```bash
python app.py
```

After running, you will see output in the terminal indicating the server is active:
```text
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

### 6. View in Browser
Open your web browser of choice and visit:
[http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## ✉️ Testing the Contact Form

- When you fill out and submit the contact form, JavaScript captures the event, serializes the data with the secure CSRF token, and submits an AJAX request to `/`.
- On success: A **green success notification toast** will slide in at the bottom-right, the form inputs will clear, and the messages will print directly to your terminal console:
  ```text
  ============================================================
  NEW PORTFOLIO CONTACT MESSAGE RECEIVED
  From: Name <email@example.com>
  ------------------------------------------------------------
  Message:
  This is a test message.
  ============================================================
  ```
- On validation failure (e.g. invalid email format, empty fields): The form fields will light up with red validation labels and an **orange warning toast** will notify the user.
