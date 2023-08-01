<script>

export default {
    name: 'SecondoComp',
}


</script>


<template>
    <div id="section-4">
        <h2 class="text-center pt-4 title">Perché &lt;My_developer/&gt;?</h2>
        <h2 class="h2-mobile">Perché <br> &lt;My_developer/&gt;?</h2>
        <div class="sec-container">
            <div class="div-jumbo">
                <div class="sx">
                    <div class="top" data-aos="slide-right" data-aos-duration="1300">
                        <ul>
                            <li><i class="fa-solid fa-universal-access"></i>
                                <p> Sicuro & Intuitivo.</p>
                            </li>
                            <li>
                                <i class="fa-solid fa-gem"></i>
                                <p> Costruisci la tua rete professionale.</p>
                            </li>
                            <li><i class="fa-solid fa-microchip"></i>
                                <p> Tecnologia affidabile.</p>
                            </li>
                            <li><i class="fa-solid fa-user-group"></i>
                                <p> Dove collaborare è facile.</p>
                            </li>
                        </ul>
                    </div>
                    <div class="bot" data-aos="slide-right" data-aos-duration="1800"></div>
                </div>
                <div class="dx" data-aos="slide-left" data-aos-duration="1500"></div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
#section-4 {
    height: 100vh;
    /* background-color: yellow; */
    background-color: #F6EEE0;
    font-family: 'Montserrat', sans-serif;

    font-size: 20px;

    h2 {
        font-size: 50px;
        font-weight: bold;
    }

    .h2-mobile {
        display: none;
    }

    .sec-container {


        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        .div-jumbo {
            height: 100%;
            padding-bottom: 50px;
            width: 80%;
            /* border: 2px dotted red; */
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .dx,
            .sx {
                /* background-color: turquoise; */
                height: 80%;
                width: 49.5%;
            }

            .dx {
                background-image: url(https://media.gettyimages.com/id/1137939519/it/foto/giovane-programmatore-afroamericano-che-lavora-su-pc-desktop-in-ufficio.jpg?s=612x612&w=0&k=20&c=FvxKVogTsASr9bfvRWUFxrUmi-6UMiYLIT-WzGztaeI=);
                /* background-attachment: fixed;
                    background-repeat: no-repeat;*/
                background-size: cover;
                background-position: center;
                border-radius: 20px;

            }

            .sx {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .bot {
                    /* background-attachment: fixed;*/
                    background-repeat: no-repeat;
                    background-size: cover;
                    border-radius: 20px;
                    background-image: url(https://media.gettyimages.com/id/1212006391/it/foto/programmatore-di-computer-che-lavora-a-un-nuovo-programma-software.jpg?s=612x612&w=0&k=20&c=wMvYVSWbbhfp69x2t7fHrQ09GE3R8CU2b0x-w2nMUQA=);
                }

                .top,
                .bot {
                    height: 49%;
                    width: 100%;
                }

                .top {
                    background-color: rgb(29, 27, 44);
                    border: 2px solid #E7A117;
                    border-radius: 20px;
                    color: white;

                    ul {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        padding-left: 0;

                        li {
                            width: 48%;
                            height: 48%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            flex-direction: column;
                            padding: 10px;

                            i {
                                font-size: 35px;
                                padding-bottom: 4px;
                                color: #E7A117;
                            }

                            .fa-gem {
                                padding-top: 25px;
                            }


                        }
                    }


                }
            }

        }
    }



}

/* tablet */
@media all and (max-width:834px) {

    .dx {
        display: none;
    }



    #section-4 .sec-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 92%;

        .div-jumbo .sx {
            /* background-color: turquoise; */
            width: 100%;
            height: 85%;
            align-items: flex-start;

            .top {
                height: 60%;
                margin-bottom: 20px;
            }
        }
    }
}


/* mobile */
@media all and (max-width:429px) {

    .title {
        display: none;
    }

    .h2-mobile {
        display: block !important;
        font-size: 40px !important;
        padding-top: 15px;
        text-align: center;
    }

    #section-4 .sec-container {
        .div-jumbo .sx {


            /* .bot {
                    display: none;
                } */

            .top {
                height: 90%
            }
        }
    }

}
</style>