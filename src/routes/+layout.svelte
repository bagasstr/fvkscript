<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
    import { toastState, removeToast } from '$lib/toast.svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { ShieldAlert, CheckCircle2, Info, X } from "@lucide/svelte";

	let { children } = $props();

    const icons = {
        success: CheckCircle2,
        error: ShieldAlert,
        info: Info
    };

    const colors = {
        success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-emerald-500/10',
        error: 'border-red-500/20 bg-red-500/10 text-red-500 shadow-red-500/10',
        info: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-cyan-500/10'
    };
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#030303" />
    <meta name="author" content="FVKHUB" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://fvkhub.vercel.app/" />
    <meta property="og:site_name" content="FVKHUB" />
    <meta property="og:image" content="https://fvkhub.vercel.app/og-image.png" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://fvkhub.vercel.app/" />
    <meta name="twitter:image" content="https://fvkhub.vercel.app/og-image.png" />
</svelte:head>

<div class="relative flex flex-col min-h-screen">
    {@render children()}

    <!-- Global Toast Container -->
    <div class="fixed top-8 right-8 z-[200] flex flex-col gap-4 pointer-events-none">
        {#each toastState.toasts as toast (toast.id)}
            {@const Icon = icons[toast.type]}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                class="pointer-events-auto group relative flex items-center gap-4 min-w-[320px] max-w-md p-5 rounded-[1.5rem] border backdrop-blur-2xl shadow-2xl transition-all hover:scale-102 {colors[toast.type]}"
                in:fly={{ x: 100, duration: 600, opacity: 0 }}
                out:fade={{ duration: 300 }}
            >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon class="h-5 w-5" />
                </div>
                
                <div class="flex-1">
                    <p class="text-[10px] font-black uppercase tracking-[0.2em]">{toast.type}</p>
                    <p class="mt-1 text-[11px] font-bold leading-relaxed">{toast.message}</p>
                </div>

                <button 
                    onclick={() => removeToast(toast.id)}
                    class="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all"
                >
                    <X class="h-4 w-4" />
                </button>

                <!-- Timer Bar -->
                <div class="absolute bottom-0 left-0 h-1 bg-current opacity-20 w-full rounded-full overflow-hidden">
                    <div class="h-full bg-current animate-shrink rounded-full"></div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    @keyframes shrink {
        from { width: 100%; }
        to { width: 0%; }
    }
    .animate-shrink {
        animation: shrink 5s linear forwards;
    }
</style>
