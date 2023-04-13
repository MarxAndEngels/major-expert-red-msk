<template>
	<div class="button button--autoteka"
	     @click="click">
		<svg-icon class="button--autoteka-icon"
		          name="autoteka" />
		<div class="button--autoteka-vin">
			VIN
		</div>
		<span class="button--autoteka-text"
		      v-if="showText">Проверить
		</span>
	</div>
</template>
<script>
import modals from "@/mixins/modals";

export default {
	mixins: [modals],
	props: {
		offer: Object,
		showText: Boolean
	},
	methods:{
		click(){
			this.openAutoteka(this.offer)
		}
	}
}
</script>