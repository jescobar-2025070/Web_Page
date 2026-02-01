document.addEventListener('DOMContentLoaded', function () {
    // Modal Logic
    var modal = document.getElementById("product-modal");
    if (modal) {
        var span = document.getElementsByClassName("close-btn")[0];
        var modalTitle = document.getElementById("modal-title");
        var modalImg = document.getElementById("modal-img");
        var modalPrice = document.getElementById("modal-price");
        var modalDesc = document.getElementById("modal-desc");
        var productCards = document.querySelectorAll('.producto-card');

        productCards.forEach(function (card) {
            card.addEventListener('click', function () {
                var name = this.getAttribute('data-name');
                var price = this.getAttribute('data-price');
                var desc = this.getAttribute('data-desc');
                var imgSrc = this.querySelector('img').src;

                modalTitle.textContent = name;
                modalPrice.textContent = price;
                modalDesc.textContent = desc;
                modalImg.src = imgSrc;
                modalImg.alt = name;

                modal.style.display = "block";
            });
        });

        if (span) {
            span.onclick = function () {
                modal.style.display = "none";
            }
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // Scroll Animation Observer
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    var elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(function (element) {
        observer.observe(element);
    });
});


