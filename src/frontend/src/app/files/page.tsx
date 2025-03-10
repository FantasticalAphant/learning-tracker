"use client"

import Shell from "@/components/Shell";
import React, {useEffect, useState} from "react";
import {S3File} from "@/types";
import {DocumentPlusIcon} from "@heroicons/react/16/solid";
import {API_URL} from "@/utils/api";

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function FilesPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [files, setFiles] = useState<S3File[]>([]);

    const fetchFiles = async () => {
        const response = await fetch(`${API_URL}/files/list`);
        const data = await response.json();

        setFiles(data);
    }

    useEffect(() => {
        fetchFiles();
    }, [])

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: handle multiple files
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file)

        try {
            const response = await fetch(`${API_URL}/files/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const fileUrl = await response.text();
            console.log("File uploaded successfully:", fileUrl);

            fetchFiles()
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    }

    const handleDelete = async (fileName: string) => {
        try {
            const response = await fetch(`${API_URL}/files/delete/${fileName}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Delete failed");
            }

            fetchFiles();
        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    return (
        <div>
            <Shell highlightedTab={"Files"}>
                <p className="text-4xl text-center mb-10">Files</p>

                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <DocumentPlusIcon aria-hidden="true" className="mx-auto size-12 text-gray-300"/>
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
                        <p className="text-xs/5 text-gray-600">PNG, JPG, PDF up to 10MB</p>
                    </div>
                </div>

                <ul>
                    {files && files.map((file, index) => (
                        <li key={index} className="border border-black rounded my-3 p-2">
                            <div className="flex justify-between">
                                <a href={file["url"]} target="_blank" rel="noopener noreferrer">
                                    {file["filename"]}
                                </a>
                                <button onClick={() => handleDelete(file["filename"])} type="button">
                                    X
                                </button>
                            </div>
                            <p>{formatBytes(file["size"])}</p>
                            <p>Modified @ {new Date(file["lastModified"]).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>

            </Shell>
        </div>
    )
}