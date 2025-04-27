import { Categories } from '../categories/categories.entity';
import { Suppliers } from '../suppliers/suppliers.entity';
import { Admins } from '../admins/admins.entity';
export declare class Items {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category_id: Categories;
    supplier_id: Suppliers;
    created_by: Admins;
    created_at: Date;
    updated_at: Date;
}
