<template>
	<div ref="mainSlider"
	     class="carousel carousel--main">
		<div class="carousel__slide"
		     v-for="slide in slides"
		     :key="slide.text">
			<img class="slide__image lazyload"
			     :data-src="`img/sliders/main/slider-index-${slide.image}.png`"
			     alt="image" >
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import {Carousel} from "@fancyapps/ui";

export default {
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
			settings: 'settings/settings'
		}),
		slides() {
			return [
				// {
				// 	title: `Автокредит от ${this.settings.credit_percent}`,
				// 	text: `со скидкой ${this.settings.sale_credit}`,
				// 	image: '1',
				// 	button: {
				// 		text: 'Выбрать автомобиль',
				// 		link: this.catalogRoute
				// 	}
				// },
				{
					title: `Зачем тратить больше?`,
					text: `Выгода до 200 000 ₽`,
					image: '1',
					button: {
						text: 'Выбрать автомобиль',
						link: this.catalogRoute
					}
				},
				{
					title: 'Trade-in',
					text: `с выгодой ${this.settings.sale_tradein}`,
					image: '2',
					button: {
						text: 'Выбрать автомобиль',
						link: 'exchange'
					}
				},
				{
					title: 'Выкупим ваш автомобиль',
					text: 'профессиональный выкуп авто',
					image: '3',
					button: {
						text: 'Оставить заявку',
						link: 'buyout'
					}
				},
			]
		}
	},
	mounted() {
		const slider = new Carousel(this.$refs.mainSlider, {
			'center': true,
		});
	}
}
</script>