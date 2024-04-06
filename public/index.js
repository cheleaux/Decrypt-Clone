import { homepageOnLoadBuffer, initialiseHeader } from "./homePage/homepage.js"

const isOnHomepage = window.location.pathname == '/'

if( isOnHomepage ){
    const header = initialiseHeader()
    homepageOnLoadBuffer( header )
}