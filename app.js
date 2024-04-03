const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const port = 8080


app.use( '/static', express.static( path.join( __dirname, 'public' ) ) )

app.get( '/', ( req, res ) => {

    const homeHTMLPath = path.join(__dirname, 'public', 'homePage/homePage.html')

    if( !fs.existsSync( homeHTMLPath ) ){
        console.error('HTML file does not exist.');
        return res.status( 404 ).send('HTML file not found')
    }

    try {
        const pageData = fs.readFileSync( homeHTMLPath )

        // CALUCULATE CONTENT LENGTH | SET HEADERS AND STATUS CODE
        const headers = {
            'Content-Type': 'text/html',
            'Server': 'webserver',
            'Content-Length': Buffer.byteLength( pageData )
        }
        res.set( headers ).status(200)

        res.sendFile( homeHTMLPath )
    }
    catch ( err ){
        console.log( `Error reading HTML file: `, err )
        res.status(500).send('Internal Sever Error')
    }

})

app.listen( port, () => {
    console.log(`listening on http://localhost:${ port }/`)
} )