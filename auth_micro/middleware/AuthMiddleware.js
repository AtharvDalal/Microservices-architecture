import jwt from 'jsonwebtoken'

const authMiddlware= (req ,res, next) => {
   const authHeader = req.headers.authorization
   if (authHeader === null || authHeader === undefined) {
      return res.status(401).json({message:"Unathorized"})
   }

   const token = authHeader.split(" ")[1]

   jwt.verify(token, process.env.JWT_SECRTE_KEY, (err,payload)=> {
            if (err) {
                return res.status(401).json({status: 401, message:"Unathorized"})

                
            }
            req.user = payload;
            next()
   })

}

export default authMiddlware