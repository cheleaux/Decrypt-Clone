const header = document.getElementById("header-area");
const headerUtilities = document.getElementById("header-utility")
const logo = document.getElementById("logo");
const logoContainer = document.getElementById("logo");
const nav = document.getElementById("nav");
const smallLogo = document.getElementById("small-logo");


window.addEventListener("scroll", styleStickyHeader);

function styleStickyHeader(){
    const ofHeaderScrolled = Math.min(1, window.scrollY / 130);
    const ofHeaderUnscrolled = 1 - ofHeaderScrolled;

    hideLogo( ofHeaderScrolled, ofHeaderUnscrolled );
    shrinkHeader( ofHeaderUnscrolled, ofHeaderScrolled );
    toggleSmallLogo( ofHeaderScrolled );
    header.classList.toggle("sticky", window.scrollY > 0);
};

const toggleSmallLogo = ( percentScrolled ) => { percentScrolled > 0.95 ?
    smallLogo.classList.add("hard-ease") :
    smallLogo.classList.remove("hard-ease");
}

const hideLogo = ( lengthScrolled, lengthUnscrolled ) => {
    const logoScrollEnd = 76;
    const liveLogoWidth = Math.max(60, 219 * lengthUnscrolled);

    logo.style.width = window.scrollY < 130 ? `${liveLogoWidth}px`:
        logo.style.width;

    logoContainer.style.transform = liveLogoWidth < 70 ?
        `translateY(${Math.min(logoScrollEnd, lengthScrolled * 100)}%)`:
        logoContainer.style.tramsform;
};


const shrinkHeader = ( lengthUnscrolled, lengthScrolled ) => {
    headerUtilities.style.paddingTop = `${ 60 * lengthScrolled }px`;
    header.style.transform = `translateY(${ -50 * lengthScrolled }px)`;
    nav.style.transform = `translateY(${ 50 * lengthUnscrolled }px)`;
}
