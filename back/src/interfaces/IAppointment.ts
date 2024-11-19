import { User } from "../entities/User"


interface appointment{
    id:number,
    date:Date,
    time:string,
    userId:User,
    status:appointmentStatus
}

 export enum appointmentStatus{
    active="active",
    cancelled="cancelled"

}
export default appointment
