export const apiDomain = 'api.avtomirmsk.ru'
export const apiSlug = 'avtomirmsk'
export const domains = [
    //первый домен ГЛАВНЫЙ и используется для 'DEV'
    //если домен на кириллице, то домен в punycode
    {
        domain: 'xn--80athiajdig.xn--p1ai', //кармоторс.рф
        siteId: 92,
        catalogRoute: 'used',
        root: false
    },
    {
        domain: 'avtomirmsk.ru',
        siteId: 136,
        catalogRoute: 'used',
        root: true
    },

]
export const mainDomain = domains.filter(value => value.root === true)[0]