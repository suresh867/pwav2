declare type Data = {
    _id: string;
    title: string
    description: string;
    content: string;
    createdAt: string;
}

export type ClientData = {
    _id?: string
    title: string
    description?: string
    content?: string
}


// lib/types.ts
export type DataSource = 'loading' | 'offline' | 'server'
