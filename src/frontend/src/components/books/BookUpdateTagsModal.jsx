'use client'

import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'

export default function BookUpdateTagsModal({
                                                open,
                                                setOpen,
                                                topics,
                                                selectedTopics,
                                                handleCheckboxChange,
                                                updateTopics
                                            }) {

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="sm:flex sm:items-start">
                            <div
                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                {/*TODO: change this icon and color*/}
                                <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600"/>
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Update Tags
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        <fieldset>
                                            <legend className="sr-only">Tags</legend>
                                            <div className="space-y-5">
                                                {topics.map(topic => (
                                                    <div key={topic.id}>
                                                        <div className="relative flex items-start">
                                                            <div className="flex h-6 items-center">
                                                                <input
                                                                    id={topic.name}
                                                                    name={topic.name}
                                                                    type="checkbox"
                                                                    checked={selectedTopics.includes(topic.id)}
                                                                    onChange={(e) => handleCheckboxChange(e.target.checked, topic.id)}
                                                                    aria-describedby="tags-description"
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                />
                                                            </div>
                                                            <div className="ml-3 text-sm leading-6">
                                                                <span id="candidates-description"
                                                                      className="text-gray-900">{topic.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </fieldset>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={() => {
                                    updateTopics();
                                    setOpen(false);
                                }}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
