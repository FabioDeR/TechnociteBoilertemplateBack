import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

@Entity()
export class TestModel extends BaseModel {
    @Column('varchar')
    public name?: string;
}
