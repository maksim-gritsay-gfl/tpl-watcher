import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export type HistoryResultType = 'OFFER' | 'NO OFFER' | 'ERROR';
export type HistoryCheckType = 'automatic' | 'manual';

@Entity('history')
export class HistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'varchar', length: 20 })
  result: HistoryResultType;

  @Column({ type: 'varchar', length: 20 })
  type: HistoryCheckType;

  @Column({ type: 'text', nullable: true })
  message?: string;
}

