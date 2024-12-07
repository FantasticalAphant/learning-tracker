import {useState} from "react";

export const ArticleInput = ({onArticleAdded}) => {
    const [articleUrl, setArticleUrl] = useState("");

    const handleSubmit = async () => {
        try {
            const newArticle = {url: articleUrl};

            const response = await fetch("http://localhost:8080/articles", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newArticle)
            });

            onArticleAdded();

            setArticleUrl("");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                Add article
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
                <input
                    id="text"
                    name="text"
                    type="text"
                    value={articleUrl}
                    onChange={event => setArticleUrl(event.target.value)}
                    placeholder="Article URL"
                    className="block w-3/6 rounded-none rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                    type="submit" onClick={handleSubmit}
                    disabled={!articleUrl.trim()}
                    className={`relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 ${articleUrl.trim() ? "bg-indigo-600 hover:bg-indigo-500 " : "bg-indigo-300 cursor-not-allowed"}`}
                >
                    Add
                </button>
            </div>
        </>
    )
}