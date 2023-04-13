<template>
	<div class='container'>
		<h1 class="h1__title h1__title--no-mb">{{pageTitle}}</h1>
		<!--<lists-catalog/>-->
		<catalog/>
	</div>
</template>
<script>
import seoTags from "@/mixins/seoTags";
import validateCategory from "@/mixins/validateCategory";

export default {
	components:{
		Catalog:()=> import('~/components/catalog/catalog')
	},
	mixins: [seoTags, validateCategory],
}
</script>