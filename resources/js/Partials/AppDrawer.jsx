import { Drawer, Typography } from '@material-tailwind/react'
import React from 'react'
import SideNavList from './SideNavList'

export default function AppDrawer({ drawerOpen, setDrawerOpen }) {
    const closeDrawer = () => setDrawerOpen(false)

    return (
        <Drawer open={drawerOpen} onClose={closeDrawer} className="p-4 lg:hidden">
            <div className="mb-6 flex-items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                    App
                </Typography>
            </div>
            <div className="h-svh overflow-y-auto">
                <SideNavList />
            </div>
        </Drawer>
    )
}
