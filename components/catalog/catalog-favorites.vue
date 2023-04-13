<template>
	<div class="catalog__items catalog__items--favorite">
		<div class="catalog__items-line" v-if="liked_offers.length">
			<offer-catalog v-for="offer in liked_offers"
			              :key="offer.id"
			              :offer="offer" />
		</div>
		<div v-else>
			<div>
				<center>
					<h2 class='h2__title'>Добавляйте понравившиеся автомобили в избранное, чтобы быстро найти их в будущем. Товары будут отсортированы по дате добавления — чем позже добавлен, тем выше расположен. </h2>
					</center>
			</div>
		</div>
	</div>
</template>

<script>
import requests from "@/mixins/requests";

export default {
	mixins: [requests],
	components:{
		OfferCatalog: () => import('@/components/offer/offer-catalog'),
	},
	data() {
		return {
			loading: true,
			liked_offers: []
		}
	},
	mounted() {
		let external_id_array = localStorage.getItem('likes')?.split(',').map(i => Number(i))
		if (process.client && localStorage.getItem('likes')) {
			let variables = {
				external_id_array,
				limit: 0,
				page: 1
			}
			this.getFavoriteOffers(variables).then(result=>{
				this.liked_offers = result
			})
		} else {
			this.loading = false
		}
	}
}
</script>