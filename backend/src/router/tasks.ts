import express from 'express';
import { createTask } from '../controllers/tasks';

export default (router: express.Router) => {
  router.post('/tasks', createTask);
};
