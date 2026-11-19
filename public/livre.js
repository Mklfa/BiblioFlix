function safeCoverId(value) {
  return /^\d+$/.test(value || "") && Number(value) > 0 ? value : "";
}

function safeIsbn(value) {
  const isbn = (value || "").replace(/-/g, "");
  return /^\d{10,13}$/.test(isbn) ? isbn : "";
}

function setCover(container, coverId, isbn, title, coverUrl) {
  const sources = window.BookStore.getBookCoverSources({
    cover_i: coverId,
    isbn: isbn ? [isbn] : [],
    cover_url: coverUrl,
  });
  if (!sources.length) {
    container.hidden = true;
    return;
  }
  const image = document.createElement("img");
  image.alt = `Couverture de ${title}`;
  let sourceIndex = 0;
  image.src = sources[sourceIndex];
  image.addEventListener("error", () => {
    sourceIndex += 1;
    if (sources[sourceIndex]) image.src = sources[sourceIndex];
    else {
      container.hidden = true;
    }
  });
  container.append(image);
}

function cleanDescription(value) {
  const raw = typeof value === "string"
    ? value
    : typeof value?.value === "string"
      ? value.value
      : "";
  const text = raw
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text.length > 1200 ? `${text.slice(0, 1200).trimEnd()}…` : text;
}

function isFrenchDescription(text, description) {
  const declaredLanguage = typeof description === "object"
    ? description.language?.key || description.language
    : "";
  const languageCode = typeof declaredLanguage === "string"
    ? declaredLanguage.toLowerCase().split("/").pop()
    : "";
  if (["fr", "fre", "fra"].includes(languageCode)) return true;

  const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const frenchWords = (normalized.match(/\b(?:le|la|les|des|du|de|un|une|et|dans|avec|pour|qui|que|est|sur|au|aux|son|sa|ses|leur|mais|plus|quand|comment|ne|pas|ce|cette|ces|comme|tout|toute|histoire|roman|recit|famille|amour)\b/g) || []).length;
  const englishWords = (normalized.match(/\b(?:the|a|an|and|of|to|in|with|for|that|as|is|are|was|were|his|her|their|she|he|not|this|from|by|on|it|which|who)\b/g) || []).length;
  const hasFrenchAccent = /[àâçéèêëîïôùûüÿœ]/i.test(text);
  return (frenchWords >= 3 && frenchWords > englishWords)
    || (frenchWords >= 2 && frenchWords >= englishWords && hasFrenchAccent);
}

async function getFrenchEditionDescription(workKey) {
  const response = await fetch(`https://openlibrary.org${workKey}/editions.json?limit=100`);
  if (!response.ok) throw new Error(`Le catalogue a répondu avec le statut ${response.status}.`);
  const data = await response.json();
  const entries = Array.isArray(data?.entries) ? data.entries : [];
  const frenchEdition = entries.find((edition) => {
    if (!edition || typeof edition !== "object") return false;
    const languages = Array.isArray(edition.languages) ? edition.languages : [];
    const isFrench = languages.some((language) => language?.key === "/languages/fre");
    return isFrench && cleanDescription(edition.description);
  });
  return frenchEdition ? cleanDescription(frenchEdition.description) : "";
}

function makeOrderLink(book, author) {
  const form = document.createElement("form");
  form.className = "order-panel";
  const quantityLabel = document.createElement("label");
  quantityLabel.className = "quantity-field";
  quantityLabel.textContent = "Quantité";
  const quantity = document.createElement("input");
  quantity.type = "number";
  quantity.min = "1";
  quantity.step = "1";
  quantity.value = "1";
  quantity.required = true;
  quantity.setAttribute("aria-label", "Nombre de livres à commander");
  quantityLabel.append(quantity);

  const action = document.createElement("button");
  action.className = "button button-whatsapp";
  action.type = "submit";
  action.textContent = "Commander sur WhatsApp";
  const note = document.createElement("p");
  note.className = "order-note";
  note.textContent = "Le prix et la disponibilité seront confirmés par message.";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const count = Number(quantity.value);
    if (!Number.isSafeInteger(count) || count < 1) {
      quantity.setCustomValidity("Saisissez un nombre entier positif.");
      quantity.reportValidity();
      return;
    }
    quantity.setCustomValidity("");
    const message = [
      "Bonjour, je souhaite commander ce livre :",
      `Titre : ${book.title}`,
      `Auteur : ${author}`,
      `Quantité : ${count}`,
      `Référence : ${book.key}`,
      "",
      "Pouvez-vous me confirmer la disponibilité et le prix ?",
    ].join("\n");
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
  form.append(quantityLabel, action, note);
  return form;
}

function renderSubjects(container, subjects) {
  const list = (subjects || []).filter((subject) => typeof subject === "string").slice(0, 6);
  if (!list.length) return;
  const section = document.createElement("section");
  section.className = "book-subjects";
  const heading = document.createElement("h2");
  heading.textContent = "Thèmes associés";
  const tags = document.createElement("div");
  tags.className = "subject-list";
  list.forEach((subject) => {
    const link = document.createElement("a");
    link.href = window.BookStore.getAppUrl(`catalogue.html?q=${encodeURIComponent(subject)}`);
    link.textContent = subject;
    tags.append(link);
  });
  section.append(heading, tags);
  container.append(section);
}

