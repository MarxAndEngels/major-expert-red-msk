<template>
	<div class="header__phone-wrapper">
		<a :href="`tel:${settings.phone}`"
		   class="header__phone">
			<span class="header__phone-number">{{ settings.phone }}</span>
			<!-- <svg-icon class="header__phone-icon"
			          name="phone" /> -->
		</a>
		<!-- <a class="header__email"
		   v-if="settings.email"
		   :href="`mailto:${settings.email}`">
			<span>{{ settings.email }}</span>
		</a> -->
	</div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	computed: {
		...mapGetters({
			settings: 'settings/settings'
		})
	}
}
</script>