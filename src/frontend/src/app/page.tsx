import Shell from "@/components/Shell";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {EllipsisHorizontalIcon} from "@heroicons/react/16/solid";

const stats = [
    {name: 'Total Subscribers', stat: '71,897'},
    {name: 'Avg. Open Rate', stat: '58.16%'},
    {name: 'Avg. Click Rate', stat: '24.57%'},
    {name: 'Avg. Click Rate', stat: '24.57%'},
    {name: 'Avg. Click Rate', stat: '24.57%'},
    {name: 'Avg. Click Rate', stat: '24.57%'},
    {name: 'Avg. Click Rate', stat: '24.57%'},
]

const clients = [
    {
        id: 1,
        name: 'Tuple',
        imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg',
        lastInvoice: {date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue'},
    },
    {
        id: 2,
        name: 'SavvyCal',
        imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/savvycal.svg',
        lastInvoice: {date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid'},
    },
    {
        id: 3,
        name: 'Reform',
        imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg',
        lastInvoice: {date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid'},
    },
]

export default function Home() {
    return (
        <div>
            <Shell highlightedTab={"Dashboard"}>
                <p className="text-4xl text-center mb-5">Dashboard</p>

                <div className="my-5">
                    <h3 className="text-base font-semibold text-gray-900">Last 30 days</h3>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {stats.map((item) => (
                            <div key={item.name}
                                 className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                    {clients.map((client) => (
                        <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
                            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                <img
                                    alt={client.name}
                                    src={client.imageUrl}
                                    className="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                                />
                                <div className="text-sm/6 font-medium text-gray-900">{client.name}</div>
                                <Menu as="div" className="relative ml-auto">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Open options</span>
                                        <EllipsisHorizontalIcon aria-hidden="true" className="size-5"/>
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <MenuItem>
                                            <a
                                                href="#"
                                                className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                            >
                                                View<span className="sr-only">, {client.name}</span>
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a
                                                href="#"
                                                className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                            >
                                                Edit<span className="sr-only">, {client.name}</span>
                                            </a>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-gray-500">Last invoice</dt>
                                    <dd className="text-gray-700">
                                        <time dateTime={client.lastInvoice.dateTime}>{client.lastInvoice.date}</time>
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-gray-500">Amount</dt>
                                    <dd className="flex items-start gap-x-2">
                                        <div className="font-medium text-gray-900">{client.lastInvoice.amount}</div>
                                    </dd>
                                </div>
                            </dl>
                        </li>
                    ))}
                </ul>

            </Shell>
        </div>
    );
}
