import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CreateTodoDto, TodosApiFactory, UpdateTodoDto } from "../api";

async function getTodos() {
  const { data } = await TodosApiFactory(
    undefined,
    ""
  ).todosControllerFindAll();
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
  const queryClient = useQueryClient();
  const { data: todos } = useQuery("todos", getTodos, { retry: 0 });

  const done = useMutation(patchTodo, {
    onSettled: () => queryClient.invalidateQueries("todos"),
  });

  const del = useMutation(deleteTodo, {
    onSettled: () => queryClient.invalidateQueries("todos"),
  });

  const add = useMutation(addTodo, {
    onSettled: () => queryClient.invalidateQueries("todos"),
  });

  const uuid = useCallback(
    (id: number) => `todo-${id}`,

    []
  );

  if (!todos) {
    return <></>;
  }

  return (
    <>
      {todos && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                id={uuid(todo.id)}
                type="checkbox"
                checked={todo.done}
                onChange={() => done.mutate({ id: todo.id, done: !todo.done })}
              />
              <label htmlFor={uuid(todo.id)}>{todo.content}</label>
              <button onClick={() => del.mutate(todo.id)}>x</button>
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
          <input type="text" name="content" autoComplete="off" />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default Todos;
