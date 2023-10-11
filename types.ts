export interface Product {
    id: string;
    images: Image[];
    name: string;
    description: string;
    price: number;
    sizes: string[];
    categories: string[];
    colors: string[];
    currency: string;
    isNew: boolean;
    isFeatured: boolean
}

export interface Image {
    id: string;
    url: string;
}