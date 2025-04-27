import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { Suppliers } from '../suppliers/suppliers.entity';
import { Admins } from '../admins/admins.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({type:'text'})
  description:string;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @ManyToOne(() => Categories, category => category.id , {nullable:false , onDelete:'CASCADE'})
  @JoinColumn({name :'category_id'})
  category_id: Categories;
  
  @ManyToOne(() => Suppliers, supplier => supplier.id , {nullable :false , onDelete:'CASCADE'})
  @JoinColumn({name :'supplier_id'})
  supplier_id: Suppliers;
  
  @ManyToOne(()=>Admins , (admin)=>admin.id , {nullable:false , onDelete:'CASCADE'})
  @JoinColumn({name :'created_by'})
  created_by:Admins;

  @CreateDateColumn()
  created_at:Date;

  @CreateDateColumn()
  updated_at:Date;

}
