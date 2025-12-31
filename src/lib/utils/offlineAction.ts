// lib/offline-action.ts
import { saveData } from '../actions/data/data'
import { saveOffline, queueAction } from './indexeddb'

export async function saveDataOfflineAware(data: any) {
    if (!navigator.onLine) {
        await saveOffline(data)
        await queueAction({
            action: 'saveData',
            payload: data
        })
        return { offline: true }
    }

    await saveData(data)
    return { offline: false }
}
