"use client"

import Shell from "@/components/Shell";
import Markdown from 'react-markdown'
import React, {useEffect, useState} from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import remarkGfm from "remark-gfm";
import {Note} from "@/types";
import {API_URL} from "@/utils/api";
import 'katex/dist/katex.min.css'
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function NotesPage() {
    const router = useRouter();
    const [notes, setNotes] = useState<Note[]>([]);

    const remarkPlugins = [remarkGfm, remarkMath]
    const rehypePlugins = [rehypeKatex]

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

    const createNewNote = async () => {
        // create a new note and redirect to that page
        // use this as the default text for the new note
        const text = `# Welcome to the Markdown Editor

This editor supports:
- Vim keybindings
- Markdown syntax highlighting

`;

        try {
            const response = await fetch(`${API_URL}/notes`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({content: text})
            })

            if (!response.ok) {
                throw Error("POST failed");
            }

            const data = await response.json();

            router.replace(`notes/${data.id}`)
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Shell highlightedTab={"Notes"}>
            <p className="text-4xl text-center mb-10">Notes</p>

            {/*TODO: Allow user to add notes and then link them to topics*/}

            <button
                type="button"
                onClick={createNewNote}
                className="bg-orange-200 rounded-md p-1">
                New Note
            </button>

            <div className="mt-5">
                {/*this might be relevant in the future:*/}
                {/*https://stackoverflow.com/questions/62686893/new-line-n-does-not-work-in-mongodb-atlas*/}
                {notes && notes.map((note) => (
                    <Link href={`notes/${note.id}`} key={note.id}>
                        <div
                            className="flex justify-between border border-blue-500 rounded my-2 shadow p-2">

                            <Markdown
                                remarkPlugins={remarkPlugins}
                                rehypePlugins={rehypePlugins}
                                className="prose"
                                components={{
                                    code(props) {
                                        const {children, className, ...rest} = props
                                        const match = /language-(\w+)/.exec(className || '')
                                        return match ? (
                                            <SyntaxHighlighter
                                                language={match[1]}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code {...rest} className={className}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {note.content}
                            </Markdown>

                            <div className="flex flex-row items-center gap-4">
                                {/*<button onClick={(e) => {*/}
                                {/*    // prevent the button click from bubbling up*/}
                                {/*    e.preventDefault();*/}
                                {/*    e.stopPropagation();*/}
                                {/*}}*/}
                                {/*>*/}
                                {/*    <ClipboardIcon className="size-5"/>*/}
                                {/*</button>*/}
                                <button
                                    className="size-5"
                                    onClick={(e) => {
                                        // prevent the button click from bubbling up
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDelete(note.id)
                                    }
                                    }>X
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Shell>
    )
}