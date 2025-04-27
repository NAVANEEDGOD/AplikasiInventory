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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suppliers = void 0;
const typeorm_1 = require("typeorm");
const admins_entity_1 = require("../admins/admins.entity");
let Suppliers = class Suppliers {
    id;
    name;
    contact_info;
    created_by;
    created_at;
    updated_at;
};
exports.Suppliers = Suppliers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Suppliers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Suppliers.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Suppliers.prototype, "contact_info", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admins_entity_1.Admins, (admin) => admin.id, { nullable: false, onDelete: 'CASCADE' }),
    __metadata("design:type", admins_entity_1.Admins)
], Suppliers.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Suppliers.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Suppliers.prototype, "updated_at", void 0);
exports.Suppliers = Suppliers = __decorate([
    (0, typeorm_1.Entity)()
], Suppliers);
//# sourceMappingURL=suppliers.entity.js.map