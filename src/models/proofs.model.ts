import { BaseModel } from './base.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { RecordsModel } from './records.model';


@Entity()
export class ProofsModel extends BaseModel {
    
    @Column('varchar')
    public dateStart?: string

    @Column('varchar')
    public dateEnd?: string

    @Column('varchar')
    public file?: string

    @ManyToOne(()=> RecordsModel, records => records.proofs )
    public records ?: RecordsModel
}
