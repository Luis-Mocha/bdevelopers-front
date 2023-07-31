<script>

export default {
    name: 'QuintoComp',
}

</script>

<template>
   
    <!-- FOOTER -->
    <footer id="section-5">

        <!-- footer top section -->
        <div class="footer-top container row">
                
            <div class="col-12 col-md-12 col-lg-3 mb-5">
                <h3>Trova lo sviluppatore di cui hai bisogno</h3>
            
                <div class="d-flex justify-content-start">
                    <a href="">
                        <i class="fa-brands fa-twitter"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>

            <ul class="col-12 col-md-4 col-lg-3">
                <li>Compagnia</li>
                <li>Chi siamo</li>
                <li>Lavora con noi</li>
                <li>Marchio</li>
                <li>Redazione</li>
                <li>Negozio</li>
                <li>Prodotto</li>
                <li>Iscriviti</li>
                <li>Perché My_Developer</li>
                <li>Sponsorship</li>
                <li>Sicurezza</li>
                <li>Assistenza</li>
            </ul>
            
            <ul class="col-12 col-md-4 col-lg-3">
                <li>Developers</li>
                <li>Game Developer</li>
                <li>Mobile App Developers</li>
                <li>Social Media Managers</li>
                <li>Wordpress Developer</li>
                <li>Ruby on Rails Developer</li>
                <li>Software Engineer</li>
                <li>Graphic Designer</li>
                
                <li>Front-End Web Developers</li>
                <li>Back-End Web Developers</li>
                <li>Full-Stack Web Developers</li>
            </ul>

            <ul class="col-12 col-md-4 col-lg-3">
                <li>Specialists</li>
                <li>Generative AI Specialists</li>
                <li>Data Analyses Specialists</li>
                <li>Data Entry Specialists</li>
                <li>Shopify Specialists</li>
                <li>iOS Specialists</li>
                <li>SEO Specialists</li>
            </ul>
            
        </div>

        <!-- footer bottom section -->
        <div class="footer-bottom container">
            <div class="d-flex align-items-center">
                <div class="animate-character logo">
                    &lt;My_developer/&gt;
                </div>
            </div>
        </div>

    </footer>

</template>

<style lang="scss" scoped>

    // #section-5{
    //     height: 50vh;
    // }

    /* FOOTER */

    /* footer general layout */
    footer {
        background-color: #1d1b2c;
        color: #F6EEE0;
        padding: 3rem 0 1rem 0;
    }

    footer .container {
    width: calc(100% / 3 * 2);
    margin: 0 auto;
    }

    ul {
    list-style-type: none;
    }

    ul li {
        cursor: pointer;
    }

    /* orange words in footer section */
    footer h3, footer ul > li:first-child {
        color: #E7A117;
    }

    /* margin bottoms in footer's lists */
    footer li, footer h3 {
        margin-bottom: 1rem;
    }

    /* footer top section anchors' text color */
    .footer-top a {
        color: #F6EEE0;
    }

    .footer-top {
        margin-bottom: 1.5rem;
    }

    /* footer top section layout */
    .footer-bottom {
        border-top: 0.01rem solid #E7A117;
        padding-top: 1.5rem;
    }
    .fa-brands {
        margin-right: 1rem;
        font-size: 1.5rem;
    }

    .logo {
        font-family: 'Anton', sans-serif;
        height: 100%;
    }
    .animate-character
      {
        text-transform: uppercase;
        background-image: linear-gradient(
          -225deg,
          #1d1b2c 0%,
          #E7A117 70%,
          #F6EEE0 100%
        );
        background-size: auto auto;
        background-clip: border-box;
        background-size: 200% auto;
        color: #fff;
        background-clip: text;
        text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: textclip 3.5s linear infinite;
        display: inline-block;
        font-size: 40px;
        cursor: pointer;
    }

    @keyframes textclip {
        to {
          background-position: 200% center;
        }
      }

</style>