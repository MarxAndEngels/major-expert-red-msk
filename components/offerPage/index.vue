<template>
	<div>
	<div class="offer__content"
	     v-if="offer">
		<div class="offer__slider-wrapper">
			<client-only>
				<sliders-offer :offer="offer" />
			</client-only>
		</div>
		
		<offer-page-slider :images="offer.images" />
				<offer-page-title :offer="offer" />
		<div class="offer__page-content">
			<!--<offer-page-tech :offer="offer"/>-->
			<tech-info page
			           long
			           :offer="offer" />
			<offer-page-controls :offer="offer" />
				<offer-page-map />
			<offer-page-complectation :offer="offer" />
		
		</div>
	</div>
	<skeleton-offer-page v-else />
	<div class="catalog">
	<catalog-items class="carsItems" :sort="'created_at|desc'"
		               :limit="4" ref='carsItems' :hasMark="$route.params.mark" :hasIdCar="$route.params.id"/>
	</div>
	</div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
	components: {
		Benefits: () => import('@/components/benefits/benefits'),
		SlidersOffer: () => import('@/components/sliders/sliders-offer'),
		OfferPageTitle: () => import('@/components/offerPage/offer-page-title'),
		OfferPageSlider: () => import('@/components/offerPage/offer-page-slider'),
		TechInfo: () => import('@/components/tech/tech-info'),
		OfferPageControls: () => import('@/components/offerPage/offer-page-controls'),
		OfferPageComplectation: () => import('@/components/offerPage/offer-page-complectation'),
		OfferPageMap: () => import('@/components/offerPage/offer-page-map'),
		CatalogItems: () => import('@/components/catalog/catalog-items'),
		SkeletonOfferPage: () => import('@/components/skeleton/skeleton-offer-page'),
	},
	data() {
		return {
			loading: true,
			title: true,
		}
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings',
			benefitsCredit: 'benefits/benefitsCredit'
		})
	},
	methods: {
		sendYandexCommercial() {
			if (process.client) {
				dataLayer.push({
					"ecommerce": {
						"detail": {
							"products": [
								{
									"id": this.offer.external_id,
									"name": `${this.offer.mark.title} ${this.offer.folder.title}, ${this.offer.year} года, ${this.offer.gearbox.title} ${this.offer.price} руб. - ${this.offer.external_id}`,
									"price": this.offer.price,
									"brand": this.offer.mark.title,
									"category": `'С пробегом/${this.offer.mark.title}/${this.offer.folder.title}/${this.offer.name}`,
									"quantity": 1
								}
							]
						}
					}
				})
			}
		},
	},
	props: {
		offer: Object,
	},
	// destroyed() {
	// 	this.loading = true
	// },
	mounted() {
		setTimeout(() => {
			this.loading = false
			this.sendYandexCommercial()
		}, 1000)
		if (this.offer) {
			_tmr.push({
				type: 'itemView',
				productid: this.offer.external_id,
				pagetype: 'product',
				list: '1',
				totalvalue: this.offer.price
			})
		}
		// let offers = document.querySelector('.catalog__items-line');
		// if(offers == null){
        //     this.title = false
		// }
	},
}
</script>
