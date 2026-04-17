"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LogoUploadProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}

const MAX_LOGO_WIDTH = 200;
const MAX_LOGO_HEIGHT = 80;
const MAX_SIZE_BYTES = 100 * 1024; // 100 KB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      // SVGs can be used as-is (they're text-based)
      if (file.type === "image/svg+xml") {
        resolve(src);
        return;
      }
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(
          MAX_LOGO_WIDTH / img.width,
          MAX_LOGO_HEIGHT / img.height,
          1
        );
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Try to get under MAX_SIZE_BYTES
        let quality = 0.9;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);
        while (
          dataUrl.length > (MAX_SIZE_BYTES * 4) / 3 &&
          quality > 0.3
        ) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = src;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function LogoUpload({ value, onChange }: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Only PNG, JPG, and SVG files are supported.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.");
      return;
    }
    try {
      const dataUrl = await compressImage(file);
      onChange(dataUrl);
    } catch {
      setError("Failed to process image. Please try another file.");
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function onFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  if (value) {
    return (
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt="Company logo"
          className="max-h-12 max-w-[120px] object-contain border border-gray-200 rounded p-1 bg-white"
        />
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-xs text-red-500 hover:text-red-700 transition-colors"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-1 rounded border-2 border-dashed px-4 py-5 cursor-pointer transition-colors",
          dragging
            ? "border-[#8B5CF6] bg-purple-50"
            : "border-gray-300 hover:border-[#8B5CF6] hover:bg-gray-50"
        )}
      >
        <span className="text-sm text-gray-500">
          Drag &amp; drop logo or <span className="text-[#8B5CF6]">browse</span>
        </span>
        <span className="text-xs text-gray-400">PNG, JPG, SVG · max 5 MB</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={onFileInput}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
