import { Application } from 'express';

import { healthCheck } from './controllers/healthCheck';
import { getUsers, getUserById, createUser } from './controllers/users';
import { getTodos } from './controllers/todos';
import { findCards, findInfoAPI } from './controllers/cards';

export const init = (app: Application): void => {
  app.get('/health', healthCheck);
  app.get('/users', getUsers);
  app.post('/users/signup', createUser);
  app.get('/users/:id', getUserById);
  app.get('/todos', getTodos);
  app.get('/cards', findCards);
  app.get('/info', findInfoAPI);
};
