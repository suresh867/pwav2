'use client'

import { useEffect, useState } from 'react'

export function OfflineBanner() {
    const [offline, setOffline] = useState(false)

    useEffect(() => {
        const update = () => setOffline(!navigator.onLine)

        update()
        window.addEventListener('online', update)
        window.addEventListener('offline', update)

        return () => {
            window.removeEventListener('online', update)
            window.removeEventListener('offline', update)
        }
    }, [])

    if (!offline) return null

    return (
        <div className="fixed top-0 inset-x-0 bg-yellow-500 text-black text-sm text-center py-2 z-50">
            You are offline. Changes will sync when connection is restored.
        </div>
    )
}
