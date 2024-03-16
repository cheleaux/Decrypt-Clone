const header = document.getElementById("header-area");
const headerUtilities = document.getElementById("header-utility")
const logo = document.getElementById("logo");
const logoContainer = document.getElementById("logo-container");
const nav = document.getElementById("nav");
const smallLogo = document.getElementById("small-logo");
const queryWidth_1180 = window.matchMedia( "(max-width: 1180px)" )


queryWidth_1180.addEventListener( "change", setHeader );
window.onload( setHeader() );


function setHeader(){
    if ( !queryWidth_1180.matches ){
        window.addEventListener( "scroll", loadDesktopHeader );
        window.scrollY < 100 ? loadFull() : toggleLogoVisibility();
    } else {
        loadCompact()
        window.removeEventListener( "scroll", loadDesktopHeader );
    }
}

function loadDesktopHeader() {
    const ofHeaderScrolled = Math.min( 1, window.scrollY / 130 );
    const ofHeaderUnscrolled = 1 - ofHeaderScrolled;
    
    header.classList.add( "big-sticky" );
    moveLogo( ofHeaderScrolled, ofHeaderUnscrolled );
    pushPullHeader( ofHeaderUnscrolled, ofHeaderScrolled );
    toggleSmallLogo( ofHeaderScrolled );
};

function loadFull() { 
    logoContainer.style.top = "0";
    logoContainer.style.tramsform = `translate(-50%, 0%)`;
    headerUtilities.style.paddingTop = "0";
    header.style.transform = "translateY(0px)";
    nav.style.transform = "translateY(50px)";
}

function loadCompact() { 
    headerUtilities.style.paddingTop = "60px";
    header.style.transform = "translateY(-50px)";
    nav.style.transform = "none";
}

function toggleSmallLogo( percentScrolled ) { percentScrolled > 0.95 ?
    smallLogo.classList.add("hard-ease") :
    smallLogo.classList.remove("hard-ease");
}

function moveLogo( lengthScrolled, lengthUnscrolled ) {
    const logoScrollEnd = 76;
    const liveLogoWidth = Math.max(60, 219 * lengthUnscrolled);
    const logoTranslate = logoContainer.style.transform;

    logo.style.width = window.scrollY < 130 ? 
        `${ liveLogoWidth }px`: logo.style.width;

    logoContainer.style.transform = liveLogoWidth < 70 ?
        `translate(-50%, ${ Math.min( logoScrollEnd, lengthScrolled * 100 )}%)`:
        logoContainer.style.tramsform;
    
    toggleLogoVisibility()
};

function toggleLogoVisibility(){
    const logoTranslate = logoContainer.style.transform;
    const headerTranslate = header.style.transform;

    logoContainer.style.visibility = 
    Number(headerTranslate.substring(10, headerTranslate.length - 3)) <= -40 ? "hidden" : "visible";
        // Number(logoTranslate.substring(16, logoTranslate.length - 2)) >= 75 ? "hidden" : "visible";
}

function pushPullHeader( lengthUnscrolled, lengthScrolled ) {
    headerUtilities.style.paddingTop = `${ 60 * lengthScrolled }px`;
    header.style.transform = `translateY(${ -50 * lengthScrolled }px)`;
    nav.style.transform = `translateY(${ 50 * lengthUnscrolled }px)`;
}
