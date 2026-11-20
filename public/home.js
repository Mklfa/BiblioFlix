const trendingBooks = window.BookStore.getWeeklyTrendingBooks();
if (trendingBooks.length) {
  window.BookStore.renderBookCards(document.querySelector("#popular-books"), trendingBooks);
} else {
  document.querySelector("#popular-status").textContent = "Aucune tendance n’est disponible cette semaine.";
}

const romanceBooks = window.BookStore.getCuratedBooksForCategory("romance");
const darkRomanceBooks = romanceBooks.filter((book) => (
  book.subject?.some((subject) => subject.toLowerCase().includes("dark romance"))
));
const generalRomanceBooks = romanceBooks.filter((book) => !darkRomanceBooks.includes(book));

window.BookStore.renderBookCards(document.querySelector("#romance-books"), generalRomanceBooks);
window.BookStore.renderBookCards(document.querySelector("#dark-romance-books"), darkRomanceBooks);
