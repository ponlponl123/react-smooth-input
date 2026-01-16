"use client";

// Import from the source during development
import { Input } from "../../src/index";
import { SetStateAction, useState } from "react";

export default function Home() {
  const [val, setVal] = useState("");

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Smooth Input Playground</h1>

      <div
        style={{
          padding: "20px",
          border: "1px solid #eee",
          borderRadius: "8px",
        }}
      >
        <h2>Test Area</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            label="Live Test Input"
            placeholder="Type something..."
            value={val}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setVal(e.target.value)
            }
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => alert(`Value is: ${val}`)}>
              Check Value
            </button>
            <button onClick={() => setVal("")}>Clear</button>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <strong>Current Value:</strong> {val || "(empty)"}
        </div>
      </div>
    </main>
  );
}
