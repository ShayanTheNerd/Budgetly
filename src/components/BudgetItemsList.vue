<template>
	<article class="hidden-scrollbar h-full overflow-x-hidden lg:relative lg:mx-2.5 lg:min-w-[480px] lg:overflow-y-auto">
		<h2
			:class="itemTypeColor"
			class="bg-slate-900 pb-1.5 pt-1 text-[25px] font-bold tracking-wider lg:sticky lg:left-0 lg:right-0 lg:top-0 lg:block lg:pb-2.5 lg:pt-0 lg:text-center lg:text-3xl">
			{{ itemTypeName }}
		</h2>

		<transition-group
			:name="`slide-${itemType}`"
			tag="div"
			appear
			class="divide-y divide-slate-600 overflow-hidden rounded">
			<div
				v-for="item in data.allItems[itemType]"
				:id="item.id"
				:key="item.id"
				class="group flex w-full items-center justify-between bg-slate-800 px-1.5 py-2.5 lg:mr-6 lg:px-2.5 xl:mr-11">
				<!-- Item description -->
				<p class="w-44 break-words text-slate-200 sm:w-[350px] sm:pr-2 lg:w-[300px] lg:font-medium">
					{{ item.description }}
				</p>

				<!-- Item value -->
				<span :class="itemTypeColor" class="mx-1 min-w-max font-semibold tracking-wider lg:text-xl">
					{{ `${itemType === 'inc' ? '+' : '-'}${item.value.toLocaleString('en-US')}` }}
				</span>

				<!-- Item remove button -->
				<button @click="deleteItem(item, itemType)" type="button" aria-label="Remove item">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						:class="[itemType === 'inc' ? 'stroke-emerald-400' : 'stroke-red-500']"
						class="h-9 w-9 fill-transparent stroke-2 group-hover:visible support:invisible"
						viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</button>
			</div>
		</transition-group>
	</article>
</template>

<script setup>
	import { useStore } from 'vuex';
	import { computed } from 'vue';

	const props = defineProps({
		itemType: {
			type: String,
			required: true,
		},
	});

	const store = useStore();
	const data = store.state.data;
	const itemTypeName = computed(() => (props.itemType === 'inc' ? 'Incomes' : 'Expenses'));
	const itemTypeColor = computed(() => (props.itemType === 'inc' ? 'text-emerald-400' : 'text-red-500'));

	function deleteItem(item, type) {
		store.dispatch('deleteItem', { item, type });
	}
</script>

<style scoped>
	/* Add/remove item animations */
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
		/* Moves all elements smoothly after deleting one */
		transition: all 0.6s linear;
		position: absolute;
	}

	.slide-inc-move,
	.slide-exp-move {
		transition: all 0.6s;
	}

	.slide-inc-leave-to {
		translate: -100%;
		opacity: 0;
	}

	.slide-exp-leave-to {
		translate: 100%;
		opacity: 0;
	}
</style>
