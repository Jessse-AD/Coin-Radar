const coinsContainer = document.getElementById("coins-container");
const searchInput = document.getElementById("search");

// Fetch top 100 coins from Coingecko
async function fetchCoins() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const coins = await res.json();
    displayCoins(coins);
  } catch (err) {
    coinsContainer.innerHTML =
      "<p>Failed to load data. Check your internet connection.</p>";
    console.error(err);
  }
}

// Display coins in cards
function displayCoins(coins) {
  coinsContainer.innerHTML = coins
    .map(
      (coin) => `
      <div class="coin-card">
        <img src="${coin.image}" alt="${coin.name}" />
        <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
        <p>Price: $${coin.current_price}</p>
        <p class="price-change ${
          coin.price_change_percentage_24h >= 0 ? "up" : "down"
        }">
          24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%
        </p>
        <button class="favorite-btn">★</button>
      </div>
    `
    )
    .join("");
}

// Favorite coin functionality
coinsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("favorite-btn")) {
    e.target.classList.toggle("favorited"); // toggle a CSS class
  }
});

// Search functionality for all fetched coins
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  const coins = Array.from(coinsContainer.children);
  coins.forEach((coin) => {
    const name = coin.querySelector("h3").textContent.toLowerCase();
    coin.style.display = name.includes(filter) ? "block" : "none";
  });
});

// Initialize
fetchCoins();
