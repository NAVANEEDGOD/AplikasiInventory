import { Repository } from 'typeorm';
import { Admins } from './admins.entity';
export declare class AdminsService {
    private readonly adminsRepository;
    constructor(adminsRepository: Repository<Admins>);
    findAll(): Promise<Admins[]>;
    findById(id: number): Promise<Admins>;
    create(adminData: Partial<Admins>): Promise<Admins>;
    update(id: number, adminData: Partial<Admins>): Promise<Admins>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
