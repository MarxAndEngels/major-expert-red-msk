<template>
	<div class="offer__page-map">
		<map-yandex-map/>
	</div>
</template>

<script>
export default {
	components:{
		MapYandexMap: () => import('@/components/map/map-yandex-map')
	},
}
</script>