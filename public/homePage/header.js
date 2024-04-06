
export default class Header {
    constructor( domElement ){
        this.domElement = domElement
        this.taskbar = document.querySelector("#header-utility")
        this.logo = document.querySelector("#logo");
        this.smallLogo = document.querySelector("#small-logo");
        this.logoContainer = document.querySelector("#logo-container");
        this.nav = document.querySelector("#nav");
        this.maxVerticalShift = -50
        this.YPosition = undefined
        this.logoYPosition = undefined
        this.ofHeaderScrolled = () => Math.min( 1, window.scrollY / 130 )
        this.ofHeaderUnscrolled = () => 1 - this.ofHeaderScrolled()
        this.scrollListenerAdded = false
    }

    setHeader( queryWidth_1180 ){
        if ( !queryWidth_1180.matches && !this.scrollListenerAdded ) this.initDesktopHeader();
        else if( queryWidth_1180.matches && this.scrollListenerAdded ) this.initCompactHeader();
    }

    initDesktopHeader(){
        this.toggleLogoVisibility()
        this.transformDesktopHeaderBound = this.transformDesktopHeader.bind( this )
        window.addEventListener( "scroll", this.transformDesktopHeaderBound );
        this.scrollListenerAdded = true;
        window.scrollY < 100 ? this.loadDesktopHeader() : this.loadScrolledDesktopHeader();
    }

    // REMOVE THIS LISTENER SOMEHOW???
    initCompactHeader(){
        window.removeEventListener( "scroll", this.transformDesktopHeaderBound );
        this.scrollListenerAdded = false;
        this.loadCompact()
    }

    transformDesktopHeader(){
        this.domElement.classList.add( "big-sticky" );
        this.pushPullHeader();
        this.transformHeaderLogo();
        this.toggleSmallLogo();
    }

    loadDesktopHeader(){
        this.logoContainer.style.tramsform = `translate(-50%, 0%)`
        this.taskbar.style.paddingTop = "0";
        this.domElement.style.transform = "translateY(0px)";
        this.nav.style.transform = "translateY(50px)";
    }

    loadScrolledDesktopHeader(){
        this.logo.style.width = "60px"
        this.logoContainer.style.tramsform = `translate(-50%, -20%)`
        this.taskbar.style.paddingTop = "60px";
        this.domElement.style.transform = "translateY(-50px)";
        this.nav.style.transform = "translateY(0)";
        this.toggleSmallLogo()
    }
    
    loadCompact(){ 
        this.taskbar.style.paddingTop = "60px";
        this.domElement.style.transform = "translateY(-50px)";
        this.nav.style.transform = "none";
    }

    pushPullHeader(){
        const maxTaskbarPadding = 60;
        const maxNavVerticalShift = 50;
        this.YPosition = this.maxVerticalShift * this.ofHeaderScrolled()
        this.taskbar.style.paddingTop = `${ maxTaskbarPadding * this.ofHeaderScrolled() }px`;
        this.domElement.style.transform = `translateY(${ this.YPosition }px)`;
        this.nav.style.transform = `translateY(${ maxNavVerticalShift * this.ofHeaderUnscrolled() }px)`;
    }

    toggleSmallLogo(){ 
        if( this.ofHeaderScrolled() > 0.95 ) this.smallLogo.classList.add("hard-ease");
        else this.smallLogo.classList.remove("hard-ease");
    }
    
    transformHeaderLogo() {
        const liveLogoWidth = Math.max(60, 219 * this.ofHeaderUnscrolled());
        this.setLogoYPosition( liveLogoWidth )
        this.setLogoWidth( liveLogoWidth )
        this.toggleLogoVisibility()
    };
    
    setLogoWidth( liveLogoWidth ){
        if( window.scrollY < 130 ) this.logo.style.width = `${ liveLogoWidth }px`;
    }
    
    setLogoYPosition( liveLogoWidth ){
        const logoScrollEnd = 76;
        const headerScrollFactor = 1 - ( this.YPosition / this.maxVerticalShift )
        this.logoYPosition = Math.min( logoScrollEnd, ( headerScrollFactor * 100 ) ) - 20
        if( liveLogoWidth < 70 ) this.logoContainer.style.transform = `translate(-50%, ${ this.logoYPosition }%)`;
        // console.log(this.logoYPosition)
    }
    
    toggleLogoVisibility(){
        if( this.logoYPosition <= -15 ) this.logoContainer.style.visibility = "hidden";
        else this.logoContainer.style.visibility = "visible"
    }
}