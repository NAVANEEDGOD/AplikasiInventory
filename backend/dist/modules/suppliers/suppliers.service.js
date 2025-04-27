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
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const suppliers_entity_1 = require("./suppliers.entity");
let SuppliersService = class SuppliersService {
    suppliersRepository;
    constructor(suppliersRepository) {
        this.suppliersRepository = suppliersRepository;
    }
    async findAll() {
        try {
            const suppliers = await this.suppliersRepository.find();
            return suppliers;
        }
        catch (error) {
            throw new Error(`Gagal Mendapatkan Data Supplier : ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const suppliers = await this.suppliersRepository.findOne({ where: { id } });
            if (!suppliers) {
                throw new Error(`Gagal Mendapatkan data Suplier dengan id : ${id} `);
            }
            return suppliers;
        }
        catch (error) {
            throw new Error(`Gagal Mendapatkan Data Supplier : ${error.message}`);
        }
    }
    async create(supplierData) {
        try {
            const newSupplier = await this.suppliersRepository.create(supplierData);
            return await this.suppliersRepository.save(newSupplier);
        }
        catch (error) {
            throw new Error(`Gagal Membuat Data Supplier Baru`);
        }
    }
    async update(id, supplierData) {
        try {
            const supplier = await this.suppliersRepository.findOne({ where: { id } });
            if (!supplier) {
                throw new Error(`Gagal Mendapatkan Data Supplier , Update Gagal `);
            }
            await this.suppliersRepository.update(id, supplierData);
            return supplier;
        }
        catch (error) {
            throw new Error(`Gagal Update data supplier pada Id : ${id}`);
        }
    }
    async delete(id) {
        try {
            await this.suppliersRepository.delete(id);
            return { message: `Delete Data Successfuly` };
        }
        catch {
            throw new Error(`Gagal Menghapus Data Supplier pada Id : ${id} `);
        }
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(suppliers_entity_1.Suppliers)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map