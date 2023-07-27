<script>

export default {
    name: 'HeaderComp',
}

</script>


<template>
    <header>
        <div>
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <div class="container">
                    <div class="navbar-brand">My_Developer</div>
                    <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavId">
                        <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                            <li class="nav-item">
                                <router-link class="nav-link " :to="{ name: 'home' }" aria-current="page">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'developers' }">Developers</router-link>
                            </li>
                            <!-- <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'contact' }">Contact</router-link>
                            </li> -->
                            <li class="nav-item">
                                <a href="http://127.0.0.1:8000/" target="_blank" class="nav-link ">Sviluppi? Iscriviti
                                    qua!</a>
                            </li>
                        </ul>
                        <!-- <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/login" target="_blank"
                                    rel="noopener noreferrer">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/register" target="_blank"
                                    rel="noopener noreferrer">Register</a>
                            </li>
                        </ul> -->
                    </div>
                </div>
            </nav>

        </div>
    </header>
</template>

<style lang="scss" scoped>
.router-link-active {
    color: rgb(27, 216, 27);
}
</style>

