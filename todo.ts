import { Drash } from 'https://deno.land/x/drash/mod.ts';

let todos = [
  {
    "id": 1,
    "task": "Essayer Deno",
    "conpleted": false,
  },
  {
    "id": 2,
    "task": "Créer une API REST",
    "conpleted": false,
  },
  {
    "id": 3,
    "task": "Partager",
    "conpleted": false,
  },
];

export class TodoList extends Drash.Http.Resource {
  static paths = ['/todos'];

  public GET() {
    this.response.body = todos;
    return this.response;
  }

  public POST() {
    const todo = {
      id: todos.length + 1,
      task: this.request.getBodyParam('task'),
      conpleted: this.request.getBodyParam('conpleted'),
    };
    todos.push(todo);
    this.response.body = todo;
    return this.response;
  }
}

export class TodoElement extends Drash.Http.Resource {
  static paths = ['/todos/:id'];

  public GET() {
    const idParam = this.request.getPathParam('id');
    const todo = todos.find(t => t.id == idParam);

    if (!todo) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Id ${idParam} not found.`,
      );
    }

    this.response.body = todo;
    return this.response;
  }

  public PATCH() {
    const idParam = this.request.getPathParam('id');
    const todo = todos.find(t => t.id == idParam);

    if (!todo) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Id ${idParam} not found.`,
      );
    }
    todo.conpleted = this.request.getBodyParam('conpleted');
    this.response.body = todo;
    return this.response;
  }

  public DELETE() {
    const idParam = this.request.getPathParam('id');
    const todo = todos.find(t => t.id == idParam);

    if (!todo) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Id ${idParam} not found.`,
      );
    }

    todos = todos.filter(t => t.id != idParam);
    this.response.body = {
      "status": "Success",
      "message": "Deleted ok"
    };
    return this.response;
  }
}