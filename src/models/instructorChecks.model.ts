import { BaseModel } from './base.model';
import { Column, Entity, OneToOne } from 'typeorm';
import { RecordsModel } from './records.model';

@Entity()
export class InstructorChecks extends BaseModel {
    
    @Column('boolean')
    public recordCheck?: boolean

    @Column('varchar') 
    public instructorSign?: string

    @OneToOne(()=> RecordsModel, records => records.instructorCheck)
    public records? : RecordsModel
}
