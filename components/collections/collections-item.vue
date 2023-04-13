<template>
	<nuxt-link :to="currentRoute"
	           class="collections__item">
		<svg-icon class="collections__item-icon"
		          :name="`collections/${item.slug}.svg`" />
		<div class="collections__item-title">{{ item.title }}</div>
	</nuxt-link>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	props: {
		item: Object,
	},
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute'
		}),
		currentRoute(){
			return `${this.catalogRoute}?set=${this.item.slug}`
		}
	}
}
</script>