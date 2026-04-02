<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { 
		LayoutDashboard, 
		Key, 
		Code, 
		Settings, 
		LogOut, 
		Terminal,
		Crown,
		HelpCircle,
		Menu,
		Bell,
        ChevronRight,
        X,
        Database,
        ShieldAlert,
        User,
        ShieldCheck,
        TrendingUp
	} from '@lucide/svelte';
	import { page } from '$app/state';
	import { fade, fly } from 'svelte/transition';

	import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
    import { navigating } from '$app/state';

	let { data, children } = $props();
    let isMobileSidebarOpen = $state(false);

    const user = $derived(data.user || data.session?.user);

    async function handleLogout() {
        console.log("Logging out protocol...");
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = '/';
                }
            }
        });
    }

    // Dynamic menu items detection
    const menuItems = $derived([
        { name: 'Overview', icon: LayoutDashboard, href: '/dashboard', active: page.url.pathname === '/dashboard' },
        { name: 'My Keys', icon: Key, href: '/dashboard/keys', active: page.url.pathname === '/dashboard/keys' },
        { name: 'Scripts', icon: Code, href: '/dashboard/scripts', active: page.url.pathname === '/dashboard/scripts' },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings', active: page.url.pathname === '/dashboard/settings' },
        ...(user?.role === 'admin' ? [
            { separator: true },
            { name: 'Analytics Hub', icon: TrendingUp, href: '/dashboard/admin/analytics', admin: true, active: page.url.pathname === '/dashboard/admin/analytics' },
            { name: 'Key Management', icon: ShieldCheck, href: '/dashboard/admin/keys', admin: true, active: page.url.pathname === '/dashboard/admin/keys' },
            { name: 'Script Control', icon: Database, href: '/dashboard/admin/scripts', admin: true, active: page.url.pathname === '/dashboard/admin/scripts' },
            { name: 'User Management', icon: User, href: '/dashboard/admin/users', admin: true, active: page.url.pathname === '/dashboard/admin/users' },
        ] : [])
    ]);

    function toggleMobileSidebar() {
        isMobileSidebarOpen = !isMobileSidebarOpen;
    }
</script>

