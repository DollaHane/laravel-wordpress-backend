import AdvertCard from '@/components/advert-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Advert } from '@/types/advert';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Adverts',
        href: '/adverts',
    },
];

export default function adverts({ adverts }: { adverts: Advert[] }) {
    console.log('ad:', adverts);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Your Adverts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {adverts.length > 0 ? adverts.map((ad) => <AdvertCard key={ad.id} advert={ad} />) : <p>No adverts created.</p>}
            </div>
        </AppLayout>
    );
}
