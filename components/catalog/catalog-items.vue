<template>
	<div class="catalog__items"
	     ref="catalog">
		 <h2 class="h2__title" v-if="hasIdCar != '' && offers.length > 1">Похожие автомобили</h2>
		<div class="catalog__items-line"
		     v-if="offers.length">
			<offer-catalog v-for="offer in offers"
			               :key="offer.id"
			               :offer="offer" v-if="hasIdCar != offer.external_id"/>
		</div>
		<div class="catalog__items-line"
		     v-else>
			 <h3 class="not-found__title">
				Ничего не найдено
			</h3>
			<!-- <skeleton-offer v-for="item in 6"
			                :key="item" /> -->
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import offerFilters from '~/apollo/queries/offer/offerFilters.gql'
import filters from "~/apollo/queries/offer/filters";
import offers from "~/apollo/queries/offer/offers";
import OfferCatalog from "@/components/offer/offer-catalog";

export default {
	components: {
		OfferCatalog: () => import('@/components/offer/offer-catalog'),
		// SkeletonOffer: () => import('@/components/skeleton/skeleton-offer'),
	},
	props: {
		limit: Number,
		sort: String,
		hasMark: {
			type: String,
			default: ''
		},
		hasIdCar: {
			type: String,
			default: ''
		},
		set: String
	},
	watch: {
		async '$route'() {
			await this.getOffers()
		}
	},
	computed: {
		...mapGetters({
			offers: 'offers/offers',
			filterButtonClick: 'filters/filterButtonClick'
		}),
		currentPagination() {
			return Number(this.$route.query.page ? this.$route.query.page : 1)
		},
		currentPriceFrom() {
		return Number(this.$route.query.price_from) || null
		},
		currentVariables() {
			return {
				mark_slug_array: this.hasMark != '' ? [this.hasMark] : this.$route.params.mark ? [this.$route.params.mark] : null,
				folder_slug_array: this.$route.params.folder ? [this.$route.params.folder] : null,
				generation_slug_array: this.$route.query.generation ? [this.$route.query.generation] : null,
				gearbox_id_array: this.$route.query.gearbox ? [Number(this.$route.query.gearbox)] : null,
				body_type_id_array: this.$route.query.bodyType ? [Number(this.$route.query.bodyType)] : null,
				engine_type_id_array: this.$route.query.engineType ? [Number(this.$route.query.engineType)] : null,
				sort: this.sort ? this.sort : this.$route.query.sort ? this.$route.query.sort : null,
				set: this.set ? this.set : this.$route.query.set ? this.$route.query.set : null,
				year_from: Number(this.$route.query.yearFrom),
				price_from: this.currentPriceFrom,
				page: this.currentPagination,
				limit: this.limit || 12
			}
		}
	},
	methods: {
		...mapActions({
			request: 'request/request'
		}),
		...mapMutations({
			setOffersInfo: 'offers/SET_OFFERS_INFO',
			setOffers: 'offers/SET_OFFERS',
			setFilterButtonClick:'filters/SET_FILTER_BUTTON_CLICK'
		}),
		async getOffers() {
			await this.setOffers([])
			try {
				let response = await this.request({
					query: offers,
					variables: this.currentVariables
				})
				this.setOffersInfo(response.data.offers)
				this.setOffers(response.data.offers.data)
			} catch (error) {
				console.log(error)
			}
		},
	},
	async fetch() {
		await this.getOffers()
	},
	mounted() {
		if (this.filterButtonClick || this.$route.params.generation && !(this.$route.params.id)) {
			setTimeout(() => {
				let catalog = this.$refs.catalog;
				
				catalog.scrollIntoView(true);
				const yourHeight = 134; // header + filter
				
				const scrolledY = window.scrollY;
				window.scroll(0, scrolledY - yourHeight);
				this.setFilterButtonClick(false)
			}, 100)
		}
		if(this.$route.params.id){
			setTimeout(() => {
			window.scroll(0,0)
		}, 120)
	 }
	}
}
</script>