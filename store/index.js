import settings from '~/apollo/queries/settings'
import marks from '~/apollo/queries/marks'
import {domains, mainDomain} from '~/app/variables'

export const actions = {
    async nuxtServerInit({dispatch, commit, state}, {app, req}) {

        let filteredDomain = domains.filter(value => value.domain === req.headers.host)
        let currentDomain = filteredDomain.length ?  filteredDomain[0] : mainDomain

        await commit('settings/SET_SITE_ID', currentDomain.siteId)
        await commit('settings/SET_DOMAIN', 'https://'+currentDomain.domain)
        await commit('settings/SET_CATALOG_ROUTE', currentDomain.catalogRoute)

        let client = app.apolloProvider.defaultClient
        let marksResponse = await client.query(
            {
                query: marks,
                variables: {
                    site_id: currentDomain.siteId
                }
            })
        let count = 0
        marksResponse.data.marks.map((item) => count += item.offers_count)
        await commit('marks/SET_MARKS', marksResponse.data.marks)
        await commit('marks/SET_MARKS_COUNT', count)

        let currentSettings = {}
        let settingsResponse = await client.query(
            {
                query: settings,
                variables: {
                    site_id: currentDomain.siteId
                }
            })
        settingsResponse.data.settings.settings.map(value => {
            currentSettings[value.key] = value.value
        })
        commit('settings/SET_SETTINGS', currentSettings)
    },

}