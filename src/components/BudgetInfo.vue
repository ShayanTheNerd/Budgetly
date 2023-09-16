<template>
	<section class="m-3 mt-4 text-center text-slate-50 lg:mt-4">
		<div class="-mt-2.5 text-sm lg:text-base">
			<p>Available Budget on</p>
			<time>{{ todaysFormattedDate() }}</time>
		</div>

		<!-- Current available budget -->
		<p :class="totalBudgetColor" class="mb-5 mt-4 text-4xl font-medium tracking-widest">
			{{ animatedBudgetNumber() }}
		</p>

		<!-- Total amount of incomes/expenses -->
		<div
			class="mx-auto max-w-sm space-y-3 sm:flex sm:max-w-2xl sm:items-center sm:justify-center sm:space-x-3 sm:space-y-0">
			<!-- Total amount of incomes -->
			<div
				class="flex items-center justify-between rounded bg-emerald-500 py-2.5 pl-3 pr-16 text-xl font-medium sm:w-1/2 sm:space-x-7 sm:px-3">
				<h2>Incomes</h2>

				<p class="text-[21px] font-semibold tracking-wider">{{ animatedTotalIncomesNumber() }}</p>
			</div>

			<!-- Total amount of expenses -->
			<div
				class="relative flex items-center justify-between rounded bg-red-500 py-2.5 pl-3 pr-16 text-xl font-medium sm:w-1/2 sm:space-x-7">
				<h2>Expenses</h2>

				<p class="text-[21px] font-semibold tracking-wider">{{ animatedTotalExpensesNumber() }}</p>

				<!-- Percentage of expenses to the total income -->
				<span
					class="absolute right-1.5 top-3 mt-0.5 max-w-[55px] overflow-hidden rounded bg-gray-300 bg-opacity-40 px-1 text-sm leading-5 lg:top-[12px] lg:text-[15px]">
					{{ animatedPercentageNumber() }}
				</span>
			</div>
		</div>
	</section>
</template>

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
