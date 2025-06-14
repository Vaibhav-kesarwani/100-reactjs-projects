# simple-auth-kit 🔐
---
## ✨ Provide authentication with write backend code 
---
A simple and reusable Node.js authentication package using **MongoDB**, **JWT**, and **bcrypt**. Just plug it into your frontend project and go!

---
## 🚀 Installation
```bash
npm install simple-auth-kit

```
## 🛠️ Usage

```js
const { connectDB, register, login } = require("simple-auth-kit");

// Connect to MongoDB
connectDB("mongodb://localhost:27017/testauth");

// Register a new user
const reg = async () => {
  const res = await register({
    name: "Rijwan",
    email: "rijwan@example.com",
    address: "India",
    gender: "male",
    password: "pass123"
  });
  console.log(res);
};
reg();

// Login the user
const loginuser = async () => {
  const res = await login({
    email: "rijwan@example.com",
    password: "pass123"
  });
  console.log(res);
};
loginuser();

//More sample code are comming 



