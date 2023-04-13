<template>
	<div class="application__line application__line--about">
		<div class="application__line-block ">
			<texts-about/>
			<!-- <img class="application__line-block-image lazyload" data-src="/img/about/about-1.webp" alt="about">
			<img class="application__line-block-image lazyload" data-src="/img/about/about-2.webp" alt="about"> -->
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	components: {
		TextsAbout: () => import('@/components/texts/texts-about'),
	},
	computed: {
		...mapGetters({
			settings: "settings/settings"
		})
	}
}
</script>
