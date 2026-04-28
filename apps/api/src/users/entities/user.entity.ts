import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email?: string;

  @Column({ unique: true })
  username?: string;

  @Column({ nullable: false })
  password?: string;

  @Column({ nullable: false })
  firstName?: string;

  @Column({ nullable: false })
  lastName?: string;
}
