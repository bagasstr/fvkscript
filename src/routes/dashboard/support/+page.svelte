<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { 
		HelpCircle, 
		MessageSquare, 
		ExternalLink, 
		Terminal, 
		Flame, 
		ShieldCheck, 
		Clock, 
		Send,
		AlertCircle,
		ChevronDown,
        ChevronUp
	} from '@lucide/svelte';
	import { fade, slide } from 'svelte/transition';

	const faqs = $state([
		{ q: "HOW DO I SYNC MY HWID?", a: "Your HWID is automatically captured upon first key execution. To reset it, go to Settings > System Config.", open: true },
		{ q: "WHEN DO FREE KEYS EXPIRE?", a: "Free keys are valid for exactly 24 hours from the moment of generation.", open: false },
		{ q: "IS THE LOADER UNDETECTED?", a: "Yes, our kernel-level security bypass is updated weekly to ensure maximum safety.", open: false },
	]);

	function toggleFaq(index: number) {
		faqs[index].open = !faqs[index].open;
	}
</script>

<div class="space-y-10" in:fade>
	<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
		<div>
			<h1 class="text-3xl font-black italic uppercase italic tracking-tighter text-white">TECH <span class="text-cyan-500">ASSISTANCE.</span></h1>
			<p class="mt-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Access our knowledge base and official support channels.</p>
		</div>
        <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div class="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
            <span class="text-[9px] font-black uppercase tracking-widest text-emerald-500">Staff Online: Active Response</span>
        </div>
	</div>

	<div class="grid gap-10 lg:grid-cols-5 h-full items-stretch">
		<!-- FAQ Section -->
		<div class="lg:col-span-3 space-y-6">
			<Card.Root class="border-white/5 bg-zinc-900/10 backdrop-blur-3xl overflow-hidden p-8 sm:p-12">
				<div class="flex items-center gap-3 mb-10">
					<HelpCircle class="h-5 w-5 text-zinc-500" />
					<h3 class="text-xl font-black italic uppercase italic tracking-tighter text-white uppercase italic">PROTOCOL FAQ</h3>
				</div>
				
				<div class="space-y-3">
					{#each faqs as faq, i}
						<div class="border border-white/5 rounded-2xl bg-white/2 overflow-hidden transition-all hover:bg-white/4">
							<button 
								class="w-full flex items-center justify-between p-6 text-left focus:outline-hidden"
								onclick={() => toggleFaq(i)}
							>
								<span class="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white leading-relaxed">{faq.q}</span>
								{#if faq.open}
									<ChevronUp class="h-4 w-4 text-cyan-500" />
								{:else}
									<ChevronDown class="h-4 w-4 text-zinc-600" />
								{/if}
							</button>
							{#if faq.open}
								<div class="px-6 pb-6 pt-2" transition:slide>
									<p class="text-[11px] font-medium leading-loose text-zinc-500 uppercase tracking-[0.1em] italic">
										{faq.a}
									</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</Card.Root>

            <!-- Support Warning -->
            <div class="p-8 rounded-3xl bg-linear-to-br from-cyan-600/10 to-transparent border border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-6">
                    <div class="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 text-cyan-500 border border-white/5 shadow-2xl">
                        <MessageSquare class="h-6 w-6" />
                    </div>
                    <div>
                        <h4 class="text-lg font-black italic uppercase italic tracking-tighter text-white leading-none mb-1">STILL NEED HELP?</h4>
                        <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Connect with our support team in a private ticket environment.</p>
                    </div>
                </div>
                <Button class="bg-white text-black hover:bg-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest px-8 h-12 shadow-xl whitespace-nowrap">
                    OPEN PRIVATE TICKET
                </Button>
            </div>
		</div>

		<!-- Community Links Column -->
		<div class="lg:col-span-2 space-y-6">
			<Card.Root class="h-full border-white/5 bg-zinc-900/10 backdrop-blur-3xl overflow-hidden p-10 border-cyan-500/10 relative group">
                <div class="absolute -right-16 -top-16 h-48 w-48 bg-cyan-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
				<div class="flex items-center gap-3 mb-10">
					<Terminal class="h-5 w-5 text-cyan-500" />
					<h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Join the Collective</h3>
				</div>
				<h3 class="text-3xl font-black italic uppercase italic tracking-tighter text-white leading-none mb-6">OFFICIAL<br/><span class="text-cyan-500">D-SERVER.</span></h3>
				<p class="text-[11px] font-bold leading-relaxed text-zinc-600 uppercase tracking-widest mb-12">Immediate access to bypass updates, giveaways, and the VIP lobby.</p>
				
				<a href="https://discord.com" target="_blank" class="w-full h-16 flex items-center justify-center gap-4 rounded-2xl bg-linear-to-r from-cyan-600 to-blue-700 text-[11px] font-black uppercase tracking-[0.4em] text-white shadow-2xl shadow-cyan-900/20 hover:scale-[1.02] active:scale-95 transition-all">
					CONNECT HUB
                    <ExternalLink class="h-4 w-4" />
				</a>
                
                <div class="mt-20 p-6 rounded-2xl border border-white/5 bg-black/40 space-y-4">
                    <div class="flex items-center gap-3">
                        <AlertCircle class="h-4 w-4 text-orange-500" />
                        <span class="text-[8px] font-black uppercase tracking-widest text-zinc-600">Protocol Status</span>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] font-bold text-zinc-500">Global Bypass</span>
                            <span class="text-[10px] font-black italic text-emerald-500 uppercase tracking-widest">Functional</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] font-bold text-zinc-500">Key Distro</span>
                            <span class="text-[10px] font-black italic text-emerald-500 uppercase tracking-widest">Normal</span>
                        </div>
                    </div>
                </div>
			</Card.Root>
		</div>
	</div>
</div>
