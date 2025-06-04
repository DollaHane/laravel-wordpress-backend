import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Adverts',
        href: '/adverts/create',
    },
];

type AdvertForm = {
    title: string;
    description: string;
    rental_cost: number;
};

export default function create() {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<AdvertForm>>({
        title: '',
        description: '',
        rental_cost: 5,
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post(route('adverts.create'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Adverts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit} className="space-y-6" method="POST">
                    <div className="grid gap-2">
                        <Label htmlFor="title">
                            Title:<span className="font-bold text-red-400">*</span>
                        </Label>
                        <Input
                            id="title"
                            placeholder="Title"
                            value={data.title}
                            onChange={(event) => setData('title', event.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">
                            Description:<span className="font-bold text-red-400">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(event) => setData('description', event.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="rental_cost">
                            Rental Price:<span className="font-bold text-red-400">*</span>
                        </Label>
                        <Input
                            id="rental_cost"
                            type="number"
                            value={data.rental_cost.toString()}
                            onChange={(event) => setData('rental_cost', Number(event.target.value))}
                        />
                        <InputError className="mt-2" message={errors.rental_cost} />
                    </div>
                    <Button disabled={processing}>Save</Button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600">Saved</p>
                    </Transition>
                </form>
            </div>
        </AppLayout>
    );
}
