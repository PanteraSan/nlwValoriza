import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import { Tag } from './Tag'
import { User } from "./User";

@Entity("compliments")
class Compliment {

 @PrimaryColumn()
 readonly id: string;

 @Column() 
 userSenderId: string;

 @JoinColumn({name: "userSenderId"})
 @ManyToOne(() => User)
userSender: User;

 @Column() 
 userReceiverId: string;

 @JoinColumn({name: "userReceiverId"})
 @ManyToOne(() => User)
userReceiver: User;

 @Column() 

 tagId: string;

 @JoinColumn({name: "tagId"})
 @ManyToOne(() => Tag)
 tag: Tag;

 @Column()
 message: string;

 @CreateDateColumn()
 createdAt: Date

 constructor() {
  if (!this.id) {
   this.id = uuid()
  }
 }


}

export { Compliment }