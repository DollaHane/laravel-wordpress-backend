import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Button } from './ui/button';

type KeyDeleteForm = {
    id: string;
};

export default function KeyDelete({ id }: { id: string }) {
    const { delete: destroy } = useForm<Required<KeyDeleteForm>>({ id });

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        destroy(route('keys.delete', id));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Button type="submit" variant="icon" className="hover:text-red-500">
                    <Trash2 />
                </Button>
            </form>
        </div>
    );
}
