import { getDB } from "@/lib/utils/indexeddb"

export async function getOfflineData() {
    const db = await getDB()
    return await db.getAll('data')
}

export async function replaceOfflineData(items: any[]) {
    const db = await getDB()
    const tx = db.transaction('data', 'readwrite')
    const store = tx.objectStore('data')

    await store.clear()
    for (const item of items) {
        await store.put(item)
    }

    await tx.done
}