async function loadBookPage() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("key") || "";
  const titleFromUrl = params.get("title") || "";
  const authorFromUrl = params.get("author") || "Auteur non renseigné";
  let coverId = safeCoverId(params.get("cover"));
  const isbn = safeIsbn(params.get("isbn"));
  const yearFromUrl = params.get("year") || "";
  const subjectFromUrl = params.get("subject") || "";
  const status = document.querySelector("#book-status");
  const detail = document.querySelector("#book-detail");
  const curatedBook = window.BookStore.getCuratedBook(key);
  const isOpenLibraryWork = /^\/works\/[A-Za-z0-9]+$/.test(key);

  if (!isOpenLibraryWork && !curatedBook) {
    status.textContent = "Cette fiche de livre est introuvable. Retournez au catalogue pour choisir un ouvrage.";
    return;
  }

  try {
    let data = curatedBook || {};
    if (isOpenLibraryWork) {
      const response = await fetch(`https://openlibrary.org${key}.json`);
      if (!response.ok) throw new Error(`Le catalogue a répondu avec le statut ${response.status}.`);
      data = await response.json();
    }
    let frenchDescription = cleanDescription(data.description);
    let fallbackDescription = "";
    if (!isFrenchDescription(frenchDescription, data.description)) {
      fallbackDescription = frenchDescription;
      frenchDescription = "";
      if (isOpenLibraryWork) {
        try {
          frenchDescription = await getFrenchEditionDescription(key);
        } catch (error) {
          console.error("Erreur lors de la recherche d’une description française :", error);
        }
      }
    }
    const descriptionText = frenchDescription || fallbackDescription;
    const title = curatedBook?.title || data.title || titleFromUrl || "Titre indisponible";
    const author = authorFromUrl !== "Auteur non renseigné"
      ? authorFromUrl
      : curatedBook?.author_name?.join(", ") || "Auteur non renseigné";
    if (!coverId) coverId = safeCoverId(String(curatedBook?.cover_i || data.covers?.find((id) => Number(id) > 0) || ""));
    document.title = `${title} | BiblioFlix`;
    document.querySelector("#book-breadcrumb").textContent = title;
    detail.replaceChildren();

    const cover = document.createElement("div");
    cover.className = "book-detail-cover";
    setCover(cover, coverId, isbn, title, curatedBook?.cover_url);

    const information = document.createElement("div");
    information.className = "book-detail-information";
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "FICHE DU LIVRE";
    const heading = document.createElement("h1");
    heading.textContent = title;
    const authorLine = document.createElement("p");
    authorLine.className = "detail-author";
    authorLine.textContent = yearFromUrl ? `${author} (${yearFromUrl})` : author;
    const descriptionHeading = document.createElement("h2");
    descriptionHeading.textContent = "Présentation";
    descriptionHeading.hidden = !descriptionText;
    const description = document.createElement("p");
    description.className = "book-description";
    description.hidden = !descriptionText;
    description.textContent = descriptionText;
    information.append(eyebrow, heading, authorLine, descriptionHeading, description, makeOrderLink({ title, key }, author));
    detail.append(cover, information);
    const subjects = data.subjects || curatedBook?.subject || [];
    renderSubjects(detail, subjects);

    const primaryCategory = window.BookStore.getPrimaryCategory({
      key,
      author_name: curatedBook?.author_name,
      subject: subjects,
    });
    const relatedSubject = primaryCategory?.subject || subjectFromUrl;
    if (relatedSubject) {
      const relatedCategory = window.BookStore.categories.find((category) => category.subject === relatedSubject);
      document.querySelector("#related-link").href = relatedCategory
        ? window.BookStore.getAppUrl(`categories.html?subject=${encodeURIComponent(relatedCategory.subject)}&label=${encodeURIComponent(relatedCategory.label)}`)
        : window.BookStore.getAppUrl(`catalogue.html?subject=${encodeURIComponent(relatedSubject)}&label=${encodeURIComponent(relatedSubject)}`);
      document.querySelector("#related-section").hidden = false;
      try {
        const related = await window.BookStore.searchBooks({ subject: relatedSubject, limit: 12 });
        const books = related.books
          .filter((book) => book.key !== key)
          .filter((book) => !relatedCategory || window.BookStore.getPrimaryCategory(book)?.subject === relatedSubject)
          .slice(0, 6);
        window.BookStore.renderBookCards(document.querySelector("#related-books"), books, relatedSubject);
      } catch (error) {
        console.error("Erreur lors du chargement des livres associés :", error);
        document.querySelector("#related-section").hidden = true;
      }
    }
  } catch (error) {
    console.error("Erreur lors du chargement de la fiche du livre :", error);
    status.textContent = "Impossible de charger cette fiche pour le moment. Réessayez ou revenez au catalogue.";
  }
}

loadBookPage();
