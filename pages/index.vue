<template>
	<div class="main__page">
		<h1 class="h1__title h1__title--hidden">{{ pageTitle }}</h1>
			<client-only>
				<sliders-main />
			</client-only>
		<div class="container">
		<LazyHydrate when-visible>
			<lists-marks main />
		</LazyHydrate>
        

		<h2 class="h2__title">Последние поступления</h2>
		<LazyHydrate when-visible>
			<catalog-lazy
					:is-index="true"
					:has-filters="false"
					:has-lists="false"
					:has-pagination="false"
					:sort="'created_at|desc'"
					:limit="4" />
		</LazyHydrate>
		<nuxt-link
		           :to="`/${catalogRoute}`" class='wrapper__button-all-bg-image'>
				   <div class="button-all-bg-image">
				   </div>
				    <div class="button-all-bg-image_title">Все автомобили</div>
		</nuxt-link>
				</div>
	</div>
</template>
<script>
import {mapGetters} from "vuex";
import seoTags from "@/mixins/seoTags";
import LazyHydrate from 'vue-lazy-hydration';

export default {
	components: {
    LazyHydrate,
    CollectionsAlternative: () => import(/* webpackChunkName: "collections" */ "~/components/collections/collections-alternative"),
    ListsMarks: () => import(/* webpackChunkName: "lists-marks" */ "~/components/lists/lists-marks"),
    SlidersMain: () => import(/* webpackChunkName: "sliders-main" */ "~/components/sliders/sliders-main"),
    CatalogLazy: () => import(/* webpackChunkName: "catalog-lazy" */ "~/components/catalog/catalog-lazy"),
    ReviewsList: () => import(/* webpackChunkName: "catalog-lazy" */ "~/components/reviews/reviews-list"),
},
	mixins: [seoTags],
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute'
		})
	}
}
</script>