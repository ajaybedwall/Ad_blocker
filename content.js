
let adCount = 0;


const adSelectors = [
  ".ad",
  ".advertisement",
  ".adsbygoogle",
  ".banner",
  "[id^='ad-']",
  "[class*='ad-']",
  "[class*='adsense']",
  "[id*='google_ads']",
  "[class*='sponsored']",
  "[class*='promo']",
];


function removeAds() {
  adSelectors.forEach((selector) => {
    const ads = document.querySelectorAll(selector);
    ads.forEach((ad) => {
      ad.remove();
      adCount++; 
    });
  });
}


function showBanner() {
  const banner = document.createElement("div");
  banner.classList.add("extension-banner");
  banner.innerHTML = `Blocked Ads: ${adCount} <span class="close-btn">&times;</span>`;
  document.body.appendChild(banner);


  banner.querySelector(".close-btn").addEventListener("click", () => {
    banner.remove();
  });

  
  setTimeout(() => banner.remove(), 3000);
}


const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      removeAds();
    }
  });
});


observer.observe(document.body, { childList: true, subtree: true });


window.addEventListener("load", () => {
  removeAds();
  showBanner();
});
