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
exports.AdminsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const admins_entity_1 = require("./admins.entity");
let AdminsService = class AdminsService {
    adminsRepository;
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async findAll() {
        try {
            const admins = await this.adminsRepository.find();
            return admins;
        }
        catch (error) {
            throw new Error(`Gagal Mendapatkan Data Admin : ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const admin = await this.adminsRepository.findOne({ where: { id } });
            if (!admin) {
                throw new Error(`Gagal Mendapatkan data Admin dengan id : ${id} `);
            }
            return admin;
        }
        catch (error) {
            throw new Error(`Gagal Mendapatkan Data Admin : ${error.message}`);
        }
    }
    async create(adminData) {
        try {
            const newAdmin = await this.adminsRepository.create(adminData);
            return await this.adminsRepository.save(newAdmin);
        }
        catch (error) {
            throw new Error(`Gagal Membuat Data Admin Baru`);
        }
    }
    async update(id, adminData) {
        try {
            const admin = await this.adminsRepository.findOne({ where: { id } });
            if (!admin) {
                throw new Error(`Gagal Mendapatkan Data Admin , Update Gagal `);
            }
            await this.adminsRepository.update(id, adminData);
            return admin;
        }
        catch (error) {
            throw new Error(`Gagal Update data admin pada Id : ${id}`);
        }
    }
    async delete(id) {
        try {
            await this.adminsRepository.delete(id);
            return { message: `Delete Data Successfuly` };
        }
        catch {
            throw new Error(`Gagal Menghapus Data Admin pada Id : ${id} `);
        }
    }
};
exports.AdminsService = AdminsService;
exports.AdminsService = AdminsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(admins_entity_1.Admins)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AdminsService);
//# sourceMappingURL=admins.service.js.map