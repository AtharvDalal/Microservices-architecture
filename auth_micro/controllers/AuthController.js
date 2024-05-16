import bcrypt from 'bcrypt'
import prisma from '../config/db.config.js';
import jwt from 'jsonwebtoken';

class AuthController {
    static async register(req,res){
       try {
         const payload = req.body;
 
         const salt = bcrypt.genSaltSync(10);
         payload.password = bcrypt.hashSync(payload.password, salt)
 
          const user = await prisma.user.create({
             data:payload,
          })
         return res.json({message: "Account Created SuccesFully",user})
       } catch (error) {
          return res.status(500).json({message:"error in Register Controller"})
       }
    }

    static async login(req,res){
    try {
            const { email , password} = req.body;
    
            const user = await prisma.user.findUnique({
                where:{email}
            })
    
            if (user) {
                  if (!bcrypt.compareSync(password,user.password)) {
                    return res.status(401).json({messgae:"User invalid creadinatils"})
                  }
    
                  const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  }
                  const token = jwt.sign(payload, process.env.JWT_SECRTE_KEY,{
                    expiresIn:"365d"
                  })
                  return res.json({message:"Logged In Succesfully" ,access_token: `Bearer ${token}`})
            }
    
            return res.status(401).json({messgae:"User invalid creadinatils"})
    } catch (error) {
        return res.status(500).json({message:"error in Register Controller"})

    }
    }

    static async user(req,res){
         const user = req.user;
         return res.status(200).json({user: user})
    }
}

export default AuthController