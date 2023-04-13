<template>
	<div>
		<benefits :benefits="benefitsTradeIn" />
		<div class="application__line">
			
			<div class="application__line-block">
				<forms-trade-in />
			</div>
			<div class="application__line-block">
				<texts-trade-in />
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	components: {
		Benefits: () => import('@/components/benefits/benefits'),
		TextsTradeIn: () => import('@/components/texts/texts-trade-in'),
		FormsTradeIn: () => import('@/components/forms/forms-trade-in'),
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings',
			benefitsTradeIn: 'benefits/benefitsTradeIn'
		})
	}
}
</script>