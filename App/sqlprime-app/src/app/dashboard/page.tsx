"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function Dashboard() {
  const [sqlQuery, setSqlQuery] = useState<string>("-- Write your SQL query here\nSELECT * FROM users;");

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setSqlQuery(value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">SQL Query Dashboard</h1>
      </header>
      
      <main className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl h-[70vh] border rounded-lg overflow-hidden shadow-lg">
          <Editor
            height="100%"
            defaultLanguage="sql"
            defaultValue={sqlQuery}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              fontSize: 14,
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
        </div>
      </main>
    </div>
  );
}