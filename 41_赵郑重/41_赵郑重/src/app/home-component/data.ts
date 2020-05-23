import { Menu } from './menu';
import { Product } from 'src/product';
export const MENUS: Menu[] = [
    { name: '特性', url: '#' },
    { name: '企业', url: 'http://www.baidu.com' },
    { name: '支持', url: '#' },
    { name: '价格', url: '#' }
]
export const PRODUCTS: Product[] = [
    {
        category: '免费版', pricing: { price: 0, unit: '月' },
        features:
            ['10 users included',
                '2 GB of storage', 'Email support',
                'Email support',
                'Help center access'], action: '免费试用'
    },
    {
        category: '专业版', pricing: { price: 15, unit: '月' },
        features:
            ['20 users included',
                '10 GB of storage', 'Priority Email support',
                'Email support',
                'Help center access'], action: '立即试用'
    },
    {
        category: '企业版', pricing: { price: 29, unit: '月' },
        features:
            ['30 users included',
                '15 GB of storage', 'Phone and emailEmail support',
                'Email support',
                'Help center access'], action: '联系我们'
    }

];