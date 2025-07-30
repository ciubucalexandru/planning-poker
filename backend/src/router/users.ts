import express from 'express';
import { joinRoom } from '../controllers/users';

export default (router: express.Router) => {
  router.post('/users/join', joinRoom);
};
