<template>
	<div @click.prevent="open"
	     class="button button--info " :class="{'button--icon':icon}">
		<slot>
		
		</slot>
		<span v-if="title">
			{{ title }}
		</span>
	</div>
</template>
<script>
import modals from "@/mixins/modals";

export default {
	mixins: [modals],
	props: {
		// offer: Object,
		icon: Boolean,
		title: {
			type: String,
			default: 'Обратный звонок'
		}
	},
	methods: {
		async open() {
			await this.openModal({
				type: 'callback',
				title: `Заявка на обратный звонок`,
				// offer: this.offer
			})
		},
	}
}
</script>