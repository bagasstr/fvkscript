<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { 
		Activity, 
		TrendingUp, 
		Users, 
		Code, 
		Key, 
		ShieldCheck, 
		Crown, 
		Zap,
        Sparkles,
        Clock,
        FileCode,
        Flame,
        ArrowUpRight,
        ArrowDownRight,
        History
	} from '@lucide/svelte';
	import { fade, fly, scale } from 'svelte/transition';

	let { data } = $props();

    const planStats = $derived(data.distributions?.plans || []);
    const keyStats = $derived(data.distributions?.keyStatus || []);
    const categoryStats = $derived(data.distributions?.categories || []);
    const totalUsers = $derived(data.stats?.users || 1);
    const totalKeys = $derived(data.stats?.keys || 1);
</script>

<div class="space-y-12 py-10 pb-32" in:fade>
	<!-- Analytics Header -->
	<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
		<div class="space-y-4">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-black uppercase tracking-widest text-cyan-500 italic shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <Flame class="h-3 w-3" />
                GLOBAL ANALYTICS ENGINE // FVKHUB v4
            </div>
            <h1 class="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
				SYSTEM <span class="text-cyan-500">DIAGNOSTICS.</span>
			</h1>
			<p class="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
				Real-time monitoring of identity growth and protocol distribution.
			</p>
		</div>
        <div class="flex items-center gap-4">
            <div class="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">SYNC STATUS: STABLE</span>
            </div>
        </div>
	</div>

	<!-- High-Vis Key Stats Grid -->
    <div class="grid gap-8 md:grid-cols-3">
        {#each [
            { label: 'IDENTITY NODES', value: data.stats.users, sub: 'CONNECTED TO SYSTEM', icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'PROTOCOL LICENSES', value: data.stats.keys, sub: 'GENERATED TOTAL', icon: Key, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
            { label: 'SRC PROTOCOLS', value: data.stats.scripts, sub: 'MANAGED ASSETS', icon: Code, color: 'text-purple-500', bg: 'bg-purple-500/10' }
        ] as stat}
            <div class="p-8 rounded-[3rem] border border-white/5 bg-zinc-900/20 backdrop-blur-3xl relative overflow-hidden group">
                <div class="absolute -right-10 -top-10 h-32 w-32 {stat.bg} rounded-full blur-[80px] opacity-20 transition-all group-hover:opacity-40"></div>
                <div class="flex items-start justify-between mb-8">
                    <div class="h-14 w-14 rounded-2xl {stat.bg} flex items-center justify-center {stat.color} border border-white/5">
                        <stat.icon class="h-7 w-7" />
                    </div>
                    <div class="text-[9px] font-black tracking-widest text-zinc-800 uppercase italic">CYCLE: {new Date().getFullYear()}</div>
                </div>
                <h3 class="text-4xl font-black italic tracking-tighter text-white uppercase mb-1">{stat.value}</h3>
                <p class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">{stat.label}</p>
                <div class="mt-4 flex items-center gap-2">
                    <ArrowUpRight class="h-3 w-3 text-emerald-500" />
                    <span class="text-[8px] font-black tracking-[0.2em] text-zinc-700 uppercase">{stat.sub}</span>
                </div>
            </div>
        {/each}
    </div>

    <!-- Data Visualization Area -->
    <div class="grid gap-10 lg:grid-cols-5">
        <!-- Distribution Charts -->
        <div class="lg:col-span-3 space-y-10">
            <!-- Plan & Key Status Row -->
            <div class="grid gap-10 md:grid-cols-2">
                 <!-- Plan Distribution (FVK Style Bars) -->
                 <Card.Root class="p-10 border-white/5 bg-black/40 backdrop-blur-3xl rounded-[3rem]">
                    <h3 class="text-xl font-black italic tracking-tight text-white uppercase mb-10 flex items-center gap-3">
                        <Crown class="h-5 w-5 text-cyan-500" />
                        ACCESS TIERS
                    </h3>
                    <div class="space-y-8">
                        {#each planStats as plan}
                            <div class="space-y-2">
                                <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span class="text-zinc-600">{plan.plan}</span>
                                    <span class="text-white">{plan.count} / {totalUsers}</span>
                                </div>
                                <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        class="h-full bg-linear-to-r {plan.plan === 'founder' ? 'from-purple-500 to-cyan-500' : plan.plan === 'premium' ? 'from-cyan-300 to-cyan-800' : 'from-zinc-500 to-zinc-900'} transition-all duration-1000" 
                                        style="width: {(plan.count / totalUsers) * 100}%"
                                    ></div>
                                </div>
                            </div>
                        {/each}
                    </div>
                 </Card.Root>

                 <!-- Key Security Status -->
                 <Card.Root class="p-10 border-white/5 bg-zinc-900/10 backdrop-blur-3xl rounded-[3rem]">
                    <h3 class="text-xl font-black italic tracking-tight text-white uppercase mb-10 flex items-center gap-3">
                        <ShieldCheck class="h-5 w-5 text-orange-500" />
                        KEY SECURITY
                    </h3>
                    <div class="space-y-8">
                        {#each keyStats as status}
                            <div class="space-y-2">
                                <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span class="text-zinc-600">{status.status}</span>
                                    <span class="text-white">{status.count}</span>
                                </div>
                                <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        class="h-full {status.status === 'active' ? 'bg-emerald-500' : status.status === 'revoked' ? 'bg-red-500' : 'bg-zinc-800'}" 
                                        style="width: {(status.count / totalKeys) * 100}%"
                                    ></div>
                                </div>
                            </div>
                        {/each}
                    </div>
                 </Card.Root>
            </div>

            <!-- Categories Visualization -->
            <Card.Root class="p-10 border-white/5 bg-black/40 backdrop-blur-3xl rounded-[3rem]">
                <h3 class="text-xl font-black italic tracking-tight text-white uppercase mb-10 flex items-center gap-3">
                    <FileCode class="h-5 w-5 text-purple-500" />
                    REPOSITORY SEGMENTATION
                </h3>
                <div class="grid gap-6 grid-cols-2 sm:grid-cols-4">
                    {#each categoryStats as cat}
                        <div class="p-6 rounded-3xl border border-white/5 bg-white/[0.02] text-center space-y-4">
                            <div class="mx-auto h-12 w-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-500 border border-purple-500/10">
                                <Zap class="h-5 w-5" />
                            </div>
                            <div>
                                <p class="text-[9px] font-black tracking-widest text-zinc-700 uppercase truncate">{cat.category}</p>
                                <p class="text-2xl font-black italic tracking-tighter text-white uppercase mt-1">{cat.count}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </Card.Root>
        </div>

        <!-- Activity Feed -->
        <div class="lg:col-span-2 space-y-10">
            <Card.Root class="h-full p-10 border-white/5 bg-zinc-900/10 backdrop-blur-3xl rounded-[3rem] overflow-hidden flex flex-col">
                <div class="flex items-center justify-between mb-10">
                    <h3 class="text-xl font-black italic tracking-tight text-white uppercase flex items-center gap-3">
                        <History class="h-5 w-5 text-orange-500" />
                        GLOBAL AUDIT HUB
                    </h3>
                    <div class="h-1.5 w-1.5 rounded-full bg-orange-600 shadow-[0_0_10px_#ea580c] animate-pulse"></div>
                </div>
                
                <div class="space-y-8 flex-1 overflow-y-auto">
                    {#each (data.logs || []) as log}
                        <div class="flex gap-6 group">
                            <div class="flex flex-col items-center">
                                <div class="h-3 w-3 rounded-full border-2 border-white/10 bg-orange-600 shadow-[0_0_8px_#ea580c]"></div>
                                <div class="w-px h-16 bg-white/5 mt-2"></div>
                            </div>
                            <div class="pb-6">
                                <div class="flex items-center gap-3 mb-2">
                                    <span class="text-[10px] font-black text-white uppercase tracking-widest italic">{log.action}</span>
                                    <span class="text-[8px] font-black text-zinc-800 uppercase tracking-tighter">
                                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p class="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed mb-2 truncate max-w-[200px]">
                                    {log.userName} // {log.details}
                                </p>
                            </div>
                        </div>
                    {/each}
                    {#if !data.logs?.length}
                        <div class="py-20 text-center opacity-30">
                            <Zap class="h-10 w-10 mx-auto mb-4" />
                            <p class="text-[9px] font-black uppercase tracking-widest">No recent audit logs.</p>
                        </div>
                    {/if}
                </div>
                
                <div class="mt-8 pt-8 border-t border-white/5 text-center">
                    <p class="text-[8px] font-black text-zinc-800 uppercase tracking-[0.5em]">SYSTEM STABILITY: 99.992% // ALL CHANNELS SECURE</p>
                </div>
            </Card.Root>
        </div>
    </div>
</div>
