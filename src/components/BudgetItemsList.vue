<script setup>
	import { computed } from 'vue';
	import { useStore } from '../store.js';

	const props = defineProps({
		itemType: {
			type: String,
			required: true,
		},
	});

	const store = useStore();
	const data = store.$state.data;
	const itemTypeName = computed(() => (props.itemType === 'inc' ? 'Incomes' : 'Expenses'));
	const itemTypeColor = computed(() => (props.itemType === 'inc' ? 'text-emerald-400' : 'text-red-500'));

	function deleteItem(item, type) {
		store.deleteItem({ item, type });
	}
</script>

<template>
	<details open class="group space-y-1 lg:w-1/2 lg:overflow-y-hidden">
		<summary
			class="flex select-none list-none items-center justify-between px-1 lg:select-auto lg:bg-slate-900 [&::-webkit-details-marker]:hidden">
			<strong
				:class="itemTypeColor"
				class="w-full pb-2 text-xl font-bold tracking-wide lg:pb-3.5 lg:text-center lg:text-2xl">
				{{ itemTypeName }}
			</strong>

			<button type="button" title="Expand/collapse list" class="h-7 w-7 sm:h-8 sm:w-8 lg:hidden">
				<svg
					aria-hidden="true"
					:class="[itemType === 'inc' ? 'stroke-emerald-400' : 'stroke-red-500']"
					class="h-inherit w-inherit transition-all">
					<use href="icons.svg#chevron_down" />
				</svg>
			</button>
		</summary>

		<div class="overflow-hidden rounded-md">
			<transition-group
				appear
				:name="`slide-${itemType}`"
				tag="ul"
				class="grid grid-rows-[0fr] divide-y divide-slate-600 overflow-hidden overscroll-contain transition-all duration-700 group-open:grid-rows-[1fr] lg:block lg:max-h-80 lg:overflow-y-auto">
				<li
					v-for="item in data.allItems[itemType]"
					:id="item.id"
					:key="item.id"
					class="hidden-scrollbar group flex items-center justify-between gap-3.5 overflow-x-auto bg-slate-800 px-3.5 py-2.5 sm:gap-5">
					<!-- Transaction name -->
					<p class="tracking-wide lg:font-medium">{{ item.description }}</p>

					<!-- Transaction value -->
					<strong :class="itemTypeColor" class="font-medium tracking-wide sm:text-lg lg:text-xl lg:font-bold">
						{{ `${itemType === 'inc' ? '+' : '-'}${item.value.toLocaleString('en-US')}` }}
					</strong>

					<!-- Transaction remove button -->
					<button
						type="button"
						title="Remove transaction"
						@click="deleteItem(item, itemType)"
						class="group h-9 w-9 transition-all active:scale-90 lg:h-10 lg:w-10">
						<svg
							:class="[
								itemType === 'inc' ? 'fill-emerald-400 hover:fill-emerald-600' : 'fill-red-500 hover:fill-red-600',
							]"
							class="h-inherit w-inherit transition-all">
							<use href="icons.svg#x_mark" />
						</svg>
					</button>
				</li>
			</transition-group>
		</div>
	</details>
</template>

<style scoped>
	/* Add/remove transaction animations */
	.slide-inc-enter,
	.slide-exp-enter {
		opacity: 0;
		translate: 0 -100%;
	}
	.slide-inc-enter-to,
	.slide-exp-enter-to {
		opacity: 1;
		translate: 0;
		transition: all 0.6s;
	}
	.slide-inc-leave-active,
	.slide-exp-leave-active {
		position: absolute;
		transition: all 0.6s linear;
	}
	.slide-inc-move,
	.slide-exp-move {
		transition: all 0.6s;
	}
	.slide-inc-leave-to {
		opacity: 0;
		translate: -100%;
	}
	.slide-exp-leave-to {
		opacity: 0;
		translate: 100%;
	}
</style>
