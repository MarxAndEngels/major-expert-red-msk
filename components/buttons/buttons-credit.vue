<template>
	<div @click="click"
	     class="button button--credit">
		<slot></slot>
		{{ title }}
	</div>
</template>
<script>
import modals from "@/mixins/modals";

export default {
	mixins: [modals],
	props: {
		title: {
			type: String,
			default: 'Купить в кредит'
		},
		offer: Object
	},
	methods: {
		async click() {
			await this.openModal({
				type: 'credit',
				title: `Заявка на автомобиль`,
				offer: this.offer
			})
		},
	}
}
</script>