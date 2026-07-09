import { DragDropProvider } from '@dnd-kit/react';
import type { DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import type { Dispatch, SetStateAction } from 'react';
import { reorderTodos } from '#/api/todoApi';
import { TodoCard } from '#/components/todolist/TodoCard';
import type { TodoDto } from '#/types/todo';
import { arrayMove } from '#/utils/arrayMove';

type TodoListProps = {
  todos: TodoDto[];
  showDone: boolean;
  editingTodoId: number | null;
  setTodos: Dispatch<SetStateAction<TodoDto[]>>;
  onToggleDone: (id: number, done: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TodoList({
  todos,
  showDone,
  editingTodoId,
  setTodos,
  onToggleDone,
  onEdit,
  onDelete,
}: TodoListProps) {
  const visibleTodos = showDone ? todos : todos.filter((todo) => !todo.done);

  async function handleDragEnd(event: DragEndEvent) {
    const { source } = event.operation;
    if (event.canceled || !isSortable(source)) {
      return;
    }

    const oldIndex = source.initialIndex;
    const newIndex = source.index;
    if (oldIndex === newIndex) {
      return;
    }

    const previous = todos;
    const reorderedVisible = arrayMove(visibleTodos, oldIndex, newIndex);
    let visibleCursor = 0;
    const reordered = todos.map((todo) =>
      showDone || !todo.done ? reorderedVisible[visibleCursor++] : todo,
    );
    setTodos(reordered);

    const success = await reorderTodos(reordered.map((todo) => todo.id));
    if (!success) {
      setTodos(previous);
    }
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {visibleTodos.map((todo, index) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          index={index}
          isEditing={todo.id === editingTodoId}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </DragDropProvider>
  );
}
