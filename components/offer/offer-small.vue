<template>
	<div class="offer__small">
		<offer-title small :offer="offer"/>
		<div class="offer__small-wrapper">
			<img class="offer__small-image"
			     v-for="image in offer.images"
			     :key="image.small_webp"
			     data-fancybox="gallery"
			     :data-src="image.original"
			     alt="img"
			     :src="image.small_webp" />
			<svg-icon name="search"
			          class="offer__small-scale" />
			<div class="offer__small-info">
				<buttons-chose v-if="chose"
				               @click="$emit('chose')" />
				<offer-price small
				             :offer="offer" />
				<tech-info small :offer="offer"/>
			</div>
		</div>
		
	</div>
</template>

<script>
import filters from "@/mixins/filters";

export default {
	components:{
		OfferTitle: () => import('@/components/offer/offer-title'),
		ButtonsChose: () => import('@/components/buttons/buttons-chose'),
		OfferPrice: () => import('@/components/offer/offer-price'),
		TechInfo: () => import('@/components/tech/tech-info')
	},
	mixins: [filters],
	props: {
		offer: Object,
		chose: Boolean
	}
}
</script>