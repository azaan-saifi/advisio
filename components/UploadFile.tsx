"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiFile, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userId } = useAuth();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!userId) {
        toast.error("Please sign in to upload files.");
        return;
      }
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
    },
    [userId]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    noClick: true,
    noKeyboard: false,
  });

  const handleDropzoneClick = () => {
    if (!userId) {
      toast.error("Please sign in to upload files.");
      return;
    }

    open();
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    if (!userId) {
      toast.error("Please sign in to upload files.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process PDF");
      }
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast.error("Failed to process PDF. Please try again.");
    } finally {
      setIsSubmitting(false);
      setFile(null);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-6 bg-[#211F37] p-4">
      <h1 className="text-3xl font-bold text-white">
        Upload Your PDF Document
      </h1>
      <div className="mx-auto w-full max-w-md">
        <div
          {...getRootProps()}
          onClick={handleDropzoneClick}
          className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200 ease-in-out ${
            isDragActive
              ? "border-purple-600 bg-purple-50/5"
              : "border-gray-300 hover:border-purple-600 hover:bg-purple-50/5"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiFile className="mr-4 rounded-md bg-purple-600 p-1 text-4xl text-white" />
                <div className="flex flex-col items-start justify-center">
                  <p className="text-sm font-medium text-zinc-300">
                    {file.name}
                  </p>
                  <p className="text-xs text-zinc-300">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-700"
                aria-label="Remove file"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <FiUpload className="text-4xl text-purple-600" />
              <div>
                <p className="mb-1 text-lg font-medium text-zinc-300">
                  Drop your PDF here, or click to browse
                </p>
                <p className="text-sm text-gray-500">Supports PDF files only</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Button
        className="flex w-full max-w-md items-center justify-center gap-2 bg-purple-600 text-white transition-all hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isSubmitting || !file || !userId}
      >
        {isSubmitting && <Loader className="size-4 animate-spin" />}
        {isSubmitting ? "Processing PDF..." : "Submit"}
      </Button>
    </div>
  );
}
