
// 星評価UIを追加
function addStarRatingUI() {
  const starContainer = document.createElement("div");
  starContainer.id = "star-rating-container";
  starContainer.style.position = "fixed";
  starContainer.style.bottom = "10px";
  starContainer.style.right = "10px";
  starContainer.style.backgroundColor = "white";
  starContainer.style.border = "1px solid #ccc";
  starContainer.style.padding = "10px";
  starContainer.style.zIndex = "9999";

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.style.fontSize = "20px";
    star.style.cursor = "pointer";
    star.style.color = "gray";
    star.dataset.rating = i;

    star.addEventListener("click", () => saveRating(i));
    starContainer.appendChild(star);
  }

  document.body.appendChild(starContainer);
  loadRating();
}

// 評価を保存
function saveRating(rating) {
  const pageURL = window.location.href;
  chrome.storage.local.set({ [pageURL]: rating }, () => {
    console.log(`評価 ${rating} を保存しました: ${pageURL}`);
    updateStarColors(rating);
  });
}

// 評価を読み込む
function loadRating() {
  const pageURL = window.location.href;
  chrome.storage.local.get([pageURL], (result) => {
    const rating = result[pageURL];
    if (rating) {
      console.log(`評価を読み込みました: ${rating}`);
      updateStarColors(rating);
    }
  });
}

// 星の色を更新
function updateStarColors(rating) {
  const stars = document.querySelectorAll("#star-rating-container span");
  stars.forEach((star) => {
    const starRating = parseInt(star.dataset.rating, 10);
    star.style.color = starRating <= rating ? "gold" : "gray";
  });
}

// 星評価UIを追加
addStarRatingUI();
