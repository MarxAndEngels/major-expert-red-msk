<template>
	<div v-if="short"
	     class="offer__buttons offer__buttons--short">
		<!--<buttons-callback icon title="">-->
		<!--	<svg-icon name="phone" />-->
		<!--</buttons-callback>-->
		<div class="offer__price-actual">{{ offer.price | numberFormat }} ₽</div>
		<buttons-credit :offer="offer"
		                title="">
			Заказать звонок
			<!--от {{ creditPrice | numberFormat }} ₽/мес.-->
		</buttons-credit>
	</div>
	<div v-else-if="page"
	     class="offer__buttons offer__buttons--page">
		<buttons-credit :offer="offer"
		                title=""> 
					Заказать звонок
		</buttons-credit>
		<buttons-trade-in :offer="offer" />
		<!--		<buttons-callback :offer="offer" />-->
		<!--    <div class="offer__phone">-->
		<!--      <svg-icon class="offer__phone-icon" name="phone"/>-->
		<!--      <a :href="`tel:${settings.phone}`" class="offer__phone-link">{{ settings.phone }}</a>-->
		<!--    </div>-->
	</div>
	<div v-else-if="small"
	     class="offer__buttons offer__buttons--small">
		small
	</div>
</template>

<script>
import filters from "~/mixins/filters";
import {mapGetters} from "vuex";

export default {
	components:{
		ButtonsCredit: () => import('@/components/buttons/buttons-credit'),
		ButtonsTradeIn: () => import('@/components/buttons/buttons-trade-in'),
		ButtonsCallbackPhone: () => import('@/components/buttons/buttons-callback-phone'),
		ButtonsPhone: () => import('@/components/buttons/buttons-phone'),
	},
	mixins: [filters],
	props: {
		to: String,
		offer: Object,
		short: Boolean,
		long: Boolean,
		small: Boolean,
		page: Boolean,
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		}),
		
		creditPrice() {
			let percent = Number(this.settings.credit_percent.split('%')[0]);
			let n = 84;
			let coef_i = percent / 12 / 100;
			let K = (coef_i * Math.pow(1 + coef_i, n)) / (Math.pow(1 + coef_i, n) - 1);
			return Math.round(K * this.offer.price);
		}
	}
}
</script>