<div class="min-h-screen h-screen bg-[#050505] text-[#f0f0f0] font-sans selection:bg-cyan-500/30 flex overflow-hidden relative">
    
    <!-- Global Navigation Progress Bar -->
    {#if navigating}
        <div 
            class="fixed top-0 left-0 right-0 z-[1000] h-[2px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] overflow-hidden"
            in:fade={{ duration: 150 }}
            out:fade={{ duration: 300 }}
        >
            <div class="h-full w-full bg-linear-to-r from-transparent via-white/50 to-transparent animate-shimmer scale-x-[50] origin-left"></div>
        </div>
    {/if}
    <!-- Mobile Sidebar Overlay (Backdrop) -->
    {#if isMobileSidebarOpen}
        <button 
            type="button"
            class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm lg:hidden border-none cursor-default" 
            onclick={toggleMobileSidebar}
            aria-label="Close sidebar"
            transition:fade={{ duration: 200 }}
        ></button>

        <!-- Mobile Sidebar Panel -->
        <aside 
            class="fixed inset-y-0 left-0 z-[101] w-72 bg-[#080808] border-r border-white/5 lg:hidden flex flex-col shadow-2xl"
            transition:fly={{ x: -280, duration: 300 }}
        >
            <div class="p-8 flex-1">
                <div class="flex items-center justify-between mb-12">
                    <div class="flex items-center gap-3">
                        <div class="h-10 w-10 flex items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                            <Terminal class="h-5 w-5 text-white" />
                        </div>
                        <span class="text-xl font-black uppercase italic tracking-tighter text-white">FVKHUB</span>
                    </div>
                    <button onclick={toggleMobileSidebar} class="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-zinc-500">
                        <X class="h-5 w-5" />
                    </button>
                </div>

                <nav class="space-y-1">
                    {#each menuItems as item}
                        <a 
                            href={item.href}
                            class="flex items-center gap-4 px-4 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all
                            {item.active ? 'bg-cyan-600/10 text-cyan-400 border border-cyan-500/10' : 'text-zinc-600'}"
                            onclick={toggleMobileSidebar}
                        >
                            <item.icon class="h-4 w-4" />
                            {item.name}
                        </a>
                    {/each}
                </nav>
            </div>

            <div class="p-8 border-t border-white/5">
                <Button 
                    variant="ghost" 
                    onclick={handleLogout}
                    class="w-full justify-start gap-4 h-12 text-zinc-600 text-[11px] font-black uppercase tracking-widest hover:text-red-500 hover:bg-red-500/10"
                >
                    <LogOut class="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    {/if}

	<!-- Sidebar (Desktop) -->
	<aside class="hidden lg:flex flex-col w-72 border-r border-white/5 bg-black/40 backdrop-blur-3xl sticky top-0 h-full transition-all duration-500 shrink-0 overflow-hidden">
		<div class="p-8 flex-1 overflow-y-auto scrollbar-hide">
            <!-- Brand -->
			<div class="flex items-center gap-3 mb-16 px-2">
				<div class="relative group">
                    <div class="absolute -inset-2 bg-cyan-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        <Terminal class="h-5 w-5 text-white" />
                    </div>
                </div>
                <span class="text-xl font-black uppercase italic tracking-tighter text-white">FVK<span class="text-cyan-500 font-black">HUB</span></span>
			</div>

            <!-- Navigation -->
			<nav class="space-y-1.5">
                <div class="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-700 mb-6 px-4">Core Protocol</div>
				{#each menuItems as item}
					<a 
						href={item.href}
						class="group relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300
						{item.active ? 'text-white' : 'text-zinc-600 hover:text-zinc-300'}"
					>
                        {#if item.active}
                            <div class="absolute left-0 w-1 h-5 bg-cyan-500 rounded-full shadow-[0_0_12px_#06b6d4]"></div>
                            <div class="absolute inset-0 bg-linear-to-r from-cyan-600/10 to-transparent rounded-xl"></div>
                        {/if}
						<item.icon class="h-4 w-4 {item.active ? 'text-cyan-500' : 'text-zinc-700 group-hover:text-zinc-400'} transition-colors" />
						{item.name}
                        {#if item.active}
                            <ChevronRight class="ml-auto h-3 w-3 text-cyan-800" />
                        {/if}
					</a>
				{/each}
			</nav>

            <div class="mt-12 space-y-1.5">
                <div class="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-700 mb-6 px-4">Support Ops</div>
                <a href="/dashboard/support" class="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-all">
                    <HelpCircle class="h-4 w-4 text-zinc-700 group-hover:text-zinc-400" />
                    Support
                </a>
            </div>
		</div>

        <!-- User Section Bottom -->
		<div class="p-6 border-t border-white/5 bg-white/[0.01]">
			<div class="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all group">
                <div class="relative">
                    <div class="absolute -inset-1 bg-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="relative h-10 w-10 rounded-xl bg-cyan-600 flex items-center justify-center font-black italic text-white shadow-lg overflow-hidden border border-white/10 uppercase">
                        {#if user?.image}
                            <img src={user.image} alt={user.name} class="w-full h-full object-cover" />
                        {:else}
                            {user?.name?.charAt(0) || '?'}
                        {/if}
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="text-[12px] font-black uppercase italic text-white leading-none truncate tracking-tight">
                        {user?.name || 'GUEST PROTO'}
                    </div>
                    <div class="flex items-center gap-1.5 mt-1.5">
                        <div class="h-1.2 w-1.2 rounded-full {user?.plan === 'admin' ? 'bg-orange-500' : user?.plan === 'premium' ? 'bg-cyan-500' : user?.plan === 'founder' ? 'bg-purple-500' : 'bg-zinc-500'}"></div>
                        <span class="text-[9px] font-black uppercase tracking-widest {user?.plan === 'admin' ? 'text-orange-500' : user?.plan === 'premium' || user?.plan === 'founder' ? 'text-cyan-600' : 'text-zinc-600'}">
                            {user?.plan === 'founder' ? 'LIFETIME' : user?.plan?.toUpperCase() || 'FREE'} {user?.plan === 'admin' || user?.plan === 'founder' ? 'STATUS' : 'PLAN'}
                        </span>
                    </div>
                </div>
                <button 
                    onclick={handleLogout}
                    class="h-8 w-8 flex items-center justify-center rounded-lg text-zinc-700 hover:text-red-500 hover:bg-red-500/10 transition-all"
                >
                    <LogOut class="h-4 w-4" />
                </button>
            </div>
		</div>
	</aside>

	<!-- Main Content Area -->
	<div class="flex-1 h-full min-w-0 flex flex-col">
		<!-- Top Nav -->
		<header class="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 lg:px-12 flex-none">
            <button 
                class="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 active:scale-95 transition-all"
                onclick={toggleMobileSidebar}
            >
                <Menu class="h-5 w-5" />
            </button>
            <div class="hidden lg:block">
                <div class="flex items-center gap-3">
                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                    <h1 class="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Node Sync / <span class="text-white">Active Overview</span></h1>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button class="h-10 w-10 flex items-center justify-center rounded-xl border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:border-white/10 transition-all active:scale-95">
                    <Bell class="h-4 w-4" />
                </button>
                <div class="h-8 w-px bg-white/5 mx-2"></div>
                <Button variant="outline" size="sm" class="h-10 border-white/5 bg-white/5 px-6 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:bg-white hover:text-black">
                    Feedback
                </Button>
            </div>
		</header>

		<!-- Content Scroll Area -->
		<main class="flex-1 overflow-y-auto p-4 lg:p-12 pb-40">
			{@render children?.()}
		</main>
	</div>
</div>

<style>
    :global(body) {
        background-color: #050505;
    }
    
    :global(::-webkit-scrollbar) {
        width: 6px;
    }
    
    :global(::-webkit-scrollbar-track) {
        background: transparent;
    }
    
    :global(::-webkit-scrollbar-thumb) {
        background: #111;
        border-radius: 6px;
    }
    
    :global(::-webkit-scrollbar-thumb:hover) {
        background: #1a1a1a;
    }

    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
