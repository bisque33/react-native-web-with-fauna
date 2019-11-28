/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTodo
// ====================================================

export interface CreateTodo_createTodo {
  __typename: "Todo";
  /**
   * The document's ID.
   */
  _id: string;
  title: string;
  completed: boolean | null;
}

export interface CreateTodo {
  /**
   * Create a new document in the collection of 'Todo'
   */
  createTodo: CreateTodo_createTodo;
}

export interface CreateTodoVariables {
  title: string;
}
