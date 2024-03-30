
export default class Header {
    constructor( domElement ){
        this.taskbar = document.querySelector("#header-utility")
        this.logo = document.querySelector("#logo");
        this.smallLogo = document.querySelector("#small-logo");
        this.logoContainer = document.querySelector("#logo-container");
        this.nav = document.querySelector("#nav");
    }

    setHeader( queryWidth_1180 ){
        if ( !queryWidth_1180.matches ){
            window.addEventListener( "scroll", this.loadDesktopHeader );
            window.scrollY < 100 ? this.loadFull() : this.toggleLogoVisibility(); // CHANGE THE ELSE THREAD TO LOAD THE RETRACTED FULL HEADER
        } else {
            this.loadCompact()
            window.removeEventListener( "scroll", this.loadDesktopHeader );
        }
    }

    loadDesktopHeader(){
        this.ofHeaderScrolled = Math.min( 1, window.scrollY / 130 );
        this.ofHeaderUnscrolled = 1 - ofHeaderScrolled;
        this.domElement.classList.add( "big-sticky" );
        this.transformHeaderLogo( ofHeaderScrolled, ofHeaderUnscrolled );
        this.pushPullHeader( ofHeaderUnscrolled, ofHeaderScrolled );
        this.toggleSmallLogo( ofHeaderScrolled );
    }

    loadFull(){ 
        this.logoContainer.style.top = "0";
        this.logoContainer.style.tramsform = `translate(-50%, 0%)`;
        this.taskbar.style.paddingTop = "0";
        this.domElement.style.transform = "translateY(0px)";
        this.nav.style.transform = "translateY(50px)";
    }

    loadCompact() { 
        this.taskbar.style.paddingTop = "60px";
        this.domElement.style.transform = "translateY(-50px)";
        this.nav.style.transform = "none";
    }
    pushPullHeader( lengthUnscrolled, lengthScrolled ) {
        this.taskbar.style.paddingTop = `${ 60 * lengthScrolled }px`;
        this.domElement.style.transform = `translateY(${ -50 * lengthScrolled }px)`;
        this.nav.style.transform = `translateY(${ 50 * lengthUnscrolled }px)`;
    }

    toggleSmallLogo( percentScrolled ) { percentScrolled > 0.95 ?
        this.smallLogo.classList.add("hard-ease") :
        this.smallLogo.classList.remove("hard-ease");
    }
    
    transformHeaderLogo( lengthScrolled, lengthUnscrolled ) {
        const liveLogoWidth = Math.max(60, 219 * lengthUnscrolled);
        this.setLogoYPosition( lengthScrolled, liveLogoWidth )
        this.setLogoWidth( liveLogoWidth )
        this.toggleLogoVisibility()
    };
    
    setLogoWidth( liveLogoWidth ){
        if( window.scrollY < 130 ) this.logo.style.width = `${ liveLogoWidth }px`;
    }
    
    setLogoYPosition( lengthScrolled, liveLogoWidth ){
        const logoScrollEnd = 76;
        this.logoYPosition = Math.min( logoScrollEnd, lengthScrolled * 100 )
        console.log(`logo Y position: ${ this.logoYPosition }`)
        if( liveLogoWidth < 70 ) this.logoContainer.style.transform = `translate(-50%, ${ this.logoYPosition }%)`;
    }
    
    toggleLogoVisibility(){
        if( this.logoYPosition <= -40 ) this.logoContainer.style.visibility = "hidden"
        else this.logoContainer.style.visibility = "visible"
    }
}