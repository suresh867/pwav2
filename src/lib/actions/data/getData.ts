'use server'

import DataModel from '@/lib/models/data.model'
import { connectToDb } from '@/lib/utils/connectToDb'

export async function getAllData() {
    await connectToDb()
    const docs = await DataModel.find().lean()

    return docs.map(doc => ({
        _id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        content: doc.content,
        createdAt: doc.createdAt,
    }))
}
