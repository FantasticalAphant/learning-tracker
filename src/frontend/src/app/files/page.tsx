"use client"

import Shell from "@/components/Shell";

export default function FilesPage() {
    return (
        <div>
            <Shell highlightedTab={"Files"}>
                {/*Use AWS S3 to handle files*/}
                <p className="text-4xl text-center">Files</p>
            </Shell>
        </div>
    )
}
