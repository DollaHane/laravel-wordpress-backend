import { Advert } from '@/types/advert';
import { Check, Image, X } from 'lucide-react';
import AdvertDelete from './advert-delete';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';

interface AdvertCardProps {
    advert: Advert;
}

export default function AdvertCard({ advert }: AdvertCardProps) {
    return (
        <div>
            <Card>
                <CardContent className="relative flex gap-5">
                    <div className="border-muted-foreground bg-muted size-44 rounded-lg border p-10">
                        <Image className="size-full" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <CardTitle>{advert.title}</CardTitle>
                        <CardDescription>{advert.description}</CardDescription>
                        <p>
                            Rental Rate:<span className="text-muted-foreground pl-3 text-sm">{advert.rental_cost} p/day</span>
                        </p>
                        <p>
                            Created:<span className="text-muted-foreground pl-3 text-sm">{advert.created_at}</span>
                        </p>
                        <div className="flex flex-row items-center gap-3">
                            <p>Available:</p>
                            {advert.available === 1 ? (
                                <div className="flex size-5 items-center justify-center rounded-full bg-green-500">
                                    <Check className="size-4 text-white" />
                                </div>
                            ) : (
                                <div className="flex size-5 items-center justify-center rounded-full bg-orange-500">
                                    <X className="size-4 text-white" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="absolute top-0 right-3 flex">
                        <AdvertDelete id={advert.id} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
