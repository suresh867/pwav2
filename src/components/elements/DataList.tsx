// 'use client'

// import { loadDataOfflineAware } from '@/lib/actions/indexeddb/offline-read'
// import { DataSource } from '@/lib/types/data'
// import { useEffect, useState } from 'react'

// export function DataList() {
//     const [data, setData] = useState<any[]>([])
//     const [source, setSource] = useState<DataSource>('loading')

//     useEffect(() => {
//         let mounted = true

//         loadDataOfflineAware().then(res => {
//             if (!mounted) return
//             setData(res.data)
//             setSource(res.source)
//         })

//         return () => {
//             mounted = false
//         }
//     }, [])

//     if (source === 'loading') {
//         return (
//             <div className="text-sm opacity-60">
//                 Loading…
//             </div>
//         )
//     }

//     return (
//         <div>
//             {source === 'offline' && (
//                 <p className="text-yellow-500 text-sm mb-2">
//                     Offline data shown
//                 </p>
//             )}

//             <p className="text-sm opacity-70">
//                 Loaded from: {source}
//             </p>

//             {data.map(item => (
//                 <div key={item._id} className="border p-4 rounded mb-2">
//                     <h3>{item.title}</h3>
//                     <p>{item.description}</p>
//                 </div>
//             ))}
//         </div>
//     )
// }




'use client'

import { useEffect, useState } from 'react'
import { loadDataOfflineAware } from '@/lib/actions/indexeddb/offline-read'
import type { DataSource, ClientData } from '@/lib/types/data'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { InstallButton } from './InstallButton'

export function DataList() {
    const [data, setData] = useState<ClientData[]>([])
    const [source, setSource] = useState<DataSource>('loading')

    useEffect(() => {
        let mounted = true

        loadDataOfflineAware().then(res => {
            if (!mounted) return
            setData(res.data)
            setSource("offline")
            setSource(res.source)
        })

        return () => {
            mounted = false
        }
    }, [])

    /* ---------------- Loading ---------------- */ 
    if (source === 'loading') {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-5/6" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    /* ---------------- Empty ---------------- */
    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-medium">No data yet</p>
                <p className="text-sm">
                    Create something — it will work offline too.
                </p>
            </div>
        )
    }

    /* ---------------- Normal Render ---------------- */
    return (
        <section className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Data</h2>

                {source === 'offline' && (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-400">
                        Offline
                    </Badge>
                )}
            </div>

            <InstallButton />

            {/* Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.map(item => (
                    <Card key={item._id} className="hover:shadow-md transition">
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                {item.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            {item.description && (
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {item.description}
                                </p>
                            )}

                            <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                                {/* <span>
                                    {new Date(item.createdAt ?? '').toLocaleDateString()}
                                </span> */}

                                {source === 'offline' && (
                                    <span className="text-yellow-500">Local</span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
