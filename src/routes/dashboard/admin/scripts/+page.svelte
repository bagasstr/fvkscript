<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { 
		Plus, 
		Edit3, 
		Trash2, 
		Terminal, 
		Database, 
		Zap,
        Sparkles,
        Key,
        ShieldAlert,
        Code2,
        X,
        Save
	} from '@lucide/svelte';
	import { fade, scale, fly } from 'svelte/transition';
    import { enhance } from '$app/forms';

	let { data } = $props();
    let isModalOpen = $state(false);
    let editingScript = $state<any>(null);
    let selectedCategory = $state('Utility');

    function openModal(script: any = null) {
        editingScript = script;
        selectedCategory = script?.category || 'Utility';
        // If the category is not in the list, set to 'Other'
        const baseCategories = ['Blade Ball', 'Blox Fruits', 'Pet Simulator 99', 'Murder Mystery 2', 'Utility', 'Combat', 'Farming', 'Auto-Farm', 'Anime', 'Simulator', 'Universal'];
        if (script && typeof script === 'object' && 'category' in script && !baseCategories.includes(script.category)) {
            selectedCategory = 'Other';
        }
        isModalOpen = true;
    }

    function closeModal() {
        editingScript = null;
        isModalOpen = false;
    }
</script>

<div class="space-y-10 py-10" in:fade>
	<!-- Admin Header -->
	<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
		<div class="space-y-4">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[9px] font-black uppercase tracking-widest text-orange-500 italic shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                <ShieldAlert class="h-3 w-3" />
                ADMINISTRATIVE HUB // SECURE ACCESS
            </div>
            <h1 class="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
				SCRIPT <span class="text-orange-500">CONTROL.</span>
			</h1>
			<p class="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
				Manage global script distribution nodes and client policies.
			</p>
		</div>
        <Button 
            onclick={() => openModal()}
            class="h-16 px-10 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-orange-900/40"
        >
            <Plus class="h-4 w-4 mr-2" />
            NEW PROTOCOL
        </Button>
	</div>

	<!-- Admin Info Card -->
    <div class="grid gap-6 md:grid-cols-2">
        <div class="p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-3xl flex items-center gap-6">
            <div class="h-16 w-16 rounded-[1.5rem] bg-orange-600/10 flex items-center justify-center text-orange-500 border border-orange-500/10">
                <Database class="h-8 w-8" />
            </div>
            <div>
                <h4 class="text-sm font-black italic text-white uppercase tracking-tight">GLOBAL REPOSITORY</h4>
                <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Total Active Scripts: {data.scripts?.length || 0}</p>
            </div>
        </div>
        <div class="p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-3xl flex items-center gap-6">
            <div class="h-16 w-16 rounded-[1.5rem] bg-cyan-600/10 flex items-center justify-center text-cyan-500 border border-cyan-500/10">
                <Zap class="h-8 w-8" />
            </div>
            <div>
                <h4 class="text-sm font-black italic text-white uppercase tracking-tight">NODE HEALTH</h4>
                <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Status: Operational / Undetected</p>
            </div>
        </div>
    </div>

    <!-- Scripts Table -->
	<Card.Root class="border-white/5 bg-[#080808]/40 backdrop-blur-3xl rounded-[3rem] overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr class="border-b border-white/5 bg-white/[0.02]">
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Title</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Category</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Version</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Last Sync</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 text-right">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5">
					{#each (data.scripts || []) as script}
						<tr class="group hover:bg-white/[0.01] transition-colors">
							<td class="p-8">
                                <div class="flex items-center gap-4">
                                    <div class="h-12 w-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center italic font-black text-xs text-orange-500">
                                        {script.title?.charAt(0) || 'S'}
                                    </div>
                                    <span class="text-sm font-black text-white uppercase tracking-widest">{script.title}</span>
                                </div>
                            </td>
							<td class="p-8">
                                <span class="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                                    {script.category}
                                </span>
                            </td>
							<td class="p-8 text-xs font-mono text-zinc-400">V{script.version}</td>
							<td class="p-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest whitespace-nowrap">
                                {new Date(script.updatedAt).toLocaleDateString()}
                            </td>
							<td class="p-8 text-right">
								<div class="flex items-center justify-end gap-3 translate-x-2 opacity-40 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
									<button 
                                        onclick={() => openModal(script)}
                                        class="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-all shadow-xl"
                                    >
										<Edit3 class="h-4 w-4" />
									</button>
                                    <form use:enhance action="?/delete" method="POST">
                                        <input type="hidden" name="id" value={script.id} />
                                        <button 
                                            class="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                                        >
                                            <Trash2 class="h-4 w-4" />
                                        </button>
                                    </form>
								</div>
							</td>
						</tr>
					{/each}
                    {#if !data.scripts?.length}
                        <tr><td colspan="5" class="p-20 text-center text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em]">No data available in node repository.</td></tr>
                    {/if}
				</tbody>
			</table>
		</div>
	</Card.Root>
</div>

<!-- Modal: Script Editor -->
{#if isModalOpen}
    <div class="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md" transition:fade>
        <button 
            type="button"
            class="absolute inset-0 w-full h-full bg-transparent border-none outline-hidden cursor-default" 
            onclick={closeModal}
            aria-label="Close modal"
        ></button>
        
        <div class="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden" in:scale={{ start: 0.95 }}>
            <form action="?/upsert" method="POST" use:enhance={() => {
                return async ({ result }) => {
                    if (result.type === 'success') closeModal();
                };
            }}>
                <input type="hidden" name="id" value={editingScript?.id || ''} />
                
                <header class="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <div class="flex items-center gap-4">
                        <div class="h-12 w-12 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-500 border border-orange-500/10">
                            <Sparkles class="h-6 w-6" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-black italic text-white uppercase tracking-tighter">
                                {editingScript ? 'EDIT PROTOCOL' : 'NEW PROTOCOL'}
                            </h3>
                            <p class="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Identity validation successful // Secure node link established</p>
                        </div>
                    </div>
                    <button type="button" onclick={closeModal} class="h-12 w-12 rounded-2xl bg-white/5 text-zinc-500 hover:text-white transition-colors flex items-center justify-center">
                        <X class="h-5 w-5" />
                    </button>
                </header>

                <div class="p-10 grid gap-10 md:grid-cols-2 bg-black/40">
                    <!-- Left: Metadata -->
                    <div class="space-y-8">
                        <div class="space-y-6">
                            <div class="space-y-2">
                                <label for="title" class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 pl-2">Script Title</label>
                                <input id="title" name="title" value={editingScript?.title || ''} required placeholder="e.g. SOLARA STEALTH HUB" class="w-full h-14 rounded-2xl bg-white/5 border border-white/5 px-6 text-sm font-bold text-white placeholder:text-zinc-800 focus:border-orange-500/50 transition-all outline-hidden" />
                            </div>
                            <div class="grid grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                    <label for="category" class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 pl-2">Category</label>
                                    <select id="category" name="category" bind:value={selectedCategory} class="w-full h-14 rounded-2xl bg-white/5 border border-white/5 px-6 text-xs font-bold text-white focus:border-orange-500/50 transition-all outline-hidden appearance-none">
                                        <option value="Blade Ball">Blade Ball</option>
                                        <option value="Blox Fruits">Blox Fruits</option>
                                        <option value="Pet Simulator 99">Pet Simulator 99</option>
                                        <option value="Murder Mystery 2">Murder Mystery 2</option>
                                        <option value="Utility">Utility</option>
                                        <option value="Combat">Combat</option>
                                        <option value="Farming">Farming</option>
                                        <option value="Auto-Farm">Auto-Farm</option>
                                        <option value="Anime">Anime</option>
                                        <option value="Simulator">Simulator</option>
                                        <option value="Universal">Universal</option>
                                        <option value="Other">Custom Category...</option>
                                    </select>
                                </div>
                                {#if selectedCategory === 'Other'}
                                    <div class="space-y-2" in:fade>
                                        <label for="custom_category" class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 pl-2">Enter Custom Category</label>
                                        <input id="custom_category" name="custom_category" placeholder="E.G. HORROR" class="w-full h-14 rounded-2xl bg-white/5 border border-white/5 px-6 text-xs font-bold text-white focus:border-orange-500/50 transition-all outline-hidden" />
                                    </div>
                                {/if}
                                <div class="space-y-2">
                                    <label for="version" class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 pl-2">Version</label>
                                    <input id="version" name="version" value={editingScript?.version || '1.0.0'} placeholder="1.0.0" class="w-full h-14 rounded-2xl bg-white/5 border border-white/5 px-6 text-sm font-bold text-white placeholder:text-zinc-800 focus:border-orange-500/50 transition-all outline-hidden text-center" />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label for="description" class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 pl-2">System Description</label>
                                <textarea id="description" name="description" value={editingScript?.description || ''} placeholder="Describe the script details..." class="w-full h-32 rounded-2xl bg-white/5 border border-white/5 p-6 text-sm font-bold text-zinc-300 placeholder:text-zinc-800 focus:border-orange-500/50 transition-all outline-hidden resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Code Area -->
                    <div class="space-y-2 relative">
                        <label for="code" class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 pl-2 flex items-center gap-2">
                            <Code2 class="h-3 w-3 text-orange-500" />
                            PROTOCOL SOURCE CODE
                        </label>
                        <div class="relative bg-[#050505] rounded-3xl border border-white/5 overflow-hidden h-full min-h-[300px]">
                            <textarea id="code" name="code" value={editingScript?.code || ''} required placeholder="loadstring(game:HttpGet('...'))()" class="w-full h-full p-8 text-xs font-mono text-cyan-500 placeholder:text-zinc-900 bg-transparent outline-hidden resize-none"></textarea>
                        </div>
                    </div>
                </div>

                <div class="p-10 bg-white/[0.01] border-t border-white/5 flex items-center justify-end gap-6">
                    <button type="button" onclick={closeModal} class="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 hover:text-white transition-colors">Abort Cycle</button>
                    <Button type="submit" class="h-16 px-14 rounded-2xl bg-white text-black hover:bg-zinc-200 text-[11px] font-black uppercase tracking-[0.3em] shadow-xl">
                        <Save class="h-4 w-4 mr-2" />
                        SYNC TO REPOSITORY
                    </Button>
                </div>
            </form>
        </div>
    </div>
{/if}
