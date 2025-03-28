'use client'

import {Dialog, DialogPanel, DialogTitle} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'

export default function NotificationDrawer({open, setOpen}) {
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <div className="fixed inset-0"/>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-300 ease-in-out data-[closed]:translate-x-full sm:duration-300"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-base font-semibold text-gray-900">Panel
                                            title</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                <span className="absolute -inset-2.5"/>
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                    <div className="text-center text-2xl my-3">
                                        Notification History
                                    </div>

                                    <div>
                                        <p>Added new article @ {new Date().toLocaleString()}</p>
                                        <p>Added new book ...</p>
                                        <p>Added new video ...</p>
                                    </div>

                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
