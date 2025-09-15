import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
}

export default function ProductsIndex() {
    const { flash, products } = usePage().props as unknown as {
        flash: { message: string };
        products: Product[];
    };

    const [showMessage, setShowMessage] = useState(flash.message ?? '');

    useEffect(() => {
        if (flash.message) {
            setShowMessage(flash.message);

            const timer = setTimeout(() => {
                setShowMessage('');
            }, 5000); // 5 ثواني

            return () => clearTimeout(timer);
        }
    }, [flash.message]);
    const { processing, delete: destroy } = useForm();
    const handleDelete = (id: number, name: string) => {
        if (confirm('Are you sure you want to delete the product ' + name + '?')) {
            destroy(`/products/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            {products.length > 0 ? (
                <div className="relative grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                        >
                            <div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-800">{product.name}</h3>
                                <p className="mb-3 text-sm text-gray-600">{product.description}</p>
                                <p className="mb-4 text-lg font-bold text-green-600">${product.price}</p>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <Link href={`/products/${product.id}/edit`}>
                                    <Button size="sm" variant="default">
                                        Edit
                                    </Button>
                                </Link>

                                <Button size="sm" variant="destructive" disabled={processing} onClick={() => handleDelete(product.id, product.name)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-4 text-center text-gray-500">No products found.</div>
            )}

            <div className="flex flex-col items-center justify-center p-6">
                <Link href={'/products/create'}>
                    <Button size="lg">Create New Product</Button>
                </Link>

                {showMessage && (
                    <div className="animate-fade-in absolute -top-2 mt-4 rounded-lg bg-green-100 px-4 py-2 text-green-700 shadow-md">
                        {showMessage}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
