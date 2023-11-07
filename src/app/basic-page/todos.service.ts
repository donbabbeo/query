import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
  queryOptions,
  toPromise,
} from '@ngneat/query';

interface Todo {
  id: number;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  private query = injectQuery();
  private http = inject(HttpClient);
  private client = injectQueryClient();

  todosQuery = queryOptions({
    queryKey: ['todos'] as const,
    queryFn: ({ signal }) => {
      const source = this.http.get<Todo[]>(
        'https://jsonplaceholder.typicode.com/todos'
      );

      return toPromise({ source, signal });
    },
  });

  getTodos() {
    return this.query({
      queryKey: ['todos'] as const,
      queryFn: ({ signal }) => {
        const source = this.http.get<Todo[]>(
          'https://jsonplaceholder.typicode.com/todos'
        );

        return toPromise({ source, signal });
      },
    });
  }
}
