import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Head, Link } from '@inertiajs/react'
import { Button, Card, CardBody, IconButton, Typography } from '@material-tailwind/react'
import React from 'react'

export default function ContactPage({ contacts }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contact
                </h2>
            }>
            <Head title="Contacts" />
            <div className="w-full p-8">
                <Card className="w-[80%] mx-auto">
                    <CardBody>
                        <Typography variant="h4">Contacts</Typography>
                        <div className="overflow-y-auto">

                            <table className="w-full min-2-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 rounded-tl-md">Name</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">Email</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">Phone</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 rounded-tr-md">Company</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contacts.data.map((ct, i) => <tr key={i} className="even:bg-blue-gray-50/50">
                                            <td className="p-2">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {ct.name}
                                                </Typography>
                                            </td>
                                            <td className="p-2">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {ct.email}
                                                </Typography>
                                            </td>
                                            <td className="p-2">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {ct.phone}
                                                </Typography>
                                            </td>
                                            <td className="p-2">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {ct.company}
                                                </Typography>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                            <div className="py-2">
                                <Typography variant="small">Showing {contacts.from} to {contacts.to} of {contacts.total} Rows</Typography>
                            </div>
                            <div className="w-full flex">
                                <div className="flex items-center gap-4 pt-4 mx-auto">
                                    <div className="flex items-center gap-2">
                                        {
                                            contacts.links.map((link, i) => i === 0 ?
                                                <Button key={i} variant="text" className="flex items-center gap-2">
                                                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />Previous
                                                </Button>
                                                : i + 1 === contacts.links.length ?
                                                    <Link key={i} href={link.url}>
                                                        <Button variant="text" href={link.url} className="flex items-center gap-2">
                                                            Next<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    : <Link href={link.url} key={i}><IconButton variant={link.active ? 'filled' : 'text'} color='gray'>{link.label}</IconButton></Link>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
