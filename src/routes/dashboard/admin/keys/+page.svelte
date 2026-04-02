<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { 
		Key, 
		ShieldCheck, 
		ShieldAlert, 
		Search, 
		LogOut, 
		RefreshCw,
        Trash2,
        User,
        Fingerprint,
        Calendar,
        CheckCircle2,
        AlertTriangle,
        Activity,
        Ban,
        MoreVertical,
        ChevronRight
	} from '@lucide/svelte';
	import { fade, fly, scale } from 'svelte/transition';
    import { enhance } from '$app/forms';

	let { data } = $props();
    let searchQuery = $state("");
    let statusFilter = $state("all");

    // Derived filtering logic
    const filteredKeys = $derived((data.allKeys || []).filter((k: any) => {
        const matchesSearch = k.code?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             k.owner.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             k.owner.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || k.status === statusFilter;
        return matchesSearch && matchesStatus;
    }));

    const statusColors: any = {
        active: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        revoked: 'text-red-500 bg-red-500/10 border-red-500/20',
        expired: 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20'
    };
</script>

<div class="space-y-10 py-10" in:fade>
	<!-- Global Key Control Header -->
	<div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
		<div class="space-y-4">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-black uppercase tracking-widest text-cyan-500 italic shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <ShieldCheck class="h-3 w-3" />
                GLOBAL SECURE PROTOCOL // KEY HUB
            </div>
            <h1 class="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
				KEY <span class="text-cyan-500">CONTROL.</span>
			</h1>
			<p class="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
				Monitor all system-wide identity nodes and validation codes.
			</p>
		</div>
        
        <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div class="relative group w-full md:w-80">
                <Search class="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
                <input 
                    type="text" 
                    bind:value={searchQuery}
                    placeholder="SEARCH PROTOCOL CODES..."
                    class="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-8 text-[11px] font-black uppercase tracking-widest text-white focus:outline-hidden focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all"
                />
            </div>
            
            <select 
                bind:value={statusFilter}
                class="h-16 px-6 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 outline-hidden focus:border-cyan-500/40 transition-all appearance-none cursor-pointer hover:bg-white/[0.08]"
            >
                <option value="all">ALL NODES</option>
                <option value="active">ACTIVE</option>
                <option value="revoked">REVOKED</option>
                <option value="expired">EXPIRED</option>
            </select>
        </div>
	</div>

	<!-- Statistics Summary -->
    <div class="grid gap-6 md:grid-cols-4">
        {#each [
            { label: 'GLOBAL KEYS', value: (data.allKeys || []).length, color: 'text-white' },
            { label: 'ACTIVE PROTOCOLS', value: (data.allKeys || []).filter((k: any) => k.status === 'active').length, color: 'text-emerald-500' },
            { label: 'REVOKED NODES', value: (data.allKeys || []).filter((k: any) => k.status === 'revoked').length, color: 'text-red-500' },
            { label: 'TOTAL HWID BOUND', value: (data.allKeys || []).filter((k: any) => k.hwid).length, color: 'text-cyan-500' }
        ] as stat}
            <div class="p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-3xl">
                <h4 class="text-[9px] font-black tracking-widest text-zinc-700 uppercase mb-2">{stat.label}</h4>
                <p class="text-3xl font-black italic tracking-tighter uppercase {stat.color}">{stat.value}</p>
            </div>
        {/each}
    </div>

    <!-- Keys Global Table -->
	<Card.Root class="border-white/5 bg-[#080808]/40 backdrop-blur-3xl rounded-[3rem] overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr class="border-b border-white/5 bg-white/[0.02]">
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Security Code</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Identity Link</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 text-center">Status Hub</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">HWID Bind</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 text-right">System Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5">
					{#each filteredKeys as key}
						<tr class="group hover:bg-white/[0.01] transition-colors overflow-hidden">
							<td class="p-8">
                                <div class="flex items-center gap-4">
                                    <div class="h-12 w-12 rounded-xl bg-cyan-600/5 border border-white/5 flex items-center justify-center text-cyan-500 shadow-xl">
                                        <Key class="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span class="block text-[13px] font-black text-white italic tracking-widest uppercase">{key.code}</span>
                                        <span class="block text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em] mt-1">{key.type} PROTOCOL</span>
                                    </div>
                                </div>
                            </td>
							<td class="p-8">
                                <div class="flex items-center gap-4 group/user cursor-pointer">
                                    <div class="h-10 w-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[10px] font-black text-zinc-600 overflow-hidden">
                                        {#if key.owner.image}
                                            <img src={key.owner.image} alt={key.owner.name} class="h-full w-full object-cover" />
                                        {:else}
                                            {key.owner.name?.charAt(0) || '?'}
                                        {/if}
                                    </div>
                                    <div>
                                        <span class="block text-[11px] font-black text-white uppercase tracking-wider">{key.owner.name}</span>
                                        <span class="block text-[9px] font-bold text-zinc-700 uppercase tracking-tighter">{key.owner.email}</span>
                                    </div>
                                </div>
                            </td>
							<td class="p-8 text-center">
                                <span class="px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest {statusColors[key.status]}">
                                    {key.status}
                                </span>
                            </td>
							<td class="p-8">
                                <div class="flex items-center gap-3">
                                    <Fingerprint class="h-4 w-4 {key.hwid ? 'text-zinc-500' : 'text-zinc-900'}" />
                                    <span class="text-[9px] font-mono font-bold {key.hwid ? 'text-zinc-500' : 'text-zinc-900 italic'} truncate max-w-[120px]">
                                        {key.hwid || 'NOT_SYNCED'}
                                    </span>
                                </div>
                            </td>
							<td class="p-8 text-right">
								<div class="flex items-center justify-end gap-3 translate-x-2 opacity-40 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                    {#if key.status === 'active'}
                                        <form use:enhance action="?/revokeKey" method="POST">
                                            <input type="hidden" name="id" value={key.id} />
                                            <button 
                                                class="h-10 px-4 flex items-center gap-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl text-[9px] font-black uppercase tracking-widest border border-red-500/10"
                                            >
                                                <Ban class="h-3 w-3" />
                                                REVOKE
                                            </button>
                                        </form>
                                    {:else}
                                        <form use:enhance action="?/activateKey" method="POST">
                                            <input type="hidden" name="id" value={key.id} />
                                            <button 
                                                class="h-10 px-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-xl text-[9px] font-black uppercase tracking-widest border border-emerald-500/10"
                                            >
                                                <RefreshCw class="h-3 w-3" />
                                                RESTORE
                                            </button>
                                        </form>
                                    {/if}
                                    
                                    <form use:enhance action="?/deleteKey" method="POST">
                                        <input type="hidden" name="id" value={key.id} />
                                        <button 
                                            class="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-zinc-700 hover:text-red-500 transition-all shadow-xl border border-white/5"
                                            onclick={(e) => {
                                                if (!confirm(`Identity dissociation warning: Are you sure you want to permanently delete this key protocol?`)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <Trash2 class="h-4 w-4" />
                                        </button>
                                    </form>
								</div>
							</td>
						</tr>
					{/each}
                    {#if !filteredKeys.length}
                        <tr><td colspan="5" class="p-20 text-center text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em]">No validated key protocols found in global buffer.</td></tr>
                    {/if}
				</tbody>
			</table>
		</div>
	</Card.Root>
</div>
