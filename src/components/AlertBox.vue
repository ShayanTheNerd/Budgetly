<script setup>
	import { useStore } from '../store.js';

	const store = useStore();
</script>

<template>
	<transition name="scale">
		<div
			role="alert"
			v-show="store.$state.alert.isVisible"
			@click="store.$state.alert.isVisible = false"
			class="absolute left-3 right-3 top-3 z-50 flex w-max max-w-[275px] cursor-pointer items-center justify-between gap-2.5 rounded-md bg-red-100 px-3.5 py-2 shadow-2xl sm:max-w-sm">
			<svg aria-hidden="true" class="h-8 w-8 shrink-0 stroke-red-600">
				<use href="icons.svg#info_circle" />
			</svg>

			<p class="font-medium leading-5 text-inherit text-red-800">{{ store.$state.alert.message }}</p>
		</div>
	</transition>
</template>

<style scoped>
	/* Pop-up notification animation */
	.scale-enter {
		scale: 0;
		opacity: 0;
		translate: -100%;
	}
	.scale-enter-active,
	.scale-leave-active {
		transition: all 0.2s linear;
	}
	.scale-leave-to {
		scale: 0;
		opacity: 0;
		translate: -100%;
	}
</style>
