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

    let { data } = $props();

    // Mapping icons for rendering
    const iconMap: Record<string, any> = {
        Sword, Car, Ghost, Flame, Gamepad2, Activity, Zap, ShieldCheck, Terminal
    };

    const showcaseScripts = $derived(data.showcaseScripts || []);

    const pricingPlans = [
        {
            name: "Free Key",
            price: "$0",
            period: "per 24 Hours",
            desc: "Mandatory Ad-link verification for basic users.",
            features: ["24h Key Validator", "3-Step Ad Verification", "Support Basic Bypass", "Standard Activation Delay", "Public Discord Role"],
            icon: Key,
            color: "border-white/5 bg-white/5",
            cta: "Generate Free Key",
            popular: false
        },
        {
            name: "Premium Key",
            price: "$9.99",
            period: "per Month",
            desc: "Instant keys with no ads. Dominate without waiting.",
            features: ["30-Day Permanent Key", "No Ad-Links (Instant)", "Exclusive Alpha Bypass", "0ms Activation Sync", "Priority Discord Ticket"],
            icon: Crown,
            color: "border-cyan-500/20 bg-cyan-500/5 shadow-[0_0_40px_rgba(8,145,178,0.15)]",
            cta: "Get Instant Key",
            popular: true
        },
        {
            name: "Founder Access",
            price: "$49.99",
            period: "One-time",
            desc: "Never generate a key again. Lifetime activation.",
            features: ["Forever Lifetime Key", "Early Access Bypasses", "HWID Bind Reset Pack", "Exclusive VIP Badge", "Direct Private Dev Line"],
            icon: Infinity,
            color: "border-purple-500/20 bg-purple-500/5",
            cta: "Buy Once, Use Forever",
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
        
        // Use the script's code or a default loader
        const scriptCode = selectedScript.sourceCode || `loadstring(game:HttpGet("${window.location.origin}/api/v1/auth?scriptId=${selectedScript.id}"))()`;
        
        navigator.clipboard.writeText(scriptCode);
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    }
</script>

<div class="min-h-screen bg-[#030303] text-[#f0f0f0] selection:bg-cyan-500/30 font-sans">
	<!-- Navbar -->
	<nav class="fixed top-0 z-50 w-full border-b border-white/[0.03] bg-black/60 backdrop-blur-lg">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
					<Terminal class="h-6 w-6 text-white" />
				</div>
                <span class="text-xl font-black uppercase italic tracking-tighter text-white">FVK<span class="text-cyan-500">HUB</span></span>
			</div>
			
			<div class="hidden items-center gap-8 md:flex">
				<a href="#showcase" class="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors">Showcase</a>
				<a href="#pricing" class="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors text-cyan-500">Get Key</a>
                <a href="#features" class="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors">Security</a>
			</div>

			<div class="flex items-center gap-3">
                <Button variant="ghost" size="sm" href="/login" class="hidden text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:bg-white/5 sm:flex">
                    Login
                </Button>
				<Button size="sm" class="h-9 rounded-full bg-cyan-600 px-6 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cyan-500 shadow-lg shadow-cyan-600/20">
					Join Discord
				</Button>
			</div>
		</div>
	</nav>

	<main class="relative pt-20">
		<!-- Background Effects -->
		<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
			<div class="absolute -top-[10%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-600/10 blur-[80px]"></div>
			<div class="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
		</div>

		<!-- Hero Section -->
		<section class="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
			<div class="mb-10 inline-flex items-center gap-2 rounded-full border border-cyan-500/10 bg-cyan-500/5 px-4 py-1.5 text-[9px] font-black tracking-[0.3em] text-cyan-400 uppercase">
				<div class="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
				KEY SYSTEM OPERATIONAL
			</div>
			<h1 class="mx-auto max-w-4xl text-6xl font-black italic tracking-tighter uppercase sm:text-8xl lg:text-9xl leading-[0.85]">
				ONE HUB.<br/><span class="bg-linear-to-b from-white to-zinc-600 bg-clip-text text-transparent italic">UNLIMITED KEYS.</span>
			</h1>
			<p class="mx-auto mt-10 max-w-2xl text-base font-medium text-zinc-500 sm:text-lg">
				Experience the elite standard in script execution. All scripts are free—power them with our advanced <span class="text-white italic">Key System</span> designed for maximum stealth.
			</p>
			
			<div class="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Button size="lg" href="/dashboard" class="h-14 bg-white px-12 text-[11px] font-black uppercase tracking-[0.3em] text-black hover:bg-zinc-200 hover:scale-105 transition-all shadow-2xl">
                    <User class="mr-2 h-4 w-4" />
                    Access Dashboard
                </Button>
                <Button variant="outline" size="lg" href="#pricing" class="h-14 border-white/5 bg-white/5 px-12 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all text-cyan-500 border-cyan-500/10 shadow-lg shadow-cyan-900/5 font-bold">
                    Generate Key
                    <ArrowRight class="ml-2 h-4 w-4" />
                </Button>
            </div>
		</section>

		<!-- Script Showcase Section -->
		<section id="showcase" class="pt-24 pb-12 border-t border-white/5">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div class="text-[10px] font-black tracking-[0.5em] text-cyan-500 uppercase mb-4">Official Library</div>
                        <h2 class="text-5xl font-black italic tracking-tighter uppercase sm:text-7xl leading-none text-white text-shadow-glow">THE SHOWCASE.</h2>
                    </div>
                </div>

				<!-- Grid Showcase -->
				<div class="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each showcaseScripts as script}
                        {@const cardColor = script.color || "from-cyan-600 to-blue-700"}
                        {@const IconComponent = iconMap[script.icon] || Zap}
						<button 
                            onclick={() => openDetails(script)}
                            class="group relative text-left border-white/[0.03] bg-zinc-900/30 transition-all hover:bg-zinc-900/50 hover:border-white/10 hover:-translate-y-1 overflow-hidden rounded-3xl"
                        >
                            <div class="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-linear-to-br {cardColor} opacity-0 blur-2xl transition-opacity group-hover:opacity-20"></div>
                            
							<div class="p-8 pb-4">
                                <div class="flex items-center justify-between mb-6">
                                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-cyan-500 group-hover:bg-linear-to-br {cardColor} group-hover:text-white transition-all duration-500">
                                        <IconComponent class="h-6 w-6" />
                                    </div>
                                    <div class="text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-cyan-400">{script.version}</div>
                                </div>
								<h3 class="text-lg font-black uppercase italic tracking-tight text-white group-hover:text-cyan-500 transition-colors">{script.title}</h3>
								<div class="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700">{script.category}</div>
                                <p class="mt-4 text-[13px] font-medium leading-relaxed text-zinc-500 group-hover:text-zinc-400">
                                    {script.description}
                                </p>
							</div>
                            <div class="p-8 pt-4 flex items-center justify-between">
                                <div class="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-600 italic">
                                    <Zap class="h-3 w-3" />
                                    Ready
                                </div>
                                <div class="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-zinc-700">
                                    DETAILS <ChevronRight class="h-3 w-3" />
                                </div>
                            </div>
						</button>
					{/each}
				</div>
			</div>
		</section>



		<!-- Security & Features Section -->
		<section id="features" class="py-32 border-t border-white/5 bg-black/30">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="grid gap-16 lg:grid-cols-2 lg:items-center">
                    <div class="relative">
                        <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-600/5 blur-[120px]"></div>
                        <div class="text-[10px] font-black tracking-[0.5em] text-cyan-500 uppercase mb-6">Security First</div>
                        <h2 class="text-5xl font-black italic tracking-tighter uppercase sm:text-7xl leading-[0.9] text-white">ELITE<br/><span class="text-zinc-700">PROTECTION.</span></h2>
                        <div class="mt-12 space-y-8">
                            <div class="flex gap-6">
                                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-white/5 text-cyan-500">
                                    <ShieldCheck class="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 class="text-sm font-black uppercase tracking-widest text-white italic">Undetectable Protocol</h3>
                                    <p class="mt-2 text-sm font-medium text-zinc-500 leading-relaxed">Our advanced obfuscation and signature rotating bypass any current Anti-Cheat system.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-zinc-900 to-black border border-white/5 p-12 shadow-2xl">
                        <div class="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-cyan-600/10 blur-[80px]"></div>
                        <div class="flex flex-col gap-8 text-center pt-8">
                            <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-600/10 text-cyan-500 uppercase">
                                <Lock class="h-10 w-10" />
                            </div>
                            <h2 class="text-3xl font-black italic uppercase tracking-tighter text-white">THE FINAL BYPASS.</h2>
                            <Button size="lg" href="/login" class="mt-6 h-14 w-full bg-white text-[11px] font-black uppercase tracking-[0.3em] text-black hover:bg-zinc-200 transition-all">
                                UPGRADE TO PREMIUM
                            </Button>
                        </div>
                    </div>
                </div>
			</div>
		</section>

        <!-- Pricing Section -->
        <section id="pricing" class="py-32 px-6 relative border-t border-white/5 bg-black/60 overflow-hidden">
            <div class="absolute -top-64 left-1/2 -translate-x-1/2 h-[400px] w-[400px] bg-cyan-600/5 rounded-full blur-[80px]"></div>
            <div class="max-w-6xl mx-auto space-y-20 relative z-10">
                <div class="text-center space-y-4">
                    <h2 class="text-4xl font-black italic uppercase tracking-tighter text-white sm:text-6xl">
                        CHOOSE YOUR <span class="text-cyan-500 underline decoration-cyan-500/20 underline-offset-16">PROTOCOL.</span>
                    </h2>
                    <p class="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">Secure your session node access level today.</p>
                </div>

                <div class="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
                    <!-- Free Card -->
                    <div class="group relative bg-black/40 border border-white/5 p-8 rounded-[2.5rem] transition-all hover:border-white/10 hover:bg-zinc-900/40">
                        <div class="space-y-10">
                            <div class="flex items-center justify-between">
                                <div class="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-600"><Key class="h-6 w-6" /></div>
                                <div class="text-right"><p class="text-3xl font-black italic text-white">$0</p><p class="text-[8px] font-black text-zinc-700 uppercase">Per 24 Hours</p></div>
                            </div>
                            <div><h3 class="text-2xl font-black italic text-white uppercase tracking-tighter">FREE ACCESS</h3><p class="mt-2 text-[10px] font-bold text-zinc-600 uppercase leading-relaxed">Mandatory ad-link verification for basic users.</p></div>
                            <ul class="space-y-4">
                                {#each ['24h Key Validator', '3-Step Ad Verification', 'Support Basic Bypass'] as feat}
                                    <li class="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                        <div class="h-1 w-1 rounded-full bg-cyan-600"></div> {feat}
                                    </li>
                                {/each}
                            </ul>
                            <Button href="/login?plan=free&mode=signup" class="w-full h-14 bg-white/5 border border-white/10 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black">
                                GENERATE FREE KEY
                            </Button>
                        </div>
                    </div>

                    <!-- Premium Card -->
                    <div class="group relative bg-cyan-600/5 border-2 border-cyan-500/20 p-8 rounded-[2.5rem] scale-105 z-10 shadow-2xl shadow-cyan-900/10">
                        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-6 py-1.5 rounded-full text-[9px] font-black uppercase italic">MOST POPULAR</div>
                        <div class="space-y-10">
                            <div class="flex items-center justify-between">
                                <div class="h-12 w-12 rounded-xl bg-cyan-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"><Crown class="h-6 w-6" /></div>
                                <div class="text-right"><p class="text-3xl font-black italic text-white">$9.99</p><p class="text-[8px] font-black text-cyan-900 uppercase">Per Month</p></div>
                            </div>
                            <div><h3 class="text-2xl font-black italic text-white uppercase tracking-tighter">PREMIUM PLAN</h3><p class="mt-2 text-[10px] font-bold text-zinc-500 uppercase leading-relaxed text-cyan-500/70">Instant keys with no ads. dominate without waiting.</p></div>
                            <ul class="space-y-4">
                                {#each ['30-Day Permanent Key', 'No Ad-Links (Instant)', 'Exclusive Alpha Bypass'] as feat}
                                    <li class="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white">
                                        <div class="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></div> {feat}
                                    </li>
                                {/each}
                            </ul>
                            <Button href="/login?plan=premium&mode=signup" class="w-full h-16 bg-cyan-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-cyan-400">
                                UPGRADE TO PREMIUM
                            </Button>
                        </div>
                    </div>

                    <!-- Founder Card -->
                    <div class="group relative bg-purple-600/5 border border-purple-500/20 p-8 rounded-[2.5rem] transition-all hover:bg-purple-900/10">
                        <div class="space-y-10">
                            <div class="flex items-center justify-between">
                                <div class="h-12 w-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-500 border border-purple-500/20"><Activity class="h-6 w-6" /></div>
                                <div class="text-right"><p class="text-3xl font-black italic text-white">$49.99</p><p class="text-[8px] font-black text-purple-900 uppercase">One-Time</p></div>
                            </div>
                            <div><h3 class="text-2xl font-black italic text-white uppercase tracking-tighter">FOUNDER ACCESS</h3><p class="mt-2 text-[10px] font-bold text-zinc-600 uppercase leading-relaxed">Never generate a key again. Lifetime activation.</p></div>
                            <ul class="space-y-4">
                                {#each ['Forever Lifetime Key', 'Early Access Bypasses', 'Exclusive VIP Badge'] as feat}
                                    <li class="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                        <div class="h-1 w-1 rounded-full bg-purple-600"></div> {feat}
                                    </li>
                                {/each}
                            </ul>
                            <Button href="/login?plan=founder&mode=signup" class="w-full h-14 bg-purple-900/20 border border-purple-500/20 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-purple-600">
                                UNLOCK FOUNDER STATUS
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
        {@const colorClass = selectedScript.color || "from-cyan-600 to-blue-700"}
        {@const displayDate = selectedScript.updatedAt ? new Date(selectedScript.updatedAt).toLocaleDateString() : 'Active'}
        
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            transition:fade={{ duration: 200 }}
        >
            <div 
                class="absolute inset-0 bg-black/80 backdrop-blur-md"
                onclick={closeDetails}
            ></div>
            
            <div 
                class="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#080808] shadow-2xl flex flex-col md:flex-row"
                transition:fly={{ y: 20, duration: 400 }}
            >
                <!-- Close Button -->
                <button 
                    onclick={closeDetails}
                    class="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
                >
                    <X class="h-5 w-5" />
                </button>

                <!-- Left: Visual/Icon Showcase -->
                <div class="hidden md:flex flex-col w-1/3 bg-linear-to-br {colorClass} p-12 justify-center items-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <div class="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
                    
                    <div class="relative z-10 flex flex-col items-center">
                        <div class="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-black shadow-2xl mb-6">
                            <Icon class="h-10 w-10" />
                        </div>
                        <h4 class="text-2xl font-black italic uppercase tracking-tighter text-white text-center leading-none">{selectedScript.title}</h4>
                        <div class="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">{selectedScript.category}</div>
                    </div>
                </div>

                <!-- Right: Content -->
                <div class="flex-1 overflow-y-auto p-8 sm:p-12">
                    <div class="flex items-center gap-3 mb-8">
                        <div class="flex items-center gap-1.5 rounded-full bg-cyan-600/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-cyan-500">
                            <Info class="h-3 w-3" />
                            Information
                        </div>
                        <div class="flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                            <Clock class="h-3 w-3" />
                            Updated {displayDate}
                        </div>
                    </div>

                    <h2 class="text-3xl font-black italic uppercase tracking-tighter text-white sm:text-4xl">PRODUCT<br/><span class="text-cyan-500">SPECIFICATIONS.</span></h2>
                    <p class="mt-6 text-sm font-medium text-zinc-500 leading-relaxed">
                        {selectedScript.description || "No description provided for this software module."}
                    </p>

                    <div class="mt-10">
                        <h5 class="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-4">Core Features</h5>
                        <div class="grid gap-4 sm:grid-cols-2">
                            {#if selectedScript.features && Array.isArray(selectedScript.features)}
                                {#each selectedScript.features as feature}
                                    <div class="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
                                        <CheckCircle2 class="h-4 w-4 text-cyan-600" />
                                        <span class="text-[12px] font-bold text-zinc-300">{feature}</span>
                                    </div>
                                {/each}
                            {:else}
                                <div class="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
                                    <CheckCircle2 class="h-4 w-4 text-cyan-500" />
                                    <span class="text-[12px] font-bold text-zinc-300">Automated Execution</span>
                                </div>
                                <div class="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
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
                            class="h-14 flex-1 bg-white text-black hover:bg-zinc-200 text-[11px] font-black uppercase tracking-[0.3em] shadow-xl transition-all font-bold"
                        >
                            LOGIN TO ACCESS SCRIPT
                            <ArrowRight class="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="lg" class="h-14 border-white/10 bg-white/5 px-8 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/10 text-white">
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
			<div class="flex flex-col items-center justify-between gap-12 md:flex-row text-center md:text-left">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-center md:justify-start gap-3">
                        <Terminal class="h-6 w-6 text-cyan-500" />
                        <span class="text-lg font-black uppercase italic tracking-tighter text-white">FVK<span class="text-cyan-500">HUB</span></span>
                    </div>
                </div>
				<p class="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-loose">
					© 2026 FVKHUB. Independent elite development.
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
