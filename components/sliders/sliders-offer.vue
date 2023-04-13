<template>
	<div ref="offerSlider"
	     class="carousel carousel--offer">
		<div class="carousel__slide"
		     v-for="image in images"
		     :key="image.medium_webp">
			<img class="offer__page-slide"
			     :src="image.medium_webp"
			     :data-src="image.original"
			     data-fancybox="gallery"
			     alt="фото автомобиля" />
		</div>
	</div>
</template>

<script>
import {Carousel} from "@fancyapps/ui";

export default {
	props: {
		offer: Object
	},
	computed: {
		images() {
			return this.offer?.images || []
		}
	},
	mounted() {
		const slider = new Carousel(this.$refs.offerSlider, {
			'center': false
		});
	}
}
</script>