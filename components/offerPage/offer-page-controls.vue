<template>
	<div class="offer__page-controls">
		<div class="offer__page-controls-top">
			<offer-price page
			             :offer="offer" />
			<!-- <offer-controls page
			                :offer="offer" /> -->
		</div>
		<offer-buttons v-if="offer.is_active"
		               page
		               :offer="offer" />
		<!-- <div class="offer__page-controls-bottom">
			<a class="offer__page-controls-bottom-phone" v-if="settings.phone"
			   :href="`tel:${settings.phone}`">{{ settings.phone }}
			</a>
			<div class="offer__page-controls-bottom-callback" @click="callback">Обратный звонок
			</div>
		</div> -->
		
		<div class="offer__page-controls-bottom"
		     v-if="!offer.is_active">
			Нет в наличии
		</div>
	</div>
</template>

<script>
import filters from "@/mixins/filters";
import modals from "@/mixins/modals";
import {mapGetters} from "vuex";

export default {
	components:{
		OfferPrice: () => import('@/components/offer/offer-price'),
		OfferControls: () => import('@/components/offer/offer-controls'),
		OfferButtons: () => import('@/components/offer/offer-buttons'),
	},
	mixins: [filters, modals],
	props: {
		offer: Object
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		})
	},
	methods: {
		async credit() {
			await this.openModal({
				type: 'credit',
				title: `Заявка на автокредит`,
				offer: this.offer
			})
		},
		async exchange() {
			await this.openModal({
				type: 'tradein',
				title: 'Заявка на Trade-in',
				subTitle: 'Обменяйте свой автомобиль на выгодных условиях',
				offer: this.offer
			})
		},
		async testDrive() {
			await this.openModal({
				type: 'testdrive',
				title: 'Заявка на тест-драйв',
				subTitle: 'Наш менеджер перезвонит вам',
			})
		},
		// async callback() {
		// 	await this.openModal({
		// 		type: 'callback',
		// 		title: 'Заявка на обратный звонок',
		// 		subTitle: 'Наш менеджер перезвонит вам',
		// 	})
		// },
		async callback() {
			await this.openModal({
				type: 'callback',
				title: 'Заявка на обратный звонок',
				subTitle: 'Наш менеджер перезвонит вам',
				offer: this.offer
			})
		},
		
	},
}
</script>