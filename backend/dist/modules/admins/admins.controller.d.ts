import { AdminsService } from './admins.service';
import { Admins } from './admins.entity';
export declare class AdminsController {
    private readonly adminsService;
    constructor(adminsService: AdminsService);
    getAdminById(id: number): Promise<Admins>;
    getAllAdmins(): Promise<Admins[]>;
    createAdmin(adminData: Partial<Admins>): Promise<Admins>;
    updateAdmin(id: number, adminData: Partial<Admins>): Promise<Admins>;
    deleteAdmin(id: any): Promise<{
        message: string;
    }>;
}
