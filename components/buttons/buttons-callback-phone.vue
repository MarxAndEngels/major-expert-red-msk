<template>
	<div @click.prevent="click" class="button button--callback-phone">
		<svg-icon class="button-icon" name="phone"/>
	</div>
</template>
<script>
import modals from "@/mixins/modals";

export default {
	mixins: [modals],
	props: {
		offer: Object
	},
	methods: {
		async click() {
			await this.openModal({
				type: 'callback',
				title: `Обратный звонок`,
                subTitle: 'Наш менеджер перезвонит вам',
				offer: this.offer
			})
		},
	}
}
</script>