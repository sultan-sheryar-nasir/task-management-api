import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
  location: { type: string; coordinates: number[] };

  @Column({ default: false })
  isCompleted: boolean;

  @Column({nullable: true})
  workerId?: number;
}
