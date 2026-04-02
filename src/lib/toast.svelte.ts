import { ShieldAlert, CheckCircle2, Info, X } from "@lucide/svelte";

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

let toasts = $state<Toast[]>([]);

export function addToast(message: string, type: ToastType = 'info') {
    const id = crypto.randomUUID();
    toasts = [...toasts, { id, message, type }];
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toasts = toasts.filter(t => t.id !== id);
    }, 5000);
}

export function removeToast(id: string) {
    toasts = toasts.filter(t => t.id !== id);
}

export const toastState = {
    get toasts() { return toasts }
};
