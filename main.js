window.addEventListener("scroll", styleStickyHeader)

function styleStickyHeader(){
    const header = document.getElementById("main-header");
    const logo = document.getElementById("logo");
    const logoContainer = document.getElementById("logo");

    const ofHeaderScrolled = Math.min(1, window.scrollY / 130);
    header.classList.toggle("sticky", window.scrollY > 0);

    (function hideLogo() {
        const liveLogoWidth = Math.max(60, 219 * (1 - ofHeaderScrolled));
        const logoScrollEnd = 76;

        logo.style.width = window.scrollY < 130 ? `${liveLogoWidth}px`:
            logo.style.width;
        
        logoContainer.style.transform = liveLogoWidth < 70 ?
            `translateY(${Math.min(logoScrollEnd, ofHeaderScrolled * 100)}%)`:
            logoContainer.style.tramsform;
    }());
};