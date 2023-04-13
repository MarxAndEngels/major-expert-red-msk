<template>
	<div class="catalog__filters-wrapper"
	     :class="{'catalog__filters-wrapper--main':main}">
		 <buttons-open-filter @click="showAll =! showAll" v-if='$device.isMobile'/>
		<div class="catalog__filters"
		     v-if="showFilters && showAll">
			<div class="filters__list"
			     :class="{'filters__list--index':main}">
				<div class="select__wrapper select__wrapper--filter"
				     v-for="filter in filtersList"
				     :key="filter.slug">
					<inputs-select
							:items="filters[filter.slug]"
							:title="filter.title"
							:disabled="isDisabled(filter.slug)"
							:range="filter.range"
							:current-data="$data[filter.slug] ? $data[filter.slug] : null"
							@selected="selected(filter.slug, $event)" />
				</div>
				<div class="select__wrapper select__wrapper--filter">
					<div class="wrapper__filter-item_price">
						<span class="filter-item_price_title">Цена от</span>
						<input type="text" inputmode="numeric" v-model="priceFrom" placeholder="Цена от ₽" class="input">
					</div>

				</div>
				<buttons-filter @click="filter" />
				<!--<div class="button button&#45;&#45;show"-->
				<!--     @click="showAll =! showAll"-->
				<!--     v-if="main">-->
				<!--	<span v-if="showAll">Скрыть фильтры -</span>-->
				<!--	<span v-else> Больше фильтров +</span>-->
				<!--</div>-->
			</div>
		
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import filters from "~/apollo/queries/offer/filters";

