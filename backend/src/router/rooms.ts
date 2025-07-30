import express from 'express';
import { createRoom, getRoom } from '../controllers/rooms';

export default (router: express.Router) => {
  router.get('/rooms', getRoom);
  router.post('/rooms', createRoom);
};
