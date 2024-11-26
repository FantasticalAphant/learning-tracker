import {XCircleIcon} from "@heroicons/react/16/solid";

export default function BookLibrary({books, handleDelete}) {

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.map((book, index) => (
                <li
                    key={index}
                    className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                >
                    <div className="flex flex-1 flex-col p-8">
                        <button className="w-5" onClick={() => handleDelete(book["isbn"])}>
                            <XCircleIcon/>
                        </button>
                        <img alt="" src={book["thumbnail"]} className="mx-auto h-32 w-32 flex-shrink-0"/>
                        <h3 className="mt-6 text-sm font-medium text-gray-900">{book["title"]}</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between">
                            <dt className="sr-only">Title</dt>
                            <dd className="text-sm text-gray-500">{book["authors"].join(",")}</dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="mt-3">
                <span
                    className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Tags here
                </span>
                            </dd>
                        </dl>
                        <div>
                            {book["description"].slice(0, 50)}...
                        </div>
                        <div>
                            {book["publishedDate"]}
                            <br/>
                            {book["publisher"]}
                            <br/>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
