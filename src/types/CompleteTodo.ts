/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompleteTodo
// ====================================================

export interface CompleteTodo_partialUpdateTodo {
  __typename: "Todo";
  /**
   * The document's ID.
   */
  _id: string;
  title: string;
  completed: boolean | null;
}

export interface CompleteTodo {
  /**
   * Partially updates an existing document in the collection of 'Todo'. It only
   * modifies the values that are specified in the arguments. During execution, it
   * verifies that required fields are not set to 'null'.
   */
  partialUpdateTodo: CompleteTodo_partialUpdateTodo | null;
}

export interface CompleteTodoVariables {
  id: string;
}
