import { Page } from '../ui';
import { Header } from '../widgets/Header/Header';
import { BookCatalog } from '../widgets/BookCatalog/BookCatalog';
export const App = () => (
  <Page>
    <Header />
    <main>
      <BookCatalog />
    </main>
  </Page>
);
