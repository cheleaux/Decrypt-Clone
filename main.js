window.addEventListener("scroll", () => {
    const header = document.getElementById ("main-header");
    header.classList.toggle("sticky", window.scrollY > 0)
});

