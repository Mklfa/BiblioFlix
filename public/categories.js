const parameters = new URLSearchParams(window.location.search);
const PAGE_SIZE = 30;
const MAX_PAGES_PER_LOAD = 5;
const LEGACY_CATEGORY_SUBJECTS = {
  wattpad: "romance",
  fantasy: "fiction",
  "graphic novels": "fiction",
};
const requestedSubject = parameters.get("subject") || window.BookStore.categories[0].subject;
let activeSubject = LEGACY_CATEGORY_SUBJECTS[requestedSubject] || requestedSubject;
let activeCategory = window.BookStore.categories.find((category) => category.subject === activeSubject)
  || window.BookStore.categories[0];
if (activeSubject !== requestedSubject) {
  const replacement = new URLSearchParams({
    subject: activeCategory.subject,
    label: activeCategory.label,
  });
  window.history.replaceState({}, "", window.BookStore.getAppUrl(`categories.html?${replacement}`));
}
let currentRequest = 0;
let isLoading = false;
let hasMore = true;
let activeSearches = [];
const seenBookKeys = new Set();

const categoryLine = document.querySelector("#category-line");
const categoryBooks = document.querySelector("#category-books");
const categoryStatus = document.querySelector("#category-results-status");
const categoryDescription = document.querySelector("#category-description");
const sentinel = document.querySelector("#category-sentinel");

const observer = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) loadNextPage();
}, { rootMargin: "700px" });

function updateAddress() {
  const params = new URLSearchParams({
    subject: activeCategory.subject,
    label: activeCategory.label,
  });
  window.history.pushState({}, "", window.BookStore.getAppUrl(`categories.html?${params}`));
}

function renderCategoryLine() {
  categoryLine.replaceChildren();
  window.BookStore.categories.forEach((category) => {
    const link = document.createElement("a");
    link.className = "category-chip";
    link.href = window.BookStore.getAppUrl(`categories.html?subject=${encodeURIComponent(category.subject)}&label=${encodeURIComponent(category.label)}`);
    link.textContent = category.label;
    link.setAttribute("aria-current", String(category.subject === activeSubject));
    link.addEventListener("click", (event) => {
      event.preventDefault();
      activeCategory = category;
      activeSubject = category.subject;
      updateAddress();
      loadCategory();
    });
    categoryLine.append(link);
  });
}

async function loadPrimaryCategoryBooks(requestId, maxPages = MAX_PAGES_PER_LOAD) {
  const books = [];
  let pageRounds = 0;

  while (hasMore && pageRounds < maxPages && books.length < PAGE_SIZE) {
    const pendingPages = activeSearches
      .filter((searchState) => searchState.hasMore)
      .map(async (searchState) => {
        const page = searchState.page + 1;
        const result = await window.BookStore.searchBooks({
          ...searchState.source,
          page,
          limit: PAGE_SIZE,
        });
        return { searchState, page, result };
      });
    if (!pendingPages.length) break;
    const results = await Promise.all(pendingPages);
    if (requestId !== currentRequest) return null;

    results.forEach(({ searchState, page, result }) => {
      searchState.page = page;
      searchState.hasMore = result.books.length > 0 && page * PAGE_SIZE < result.total;
      window.BookStore.filterBooksByPrimaryCategory(result.books, activeCategory.subject).forEach((book) => {
        if (seenBookKeys.has(book.key)) return;
        seenBookKeys.add(book.key);
        books.push(book);
      });
    });

    pageRounds += 1;
    hasMore = activeSearches.some((searchState) => searchState.hasMore);
  }

  return books;
}

async function loadCategory() {
  const requestId = ++currentRequest;
  const searchSources = [{ subject: activeCategory.subject }];
  if (activeCategory.subject === "fiction") searchSources.push({ subject: "fantasy" });
  if (activeCategory.subject === "african literature") searchSources.push({ subject: "african fiction" });
  if (activeCategory.subject === "romance") searchSources.push({ subject: "dark romance" });
  if (activeCategory.subject === "romance" || activeCategory.subject === "mystery") {
    searchSources.push({ query: 'author:"Gérard de Villiers"' });
  }
  activeSearches = searchSources.map((source) => ({
    source,
    page: 0,
    hasMore: true,
  }));
  hasMore = true;
  isLoading = true;
  seenBookKeys.clear();
  observer.unobserve(sentinel);
  const curatedBooks = window.BookStore.getCuratedBooksForCategory(activeCategory.subject);
  curatedBooks.forEach((book) => seenBookKeys.add(book.key));
  categoryStatus.textContent = curatedBooks.length ? "Chargement des autres livres." : "Chargement des livres.";
  categoryDescription.textContent = activeCategory.description;
  categoryBooks.replaceChildren();
  window.BookStore.renderBookCards(categoryBooks, curatedBooks, activeCategory.subject);
  renderCategoryLine();

  try {
    let books = await loadPrimaryCategoryBooks(requestId, 1);
    if (requestId !== currentRequest || !books) return;
    if (!books.length && hasMore) {
      books = await loadPrimaryCategoryBooks(requestId, MAX_PAGES_PER_LOAD - 1);
      if (requestId !== currentRequest || !books) return;
    }

    let prioritizedCards = categoryBooks.childElementCount;
    const newCards = books.map((book) => {
      const card = window.BookStore.createBookCard(
        book,
        activeCategory.subject,
        prioritizedCards < 6,
      );
      if (card) prioritizedCards += 1;
      return card;
    }).filter(Boolean);
    categoryBooks.append(...newCards);
    categoryStatus.textContent = categoryBooks.childElementCount
      ? ""
      : "Aucune œuvre classée dans cette catégorie n’a été trouvée.";
    if (hasMore && categoryBooks.childElementCount) observer.observe(sentinel);
  } catch (error) {
    if (requestId !== currentRequest) return;
    console.error("Erreur lors du chargement de cette catégorie :", error);
    categoryStatus.textContent = "Impossible de charger cette catégorie. Vérifiez votre connexion puis réessayez.";
  } finally {
    if (requestId === currentRequest) isLoading = false;
  }
}

async function loadNextPage() {
  if (isLoading || !hasMore) return;

  const requestId = currentRequest;
  isLoading = true;
  try {
    const books = await loadPrimaryCategoryBooks(requestId);
    if (requestId !== currentRequest || !books) return;

    categoryBooks.append(...books.map((book) => window.BookStore.createBookCard(book, activeCategory.subject)).filter(Boolean));
    if (hasMore && books.length) {
      observer.unobserve(sentinel);
      observer.observe(sentinel);
    } else if (!hasMore) {
      observer.unobserve(sentinel);
    }
  } catch (error) {
    if (requestId !== currentRequest) return;
    console.error("Erreur lors du chargement des livres suivants :", error);
    categoryStatus.textContent = "Impossible de charger la suite. Actualisez la page pour réessayer.";
    observer.unobserve(sentinel);
  } finally {
    if (requestId === currentRequest) isLoading = false;
  }
}

window.addEventListener("popstate", () => {
  const params = new URLSearchParams(window.location.search);
  const restoredSubject = params.get("subject") || window.BookStore.categories[0].subject;
  activeSubject = LEGACY_CATEGORY_SUBJECTS[restoredSubject] || restoredSubject;
  activeCategory = window.BookStore.categories.find((category) => category.subject === activeSubject)
    || window.BookStore.categories[0];
  loadCategory();
});

renderCategoryLine();
loadCategory();
