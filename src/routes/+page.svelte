<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import {
		ShieldCheck,
		Zap,
		Terminal,
		Menu,
		ArrowRight,
		CheckCircle2,
		Flame,
		Gamepad2,
		Cpu,
		Globe,
		Lock,
		Sword,
		Car,
		Ghost,
		User,
		Layers,
		Activity,
		Cloud,
		Settings,
		ChevronRight,
		X,
		Star,
		Clock,
		Info,
		Copy,
		CreditCard,
		Crown,
		Infinity,
		Key
	} from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { addToast } from '$lib/toast.svelte';
	import logo from '$lib/assets/favicon.png';

	let { data } = $props();

	// Mapping icons for rendering
	const iconMap: Record<string, any> = {
		Sword,
		Car,
		Ghost,
		Flame,
		Gamepad2,
		Activity,
		Zap,
		ShieldCheck,
		Terminal
	};

	const showcaseScripts = $derived(data.showcaseScripts || []);

	const pricingPlans = [
		{
			name: 'Free Key',
			price: '$0',
			period: 'per 24 Hours',
			desc: 'Mandatory Ad-link verification for basic users.',
			features: [
				'24h Key Validator',
				'3-Step Ad Verification',
				'Support Basic Bypass',
				'Standard Activation Delay',
				'Public Discord Role'
			],
			icon: Key,
			color: 'border-white/5 bg-white/5',
			cta: 'Generate Free Key',
			popular: false
		},
		{
			name: 'Premium Key',
			price: '$9.99',
			period: 'per Month',
			desc: 'Instant keys with no ads. Dominate without waiting.',
			features: [
				'30-Day Permanent Key',
				'No Ad-Links (Instant)',
				'Exclusive Alpha Bypass',
				'0ms Activation Sync',
				'Priority Discord Ticket'
			],
			icon: Crown,
			color: 'border-cyan-500/20 bg-cyan-500/5 shadow-[0_0_40px_rgba(8,145,178,0.15)]',
			cta: 'Get Instant Key',
			popular: true
		},
		{
			name: 'Lifetime Access',
			price: '$49.99',
			period: 'One-time',
			desc: 'Never generate a key again. Lifetime activation.',
			features: [
				'Forever Lifetime Key',
				'Early Access Bypasses',
				'HWID Bind Reset Pack',
				'Exclusive VIP Badge',
				'Direct Private Dev Line'
			],
			icon: Infinity,
			color: 'border-purple-500/20 bg-purple-500/5',
			cta: 'Buy Once, Use Forever',
			popular: false
		}
	];

	let selectedScript = $state<any>(null);
	let copied = $state(false);

	function openDetails(script: any) {
		selectedScript = script;
		copied = false;
		document.body.style.overflow = 'hidden';
	}

	function closeDetails() {
		selectedScript = null;
		document.body.style.overflow = 'auto';
	}

	function handleAccess() {
		if (!selectedScript) return;

		const currentKey = data.userKeys?.[0];
		let scriptCode = '';

		if (currentKey) {
			// User had a key, provide a pre-filled loader
			scriptCode = `_G.Key = "${currentKey.code}";\nloadstring(game:HttpGet("${window.location.origin}/api/v1/auth?scriptId=${selectedScript.id}&key=${currentKey.code}&hwid=BIND_ME"))()`;
		} else {
			// No key, provide a generic manual placeholder
			scriptCode = `_G.Key = "PASTE_KEY_HERE";\nloadstring(game:HttpGet("${window.location.origin}/api/v1/auth?scriptId=${selectedScript.id}"))()`;
		}

		navigator.clipboard.writeText(scriptCode);
		copied = true;
		addToast(
			'Loader Code Copied! ' + (currentKey ? '(Key Auto-injected)' : '(Manual Key Required)'),
			'success'
		);
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
	let canonicalUrl = 'https://fvkscript.vercel.app/';
</script>

<svelte:head>
	<title>FVKSCRIPT | One Hub. Unlimited Keys.</title>
	<meta
		name="description"
		content="FVKSCRIPT is the elite standard in script execution. Get access to an advanced key system designed for maximum stealth and elite protection for all your script needs."
	/>
	<meta
		name="keywords"
		content="FVKSCRIPT, script hub, key system, script executor, undetected, roblox script, fvk scripts, gaming tools, elite protection"
	/>
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:title" content="FVKSCRIPT | One Hub. Unlimited Keys." />
	<meta
		property="og:description"
		content="Experience the elite standard in script execution. All scripts are free—power them with our advanced Key System designed for maximum stealth."
	/>

	<!-- Twitter -->
	<meta name="twitter:title" content="FVKSCRIPT | One Hub. Unlimited Keys." />
	<meta
		name="twitter:description"
		content="Experience the elite standard in script execution. All scripts are free—power them with our advanced Key System designed for maximum stealth."
	/>

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"name": "FVKXCRIPT",
			"operatingSystem": "Windows",
			"applicationCategory": "UtilitiesApplication",
			"offers": {
				"@type": "AggregateOffer",
				"lowPrice": "0",
				"highPrice": "49.99",
				"priceCurrency": "USD"
			},
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "4.9",
				"ratingCount": "1240"
			}
		}
	</script>
