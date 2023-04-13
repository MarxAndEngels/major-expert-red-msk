<template>
	<div class="collections">
		<collections-item v-for="item in collections"
		                  :key="item.title"
		                  :item="item" />
	</div>
</template>

<script>

export default {
	components:{
		CollectionsItem: () => import(/* webpackChunkName: "collections" */ '~/components/collections/collections-item'),
	},
	data() {
		return {
			collections: [
				{
					title: 'Седаны',
					slug: 'sedan'
				},
				{
					title: 'Внедорожники',
					slug: 'allroad'
				},
				{
					title: 'Хэтчбеки',
					slug: 'hatchback'
				},
				{
					title: 'Лифтбеки',
					slug: 'liftback'
				},
				{
					title: 'Универсалы',
					slug: 'universal'
				},
			]
		}
	}
}
</script>