export type Todo = {
  userId:number;
  id:number;
  title:string;
  completed:boolean;
  status?:TodoStatus
};
export type TodoStore = {
todos : Todo[],
  selectedTodo : Todo |null;
isLoading:boolean
  isDialogOpen:boolean
  isUpdateDialog:boolean
}
export enum TodoHeader {
  TODO='TO-DO',
  IN_PROGRESS='In Progress',
  WAITING_INFO='Waiting Info',
  DONE='Done'
}
export enum TodoStatus {
  TODO='Todo',
  WAITING_INFO='WaitingInfo',
  IN_PROGRESS='InProgress',
  DONE='Done',
}
