<template>
	<alerts-box />

	<budget-info />

	<budget-add-item />

	<!-- Budget items container -->
	<article
		class="mx-auto my-3 max-w-sm space-y-6 overflow-x-hidden rounded bg-slate-900 px-2 pb-2.5 shadow-xl sm:max-w-2xl sm:px-4 sm:pt-0.5 lg:mx-auto lg:flex lg:h-[385px] lg:max-w-[64rem] lg:items-start lg:justify-between lg:space-y-0 lg:px-2 lg:pb-3 lg:pt-2">
		<!-- Incomes list -->
		<budget-items-list :item-type="'inc'" />

		<!-- Expenses list -->
		<budget-items-list :item-type="'exp'" />
	</article>
</template>

<script setup>
	import { defineAsyncComponent } from 'vue';
	import BudgetInfo from '@/components/BudgetInfo.vue';
	import BudgetAddItem from '@/components/BudgetAddItem.vue';
	import BudgetItemsList from '@/components/BudgetItemsList.vue';

	const alertsBox = defineAsyncComponent(() => import('@/components/Alerts.vue'));
</script>
