<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { 
		ShieldCheck, 
		Crown, 
		Zap, 
		CheckCircle2, 
		Lock, 
		User, 
		RefreshCcw,
        Sparkles,
        Smartphone,
        ArrowUpRight,
        X,
        CreditCard,
        Activity,
        ShieldAlert
	} from '@lucide/svelte';
	import { fade, fly, scale } from 'svelte/transition';
    import { enhance } from '$app/forms';

    let { data, form } = $props();
    let isUpgrading = $state(false);
    let isResetting = $state(false);
    let showPaymentModal = $state(false);
    let paymentStep = $state<'input' | 'processing' | 'success'>('input');
    let cardNumber = $state('**** **** **** ****');

    const currentUser = $derived(data.currentUser);

	const tiers = $derived([
		{
			id: 'free',
			name: 'Free Access',
			price: '$0',
			features: ['Standard Scripts Library', '24h Rotating Key Access', 'Public Discord Support'],
			active: currentUser?.plan === 'free' || !currentUser?.plan,
			buttonText: 'Current Plan',
			color: 'zinc',
            isPremium: false,
            icon: Zap
		},
		{
			id: 'premium',
			name: 'Premium Plan',
			price: '$9.99',
			features: ['All Premium Scripts', 'Unlimited Permanent Keys', 'Zero-Ad Link Protocol', 'Priority Support'],
			active: currentUser?.plan === 'premium',
			buttonText: 'Upgrade to Premium',
			color: 'cyan',
            isPremium: true,
            icon: Crown
		},
        {
			id: 'founder',
			name: 'Founder Status',
			price: '$49.99',
			features: ['Lifetime Activation', 'Early Access Bypasses', 'Exclusive VIP Badge', 'Direct Dev Line'],
			active: currentUser?.plan === 'founder',
			buttonText: 'Unlock Founder',
			color: 'purple',
            isPremium: true,
            icon: Activity
		}
	]);

    let selectedTier = $state<any>(null);

    function startUpgrade(tier: any) {
        selectedTier = tier;
        showPaymentModal = true;
        paymentStep = 'input';
    }

    function processPayment() {
        paymentStep = 'processing';
        setTimeout(() => {
            paymentStep = 'success';
        }, 2500);
    }
</script>

