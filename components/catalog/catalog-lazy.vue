<template>
	<catalog :limit="limit"
	         :has-pagination="hasPagination"
	         :has-lists="hasLists"
	         :has-filters="hasFilters"
	         :is-index="isIndex"
	         :sort="sort" />
</template>

<script>
export default {
	components: {
		Catalog: () => import('@/components/catalog/catalog'),
	},
	props: {
		limit: Number,
		hasPagination: {
			type: Boolean,
			default: true
		},
		hasLists: {
			type: Boolean,
			default: true
		},
		hasFilters: {
			type: Boolean,
			default: true
		},
		sort: String,
		isIndex: Boolean
	}
}
</script>