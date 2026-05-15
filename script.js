function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList
        .toggle("active");

}

function toggleCategory(button) {

    const category = button.parentElement;

    category.classList.toggle("active");

}

// Cerrar sidebar al hacer click fuera
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const logo = document.querySelector('.logo');
    
    if (sidebar && sidebar.classList.contains('active')) {
        if (!sidebar.contains(event.target) && !logo.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// ─── Cart Badge ───────────────────────────────────────────────────────────────
window.updateCartBadge = function() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    } catch(e) {
        badge.style.display = 'none';
    }
}

// Update on load
updateCartBadge();

// Update whenever localStorage changes (e.g. from app.js)
window.addEventListener('storage', updateCartBadge);