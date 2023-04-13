<template>
	<div class="offer__controls"
	     :class="currentClass">
		<buttons-like  :mini="short" :id="offer.external_id" />
		<!-- <buttons-autoteka v-if="!short" :show-text="page"
		                  :offer="offer" /> -->
	</div>
</template>

<script>

export default {
	components:{
		ButtonsLike: () => import('@/components/buttons/buttons-like'),
		ButtonsAutoteka: () => import('@/components/buttons/buttons-autoteka'),
	},
	props: {
		offer: Object,
		short: Boolean,
		long: Boolean,
		small: Boolean,
		page: Boolean,
	},
	computed: {
		currentClass() {
			return this.short
					? 'offer__controls--short' :
					this.long
							? 'offer__controls--long' :
							this.page ? 'offer__controls--page' : ''
		}
	}
}
</script>