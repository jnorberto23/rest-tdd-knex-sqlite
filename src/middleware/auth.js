import jwt from "jsonwebtoken";

export default (req, res, next) => {

    const authToken = req.headers['authorization'];
 
    var id  = req.params.id || req.body.id;

    if (authToken) {
        const bearer = authToken.split(" ");
        const token = bearer[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
            if (decoded.id.toString() === id.toString()) {
                next();
           
            } else {  
                res.status(401);
                res.json({error : "Token com autorização inválida"});
                return;
            }
        } catch {
            res.status(400);
            res.json({error : "Token inválido ou não informado"});
            return;
        }
    }
}