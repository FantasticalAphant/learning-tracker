"use client"

import Shell from "@/components/Shell";
import MarkdownEditor from "@/components/MarkdownEditor";
import Markdown from "react-markdown";
import React, {useEffect, useState} from "react";
import {API_URL} from "@/utils/api";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Link from "next/link";

interface Params {
    params: { id: string; };
}

export default function IndividualNotesPage({params}: Params) {
    const [text, setText] = useState("");
    const {id} = params;

    const remarkPlugins = [remarkGfm, remarkMath]
    const rehypePlugins = [rehypeKatex]

    const fetchNote = async () => {
        try {
            const response = await fetch(`${API_URL}/notes/${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            })

            if (!response.ok) {
                throw Error("GET failed");
            }

            const data = await response.json();

            setText(data?.content)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchNote();
    }, []);


    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/notes/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({content: text})
            });

            if (!response.ok) {
                throw Error("POST failed");
            }

            fetchNote();
        } catch (err) {
            console.error(err);
        }
    }

    return (<Shell highlightedTab={"Notes"}>
        <p className="text-4xl text-center mb-10">Notes</p>

        <div className="mb-3">
            <Link href="/notes" className="bg-blue-100 rounded-md p-1">Back to notes</Link>
        </div>

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
            <div className="w-1/2">
                <Markdown
                    remarkPlugins={remarkPlugins}
                    rehypePlugins={rehypePlugins}
                    className="prose"
                >
                    {text}
                </Markdown>
            </div>

        </div>

    </Shell>)
}