<template>
	<div class="text_wrapper">
		<p class="text__p">
			АЦ "{{ settings.dealer_title }}" сотрудничает с ведущими банками страны, благодаря этому Вы можете выбрать автокредит на самых выгодных условиях по низкой процентной ставке, рыночной цене и без постоянных формальных процедур оформления кредита.
			Наши специалисты подберут наилучший вариант автокредита. Окажут помощь в оформлении документов и будут сопровождать Вас на всех этапах сделки.
		</p>
		<p class="text__p">
Оставляйте свою заявку на выбранный автомобиль. Персонал нашего автоцентра рассмотрит вашу заявку.
			После чего вы сможете приехать к нам в автосалон, подписать все необходимые документы и получить свой автомобиль в максимально короткие сроки.

Мы рады предложить вам наиболее выгодные условия кредитования, в том числе без первоначального взноса.
		</p>
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