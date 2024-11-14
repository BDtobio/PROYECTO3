import server from "./server";
require ("dotenv").config();

const PORT=process.env.PORT
server.listen(PORT,()=>{
    console.log(`server listening port ${PORT}`);
    
})