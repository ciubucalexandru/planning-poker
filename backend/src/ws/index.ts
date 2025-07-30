import WebSocket from 'ws';
import supabase from '../db/supabaseClient';

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  for (let i = 5; i < 10; i++) {
    setTimeout(() => {
      ws.send('You are connected bruh! ' + i);
    }, i * 1000);
  }

  let unsubscribe;

  ws.on('message', (taskId) => {
    unsubscribe?.(); // Clean previous subscription
    unsubscribe = supabase
      .channel(`task_${taskId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'estimates',
          filter: `task_id=eq.${taskId}`,
        },
        (payload) => {
          ws.send(JSON.stringify(payload.new));
        },
      )
      .subscribe();
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

export default wss;
