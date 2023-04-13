<template>
	<div class="offer__title offer__title--small"
	     v-if="small">
		<div class="offer__title-name">{{ offer.name }}</div>
	</div>
	<div class="offer__title offer__title--long"
	     v-else-if="long">
		<div class="offer__title-mark">{{ offer.name }}</div>
	</div>
	<nuxt-link :to="to"
	           class="offer__title offer__title--short"
	           v-else-if="short">
		<div class="offer__title-mark">{{ offer.mark.title }}</div>
		<div class="offer__title-folder">{{ offer.folder.title }}</div>
		<!-- <div class="offer__title-power">{{ offer.engine_volume }} л.</div> -->
		<div> , </div>
		<div class="offer_year"> {{ offer.year }} г.</div>
		<!--<div class="offer__title-newline">-->
		<!--	-->
		
		<!--</div>-->
	</nuxt-link>

</template>

<script>
import {mapGetters} from "vuex";

export default {
	props: {
		to: String,
		offer: Object,
		short: Boolean,
		long: Boolean,
		small: Boolean,
	},
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
		})
	}
}
</script>