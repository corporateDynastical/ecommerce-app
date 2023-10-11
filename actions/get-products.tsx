import { Product } from '@/types';
import qs from 'query-string'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    name?: string;
    color?: string;
    size?: string;
    category?: string
}

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            color: query.color,
            size: query.size,
            name: query.name,
            category: query.category
        },
    });

    console.log(url);

    const res = await fetch(url);

    return res.json();
};

export default getProducts;