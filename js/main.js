document.addEventListener('DOMContentLoaded', function () {
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

    function addToCart(product) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var existingProductIndex = cart.findIndex(p => p.name === product.name);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Added to cart:", product);
        showToast("Producto agregado al carrito: " + product.name);
    }

    function showToast(message) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        var toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;

        container.appendChild(toast);

        void toast.offsetWidth;

        toast.classList.add('show');

        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }

    var buyButtons = document.querySelectorAll('.btn-comprar');
    buyButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            var card = this.closest('.producto-card') || document.getElementById('product-modal');

            var name, price;

            if (card.classList.contains('producto-card')) {
                name = card.getAttribute('data-name');
                price = card.getAttribute('data-price');
            } else {
                name = document.getElementById('modal-title').textContent;
                price = document.getElementById('modal-price').textContent;
            }

            addToCart({ name: name, price: price });
        });
    });

    var cartTableBody = document.getElementById('cart-items');
    var totalDisplay = document.querySelector('.total');

    if (cartTableBody || totalDisplay) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var grandTotal = 0;

        if (cartTableBody) cartTableBody.innerHTML = '';

        cart.forEach(function (item) {
            var unitPrice = parseFloat(item.price.replace('Q', ''));
            var subTotal = (unitPrice * item.quantity);
            grandTotal += subTotal;

            if (cartTableBody) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>Q${subTotal.toFixed(2)}</td>
                `;
                cartTableBody.appendChild(row);
            }
        });

        if (totalDisplay) {
            totalDisplay.textContent = "Total: Q " + grandTotal.toFixed(2);
        }
    }

    var paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function (event) {
            event.preventDefault();

            showToast("¡Pago realizado con éxito! Redirigiendo...");

            localStorage.removeItem('cart');

            setTimeout(function () {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});


