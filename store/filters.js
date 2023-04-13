export const state = () => ({
    filters: {},
    filterButtonClick: false,
    showFilters: true
})

export const getters = {
    filters(state) {
        return state.filters
    },
    showFilters(state) {
        return state.showFilters
    },
    filterButtonClick(state) {
        return state.filterButtonClick
    }
}

export const mutations = {
    SET_FILTERS(state, data) {
        state.filters = data
    },
    SET_SHOW_FILTERS(state, data) {
        state.showFilters = data
    },
    SET_FILTER_BUTTON_CLICK(state, data) {
        state.filterButtonClick = data
    },
}
