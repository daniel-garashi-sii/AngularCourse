export interface TodoItem {
  readonly id: number;
  readonly caption: string;
  readonly listId: number;
  readonly isCompleted: boolean;
}
