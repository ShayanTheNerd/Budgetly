<script setup>
	import gsap from 'gsap';
	import { useStore } from 'vuex';
	import { reactive, computed, watch } from 'vue';

	const storeData = useStore().state.data;
	const numbers = reactive({
		budgetNumber: 0,
		percentageNumber: '--',
		totalIncomesNumber: 0,
		totalExpensesNumber: 0,
	});
	const totalBudgetToWatch = computed(() => storeData.budget);
	const budgetPercentageToWatch = computed(() => storeData.percentage);
	const budgetTotalIncsToWatch = computed(() => storeData.totals['inc']);
	const budgetTotalExpsToWatch = computed(() => storeData.totals['exp']);
	const totalBudgetColor = computed(() => {
		if (storeData.budget < 0) {
			return 'text-red-500';
		} else if (storeData.budget === 0) {
			return 'text-inherit';
		} else if (storeData.budget > 0) {
			return 'text-emerald-400';
		}
	});

	watch(
		[totalBudgetToWatch, budgetPercentageToWatch, budgetTotalIncsToWatch, budgetTotalExpsToWatch],
		([totalBudgetNewValue, budgetPercentageNewValue, budgetTotalIncsNewValue, budgetTotalExpsNewValue]) => {
			gsap.to(numbers, { duration: 0.8, budgetNumber: totalBudgetNewValue });
			gsap.to(numbers, { duration: 0.8, percentageNumber: budgetPercentageNewValue });
			gsap.to(numbers, { duration: 0.8, totalIncomesNumber: budgetTotalIncsNewValue });
			gsap.to(numbers, { duration: 0.8, totalExpensesNumber: budgetTotalExpsNewValue });
		},
	);

	// Today's formatted date. E.g. July 13, 2022
	function todaysFormattedDate() {
		const allMonths = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const currentFullDate = new Date();
		const currentMonth = allMonths[currentFullDate.getMonth()];

		return `${currentMonth} ${currentFullDate.getDate()}, ${currentFullDate.getFullYear()}`;
	}

	function animatedBudgetNumber() {
		if (storeData.budget === 0 || storeData.budget < 0) {
			return numbers.budgetNumber.toLocaleString('en-US', { maximumFractionDigits: 0 });
		} else if (storeData.budget > 0) {
			return `+${numbers.budgetNumber.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
		}
	}

	function animatedTotalIncomesNumber() {
		if (storeData.totals.inc > 0)
			return `+${numbers.totalIncomesNumber.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
		else return numbers.totalIncomesNumber.toLocaleString('en-US', { maximumFractionDigits: 0 });
	}

	function animatedTotalExpensesNumber() {
		if (storeData.totals.exp > 0)
			return `-${numbers.totalExpensesNumber.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
		else return numbers.totalExpensesNumber.toLocaleString('en-US', { maximumFractionDigits: 0 });
	}

	function animatedPercentageNumber() {
		if (storeData.percentage > 100) return '+100%';
		if (storeData.percentage === '--' || storeData.totals['inc'] === 0) return '--';
		else return `${numbers.percentageNumber.toLocaleString('en-US', { maximumFractionDigits: 0 })}%`;
	}
</script>

<template>
	<section class="mx-3 !mt-0 text-center text-slate-50">
		<p class="text-sm lg:text-base">
			Available Budget on
			<time datetime="">{{ todaysFormattedDate() }}</time>
		</p>

		<!-- Budget -->
		<p :class="totalBudgetColor" class="mb-6 mt-4 text-4xl font-medium leading-8 tracking-wide">
			{{ animatedBudgetNumber() }}
		</p>

		<!-- Total amount of incomes/expenses -->
		<div class="mx-auto flex max-w-sm flex-col gap-3.5 sm:max-w-2xl sm:flex-row sm:items-center sm:justify-center">
			<!-- Total amount of incomes -->
			<div
				class="hidden-scrollbar flex h-12 items-center justify-between gap-3.5 overflow-x-auto rounded-md bg-emerald-500 px-3 text-lg sm:w-1/2 lg:text-xl">
				<p class="w-20 shrink-0 tracking-wide">Incomes</p>

				<p class="text-[21px] font-medium tracking-wide">{{ animatedTotalIncomesNumber() }}</p>

				<small class="invisible min-w-max rounded-md bg-slate-300/40 px-1 transition-all">
					{{ animatedPercentageNumber() }}
				</small>
			</div>

			<!-- Total amount of expenses -->
			<div
				class="hidden-scrollbar flex h-12 items-center justify-between gap-3.5 overflow-x-auto rounded-md bg-red-500 px-3 text-lg sm:w-1/2 lg:text-xl">
				<p class="w-20 shrink-0 tracking-wide">Expenses</p>

				<p class="text-[21px] font-medium tracking-wide">{{ animatedTotalExpensesNumber() }}</p>

				<!-- Percentage of expenses to the total income -->
				<small class="min-w-max rounded-md bg-slate-300/40 px-1 transition-all">
					{{ animatedPercentageNumber() }}
				</small>
			</div>
		</div>
	</section>
</template>
