<script setup>
	import { defineAsyncComponent } from 'vue';
	import BudgetInfo from '@/components/BudgetInfo.vue';
	import BudgetAddItem from '@/components/BudgetAddItem.vue';
	import BudgetItemsList from '@/components/BudgetItemsList.vue';

	const AlertBox = defineAsyncComponent(() => import('@/components/AlertBox.vue'));
</script>

<template>
	<AlertBox />

	<BudgetInfo />

	<BudgetAddItem />

	<!-- Transactions container -->
	<section class="mx-3 lg:h-full">
		<div
			class="mx-auto flex max-w-sm flex-col gap-6 rounded-md bg-slate-900 p-3 shadow-xl sm:max-w-2xl sm:gap-8 sm:p-4 lg:h-full lg:max-w-screen-lg lg:flex-row lg:gap-6">
			<!-- Incomes -->
			<BudgetItemsList item-type="inc" />

			<!-- Expenses -->
			<BudgetItemsList item-type="exp" />
		</div>
	</section>
</template>
