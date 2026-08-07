"use client";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface EditorProps {
  value: string;
  onChange: (data: string) => void;
}

// 1. The Custom Upload Adapter Logic
class CloudinaryUploadAdapter {
  loader: any;
  
  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file: File) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);

        fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.url) {
              // CKEditor expects the URL in a 'default' property
              resolve({ default: data.url });
            } else {
              reject(data.error);
            }
          })
          .catch((err) => {
            reject("Upload failed");
            console.error(err);
          });
      });
    });
  }

  abort() {
    // Optional: Add logic to cancel the upload if needed
  }
}

// 2. The Plugin Function that injects the adapter into CKEditor
function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new CloudinaryUploadAdapter(loader);
  };
}

// 3. The Main Editor Component
export default function CustomEditor({ value, onChange }: EditorProps) {
  return (
    <div className="prose max-w-none w-full bg-white text-gray-800">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          extraPlugins: [CustomUploadAdapterPlugin], // Connects the upload logic
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
            'uploadImage', 'insertTable', 'blockQuote', 'undo', 'redo'
          ],
          table: {
            contentToolbar: [
              'tableColumn', 'tableRow', 'mergeTableCells'
            ]
          },
          image: {
            toolbar: [
              'imageTextAlternative', 'toggleImageCaption', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side'
            ]
          }
        }}
      />
    </div>
  );
}