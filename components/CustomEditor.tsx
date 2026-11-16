"use client";

import { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// 1. Create a custom upload adapter that bridges CKEditor to your Next.js backend
class CustomUploadAdapter {
  loader: any;
  
  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          // Matches the field name your /api/upload route expects
          formData.append("file", file);

          fetch("/api/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.url) {
                // CKEditor requires the response to have a 'default' key containing the URL
                resolve({ default: data.url });
              } else {
                reject(data.error || "Upload failed. Check your API route.");
              }
            })
            .catch((err) => {
              console.error("CKEditor upload error:", err);
              reject("Upload failed.");
            });
        })
    );
  }

  abort() {
    // Optional: Add upload cancellation logic here if needed
  }
}

// 2. Wrap it in a CKEditor plugin function
function uploadPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new CustomUploadAdapter(loader);
  };
}

interface CustomEditorProps {
  value: string;
  onChange: (data: string) => void;
}

export default function CustomEditor({ value, onChange }: CustomEditorProps) {
  const editorRef = useRef<any>(null);

  // Sync external state changes into CKEditor
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && value !== undefined) {
      const currentData = editor.getData();
      if (value !== currentData) {
        editor.setData(value);
      }
    }
  }, [value]);

  return (
    <div className="prose max-w-none">
      <CKEditor
        editor={ClassicEditor as any}
        data={value}
        config={{
          // 3. Inject our custom plugin into the CKEditor configuration
          extraPlugins: [uploadPlugin],
        }}
        onReady={(editor) => {
          editorRef.current = editor;
          if (typeof window !== "undefined") {
            (window as any).__ckEditorInstance = editor;
          }
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
