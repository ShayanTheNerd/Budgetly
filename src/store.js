import { createStore } from 'vuex';

export default createStore({
	state: {
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
	},
	mutations: {
		ADD_ITEM(state, props) {
			const { itemType, newItem } = props;
			state.data.allItems[itemType].unshift(newItem);
		},
		CALCULATE_TOTAL(state, type) {
			// Store the values of all items from 'type' in an array
			const itemValues = state.data.allItems[type].map(item => item.value);

			// Store the sum of all items into corresponding arrays in 'totals' object
			state.data.totals[type] = itemValues.reduce((prev, cur) => prev + cur, 0);
		},
		CALCULATE_BUDGET(state) {
			// Calculate the current budget (income - expense)
			state.data.budget = state.data.totals.inc - state.data.totals.exp;

			// Calculate the percentage ((expense / income) * 100)
			const percentage = Math.round((state.data.totals.exp / state.data.totals.inc) * 100);
			if (percentage !== Infinity && percentage !== undefined) {
				state.data.percentage = percentage;
			} else {
				state.data.percentage = '--';
			}
		},
		DELETE_ITEM(state, props) {
			const { item, type } = props;

			// Create a new array containing ids of all items in the inc/exp arrays
			const ids = state.data.allItems[type].map(current => current.id);

			const index = ids.indexOf(item.id);

			// Delete one item from the specified index position
			if (index !== -1) state.data.allItems[type].splice(index, 1); /* '-1' => 'id' is not found in the 'ids' array */
		},
		SET_ALERT(state, message) {
			state.alert.isVisible = message === null ? false : true;
			state.alert.message = message;
			setTimeout(() => {
				state.alert.message = null;
				state.alert.isVisible = false;
			}, 3000);
		},
	},
	actions: {
		addItem({ commit }, props) {
			commit('ADD_ITEM', props);

			// Calculate total incomes and expenses
			commit('CALCULATE_TOTAL', 'inc');
			commit('CALCULATE_TOTAL', 'exp');

			commit('CALCULATE_BUDGET');
		},
		deleteItem({ commit }, props) {
			commit('DELETE_ITEM', props);

			// Calculate total incomes and expenses
			commit('CALCULATE_TOTAL', 'inc');
			commit('CALCULATE_TOTAL', 'exp');

			commit('CALCULATE_BUDGET');
		},
		setAlert({ commit }, message) {
			commit('SET_ALERT', message);
		},
	},
});
