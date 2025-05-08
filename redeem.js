document.addEventListener("DOMContentLoaded", function () {
    let aquaCoins = parseInt(localStorage.getItem("aquaCoins")) || 100;
    localStorage.setItem("aquaCoins", aquaCoins);  // Ensure it's stored
    const rewardPointsElement = document.getElementById("reward-points");
    rewardPointsElement.textContent = aquaCoins;

    // Selecting popup elements
    const popupOverlay = document.querySelector(".popup-overlay");
    const popupContainer = document.querySelector(".popup-Box");
    const popupContent = document.querySelector(".popup-box");
    const popupProductName = document.getElementById("product-name");
    const popupProductImage = popupContent.querySelector("img");
    const popupCancelBtn = document.getElementById("popup-cancel-btn");

    // Add click listeners to all redeem buttons
    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemCost = parseInt(this.dataset.cost);
            const productCard = this.closest('.product');
            const productName = productCard.querySelector("h3").textContent;
            const productImageSrc = productCard.querySelector("img").src;

            if (aquaCoins >= itemCost) {
                aquaCoins -= itemCost;
                localStorage.setItem("aquaCoins", aquaCoins);
                rewardPointsElement.textContent = aquaCoins;

                // Set popup content dynamically
                popupProductName.textContent = productName;
                popupProductImage.src = productImageSrc;

                // Show popup
                popupOverlay.style.height = document.documentElement.scrollHeight + 'px';
                popupOverlay.style.display = "block";
                popupContainer.style.display = "block";

                // Position and animate popup
                popupContent.style.top = (window.scrollY + window.innerHeight / 2) + 'px';
                popupContent.style.left = '50%';
                popupContent.style.transform = 'translate(-50%, -50%) scale(1)';
                popupContent.style.animation = 'popupBounce 0.4s ease forwards';
            } else {
                alert("❌ Not enough Aqua Coins!");
            }
        });
    });

    // Hide popup on cancel button click
    popupCancelBtn.addEventListener("click", function () {
        popupOverlay.style.display = "none";
        popupContainer.style.display = "none";
        popupContent.style.animation = '';
    });
});
