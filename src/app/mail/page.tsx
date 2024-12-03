import ThemeToggle from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic"
import React from "react"

const ComposeButton = dynamic(() => {
    return import('./compose-button')
}, { 
    ssr: false
})

const Mail = dynamic(() => {
    return import('./mail')
}, { 
    ssr: false 
})

const MailDashboard = () => {
    return (
        <>
            <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2">
                    <UserButton />
                    <ThemeToggle />
                    <ComposeButton />
                </div>
            </div>
            <Mail 
                defaultLayout={[20, 32, 48]}
                defaultCollapsed={false}
                navCollapsedSize={4}
            />
        </>
    )
};

export default MailDashboard;