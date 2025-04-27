import { CategoriesService } from './categories.service';
import { Categories } from './categories.entity';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategoriesById(id: number): Promise<Categories>;
    getAllCategories(): Promise<Categories[]>;
    createCategory(categoryData: Partial<Categories>): Promise<Categories>;
    updateCategory(id: number, categoryData: Partial<Categories>): Promise<Categories>;
    deleteCategory(id: any): Promise<{
        message: string;
    }>;
}
