import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new Product',
        href: '/products/create',
    },
];

export default function ProductsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post('/products');
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new Product" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert>
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
                        <Input placeholder="Enter product name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="product_price">Product Price</Label>
                        <Input placeholder="Enter product price" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="product_description">Product Description</Label>
                        <Textarea
                            placeholder="Enter product description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>
                    <Button disabled={processing} type="submit">
                        Create Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
