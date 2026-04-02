<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { 
		Search, 
		Activity, 
		Shield, 
		Cpu, 
		Zap,
        RefreshCcw,
        Copy
	} from '@lucide/svelte';
	import { fade } from 'svelte/transition';
    import { LOADER_TEMPLATE } from '$lib/loader-template';
    import { page } from '$app/state';
    import { addToast } from '$lib/toast.svelte';

    let { data } = $props();

	// Fallback scripts if database is empty
	const demoScripts = [
		{ id: '1', title: 'Blox Fruits V3', category: 'Farming', status: 'undetected', author: 'FVK Team', version: '3.2.1' },
		{ id: '2', title: 'Doors Hack', category: 'Escape', status: 'undetected', author: 'Ghost', version: '1.0.5' },
		{ id: '3', title: 'Pet Simulator 99', category: 'Auto-Farm', status: 'undetected', author: 'FVK Team', version: '2.4.0' },
	];

    // Priority: Database data > Demo Fallback
    const displayScripts = $derived(data.allScripts && data.allScripts.length > 0 ? data.allScripts : demoScripts);

    let loadingStates = $state<Record<string, string>>({}); 

	async function launchScript(id: string) {
		loadingStates[id] = 'FETCHING...';
		
		setTimeout(() => {
			loadingStates[id] = 'SCRIPT RETRIEVED';
		}, 1500);
	}

    function copyLoader(scriptId: string) {
        const origin = page.url.origin;
        const finalLoader = LOADER_TEMPLATE
            .replace('{{SCRIPT_ID}}', scriptId)
            .replace('http://localhost:5173', origin);
            
        navigator.clipboard.writeText(finalLoader);
        addToast('Loader Code Copied to Clipboard!', 'success');
    }
</script>

<div class="space-y-12" in:fade>
	<!-- Header -->
	<div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
		<div class="space-y-4">
			<h2 class="text-4xl font-black tracking-tighter text-white uppercase italic sm:text-5xl">
				SCRIPT<br /><span class="text-cyan-500 underline decoration-cyan-500/30 underline-offset-8">LIBRARY.</span>
			</h2>
			<p class="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-600">
				Access {displayScripts.length} premium game protocols in real-time.
			</p>
		</div>

		<div class="relative group max-w-md w-full lg:w-96">
			<Search class="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
			<input 
				type="text" 
				placeholder="SEARCH PROTOCOL NAME..."
				class="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-8 text-[11px] font-black uppercase tracking-widest text-white focus:outline-hidden focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all"
			/>
		</div>
	</div>

	<!-- Stats Quick View -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
		{#each [
			{ label: 'Protocols Active', value: displayScripts.length, icon: Activity, color: 'text-emerald-500' },
			{ label: 'Security Node', value: 'v1.4.2', icon: Shield, color: 'text-cyan-500' },
			{ label: 'Server Load', value: 'LOW-LAT', icon: Cpu, color: 'text-purple-500' }
		] as stat}
			<Card.Root class="border-white/5 bg-zinc-900/10 p-6">
				<div class="flex items-center gap-4">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 {stat.color}">
						<stat.icon class="h-4 w-4" />
					</div>
					<div>
						<p class="text-[9px] font-bold tracking-widest text-zinc-600 uppercase">{stat.label}</p>
						<p class="text-lg font-black tracking-tighter text-white uppercase italic">{stat.value}</p>
					</div>
				</div>
			</Card.Root>
		{/each}
	</div>

	<!-- Scripts Grid -->
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each displayScripts as script}
			<Card.Root class="group relative flex flex-col overflow-hidden border-white/5 bg-black/40 p-1 backdrop-blur-3xl transition-all hover:border-cyan-500/20 hover:bg-zinc-900/40">
				<div class="p-8 pb-10 flex-1">
					<div class="mb-8 flex items-center justify-between">
						<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-cyan-500 transition-all group-hover:bg-cyan-600 group-hover:text-white">
							<Zap class="h-7 w-7" />
						</div>
						<div class="flex items-center gap-2">
							<div class="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
							<span class="text-[9px] font-black uppercase tracking-widest text-emerald-500 italic">Undetected</span>
						</div>
					</div>

					<div class="space-y-4">
						<div class="inline-block rounded-full bg-cyan-600/10 px-4 py-1 text-[8px] font-black tracking-widest text-cyan-500 uppercase">
							{script.category || 'Game'}
						</div>
						<h3 class="text-2xl font-black tracking-tighter text-white uppercase italic leading-none group-hover:text-cyan-500 transition-colors">
							{script.title}
						</h3>
						<div class="flex items-center gap-4 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
							<span>V{script.version}</span>
							<span class="h-1 w-1 rounded-full bg-zinc-800"></span>
							<span>By {script.author}</span>
						</div>
					</div>
				</div>

				<div class="p-6 pt-0 flex gap-3">
					<Button 
						onclick={() => copyLoader(script.id)}
						class="h-14 flex-1 rounded-2xl bg-white text-[11px] font-black uppercase tracking-[0.3em] text-black shadow-xl transition-all hover:bg-zinc-200 active:scale-95"
					>
						GET SCRIPT
					</Button>
				</div>
			</Card.Root>
		{/each}
	</div>
</div>
