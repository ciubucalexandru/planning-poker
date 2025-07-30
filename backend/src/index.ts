import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import wss from './ws';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

server.on('upgrade', (request, socket, head) => {
  if (request.url === '/real-time-estimates') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

app.use('/', router());
