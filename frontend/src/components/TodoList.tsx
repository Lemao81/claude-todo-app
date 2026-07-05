import { DragDropProvider } from '@dnd-kit/react';
import type { DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import type { Dispatch, SetStateAction } from 'react';
import { TodoCard } from '#/components/TodoCard';
import type { TodoDto } from '#/types/todo';
import { apiFetch } from '#/utils/apiClient';
import { arrayMove } from '#/utils/arrayMove';
import { logFetchError } from '#/utils/logHelper';

type TodoListProps = {
  todos: TodoDto[];
  showDone: boolean;
  setTodos: Dispatch<SetStateAction<TodoDto[]>>;
  onToggleDone: (id: number, done: boolean) => void;
};

export function TodoList({ todos, showDone, setTodos, onToggleDone }: TodoListProps) {
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

    const res = await apiFetch('/api/todos/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds: reordered.map((todo) => todo.id) }),
    });

    if (!res.ok) {
      await logFetchError(res, 'Failed to reorder todos');

      setTodos(previous);
    }
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {visibleTodos.map((todo, index) => (
        <TodoCard key={todo.id} todo={todo} index={index} onToggleDone={onToggleDone} />
      ))}
    </DragDropProvider>
  );
}
