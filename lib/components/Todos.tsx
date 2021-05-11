import produce from "immer";
import { useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CreateTodoDto, Todo, TodosApiFactory, UpdateTodoDto } from "../api";

async function getTodos() {
  const { data } = await TodosApiFactory().todosControllerFindAll();
  return data;
}

async function patchTodo({
  id,
  ...updateTodoDto
}: UpdateTodoDto & { id: number }) {
  const { data } = await TodosApiFactory().todosControllerUpdate(
    id.toString(),
    updateTodoDto
  );
  return data;
}

async function deleteTodo(id: number) {
  const { data } = await TodosApiFactory().todosControllerDelete(id.toString());
  return data;
}

async function addTodo(createTodoDto: CreateTodoDto) {
  const { data } = await TodosApiFactory().todosControllerCreate(createTodoDto);
  return data;
}

const Todos: React.FC = () => {
  const { data: todos, isLoading } = useQuery("todos", getTodos, { retry: 0 });

  const queryClient = useQueryClient();

  const onError = useCallback(
    (
      _: unknown,
      __: unknown,
      ctx?: {
        previousTodos?: Todo[];
      }
    ) => {
      if (ctx?.previousTodos) {
        queryClient.setQueryData<Todo[]>("todos", ctx?.previousTodos);
      }
    },
    [queryClient]
  );

  const onSettled = useCallback(
    () => queryClient.invalidateQueries("todos"),
    [queryClient]
  );

  const done = useMutation(patchTodo, {
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries("todos");
      const previousTodos = queryClient.getQueryData<Todo[]>("todos");
      queryClient.setQueryData<Todo[]>(
        "todos",
        produce((old) => {
          if (!old) {
            return;
          }

          const index = old.findIndex((x) => x.id === newTodo.id);
          old[index] = {
            ...old[index],
            ...newTodo,
          };
        })
      );
      return { previousTodos };
    },
    onError,
    onSettled,
  });

  const del = useMutation(deleteTodo, {
    onMutate: async (id) => {
      await queryClient.cancelQueries("todos");
      const previousTodos = queryClient.getQueryData<Todo[]>("todos");
      queryClient.setQueryData<Todo[]>("todos", (old) =>
        !old ? [] : old.filter((x) => x.id !== id)
      );
      return { previousTodos };
    },
    onError,
    onSettled,
  });

  const add = useMutation(addTodo, {
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries("todos");
      const previousTodos = queryClient.getQueryData<Todo[]>("todos");
      const todo: Todo = {
        id: Number.MAX_SAFE_INTEGER,
        done: false,
        userId: -1,
        ...newTodo,
      };
      queryClient.setQueryData<Todo[]>("todos", (old) =>
        !old ? [] : [...old, todo]
      );
      return { previousTodos };
    },
    onError,
    onSettled,
  });

  const uuid = useCallback((id: number) => `todo-${id}`, []);

  const loading = useMemo(
    () => isLoading || done.isLoading || del.isLoading || add.isLoading,
    [isLoading, done.isLoading, del.isLoading, add.isLoading]
  );

  if (!todos) {
    return <></>;
  }

  return (
    <>
      {todos && (
        <ul>
          {[...todos]
            .sort((a, b) => a.id - b.id)
            .map((todo) => (
              <li key={todo.id}>
                <input
                  id={uuid(todo.id)}
                  type="checkbox"
                  checked={todo.done}
                  onChange={() =>
                    done.mutate({ id: todo.id, done: !todo.done })
                  }
                  disabled={loading}
                />
                <label htmlFor={uuid(todo.id)}>{todo.content}</label>
                <button onClick={() => del.mutate(todo.id)} disabled={loading}>
                  x
                </button>
              </li>
            ))}
        </ul>
      )}
      <div>
        <span>Add: </span>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!(e.target instanceof HTMLFormElement)) {
              return;
            }

            const formData = new FormData(e.target);

            const createTodoDto: CreateTodoDto = {
              content: formData.get("content")?.toString() ?? "",
            };

            add.mutate(createTodoDto);

            e.target.reset();
          }}
        >
          <input
            type="text"
            name="content"
            autoComplete="off"
            disabled={loading}
          />
          <input type="submit" disabled={loading} />
        </form>
      </div>
    </>
  );
};

export default Todos;
