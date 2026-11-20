const trendingBooks = window.BookStore.getWeeklyTrendingBooks();
if (trendingBooks.length) {
  window.BookStore.renderBookCards(document.querySelector("#popular-books"), trendingBooks);
} else {
  document.querySelector("#popular-status").textContent = "Aucune tendance n’est disponible cette semaine.";
}
