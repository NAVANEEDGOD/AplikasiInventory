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
exports.Items = void 0;
const typeorm_1 = require("typeorm");
const categories_entity_1 = require("../categories/categories.entity");
const suppliers_entity_1 = require("../suppliers/suppliers.entity");
const admins_entity_1 = require("../admins/admins.entity");
let Items = class Items {
    id;
    name;
    description;
    price;
    quantity;
    category_id;
    supplier_id;
    created_by;
    created_at;
    updated_at;
};
exports.Items = Items;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Items.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Items.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Items.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Items.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Items.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, category => category.id, { nullable: false, onDelete: 'CASCADE' }),
    __metadata("design:type", categories_entity_1.Categories)
], Items.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_entity_1.Suppliers, supplier => supplier.id, { nullable: false, onDelete: 'CASCADE' }),
    __metadata("design:type", suppliers_entity_1.Suppliers)
], Items.prototype, "supplier_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admins_entity_1.Admins, (admin) => admin.id, { nullable: false, onDelete: 'CASCADE' }),
    __metadata("design:type", admins_entity_1.Admins)
], Items.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Items.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Items.prototype, "updated_at", void 0);
exports.Items = Items = __decorate([
    (0, typeorm_1.Entity)()
], Items);
//# sourceMappingURL=items.entity.js.map