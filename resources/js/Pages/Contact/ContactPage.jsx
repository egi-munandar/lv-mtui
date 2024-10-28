import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { ArrowLeftIcon, ArrowRightIcon, PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Tooltip, Typography } from '@material-tailwind/react'
import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function ContactPage({ contacts }) {
    const [mdAdd, setMdAdd] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState(0)
    const [queryString, setQueryString] = useState('')
    const cForm = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
    })
    const toggleMdAdd = () => {
        if (editMode && mdAdd) {
            setEditMode(false)
            cForm.reset()
        }
        setMdAdd(!mdAdd)
    }
    const submitAdd = e => {
        e.preventDefault()
        cForm.post('/contact', {
            onSuccess: () => {
                cForm.reset()
                toggleMdAdd()
                Swal.fire({
                    toast: true,
                    timer: 1500,
                    title: 'Contact Added!',
                    timerProgressBar: true,
                    showConfirmButton: false,
                    position: 'top-right',
                    icon: 'success',
                })
            },
        })
    }
    const submitUpd = e => {
        e.preventDefault()
        cForm.put('/contact/' + editId, {
            onSuccess: () => {
                cForm.reset()
                toggleMdAdd()
                Swal.fire({
                    toast: true,
                    timer: 1500,
                    title: 'Contact Updated!',
                    timerProgressBar: true,
                    showConfirmButton: false,
                    position: 'top-right',
                    icon: 'success',
                })
            },
        })
    }
    const deletContact = ct => {
        Swal.fire({
            icon: 'question',
            title: 'Delete Contact?',
            text: ct.name,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            confirmButtonText: 'Delete',
            preConfirm: () => cForm.delete('/contact/' + ct.id, {
                onSuccess: () => {
                    Swal.fire({
                        toast: true,
                        timer: 1500,
                        title: 'Contact deleted!',
                        timerProgressBar: true,
                        position: 'top-right',
                        showConfirmButton: false,
                        icon: 'success'
                    })
                },
                onError: er => {
                    console.log(er)
                    Swal.fire('Error', 'Can\'t Delete Contact!', 'error')
                }
            })
        })
    }
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
                        <div className="w-full p-4">
                            <Button onClick={toggleMdAdd} className="flex items-center gap-2">
                                <PlusIcon className="size-4" />Create Contact
                            </Button>
                        </div>
                        <div className="p-4 w-[10rem]">
                            <Input onKeyUp={e => {
                                if (e.key === 'Enter') {
                                    router.visit(`/contact`, {
                                        only: ['contacts'], preserveState: true, data: {
                                            q: queryString
                                        }
                                    })
                                }
                            }} onChange={e => setQueryString(e.target.value)} defaultValue={queryString} className="focus:ring-0" icon={<MagnifyingGlassIcon />} label="Search name or email..." />
                        </div>
                        <div className="overflow-y-auto">
                            <table className="w-full min-2-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 rounded-tl-md">Act</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">Name</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">Email</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">Phone</th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 rounded-tr-md">Company</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contacts.data.map((ct, i) => <tr key={i} className="even:bg-blue-gray-50/50">
                                            <td className="p-2 flex items-center gap-2">
                                                <Tooltip content="Delete">
                                                    <Button onClick={() => deletContact(ct)} color="red" className="p-2">
                                                        <XMarkIcon className="size-5" />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Edit">
                                                    <Button onClick={() => {
                                                        setEditId(ct.id)
                                                        setEditMode(true)
                                                        cForm.setData(ct)
                                                        toggleMdAdd()
                                                    }} color="amber" className="p-2">
                                                        <PencilIcon className="size-5" />
                                                    </Button>
                                                </Tooltip>
                                            </td>
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
                                                <Link href={contacts.prev_page_url} key={i}>
                                                    <Button variant="text" className="flex items-center gap-2">
                                                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />Previous
                                                    </Button>
                                                </Link>
                                                : i + 1 === contacts.links.length ?
                                                    <Link key={i} href={contacts.next_page_url}>
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
            <Dialog open={mdAdd} handler={toggleMdAdd}>
                <DialogHeader>{editMode ? 'Edit' : 'Create'} Contact</DialogHeader>
                <DialogBody>
                    <form onSubmit={editMode ? submitUpd : submitAdd} id="fAdd">
                        <div className="w-full p-2">
                            <Input type="text" defaultValue={cForm.data.name} className="focus:ring-0" error={cForm.errors.name} onChange={e => cForm.setData({ ...cForm.data, name: e.target.value })} label="Name" />
                            {
                                cForm.errors.name ? <Typography color="red" variant="small" className="mt-2 font-normal">
                                    {cForm.errors.name}
                                </Typography> : ''
                            }
                        </div>
                        <div className="w-full p-2">
                            <Input type="email" defaultValue={cForm.data.email} className="focus:ring-0" error={cForm.errors.email} onChange={e => cForm.setData({ ...cForm.data, email: e.target.value })} label="Email" />
                            {
                                cForm.errors.email ? <Typography color="red" variant="small" className="mt-2 font-normal">
                                    {cForm.errors.email}
                                </Typography> : ''
                            }
                        </div>
                        <div className="w-full p-2">
                            <Input type="text" className="focus:ring-0" defaultValue={cForm.data.phone} error={cForm.errors.phone} onChange={e => cForm.setData({ ...cForm.data, phone: e.target.value })} label="Phone" />
                            {
                                cForm.errors.phone ? <Typography color="red" variant="small" className="mt-2 font-normal">
                                    {cForm.errors.phone}
                                </Typography> : ''
                            }
                        </div>
                        <div className="w-full p-2">
                            <Input type="text" className="focus:ring-0" defaultValue={cForm.data.company} error={cForm.errors.company} onChange={e => cForm.setData({ ...cForm.data, company: e.target.value })} label="Company" />
                            {
                                cForm.errors.company ? <Typography color="red" variant="small" className="mt-2 font-normal">
                                    {cForm.errors.company}
                                </Typography> : ''
                            }
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={toggleMdAdd} className="mr-2">
                        Close
                    </Button>
                    <Button type="submit" form="fAdd" loading={cForm.processing} color="green">
                        Submit
                    </Button>
                </DialogFooter>
            </Dialog>
        </AuthenticatedLayout>
    )
}
