<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { 
		Crown, 
		Key, 
		Activity, 
		ChevronRight, 
		ArrowUpRight,
		Smartphone,
        Sparkles,
        ShieldCheck,
        Terminal,
        Zap,
        TrendingUp,
        Timer,
        UserCheck,
        History as HistoryIcon,
        X
	} from '@lucide/svelte';
	import { fade, fly, scale } from 'svelte/transition';
    import { onMount } from 'svelte';

	let { data } = $props();
    let showWelcome = $state(false);

    // Aktifkan welcome modal hanya jika baru saja di-upgrade
    onMount(async () => {
        const layoutData = await data.justUpgraded;
        if (layoutData) showWelcome = true;
    });

    // Stats dinamis
	const stats = $derived([
		{ 
            name: 'Security Plan', 
            value: data.user?.plan?.toUpperCase() || 'FREE', 
            icon: Crown, 
            color: 'text-cyan-500', 
            bg: 'bg-cyan-500/10',
            trend: 'ACTIVE NODE' 
        },
		{ 
            name: 'Keys In-Stock', 
            value: data.userKeys?.length?.toString() || '0', 
            icon: Key, 
            color: 'text-purple-500', 
            bg: 'bg-purple-500/10',
            trend: 'PROCESSED' 
        },
		{ 
            name: 'Global Node ID', 
            value: data.user?.id?.slice(0, 8) || 'GUEST', 
            icon: UserCheck, 
            color: 'text-emerald-500', 
            bg: 'bg-emerald-500/10',
            trend: 'SYNCED' 
        }
	]);

    const recentActivities = [
        { action: 'Protocol Authorization', detail: 'Key FVK-PREM-XXXX generated', time: '2m ago', icon: Zap },
        { action: 'Database Synchronized', detail: 'All nodes updated to v2.4', time: '1h ago', icon: Activity },
        { action: 'Client Validated', detail: 'HWID bind successful', time: '4h ago', icon: ShieldCheck },
    ];
</script>

