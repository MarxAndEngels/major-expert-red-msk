<template>
	<div class='container'>
		<h1 class="h1__title">{{pageTitle}}</h1>
		<catalog-favorites/>
	</div>
</template>

<script>
import seoTags from "@/mixins/seoTags";

export default {
	components:{
		CatalogFavorites:()=> import('~/components/catalog/catalog-favorites')
	},
	mixins: [seoTags]
}
</script>
