<template>
	<div class="application__bank">
		<img class="application__bank-image lazyload"
		     v-if="currentBank !== ''"
		     :data-src="bank.image"
		     alt="">
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	computed: {
		...mapGetters({
			settings: 'settings/settings',
			bank: 'banks/bank'
		}),
		currentBank() {
			return this.bank ? this.bank : ''
		}
	}
}
</script>