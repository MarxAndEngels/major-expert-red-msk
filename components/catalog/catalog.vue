<template>
	<div class="catalog">
		<lists-main v-if="hasLists" />
				 
		 <catalog-items
		        class="carsItems mainCatalogCars"
				:sort="sort"
				:limit="limit" />

		<ul class="page" v-if="$route.name != 'index'">
    <li class="page__numbers" @click="paginate(1)" v-if="currentPagination > 2 "> 1 </li>
    <li class="page__numbers" @click="paginate(currentPagination-1)" v-if="currentPagination > 1 "> {{  currentPagination-1 }}</li>
    <li class="page__numbers active" @click="paginate()">{{ currentPagination }}</li>
    <li class="page__numbers" @click="paginate(currentPagination+1)" v-if="currentPagination != offersInfo.last_page">     {{  currentPagination+1 }}</li>
    <li class="page__dots" v-if="currentPagination != offersInfo.last_page">...</li>
    <li class="page__numbers" @click="paginate(offersInfo.last_page)" v-if="currentPagination != offersInfo.last_page">{{ offersInfo.last_page }}</li>
    <li class="page__btn" @click="paginate(currentPagination+1)" v-if="currentPagination != offersInfo.last_page"><span class="material-icons">Вперед</span></li>
  </ul>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
	components: {
		ListsMain: () => import('@/components/lists/lists-main'),
		CatalogFilters: () => import('@/components/catalog/catalog-filters'),
		CatalogItems: () => import('@/components/catalog/catalog-items')
	},
	watch: {
        "$route.query.page"() {
			let mainCatalogCars = document.querySelector('.mainCatalogCars');
			if(mainCatalogCars != undefined){
				setTimeout(()=>{
			    mainCatalogCars.scrollIntoView();
				window.scrollBy(0,-130)
			},80)
			}
        },
    },
	props: {
		limit: Number,
		hasPagination: {
			type: Boolean,
			default: true
		},
		hasLists: {
			type: Boolean,
			default: true
		},
		hasFilters: {
			type: Boolean,
			default: true
		},
		sort: String,
		isIndex: Boolean
	},
	methods: {
		...mapMutations({
			setView: 'view/SET_VIEW'
		}),
		paginate(pageNum){
			this.$router.push({path: this.$route.fullPath, query: {page: pageNum}});
		}
	},
	mounted() {
		if (this.isIndex) {
			this.setView('short')
		}
	},
	updated() {
		if(this.$route.query.bodyType != null || this.$route.query.page && this.$route.name != 'index'){
			let carsItems = document.querySelector('.carsItems');
			carsItems.scrollIntoView();
			window.scrollBy(0,-130)
		}
	},
	computed: {
		...mapGetters({
			offersInfo: 'offers/offersInfo'
		}),
    currentPagination() {
      return Number(this.$route.query.page ? this.$route.query.page : 1)
    },
}
}
</script>