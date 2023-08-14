import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuotationItemEntity } from './quotation-item.entity';

@Entity()
export class QuotationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request_id: string;

  @Column()
  zipcode: string;

  @OneToMany(() => QuotationItemEntity, (item) => item.quotation, {
    cascade: ['insert'],
  })
  items: QuotationItemEntity[];
}
