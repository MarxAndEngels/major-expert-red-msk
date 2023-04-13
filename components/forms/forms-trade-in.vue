<template>
	<div class="form form--credit">
		<div class="form__chose-car" v-if="!modal">
			<h3 class="h3__title">
				Выберите автомобиль
			</h3>
			<div class="selects">
				<div class="input__wrapper input__wrapper--form">
					<inputs-select :items="marks" :current-data="chosenMark" title="Марка" @selected="markSelect"
						class="select" />
				</div>
				<div class="input__wrapper input__wrapper--form">
					<inputs-select :items="folders" :current-data="chosenFolder" title="Модель"
						:disabled="folders.length === 0" @selected="folderSelect" class="select" />
				</div>
				<div class="offers__list" v-if="offers.length && !this.chosenOffer">
					<offer-small class="offer__small--form" @chose="choseOffer(offer)" chose :offer="offer"
						v-for="offer in offers" :key="offer.id" />
				</div>
				<div v-if="chosenOffer" class="offer__chosen">
					<div class="chose__another" @click="chosenOffer = null">
						Выбрать другой автомобиль -
					</div>
					<offer-small :offer="chosenOffer" />
				</div>
			</div>
		</div>
		<div class="error_text" v-if="error === 'choseCar'">
			Выберите автомобиль
		</div>
		<div class="modal__chosen" v-if="modal">
			<offer-small :offer="modalOffer" />
		</div>
		<h3 class="h3__title h3__title-top-8">
			Укажите данные вашего автомобиля
		</h3>
		<div class="inputs">
			<div class="input__wrapper input__wrapper--form"
				:class="{ 'input__wrapper--error': form.mark.valid === false }">
				<inputs-input placeholder="Марка" @input="handlerInput('mark')" v-model="form.mark.value" type="text" />
			</div>
			<div class="input__wrapper input__wrapper--form"
				:class="{ 'input__wrapper--error': form.model.valid === false }">
				<inputs-input placeholder="Модель" @input="handlerInput('model')" v-model="form.model.value"
					type="text" />
			</div>
		</div>
		<div class="inputs">
			<div class="input__wrapper input__wrapper--form"
				:class="{ 'input__wrapper--error': form.year.valid === false }">
				<inputs-select :items="years_range" :current-data="form.year" @selected="changeSelect($event, 'year')"
					class="select" />
			</div>
			<div class="input__wrapper input__wrapper--form"
				:class="{ 'input__wrapper--error': form.gearbox.valid === false }">
				<inputs-select :items="gearboxes" :current-data="form.gearbox"
					@selected="changeSelect($event, 'gearbox')" class="select" />
			</div>
		</div>
		<div class="personal__data">
			<h3 class="h3__title">
				Укажите свои данные
			</h3>
			<div class="input__wrapper" :class="{ 'input__wrapper--error': form.name.valid === false }">
				<inputs-input placeholder="ФИО" @input="handlerInput('name')" v-model="form.name.value" type="text" />
			</div>
			<div class="input__wrapper" :class="{ 'input__wrapper--error': form.date.valid === false }">
				<inputs-input placeholder="Дата рождения" @input="handlerInput('date')" v-model="form.date.value"
					mask="date" @dateMaskComplete="form.date.valid = true" @onincomplete="form.date.valid = null"
					type="tel" />
			</div>
			<div class="input__wrapper" :class="{ 'input__wrapper--error': form.phone.valid === false }">
				<inputs-input placeholder="Телефон" @input="handlerInput('phone')" v-model="form.phone.value"
					mask="phone" @phoneMaskComplete="form.phone.valid = true" @onincomplete="form.phone.valid = null"
					type="tel" />
			</div>
			<!--<inputs-checkbox :error="error==='agreeRf'"-->
			<!--                 @change="changeCheckbox($event,'agreeRf')"-->
			<!--                 title="Подтверждаю, что являюсь гражданином РФ" />-->
			<inputs-checkbox :error="error === 'agree'" @change="changeCheckbox($event, 'agree')" privacy
				:title="`Согласен на обработку <a href='/privacy' target='_blank'>персональных данных</a>`" />
			<buttons-form @click="submitForm('trade-in')" text="Оставить заявку на Trade-in" />
		</div>
	</div>
</template>

<script>
import formValidation from '~/mixins/formValidation'
import requests from '~/mixins/requests'
import { mapGetters } from "vuex";

export default {
	components: {
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
	mixins: [formValidation, requests],
	props: {
		modal: {
			type: Boolean,
			default: false
		}
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
			this.error = ''
			this.chosenOffer = offer

			this.offer = this.chosenOffer;
		},
		locationSelect(option) {
			this.form.location.value = option
		},
	},
	mounted() {
		if (this.modalOffer) {
			this.offer = this.modalOffer;
		}
	},
}
</script>