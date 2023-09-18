<script setup>
	import { ref } from 'vue';
	import { useStore } from '../store.js';

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
		store.setAlert(message);
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
		const id = store.$state.data.allItems[type].length + 1;

		// Create a new item based on the item type
		const newItem = type === 'inc' ? new Income(id, desc, value) : new Expense(id, desc, value);

		// Add 'newItem' to Pinia Store
		store.addItem({ itemType: itemType.value, newItem });

		// Reset inputs
		descInput.value = undefined;
		numberInput.value = undefined;
	}
</script>

<template>
	<section class="flex justify-center bg-slate-900 p-3.5 shadow-[inset_0px_0px_5px_5px_#00000050]">
		<form @submit.prevent="itemValidation()" class="mx-auto w-full max-w-sm sm:max-w-2xl">
			<fieldset class="relative flex items-center justify-center">
				<legend class="sr-only">Add or remove transactions</legend>

				<!-- Transaction type identifier -->
				<button
					type="button"
					title="Change item type"
					:class="`change-type-btn-${itemType}`"
					@click="changeItemType(itemType)"
					class="group flex h-9 w-9 items-center justify-center rounded-md border-[3px] bg-slate-100 p-3 transition-all sm:h-11 sm:w-11">
					<svg aria-hidden="true" class="h-6 w-6 shrink-0 sm:h-7 sm:w-7">
						<use :href="`icons.svg#${itemType === 'inc' ? 'plus' : 'minus'}`" />
					</svg>
				</button>

				<div class="me-3.5 ms-4 flex w-full flex-col items-center justify-center gap-3.5 sm:me-2 sm:ms-3 sm:flex-row">
					<!-- Transaction name -->
					<input
						required
						type="text"
						placeholder="Transaction name"
						v-model.trim="descInput"
						:class="`desc-input-${itemType}`"
						class="h-9 w-full rounded-md bg-slate-100 px-2.5 text-slate-900 sm:h-11 lg:text-lg" />

					<!-- Transaction value -->
					<input
						required
						type="number"
						inputmode="numeric"
						min="1"
						placeholder="Transaction value"
						v-model.number="numberInput"
						:class="`value-input-${itemType}`"
						class="h-9 w-full rounded-md bg-slate-100 px-2.5 text-slate-900 sm:h-11 lg:text-lg" />
				</div>

				<!-- Add item button -->
				<button
					type="submit"
					aria-label="Submit transaction"
					class="h-[41px] w-[41px] transition-all active:scale-90 sm:h-11 sm:w-11">
					<svg aria-hidden="true" :class="`add-item-btn-${itemType}`" class="h-inherit w-inherit transition-all">
						<use href="icons.svg#check_circle" />
					</svg>
				</button>
			</fieldset>
		</form>
	</section>
</template>

<style scoped>
	.change-type-btn-inc {
		border-color: #10b981;
		stroke: #10b981;
	}

	.change-type-btn-exp {
		border-color: #dc2626;
		stroke: #dc2626;
	}

	.desc-input-inc:focus,
	.desc-input-inc:focus-within {
		outline: 3px solid #10b981;
	}

	.desc-input-exp:focus,
	.desc-input-exp:focus-within {
		outline: 3px solid #dc2626;
	}

	.value-input-inc:focus,
	.value-input-inc:focus-within {
		outline: 3px solid #10b981;
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

		.add-item-btn {
			height: 48px;
			width: 48px;
		}
	}
</style>
