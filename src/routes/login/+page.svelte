<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { 
        Mail, 
        Lock, 
        User, 
        Eye, 
        EyeOff, 
        ShieldCheck, 
        ArrowRight, 
        X,
        Sparkles,
        Key,
        Crown,
        Activity,
        RefreshCcw
    } from "@lucide/svelte";
    import { fade, fly } from "svelte/transition";
    import { page } from "$app/state";

    let plan = $derived(page.url.searchParams.get("plan") || "free");
    let mode = $derived(page.url.searchParams.get("mode"));
    
    let isSignUp = $state(false);
    
    $effect(() => {
        if (mode === 'signup') isSignUp = true;
    });
    let email = $state("");
    let password = $state("");
    let name = $state("");
    let loading = $state(false);
    let showPassword = $state(false);
    let errorMessage = $state("");

    async function handleAuth() {
        loading = true;
        errorMessage = "";
        
        try {
            if (isSignUp) {
                const { error, data } = await authClient.signUp.email({
                    email,
                    password,
                    name,
                });
                if (error) {
                    errorMessage = error.message || "Registration failed. Try again.";
                    loading = false;
                    return;
                }
                // Redirect manual untuk memastikan parameter init_plan tidak hilang
                window.location.href = `/dashboard?init_plan=${plan}`;
            } else {
                const { error } = await authClient.signIn.email({
                    email,
                    password,
                });
                if (error) {
                    errorMessage = error.message || "Invalid credentials. Try again.";
                    loading = false;
                    return;
                }
                window.location.href = "/dashboard";
            }
        } catch (e) {
            errorMessage = "A connection error occurred.";
            loading = false;
        }
    }

    const planData: Record<string, { label: string, color: string, icon: any }> = {
        free: { label: 'FREE ACCESS', color: 'text-zinc-500 border-zinc-500/20 bg-zinc-500/5', icon: Key },
        premium: { label: 'PREMIUM PLAN', color: 'text-cyan-500 border-cyan-500/20 bg-cyan-500/5', icon: Crown },
        founder: { label: 'FOUNDER STATUS', color: 'text-purple-500 border-purple-500/20 bg-purple-500/5', icon: Activity }
    };
</script>

<div class="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden" in:fade>
    <!-- Background FX -->
    <div class="absolute top-1/4 left-1/4 h-96 w-96 bg-cyan-600/10 rounded-full blur-[128px]"></div>
    <div class="absolute bottom-1/4 right-1/4 h-96 w-96 bg-purple-600/5 rounded-full blur-[128px]"></div>

    <Card.Root class="w-full max-w-lg bg-[#080808]/80 border-white/5 backdrop-blur-2xl rounded-[3rem] p-1 shadow-2xl relative z-10 overflow-hidden">
        <div class="p-10 sm:p-14 space-y-12">
            <!-- Header -->
            <div class="text-center space-y-4">
                <div class="mx-auto h-20 w-20 bg-linear-to-br from-cyan-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-900/40 transform -rotate-6 transition-transform hover:rotate-0">
                    <ShieldCheck class="h-10 w-10 text-white" />
                </div>
                <h1 class="text-4xl font-black italic tracking-tighter text-white uppercase mt-8">
                    FVKHUB <span class="text-cyan-500">PORTAL.</span>
                </h1>
                <p class="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                    {isSignUp ? 'Initialize New Account' : 'Authorize Existing Session'}
                </p>
            </div>

            <!-- Error Message -->
            {#if errorMessage}
                <div class="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-4 text-red-500 text-[10px] font-black uppercase tracking-widest" in:fly={{ y: -10 }}>
                    <X class="h-4 w-4" />
                    {errorMessage}
                </div>
            {/if}

            <!-- Form -->
            <form onsubmit={(e) => { e.preventDefault(); handleAuth(); }} class="space-y-6">
                {#if isSignUp}
                    <div class="space-y-2" in:fly={{ y: 20 }}>
                        <label class="ml-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500" for="name">Account Name</label>
                        <div class="relative group">
                            <User class="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-cyan-500 transition-colors" />
                            <input id="name" bind:value={name} type="text" required placeholder="CLOUX GHOST" class="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-[11px] font-black uppercase tracking-widest text-white focus:outline-hidden focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all" />
                        </div>
                    </div>

                    <!-- SELECTED PLAN INDICATOR -->
                    <div class="space-y-2" in:fly={{ y: 10 }}>
                        <label class="ml-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500" for="plan">Selected Subscription</label>
                        <div class="relative flex items-center h-16 border border-white/5 rounded-2xl px-6 {planData[plan]?.color || planData.free.color}">
                            {#if planData[plan]}
                                {@const Icon = planData[plan].icon}
                                <Icon class="h-4 w-4 mr-4 shrink-0" />
                                <span class="text-[11px] font-black uppercase tracking-[0.2em]">{planData[plan].label} SELECTED</span>
                            {:else}
                                <Key class="h-4 w-4 mr-4 shrink-0" />
                                <span class="text-[11px] font-black uppercase tracking-[0.2em]">FREE ACCESS SELECTED</span>
                            {/if}
                        </div>
                    </div>
                {/if}

                <div class="space-y-2">
                    <label class="ml-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500" for="email">Secure Address</label>
                    <div class="relative group">
                        <Mail class="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-cyan-500 transition-colors" />
                        <input id="email" bind:value={email} type="email" required placeholder="GHOST@FVKHUB.NET" class="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-[11px] font-black uppercase tracking-widest text-white focus:outline-hidden focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all" />
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="ml-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500" for="password">Encryption Key</label>
                    <div class="relative group">
                        <Lock class="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-cyan-500 transition-colors" />
                        <input id="password" bind:value={password} type={showPassword ? 'text' : 'password'} required placeholder="*************" class="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-14 text-[11px] font-black uppercase tracking-widest text-white focus:outline-hidden focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all" />
                        <button type="button" onclick={() => showPassword = !showPassword} class="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors">
                            {#if showPassword}<EyeOff class="h-4 w-4" />{:else}<Eye class="h-4 w-4" />{/if}
                        </button>
                    </div>
                </div>

                <Button type="submit" disabled={loading} class="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl transition-all active:scale-95 disabled:bg-zinc-800/20 disabled:text-zinc-600 group">
                    {#if loading}
                        <RefreshCcw class="h-4 w-4 animate-spin mr-2" />
                        CRYPTO-SYNCING...
                    {:else}
                        {isSignUp ? 'AUTHORIZE NEW ACCOUNT' : 'LINK SESSION'}
                        <ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    {/if}
                </Button>

                {#if loading}
                    <div class="space-y-4 pt-4" in:fade>
                        <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-cyan-600 animate-[loading_2s_infinite]"></div>
                        </div>
                        <p class="text-center text-[8px] font-black uppercase tracking-[0.3em] text-cyan-500 animate-pulse">
                            {isSignUp ? 'Finalizing Identity Node & Policy Sync...' : 'Validating Session Encryption...'}
                        </p>
                    </div>
                {/if}
            </form>

            <div class="pt-6 text-center">
                <button type="button" onclick={() => isSignUp = !isSignUp} class="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-cyan-500 transition-all border-b border-transparent hover:border-cyan-500/30 pb-1">
                    {isSignUp ? 'ALREADY AUTHORIZED? UNLOCK SESSION' : 'NEW PROTOCOL? INITIALIZE NODE'}
                </button>
            </div>
        </div>
    </Card.Root>
</div>
