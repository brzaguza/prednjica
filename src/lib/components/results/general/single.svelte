<script>
	import Logo from '$lib/assets/logo.svg';
	import { proxyFaviconLink } from '$lib/functions/api/proxyimage';

	/**
	 * @typedef {object} Props
	 * @property {WebResultType} result
	 */

	/** @type {Props} */
	let { result } = $props();

	const favicon = proxyFaviconLink(result.fqdn, result.fqdn_hash, result.fqdn_hash_timestamp);
	const shortDesc =
		result.description.length > 500 ? result.description.slice(0, 497) + '...' : result.description;

	let fullDesc = $state(false);
	function toggleDesc() {
		fullDesc = !fullDesc;
	}

	let currentDesc = $derived(fullDesc ? result.description : shortDesc);

	/** @param {Event} event */
	function handleFaviconError({ target }) {
		if (target && target instanceof HTMLImageElement) {
			target.onerror = null;
			target.src = Logo;
		}
	}
</script>

<article id="result-{result.rank}" class="pt-2 break-words">
	<a id="link-{result.rank}" href={result.url} rel="noreferrer">
		{result.url}
	</a>
	<a class="flex" href={result.url} rel="noreferrer">
		<h1
			id="title-{result.rank}"
			class="text-xl text-hearchco-primary dark:text-hearchco-secondary hover:underline"
		>
			<div
				class="max-5xs:hidden inline-block align-middle mb-0.5 mr-0.5 size-5 bg-neutral-100 dark:bg-neutral-700 rounded-md overflow-hidden"
			>
				<img
					onerror={handleFaviconError}
					class="p-[1px] size-full object-contain"
					src={favicon}
					alt="{result.title} favicon"
					loading="lazy"
				/>
			</div>
			{result.title}
		</h1>
	</a>
	{#if shortDesc.length < result.description.length}
		<div class="flex place-content-end">
			<button aria-label="Show more of description" onclick={toggleDesc}>
				<svg
					class="h-auto w-6"
					width="100"
					height="40"
					viewBox="0 0 100 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="100" height="40" rx="8" ry="8" fill="#4D4D4D" />
					<circle cx="20" cy="20" r="4" fill="#D3D3D3" />
					<circle cx="50" cy="20" r="4" fill="#D3D3D3" />
					<circle cx="80" cy="20" r="4" fill="#D3D3D3" />
				</svg>
			</button>
		</div>
	{/if}
	<p
		id="description-{result.rank}"
		class="py-1 text-justify text-sm text-neutral-600 dark:text-neutral-200"
	>
		{currentDesc}
	</p>
	<div
		id="engines-{result.rank}"
		class="pb-2 text-right text-xs text-neutral-800 dark:text-neutral-400"
	>
		{#each result.engine_ranks as er (er.search_engine)}
			<span class="mx-0.5">{er.search_engine}</span>
		{/each}
	</div>
</article>
