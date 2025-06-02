import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import KeyDelete from '@/components/key-delete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Copy } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'API Keys',
        href: '/settings/keys',
    },
];

type KeyForm = {
    key_name: string;
    key_secret: string;
};

type Key = {
    created_at: string;
    id: string;
    key_name: string;
    key_secret: string;
    key_secret_short: string;
    updated_at: string;
    user_email: string;
};

export default function ApiKeys({ generatedKey, userKeys }: { generatedKey: string; userKeys: Key[] }) {
    // const { auth } = usePage<SharedData>().props;
    const [toggleKey, setToggleKey] = useState<boolean>(false);
    const [copiedText, copy] = useCopyToClipboard();

    // USE FORM HOOK
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<KeyForm>>({
        key_name: '',
        key_secret: generatedKey,
    });

    // FORM SUBMIT
    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        setToggleKey(false);
        post(route('keys.create'), {
            preserveScroll: true,
        });
        window.location.reload();
    };

    async function handleCopyText(event: Event) {
        event.preventDefault();
        await copy(generatedKey);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="API Keys" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="API Keys" description="Create and manage your API keys." />

                    {!toggleKey ? (
                        <div>
                            <Button onClick={() => setToggleKey(true)}>Create Key</Button>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">API Name</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.key_name}
                                    onChange={(e) => setData('key_name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="API name"
                                />

                                <InputError className="mt-2" message={errors.key_name} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="relative w-full">
                                    <p className="border-muted rounded-md border p-1 pl-3 font-semibold">{generatedKey}</p>
                                    <Button
                                        type="button"
                                        variant="icon"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            copy(generatedKey);
                                        }}
                                        className="absolute top-2 right-2 size-5 transform duration-75 hover:scale-[1.1] hover:cursor-pointer hover:text-orange-500"
                                    >
                                        <Copy className="size-5" />
                                    </Button>
                                </div>
                                <p className="text-muted-foreground text-sm italic">
                                    Save the above key in your Wordpress plugin settings page, this key will not be accessable after you click save.
                                    If you lose this key, a new one will need to be generated.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex flex-row gap-3">
                                    <Button disabled={processing}>Save</Button>
                                    <Button variant="secondary" onClick={() => setToggleKey(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600">Saved</p>
                    </Transition>
                    <hr />
                    <div className="flex flex-row">
                        {userKeys && userKeys.length === 0 ? (
                            <div className="text-muted-foreground text-sm italic">No API keys found.</div>
                        ) : (
                            <div className="flex w-full flex-col gap-3">
                                {userKeys.map((key: Key) => {
                                    return (
                                        <div key={key.id} className="flex w-full flex-col gap-3">
                                            <div className="flex w-full flex-row justify-between">
                                                <p className="font-semibold">Name: </p>
                                                <p className="font-semibold">Date Created:</p>
                                            </div>
                                            <div className="flex w-full flex-row justify-between">
                                                <p className="text-muted-foreground text-sm font-normal italic">{key.key_name}</p>
                                                <p className="text-muted-foreground text-sm italic">{key.created_at}</p>
                                            </div>
                                            <div className="flex w-full flex-row justify-between">
                                                <p className="text-muted-foreground text-sm italic">****************{key.key_secret_short}</p>
                                                <KeyDelete id={key.id} />
                                            </div>
                                            <hr />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
