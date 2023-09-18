import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
	state: () => ({
		data: {
			allItems: {
				inc: [] /* All income items => {id: 1, description: 'lorem ipsum', value: 25238} */,
				exp: [] /* All expense items => {id: 1, description: 'lorem ipsum', value: 25238} */,
			},
			totals: {
				inc: 0 /* Total of all income items */,
				exp: 0 /* Total of all expense items */,
			},
			budget: 0,
			percentage: '--' /* Percentage */,
		},
		alert: {
			message: null,
			isVisible: false,
		},
	}),
	actions: {
		addItem(props) {
			const { itemType, newItem } = props;
			this.data.allItems[itemType].unshift(newItem);
			this.calculateTotal(itemType);
			this.calculateBudget();
		},
		calculateTotal(type) {
			// Store the values of all items from 'type' in an array
			const itemValues = this.data.allItems[type].map(item => item.value);

			// Store the sum of all items into corresponding arrays in 'totals' object
			this.data.totals[type] = itemValues.reduce((prev, cur) => prev + cur, 0);
		},
		calculateBudget() {
			// Calculate the current budget (income - expense)
			this.data.budget = this.data.totals.inc - this.data.totals.exp;

			// Calculate the percentage ((expense / income) * 100)
			const percentage = Math.round((this.data.totals.exp / this.data.totals.inc) * 100);
			if (percentage !== Infinity && percentage !== undefined) {
				this.data.percentage = percentage;
			} else {
				this.data.percentage = '--';
			}
		},
		deleteItem(props) {
			const { item, type } = props;

			// Create a new array containing ids of all items in the inc/exp arrays
			const ids = this.data.allItems[type].map(current => current.id);

			const index = ids.indexOf(item.id);

			// Delete one item from the specified index position
			if (index !== -1) this.data.allItems[type].splice(index, 1); /* '-1' => 'id' is not found in the 'ids' array */

			this.calculateTotal(type);
			this.calculateBudget();
		},
		setAlert(message) {
			this.alert.isVisible = message === null ? false : true;
			this.alert.message = message;
			setTimeout(() => {
				this.alert.message = null;
				this.alert.isVisible = false;
			}, 3000);
		},
	},
});
