/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'

import {useEffect, useState} from 'react'
import {
    Bars3Icon,
    BellIcon,
    BookOpenIcon,
    CheckCircleIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    DocumentTextIcon,
    FolderIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline'
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {TvIcon} from "@heroicons/react/24/outline/index";
import Link from "next/link";
import {useTopics} from "@/contexts/TopicsContext";
import NotificationDrawer from "@/components/NotificationDrawer";

const navigationTabs = [
    {name: 'Topics', href: '/topics', icon: FolderIcon, current: false},
    {name: 'Articles', href: '/articles', icon: DocumentTextIcon, current: false},
    {name: 'Books', href: '/books/library', icon: BookOpenIcon, current: false},
    {name: 'Videos', href: '/videos', icon: TvIcon, current: false},
    {name: 'Tasks', href: '/tasks', icon: CheckCircleIcon, current: false},
    {name: 'Notes', href: '/notes', icon: PencilSquareIcon, current: false},
    {name: 'Files', href: '/files', icon: DocumentDuplicateIcon, current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Shell({children, highlightedTab}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [navigation, setNavigation] = useState(navigationTabs)
    const {topics} = useTopics()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setNavigation((prevNav) =>
            prevNav.map((item) =>
                item.name === highlightedTab ? {...item, current: true} : {...item, current: false}
            )
        );
    }, [highlightedTab]);

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div>
                {/*<Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">*/}
                {/*    <DialogBackdrop*/}
                {/*        transition*/}
                {/*        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"*/}
                {/*    />*/}

                {/*    <div className="fixed inset-0 flex">*/}
                {/*        <DialogPanel*/}
                {/*            transition*/}
                {/*            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"*/}
                {/*        >*/}
                {/*            <TransitionChild>*/}
                {/*                <div*/}
                {/*                    className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">*/}
                {/*                    <button type="button" onClick={() => setSidebarOpen(false)}*/}
                {/*                            className="-m-2.5 p-2.5">*/}
                {/*                        <span className="sr-only">Close sidebar</span>*/}
                {/*                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white"/>*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            </TransitionChild>*/}
                {/*            /!* Sidebar component, swap this element with another sidebar if you like *!/*/}
                {/*            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">*/}
                {/*                <div className="flex h-16 shrink-0 items-center">*/}
                {/*                    <img*/}
                {/*                        alt="Your Company"*/}
                {/*                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"*/}
                {/*                        className="h-8 w-auto"*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*                <nav className="flex flex-1 flex-col">*/}
                {/*                    <ul role="list" className="flex flex-1 flex-col gap-y-7">*/}
                {/*                        <li>*/}
                {/*                            <ul role="list" className="-mx-2 space-y-1">*/}
                {/*                                {navigation.map((item) => (*/}
                {/*                                    <li key={item.name}>*/}
                {/*                                        <Link*/}
                {/*                                            href={item.href}*/}
                {/*                                            className={classNames(*/}
                {/*                                                item.current*/}
                {/*                                                    ? 'bg-gray-50 text-indigo-600'*/}
                {/*                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',*/}
                {/*                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',*/}
                {/*                                            )}*/}
                {/*                                        >*/}
                {/*                                            <item.icon*/}
                {/*                                                aria-hidden="true"*/}
                {/*                                                className={classNames(*/}
                {/*                                                    item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',*/}
                {/*                                                    'h-6 w-6 shrink-0',*/}
                {/*                                                )}*/}
                {/*                                            />*/}
                {/*                                            {item.name}*/}
                {/*                                        </Link>*/}
                {/*                                    </li>*/}
                {/*                                ))}*/}
                {/*                            </ul>*/}
                {/*                        </li>*/}
                {/*                        <li>*/}
                {/*                            <div className="text-xs font-semibold leading-6 text-gray-400">Your teams*/}
                {/*                            </div>*/}
                {/*                            <ul role="list" className="-mx-2 mt-2 space-y-1">*/}
                {/*                                {teams.map((team) => (*/}
                {/*                                    <li key={team.name}>*/}
                {/*                                        <a*/}
                {/*                                            href={team.href}*/}
                {/*                                            className={classNames(*/}
                {/*                                                team.current*/}
                {/*                                                    ? 'bg-gray-50 text-indigo-600'*/}
                {/*                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',*/}
                {/*                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',*/}
                {/*                                            )}*/}
                {/*                                        >*/}
                {/*              <span*/}
                {/*                  className={classNames(*/}
                {/*                      team.current*/}
                {/*                          ? 'border-indigo-600 text-indigo-600'*/}
                {/*                          : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',*/}
                {/*                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',*/}
                {/*                  )}*/}
                {/*              >*/}
                {/*                {team.initial}*/}
                {/*              </span>*/}
                {/*                                            <span className="truncate">{team.name}</span>*/}
                {/*                                        </a>*/}
                {/*                                    </li>*/}
                {/*                                ))}*/}
                {/*                            </ul>*/}
                {/*                        </li>*/}
                {/*                        <li className="mt-auto">*/}
                {/*                            <a*/}
                {/*                                href="#"*/}
                {/*                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"*/}
                {/*                            >*/}
                {/*                                <Cog6ToothIcon*/}
                {/*                                    aria-hidden="true"*/}
                {/*                                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"*/}
                {/*                                />*/}
                {/*                                Settings*/}
                {/*                            </a>*/}
                {/*                        </li>*/}
                {/*                    </ul>*/}
                {/*                </nav>*/}
                {/*            </div>*/}
                {/*        </DialogPanel>*/}
                {/*    </div>*/}
                {/*</Dialog>*/}

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <Link href="/" className="text-2xl text-indigo-600 font-mono font-semibold mt-7">Knowledge
                                Tracker</Link>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-50 text-indigo-600'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                            'h-6 w-6 shrink-0',
                                                        )}
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <div className="text-xs font-semibold leading-6 text-gray-400">Your recent topics
                                    </div>
                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                        {topics && topics.map((topic) => (
                                            <li key={topic.id}>
                                                <Link
                                                    href={`/topics/${topic.id}`}
                                                    className={classNames(
                                                        topic.current
                                                            ? 'bg-gray-50 text-indigo-600'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                    )}
                                                >
                          <span
                              className={classNames(
                                  topic.current
                                      ? 'border-indigo-600 text-indigo-600'
                                      : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                              )}
                          >
                            {topic.name["0"]}
                          </span>
                                                    <span className="truncate">{topic.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <a
                                        href="#"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        <Cog6ToothIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                        />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-56">
                    <div
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)}
                                className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                        </button>

                        {/* Separator */}
                        <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden"/>

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form action="#" method="GET" className="relative flex flex-1">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                />
                                <input
                                    id="search-field"
                                    name="search"
                                    type="search"
                                    placeholder="Search..."
                                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button
                                    type="button"
                                    onClick={() => setOpen(!open)}
                                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>

            <NotificationDrawer open={open} setOpen={setOpen}/>
        </>
    )
}
