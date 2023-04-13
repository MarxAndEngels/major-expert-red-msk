export const state = () => ({
    benefitsCredit: [  'credit_first',  'early_repayment','sale_credit','credit_approve'],
    benefitsTradeIn: ['market_price', 'trade_in_guarantee', 'credit_approve', 'sale_tradein'],
    benefitsBuyout: ['market_price', 'free', 'appraiser',  'fast_pay'],
    benefits: [
        {
            text: 'Ставка от ',
            slug: 'credit_percent',
            icon: 'percent'
        },
        {
            text: 'Первый взнос от ',
            slug: 'credit_first',
            icon: 'ruble'
        },
        {
            text: 'Одобрение',
            slug: 'credit_approve',
            icon: 'docs'
        },
        {
            text: 'Досрочное',
            slug: 'early_repayment',
            icon: 'guarantee'
        },
        {
            text: 'Скидка',
            slug: 'sale_credit',
            icon: 'ruble'
        },
        {
            text: 'Гарантия',
            slug: 'trade_in_guarantee',
            icon: 'guarantee'
        },
        {
            text: 'Выгода',
            slug: 'sale_tradein',
            icon: 'ruble'
        },
        {
            text: 'Рыночная цена',
            slug: 'market_price',
            icon: 'ruble'
        },
        {
            text: 'Мгновенная выплата',
            slug: 'fast_pay',
            icon: 'ruble'
        },
        {
            text: 'Бесплатная диагностика',
            slug: 'free',
            icon: 'guarantee'
        },
        {
            text: 'Выезд оценщика',
            slug: 'appraiser',
            icon: 'appraiser'
        },
    ]
})
export const getters = {
    benefits(state) {
        return state.benefits
    },
    benefit: (state) => {
        return state.benefit
    },
    benefitsCredit: (state) => {
        let arrayBenefits = state.benefits.filter((item) => {
            return state.benefitsCredit.indexOf(item.slug) !== -1;
        })
        arrayBenefits.sort((a, b) => b.text.localeCompare(a.text))
        return arrayBenefits
    },
    benefitsTradeIn: (state) => {
        return state.benefits.filter((item) => {
            return state.benefitsTradeIn.indexOf(item.slug) !== -1;
        })
    },
    benefitsBuyout: (state) => {
        return state.benefits.filter((item) => {
            return state.benefitsBuyout.indexOf(item.slug) !== -1;
        })
    },
    benefitsCar: (state) => {
        return state.benefits.filter((item) => {
            return state.benefitsCar.indexOf(item.slug) !== -1;
        })
    },
    benefitsCreditMobile: (state) => {
        return state.benefits.filter((item) => {
            return state.benefitsCreditMobile.indexOf(item.slug) !== -1;
        })
    },
    benefitModal: (state) => {
        return state.benefitModal
    },
}