const API_URL = "https://api.unsplash.com/photos";
const ACCESS_KEY = "5Zwn327QeZdNlYgTS23eOIn5Hpi4WczfdgeWBLQFSJA"
const gallery = document.getElementById("gallery__photos")
const searchBar = document.getElementById("search-bar")
const noResults = document.getElementById("no-results");

async function fetchPhotos(query = "", perPage = 20) {
  const url = query 
  ? `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}&per_page=${perPage}`
  : `${API_URL}?client_id=${ACCESS_KEY}&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return query ? data.results : data;
  } catch (error) {
    console.error("Erro ao buscar fotos", error);
    return [];
  }
}

function displayPhotos(photos) {
  gallery.innerHTML = "";

  if (photos.length > 0) {
      photos.forEach((photo) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
              <img src="${photo.urls.small}" alt="${photo.alt_description || 'Foto'}">
              <h3>${photo.description || photo.alt_description || "Sem título"}</h3>
          `;
          gallery.appendChild(card);
      });
      noResults.classList.remove = "none";
  } else {
      noResults.classList.add = "block";
  }
}

async function loadPhotos(query) {
  const photos = await fetchPhotos(query);
  displayPhotos(photos);
}

loadPhotos();

searchBar.addEventListener("input", (e) => {
  loadPhotos(e.target.value.trim());
});