<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { 
		Plus, 
		Edit3, 
		Trash2, 
		User, 
		Shield, 
        Crown,
        ShieldAlert,
        Code2,
        X,
        Save,
        Calendar,
        Search,
        Mail,
        Cpu
	} from '@lucide/svelte';
	import { fade, scale, fly } from 'svelte/transition';
    import { enhance } from '$app/forms';

	let { data } = $props();
    let isModalOpen = $state(false);
    let editingUser = $state<any>(null);
    let searchQuery = $state("");

    const filteredUsers = $derived((data.users || []).filter((u: any) => 
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    ));

    function openModal(user = null) {
        editingUser = user;
        isModalOpen = true;
    }

    function closeModal() {
        editingUser = null;
        isModalOpen = false;
    }
</script>

<div class="space-y-10 py-10" in:fade>
	<!-- User Management Header -->
	<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
		<div class="space-y-4">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[9px] font-black uppercase tracking-widest text-orange-500 italic shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                <ShieldAlert class="h-3 w-3" />
                IDENTITY PROTOCOLS // SECURE ACCESS
            </div>
            <h1 class="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
				USER <span class="text-orange-500">MANAGEMENT.</span>
			</h1>
			<p class="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
				Monitor identity nodes and manage authorization tiers.
			</p>
		</div>
        <div class="relative group max-w-sm w-full md:w-80">
            <Search class="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
            <input 
                type="text" 
                bind:value={searchQuery}
                placeholder="SEARCH IDENTITIES..."
                class="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-8 text-[11px] font-black uppercase tracking-widest text-white focus:outline-hidden focus:border-orange-500/40 focus:bg-white/[0.08] transition-all"
            />
        </div>
	</div>

	<!-- Stats Grid -->
    <div class="grid gap-6 md:grid-cols-3">
        <div class="p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-3xl flex items-center gap-6">
            <div class="h-16 w-16 rounded-[1.5rem] bg-orange-600/10 flex items-center justify-center text-orange-500 border border-orange-500/10">
                <User class="h-8 w-8" />
            </div>
            <div>
                <h4 class="text-sm font-black italic text-white uppercase tracking-tight">TOTAL NODES</h4>
                <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{filteredUsers.length} Active Users</p>
            </div>
        </div>
        <div class="p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-3xl flex items-center gap-6">
            <div class="h-16 w-16 rounded-[1.5rem] bg-cyan-600/10 flex items-center justify-center text-cyan-500 border border-cyan-500/10">
                <Shield class="h-8 w-8" />
            </div>
            <div>
                <h4 class="text-sm font-black italic text-white uppercase tracking-tight">ADMIN NODES</h4>
                <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{(data.users || []).filter((u: any) => u.role === 'admin').length} Authorized</p>
            </div>
        </div>
        <div class="p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-3xl flex items-center gap-6">
            <div class="h-16 w-16 rounded-[1.5rem] bg-purple-600/10 flex items-center justify-center text-purple-500 border border-purple-500/10">
                <Crown class="h-8 w-8" />
            </div>
            <div>
                <h4 class="text-sm font-black italic text-white uppercase tracking-tight">PREMIUM NODES</h4>
                <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{(data.users || []).filter((u: any) => u.plan !== 'free').length} Secured</p>
            </div>
        </div>
    </div>

    <!-- Users Table -->
	<Card.Root class="border-white/5 bg-[#080808]/40 backdrop-blur-3xl rounded-[3rem] overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr class="border-b border-white/5 bg-white/[0.02]">
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Identity</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Authorization (Role)</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Tier (Plan)</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Registration Cycle</th>
						<th class="p-8 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 text-right">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5">
					{#each filteredUsers as user}
						<tr class="group hover:bg-white/[0.01] transition-colors">
							<td class="p-8">
                                <div class="flex items-center gap-4">
                                    <div class="h-12 w-12 rounded-xl bg-orange-600/5 border border-white/5 flex items-center justify-center italic font-black text-xs text-orange-500 overflow-hidden">
                                        {#if user.image}
                                            <img src={user.image} alt={user.name} class="h-full w-full object-cover" />
                                        {:else}
                                            {user.name?.charAt(0) || '?'}
                                        {/if}
                                    </div>
                                    <div>
                                        <span class="block text-sm font-black text-white uppercase tracking-widest">{user.name}</span>
                                        <span class="block text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]">{user.email}</span>
                                    </div>
                                </div>
                            </td>
							<td class="p-8">
                                <span class="px-3 py-1 rounded-full {user.role === 'admin' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-white/5 text-zinc-500 border-white/5'} border text-[9px] font-black uppercase tracking-widest">
                                    {user.role}
                                </span>
                            </td>
							<td class="p-8">
                                <span class="px-3 py-1 rounded-full {user.plan !== 'free' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' : 'bg-zinc-900/40 text-zinc-700 border-white/5'} border text-[9px] font-black uppercase tracking-widest">
                                    {user.plan}
                                </span>
                            </td>
							<td class="p-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest whitespace-nowrap">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
							<td class="p-8 text-right">
								<div class="flex items-center justify-end gap-3 translate-x-2 opacity-40 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
									<button 
                                        onclick={() => openModal(user)}
                                        class="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-all shadow-xl"
                                    >
										<Edit3 class="h-4 w-4" />
									</button>
                                    <form use:enhance action="?/deleteUser" method="POST">
                                        <input type="hidden" name="id" value={user.id} />
                                        <button 
                                            class="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                                            onclick={(e) => {
                                                if (!confirm(`Warning: Identity node suppression in terminal. Are you sure you want to delete ${user.name}? This action cannot be reversed.`)) {
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
                    {#if !filteredUsers.length}
                        <tr><td colspan="5" class="p-20 text-center text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em]">No identity nodes found in database.</td></tr>
                    {/if}
				</tbody>
			</table>
		</div>
	</Card.Root>
</div>

<!-- Modal: User Editor -->
{#if isModalOpen}
    <div class="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md" transition:fade>
        <button 
            type="button"
            class="absolute inset-0 w-full h-full bg-transparent border-none outline-hidden cursor-default" 
            onclick={closeModal}
            aria-label="Close modal"
        ></button>
        
        <div class="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden" in:scale={{ start: 0.95 }}>
            <form action="?/updateUser" method="POST" use:enhance={() => {
                return async ({ result }) => {
                    if (result.type === 'success') closeModal();
                };
            }}>
                <input type="hidden" name="id" value={editingUser?.id || ''} />
                
                <header class="p-10 border-b border-white/5 flex items-center justify-between bg-zinc-900/[0.02]">
                    <div class="flex items-center gap-4">
                        <div class="h-12 w-12 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-500 border border-orange-500/10">
                            <Cpu class="h-6 w-6" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-black italic text-white uppercase tracking-tighter">
                                EDIT IDENTITY NODE
                            </h3>
                            <p class="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Identity validation successful // Secure link established</p>
                        </div>
                    </div>
                    <button type="button" onclick={closeModal} class="h-12 w-12 rounded-2xl bg-white/5 text-zinc-500 hover:text-white transition-colors flex items-center justify-center">
                        <X class="h-5 w-5" />
                    </button>
                </header>

                <div class="p-10 space-y-10 bg-black/40">
                    <div class="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/5">
                         <div class="h-16 w-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-2xl italic font-black text-orange-500">
                            {editingUser?.name?.charAt(0) || '?'}
                         </div>
                         <div>
                            <h4 class="text-xl font-black text-white italic uppercase tracking-tighter">{editingUser?.name || 'Unknown'}</h4>
                            <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{editingUser?.email}</p>
                         </div>
                    </div>

                    <div class="grid grid-cols-2 gap-10 text-white">
                        <div class="space-y-4">
                            <label for="role" class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 pl-2 flex items-center gap-2">
                                <Shield class="h-3 w-3 text-orange-500" />
                                AUTHORIZATION LEVEL
                            </label>
                            <select id="role" name="role" value={editingUser?.role || 'user'} class="w-full h-14 rounded-2xl bg-white/5 border border-white/5 px-6 text-xs font-bold text-white focus:border-orange-500/50 transition-all outline-hidden appearance-none">
                                <option value="user">USER NODE</option>
                                <option value="admin">ADMIN LEVEL</option>
                            </select>
                        </div>
                        <div class="space-y-4">
                            <label for="plan" class="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 pl-2 flex items-center gap-2">
                                <Crown class="h-3 w-3 text-cyan-500" />
                                ACCESS TIER
                            </label>
                            <select id="plan" name="plan" value={editingUser?.plan || 'free'} class="w-full h-14 rounded-2xl bg-white/5 border border-white/5 px-6 text-xs font-bold text-white focus:border-orange-500/50 transition-all outline-hidden appearance-none">
                                <option value="free">FREE ACCESS</option>
                                <option value="premium">PREMIUM TIER</option>
                                <option value="founder">FOUNDER TIER</option>
                            </select>
                        </div>
                    </div>
                    
                    <p class="text-[8px] font-black uppercase text-zinc-800 text-center tracking-[0.5em] pt-4">IDENTITY RECALIBRATION REQUIRED // CAUSE AT YOUR OWN RISK</p>
                </div>

                <div class="p-10 bg-white/[0.01] border-t border-white/5 flex items-center justify-end gap-6">
                    <button type="button" onclick={closeModal} class="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 hover:text-white transition-colors">Abort Cycle</button>
                    <Button type="submit" class="h-16 px-14 rounded-2xl bg-white text-black hover:bg-zinc-200 text-[11px] font-black uppercase tracking-[0.3em] shadow-xl">
                        <Save class="h-4 w-4 mr-2" />
                        SYNC CHANGES
                    </Button>
                </div>
            </form>
        </div>
    </div>
{/if}
