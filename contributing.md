# Contributing to 100 ReactJS Projects

Thank you for your interest in contributing to **100 ReactJS Projects**!
This repository is designed to help developers learn React by exploring practical, real-world projects. Contributions from the community make this resource more valuable and diverse.

We welcome improvements, new project additions, UI/UX enhancements, and bug fixes.

---

## Table of Contents

- [Contributing to 100 ReactJS Projects](#contributing-to-100-reactjs-projects)
  - [Table of Contents](#-table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [How You Can Contribute](#how-you-can-contribute)
  - [Getting Started](#getting-started)
    - [1. Fork the Repository](#1-fork-the-repository)
    - [2. Clone Your Fork](#2-clone-your-fork)
    - [3. Install Dependencies](#3-install-dependencies)
    - [4. Run the Development Server](#4-run-the-development-server)
  - [Adding a New Project](#adding-a-new-project)
    - [Step 1: Upload Your Project Image](#step-1-upload-your-project-image)
    - [Step 2: Update `config/project-Item.tsx`](#step-2-update-configproject-Itemtsx)
  - [Improving UI/UX](#improving-uiux)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Commit Message Standards](#commit-message-standards)
  - [Pull Request Process](#pull-request-process)
  - [Reporting Issues](#reporting-issues)
  - [Screenshots for UI Changes](#screenshots-for-ui-changes)
  - [License](#license)
  - [Show Your Support](#show-your-support)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please be constructive and supportive in your contributions and feedback.

---

## How You Can Contribute

You can contribute in several ways:

- Add a new React project
- Improve UI/UX and design
- Fix bugs
- Improve documentation
- Optimize performance
- Enhance accessibility and responsiveness

---

## Getting Started

### 1. Fork the Repository

Click the **Fork** button at the top right of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/Vaibhav-kesarwani/100-reactjs-projects.git
cd 100-reactjs-projects
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open your browser and navigate to:

```bash
http://localhost:3000
```

---

## Adding a New Project

To add your React.js / Next.js project:

### Step 1: Upload Your Project Image

Add the image to the `public/projects` directory.

**Example:**

```
public/projects/todo-app.png
```

Ensure the image:

- Is optimized and high quality
- Uses lowercase letters and hyphens
- Is in `.png`, `.jpg`, `.jpeg`, or `.webp` format

---

### Step 2: Update `config/project-Item.tsx`

Add your project details inside the `project-Item.tsx` file.

```tsx
{
    projectName: "Project Name",
    description: "Project Description",
    projectImage: "project.png", // only write the image name not the projects folder.
    githubLink: "github-link",
    liveLink: "live-link", // optional
    ytLink: "yt-link", // optional
    techStack: ["React js"], // it is an array ["React js", "Next js", "Tailwind css"]
    difficulty: "Beginner", // Beginner | Intermediate | Advanced
    skills: ["Routing", "State Management"], // Optional: array of skills taught
    learningPath: ["Frontend Mastery"], // Optional: learning path categories
    estimatedTime: "2-3 weeks", // Optional: estimated time to complete
    prerequisites: ["React Basics"] // Optional: prerequisite knowledge
}
```
### Difficulty Levels

Every project must include a valid `difficulty` field.

Allowed values:

- `Beginner`
- `Intermediate`
- `Advanced`

### Structured Learning Fields (Optional but Recommended)

To make projects more beginner-friendly, please consider adding these structured learning fields:
- `skills`: A list of core concepts learned (e.g., `["API Fetching", "State Management"]`)
- `learningPath`: Recommended learning tracks (e.g., `["React Basics", "Fullstack Next.js"]`)
- `estimatedTime`: Expected time to build (e.g., `"2-3 days"`, `"1 week"`)
- `prerequisites`: Required knowledge before starting (e.g., `"JavaScript Basics"`)

Ensure:

- The image path matches the file in the `public/projects` folder.
- All links are valid and working.

---

## Improving UI/UX

We encourage contributors to enhance the website’s design and usability.

You can:

- Improve responsiveness and accessibility
- Enhance animations and transitions
- Refine typography and color schemes
- Optimize layouts and spacing
- Improve dark/light mode support
- Enhance performance and user experience

Before making major UI changes, please open an issue to discuss your proposal.

---

## Contribution Guidelines

Please ensure that:

- ✅ Your code follows best practices.
- ✅ The project builds without errors.
- ✅ No console warnings or errors are introduced.
- ✅ Code is clean, readable, and well-structured.
- ✅ Images are optimized.
- ✅ You test your changes before submitting.
- ✅ You do not include sensitive information or API keys.

---

## Commit Message Standards

Follow the Conventional Commits format:

```
feat: add new weather app project
fix: resolve layout issue in project card
docs: update contributing guidelines
style: improve button styling
refactor: optimize project-Item component
chore: update dependencies
```

---

## Pull Request Process

1. Create a new branch:

   ```bash
   git checkout -b feature/add-todo-app
   ```

2. Commit your changes:

   ```bash
   git commit -m "feat: add todo app project"
   ```

3. Push to your fork:

   ```bash
   git push origin feature/add-todo-app
   ```

4. Open a Pull Request and include:
   - A clear description of your changes
   - Screenshots (for UI updates)
   - Relevant issue references

---

## Reporting Issues

If you find a bug or want to suggest a feature:

1. Open the matching issue form.
2. Select your contribution program: `General`, `GSSoC 2026`, or `NSoC 2026`.
3. Fill in the structured fields with a clear problem statement and expected solution.
4. Include screenshots, references, reproduction steps, and environment details when relevant.

---

## Screenshots for UI Changes

For UI/UX contributions, please include:

- Before and after screenshots
- Responsive previews (desktop and mobile)

---

## License

By contributing to this repository, you agree that your contributions will be licensed under the same license as the project.

---

## Show Your Support

If you find this project helpful:

- Star the repository
- Fork it
- Share it with others
- Contribute to make it better

---

**Happy Coding! 💙**
