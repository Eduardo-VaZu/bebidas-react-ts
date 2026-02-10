import type { ReactNode } from "react";

export default function HeaderAlert({ children }: { children: ReactNode }) {
    return (
        <div className="bg-red-100 rounded-lg p-2 mt-4">
            <div className="w-full text-center text-red-700 font-medium text-lg">
                {children}
            </div>
        </div>
    )
}
