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
					<div class="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-cyan-600 text-4xl font-black text-white italic shadow-2xl overflow-hidden uppercase shadow-cyan-900/20">
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
                    <p class="text-[10px] font-black tracking-widest {currentUser?.plan === 'admin' ? 'text-orange-500' : 'text-cyan-500'} uppercase italic">
                        {currentUser?.plan === 'founder' ? 'LIFETIME' : currentUser?.plan?.toUpperCase() || 'FREE'} {currentUser?.plan === 'admin' || currentUser?.plan === 'founder' ? 'STATUS' : 'PLAN'} ACTIVE
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
</div>
