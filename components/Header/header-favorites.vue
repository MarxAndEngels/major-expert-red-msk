<template>
	<nuxt-link to="/favorites" class="header__favorite">
		<span class="header__favorite-count" v-if="likesArray.length">
		{{likesArray.length}}
		</span>
		<svg-icon name="favorites"/>
	</nuxt-link>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	computed:{
		...mapGetters({
			likesArray: 'favorite/likesArray',
		})
	}
}
</script>