<template>
	<div>
		<benefits :benefits="benefitsBuyout" />
		<div class="application__line">
			<div class="application__line-block">
				<forms-buyout />
			</div>
			<div class="application__line-block">
				<texts-buyout />
			</div>
		</div>
	</div>

</template>
<script>
import {mapGetters} from "vuex";

export default {
	components: {
		Benefits: () => import('@/components/benefits/benefits'),
		FormsBuyout: () => import('@/components/forms/forms-buyout'),
		TextsBuyout: () => import('@/components/texts/texts-buyout'),
	},
	computed: {
		...mapGetters({
			benefitsBuyout: 'benefits/benefitsBuyout'
		})
	}
}
</script>