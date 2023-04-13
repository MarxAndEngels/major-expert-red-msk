<template>
	<div id="marks"
	     ref="marks"
	     :class="{'marks--main': main}">
		<div class="list__marks list__marks--desktop"
		     :class="{'list__marks--short': !full, 'list__marks--all': full}">
			<nuxt-link class="marks__list--item"
			v-if="!(exception.includes(item.slug))"
			           :to="`/${catalogRoute}/${item.slug}`"
			           :class="{'active':$route.params.mark === item.slug}"
			           v-for="item in mark_list"
			           :key='item.id'>
					   
				<img :src="`/img/marks/${item.slug}.webp`" class="list__item-image" alt="marks" v-if="item.slug != 'lada-vaz'">
				<img :src="`/img/marks/lada.webp`" class="list__item-image" alt="marks" v-else-if="item.slug == 'lada-vaz'">
				<div class="wrapper__list-item_content">
					<div class="list__item-name">{{ item.title }}</div>
				<div class="list__item-number">
					<b>{{ item.offers_count }} </b> 
					<span>
						авто
					</span></div>
				</div>
	
			</nuxt-link>
		</div>
		<div class="list__marks list__marks--mobile"
		     :class="{'list__marks--short': !full, 'list__marks--all': full}">
			<nuxt-link class="marks__list--item"
			v-if="!(exception.includes(item.slug))"
			           :to="`/${catalogRoute}/${item.slug}`"
			           :class="{'active':$route.params.mark === item.slug}"
			           v-for="item in mark_list_mobile"
			           :key='item.id'>
				<img :src="`/img/marks/${item.slug}.webp`" class="list__item-image" alt="marks" v-if="item.slug != 'lada-vaz'">
				<img :src="`/img/marks/lada.webp`" class="list__item-image" alt="marks" v-else-if="item.slug == 'lada-vaz'">
				<div class="list__item-name">{{ item.title }}</div>
				<div class="list__item-number">{{ item.offers_count }}</div>
			</nuxt-link>
		</div>
		<div class="button button--more"
		     @click="clickMore">
			{{ full ? 'Меньше марок -' : 'Больше марок +' }}
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import declension from "@/mixins/declension";

export default {
	components:{
		listsMarksPopular: () => import('@/components/lists/lists-marks-popular'),
	},
	mixins: [declension],
	data() {
		return {
			full: false,
			exception:['vortex','alfa-romeo','bentley', 'cadillac', 'chrysler', 'dodge','hummer'],
			popular: [
				{
					title: 'Kia',
					slug: 'kia'
				},
				{
					title: 'Mazda',
					slug: 'mazda'
				},
				{
					title: 'Skoda',
					slug: 'skoda'
				},
				{
					title: 'Ford',
					slug: 'ford'
				},
				{
					title: 'Volkswagen',
					slug: 'volkswagen'
				},
				{
					title: 'Hyundai',
					slug: 'hyundai'
				}
			]
		}
	},
	props: {
		main: Boolean
	},
	methods: {
		async clickMore() {
			this.full = !this.full
			await window.scrollTo(0, this.$refs.marks.offsetTop - 160)
		}
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings',
			marks: 'marks/marks',
			popularMarks: 'marks/popularMarks',
			// marksCount: 'marks/marksCount',
			catalogRoute: 'settings/catalogRoute'
		}),
		mark_list() {
			// if (this.$device.isMobile) {
			// 	return this.full ? this.marks : this.marks.slice(0, 8)
			// }
			// return this.marks
			let marks = [...this.marks]
			if (!this.full) {
				let marksShowNumber = 25
				marks = marks.sort((a, b) => parseFloat(b.offers_count) - parseFloat(a.offers_count))
				marks = marks.slice(0, marksShowNumber)
				marks = marks.sort((a, b) => a.slug.toLowerCase().localeCompare(b.slug.toLowerCase()))
				return marks
			} else {
				return marks
			}
		},
		mark_list_mobile() {
			// if (this.$device.isMobile) {
			// 	return this.full ? this.marks : this.marks.slice(0, 8)
			// }
			// return this.marks
			let marks = [...this.marks]
			if (!this.full) {
				let marksShowNumber = 10
				marks = marks.sort((a, b) => parseFloat(b.offers_count) - parseFloat(a.offers_count))
				marks = marks.slice(0, marksShowNumber)
				marks = marks.sort((a, b) => a.slug.toLowerCase().localeCompare(b.slug.toLowerCase()))
				return marks
			} else {
				return marks
			}
		}
	},
}
</script>