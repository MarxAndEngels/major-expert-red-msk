<template>
	<div class="contacts">
		<map-yandex-map class="contacts__map" />
		<div class="contacts__info">
			<div class="contacts__info-line"
			     v-if="settings[item.slug]"
			     v-for="item in info"
			     :key="item.name">
				<div class="contacts__info-name">
					{{ item.name }}:
				</div>
				<div class="contacts__info-info"
				     v-if="item.slug !== 'phone'">
					{{ settings[item.slug] }}
				</div>
				<a :href="`tel:${settings.phone}`"
				   class="contacts__info-info"
				   v-else>
					{{ settings.phone }}
				</a>
			</div>
			<!-- <buttons-callback /> -->
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	components: {
		MapYandexMap: () => import('@/components/map/map-yandex-map'),
		ButtonsCallback: () => import('@/components/buttons/buttons-callback'),
	},
	
	data() {
		return {
			info: [
				{
					name: 'Город',
					slug: 'city'
				},
				{
					name: 'Адрес',
					slug: 'address'
				},
				{
					name: 'E-mail',
					slug: 'email'
				},
				{
					name: 'Номер телефона',
					slug: 'phone'
				},
				{
					name: 'Режим работы',
					slug: 'work_schedule'
				}
			]
		}
	},
	computed: {
		...mapGetters({
			settings: "settings/settings"
		})
	}
}
</script>
