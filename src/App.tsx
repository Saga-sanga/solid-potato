import { BookList } from "./components/BookList";
import { AddBook } from "./components/AddBook";
import { createSignal, Show } from "solid-js";

export type Book = {
  title: string,
  author: string
}

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

type BookshelfProps = {
  name: string;
}

function Bookshelf(props: BookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!showForm());

  return (
    <div class="flex flex-col gap-2 border rounded-lg">
      <div class="p-4">
        <h1 class="text-3xl font-semibold mb-4">{props.name}'s Bookshelf</h1>
        <BookList books={books()}/>
      </div>
      <div class="flex flex-col gap-2 border-t p-4">
        <Show
          when={showForm()}
          fallback={<button class="btn btn-primary" onClick={toggleForm}>Add a book</button>}
        >
          <AddBook setBooks={setBooks}/>
          <button class="btn btn-primary" onClick={toggleForm}>Finished adding books</button>
        </Show>
      </div>
    </div>
  );
}

function App() {
  return (
    <div data-theme="fantasy" class="grid place-content-center min-h-screen">
      <Bookshelf name='Reckson'/>
    </div>
  );
};

export default App;
