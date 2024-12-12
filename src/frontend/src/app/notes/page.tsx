"use client"

import Shell from "@/components/Shell";

export default function NotesPage() {
    return (
        <div>
            <Shell highlightedTab={"Notes"}>
                <p className="text-4xl text-center">Notes</p>
                {/*TODO: Allow user to add notes and then link them to topics*/}
            </Shell>
        </div>
    )
}