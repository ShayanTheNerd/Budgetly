<template>
	<section
		@keypress.enter="itemValidation()"
		class="flex items-center justify-center bg-slate-900 p-[11px] shadow-[inset_0px_0px_5px_5px_#00000050]">
		<!-- Item type identifier -->
		<button
			:value="itemType"
			:class="`change-type-btn-${itemType}`"
			@click="changeItemType(itemType)"
			type="button"
			aria-label="Change item type"
			class="change-type-btn">
			{{ itemType === 'inc' ? '&#43;' : '&#8722;' }}
		</button>

		<div
			class="mx-[11px] flex w-full max-w-[290px] flex-col items-center justify-center space-y-3 sm:ml-3 sm:mr-2 sm:max-w-[557px] sm:flex-row sm:space-x-3 sm:space-y-0">
			<!-- Item description input -->
			<input
				v-model.trim="descInput"
				:class="`desc-input-${itemType}`"
				type="text"
				inputmode="text"
				placeholder="Description"
				class="desc-input" />

			<!-- Item value input -->
			<input
				v-model.number="numberInput"
				:class="`value-input-${itemType}`"
				type="number"
				inputmode="numeric"
				min="1"
				max="999999"
				placeholder="Value (number)"
				class="value-input" />
		</div>

		<!-- Add item button -->
		<button
			@click="itemValidation()"
			type="button"
			aria-label="Add item"
			class="h-11 min-h-[40px] w-11 min-w-[40px] duration-200 active:scale-90">
			<svg
				:class="`add-item-btn-${itemType}`"
				xmlns="http://www.w3.org/2000/svg"
				fill="transparent"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</button>
	</section>
</template>

<script setup>
	import { useStore } from 'vuex';
	import { ref } from 'vue';

	const store = useStore();
	let itemType = ref('inc');
	let descInput = ref(undefined); /* Description input value */
	let numberInput = ref(undefined); /* Number input value */

	function changeItemType(type) {
		if (type === 'inc') itemType.value = 'exp';
		if (type === 'exp') itemType.value = 'inc';
		if (descInput.value === undefined || descInput.value == '') setFocus('desc-input');
		if (descInput.value !== undefined && descInput.value != '') setFocus('value-input');
	}

	function itemValidation() {
		if (descInput.value === undefined || descInput.value == '') {
			descInput.value = undefined;
			setAlert('Description Required');
			setFocus('desc-input');
		} else if (isNaN(numberInput.value)) {
			setAlert('Value Required');
			setFocus('value-input');
		} else if (numberInput.value == '') {
			setAlert('Value Must Be A Number');
			setFocus('value-input');
		} else if (Math.round(numberInput.value) > 9999999) {
			setAlert('Value Is Too Big');
			setFocus('value-input');
		} else {
			setAlert(null);
			createItem(itemType.value, descInput.value, numberInput.value);
			setFocus('desc-input');
		}
	}

	function setFocus(element) {
		if (element === 'desc-input') document.querySelector('input[type="text"]').focus();
		if (element === 'value-input') document.querySelector('input[type="number"]').focus();
	}

	function setAlert(message) {
		store.dispatch('setAlert', message);
	}

	function createItem(type, desc, value) {
		// Income item structure
		class Income {
			constructor(Id, Description, Value) {
				this.id = Id;
				this.description = Description;
				this.value = Value;
			}
		}
		// Expense item structure
		class Expense {
			constructor(Id, Description, Value) {
				this.id = Id;
				this.description = Description;
				this.value = Value;
			}
		}

		// Generate unique id for item
		const id = store.state.data.allItems[type].length + 1;

		// Create a new item based on the item type
		const newItem = type === 'inc' ? new Income(id, desc, value) : new Expense(id, desc, value);

		// Add 'newItem' to Vuex Store
		store.dispatch('addItem', { itemType: itemType.value, newItem });

		// Reset inputs
		descInput.value = undefined;
		numberInput.value = undefined;
	}
</script>

<style scoped>
	/* Dynamic-styled buttons and inputs */
	.change-type-btn {
		border-radius: 1px;
		padding: 12px;
		padding-top: 6px;
		background-color: #f1f5f9;
		font-size: 30px;
		line-height: 36px;
		font-weight: 500;
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition-duration: 200ms;
		border: 3px solid;
	}

	.change-type-btn-inc {
		border-color: #10b981;
		color: #10b981;
	}

	.change-type-btn-exp {
		border-color: #dc2626;
		color: #dc2626;
	}

	.desc-input {
		border-radius: 0;
		background-color: #f1f5f9;
		font-weight: 500;
		color: #0f172a;
		font-size: 18px;
		line-height: 28px;
		padding-left: 8px;
		padding-right: 8px;
		height: 32px;
		width: 100%;
		border: none;
	}

	.desc-input::placeholder {
		color: #94a3b8;
	}

	.desc-input-inc:hover {
		outline: 2px solid #10b981;
	}

	.desc-input-inc:focus,
	.desc-input-inc:focus-within {
		outline: 3px solid #10b981;
	}

	.desc-input-exp:hover {
		outline: 2px solid #dc2626;
	}

	.desc-input-exp:focus,
	.desc-input-exp:focus-within {
		outline: 3px solid #dc2626;
	}

	.value-input {
		border-radius: 0;
		background-color: #f1f5f9;
		font-weight: 500;
		color: #0f172a;
		font-size: 18px;
		line-height: 28px;
		padding-left: 8px;
		padding-right: 8px;
		height: 32px;
		width: 100%;
		border: none;
		text-align: left;
	}

	.value-input::placeholder {
		text-align: left;
	}

	.value-input-inc:hover {
		outline: 2px solid #10b981;
	}

	.value-input-inc:focus,
	.value-input-inc:focus-within {
		outline: 3px solid #10b981;
	}

	.value-input-exp:hover {
		outline: 2px solid #dc2626;
	}

	.value-input-exp:focus,
	.value-input-exp:focus-within {
		outline: 3px solid #dc2626;
	}

	.add-item-btn-inc {
		stroke: #10b981;
	}

	.add-item-btn-exp {
		stroke: #dc2626;
	}

	@media (hover: hover) {
		.change-type-btn-inc:hover {
			color: #059669;
			border-color: #059669;
		}

		.change-type-btn-exp:hover {
			color: #b91c1c;
			border-color: #b91c1c;
		}

		.add-item-btn-inc:hover {
			stroke: #059669;
		}

		.add-item-btn-exp:hover {
			stroke: #b91c1c;
		}
	}

	@media (min-width: 640px) {
		.change-type-btn {
			padding: 0px;
			border-radius: 4px;
			font-size: 33px;
			width: 44px;
			height: 44px;
		}

		.desc-input {
			height: 44px;
			border-radius: 4px;
		}

		.value-input {
			height: 44px;
			width: 320px;
			font-size: 20px;
			line-height: 28px;
			text-align: center;
			border-radius: 4px;
		}

		.value-input::placeholder {
			text-align: center;
		}

		.add-item-btn {
			height: 48px;
			width: 48px;
		}
	}

	@media (min-width: 1024px) {
		.desc-input {
			border-radius: 4px;
		}

		.value-input {
			border-radius: 4px;
		}
	}
</style>
