export type Todo = {
  userId:number;
  id:number;
  title:string;
  completed:boolean;
  status?:TodoStatus
};
export type TodoStore = {
todos : Todo[],
  selectedTodo : Todo | null;
isLoading:boolean
}
export enum TodoHeader {
  TODO='TO-DO',
  IN_PROGRESS='In Progress',
  DONE='Done'
}
export enum TodoStatus {
  TODO='Todo',
  IN_PROGRESS='InProgress',
  DONE='Done',
}
