<template>
	<div @click.prevent="clickPhone" class="button button--callback-phone">
		<svg-icon class="button-icon" name="phone"/>
	</div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		})
	},
	methods: {
		clickPhone() {
			var myLink = document.createElement('a');
            myLink.setAttribute('href','tel:'+this.settings.phone);
            myLink.click();
		},
	}
}
</script>