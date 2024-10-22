import Link from "next/link";

export const BookList = ({books}) => {

    const addBook = async (book) => {
        const postedBook = {
            "isbn": book["volumeInfo"]["industryIdentifiers"][0]["identifier"],
            "title": book["volumeInfo"]["title"],
            "authors": book["volumeInfo"]["authors"],
            "publisher": book["volumeInfo"]["publisher"],
            "publishedDate": book["volumeInfo"]["publishedDate"],
            "description": book["volumeInfo"]["description"],
            "thumbnail": book["volumeInfo"]["imageLinks"] ? book["volumeInfo"]["imageLinks"]["thumbnail"] : "",
        }

        try {
            const response = await fetch("http://localhost:8080/books", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(postedBook),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => {
                    const id = book["id"];
                    const volumeInfo = book["volumeInfo"];
                    const thumbnail = volumeInfo["imageLinks"] ? volumeInfo["imageLinks"]["thumbnail"] : "";
                    const title = volumeInfo["title"];
                    const authors = volumeInfo["authors"];
                    const categories = volumeInfo["categories"];
                    const link = volumeInfo["infoLink"];
                    const description = volumeInfo["description"];

                    return (<li
                        key={id}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <div className="flex flex-1 flex-col p-8">
                            <Link href={link}>
                                <img alt="" src={thumbnail} className="mx-auto h-32 w-32 flex-shrink-0"/>
                            </Link>
                            <h3 className="mt-6 text-sm font-medium text-gray-900">{title}</h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dt className="sr-only">Book Authors</dt>
                                <dd className="text-sm text-gray-500">{authors.join(", ")}</dd>
                                <dt className="sr-only">Role</dt>
                                <dd className="mt-3">
                                <span
                                    className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                  {categories && categories.join(", ") || "N/A"}
                                </span>
                                </dd>
                            </dl>
                            {description.slice(0, 50)}...
                        </div>
                        <button onClick={() => addBook(book)}>
                            Add to Library
                        </button>
                    </li>)
                })}
            </ul>
        </>
    )
}