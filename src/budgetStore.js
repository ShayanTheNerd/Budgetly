import { defineStore, acceptHMRUpdate } from 'pinia';

export const useBudgetStore = defineStore('budgetStore', {
	state: () => ({
		incomes: new Set(),
		expenses: new Set(),
	}),
	getters: {
		balance() {
			const totalIncomes = this.getTotal('incomes');
			const totalExpenses = this.getTotal('expenses');

			return totalIncomes - totalExpenses;
		},
		getTotal() {
			return function (accountType) {
				return [...this[accountType]].reduce((previousValue, currentItem) => previousValue + currentItem.value, 0);
			};
		},
		expensesPercentage() {
			const totalIncomes = this.getTotal('incomes');
			const totalExpenses = this.getTotal('expenses');

			return Math.round((totalExpenses / totalIncomes) * 100) || 0;
		},
	},
	actions: {
		addItem(item) {
			this[item.type].add(item);
		},
		deleteItem(item) {
			this[item.type].delete(item);
		},
	},
});

// Enable HMR
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useBudgetStore, import.meta.hot));
