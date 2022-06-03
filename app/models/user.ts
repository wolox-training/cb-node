import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', { unique: true, name: 'last_name' })
  email: string;

  @Column('varchar')
  password: string;
}
