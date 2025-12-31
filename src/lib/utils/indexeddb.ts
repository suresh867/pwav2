import { ObjectId } from 'bson'

// lib/utils/indexeddb.ts
import { openDB, IDBPDatabase } from 'idb'

let dbPromise: Promise<IDBPDatabase> | null = null

export function getDB() {
    if (typeof window === 'undefined') {
        throw new Error('IndexedDB can only be used in the browser')
    }

    if (!dbPromise) {
        dbPromise = openDB('pwa-db', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('data')) {
                    db.createObjectStore('data', { keyPath: '_id' })
                }
                if (!db.objectStoreNames.contains('queue')) {
                    db.createObjectStore('queue', { autoIncrement: true })
                }
            },
        })
    }

    return dbPromise
}


export async function queueAction(item: any) {
    const db = await getDB()
    await db.add('queue', item)
}


export async function saveOffline(data: any) {
    const db = await getDB()

    const item = {
        ...data,
        _id: data._id ?? new ObjectId().toHexString(),
    }

    await db.put('data', item)
    return item
}

