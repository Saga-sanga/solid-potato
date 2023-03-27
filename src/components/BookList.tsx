import { For } from "solid-js";
import { Book } from "../App";

type BookListProps = {
  books: Book[]
}

export function BookList(props: BookListProps) {
  const totalBooks = () => props.books.length;

  return (
    <>
      <h2 class="flex gap-2 font-semibold">My Books <div class="grid place-content-center rounded-full border border-solid-lightitem w-6 h-6">{totalBooks()}</div></h2>
      <ul class="list-disc pl-4 mt-2">
        <For each={props.books}>
          {(book) => 
            <li>
              {book.title}
              <span style={{ "font-style": "italic" }}> ({book.author})</span>
            </li>}
        </For>
      </ul>
    </>
  );
}