import { Drash } from 'https://deno.land/x/drash/mod.ts';
import { TodoList,TodoElement } from './todo.ts';

const port = 5000;

// Instanciation 
const server = new Drash.Http.Server({
  response_output: 'application/json',
  resources: [TodoList, TodoElement],
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: true,
    level: 'all',
    tag_string: '{datetime} | {level} |',
    tag_string_fns: {
      datetime() {
        return new Date().toISOString().replace('T', '');
      },
    },
  }),
});

// Run 
server.run({
  hostname: 'localhost',
  port: port
});

console.log(`listening on port ${port} !`);