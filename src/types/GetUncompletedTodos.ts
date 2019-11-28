/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUncompletedTodos
// ====================================================

export interface GetUncompletedTodos_todosByCompletedFlag_data {
  __typename: "Todo";
  /**
   * The document's ID.
   */
  _id: string;
  title: string;
  completed: boolean | null;
}

export interface GetUncompletedTodos_todosByCompletedFlag {
  __typename: "TodoPage";
  /**
   * The elements of type 'Todo' in this page.
   */
  data: (GetUncompletedTodos_todosByCompletedFlag_data | null)[];
}

export interface GetUncompletedTodos {
  todosByCompletedFlag: GetUncompletedTodos_todosByCompletedFlag;
}
