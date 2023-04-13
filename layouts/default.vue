<template>
	<div class="wrapper"
	     :class="{'wrapper--fixed': fixed}"
	     tabindex="0"
	     @keyup.esc="closeModal">
		<Header :fixed="fixed" />
		<div>
			<transition name="page">
				<Nuxt />
			</transition>
			<div v-if="isBanks">
				<h2 class="h2__title">Банки партнеры</h2>
				<banks />
			</div>
			<!-- <div v-if="isContacts">
				<h2 class="h2__title">Контакты</h2>
				<application-contacts />
			</div> -->
		</div>
		<modal-main />
		<modal-autoteka />
		<Footer />
		<cookie />
		<!--<callback-modal/>-->
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import ApplicationContacts from "@/components/application/application-contacts";
import metrika from "@/mixins/metrika";

export default {
	components: {
		Header: () => import('@/components/Header/Header'),
		Footer: () => import('@/components/Footer/Footer'),
		Crumbs: () => import('@/components/crumbs/crumbs'),
		Banks: () => import('@/components/banks/banks'),
		ModalMain: () => import('@/components/modal/modal-main'),
		ModalAutoteka: () => import('@/components/modal/modal-autoteka'),
		Cookie: () => import('@/components/cookie/cookie'),
		ApplicationContacts: () => import('@/components/application/application-contacts'),
	},
	mixins: [metrika],
	data() {
		return {
			fixed: true
		}
	},
	computed: {
		isBanks() {
			return false
		},
		isContacts() {
			return this.$route.name !== 'contacts' && this.$route.name !== 'category-mark-folder-generation-id'
		}
	},
	mounted() {
		// window.addEventListener('scroll', this.handleScroll);
		this.getUrlParams()
		this.clearLocalStorage()
	},
	methods: {
		...mapActions({
			closeModal: 'modal/closeModal'
		}),
		// handleScroll() {
		// 	this.fixed = window.scrollY >= 24;
		// },
		getUrlParams() {
			if (this.$route.query) {
				for (let param in this.$route.query) {
					if (
							param === 'utm_source'
							|| param === 'utm_medium'
							|| param === 'utm_term'
							|| param === 'utm_content'
							|| param === 'utm_campaign') {
						localStorage.setItem(param, this.$route.query[param])
					}
				}
			}
		},
		clearLocalStorage() {
			localStorage.removeItem('modificationTop');
			localStorage.removeItem('firstCome');
			localStorage.removeItem('modificationLeft');
		},
	}
}
</script>
