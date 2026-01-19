# react-smooth-input

A smooth, modern React component library built for Next.js.

## Installation

```bash
npm install react-smooth-input
```

## Usage

```tsx
import { Button, Input } from "react-smooth-input";

export default function Page() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Input label="Username" placeholder="Enter your username" />
      <Button variant="primary" onClick={() => console.log("Clicked")}>
        Sign Up
      </Button>
    </div>
  );
}
```

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start build in watch mode:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Live Development (Playground)

To see your changes live, I've included a Next.js example app in the `example` folder.

1. **Terminal 1**: Start the library builder in watch mode:

   ```bash
   npm run dev
   ```

2. **Terminal 2**: Start the example app:

   ```bash
   cd example
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to see your components in action. Any changes you make to `src/` will rebuild and update the example app.

## Stack

- **React 18**
- **TypeScript**
- **tsup** for bundling
- **Next.js** compatible ('use client' directives included)
