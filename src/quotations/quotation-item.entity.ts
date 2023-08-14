import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuotationEntity } from './quotation.entity';

@Entity()
export class QuotationItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  service: string;

  @Column()
  deadline: string;

  @Column()
  price: number;

  @ManyToOne(() => QuotationEntity, (quotation) => quotation.items)
  quotation: QuotationEntity;
}
