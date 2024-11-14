

interface appointment{
    id:number,
    date:string,
    time:string,
    userId:number,
    status:appointmentStatus
}

 export enum appointmentStatus{
    active="active",
    cancelled="cancelled"

}

export default appointment;