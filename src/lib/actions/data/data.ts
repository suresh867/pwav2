'use server'

import DataModel from '@/lib/models/data.model'
import { connectToDb } from '@/lib/utils/connectToDb'
import { Types } from 'mongoose'

export async function saveData(data: {
    _id?: string
    title: string
    description?: string
    content?: string
}) {
    await connectToDb()

    await DataModel.updateOne(
        { _id: data._id ? new Types.ObjectId(data._id) : undefined },
        {
            title: data.title,
            description: data.description,
            content: data.content,
        },
        { upsert: true }
    )
}
