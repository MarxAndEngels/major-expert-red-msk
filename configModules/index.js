export const redirects = [
    { from: '^/cars', to: '/used' },
    {
        from: '^/cars/(.*)$',
        to: '/used/$1',
        statusCode: 301
    }
]