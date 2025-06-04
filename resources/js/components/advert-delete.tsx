import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Button } from './ui/button';

type AdvertDeleteForm = {
    id: string;
};

export default function AdvertDelete({ id }: { id: string }) {
    const { delete: destroy } = useForm<Required<AdvertDeleteForm>>({ id });

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        destroy(route('adverts.delete', id));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Button type="submit" variant="icon" className="hover:text-red-500">
                <Trash2 />
            </Button>
        </form>
    );
}
