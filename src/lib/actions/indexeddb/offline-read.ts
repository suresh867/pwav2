"use client"
import { DataSource } from '@/lib/types/data'
import { getAllData } from '../data/getData'
import { getOfflineData, replaceOfflineData } from './indexeddb-read'

export async function loadDataOfflineAware(): Promise<{
    source: DataSource
    data: any[]
}> {
    const offline = await getOfflineData()

    if (!navigator.onLine) {
        return { source: 'offline', data: offline }
    }

    try {
        const fresh = await getAllData()
        await replaceOfflineData(fresh)
        return { source: 'server', data: fresh }
    } catch {
        return { source: 'offline', data: offline }
    }
}

