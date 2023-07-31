<script>

export default {
    name: 'HeaderComp',
}

</script>


<template>
    <header>

        <nav class="navbar navbar-expand-lg">
            <div class="container d-flex align-items-center justify-content-between">
                <!-- <div class="navbar-brand"></div> -->
                <!-- <router-link class="navbar-brand" :to="{ name: 'home' }" aria-current="page">
                    My_Developer
                </router-link> -->
                <div class="navbar-brand">
                    My_Developer
                </div>

                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-bars"></i>
                    </span>
                </button>

                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0 d-flex flex-wrap justify-content-between w-100">
                        <div class="d-flex flex-column flex-lg-row">
                            <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'home' }" aria-current="page">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'developers' }">Developers</router-link>
                            </li>
                        </div>
                        
                        <li class="nav-item">
                            <a href="http://127.0.0.1:8000/" target="_blank" class="nav-link link-backend">Sei uno sviluppatore? Clicca qui!</a>
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
        .nav-item {
            align-items: center;
            color: white;
            .nav-link {
                text-transform: uppercase;
                color: white;

                &:hover {
                    color:  #E7A117;
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

