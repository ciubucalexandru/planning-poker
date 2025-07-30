import express from 'express';
import rooms from './rooms';
import users from './users';
import tasks from './tasks';

const router = express.Router();

export default (): express.Router => {
  rooms(router);
  users(router);
  tasks(router);

  return router;
};