<div class="space-y-12" in:fade>
	<!-- Header Section -->
	<header class="space-y-4">
		<h2 class="text-4xl font-black tracking-tighter text-white uppercase italic">
			SUBSCRIPTION<br /><span class="text-cyan-500">PLAN SETTINGS.</span>
		</h2>
		<p class="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-600">
			Manage your account subscription and security parameters.
		</p>
	</header>

	<!-- Profile & HWID Control -->
	<div class="grid gap-10 lg:grid-cols-3">
		<!-- Profile Snapshot -->
		<Card.Root class="lg:col-span-2 relative overflow-hidden border-white/5 bg-black/40 backdrop-blur-3xl p-10 rounded-[2.5rem]">
            <div class="flex flex-col md:flex-row items-center gap-10">
				<div class="group relative">
					<div class="absolute -inset-4 rounded-full bg-cyan-600/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"></div>
					<div class="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-cyan-600 text-4xl font-black text-white italic shadow-2xl overflow-hidden uppercase">
						{#if currentUser?.image}
                            <img src={currentUser.image} alt="User" class="h-full w-full object-cover" />
                        {:else}
                            {currentUser?.name?.charAt(0) || '?'}
                        {/if}
					</div>
				</div>
				<div class="space-y-1">
                    <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <h3 class="text-3xl leading-none font-black tracking-tighter text-white uppercase italic">
                            {currentUser?.name || 'GUEST USER'}
                        </h3>
                    </div>
                    <p class="text-[10px] font-black tracking-widest text-cyan-500 uppercase italic">
                        {currentUser?.plan?.toUpperCase() || 'FREE'} {currentUser?.plan === 'founder' ? 'STATUS' : 'PLAN'} ACTIVE
                    </p>
					<p class="text-[9px] font-bold tracking-widest text-zinc-600 uppercase pt-4">
						Identity ID: {currentUser?.id?.slice(0, 12)}...
					</p>
				</div>
                <div class="text-center md:text-right ml-auto">
                    <p class="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-2">Account Sync</p>
                    <div class="flex items-center justify-center md:justify-end gap-2 text-emerald-500">
                        <ShieldCheck class="h-4 w-4" />
                        <span class="text-[10px] font-black uppercase tracking-widest italic animate-pulse">SECURE LINKED</span>
                    </div>
                </div>
			</div>
		</Card.Root>

		<!-- Security Control (HWID) -->
		<Card.Root class="relative overflow-hidden border-white/5 bg-zinc-900/10 p-8 rounded-[2.5rem]">
			<div class="mb-4 flex items-center gap-3 text-orange-500">
				<Smartphone class="h-4 w-4" />
				<span class="text-[9px] font-black tracking-[0.3em] text-zinc-600 uppercase font-mono">Hardware UID</span>
			</div>
			<div class="space-y-6">
				<div>
					<code class="text-[10px] font-mono text-zinc-400 bg-white/5 px-3 py-2 rounded-lg block truncate">
                        {currentUser?.hwid || 'NOT_SYNCED_UNBIND'}
                    </code>
				</div>
                <form method="POST" action="?/resetHwid" use:enhance={() => { isResetting = true; return async ({ update }) => { await update(); isResetting = false; } }}>
				    <Button disabled={isResetting} class="h-12 w-full rounded-xl bg-red-600/5 border border-red-500/10 text-[9px] font-black tracking-widest text-red-700 uppercase hover:bg-red-600 hover:text-white transition-all active:scale-95 disabled:opacity-50">
					    {#if isResetting}<RefreshCcw class="h-3 w-3 animate-spin mr-2" />{:else}<Lock class="h-3 w-3 mr-2" />{/if}
					    RESET HARDWARE BIND
				    </Button>
                </form>
			</div>
		</Card.Root>
	</div>

	<!-- Tiers Section -->
	<div class="space-y-8">
        <div class="flex items-center gap-4">
            <h3 class="text-[11px] font-black tracking-[0.4em] text-zinc-600 uppercase">AVAILABLE SUBSCRIPTION PLANS</h3>
            <div class="h-px flex-1 bg-white/5"></div>
        </div>

        <div class="grid gap-8 lg:grid-cols-3">
            {#each tiers as tier}
                {@const Icon = tier.icon}
                <Card.Root class="relative overflow-hidden border-white/5 bg-black/40 backdrop-blur-3xl p-1 transition-all 
                    {tier.active ? 'ring-2 ring-cyan-500/20 opacity-60' : 'hover:scale-[1.02]'}">
                    
                    <div class="p-8 space-y-8 group bg-linear-to-b {tier.color === 'cyan' ? 'from-cyan-900/10' : tier.color === 'purple' ? 'from-purple-900/10' : 'from-zinc-900/5'} to-transparent rounded-[2rem]">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="text-[10px] font-black tracking-[0.3em] text-zinc-600 uppercase mb-2">{tier.name}</h4>
                                <p class="text-3xl font-black tracking-tighter text-white italic">{tier.price}</p>
                            </div>
                            <div class="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center {tier.active ? 'text-emerald-500' : 'text-zinc-500'}">
                                <Icon class="h-6 w-6" />
                            </div>
                        </div>

                        <div class="space-y-4">
                            {#each tier.features as feature}
                                <div class="flex items-center gap-3 text-[10px] font-bold tracking-widest text-zinc-500 uppercase leading-none">
                                    <CheckCircle2 class="h-3 w-3 {tier.isPremium ? 'text-cyan-500' : 'text-zinc-800'}" />
                                    {feature}
                                </div>
                            {/each}
                        </div>

                        <Button 
                            onclick={tier.id !== 'free' ? () => startUpgrade(tier) : null}
                            disabled={tier.active}
                            class="w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all
                                {tier.active ? 'bg-zinc-900/50 text-zinc-700 border border-white/5' : 'bg-white text-black hover:bg-zinc-200 active:scale-95'}"
                        >
                            {tier.active ? 'CURRENT PLAN' : tier.buttonText}
                        </Button>
                    </div>
                </Card.Root>
            {/each}
        </div>
    </div>

    <!-- PAYMENT MODAL SIMULATION -->
    {#if showPaymentModal}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md" transition:fade>
            <div class="absolute inset-0" onclick={() => showPaymentModal = false}></div>
            
            <div class="relative w-full max-w-sm bg-[#080808] border border-white/10 rounded-[3rem] p-10 shadow-2xl space-y-8" transition:scale={{ start: 0.9, duration: 400 }}>
                {#if paymentStep === 'input'}
                    <header class="text-center space-y-4">
                        <div class="mx-auto h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center text-white">
                            <CreditCard class="h-8 w-8" />
                        </div>
                        <h3 class="text-xl font-black tracking-tighter text-white uppercase italic">PAYMENT SECURE</h3>
                        <p class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">UPGRADING TO {selectedTier.name}</p>
                    </header>

                    <div class="space-y-4">
                        <div class="space-y-1.5">
                            <label class="ml-4 text-[8px] font-black uppercase tracking-widest text-zinc-500" for="cardNumber">Card Number</label>
                            <input id="cardNumber" bind:value={cardNumber} class="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-5 text-[11px] font-black uppercase tracking-widest text-white focus:outline-hidden focus:border-cyan-500/40 transition-all" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-1.5">
                                <label class="ml-4 text-[8px] font-black uppercase tracking-widest text-zinc-500" for="expiry">Expiry</label>
                                <input id="expiry" placeholder="MM/YY" class="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-5 text-[11px] font-black uppercase tracking-widest text-white focus:outline-hidden focus:border-cyan-500/40 transition-all" />
                            </div>
                            <div class="space-y-1.5">
                                <label class="ml-4 text-[8px] font-black uppercase tracking-widest text-zinc-500" for="cvc">CVC</label>
                                <input id="cvc" placeholder="***" type="password" class="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-5 text-[11px] font-black uppercase tracking-widest text-white focus:outline-hidden focus:border-cyan-500/40 transition-all" />
                            </div>
                        </div>
                    </div>

                    <Button onclick={processPayment} class="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
                        PAY {selectedTier.price}
                    </Button>
                
                {:else if paymentStep === 'processing'}
                    <div class="py-16 text-center space-y-10" in:fade>
                        <RefreshCcw class="h-16 w-16 text-cyan-500 animate-spin mx-auto opacity-50" />
                        <h3 class="text-xl font-black tracking-tighter text-white uppercase italic animate-pulse">PROCESSING PAYMENT...</h3>
                    </div>

                {:else if paymentStep === 'success'}
                    <div class="py-10 text-center space-y-10" in:fade>
                        <div class="relative mx-auto h-20 w-20 bg-emerald-500 rounded-full flex items-center justify-center text-black">
                            <ShieldCheck class="h-10 w-10" />
                        </div>
                        <div class="space-y-4">
                            <h3 class="text-2xl font-black tracking-tighter text-white uppercase italic">SUCCESSFUL</h3>
                            <p class="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">PLAN HAS BEEN UPDATED</p>
                        </div>
                        <form method="POST" action="?/upgrade" use:enhance={() => { return async ({ update }) => { await update(); showPaymentModal = false; } }}>
                            <input type="hidden" name="tier" value={selectedTier.id} />
                            <Button type="submit" class="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
                                FINALIZE UPGRADE
                            </Button>
                        </form>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
    <!-- ADMIN ESCALATION (ONLY FOR OWNER/DEV) -->
    <section class="p-10 rounded-[3rem] border border-orange-500/20 bg-orange-500/5 space-y-8 mt-12" in:fly={{ y: 20 }}>
        <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-500 border border-orange-500/10">
                <ShieldAlert class="h-6 w-6" />
            </div>
            <div>
                <h2 class="text-2xl font-black italic text-white uppercase tracking-tighter">DEVELOPER CONSOLE</h2>
                <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Authorized Node Promotion Utility</p>
            </div>
        </div>

        <div class="p-6 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between transition-all hover:bg-black/60">
            <div class="space-y-1">
                <p class="text-xs font-black text-white uppercase tracking-widest">Admin Privileges</p>
                <p class="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Current Status: <span class="text-orange-500">{data.currentUser?.role?.toUpperCase() || 'USER'}</span></p>
            </div>
            <form action="?/setRole" method="POST" use:enhance>
                <input type="hidden" name="role" value={data.currentUser?.role === 'admin' ? 'user' : 'admin'} />
                <Button type="submit" class="h-12 px-8 rounded-xl {data.currentUser?.role === 'admin' ? 'bg-zinc-800 text-zinc-400' : 'bg-orange-600 text-white'} text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-900/20">
                    {data.currentUser?.role === 'admin' ? 'REVOKE ADMIN' : 'ACTIVATE ADMIN'}
                </Button>
            </form>
        </div>
    </section>
</div>
