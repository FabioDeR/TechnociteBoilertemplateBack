import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

export class BaseModel {
    @PrimaryGeneratedColumn('increment')
    public id?: number;
    // Date de création automatique
    @CreateDateColumn()
    public creationDate?: Date;

    // update de l'entité
    @UpdateDateColumn()
    public updateDate?: Date;

    // Date de suppression => soft delete
    @DeleteDateColumn()
    public deletionDate?: Date;
}
