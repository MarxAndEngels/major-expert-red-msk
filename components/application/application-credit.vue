<template>
	<div>
		<benefits :benefits="benefitsCredit" />
		<div class="application__line">
			<div class="application__line-block">
				<forms-credit />
			</div>
			<div class="application__line-block">
				<application-bank />
				<texts-credit v-if="text" />
			</div>
		</div>
	</div>

</template>
<script>
import TextsCredit from "@/components/texts/texts-credit";
import {mapGetters} from "vuex";

export default {
	components: {
		Benefits: () => import('@/components/benefits/benefits'),
		FormsCredit: () => import('@/components/forms/forms-credit'),
		ApplicationBank: () => import('@/components/application/application-bank'),
		TextsCredit: () => import('@/components/texts/texts-credit'),
	},
	props: {
		text: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		...mapGetters({
			settings: 'settings/settings',
			benefitsCredit: 'benefits/benefitsCredit'
		}),
		advantages() {
			return [
				{
					name: `Ставка <br/> от ${this.settings.credit_percent}`
				},
				{
					name: `Первый взнос <br/>  от ${this.settings.credit_first}`
				},
				{
					name: `Одобрение ${this.settings.credit_approve}`
				},
				{
					name: `Скидка <br/> ${this.settings.sale_credit} ₽`
				},
			]
		}
	}
}
</script>