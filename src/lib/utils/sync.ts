// lib/sync.ts
import { saveData } from '../actions/data/data'
import { getDB } from './indexeddb'

export async function syncQueuedActions() {
    if (typeof window === 'undefined') return
    if (!navigator.onLine) return

    const db = await getDB()
    const tx = db.transaction('queue', 'readwrite')
    const store = tx.objectStore('queue')

    const all = await store.getAll()

    for (const item of all) {
        try {
            if (item.action === 'saveData') {
                await saveData(item.payload)
            }
        } catch (err) {
            console.error('Sync failed', err)
            return // stop sync, retry later
        }
    }

    await store.clear()
}
