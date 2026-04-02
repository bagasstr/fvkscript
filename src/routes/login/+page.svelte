<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import {
		Mail,
		Lock,
		User,
		Eye,
		EyeOff,
		ShieldCheck,
		ArrowRight,
		X,
		Sparkles,
		Key,
		Crown,
		Activity,
		RefreshCcw
	} from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/state';

	// Force all plans to 'free' as payment gateway is not integrated yet
	let plan = 'free';
	let mode = $derived(page.url.searchParams.get('mode'));

	let isSignUp = $state(false);

	$effect(() => {
		if (mode === 'signup') isSignUp = true;
	});
	let email = $state('');
	let password = $state('');
	let name = $state('');
	let loading = $state(false);
	let showPassword = $state(false);
	let errorMessage = $state('');

	function getReadableError(error: any, isRegister: boolean): string {
		const status = error?.status;
		const code = error?.code;
		const msg = (error?.message || '').toLowerCase();

		if (status === 409 || code === 'USER_ALREADY_EXISTS' || msg.includes('already')) {
			return 'Email already registered. Please login instead.';
		}
		if (status === 422 || code === 'VALIDATION_ERROR' || msg.includes('valid')) {
			return 'Invalid input. Check your email and password format.';
		}
		if (status === 400) {
			if (msg.includes('password')) return 'Password must be at least 8 characters.';
			return 'Invalid request. Please check your input.';
		}
		if (status === 401 || code === 'INVALID_CREDENTIALS') {
			return 'Wrong email or password. Try again.';
		}
		if (status === 429) {
			return 'Too many attempts. Please wait a moment.';
		}
		if (error?.message) return error.message;
		return isRegister ? 'Registration failed. Try again.' : 'Login failed. Try again.';
	}

	async function handleAuth() {
		loading = true;
		errorMessage = '';

		try {
			if (isSignUp) {
				const { error, data } = await authClient.signUp.email({
					email,
					password,
					name
				});
				if (error) {
					errorMessage = getReadableError(error, true);
					loading = false;
					return;
				}
				// Redirect manual untuk memastikan parameter init_plan tidak hilang
				window.location.href = `/dashboard?init_plan=${plan}`;
			} else {
				const { error } = await authClient.signIn.email({
					email,
					password
				});
				if (error) {
					errorMessage = getReadableError(error, false);
					loading = false;
					return;
				}
				window.location.href = '/dashboard';
			}
		} catch (e) {
			errorMessage = 'A connection error occurred.';
			loading = false;
		}
	}

	const planData: Record<string, { label: string; color: string; icon: any }> = {
		free: {
			label: 'FREE ACCESS',
			color: 'text-zinc-500 border-zinc-500/20 bg-zinc-500/5',
			icon: Key
		}
	};
</script>

<div
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] p-6"
	in:fade
