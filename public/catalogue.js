const parameters = new URLSearchParams(window.location.search);
const searchQuery = parameters.get("q") || "";
const LEGACY_CATEGORY_SUBJECTS = {
  wattpad: "romance",
  fantasy: "fiction",
  "african literature": "fiction",
  "graphic novels": "fiction",
};
const requestedSubject = parameters.get("subject") || "";
const selectedSubject = LEGACY_CATEGORY_SUBJECTS[requestedSubject] || requestedSubject;
const selectedLabel = selectedSubject !== requestedSubject
  ? window.BookStore.categories.find((category) => category.subject === selectedSubject)?.label || ""
  : parameters.get("label") || "";
const selectedSort = parameters.get("sort") || "";
const PAGE_SIZE = 30;
const MAX_PAGES_PER_LOAD = 5;
let nextPage = 1;
let totalResults = 0;
let isLoading = false;
let hasMore = true;
const seenBookKeys = new Set();

const catalogueGrid = document.querySelector("#catalogue-grid");
const catalogueStatus = document.querySelector("#catalogue-status");
const catalogueSentinel = document.querySelector("#catalogue-sentinel");
const observer = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) loadMoreBooks();
}, { rootMargin: "700px" });

const catalogueCategories = document.querySelector("#catalogue-categories");
window.BookStore.categories.forEach((category) => {
  const link = document.createElement("a");
  link.className = `category-chip${category.subject === selectedSubject ? " selected" : ""}`;
  link.href = window.BookStore.getAppUrl(`categories.html?subject=${encodeURIComponent(category.subject)}&label=${encodeURIComponent(category.label)}`);
  link.textContent = category.label;
  catalogueCategories.append(link);
});

if (!searchQuery && !selectedSubject && !selectedSort) {
  const frenchBooks = window.BookStore.getFrenchCuratedBooks();
  frenchBooks.forEach((book) => seenBookKeys.add(book.key));
  catalogueGrid.append(...frenchBooks.map((book, index) => (
    window.BookStore.createBookCard(book, book.primaryCategorySubject, index < 6)
  )).filter(Boolean));
}

function updateResultsHeading(total, displayed) {
  const heading = document.querySelector("#catalogue-heading");
  const description = document.querySelector("#catalogue-description");
  if (searchQuery) {
    heading.textContent = `Résultats pour « ${searchQuery} »`;
  } else if (selectedLabel) {
    heading.textContent = selectedLabel;
  } else if (selectedSubject) {
    heading.textContent = window.BookStore.categories.find((category) => category.subject === selectedSubject)?.label || "Sélection";
  }

  description.textContent = searchQuery && selectedSubject
    ? `Résultats de recherche dans la catégorie ${selectedLabel || heading.textContent}.`
    : selectedSubject
      ? `Livres classés dans la catégorie ${selectedLabel || heading.textContent}.`
      : searchQuery
        ? "Livres correspondant à votre recherche."
        : "Parcourez les livres les plus référencés ou affinez votre sélection.";
  document.querySelector("#catalogue-count").textContent = selectedSubject
    ? `${displayed} œuvres classées dans cette catégorie affichées.`
    : `${displayed} livres affichés. ${total.toLocaleString("fr-FR")} résultats au total.`;
}

async function loadMoreBooks() {
  if (isLoading || !hasMore) return;

  if (selectedSubject && !searchQuery) {
    const category = window.BookStore.categories.find((item) => item.subject === selectedSubject);
    if (category) {
      window.location.replace(window.BookStore.getAppUrl(`categories.html?subject=${encodeURIComponent(category.subject)}&label=${encodeURIComponent(category.label)}`));
      return;
    }
  }

  isLoading = true;
  observer.unobserve(catalogueSentinel);
  catalogueStatus.textContent = nextPage === 1 ? "Chargement des résultats." : "Chargement d’autres livres.";
  let observeAfterLoad = false;

  try {
    const books = [];
    let pagesLoaded = 0;
    while (hasMore && pagesLoaded < MAX_PAGES_PER_LOAD && books.length < PAGE_SIZE) {
      const page = nextPage;
      const result = await window.BookStore.searchBooks({
        query: searchQuery,
        subject: selectedSubject,
        page,
        limit: PAGE_SIZE,
        sort: selectedSort,
      });
      nextPage += 1;
      pagesLoaded += 1;
      totalResults = result.total;
      hasMore = result.books.length > 0 && page * PAGE_SIZE < result.total;

      const pageBooks = selectedSubject
        ? window.BookStore.filterBooksByPrimaryCategory(result.books, selectedSubject)
        : result.books;
      pageBooks.forEach((book) => {
        if (seenBookKeys.has(book.key)) return;
        seenBookKeys.add(book.key);
        books.push(book);
      });
    }

    let prioritizedCards = catalogueGrid.childElementCount;
    const newCards = books.map((book) => {
      const card = window.BookStore.createBookCard(book, selectedSubject, prioritizedCards < 6);
      if (card) prioritizedCards += 1;
      return card;
    }).filter(Boolean);
    catalogueGrid.append(...newCards);

    const displayed = catalogueGrid.querySelectorAll(".book-card").length;
    updateResultsHeading(totalResults, displayed);
    if (!displayed && !hasMore) {
      catalogueStatus.textContent = "Aucun livre n’a été trouvé. Essayez un autre titre ou une autre catégorie.";
    } else if (!displayed) {
      catalogueStatus.textContent = "Recherche d’autres livres…";
    } else {
      catalogueStatus.textContent = "";
    }
    observeAfterLoad = hasMore;
  } catch (error) {
    console.error("Erreur lors du chargement du catalogue :", error);
    catalogueStatus.textContent = "Impossible de charger le catalogue. Vérifiez votre connexion puis réessayez.";
  } finally {
    isLoading = false;
    if (observeAfterLoad) observer.observe(catalogueSentinel);
  }
}

loadMoreBooks();
