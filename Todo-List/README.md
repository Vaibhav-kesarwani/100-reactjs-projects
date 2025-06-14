# 📝 React ToDo App with Local Storage

This is a simple and minimal **ToDo application built using React.js**. It allows users to:

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Persist tasks using **localStorage**

Perfect for beginners learning React basics and local storage usage.

---

## 📦 Tech Stack

- ⚛️ React.js (with Hooks)
- 🧠 JavaScript (ES6+)
- 🎨 Tailwind CSS for styling
- 💾 localStorage for data persistence

---


---

## 🚀 Getting Started (Run Locally)

Follow these steps to run the app on your machine:

### 1. Clone the repository

```bash
git clone https://github.com/Vaibhav-kesarwani/50-reactjs-projects.git
cd 50-reactjs-projects/01-Todo-List
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm run dev
```

Your app should now be running at http://localhost:3000

## 🧠 How localStorage Works Here
The app uses `useEffect` to sync the tasks to `localStorage` every time the task list changes, so your data stays safe even after refreshing the page.