import Shell from "@/components/Shell";

export default function Home() {
    return (
        <div>
            <Shell highlightedTab={"Dashboard"}>
                <p className="text-4xl text-center mb-5">Dashboard</p>
                <h1>Content here</h1>
            </Shell>
        </div>
    );
}