<div class="space-y-12 pb-20" in:fade>
	<!-- Hero Greeting Section -->
	<header class="flex flex-col md:flex-row md:items-end justify-between gap-8 py-4">
		<div class="space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/5 border border-cyan-500/10 text-[9px] font-black uppercase tracking-widest text-cyan-500 italic">
                <Terminal class="h-3 w-3" />
                DASHBOARD VERSION 4.02 // PROTOCOL ACTIVE
            </div>
			<h1 class="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
				WELCOME,<br /><span class="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-blue-600">{data.user?.name || 'OPERATOR'}</span>
			</h1>
			<p class="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-600 max-w-md">
				System diagnostics stable. All secure protocol channels are currently synchronized with your current tier.
			</p>
		</div>
        <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
                <p class="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-1 italic">Network Uptime</p>
                <p class="text-xs font-black text-white italic">99.98% STABLE</p>
            </div>
            <div class="h-16 w-px bg-white/5 mx-2 hidden sm:block"></div>
            <Button variant="outline" href="/dashboard/settings" class="h-16 px-6 md:px-10 rounded-2xl border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all whitespace-nowrap">
                MANAGE NODE
            </Button>
        </div>
	</header>

	<!-- High-Vis Stats Grid -->
	<div class="grid gap-8 md:grid-cols-3">
		{#each stats as stat, i}
			<div class="group relative" in:fly={{ y: 20, delay: i * 100 }}>
                <div class="absolute -inset-0.5 bg-linear-to-r from-white/10 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
				<Card.Root class="relative h-full border-white/5 bg-black/40 backdrop-blur-3xl p-8 rounded-[2.5rem] overflow-hidden">
                    <div class="absolute -right-4 -top-4 h-24 w-24 {stat.bg} rounded-full blur-3xl opacity-20"></div>
					<div class="flex items-start justify-between mb-8">
						<div class="h-14 w-14 rounded-2xl {stat.bg} flex items-center justify-center {stat.color} border border-white/5 shadow-2xl">
							<stat.icon class="h-7 w-7" />
						</div>
						<div class="text-right">
                             <span class="text-[9px] font-black tracking-widest {stat.color} opacity-60 uppercase italic">{stat.trend}</span>
                        </div>
					</div>
					<div class="space-y-1">
						<h3 class="text-[10px] font-black tracking-[0.3em] text-zinc-600 uppercase">{stat.name}</h3>
						<p class="text-4xl font-black italic tracking-tighter text-white uppercase">{stat.value}</p>
					</div>
				</Card.Root>
			</div>
		{/each}
	</div>

	<div class="grid gap-10 lg:grid-cols-5">
		<!-- Left: Recent Scripts & Operations -->
		<Card.Root class="lg:col-span-3 border-white/5 bg-zinc-900/10 backdrop-blur-3xl rounded-[3rem] p-10 overflow-hidden relative">
            <div class="absolute inset-0 bg-linear-to-br from-cyan-600/5 to-transparent"></div>
			<Card.Header class="p-0 flex flex-row items-center justify-between mb-10 relative">
				<div class="space-y-2">
					<h2 class="text-2xl font-black italic text-white uppercase tracking-tighter">RECENT RELEASES</h2>
					<p class="text-[9px] font-black uppercase tracking-widest text-zinc-600 italic">LATEST PROTOCOLS DEPLOYED ON SYSTEM</p>
				</div>
                <Button href="/dashboard/scripts" variant="ghost" class="text-[9px] font-black uppercase tracking-widest text-cyan-500 px-4 h-10 hover:bg-cyan-500/10 rounded-xl">
                    VIEW ALL SCRIPTS
                </Button>
			</Card.Header>
			<div class="space-y-4 relative">
				{#each (data.scripts || []).slice(0, 3) as script}
					<div class="group flex items-center gap-6 p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
						<div class="h-14 w-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center italic font-black text-lg text-cyan-500 shadow-xl group-hover:scale-110 transition-transform">
							{script.title?.charAt(0) || 'S'}
						</div>
						<div class="flex-1">
							<h3 class="text-sm font-black text-white uppercase tracking-widest">{script.title || 'Unknown Script'}</h3>
							<p class="text-[9px] font-bold text-zinc-500 uppercase mt-1">v{script.version || '1.0'} // {script.category || 'Utility'}</p>
						</div>
						<Button href="/dashboard/scripts" variant="ghost" class="h-10 w-10 p-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all text-white">
							<ChevronRight class="h-4 w-4" />
						</Button>
					</div>
				{/each}
                {#if !data.scripts?.length}
                    <div class="py-16 text-center border-2 border-dashed border-white/5 rounded-[2.5rem]">
                        <p class="text-[10px] font-black text-zinc-700 uppercase tracking-widest">No active scripts synchronized.</p>
                    </div>
                {/if}
			</div>
		</Card.Root>

		<!-- Right: Identity & Log Status -->
		<Card.Root class="lg:col-span-2 border-white/5 bg-black/40 backdrop-blur-3xl rounded-[3rem] p-10 flex flex-col">
			<div class="flex items-center gap-4 mb-10">
                <div class="h-10 w-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-500 border border-purple-500/10">
                    <HistoryIcon class="h-5 w-5" />
                </div>
                <div>
				    <h2 class="text-xl font-black italic text-white uppercase tracking-tighter leading-none">IDENTITY LOGS</h2>
                    <p class="text-[8px] font-black uppercase tracking-widest text-zinc-700 mt-1">LATEST ACCOUNT ACTIVITY</p>
                </div>
			</div>
			<div class="space-y-8 flex-1">
				{#each (data.recentActivity || []) as log}
					<div class="flex gap-5 group cursor-default">
						<div class="flex flex-col items-center">
							<div class="h-3 w-3 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
							<div class="w-px h-12 bg-white/5 mt-3"></div>
						</div>
						<div class="pb-6">
							<div class="flex items-center gap-3 mb-1">
                                <HistoryIcon class="h-3 w-3 text-zinc-600 group-hover:text-cyan-500 transition-colors" />
                                <span class="text-[10px] font-black text-white uppercase tracking-widest group-hover:italic transition-all">{log.action || 'OPERATION'}</span>
                                <span class="text-[8px] font-black text-zinc-800 uppercase tracking-tighter">
                                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
							<p class="text-[9px] font-bold text-zinc-600 uppercase tracking-wider pl-6">{log.details || 'Identity sync established.'}</p>
						</div>
					</div>
				{/each}
                {#if !data.recentActivity?.length}
                    <div class="py-10 text-center space-y-4">
                        <Terminal class="h-8 w-8 text-zinc-800 mx-auto" />
                        <p class="text-[8px] font-black text-zinc-700 uppercase tracking-widest leading-relaxed">Identity Logs Empty. Initializing Node Presence...</p>
                    </div>
                {/if}
			</div>
            <div class="mt-4 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <ShieldCheck class="h-4 w-4 text-emerald-500" />
                    <span class="text-[9px] font-black text-white uppercase tracking-widest italic">OS VALIDATION STABLE</span>
                </div>
                <div class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
		</Card.Root>
	</div>
</div>

<!-- CELEBRATION MODAL (ONLY FOR UPGRADES) -->
{#if showWelcome}
    <div class="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md" transition:fade>
        <button 
            type="button"
            class="absolute inset-0 w-full h-full bg-transparent border-none outline-hidden cursor-default" 
            onclick={() => showWelcome = false}
            aria-label="Close modal"
        ></button>
        
        <div class="w-full max-w-lg" transition:scale={{ start: 0.9, duration: 500 }}>
            <Card.Root class="relative bg-[#080808] border border-cyan-500/30 rounded-[3rem] p-12 shadow-[0_0_100px_rgba(6,182,212,0.15)] text-center space-y-10 overflow-hidden">
                <div class="absolute -top-32 -left-32 h-64 w-64 bg-cyan-600/10 rounded-full blur-[100px]"></div>
                <div class="absolute -bottom-32 -right-32 h-64 w-64 bg-purple-600/10 rounded-full blur-[100px]"></div>

                <div class="relative space-y-6">
                    <div class="mx-auto h-24 w-24 bg-cyan-500 rounded-[2rem] flex items-center justify-center text-black shadow-2xl shadow-cyan-900/50 transform rotate-12 transition-transform hover:rotate-0">
                        <Crown class="h-12 w-12" />
                    </div>
                    
                    <div class="space-y-6">
                        <h3 class="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                            PREMIUM PLAN<br/><span class="text-cyan-500">ACTIVATED.</span>
                        </h3>
                        <p class="text-[12px] font-black text-zinc-500 uppercase tracking-[0.4em] leading-relaxed">
                            Your account has been upgraded to <span class="text-cyan-400 italic">PREMIUM ACCESS</span> permanently. Enjoy unlimited scripts and zero-ad link bypass.
                        </p>
                    </div>
                </div>

                <div class="pt-6 relative">
                    <Button onclick={() => showWelcome = false} class="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl">
                        ENTER SECURE PROTOCOL
                    </Button>
                </div>
            </Card.Root>
        </div>
    </div>
{/if}
