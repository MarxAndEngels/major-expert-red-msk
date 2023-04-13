<template>
	<transition name="fade">
		<div v-if="modal && modalOffer" class="modal__wrapper">
			<div class="modal__overlay" @click="closeModal"></div>
			<div class="modal__content">
				<div class="modal__title">
					{{ modalTitle }}
				</div>
				<div class="modal__title modal__title--sub" v-if="modalSubTitle !== ''">
					{{ modalSubTitle }}
				</div>
				<div class="modal__close" @click="closeModal">
					<svg-icon name="close" />
				</div>
				<component modal :offer="this.modalOffer || false" :is="component" />
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from "vuex";
import modals from "@/mixins/modals";

export default {
	components: {
		FormsCredit: () => import('@/components/forms/forms-credit'),
		FormsCallback: () => import('@/components/forms/forms-callback'),
		FormsBuyout: () => import('@/components/forms/forms-buyout'),
		FormsTradeIn: () => import('@/components/forms/forms-trade-in')
	},
	mixins: [modals],
	computed: {
		...mapGetters({
			modal: 'modal/modal',
			modalType: 'modal/modalType',
			modalTitle: 'modal/modalTitle',
			modalSubTitle: 'modal/modalSubTitle',
			modalOffer: 'modal/modalOffer'
		}),
		component() {
			return `forms-${this.modalType}`
		}
	},
	mounted() {
		let self = this;
		window.addEventListener("popstate", function (e) {
			if (self.modal) {
				setTimeout(() => {
					self.closeModal();
				}, 100)
			}
		}, false);

	},
}
</script>