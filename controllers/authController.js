import jwt from 'jsonwebtoken';

//Array em memória - Simula o banco de dados de usuários
const usuarios = [
    { id: 1, email: 'magalhaesmedeirod@gmail.com', senha: 'kkk' },
    { id: 1, email: 'danalo@gmail.com', senha: 'ajajajajajajajajaja'},
];

export function login(req, res) {
    const { email, senha } = req.body;

    //Busca o usuário pelo email
    const usuario = usuarios.find( u => u.email === email);

    if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    //Gera o token jwt
    const token = jwt.sign(
        { userid: usuario.Id },
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    );

    res.json({ token });
}