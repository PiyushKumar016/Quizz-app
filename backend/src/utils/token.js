import jwt from 'jsonwebtoken';
export const generateToken = (email)=>{
    const token = jwt.sign({email:email},'cognito',{expiresIn:'1h'});
    return token;
}

export const verifyToken = (token)=>{
    const decode = jwt.verify(token, 'cognito');
    return decode.email;
}