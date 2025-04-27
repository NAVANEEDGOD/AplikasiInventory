import { Repository } from 'typeorm';
import { Items } from './items.entity';
export declare class ItemsService {
    private readonly itemsRepository;
    constructor(itemsRepository: Repository<Items>);
    findAll(): Promise<Items[]>;
    findById(id: number): Promise<Items>;
    create(itemData: Partial<Items>): Promise<Items>;
    update(id: number, itemData: Partial<Items>): Promise<Items>;
    delete(id: number): Promise<{
        message: string;
    }>;
    getStockSummary(): Promise<{
        total_stok: number;
        total_nilai_stok: number;
        rata_rata_harga: number;
    }>;
    getItemsByCategory(categoryId: number): Promise<Items[]>;
}
