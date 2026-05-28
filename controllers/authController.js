import jwt from 'jsonwebtoken';

const usuarios = [
    { id: 1, email: 'magalhaesmedeirod@gmail.com', senha: 'kkk' },
    { id: 1, email: 'danalo@gmail.com', senha: 'ajajajajajajajajaja'},
];

export function login(req, res) {
    const { email, senha } = req.body;

    const usuario = usuarios.find( u => u.email === email);

    if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
        { userid: usuario.Id },
        process.env.JWT_SECRET,
        { expiresIn: 'id'}
    );

    res.json({ token });
}