<template>
	<div class="benefits">
		<benefits-item v-for="benefit in benefits"
		               :key="benefit.slug"
		               :benefit="benefit" />
	</div>
</template>

<script>

export default {
	components:{
		BenefitsItem: () => import('@/components/benefits/benefits-item'),
	},
	props: {
		benefits: Array
	}
}
</script>