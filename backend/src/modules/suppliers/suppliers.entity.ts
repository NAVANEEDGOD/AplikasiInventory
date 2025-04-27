import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Admins } from '../admins/admins.entity';


@Entity()
export class Suppliers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 ,nullable:false})
  name: string;

  @Column({ type: 'varchar', length: 100 })
  contact_info: string;

  @ManyToOne(()=>Admins , (admin)=>admin.id , {nullable:false,onDelete:'CASCADE'})
  @JoinColumn({name :'created_by'})
  created_by : Admins;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
