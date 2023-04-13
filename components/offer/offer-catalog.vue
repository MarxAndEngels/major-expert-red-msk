<template>
	<div
			class="offer__catalog"
			:class="{'offer__catalog--long': view === 'long'}"
			v-if="offer">
			
		<offer-controls :short="view === 'short'"
		                :offer="offer" />
		<div class="offer__catalog-info">
			<offer-title
					@click="moreClick"
					:to="offerRoute"
					:long=" view==='long'"
					:offer="offer"
					:short="view === 'short'" />
			<tech-info
					:short="view === 'short'"
					:long="view === 'long'"
					:offer="offer" />				
		 </div>			
		<client-only>
			<offer-slider
					:to="offerRoute"
					:images="offer.images" />
		</client-only>
		
		<div class="offer__catalog-info">
			<!-- <offer-title
					@click="moreClick"
					:to="offerRoute"
					:long=" view==='long'"
					:offer="offer"
					:short="view === 'short'" /> -->
			<!-- <offer-price
					:short="view === 'short'"
					:long="view==='long'"
					:offer="offer" /> -->
			<offer-buttons
					:to="offerRoute"
					:offer="offer"
					:short="view=== 'short'"
					:long="view==='long'" />
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	components: {
		OfferControls: () => import('@/components/offer/offer-controls'),
		OfferSlider: () => import('@/components/offer/offer-slider'),
		OfferTitle: () => import('@/components/offer/offer-title'),
		OfferPrice: () => import('@/components/offer/offer-price'),
		OfferButtons: () => import('@/components/offer/offer-buttons'),
		TechInfo: () => import('@/components/tech/tech-info')
	},
	props: {
		offer: Object
	},
	computed: {
		...mapGetters({
			likesArray: 'favorite/likesArray',
			catalogRoute: 'settings/catalogRoute',
			view: 'view/view'
		}),
		offerRoute() {
			return `/${this.catalogRoute}/${this.offer.mark.slug}/${this.offer.folder.slug}/${this.offer.generation.slug}/${this.offer.external_id}`
		}
	},
	methods: {
		async moreClick() {
			await this.$router.push(this.offerRoute)
		}
	}
}
</script>