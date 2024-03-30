import Header from "./header";


export function initialiseHeader(){
    const headerElement = document.querySelector("#header-area")
    const header = Header( headerElement )
    return header
}

export function homepageOnLoadBuffer( header ){
    const queryWidth_1180 = window.matchMedia( "(max-width: 1180px)" )
    window.onload( header.setHeader( queryWidth_1180 ) );
    queryWidth_1180.addEventListener( "change", () => { header.setHeader( queryWidth_1180 ) } );
}









