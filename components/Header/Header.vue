<template>
	<div>

	<div class="header"
	     :class="{'header--fixed': fixed, 'active': this.$route.params.id}">
		<div class="container">
			<div class="header__main">
				<header-logo @click="logoClick" />
				
				<client-only>
					<header-favorites />
				</client-only>
				
				<header-burger :active="openMenu"
				               @click="openMenu = !openMenu" />		   
				<header-nav :active="openMenu"
				            @click="openMenu = false" />
				<header-phone/>	
			</div>
		</div>
			<div class='wrapper__filter_top' v-if='!this.$route.params.id'>
				<div class="container">
					<catalog-filters/>
				</div>
			</div>
	</div>
	<!-- <div class="header">
		<div class="container">
			23123123
		</div>
	</div> -->
	</div>

</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
	components: {
		headerCity: () => import('./header-city'),
		headerPhone: () => import('./header-phone'),
		headerLogo: () => import('./header-logo'),
		headerFavorites: () => import('./header-favorites'),
		headerBurger: () => import('./header-burger'),
		headerNav: () => import('./header-nav'),
			CatalogFilters: () => import('@/components/catalog/catalog-filters'),
	},
	
	data() {
		return {
			openMenu: false,
			menuOpen: false,
		}
	},
	props: {
		fixed: Boolean
	},
	computed: {
		...mapGetters({
			domain: 'settings/domain'
		})
	},
	methods: {
		...mapActions({
			getLikes: 'favorite/getLikes',
			closeModal: 'modal/closeModal'
		}),
		logoClick() {
			this.openMenu = false
			this.closeModal()
		}
	},
	mounted() {
		this.getLikes()
	}
}
</script>