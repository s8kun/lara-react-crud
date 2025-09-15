import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
}

type PageProps = {
    product: Product;
    errors?: Record<string, string>;
};

export default function ProductsEdit() {
    const { product, errors } = usePage<PageProps>().props;

    const { data, setData, put, processing } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
    });
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit Product',
            href: `/products/edit/${product.id}`,
        },
    ];

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleEdit} className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="size-4" />
                            <AlertTitle>Errors</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key} className="text-red-500">
                                            {message}
                                        </li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="gap-1.5">
                        <Label htmlFor="product_name">Product Name</Label>
                        <Input
                            id="product_name"
                            placeholder="Enter product name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="product_price">Product Price</Label>
                        <Input
                            id="product_price"
                            placeholder="Enter product price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="product_description">Product Description</Label>
                        <Textarea
                            id="product_description"
                            placeholder="Enter product description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Update Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
