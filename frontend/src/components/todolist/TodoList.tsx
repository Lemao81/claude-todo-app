import type { DragEndEvent } from '@dnd-kit/react';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { useTodos } from '#/components/providers/TodosProvider';
import { TodoCard } from '#/components/todolist/TodoCard';
import { arrayMove } from '#/utils/helpers';

type TodoListProps = {
  showDone: boolean;
};

export function TodoList({ showDone }: TodoListProps) {
  const { todos, reorder } = useTodos();
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

    const reorderedVisible = arrayMove(visibleTodos, oldIndex, newIndex);
    let visibleCursor = 0;
    const reordered = todos.map((todo) =>
      showDone || !todo.done ? reorderedVisible[visibleCursor++] : todo,
    );

    await reorder(reordered);
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {visibleTodos.map((todo, index) => (
        <TodoCard key={todo.id} todo={todo} index={index} />
      ))}
    </DragDropProvider>
  );
}
