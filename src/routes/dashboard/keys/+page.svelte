<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Key, Copy, CheckCircle2, RefreshCcw, Sparkles, ShieldCheck, Clock } from '@lucide/svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	const userPlan = $derived(data.user?.plan || 'free');
	const userRole = $derived(data.user?.role || 'user');
    const isBypassed = $derived(userPlan !== 'free' || userRole === 'admin');

	let isGenerating = $state(false);
	let isCopied = $state(false);

	// The current key should be the first one in the list (most recent)
	let currentKey = $derived(form?.newKey || data.userKeys?.[0] || null);

	import { addToast } from '$lib/toast.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	function copyToClipboard() {
		if (!currentKey) return;
		navigator.clipboard.writeText(currentKey.code);
		isCopied = true;
		setTimeout(() => (isCopied = false), 2000);
	}

    onMount(() => {
        if (page.url.searchParams.get('verified') === 'true') {
            addToast('Ad-Link Verified! You can now generate your key.', 'success');
        }
    });

    $effect(() => {
        if (form?.message) {
            addToast(form.message, 'error');
        }
        if (form?.success) {
            addToast('Protocol Key Generated Successfully!', 'success');
        }
    });
</script>

<div class="max-w-4xl mx-auto space-y-12 py-10" in:fade>
	<!-- Simple Header -->
	<header class="text-center space-y-4">
		<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-zinc-500">
            <Sparkles class="h-3 w-3 text-cyan-500" />
            Key Management System
        </div>
		<h1 class="text-5xl font-black tracking-tighter text-white uppercase italic">
			AUTH <span class="text-cyan-500">PROTOCOL.</span>
		</h1>
		<p class="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-600">
			Generate and deploy your exclusive access credentials.
		</p>
	</header>

	    <!-- Main Generator Card -->
	<div class="relative group">
        <!-- Decoration FX -->
        <div class="absolute -inset-1 bg-linear-to-r from-cyan-600/20 to-purple-600/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity {isBypassed || data.isAdVerified ? 'opacity-30' : ''}"></div>
        
        <div class="relative bg-[#080808]/80 border border-white/5 backdrop-blur-3xl rounded-[3rem] p-12 shadow-2xl text-center space-y-10 overflow-hidden">
            {#if !currentKey && !isGenerating}
                <!-- Initial State -->
                <div class="py-10 space-y-8" in:fly={{ y: 20 }}>
                    <div class="mx-auto h-24 w-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-zinc-700 animate-pulse">
                        <Key class="h-10 w-10" />
                    </div>
                    <div class="space-y-2">
                        <h2 class="text-2xl font-black text-white uppercase italic tracking-tight">NO ACTIVE KEY DETECTED</h2>
                        <p class="text-[10px] font-black text-zinc-600 uppercase tracking-widest">YOU MUST GENERATE A PROTOCOL KEY TO ACCESS SCRIPTS.</p>
                    </div>
                </div>
            {:else if isGenerating}
                <!-- Generating State -->
                <div class="py-10 space-y-8" in:fade>
                    <div class="relative mx-auto h-24 w-24">
                        <div class="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
                        <div class="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
                        <RefreshCcw class="absolute inset-0 m-auto h-8 w-8 text-cyan-500 animate-pulse" />
                    </div>
                    <div class="space-y-2">
                        <h2 class="text-2xl font-black text-white uppercase italic tracking-tight animate-pulse">SYNCING WITH NODE...</h2>
                        <p class="text-[10px] font-black text-cyan-600 uppercase tracking-widest">ESTABLISHING SECURE PROTOCOL TUNNEL</p>
                    </div>
                </div>
            {:else if currentKey}
                <!-- Key Display State -->
                <div class="py-4 space-y-10" in:scale={{ start: 0.9 }}>
                    <div class="space-y-4">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg {!isBypassed ? 'bg-zinc-500/10 text-zinc-500' : 'bg-cyan-500/10 text-cyan-500'} text-[9px] font-black uppercase tracking-widest border border-current">
                            <ShieldCheck class="h-3 w-3" />
                            {currentKey.type.toUpperCase()} ACCESS
                        </div>
                        <div class="relative group/key">
                            <div class="text-4xl sm:text-5xl font-mono font-black text-white tracking-widest bg-white/5 py-8 px-6 rounded-3xl border border-white/5 break-all">
                                {currentKey.code}
                            </div>
                        </div>
                        <div class="flex items-center justify-center gap-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                            <Clock class="h-3.5 w-3.5" />
                            {#if currentKey.expiryDate}
                                EXPIRES: <span class="text-white italic">{new Date(currentKey.expiryDate).toLocaleString()}</span>
                            {:else}
                                STATUS: <span class="text-white italic">{currentKey.status.toUpperCase()}</span>
                            {/if}
                        </div>
                    </div>

                    <Button 
                        onclick={copyToClipboard}
                        class="h-16 w-full max-w-xs mx-auto rounded-2xl {isCopied ? 'bg-emerald-500' : 'bg-white'} text-black hover:scale-105 transition-all text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl"
                    >
                        {#if isCopied}
                            <CheckCircle2 class="h-4 w-4 mr-2" />
                            COPIED TO CLIPBOARD
                        {:else}
                            <Copy class="h-4 w-4 mr-2" />
                            COPY PROTOCOL KEY
                        {/if}
                    </Button>
                </div>
            {/if}

            {#if !isGenerating}
                <div class="pt-6 border-t border-white/5 space-y-4">
                    {#if !isBypassed && !data.isAdVerified}
                        <!-- WATCH ADS BUTTON FOR FREE USERS -->
                        <div class="space-y-4">
                            <p class="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">MANDATORY AD-LINK VERIFICATION REQUIRED</p>
                            <Button 
                                href="/api/ads/start"
                                data-sveltekit-reload
                                class="h-16 w-full max-w-xs mx-auto rounded-2xl bg-linear-to-r from-orange-600 to-red-600 text-white hover:scale-105 transition-all text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl border-none"
                            >
                                <Sparkles class="h-4 w-4 mr-2" />
                                WATCH ADS (GET 24H KEY)
                            </Button>
                        </div>
                    {:else}
                        <!-- GENERATE BUTTON FOR PREMIUM OR VERIFIED FREE -->
                        <form 
                            method="POST" 
                            action="?/generateKey" 
                            use:enhance={() => {
                                isGenerating = true;
                                return async ({ update }) => {
                                    try {
                                        await update();
                                    } finally {
                                        isGenerating = false;
                                    }
                                };
                            }}
                        >
                            <button 
                                type="submit"
                                class="text-[10px] font-black uppercase tracking-[0.4em] {isBypassed ? 'text-cyan-500' : 'text-emerald-500'} hover:scale-105 transition-all flex items-center justify-center mx-auto gap-3"
                            >
                                <RefreshCcw class="h-3 w-3" />
                                {currentKey ? 'REGENERATE PROTOCOL KEY' : 'INITIALIZE KEY GENERATION'}
                            </button>
                        </form>
                    {/if}
                </div>
            {/if}
        </div>
    </div>

    <!-- Simple Security Advice -->
    <div class="flex items-center justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-zinc-700">
        <div class="flex items-center gap-2 italic">
            <ShieldCheck class="h-3 w-3" />
            SECURE BINDING ACTIVE
        </div>
        <div class="h-1 w-1 rounded-full bg-zinc-800"></div>
        <div class="flex items-center gap-2 italic">
            <Key class="h-3 w-3" />
            DO NOT SHARE KEYS
        </div>
    </div>
</div>

<style>
	:global(html) {
		background-color: #030303;
	}
</style>
