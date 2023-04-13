<template>
	<div class='container'>
		<h1 class="h1__title h1__title--hidden">{{pageTitle}}</h1>
		<offer-page :offer="offer"
		            :loaded="loaded" />
	</div>
</template>
<script>
import offer from '~/apollo/queries/offer/offer.gql'
import {mapActions, mapGetters} from "vuex";
import seoTags from "~/mixins/seoTags";
import validateCategory from "~/mixins/validateCategory";

export default {
	components:{
		OfferPage:()=> import('~/components/offerPage')
	},
	mixins: [seoTags, validateCategory],
	data() {
		return {
			loaded: true,
			offer: null
		}
	},
	computed: {
		...mapGetters({
			site_id: 'settings/site_id'
		})
	},
	methods: {
		...mapActions({
			request: 'request/request'
		})
	},
	async fetch() {
		try {
			let response = await this.request({
				query: offer,
				variables:{
					site_id: this.site_id,
					dateFormat: 'j F Y года.',
					mark_slug: this.$route.params.mark,
					folder_slug: this.$route.params.folder,
					external_id: Number(this.$route.params.id)
				}
			})
			this.offer = response.data.offer
		} catch (error) {
			console.log(error)
			this.$nuxt.error({statusCode: 404})
		}
	},
	mounted() {
		setTimeout(() => {
			window.scroll(0,0)
		}, 110)
	},
}
</script>
