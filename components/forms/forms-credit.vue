<template>
	<div class="form form--credit">
		<div class="form__chose-car"
		     v-if="!modal">
			<h3 class="h3__title">
				Выберите автомобиль
			</h3>
			<div class="selects">
				<div class="input__wrapper input__wrapper--form">
					<inputs-select :items="marks"
					               :current-data="chosenMark"
					               title="Марка"
					               @selected="markSelect"
					               class="select" />
				</div>
				<div class="input__wrapper input__wrapper--form">
					<inputs-select :items="folders"
					               :current-data="chosenFolder"
					               title="Модель"
					               :disabled="folders.length === 0"
					               @selected="folderSelect"
					               class="select" />
				</div>
				<div class="offers__list"
				     v-if="offers.length && !this.chosenOffer">
					<offer-small class="offer__small--form"
					             @chose="choseOffer(offer)"
					             :offer="offer"
					             chose
					             v-for="offer in offers"
					             :key="offer.id" />
				</div>
				<div v-if="chosenOffer"
				     class="offer__chosen">
					<div class="chose__another"
					     @click="chosenOffer = null">
						Выбрать другой автомобиль -
					</div>
					<offer-small :offer="chosenOffer" />
				</div>
			</div>
		</div>
		<div class="error_text"
		     v-if="error === 'choseCar'">
			Выберите автомобиль
		</div>
		<div class="modal__chosen" v-if="modal">
			<offer-small :offer="modalOffer" />
		</div>
	
		<div class="personal__data">
			<h3 class="h3__title">
				Укажите свои данные
			</h3>
			<div class="input__wrapper"
			     :class="{'input__wrapper--error': form.name.valid === false}">
				<inputs-input placeholder="ФИО"
				              @input="handlerInput('name')"
				              v-model="form.name.value"
				              type="text" />
			</div>
			
			<div class="input__wrapper"
			     :class="{'input__wrapper--error': form.phone.valid === false}">
				<inputs-input placeholder="Телефон"
				              @input="handlerInput('phone')"
				              v-model="form.phone.value"
				              mask="phone"
				              @phoneMaskComplete="form.phone.valid = true"
				              @onincomplete="form.phone.valid = null"
				              type="tel" />
			</div>
			<!-- <inputs-checkbox :error="error==='agreeRf'"
			                 @change="changeCheckbox($event,'agreeRf')"
			                 title="Подтверждаю, что являюсь гражданином РФ" /> -->
			<inputs-checkbox :error="error==='agree'"
			                 @change="changeCheckbox($event,'agree')"
			                 privacy
			                 :title="`Согласен на обработку <a href='/privacy' target='_blank'>персональных данных</a>`" />
			<buttons-form @click="submitForm('credit')"
			              text="Отправить" />
		</div>
	</div>
</template>

<script>
import formValidation from '~/mixins/formValidation'
import requests from '~/mixins/requests'
import {mapGetters} from "vuex";
import filters from "@/mixins/filters";

export default {
	components:{
		ButtonsForm: () => import('@/components/buttons/buttons-form'),
		InputsCheckbox: () => import('@/components/inputs/inputs-checkbox'),
		InputsInput: () => import('@/components/inputs/inputs-input'),
		InputsSelect: () => import('@/components/inputs/inputs-select'),
		OfferSmall: () => import('@/components/offer/offer-small'),
		InputsRange: () => import('@/components/inputs/inputs-range'),
		TippyQuestion: () => import('@/components/tippy/tippy-question'),
	},
	data() {
		return {
			firstCreditCarCalculation: 0,
			creditRange: [
				'61 дн',
				'6 мес',
				'12 мес',
				'24 мес',
				'36 мес',
				'48 мес',
				'60 мес',
				'72 мес',
				'84 мес'
			],
			contributionRange: [
				'0 %',
				'10 %',
				'20 %',
				'30 %',
				'40 %',
				'50 %',
				'60 %',
				'70 %',
				'80 %'
			],
			total: null,
			offer: null,
			chosenMark: null,
			chosenFolder: null,
			chosenOffer: null,
			folders: [],
			offers: []
		}
	},
	computed: {
		...mapGetters({
			modalOffer: 'modal/modalOffer',
			settings: 'settings/settings'
		})
	},
	mixins: [formValidation, requests, filters],
	props: {
		modal: {
			type: Boolean,
			default: false
		},
		bank: String
	},
	methods: {
		async markSelect(option) {
			this.chosenMark = option
			this.folders = await this.getFolders(this.chosenMark.slug, false)
			this.error = ''
		},
		async folderSelect(option) {
			this.chosenFolder = option
			this.offers = await this.getOffers({
				mark_slug_array: [this.chosenMark.slug],
				folder_slug_array: [this.chosenFolder.slug],
				page: 1,
				limit: 20
			}, false)
			this.error = ''
		},
		async choseOffer(offer) {
			this.chosenOffer = offer
			this.error = ''

			this.offer = this.chosenOffer;
			this.calculate()
		},
		locationSelect(option) {
			this.form.location.value = option
		},
		calculate() {
			if (!!this.offer) {
				let creditProc = this.installment ? 0.001 : Number(this.settings.credit_percent.split('%')[0]);
				let car_price = this.offer.price;
				let creditTime = Number(this.form.periodValue.replace(/[^+\d]/g, ''))
				let firstPay = Number(this.form.paymentValue.replace(/[^+\d]/g, ''))

				this.firstCreditCarCalculation = Number( Number(car_price*firstPay/100).toFixed(0) );
				
				if(creditTime === 61){
					creditTime = 2
				}
				
				let A = 0;
				let i = creditProc / 12 / 100;
				let n = creditTime;
				let S
				if (firstPay !== 0) {
					S = car_price - (car_price * firstPay) / 100;
				} else {
					S = car_price;
				}
				this.paymentPriceValue = ((car_price * firstPay) / 100).toString() + ` руб. (${firstPay}%)`
				let K = 0;
				if (car_price) {
					K = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
					A = Math.round(K * S);
					this.total = String(A).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " ₽"
					//для отображения в блоке рядом с выбранным банком
					// this.setPeriodValue(this.periodValue)
					// this.setMonthPaymentValue(A)
					//
				}
			}
		},
		rangeInputTime() {
			this.form.periodValue = this.creditRange[event.target.value]
			this.calculate()
		},
		rangeInputContribution() {
			this.form.paymentValue = this.contributionRange[event.target.value]
			this.calculate()
		}
	},
	mounted() {
		if (this.modalOffer) {
			this.offer = this.modalOffer;
		}
		this.calculate()
	},
}
</script>