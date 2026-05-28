import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {

   
 // 1. Pegar o header Authorization
const authHeader = req.headers['authorization'];



// 2. Extrair o token — o header vem como 'Bearer eyJ...'
const token = authHeader && authHeader.split(' ')[1];


 // 3. Sem token → bloqueia aqui (return é obrigatório!)
 if (!token) {
 return res.status(401).json({ erro: 'Token não fornecido' });
 }


 // 4. Verificar se o token é válido
 try {
 const payload = jwt.verify(token, process.env.JWT_SECRET);
 req.user = payload; // disponível no controller: req.user.userId
 next();
 } catch (err) {
 return res.status(401).json({ erro: 'Token inválido ou expirado' });
 }
}