export default {
	components: {
		InputsSelect: () => import('@/components/inputs/inputs-select'),
		ButtonsFilter: () => import('@/components/buttons/buttons-filter'),
		ButtonsOpenFilter: () => import('@/components/buttons/buttons-open-filter'),
		CatalogSort: () => import('@/components/catalog/catalog-sort'),
	},
	data() {
		return {
			showAll: false,
			//тут прописываю нужные фильтры с параметрами
			filtersArray: [
				{
					title: 'Марка',
					slug: 'mark',
					dependence: ['queries', 'folder', 'generation']
				},
				{
					title: 'Модель',
					slug: 'folder',
					dependence: ['queries', 'generation']
				},
				{
					title: 'Год от',
					slug: 'year',
					type: 'yearFrom',
					isId: true,
					range: true,
					dependence: []
				},
				{
					title: 'Тип кузова',
					slug: 'bodyType',
					dependence: []
				},
				{
					title: 'Двигатель',
					slug: 'engineType',
					dependence: []
				},
				{
					title: 'Коробка',
					slug: 'gearbox',
					dependence: []
				},
			],
			chosen: {},
			mark: null,
			folder: null,
			generation: null,
			year: null,
			priceFrom: null,
			engineType: null,
			bodyType: null,
			gearbox: null,
		}
	},
	props: {
		main: Boolean,
		isIndex: Boolean
	},
	watch: {
		// отправляю запрос когда поменялся route (пагинация и query параметры)
		async '$route'() {
			await this.getFilters(this.filterParams)
		}
	},
	computed: {
		...mapGetters({
			catalogRoute: 'settings/catalogRoute',
			filters: 'filters/filters',
			showFilters: 'filters/showFilters'
		}),
		filtersList() {
			if (this.main) {
				return this.filtersArray.slice(0, 5)
				
			} else {
				return this.filtersArray.slice(0, 5)
			}
			
		},
		// параметры для запроса фильтров
		filterParams() {
			return {
				mark_slug_array: this.setParam('mark'),
				folder_slug_array: this.setParam('folder'),
				generation_slug_array: this.setParam('generation'),
				year_from: Number(this.$route.query.yearFrom),
				
				engine_type_id_array: this.engineType ? [this.engineType.id] : this.$route.query.engineType ? [Number(this.$route.query.engineType)] : null,
				body_type_id_array: this.bodyType ? [this.bodyType.id] : this.$route.query.bodyType ? [Number(this.$route.query.bodyType)] : null,
				gearbox_id_array: this.gearbox ? [this.gearbox.id] : this.$route.query.gearbox ? [Number(this.$route.query.gearbox)] : null,
			}
		},
		selectFilterParams() {
			return {
				mark_slug_array: this.setParam('mark'),
				folder_slug_array: this.setParam('folder'),
				generation_slug_array: this.setParam('generation'),
				year_from: Number(this.$route.query.yearFrom),
				engine_type_id_array: this.$route.query.engineType ? [Number(this.$route.query.engineType)] : null,
				body_type_id_array: this.$route.query.bodyType ? [Number(this.$route.query.bodyType)] : null,
				gearbox_id_array: this.$route.query.gearbox ? [Number(this.$route.query.gearbox)] : null
			}
		}
	},
	methods: {
		...mapActions({
			request: 'request/request'
		}),
		...mapMutations({
			setShowFilters: 'filters/SET_SHOW_FILTERS',
			setFilters: 'filters/SET_FILTERS',
			setFilterButtonClick: 'filters/SET_FILTER_BUTTON_CLICK'
		}),
		isDisabled(slug) {
			return this.filters[slug] === null
		},
		//функция помощник
		setParam(param) {
			if (param) {
				return this[param] ? [this[param].slug] : this.$route.params[param] ? [this.$route.params[param]] : null
			} else return null
		},
		selectPrice(priceFromServer){
			let formatter = new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
                });

				if(this.$route.query.price_from && this.priceFrom){
					this.priceFrom= formatter.format(this.$route.query.price_from);
				}
				else if(priceFromServer){
					this.priceFrom = formatter.format(priceFromServer)
				}
				if(this.$route.query.price_from && this.$route.name == 'category' && !this.mark){
					this.priceFrom= formatter.format(this.$route.query.price_from);
				}
				if(this.$route.params.mark && this.$route.params.folder && this.priceFrom && this.$route.query.price_from){
					this.priceFrom= formatter.format(this.$route.query.price_from);
				}
				if(this.$route.params.mark && this.priceFrom && this.$route.query.price_from){
					this.priceFrom= formatter.format(this.$route.query.price_from);
				}
		}, 
		//выбираю что-либо
		async selected(type, value) {
			this[type] = value
			//очищаю select-ы в зависимости от зависимостей
			let dependence = this.filtersArray.filter(item => item.slug === type)[0].dependence
			dependence.map(value => {
				if (value === 'folder') {
					this.folder = null
					if(this.mark && this.$route.params.mark){
						this.filter()
					}
				}
				if (value === 'generation') {
					this.generation = null
					if(this.mark && this.$route.params.mark){
						this.filter()
					}
				}
				if (value === 'queries') {
					this.year = null
					this.engineType = null
					this.bodyType = null
					this.gearbox = null
					this.priceFrom = null
				}
			})
			// запрос на фильтры с актуальными параметрами
			await this.getFilters(this.filterParams)
		},
		async getFilters(params) {
			try {
				let response = await this.request({
					query: filters,
					variables: params
				})
				this.setFilters(response.data.offerFilters)


				this.chosen = response.data.offerFilters.chosen
				// записываю в поля ответ с сервера, чтобы при перезагрузке стр все отображалось
				for (let key in this.chosen) {
					if (this.chosen[key]) {
						this[key] = this.chosen[key][0]
					}
				}
				//записывает цену с сервера
				this.selectPrice(response.data.offerFilters.price[0]);

			
				
			} catch (error) {
				console.log(error)
			}
		},
		
		async filter() {
			let pathParams = {
				mark: this.mark,
				generation: this.generation,
				folder: this.folder,
			}
			let queryParams = {
				yearFrom: this.year,
				engineType: this.engineType,
				bodyType: this.bodyType,
				gearbox: this.gearbox,
				sort: this.sort || null,
				price_from: this.priceFrom
				// owners: this.currentOwners,
				// driveType: this.currentDriveType,
				
			}
			await this.setFilterButtonClick(true)
			await this.$router.push({path: this.currentPath(pathParams), query: this.currentQueries(queryParams)})
		},
		currentPath(params) {
			let path = '/' + this.catalogRoute
			
			if (params.mark) {
				path += '/' + params.mark.slug
			}
			if (params.folder) {
				path += '/' + params.folder.slug
			}
			if (params.generation) {
				path += '/' + params.generation.slug
			}
			return path
		},
		currentQueries(params) {
			let queries = {}
			if (params.bodyType) {
				queries.bodyType = params.bodyType.id
			}
			if (params.yearFrom) {
				queries.yearFrom = params.yearFrom
			}
			if (params.owners) {
				queries.owners = params.owners.id
			}
			if (params.gearbox) {
				queries.gearbox = params.gearbox.id
			}
			if (params.driveType) {
				queries.driveType = params.driveType.id
			}
			if (params.engineType) {
				queries.engineType = params.engineType.id
			}
			if (params.sort) {
				queries.sort = params.sort
			}
			if (params.price_from) {
				//убирает лишнии символы при отправке
				params.price_from = String(params.price_from).replace(/\s/g, '').replace('₽', '');
				//убирает лишнии символы при отправке
				queries.price_from = Number(params.price_from)
			}
			return queries
		},
	},
	async fetch() {
		await this.getFilters(this.filterParams)
	},
	mounted(){
		if(!this.$device.isMobile){
			this.showAll = true
		}
	}
}
</script>