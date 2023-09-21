<script setup>
	import { computed } from 'vue';
	import { useBudgetStore } from '../budgetStore.js';
	import tailwindConfigFile from '../../tailwind.config.js';
	import resolveTailwindConfig from 'tailwindcss/resolveConfig';
	import { useFormatNumber } from '@/composables/useFormatNumber.mjs';

	const props = defineProps({
		type: {
			type: String,
			required: true,
		},
	});

	const { formatNumber } = useFormatNumber();

	/* prettier-ignore */
	const { theme: { colors: tailwindColors, } } = resolveTailwindConfig(tailwindConfigFile);
	const budgetStore = useBudgetStore();
	const items = computed(() => budgetStore.$state[props.type]);
	const itemSign = props.type === 'incomes' ? '+' : '-';
	const itemColor = tailwindColors[props.type === 'incomes' ? 'emerald' : 'red'][500];
	const itemColorDim = tailwindColors[props.type === 'incomes' ? 'emerald' : 'red'][600];
</script>

<template>
	<details open @click="$event.preventDefault()" class="space-y-1 lg:w-1/2">
		<summary
			tabindex="-1"
			class="flex list-none items-center justify-between px-1 lg:bg-slate-900 [&::-webkit-details-marker]:hidden">
			<strong
				class="w-full pb-2 text-xl font-bold capitalize tracking-wide text-[--color] lg:pb-3.5 lg:text-center lg:text-2xl">
				{{ props.type }}
			</strong>
		</summary>

		<transition-group
			appear
			tag="ul"
			:name="`slide-${type}`"
			class="divide-y divide-slate-600 overflow-hidden rounded-md">
			<li
				v-for="item in items"
				:key="item.id"
				class="flex items-center justify-between gap-3.5 overflow-x-auto bg-slate-800 px-3.5 py-2.5 sm:gap-5">
				<!-- Item name -->
				<p class="tracking-wide lg:font-medium">{{ item.name }}</p>

				<!-- Item value -->
				<strong class="font-medium tracking-wide text-[--color] sm:text-lg lg:text-xl lg:font-bold">
					{{ `${itemSign}${formatNumber(item.value)}` }}
				</strong>

				<!-- Item delete button -->
				<button
					type="button"
					title="Delete item"
					@click="budgetStore.deleteItem(item)"
					class="group h-9 w-9 rounded-full transition-all focus-visible:outline-offset-[3px] active:scale-90 lg:h-10 lg:w-10">
					<svg
						class="h-inherit w-inherit fill-[--color] transition-all group-hover:fill-[--color-dim] group-focus-visible:fill-[--color-dim]">
						<use href="/icons.svg#x_mark" />
					</svg>
				</button>
			</li>
		</transition-group>
	</details>
</template>

<style scoped>
	details {
		--color: v-bind(itemColor);
		--color-dim: v-bind(itemColorDim);
	}

	/* Add/delete item animations */
	.slide-incomes-enter,
	.slide-expenses-enter {
		opacity: 0;
		translate: 0 -100%;
	}
	.slide-incomes-enter-to,
	.slide-expenses-enter-to {
		opacity: 1;
		translate: 0;
		transition: all 0.6s;
	}
	.slide-incomes-leave-active,
	.slide-expenses-leave-active {
		position: absolute;
		transition: all 0.6s linear;
	}
	.slide-incomes-move,
	.slide-expenses-move {
		transition: all 0.6s;
	}
	.slide-incomes-leave-to {
		opacity: 0;
		translate: -100%;
	}
	.slide-expenses-leave-to {
		opacity: 0;
		translate: 100%;
	}
</style>