>
	<!-- Background FX -->
	<div class="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[128px]"></div>
	<div
		class="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-600/5 blur-[128px]"
	></div>

	<Card.Root
		class="relative z-10 w-full max-w-lg overflow-hidden rounded-[3rem] border-white/5 bg-[#080808]/80 p-1 shadow-2xl backdrop-blur-2xl"
	>
		<div class="space-y-12 p-10 sm:p-14">
			<!-- Header -->
			<div class="space-y-4 text-center">
				<div
					class="mx-auto flex h-20 w-20 -rotate-6 transform items-center justify-center rounded-3xl bg-linear-to-br from-cyan-600 to-blue-700 shadow-2xl shadow-cyan-900/40 transition-transform hover:rotate-0"
				>
					<ShieldCheck class="h-10 w-10 text-white" />
				</div>
				<h1 class="mt-8 text-4xl font-black tracking-tighter text-white uppercase italic">
					FVKHUB <span class="text-cyan-500">PORTAL.</span>
				</h1>
				<p class="text-[10px] font-black tracking-[0.4em] text-zinc-600 uppercase">
					{isSignUp ? 'Initialize New Account' : 'Authorize Existing Session'}
				</p>
			</div>

			<!-- Error Message -->
			{#if errorMessage}
				<div
					class="flex items-center gap-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-[10px] font-black tracking-widest text-red-500 uppercase"
					in:fly={{ y: -10 }}
				>
					<X class="h-4 w-4" />
					{errorMessage}
				</div>
			{/if}

			<!-- Form -->
			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleAuth();
				}}
				class="space-y-6"
			>
				{#if isSignUp}
					<div class="space-y-2" in:fly={{ y: 20 }}>
						<label
							class="ml-6 text-[9px] font-black tracking-[0.3em] text-zinc-500 uppercase"
							for="name">Account Name</label
						>
						<div class="group relative">
							<User
								class="absolute top-1/2 left-6 h-4 w-4 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-cyan-500"
							/>
							<input
								id="name"
								bind:value={name}
								type="text"
								required
								placeholder="CLOUX GHOST"
								class="h-16 w-full rounded-2xl border border-white/5 bg-white/5 pr-6 pl-16 text-[11px] font-black tracking-widest text-white uppercase transition-all focus:border-cyan-500/40 focus:bg-white/[0.08] focus:outline-hidden"
							/>
						</div>
					</div>

					<!-- SELECTED PLAN INDICATOR -->
					<div class="space-y-2" in:fly={{ y: 10 }}>
						<label
							class="ml-6 text-[9px] font-black tracking-[0.3em] text-zinc-500 uppercase"
							for="plan">Selected Subscription</label
						>
						<div
							class="relative flex h-16 items-center rounded-2xl border border-white/5 px-6 {planData[
								plan
							]?.color || planData.free.color}"
						>
							{#if planData[plan]}
								{@const Icon = planData[plan].icon}
								<Icon class="mr-4 h-4 w-4 shrink-0" />
								<span class="text-[11px] font-black tracking-[0.2em] uppercase"
									>{planData[plan].label} SELECTED</span
								>
							{:else}
								<Key class="mr-4 h-4 w-4 shrink-0" />
								<span class="text-[11px] font-black tracking-[0.2em] uppercase"
									>FREE ACCESS SELECTED</span
								>
							{/if}
						</div>
					</div>
				{/if}

				<div class="space-y-2">
					<label
						class="ml-6 text-[9px] font-black tracking-[0.3em] text-zinc-500 uppercase"
						for="email">Secure Address</label
					>
					<div class="group relative">
						<Mail
							class="absolute top-1/2 left-6 h-4 w-4 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-cyan-500"
						/>
						<input
							id="email"
							bind:value={email}
							type="email"
							required
							placeholder="GHOST@FVKHUB.NET"
							class="h-16 w-full rounded-2xl border border-white/5 bg-white/5 pr-6 pl-16 text-[11px] font-black tracking-widest text-white uppercase transition-all focus:border-cyan-500/40 focus:bg-white/[0.08] focus:outline-hidden"
						/>
					</div>
				</div>

				<div class="space-y-2">
					<label
						class="ml-6 text-[9px] font-black tracking-[0.3em] text-zinc-500 uppercase"
						for="password">Encryption Key</label
					>
					<div class="group relative">
						<Lock
							class="absolute top-1/2 left-6 h-4 w-4 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-cyan-500"
						/>
						<input
							id="password"
							bind:value={password}
							type={showPassword ? 'text' : 'password'}
							required
							placeholder="*************"
							class="h-16 w-full rounded-2xl border border-white/5 bg-white/5 pr-14 pl-16 text-[11px] font-black tracking-widest text-white uppercase transition-all focus:border-cyan-500/40 focus:bg-white/[0.08] focus:outline-hidden"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute top-1/2 right-6 -translate-y-1/2 text-zinc-600 transition-colors hover:text-white"
						>
							{#if showPassword}<EyeOff class="h-4 w-4" />{:else}<Eye class="h-4 w-4" />{/if}
						</button>
					</div>
				</div>

				<Button
					type="submit"
					disabled={loading}
					class="group h-16 w-full rounded-2xl bg-white text-[11px] font-black tracking-[0.4em] text-black uppercase shadow-xl transition-all hover:bg-zinc-200 active:scale-95 disabled:bg-zinc-800/20 disabled:text-zinc-600"
				>
					{#if loading}
						<RefreshCcw class="mr-2 h-4 w-4 animate-spin" />
						CRYPTO-SYNCING...
					{:else}
						{isSignUp ? 'AUTHORIZE NEW ACCOUNT' : 'LINK SESSION'}
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					{/if}
				</Button>

				{#if loading}
					<div class="space-y-4 pt-4" in:fade>
						<div class="h-1 w-full overflow-hidden rounded-full bg-white/5">
							<div class="h-full animate-[loading_2s_infinite] bg-cyan-600"></div>
						</div>
						<p
							class="animate-pulse text-center text-[8px] font-black tracking-[0.3em] text-cyan-500 uppercase"
						>
							{isSignUp
								? 'Finalizing Identity Node & Policy Sync...'
								: 'Validating Session Encryption...'}
						</p>
					</div>
				{/if}
			</form>

			<div class="pt-6 text-center">
				<button
					type="button"
					onclick={() => (isSignUp = !isSignUp)}
					class="border-b border-transparent pb-1 text-[10px] font-black tracking-widest text-zinc-500 uppercase transition-all hover:border-cyan-500/30 hover:text-cyan-500"
				>
					{isSignUp ? 'ALREADY AUTHORIZED? UNLOCK SESSION' : 'NEW PROTOCOL? INITIALIZE NODE'}
				</button>
			</div>
		</div>
	</Card.Root>
</div>
