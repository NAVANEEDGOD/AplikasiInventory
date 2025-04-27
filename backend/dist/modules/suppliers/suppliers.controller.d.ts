import { SuppliersService } from './suppliers.service';
import { Suppliers } from './suppliers.entity';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    getSuppliersById(id: number): Promise<Suppliers>;
    getAllSuppliers(): Promise<Suppliers[]>;
    createSupplier(supplierData: Partial<Suppliers>): Promise<Suppliers>;
    updateSupplier(id: number, supplierData: Partial<Suppliers>): Promise<Suppliers>;
    deleteSupplier(id: any): Promise<{
        message: string;
    }>;
}
