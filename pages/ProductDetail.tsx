import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetailView } from '../components/ProductComponents';
import { products } from '../services/mockData';
import { Language } from '../i18n';

export const ProductDetail: React.FC<{ lang: Language }> = ({ lang }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === id);

    if (!product) return <div className="p-20 text-center">Product Not Found</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <ProductDetailView product={product} lang={lang} />
        </div>
    );
};
