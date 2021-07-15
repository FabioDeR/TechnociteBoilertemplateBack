import { BaseModel } from './base.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import {ProofsModel} from './proofs.model';
import { InstructorChecks } from './instructorChecks.model';


@Entity()
export class RecordsModel extends BaseModel {
    
    @Column('varchar')
    public dateOfDay?: string

    @Column({
        type: 'enum',
        enum :['AM', 'PM']
    }) 
    public period?:string

    @Column({
        type: 'enum',
        enum :['abs_nonJust', 'abs_just', 'present']  
    })
    public recordStatus?: string

    @Column('varchar')
    public comment?: string

    @OneToMany(()=> ProofsModel, proofs => proofs.records)
    public proofs?: ProofsModel[]

    @OneToOne(()=> InstructorChecks)
    @JoinColumn()
    public instructorCheck?: InstructorChecks;

}