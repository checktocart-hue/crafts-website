"use client";

import { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface CustomEditorProps {
  value: string;
  onChange: (data: string) => void;
}

export default function CustomEditor({ value, onChange }: CustomEditorProps) {
  const editorRef = useRef<any>(null);

  // Sync external state changes (like loading a new post or clicking "+ Shortcode" buttons)
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
        onReady={(editor) => {
          editorRef.current = editor;
          // Expose instance globally so toolbar buttons can insert directly
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
