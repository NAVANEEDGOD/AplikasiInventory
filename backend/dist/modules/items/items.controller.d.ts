import { ItemsService } from './items.service';
import { Items } from './items.entity';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    getItemsByCategory(categoryId: number): Promise<Items[]>;
    getStockSummary(): Promise<{
        total_stok: number;
        total_nilai_stok: number;
        rata_rata_harga: number;
    }>;
    getItemsById(id: number): Promise<Items>;
    getAllItems(): Promise<Items[]>;
    createItem(itemData: Partial<Items>): Promise<Items>;
    updateItem(id: number, itemData: Partial<Items>): Promise<Items>;
    deleteItem(id: number): Promise<{
        message: string;
    }>;
}
