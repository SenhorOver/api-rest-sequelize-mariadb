import dotenv from 'dotenv';
import { resolve } from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

import './database';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';

const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Statis Files
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));

    // Allow forms
    this.app.use(express.urlencoded({ extended: true }));

    // Allow fetch
    this.app.use(express.json());

    // Allow CORS
    this.app.use(cors(corsOptions));

    // Helmet for security
    this.app.use(helmet());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/fotos', fotoRoutes);
    // this.app.use('/', (req, res) => res.json({ error: 'Rota não encontrada' }));
    // Por algum motivo, da problema ao colocar esse erro, não fica possível acessar
    // /users, depois eu vejo como posso resolver
  }
}

export default new App().app;
