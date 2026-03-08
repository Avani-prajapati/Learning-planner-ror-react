# React Jest Testing Setup (Vite + TypeScript)

This project demonstrates how to **set up Jest and React Testing Library in a React application built with Vite and TypeScript**.
It also includes a simple **Todo App** used to practice **component testing and Test Driven Development (TDD)**.

---

# 🚀 Tech Stack

* React
* Vite
* TypeScript
* Jest
* React Testing Library
* TailwindCSS

---

# 📦 Installation

Clone the repository:

```bash
git clone <your-repo-link>
cd todo-tdd
```

Install dependencies:

```bash
npm install
```

---

# ⚙️ Setup Jest

Install testing dependencies:

```bash
npm install -D jest ts-jest @types/jest jest-environment-jsdom
npm install -D @testing-library/react @testing-library/dom
npm install -D @testing-library/jest-dom @testing-library/user-event
npm install -D identity-obj-proxy
```

---

# 🧩 Configure Jest

Create a file in the root directory:

```
jest.config.ts
```

Add the following configuration:

```ts
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
};
```

This configuration:

* Enables **TypeScript support**
* Uses **jsdom browser environment**
* Loads Testing Library setup
* Prevents errors when importing CSS files

---

# 🧪 Setup Testing Library

Create a setup file:

```
src/setupTests.ts
```

Add:

```ts
import "@testing-library/jest-dom";
```

This enables useful DOM matchers like:

```
toBeInTheDocument()
toHaveTextContent()
toBeVisible()
```

---

# ⚙️ Update TypeScript Configuration

Jest requires small changes in **tsconfig.json**.

Open:

```
tsconfig.json
```

Update or add the following inside `compilerOptions`:

```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"],
    "jsx": "react-jsx"
  }
}
```

### Why these changes are required

`types`

Allows TypeScript to recognize Jest functions:

```
test()
expect()
describe()
```

and Testing Library matchers:

```
toBeInTheDocument()
```

`jsx: react-jsx`

Ensures JSX works correctly while running tests.

---

# ▶️ Running Tests

Run tests using:

```bash
npm test
```



# 📚 What This Project Covers

* Setting up **Jest in a Vite + TypeScript project**
* Using **React Testing Library**
* Writing **component tests**
* Testing **user interactions**
* Practicing **Test Driven Development (TDD)**

---


# 🎯 Learning Goal

The goal of this project is to understand:

* How to configure **Jest in a React project**
* How to test **React components**
* How to test **user behavior instead of implementation details**
* How to follow **Test Driven Development (TDD)**


