'use client'

import { Button } from '@/components/ui/button'
import { useInstallPrompt } from '@/lib/hooks/useInstallPrompt'

export function InstallButton() {
    const { install, canInstall } = useInstallPrompt()

    if (!canInstall) return null

    return (
        <Button onClick={install} variant="outline">
            Install App
        </Button>
    )
}
