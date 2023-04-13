<template>
	<ul class="header__nav"
	    :class="{'header__nav--active':active}">
		<li class="header__link" v-if="item.title != 'Вакансии'"
		    v-for="item in nav"
		    :key="item.to">
			<nuxt-link :to="`/${item.to}`"
			           @click.native="$emit('click')">
				<span>{{ item.title }}</span>
			</nuxt-link>
		</li>
		<li class="header__link"  v-else>
			<a :href="`${item.to}`" target="__blank">
				<span>{{ item.title }}</span>
			</a>
		</li>
		<client-only>
			<li class="header__link">
				<span class="header__favorite-count" v-if="likesArray.length">
					{{ likesArray.length }}
				</span>
				<nuxt-link to="/favorites"
				           @click.native="$emit('click')">
					Избранное
				</nuxt-link>
			</li>
		</client-only>
	</ul>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
			likesArray: 'favorite/likesArray'
		}),
		nav() {
			return [
				{
					title: 'Авто с пробегом',
					to: this.catalogRoute
				},
				{
					title: 'Контакты',
					to: 'contacts'
				},
				{
					title: 'Об автосалоне',
					to: 'about'
				},
				{
					title: 'Вакансии',
					to: 'https://job.major-auto.ru/'
				},
			]
		}
	},
	props: {
		active: Boolean
	}
}
</script>