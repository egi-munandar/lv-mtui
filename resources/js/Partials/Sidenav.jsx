import React from 'react'
import {
    Typography,
} from "@material-tailwind/react";
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import SideNavList from './SideNavList';

export default function Sidenav() {

    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
    return (
        <div>
            <aside className="h-svh overflow-y-auto bg-white w-full shadow-xl shadow-blue-gray-900/5">
                <div className="mb-2 gap-4 p-4">
                    <div className="flex w-full items-center !justify-between">
                        <Link href={route('dashboard')} className="flex py-2.375 mr-4 items-ecnter lg:ml-0">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 mr-2" />
                            <Typography variant="h3" className="inline-block antialiased align-middle leading-tight uppercase" color="blue-gray">{appName}</Typography>
                        </Link>
                    </div>
                </div>
                <SideNavList />
            </aside>
        </div>
    )
}
