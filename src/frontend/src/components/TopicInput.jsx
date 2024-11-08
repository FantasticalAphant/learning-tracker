import {useState} from "react";

export const TopicInput = ({onTopicsAdded}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/topics", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: name,
                    description: description
                })
            });

            if (response.ok) {
                onTopicsAdded();
                setName("");
                setDescription("");
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:py-6">
                    <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                        Topic Name:
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <input
                            id="topic"
                            name="topic"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        />
                    </div>
                    <label htmlFor="description"
                           className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                        Description:
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full max-w-2xl rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!name.trim()}
                    className={`rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${name.trim() ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-300 cursor-not-allowed"}`}
                >
                    Submit
                </button>
            </form>
        </>
    )
}