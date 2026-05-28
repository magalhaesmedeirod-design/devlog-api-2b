//npm init - y  //inicia um projeto node
//npm install express  //instala a dependencia do Express
//configura type: module no package.json
//npm nodemon --save-dev
//configura o nodemon no package.json
//scripts
//"start": "node index.js",
//"dev": "nodemon index.js"
//criar o arquivo index.js
//iniciar o servidor express
//npm run dev  //executa o projeto
import { authenticate } from './middlewares/authenticate.js';
import { login } from './controllers/authController.js';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import projectRoutes from './routes/projectsRoutes.js'
const app = express(); //cria instacia do express

// ── Middlewares globais ──────────────────────────────────────
app.use(morgan('dev'));
app.use(express.json()); //lida com o formato json
app.post ('/auth/login', login);

// ── Rotas ────────────────────────────────────────────────────
app.use('/api/v1/projects', projectRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// ── Middleware de 404 ────────────────────────────────────────
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

// Públicas — sem autenticação
app.get('/api/v1/projects', projectController.list);
app.get('/api/v1/projects/:id', projectController.getById);


// Privadas — exigem token
app.post('/api/v1/projects', authenticate, projectController.create);
app.patch('/api/v1/projects/:id', authenticate, projectController.update);
app.delete('/api/v1/projects/:id', authenticate, projectController.remove);


// ── Error handler (4 params — SEMPRE ÚLTIMO) ─────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
});

const PORT = process.env.PORT || 3000; //fallback para porta 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});