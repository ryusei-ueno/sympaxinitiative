// Loader
window.onload = function () {
    document.getElementById("loader").classList.add("hidden");
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
    }, 500);
};

// Click logo to navigate user to index.html
document.getElementById('logo').addEventListener('click', function() {
    if (window.location.pathname.endsWith('/index.html') || window.location.pathname === '/' || window.location.pathname === '/index') {
        window.location.href = 'index.html';
    } else {
        window.location.href = '../index.html';
    }
})

// Toggle the menu visibility on click
document.getElementById('menu').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    const nav = document.querySelector('nav');
    menu.classList.toggle('open');
    nav.classList.toggle('open');
});