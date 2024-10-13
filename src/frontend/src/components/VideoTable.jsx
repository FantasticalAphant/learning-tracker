export default function VideoTable({videos}) {
    return (
        <div>
            <div className="mt-8 flow-root">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Saved Videos</h1>
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Title
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Channel
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Published Date
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {videos.map((video) => (
                                <tr key={video["videoId"]}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        <a href={`https://www.youtube.com/watch?v=${video["videoId"]}`}>
                                            {video["videoTitle"]}
                                        </a>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <a href={`https://www.youtube.com/channel/${video["channelId"]}`}>
                                            {video["channelTitle"]}
                                        </a>
                                    </td>
                                    {/*FIXME: update description*/}
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{video["videoDescription"].slice(0, 50)}...</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(video["publishedAt"]).toLocaleString()}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                            Edit<span className="sr-only">, {video["videoTitle"]}</span>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
