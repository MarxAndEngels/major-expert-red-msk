<template>
	<div class="benefits__item">
		<div class="benefits__item-line">
			<svg-icon class="benefits__item-icon"
			          :name="`benefits/${benefit.icon}.svg`" />
			<div class="benefits__item-text">
				{{ benefit.text }}
			</div>
			<div v-if="settings[benefit.slug]"
			     class="benefits__item-slug">
				{{ settings[benefit.slug] }}
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	props: {
		benefit: Object
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		})
	}
}
</script>