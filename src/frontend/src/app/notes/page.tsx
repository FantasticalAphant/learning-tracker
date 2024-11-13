"use client"

import Shell from "@/components/Shell";

export default function NotesPage() {
    return (
        <div>
            <Shell highlightedTab={"Notes"}>
                Notes
                {/*TODO: Allow user to add notes and then link them to topics*/}
            </Shell>
        </div>
    )
}