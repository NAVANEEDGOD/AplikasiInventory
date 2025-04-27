"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const categories_entity_1 = require("./categories.entity");
let CategoriesService = class CategoriesService {
    categoriesRepository;
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async findAll() {
        try {
            const categories = await this.categoriesRepository.find();
            return categories;
        }
        catch (error) {
            throw new Error(`Gagal Mendapatkan Data Categori : ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const categorie = await this.categoriesRepository.findOne({ where: { id } });
            if (!categorie) {
                throw new Error(`Gagal Mendapatkan data Categori dengan id : ${id} `);
            }
            return categorie;
        }
        catch (error) {
            throw new Error(`Gagal Mendapatkan Data Categories : ${error.message}`);
        }
    }
    async create(categoryData) {
        try {
            const newCategories = await this.categoriesRepository.create(categoryData);
            return await this.categoriesRepository.save(newCategories);
        }
        catch (error) {
            throw new Error(`Gagal Membuat Data Categories Baru`);
        }
    }
    async update(id, categoryData) {
        try {
            const categorie = await this.categoriesRepository.findOne({ where: { id } });
            if (!categorie) {
                throw new Error(`Gagal Mendapatkan Data Categories , Update Gagal `);
            }
            await this.categoriesRepository.update(id, categoryData);
            return categorie;
        }
        catch (error) {
            throw new Error(`Gagal Update data categorie pada Id : ${id}`);
        }
    }
    async delete(id) {
        try {
            await this.categoriesRepository.delete(id);
            return { message: 'Delete data Successfuly' };
        }
        catch {
            throw new Error(`Gagal Menghapus Data Categories pada Id : ${id} `);
        }
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map