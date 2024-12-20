"use client"

import Shell from "@/components/Shell";
import ReactMarkdown from 'react-markdown'

const markdownText = `
# Heading 1
**Bold** and *Italic* text

- List item 1
- List item 2
`

export default function NotesPage() {
    return (
        <div>
            <Shell highlightedTab={"Notes"}>
                <p className="text-4xl text-center">Notes</p>
                {/*TODO: Allow user to add notes and then link them to topics*/}
                <ReactMarkdown className="prose">{markdownText}</ReactMarkdown>
            </Shell>
        </div>
    )
}