</svelte:head>

<div class="min-h-screen bg-[#030303] font-sans text-[#f0f0f0] selection:bg-cyan-500/30">
	<!-- Navbar -->
	<nav class="fixed top-0 z-50 w-full border-b border-white/[0.03] bg-black/60 backdrop-blur-lg">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2"
				>
					<img src={logo} alt="FVKSCRIPT LOGO" class="h-full w-full object-contain" />
				</div>
				<span class="text-xl font-black tracking-tighter text-white uppercase italic"
					>FVK<span class="text-cyan-500">HUB</span></span
				>
			</div>

			<div class="hidden items-center gap-8 md:flex">
				<a
					href="#showcase"
					class="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase transition-colors hover:text-white"
					>Showcase</a
				>
				<a
					href="#pricing"
					class="text-[10px] font-black tracking-[0.3em] text-cyan-500 text-zinc-400 uppercase transition-colors hover:text-white"
					>Get Key</a
				>
				<a
					href="#features"
					class="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase transition-colors hover:text-white"
					>Security</a
				>
			</div>

			<div class="flex items-center gap-3">
				<Button
					variant="ghost"
					size="sm"
					href="/login"
					class="hidden text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase hover:bg-white/5 hover:text-white sm:flex"
				>
					Login
				</Button>
				<Button
					size="sm"
					class="h-9 rounded-full bg-cyan-600 px-6 text-[10px] font-black tracking-[0.2em] uppercase shadow-lg shadow-cyan-600/20 hover:bg-cyan-500"
				>
					Join Discord
				</Button>
			</div>
		</div>
	</nav>

	<main class="relative pt-20">
		<!-- Background Effects -->
		<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
			<div
				class="absolute -top-[10%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-600/10 blur-[80px]"
			></div>
			<div
				class="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
			></div>
		</div>

		<!-- Hero Section -->
		<section class="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
			<div
				class="mb-10 inline-flex items-center gap-2 rounded-full border border-cyan-500/10 bg-cyan-500/5 px-4 py-1.5 text-[9px] font-black tracking-[0.3em] text-cyan-400 uppercase"
			>
				<div
					class="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
				></div>
				KEY SYSTEM OPERATIONAL
			</div>
			<h1
				class="mx-auto max-w-4xl text-6xl leading-[0.85] font-black tracking-tighter uppercase italic sm:text-8xl lg:text-9xl"
			>
				ONE HUB.<br /><span
					class="bg-linear-to-b from-white to-zinc-600 bg-clip-text text-transparent italic"
					>UNLIMITED KEYS.</span
				>
			</h1>
			<p class="mx-auto mt-10 max-w-2xl text-base font-medium text-zinc-500 sm:text-lg">
				Experience the elite standard in script execution. All scripts are free—power them with our
				advanced <span class="text-white italic">Key System</span> designed for maximum stealth.
			</p>

			<div class="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
				<Button
					size="lg"
					href="/dashboard"
					class="h-14 bg-white px-12 text-[11px] font-black tracking-[0.3em] text-black uppercase shadow-2xl transition-all hover:scale-105 hover:bg-zinc-200"
				>
					<User class="mr-2 h-4 w-4" />
					Access Dashboard
				</Button>
				<Button
					variant="outline"
					size="lg"
					href="#pricing"
					class="h-14 border-cyan-500/10 border-white/5 bg-white/5 px-12 text-[11px] font-black font-bold tracking-[0.3em] text-cyan-500 uppercase shadow-lg shadow-cyan-900/5 transition-all hover:bg-white/10"
				>
					Generate Key
					<ArrowRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
		</section>

		<!-- Script Showcase Section -->
		<section id="showcase" class="border-t border-white/5 pt-24 pb-12">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div>
						<div class="mb-4 text-[10px] font-black tracking-[0.5em] text-cyan-500 uppercase">
							Official Library
						</div>
						<h2
							class="text-shadow-glow text-5xl leading-none font-black tracking-tighter text-white uppercase italic sm:text-7xl"
						>
							THE SHOWCASE.
						</h2>
					</div>
				</div>

				<!-- Grid Showcase -->
				<div class="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each showcaseScripts as script}
						{@const cardColor = script.color || 'from-cyan-600 to-blue-700'}
						{@const IconComponent = iconMap[script.icon] || Zap}
						<button
							onclick={() => openDetails(script)}
							class="group relative overflow-hidden rounded-3xl border-white/[0.03] bg-zinc-900/30 text-left transition-all hover:-translate-y-1 hover:border-white/10 hover:bg-zinc-900/50"
						>
							<div
								class="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br {cardColor} opacity-0 blur-2xl transition-opacity group-hover:opacity-20"
							></div>

							<div class="p-8 pb-4">
								<div class="mb-6 flex items-center justify-between">
									<div
										class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-cyan-500 group-hover:bg-linear-to-br {cardColor} transition-all duration-500 group-hover:text-white"
									>
										<IconComponent class="h-6 w-6" />
									</div>
									<div
										class="text-[9px] font-black tracking-widest text-zinc-600 uppercase group-hover:text-cyan-400"
									>
										{script.version}
									</div>
								</div>
								<h3
									class="text-lg font-black tracking-tight text-white uppercase italic transition-colors group-hover:text-cyan-500"
								>
									{script.title}
								</h3>
								<div class="mt-1 text-[9px] font-black tracking-[0.2em] text-zinc-700 uppercase">
									{script.category}
								</div>
								<p
									class="mt-4 text-[13px] leading-relaxed font-medium text-zinc-500 group-hover:text-zinc-400"
								>
									{script.description}
								</p>
							</div>
							<div class="flex items-center justify-between p-8 pt-4">
								<div
									class="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-cyan-600 uppercase italic"
								>
									<Zap class="h-3 w-3" />
									Ready
								</div>
								<div
									class="flex items-center gap-1 text-[9px] font-black tracking-widest text-zinc-700 uppercase"
								>
									DETAILS <ChevronRight class="h-3 w-3" />
								</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</section>

		<!-- Security & Features Section -->
		<section id="features" class="border-t border-white/5 bg-black/30 py-32">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="grid gap-16 lg:grid-cols-2 lg:items-center">
					<div class="relative">
						<div
							class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-600/5 blur-[120px]"
						></div>
						<div class="mb-6 text-[10px] font-black tracking-[0.5em] text-cyan-500 uppercase">
							Security First
						</div>
						<h2
							class="text-5xl leading-[0.9] font-black tracking-tighter text-white uppercase italic sm:text-7xl"
						>
							ELITE<br /><span class="text-zinc-700">PROTECTION.</span>
						</h2>
						<div class="mt-12 space-y-8">
							<div class="flex gap-6">
								<div
									class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-zinc-900 text-cyan-500"
								>
									<ShieldCheck class="h-6 w-6" />
								</div>
								<div>
									<h3 class="text-sm font-black tracking-widest text-white uppercase italic">
										Undetectable Protocol
									</h3>
									<p class="mt-2 text-sm leading-relaxed font-medium text-zinc-500">
										Our advanced obfuscation and signature rotating bypass any current Anti-Cheat
										system.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div
						class="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-linear-to-br from-zinc-900 to-black p-12 shadow-2xl"
					>
						<div
							class="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-cyan-600/10 blur-[80px]"
						></div>
						<div class="flex flex-col gap-8 pt-8 text-center">
							<div
								class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-600/10 text-cyan-500 uppercase"
							>
								<Lock class="h-10 w-10" />
							</div>
							<h2 class="text-3xl font-black tracking-tighter text-white uppercase italic">
								THE FINAL BYPASS.
							</h2>
							<Button
								size="lg"
								onclick={() => addToast('paket ini belum tersedia', 'error')}
								class="mt-6 h-14 w-full bg-white text-[11px] font-black tracking-[0.3em] text-black uppercase transition-all hover:bg-zinc-200"
							>
								UPGRADE TO PREMIUM
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Pricing Section -->
		<section
			id="pricing"
			class="relative overflow-hidden border-t border-white/5 bg-black/60 px-6 py-32"
		>
			<div
				class="absolute -top-64 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-600/5 blur-[80px]"
			></div>
			<div class="relative z-10 mx-auto max-w-6xl space-y-20">
				<div class="space-y-4 text-center">
					<h2 class="text-4xl font-black tracking-tighter text-white uppercase italic sm:text-6xl">
						CHOOSE YOUR <span
							class="text-cyan-500 underline decoration-cyan-500/20 underline-offset-16"
							>PROTOCOL.</span
						>
					</h2>
					<p class="text-[10px] font-black tracking-[0.6em] text-zinc-600 uppercase">
						Secure your session node access level today.
					</p>
				</div>

				<div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
					<!-- Free Card -->
					<div
						class="group relative rounded-[2.5rem] border border-white/5 bg-black/40 p-8 transition-all hover:border-white/10 hover:bg-zinc-900/40"
					>
						<div class="space-y-10">
							<div class="flex items-center justify-between">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-zinc-600"
								>
									<Key class="h-6 w-6" />
								</div>
								<div class="text-right">
									<p class="text-3xl font-black text-white italic">$0</p>
									<p class="text-[8px] font-black text-zinc-700 uppercase">Per 24 Hours</p>
								</div>
							</div>
							<div>
								<h3 class="text-2xl font-black tracking-tighter text-white uppercase italic">
									FREE ACCESS
								</h3>
								<p class="mt-2 text-[10px] leading-relaxed font-bold text-zinc-600 uppercase">
									Mandatory ad-link verification for basic users.
								</p>
							</div>
							<ul class="space-y-4">
								{#each ['24h Key Validator', '3-Step Ad Verification', 'Support Basic Bypass'] as feat}
									<li
										class="flex items-center gap-3 text-[10px] font-black tracking-widest text-zinc-500 uppercase"
									>
										<div class="h-1 w-1 rounded-full bg-cyan-600"></div>
										{feat}
									</li>
								{/each}
							</ul>
							<Button
								href="/login?plan=free&mode=signup"
								class="h-14 w-full rounded-2xl border border-white/10 bg-white/5 text-[9px] font-black tracking-widest text-white uppercase hover:bg-white hover:text-black"
							>
								GENERATE FREE KEY
							</Button>
						</div>
					</div>

					<!-- Premium Card -->
					<div
						class="group relative z-10 scale-105 rounded-[2.5rem] border-2 border-cyan-500/20 bg-cyan-600/5 p-8 shadow-2xl shadow-cyan-900/10"
					>
						<div
							class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-6 py-1.5 text-[9px] font-black text-black uppercase italic"
						>
							MOST POPULAR
						</div>
						<div class="space-y-10">
							<div class="flex items-center justify-between">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"
								>
									<Crown class="h-6 w-6" />
								</div>
								<div class="text-right">
									<p class="text-3xl font-black text-white italic">$9.99</p>
									<p class="text-[8px] font-black text-cyan-900 uppercase">Per Month</p>
								</div>
							</div>
							<div>
								<h3 class="text-2xl font-black tracking-tighter text-white uppercase italic">
									PREMIUM PLAN
								</h3>
								<p
									class="mt-2 text-[10px] leading-relaxed font-bold text-cyan-500/70 text-zinc-500 uppercase"
								>
									Instant keys with no ads. dominate without waiting.
								</p>
							</div>
							<ul class="space-y-4">
								{#each ['30-Day Permanent Key', 'No Ad-Links (Instant)', 'Exclusive Alpha Bypass'] as feat}
									<li
										class="flex items-center gap-3 text-[10px] font-black tracking-widest text-white uppercase"
									>
										<div
											class="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"
										></div>
										{feat}
									</li>
								{/each}
							</ul>
							<Button
								onclick={() => addToast('paket ini belum tersedia', 'error')}
								class="h-16 w-full rounded-2xl bg-cyan-500 text-[10px] font-black tracking-widest text-black uppercase shadow-2xl hover:bg-cyan-400"
							>
								UPGRADE TO PREMIUM
							</Button>
						</div>
					</div>

					<!-- Founder Card -->
					<div
						class="group relative rounded-[2.5rem] border border-purple-500/20 bg-purple-600/5 p-8 transition-all hover:bg-purple-900/10"
					>
						<div class="space-y-10">
							<div class="flex items-center justify-between">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-600/10 text-purple-500"
								>
									<Activity class="h-6 w-6" />
								</div>
								<div class="text-right">
									<p class="text-3xl font-black text-white italic">$49.99</p>
									<p class="text-[8px] font-black text-purple-900 uppercase">One-Time</p>
								</div>
							</div>
							<div>
								<h3 class="text-2xl font-black tracking-tighter text-white uppercase italic">
									LIFETIME ACCESS
								</h3>
								<p class="mt-2 text-[10px] leading-relaxed font-bold text-zinc-600 uppercase">
									Never generate a key again. Lifetime activation.
								</p>
							</div>
							<ul class="space-y-4">
								{#each ['Forever Lifetime Key', 'Early Access Bypasses', 'Exclusive VIP Badge'] as feat}
									<li
										class="flex items-center gap-3 text-[10px] font-black tracking-widest text-zinc-500 uppercase"
									>
										<div class="h-1 w-1 rounded-full bg-purple-600"></div>
										{feat}
									</li>
								{/each}
							</ul>
							<Button
								onclick={() => addToast('paket ini belum tersedia', 'error')}
								class="h-14 w-full rounded-2xl border border-purple-500/20 bg-purple-900/20 text-[9px] font-black tracking-widest text-white uppercase hover:bg-purple-600"
							>
								UNLOCK LIFETIME STATUS
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>

	<!-- Script Detail Modal -->
	{#if selectedScript}
		{@const Icon = iconMap[selectedScript.icon] || Zap}
		{@const colorClass = selectedScript.color || 'from-cyan-600 to-blue-700'}
		{@const displayDate = selectedScript.updatedAt
			? new Date(selectedScript.updatedAt).toLocaleDateString()
			: 'Active'}

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
			transition:fade={{ duration: 200 }}
		>
			<div class="absolute inset-0 bg-black/80 backdrop-blur-md" onclick={closeDetails}></div>

			<div
				class="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#080808] shadow-2xl md:flex-row"
				transition:fly={{ y: 20, duration: 400 }}
			>
				<!-- Close Button -->
				<button
					onclick={closeDetails}
					class="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
				>
					<X class="h-5 w-5" />
				</button>

				<!-- Left: Visual/Icon Showcase -->
				<div
					class="hidden w-1/3 flex-col bg-linear-to-br md:flex {colorClass} relative items-center justify-center overflow-hidden p-12"
				>
					<div class="absolute inset-0 bg-black/20"></div>
					<div class="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>

					<div class="relative z-10 flex flex-col items-center">
						<div
							class="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-black shadow-2xl"
						>
							<Icon class="h-10 w-10" />
						</div>
						<h4
							class="text-center text-2xl leading-none font-black tracking-tighter text-white uppercase italic"
						>
							{selectedScript.title}
						</h4>
						<div class="mt-2 text-[10px] font-bold tracking-[0.3em] text-white/60 uppercase">
							{selectedScript.category}
						</div>
					</div>
				</div>

				<!-- Right: Content -->
				<div class="flex-1 overflow-y-auto p-8 sm:p-12">
					<div class="mb-8 flex items-center gap-3">
						<div
							class="flex items-center gap-1.5 rounded-full bg-cyan-600/10 px-3 py-1 text-[9px] font-black tracking-widest text-cyan-500 uppercase"
						>
							<Info class="h-3 w-3" />
							Information
						</div>
						<div
							class="flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-[9px] font-black tracking-widest text-zinc-500 uppercase"
						>
							<Clock class="h-3 w-3" />
							Updated {displayDate}
						</div>
					</div>

					<h2 class="text-3xl font-black tracking-tighter text-white uppercase italic sm:text-4xl">
						PRODUCT<br /><span class="text-cyan-500">SPECIFICATIONS.</span>
					</h2>
					<p class="mt-6 text-sm leading-relaxed font-medium text-zinc-500">
						{selectedScript.description || 'No description provided for this software module.'}
					</p>

					<div class="mt-10">
						<h5 class="mb-4 text-[10px] font-black tracking-[0.4em] text-white uppercase">
							Core Features
						</h5>
						<div class="grid gap-4 sm:grid-cols-2">
							{#if selectedScript.features && Array.isArray(selectedScript.features)}
								{#each selectedScript.features as feature}
									<div
										class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3"
									>
										<CheckCircle2 class="h-4 w-4 text-cyan-600" />
										<span class="text-[12px] font-bold text-zinc-300">{feature}</span>
									</div>
								{/each}
							{:else}
								<div
									class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3"
								>
									<CheckCircle2 class="h-4 w-4 text-cyan-500" />
									<span class="text-[12px] font-bold text-zinc-300">Automated Execution</span>
								</div>
								<div
									class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3"
								>
									<CheckCircle2 class="h-4 w-4 text-cyan-500" />
									<span class="text-[12px] font-bold text-zinc-300">Undetected Buffer</span>
								</div>
							{/if}
						</div>
					</div>

					<div class="mt-12 flex flex-col gap-4 sm:flex-row">
						<Button
							size="lg"
							href="/dashboard"
							class="h-14 flex-1 bg-white text-[11px] font-black font-bold tracking-[0.3em] text-black uppercase shadow-xl transition-all hover:bg-zinc-200"
						>
							LOGIN TO ACCESS SCRIPT
							<ArrowRight class="ml-2 h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="lg"
							class="h-14 border-white/10 bg-white/5 px-8 text-[11px] font-black tracking-[0.3em] text-white uppercase hover:bg-white/10"
						>
							<Star class="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Footer -->
	<footer class="border-t border-white/5 bg-black py-20 pb-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div
				class="flex flex-col items-center justify-between gap-12 text-center md:flex-row md:text-left"
			>
				<div class="flex flex-col gap-4">
					<div class="flex items-center justify-center gap-3 md:justify-start">
						<img src={logo} alt="FVKSCRIPT LOGO" class="h-6 w-6 object-contain" />
						<span class="text-lg font-black tracking-tighter text-white uppercase italic"
							>FVK<span class="text-cyan-500">HUB</span></span
						>
					</div>
				</div>
				<p class="text-[9px] leading-loose font-bold tracking-widest text-zinc-600 uppercase">
					© 2026 FVKSCRIPT. Independent elite development.
				</p>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
		background-color: #030303;
	}

	:global(::-webkit-scrollbar) {
		width: 8px;
	}

	:global(::-webkit-scrollbar-track) {
		background: #030303;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #111;
		border-radius: 4px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: #222;
	}

	.text-shadow-glow {
		text-shadow: 0 0 30px rgba(34, 211, 238, 0.4);
	}
</style>
