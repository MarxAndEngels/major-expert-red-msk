<template>
	<div class="generations"
	     ref="generations">
		<h2 class="h2__title">
			Поколения:
		</h2>
		<div class="generations__list">
			<loader v-if="!generations.length"
			        class="loader--generations-list">
			</loader>
			<nuxt-link v-else class="generations__list-item"
			           v-for="generation in generations"
			           :key='generation.id'
			           :to="'/'+ catalogRoute +'/'+ $route.params.mark + '/' + $route.params.folder + '/' + generation.slug">
				<div class="generations__list-item-title">{{ generation.name }}</div>
				<div class="generations__list-item-number">
					<span>
						{{ generation.offers_count }}
					</span>
					 авто</div>
				
			</nuxt-link>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	components:{
		Loader: () => import('@/components/loader/loader')
	},
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
			generations: 'generations/generations'
		})
	},
	methods: {
		toGeneration(generation) {
			this.$router.push({path: this.$route.fullPath, query: {generation: generation.slug}})
		}
	}
}
</script>
