<template v-if="crumbs.length">
	<ul class="crumbs">
		<crumbs-item v-for="(item, index) in crumbs"
		             :key="index"
		             :disabled="index === crumbs.length - 1 "
		             :crumb="item" />
	</ul>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	components: {
		CrumbsItem: () => import('@/components/crumbs/crumbs-item'),
	},
	computed: {
		...mapGetters({
			crumbs: 'crumbs/crumbs'
		})
	}
}
</script>