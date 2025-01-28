"use client"

import Shell from "@/components/Shell";
import Markdown from 'react-markdown'
import MarkdownEditor from "@/components/MarkdownEditor";
import {useState} from "react";
import remarkGfm from "remark-gfm";

export default function NotesPage() {
    const [text, setText] = useState(`# Welcome to the Markdown Editor

This editor supports:
- Vim keybindings
- Markdown syntax highlighting

`);

    return (
        <div>
            <Shell highlightedTab={"Notes"}>
                <p className="text-4xl text-center mb-10">Notes</p>
                {/*TODO: Allow user to add notes and then link them to topics*/}
                <div className="flex justify-around">
                    <MarkdownEditor text={text} setText={setText}/>
                    {/*Use remarkGfm plugin for extended markdown support*/}
                    <Markdown remarkPlugins={[remarkGfm]} className="prose">
                        {text}
                    </Markdown>
                </div>
            </Shell>
        </div>
    )
}