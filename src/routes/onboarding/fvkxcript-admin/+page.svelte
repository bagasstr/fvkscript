<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { 
		ShieldAlert, 
		Lock, 
		User, 
		Mail,
		Sparkles,
        Key,
        Database,
        ArrowRight,
        ChevronRight
	} from '@lucide/svelte';
	import { fade, fly, scale } from 'svelte/transition';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let { data, form } = $props();
    let isLoading = $state(false);
</script>

<div class="min-h-screen bg-[#020202] text-[#f0f0f0] font-sans selection:bg-orange-500/30 flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Background Animated Effects -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div class="absolute -top-1/2 -left-1/4 w-[150%] h-full bg-linear-to-br from-orange-600/10 via-transparent to-transparent opacity-30 transform -rotate-12 blur-[120px]"></div>
        <div class="absolute -bottom-1/2 -right-1/4 w-[150%] h-full bg-linear-to-tl from-red-600/10 via-transparent to-purple-600/5 opacity-30 transform -rotate-12 blur-[120px]"></div>
    </div>

    <div class="w-full max-w-xl space-y-12 relative z-10" in:fade={{ duration: 1000 }}>
        <!-- Header Branding -->
        <header class="text-center space-y-6">
            <div in:scale={{ delay: 200 }} class="mx-auto h-24 w-24 rounded-[2rem] bg-orange-600/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.15)]">
                <ShieldAlert class="h-12 w-12 text-orange-500" />
            </div>
            <div class="space-y-4">
                <div in:fly={{ y: 20, delay: 300 }}>
                    <h1 class="text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
                        ADMIN <span class="text-orange-500">ESTABLISH.</span>
                    </h1>
                </div>
                <div in:fly={{ y: 20, delay: 400 }}>
                    <p class="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-600">
                        FVKXCRIPT EXECUTIVE NODE ONBOARDING
                    </p>
                </div>
            </div>
        </header>

        <!-- Main Form Hub -->
        <div in:fly={{ y: 40, delay: 500 }}>
            <Card.Root class="border-white/10 bg-zinc-950 rounded-[3rem] p-1 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div class="p-10 space-y-10">
                    {#if form?.message}
                        <div class="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-4 text-orange-500" in:fly={{ y: -10 }}>
                            <ShieldAlert class="h-5 w-5 shrink-0" />
                            <p class="text-[10px] font-black uppercase tracking-widest leading-relaxed">{form.message}</p>
                        </div>
                    {/if}

                    <div class="space-y-1">
                        <h2 class="text-lg font-black italic text-zinc-100 uppercase tracking-tight">IDENTITY REGISTRY</h2>
                        <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">System-wide administrative privileges will be applied instantly.</p>
                    </div>

                    <form 
                        method="POST" 
                        action="?/signup" 
                        use:enhance={() => {
                            isLoading = true;
                            return async ({ result }) => {
                                isLoading = false;
                                if (result.type === 'success') {
                                    window.location.href = '/dashboard';
                                }
                            };
                        }}
                        class="space-y-6"
                    >
                        <div class="space-y-2">
                            <label for="name" class="ml-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                            <div class="relative group">
                                <User class="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-orange-500" />
                                <input 
                                    id="name" name="name" required placeholder="ADMIN FVK" 
                                    class="w-full h-16 bg-white border border-white/5 rounded-2xl pl-16 pr-6 text-sm font-black text-black placeholder:text-zinc-400 focus:outline-hidden focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all shadow-xl shadow-black/5" 
                                />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="email" class="ml-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Official Email</label>
                            <div class="relative group">
                                <Mail class="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-orange-500" />
                                <input 
                                    id="email" name="email" type="email" required placeholder="admin@fvkxcript.com" 
                                    class="w-full h-16 bg-white border border-white/5 rounded-2xl pl-16 pr-6 text-sm font-black text-black placeholder:text-zinc-400 focus:outline-hidden focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-mono shadow-xl shadow-black/5" 
                                />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="password" class="ml-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Secure Password</label>
                            <div class="relative group">
                                <Lock class="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-orange-500" />
                                <input 
                                    id="password" name="password" type="password" required placeholder="••••••••" 
                                    class="w-full h-16 bg-white border border-white/5 rounded-2xl pl-16 pr-6 text-sm font-black text-black placeholder:text-zinc-400 focus:outline-hidden focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-mono shadow-xl shadow-black/5" 
                                />
                            </div>
                        </div>

                        <div class="pt-6">
                            <Button type="submit" disabled={isLoading} class="w-full h-16 rounded-2xl bg-white text-black hover:bg-zinc-200 text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-white/5 active:scale-95 transition-all">
                                {#if isLoading}
                                    <Database class="h-4 w-4 mr-2 animate-spin" />
                                    SYNCING IDENTITY...
                                {:else}
                                    INITIATE MASTER PROTOCOL
                                    <ChevronRight class="h-4 w-4 ml-2" />
                                {/if}
                            </Button>
                        </div>
                    </form>
                </div>
                
                <footer class="bg-white/[0.01] border-t border-white/5 p-8 text-center text-zinc-800 text-[10px] font-black uppercase tracking-widest">
                    Authorized Access Only // FVKXCRIPT Team
                </footer>
            </Card.Root>
        </div>
        
        <div class="text-center" in:fade={{ delay: 1000 }}>
            <button onclick={() => window.location.href = '/'} class="text-[10px] font-black text-zinc-800 hover:text-zinc-500 uppercase tracking-widest transition-colors inline-flex items-center gap-2">
                <ArrowRight class="h-3 w-3 rotate-180" />
                Return to Surface
            </button>
        </div>
    </div>
</div>
