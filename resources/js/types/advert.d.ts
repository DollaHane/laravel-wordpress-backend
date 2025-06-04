export type Advert = {
    id: string;
    title: string;
    description: string;
    user_email: string;
    rental_cost: number;
    available: number;
    return_date: string | null;
    created_at: string;
    updated_at: string;
};
