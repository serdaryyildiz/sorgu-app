import { Entity, PrimaryGeneratedColumn , Column} from "typeorm";

@Entity()
export class ConnectionTransaction {
    @PrimaryGeneratedColumn('uuid')
    connection_id:string;

    @Column()
    connection_name:string;

    @Column()
    user_id:string;

    @Column()
    host_name:string;

    @Column()
    db_port:number;

    @Column()
    db_username:string;
}