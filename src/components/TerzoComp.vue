<script>

export default {
    name: 'SecondoComp',
}


</script>


<template>
   <div id="section-3">
    <div class="container h-100">
        <div class="row h-100 gx-5">
            <div class="col-12 col-md-5 d-flex align-items-center h-100 mt-1" data-aos="fade-right"
                data-aos-duration="2000">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="People working together">
            </div>
            <div class="col-12 col-md-7 h-100 d-flex flex-column justify-content-center" data-aos="fade-left"
                data-aos-duration="2000">
                <h2>Perchè chi fa affari <br>si rivolge a 
                <span style="color: #F6EEE0;">&lt;My_developer/&gt;</span></h2>
                <h3 class="my-2"><i class="fa-solid fa-star"></i>Qualità provata</h3>
                <p>Controlla i campioni di lavoro di qualsiasi professionista, i feedback dei clienti e la verifica dell'identità.</p>
                <h3 class="my-2"><i class="fa-solid fa-dollar-sign"></i>Nessun costo fino all'assunzione</h3>
                <p>Intervista i tuoi potenziali collaboratori, negozia le tariffe e paga solo per il lavoro che approvi.</p>
                <h3 class="my-2"><i class="fa-solid fa-check"></i>Sicurezza e protezione</h3>
                <p>Concentrati sul tuo lavoro, sapendo che 
                <span style="color: #F6EEE0;">&lt;My_developer/&gt;</span> ti aiutia a proteggere i tuoi dati e la tua privacy. Siamo qui per te, con un supporto 24 ore su 24.</p>
            </div>

        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    #section-3{
        background-color: #E7A117;
        color: #1d1b2c;
        font-family: 'Space Grotesk', sans-serif;
    }
    h2 {
    font-size: 44px;
    color: #1d1b2c;
    padding-bottom: 1.5rem;
    }

    h3 {
        line-height: 2.5rem;
    }

    p {
        font-weight: lighter;
        line-height: 2.5rem;
        font-size: 24px;
        padding-bottom: 1rem;
    }

    img {
        width: 100%;
        border-radius: 20px;
        margin-right: 2rem;
    }

    i {
        margin-right: 1.5rem;
    }

    @media screen and (min-width: 700px) {
        #section-3{
        height: 100vh;
        } 
    }
</style>