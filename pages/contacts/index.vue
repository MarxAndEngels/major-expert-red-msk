<template>
  	<div class='container'>
	  <h1 class="h1__title">{{pageTitle || 'Контакты'}}</h1>
    <application-contacts/>
  </div>
</template>
<script>
import seoTags from "@/mixins/seoTags";

export default {
	components:{
		ApplicationContacts:()=> import('~/components/application/application-contacts')
	},
	mixins: [seoTags]
}
</script>
