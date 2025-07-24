# Savings Tracker

A simple, modern web app for tracking your savings by category. Visualize your progress with an animated donut chart and manage your recent savings with an intuitive interface.

---

## Features

- **Animated Donut Chart:** Visualizes your savings by category, updating in real time as you add, edit, or delete items.
- **Recent Savings List:** See your 10 most recent savings actions, with the ability to add, edit, or delete entries.
- **Account-based Data:** Each user's data is stored separately and only accessible when logged in.
- **Local Demo Authentication:** Users log in with a username and password. New accounts are created on first login.
- **Modern, Accessible UI:** Clean blue-gray color scheme, responsive design, and accessible color contrast.

---

## Technology Stack

- **React** (with TypeScript): UI and state management
- **Vite:** Fast development/build tooling
- **Chart.js** & **react-chartjs-2:** For animated donut (pie) charts
- **LocalStorage:** For all data persistence (accounts and savings data)
- **CSS:** Custom, modern styles (no CSS frameworks)

---

## Setup & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

---

## Usage

- **Login:** Enter a username and password. If the account doesn't exist, it will be created.
- **Add Savings:** Use the form to add a new savings item. The donut chart and list update instantly.
- **Edit/Delete:** Use the buttons on each item card to update or remove entries.
- **Account Data:** All savings data is tied to your username and only accessible when logged in as that user.

---

## ⚠️ Authentication & Security Notice

> **This app uses a very basic, demo-only authentication system.**
>
> - Usernames and passwords are stored in plain text in your browser's localStorage.
> - There is **no password hashing, encryption, or server-side authentication**.
> - This is **not secure** and is intended for demonstration and prototyping only.
> - **Do not use real passwords or sensitive data.**

For a real application, you should implement secure authentication (e.g., with a backend, password hashing, and JWTs).

---

## License

This project is for demo and educational purposes.
