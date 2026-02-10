import type { StateCreator } from "zustand";

type NotificationSliceActions = {
    text: string,
    error: boolean,
    show: boolean,
    time: number,
}


export type NotificationSliceType = {
    notification: NotificationSliceActions;
    showNotification: (payload: Pick<NotificationSliceActions, 'text' | 'error' | 'time'>) => void;
    hideNotification: () => void;
}



export const createNotificationSlice: StateCreator<NotificationSliceType> = (set) => ({
    notification: {
        text: '',
        error: false,
        show: false,
        time: 0,
    },
    showNotification: (payload) => {
        set({
            notification: {
                ...payload,
                show: true,
            }
        })
        setTimeout(() => {
            set({
                notification: {
                    ...payload,
                    show: false,
                    time: payload.time || 3000,
                }
            })
        }, payload.time);
    },
    hideNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false,
                time: 0,
            }
        })
    },
})
