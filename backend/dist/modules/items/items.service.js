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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const items_entity_1 = require("./items.entity");
let ItemsService = class ItemsService {
    itemsRepository;
    constructor(itemsRepository) {
        this.itemsRepository = itemsRepository;
    }
    async findAll() {
        try {
            const items = await this.itemsRepository.find();
            return items;
        }
        catch (error) {
            throw new Error(`Gagal Mendapatkan Data Item : ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const item = await this.itemsRepository.findOne({ where: { id } });
            if (!item) {
                throw new Error(`Gagal Mendapatkan data Suplier dengan id : ${id} `);
            }
            return item;
        }
        catch (error) {
            throw new Error(`Gagal Mendapatkan Data Item : ${error.message}`);
        }
    }
    async create(itemData) {
        try {
            const newItem = await this.itemsRepository.create(itemData);
            return await this.itemsRepository.save(newItem);
        }
        catch (error) {
            throw new Error(`Gagal Membuat Data Item Baru`);
        }
    }
    async update(id, itemData) {
        try {
            const item = await this.itemsRepository.findOne({ where: { id } });
            if (!item) {
                throw new Error(`Gagal Mendapatkan Data Item , Update Gagal `);
            }
            await this.itemsRepository.update(id, itemData);
            return item;
        }
        catch (error) {
            throw new Error(`Gagal Update data item pada Id : ${id}`);
        }
    }
    async delete(id) {
        try {
            await this.itemsRepository.delete(id);
            return { message: `Delete Successfuly` };
        }
        catch {
            throw new Error(`Gagal Menghapus Data Item pada Id : ${id} `);
        }
    }
    async getStockSummary() {
        try {
            const result = await this.itemsRepository
                .createQueryBuilder('items')
                .select('SUM(items.quantity)', 'total_stok')
                .addSelect('SUM(items.price * items.quantity)', 'total_nilai_stok')
                .addSelect('AVG(items.price)', 'rata_rata_harga')
                .getRawOne();
            return result;
        }
        catch (error) {
            throw new Error(`Gagal mendapatkan ringkasan stok: ${error.message}`);
        }
    }
    async getItemsByCategory(categoryId) {
        try {
            return await this.itemsRepository.find({
                where: { category_id: { id: categoryId } },
                relations: ['categories'],
            });
        }
        catch (error) {
            throw new Error(`Gagal mendapatkan daftar barang: ${error.message}`);
        }
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(items_entity_1.Items)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ItemsService);
//# sourceMappingURL=items.service.js.map