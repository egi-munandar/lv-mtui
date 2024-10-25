import React from 'react'
import { useMaterialTailwindController, setOpenConfigurator } from '@/context'
import { useState } from 'react'
import Sidenav from '@/Partials/Sidenav'

export default function AdminLayout() {
    const [controller, dispatch] = useMaterialTailwindController()
    const sidenavType = controller
    return (
        <div className="min-hscreen bg-blue-gray-50/50">
            <Sidenav
                brandName={'Material'} />
        </div>
    )
}
