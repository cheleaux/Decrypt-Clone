import { homepageOnLoadBuffer, initialiseHeader } from "./homePage/homepage.js"

const isOnHomepage = window.location.href == '/'

if( isOnHomepage ){
    const header = initialiseHeader()
    homepageOnLoadBuffer( header )
}