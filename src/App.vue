<script setup>
	import BudgetInfo from '@/components/BudgetInfo.vue';
	import BudgetAddItem from '@/components/BudgetAddItem.vue';
	import BudgetItemsList from '@/components/BudgetItemsList.vue';
</script>

<template>
	<BudgetInfo />

	<BudgetAddItem />

	<!-- Budget items list -->
	<section class="mx-3 flex grow flex-col pb-5">
		<div
			class="mx-auto flex w-full max-w-sm grow flex-col gap-6 rounded-md bg-slate-900 p-3 shadow-xl sm:max-w-2xl sm:gap-8 sm:p-4 lg:max-w-screen-lg lg:flex-row lg:gap-6">
			<BudgetItemsList type="incomes" />

			<BudgetItemsList type="expenses" />
		</div>
	</section>
</template>
