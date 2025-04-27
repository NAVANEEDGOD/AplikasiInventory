import { Repository } from 'typeorm';
import { Suppliers } from './suppliers.entity';
export declare class SuppliersService {
    private readonly suppliersRepository;
    constructor(suppliersRepository: Repository<Suppliers>);
    findAll(): Promise<Suppliers[]>;
    findById(id: number): Promise<Suppliers>;
    create(supplierData: Partial<Suppliers>): Promise<Suppliers>;
    update(id: number, supplierData: Partial<Suppliers>): Promise<Suppliers>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
