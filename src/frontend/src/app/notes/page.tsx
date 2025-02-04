"use client"

import Shell from "@/components/Shell";
import Markdown from 'react-markdown'
import MarkdownEditor from "@/components/MarkdownEditor";
import {useEffect, useState} from "react";
import remarkGfm from "remark-gfm";
import {Note} from "@/types";
import {API_URL} from "@/utils/api";

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

            <div>
                {/*this might be relevant in the future:*/}
                {/*https://stackoverflow.com/questions/62686893/new-line-n-does-not-work-in-mongodb-atlas*/}
                {notes && notes.map((note) => (
                    <div className="flex justify-between" key={note.id}>
                        <span>{note.content}</span>
                        <button onClick={() => handleDelete(note.id)}>X</button>
                    </div>
                ))}
            </div>
        </Shell>
    )
}