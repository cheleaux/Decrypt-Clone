window.addEventListener("scroll", styleStickyHeader)

function styleStickyHeader(){
    const header = document.getElementById("main-header");
    const logo = document.getElementById("logo");
    const logoContainer = document.getElementById("logo");

    ofHeaderScrolled = window.scrollY / 130;
    header.classList.toggle("sticky", window.scrollY > 0);

    function hideLogo(){
        if (window.scrollY < 130){                
            logo.style.width = `max(60px, ${219 * (1 - ofHeaderScrolled)}px)`;
        }

        if (logo.style.width < 70){
            logoContainer.style.transform = `translateY(${-(ofHeaderScrolled * 100)}%);`
        }
    };

    hideLogo()
    console.log(-(ofHeaderScrolled * 100))
};

