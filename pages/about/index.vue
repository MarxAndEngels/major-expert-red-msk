<template>
	<div class='container'>
	  <h1 class="h1__title">{{pageTitle}}</h1>
	  <application-about/>
	  <nuxt-link
		           :to="`/${catalogRoute}`" class='wrapper__button-all-bg-image'>
				   <div class="button-all-bg-image">
				   </div>
				    <div class="button-all-bg-image_title">Все автомобили</div>
		</nuxt-link>
  </div>
</template>

<script>
	import {mapGetters} from "vuex";
import seoTags from "@/mixins/seoTags";

export default {
	components:{
		ApplicationAbout:()=> import('~/components/application/application-about')
	},
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute'
		})
	},
	mixins: [seoTags]
}
</script>