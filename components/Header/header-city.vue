<template>
	<div class="header__city">
		<div class="header__city-address">
			<span v-if="settings.city">г. {{ settings.city }} </span>
			<span v-if="settings.address"> {{ settings.address }} </span>
		</div>
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