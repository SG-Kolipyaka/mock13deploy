const jwt = require('jsonwebtoken');


const auth=(req,res,next)=>{
const token=req.headers.authorization
if(token){
    try{
        jwt.verify(token, 'masaischool', (err, decoded)=> {
            if(decoded){
                req.body.userid=decoded.userid
                req.body.username=decoded.username
                next()
            }else{
                res.send({"msg":"Wrong Credensial"})
            }
            
          });
    }catch(er){
        res.send(er.message)
    }
}else{
    res.send({"msg":"Wrong Credensial"})
}
}     


module.exports={
    auth
}