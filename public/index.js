import { homepageOnLoadBuffer, initialiseHeader } from "./homePage/homepage"

const isOnHomepage = window.location.href == '/'

if( isOnHomepage ){
    const header = initialiseHeader()
    homepageOnLoadBuffer( header )
}