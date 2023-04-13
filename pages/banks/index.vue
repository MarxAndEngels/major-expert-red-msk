<template>
	<div class='container'>
		<h1 class="h1__title">{{pageTitle || 'Банки партнеры'}}</h1>
		<banks is-all/>
	</div>
</template>
<script>
import seoTags from "@/mixins/seoTags";

export default {
	components:{
		Banks:()=> import('~/components/banks/banks')
	},
	mixins: [seoTags]
}
</script>