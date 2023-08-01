<script>

export default {
    name: 'SecondoComp',
}


</script>


<template>
   <div id="section-2">

    <div class="container h-100">
        <div class="row h-100 gx-5">
            <div class="h-100 d-flex flex-column justify-content-center col-12 col-md-8">
                <h2>È così che le buone compagnie <br>trovano buona compagnia</h2>
                <h3 class="my-5">Entra in contatto coi migliori sviluppatori grazie a <span style="color: #E7A117;">My_Developer</span></h3>
                <p>Accedi ai migliori talenti nel campo della programmazione e ad una nuova strada per la realizzazione dei tuoi progetti.</p>
            </div>
    
            <div class="col-12 col-md-4 d-flex align-items-center h-100">
                <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt="People working together">
            </div>
        </div>
    </div>


   </div>
</template>

<style lang="scss" scoped>
    #section-2{
        font-family: 'Space Grotesk', sans-serif;
        height: 40rem;
        background-color: #1d1b2c;
        color: #F6EEE0;
        padding: 1rem 0;
    }

    h2 {
        font-size: 48px;
        color: #E7A117;
    }

    h3 {
        line-height: 2.5rem;
    }

    p {
        font-weight: lighter;
        line-height: 2.5rem;
        font-size: 24px;
    }

    img {
        width: 100%;
        border-radius: 20px;
        margin-left: 3rem;
    }

</style>
