import { Repository } from 'typeorm';
import { Categories } from './categories.entity';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    findAll(): Promise<Categories[]>;
    findById(id: number): Promise<Categories>;
    create(categoryData: Partial<Categories>): Promise<Categories>;
    update(id: number, categoryData: Partial<Categories>): Promise<Categories>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
