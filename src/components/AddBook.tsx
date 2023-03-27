import { Setter, createSignal, createResource, For, Show } from "solid-js";
import { Book } from "../App";
import { searchBooks } from "../searchBooks";

export interface AddBookProps {
  setBooks: Setter<Book[]>
}

export function AddBook(props: AddBookProps) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");

  const [data] = createResource<Book[], string>(query, searchBooks);

  return (
    <>
      <form class="flex gap-2">
        <div>
          <input 
            id="title"
            placeholder="Search books..."
            class="input input-bordered input-primary w-full max-w-xs"
            value={input()} 
            onInput={(e) => setInput(e.currentTarget.value)}
          />
        </div>
        <button 
          class="btn btn-accent"
          type="submit" 
          onClick={(e) => {
            e.preventDefault();
            setQuery(input())
          }}>
          Search
        </button>
      </form>
      <Show when={!data.loading} fallback={<progress class="progress w-56 my-2 self-center"></progress>}>
          <ul class="list-disc ml-4 my-2">
            <For each={data()}>
              {(book) => (
                <li class="mb-1">
                  <span class="flex justify-between">
                    {book.title} by {book.author}{" "}
                    <button
                      class="btn btn-secondary min-h-min h-8"
                      aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                      onClick={(e) => {
                        e.preventDefault();
                        props.setBooks((books) => [...books, book])
                      }}
                    >
                      Add
                    </button>
                  </span>
                </li>
              )}
            </For>
          </ul>
      </Show>
    </>
  );
}