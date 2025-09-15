import { Products } from '@/components/app-sidebar';
import { login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen items-center justify-center bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                {auth.user ? (
                    <Link
                        href={Products()}
                        className="rounded-md border border-[#19140035] px-6 py-2 text-lg font-medium hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                    >
                        Products
                    </Link>
                ) : (
                    <div className="flex gap-4">
                        <Link
                            href={login()}
                            className="rounded-md border border-transparent px-6 py-2 text-lg font-medium hover:border-[#19140035] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                        <Link
                            href={register()}
                            className="rounded-md border border-[#19140035] px-6 py-2 text-lg font-medium hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
