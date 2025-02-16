"use client"

import Shell from "@/components/Shell";
import Markdown from 'react-markdown'
import MarkdownEditor from "@/components/MarkdownEditor";
import React, {useEffect, useState} from "react";
import remarkGfm from "remark-gfm";
import {Note} from "@/types";
import {API_URL} from "@/utils/api";
import {ClipboardIcon} from "@heroicons/react/16/solid";

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${API_URL}/notes`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw Error("GET failed");
            }

            const data = await response.json();
            setNotes(data);

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/notes`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({content: text})
            });

            if (!response.ok) {
                throw Error("POST failed");
            }

            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async (noteId: number) => {
        const response = await fetch(`${API_URL}/notes/${noteId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        })

        if (!response.ok) {
            throw Error("DELETE failed");
        }

        fetchNotes();
    }

    const [text, setText] = useState(`# Welcome to the Markdown Editor

This editor supports:
- Vim keybindings
- Markdown syntax highlighting

`);

    return (
        <Shell highlightedTab={"Notes"}>
            <p className="text-4xl text-center mb-10">Notes</p>

            {/*TODO: Allow user to add notes and then link them to topics*/}
            <div className="flex justify-around">
                <MarkdownEditor text={text} setText={setText}/>

                <button
                    className="border rounded bg-pink-50 shadow hover:bg-pink-100"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Save
                </button>

                {/*Use remarkGfm plugin for extended markdown support*/}
                <Markdown remarkPlugins={[remarkGfm]} className="prose">
                    {text}
                </Markdown>
            </div>

            <div className="mt-5">
                {/*this might be relevant in the future:*/}
                {/*https://stackoverflow.com/questions/62686893/new-line-n-does-not-work-in-mongodb-atlas*/}
                {notes && notes.map((note) => (
                    <div
                        className="flex justify-between border border-blue-500 rounded my-2 shadow p-2" key={note.id}>
                        <Markdown remarkPlugins={[remarkGfm]} className="prose">
                            {note.content}
                        </Markdown>
                        <div className="flex flex-row items-center gap-4">
                            <button onClick={() => setText(note.content)}>
                                <ClipboardIcon className="size-5"/>
                            </button>
                            <button className="size-5" onClick={() => handleDelete(note.id)}>X</button>
                        </div>
                    </div>
                ))}
            </div>
        </Shell>
    )
}