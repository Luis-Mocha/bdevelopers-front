<script>

export default {
    name: 'HeaderComp',
}

</script>


<template>
    <header>

        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid mx-5 d-flex align-items-center justify-content-between">
                <!-- <div class="navbar-brand"></div> -->
                <!-- <router-link class="navbar-brand" :to="{ name: 'home' }" aria-current="page">
                    My_Developer
                </router-link> -->
                <div class="navbar-brand animate-character logo">
                    &lt;My_developer/&gt;
                </div>

                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-bars"></i>
                    </span>
                </button>

                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0 d-flex pt-2 flex-wrap justify-content-between w-100">
                        <div class="d-flex flex-column flex-lg-row">
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'home' }" aria-current="page">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'developers' }">Developers</router-link>
                            </li>
                        </div>

                        <li class="nav-item">
                            <a href="http://127.0.0.1:8000/" target="_blank" class="nav-link link-backend">Sei uno
                                sviluppatore? Clicca qui!</a>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>


    </header>
</template>

<style lang="scss" scoped>
// font-family: 'Anton', sans-serif;
// font-family: 'Handjet', cursive;
// font-family: 'Josefin Sans', sans-serif;
// font-family: 'Montserrat', sans-serif;

//dark-blue #1d1b2c
//gold #E7A117
header {
    height: 60px;
    background-color: #1d1b2c;
    font-family: 'Montserrat', sans-serif;
    z-index: 999;


    nav {
        background-color: inherit;
        z-index: 999;
        width: 100%;

        .navbar-brand {
            color: white;
            font-size: 28px;
            font-weight: 700;
        }

        .logo {
            font-family: 'Anton', sans-serif;
            height: 100%;
            padding: 8px;
        }

        .animate-character {
            text-transform: uppercase;
            background-image: linear-gradient(-225deg,
                    #1d1b2c 0%,
                    #E7A117 70%,
                    #F6EEE0 100%);
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

        .nav-item {
            align-items: center;
            color: white;

            .nav-link {
                text-transform: uppercase;
                color: white;

                &:hover {
                    color: #E7A117;
                }
            }

            .link-backend {
                font-size: 12px;
            }
        }

        .navbar-toggler {
            color: #E7A117;

            .navbar-toggler-icon {
                color: white;
            }
        }

    }

}

.nav-link.router-link-exact-active {
    color: #E7A117 !important;

    &::before {
        content: '<';
    }

    &::after {
        content: '/>';
    }
}
</style>

