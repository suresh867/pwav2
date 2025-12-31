'use client'

import { motion } from 'framer-motion'

export function SplashScreen() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 text-white">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center"
            >
                <h1 className="text-3xl font-bold">OfflineApp</h1>
                <p className="mt-2 text-sm opacity-70">
                    Works even without internet
                </p>
            </motion.div>
        </div>
    )
}
