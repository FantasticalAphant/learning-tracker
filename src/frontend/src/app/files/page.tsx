"use client"

import Shell from "@/components/Shell";
import {PhotoIcon} from "@heroicons/react/16/solid";
import React, {useState} from "react";

export default function FilesPage() {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: handle multiple files
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file)

        try {
            const response = await fetch("http://localhost:8080/files/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const fileUrl = await response.text();
            console.log("File uploaded successfully:", fileUrl);
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div>
            <Shell highlightedTab={"Files"}>
                <p className="text-4xl text-center">Files</p>

                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300"/>
                        <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    onChange={handleUpload}
                                    disabled={isUploading}
                                    className="sr-only"
                                    accept="application/pdf,image/png,image/jpeg"
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </Shell>
        </div>
    )
}
