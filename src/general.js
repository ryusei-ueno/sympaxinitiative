// Loader
window.onload = function () {
    document.getElementById("loader").classList.add("hidden");
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
    }, 500);
};

// Header
const header = document.querySelector("header");
const textWrapper = document.createElement("div");
textWrapper.className = "textWrapper";

const logo = document.createElement("img");
logo.src = "/img/logo.svg";
logo.alt = "Sympax Initiative's logo featuring a face on the left with a line drawing from bottom left to top right.";
logo.id = "logo";

const titleSpan = document.createElement("span");
titleSpan.textContent = "Sympax Initiative";

textWrapper.appendChild(logo);
textWrapper.appendChild(titleSpan);

const menu = document.createElement("div");
menu.id = "menu";
for (let i = 0; i < 3; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    menu.appendChild(bar);
}

const nav = document.createElement("nav");
const links = [
    { href: "/src/home.html", text: "Home" },
    { href: "/src/about.html", text: "About" },
    { href: "/src/join.html", text: "Join" },
    { href: "/src/contact.html", text: "Contact" }
];
links.forEach(({ href, text }) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    nav.appendChild(a);
});

header.appendChild(textWrapper);
header.appendChild(menu);
header.appendChild(nav);

// Click logo to navigate user to index.html
document.getElementById('logo').addEventListener('click', function() {
    window.location.href = '/src/home.html';
})

// Toggle the menu visibility on click
document.getElementById('menu').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    const nav = document.querySelector('nav');
    menu.classList.toggle('open');
    nav.classList.toggle('open');
});

// Footer
const footer = document.querySelector("footer");
const footerWrapper = document.createElement("div");
footerWrapper.className = "footerWrapper";

const legal = document.createElement("div");
legal.className = "legal";
const privacyLink = document.createElement("a");
privacyLink.href = "/document/privacypolicy.txt";
privacyLink.textContent = "Privacy Policy";
const termsLink = document.createElement("a");
termsLink.href = "/document/termsofservice.txt";
termsLink.textContent = "Terms of Service";
legal.appendChild(privacyLink);
legal.appendChild(termsLink);

const footerLogo = document.createElement("img");
footerLogo.src = "/img/logowithname.svg";
footerLogo.alt = "Sympax Initiative's logo featuring a face on the left with a diagonal line extending from the bottom left to the top right, and the brand name at the bottom.";

footerWrapper.appendChild(legal);
footerWrapper.appendChild(footerLogo);

const copyright = document.createElement("p");
copyright.innerHTML = "&copy; 2025 Sympax Initiative. <span style='display: inline-block;'>All Rights Reserved.</span>";

footer.appendChild(footerWrapper);
footer.appendChild(copyright);