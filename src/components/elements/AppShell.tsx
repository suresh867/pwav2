'use client'

import { syncQueuedActions } from '@/lib/utils/sync'
import { useEffect, useState } from 'react'
import { OfflineBanner } from './OfflineBanner'
import { SplashScreen } from './SplashScreen'

export function AppShell({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setTimeout(() => setReady(true), 800)
        
        // Run once on mount
        if (navigator.onLine) {
            syncQueuedActions()
        }

        const handleOnline = () => {
            syncQueuedActions()
        }

        window.addEventListener('online', handleOnline)

        return () => {
            window.removeEventListener('online', handleOnline)
        }
    }, [])

    if (!ready) {
        return <SplashScreen />
    }

    return (
        <>
            <OfflineBanner />
            {children}
        </>
    )
}
