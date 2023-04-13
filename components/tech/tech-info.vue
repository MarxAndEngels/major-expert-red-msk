<template>
	<div class="tech tech--short"
	     v-if="short">
		<div v-if="tech.small" v-for="tech in techs"
		     :key="tech.slug"
		     class="tech__item">
			<div class="tech__item-info">
				{{ offer[tech.slug].title || offer[tech.slug] | numberFormat }} {{ tech.postfix }}
			</div>
		</div>
	</div>
	<div class="tech tech--small"
	     v-else-if="small">
		<div v-for="tech in techs"
		     :key="tech.slug"
		     class="tech__item">
			<div class="tech__item-info">
				{{ offer[tech.slug].title || offer[tech.slug] | numberFormat }} {{ tech.postfix }}
			</div>
		</div>
	</div>
	<div class="tech tech--page"
	     v-else-if="page">
		<div v-for="tech in techs"
		     :key="tech.slug"
		     class="tech__item">
			<!-- <svg-icon v-if="tech.slug !== 'color'"
			          class="tech__item-icon"
			          :name="`tech/${tech.icon}.svg`" />
			<div v-else
			     :style="{backgroundColor:offer[tech.slug].name}"
			     class="tech__color"></div> -->
			<div class='tech__item-descr'>{{  tech.name }}: </div>
			<div class="tech__item-info">
				{{ offer[tech.slug].title || offer[tech.slug] | numberFormat }} {{ tech.postfix }}
			</div>
		</div>
	</div>
</template>

<script>
import filters from "@/mixins/filters";

export default {
	props: {
		offer: Object,
		short: Boolean,
		long: Boolean,
		small: Boolean,
		page: Boolean
	},
	data() {
		return {
			techs: [
				{
					name: 'Пробег',
					slug: 'run',
					icon: 'icon-mileage',
					postfix: 'км',
					small: true
				},
				{
					name: 'Объем двигателя',
					slug: 'engine_volume',
					icon: 'icon-volume',
					postfix: 'л.',
					small: false
				},
				{
					name: 'Мощность',
					slug: 'engine_power',
					icon: 'icon-engine',
					postfix: 'л.с.',
					small: false
				},
				{
					name: 'Коробка',
					slug: `gearbox`,
					icon: 'icon-gear',
					postfix: '',
					small: true
				},
				{
					name: 'Кол-во вл.',
					slug: `owner`,
					icon: 'icon-owners',
					postfix: '',
					small: false
				},
				{
					name: 'Тип двигателя',
					slug: `engineType`,
					icon: 'icon-fuel',
					postfix: '',
					small: false
				},
				{
					name: 'Привод',
					slug: `driveType`,
					icon: 'icon-wd',
					postfix: '',
					small: true
				},
				{
					name: 'Тип кузова',
					slug: `bodyType`,
					icon: 'icon-form',
					postfix: '',
					small: false
				},
				{
					name: 'Цвет',
					slug: `color`,
					icon: '',
					postfix: '',
					small: false
				},
			]
		}
	},
	mixins: [filters]
}
</script>