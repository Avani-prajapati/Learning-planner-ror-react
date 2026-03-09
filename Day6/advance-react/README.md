# Chakra UI Setup with Vite (React + TypeScript)

This guide shows how to set up **Chakra UI** in a **Vite + React + TypeScript** project.

---

## 1. Create a Vite Project

```bash
npm create vite@latest app_name
```

Select:

* **Framework:** React
* **Variant:** TypeScript

Then install dependencies:

```bash
cd app_name
npm install
npm run dev
```

---

## 2. Install Chakra UI

```bash
npm install @chakra-ui/react @emotion/react
```

---

## 3. Generate Chakra Provider

```bash
npm i @chakra-ui/cli
npx @chakra-ui/cli snippet add
```

This creates:

```
src/components/ui/provider.tsx
```

---

## 4. Wrap the App with Provider

Update **main.tsx**

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { Provider } from "@/components/ui/provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
)
```

---

## 5. Use Chakra Components

Example:

```tsx
import { Button } from "@chakra-ui/react"

export default function App() {
  return <Button>Click Me</Button>
}
```

---

## Run Project

```bash
npm run dev
```

Open:
`http://localhost:5173`
