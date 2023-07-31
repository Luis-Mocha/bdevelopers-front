<script>

export default {
    name: 'PrimoComp',
    mounted() {
        this.prova();
    },
    methods: {
        prova() {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('resize', handleWindowResize);

            const spansSlow = document.querySelectorAll('.spanSlow');
            const spansFast = document.querySelectorAll('.spanFast');

            let width = window.innerWidth;

            function handleMouseMove(e) {
                let normalizedPosition = e.pageX / (width / 2) - 1;
                let speedSlow = 100 * normalizedPosition;
                let speedFast = 200 * normalizedPosition;
                spansSlow.forEach((span) => {
                    span.style.transform = `translate(${speedSlow}px)`;
                });
                spansFast.forEach((span) => {
                    span.style.transform = `translate(${speedFast}px)`
                })
            }
            //we need to recalculate width when the window is resized
            function handleWindowResize() {
                width = window.innerWidth;
            }
        }
    }
}

</script>


<template>
    <div id="section-1">
        <!-- <h1>&lt;My_developer/&gt;</h1> -->
        <h1 class="d-lg-none">Abbiamo costruito<br /> una nuova casa per le tue idee</h1>
        <div id="description-jumbo">
            <span class="title-description">&lt;My_developer/&gt;</span><br />
            <span>è il posto ideale per trasformare la tua idea in un progetto reale, </span>
            <span>qui troverai lo sviluppatore che stai cercando!</span>
        </div>

        <div class="wrap d-none d-lg-block">
            <div class="line">
                <div class="left">
                    <div class="content">
                        <span class="spanSlow mt-5">Abbiamo costruito</span>
                    </div>
                </div><!--
      -->
                <div class="right">
                    <div class="content">
                        <span class="spanSlow">Abbiamo costruito</span>
                    </div>
                </div>
            </div>
            <div class="line">
                <div class="left">
                    <div class="content">
                        <span class="spanSlow">una nuova</span>
                    </div>
                </div><!--
      -->
                <div class="right">
                    <div class="content">
                        <span class="spanSlow">una nuova</span>
                    </div>
                </div>
            </div>
            <div class="line">
                <div class="left">
                    <div class="content">
                        <span class="spanFast">casa</span>
                    </div>
                </div><!--
          -->
                <div class="right">
                    <div class="content">
                        <span class="spanFast">casa</span>
                    </div>
                </div>
            </div>
            <div class="line">
                <div class="left">
                    <div class="content">
                        <span class="spanSlow">per le tue idee</span>
                    </div>
                </div><!--
            -->
                <div class="right">
                    <div class="content">
                        <span class="spanSlow">per le tue idee</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
//font-family: 'Anton', sans-serif;
//font-family: 'Handjet', cursive;
//font-family: 'Josefin Sans', sans-serif;
//font-family: 'Montserrat', sans-serif;
#section-1 {
    height: calc(100vh - 60px);
    background-image: url(https://media.gettyimages.com/id/1081869160/it/foto/ha-abbastanza-familiarit%C3%A0-con-il-mondo-avanzato.jpg?s=2048x2048&w=gi&k=20&c=-3saErwF6vjhWbmqhX3qUvy0NfZy6SvLvo5lJaztlg0=);
    position: relative;
    border-bottom: 2px solid #E7A117;
    background-size: cover;

    h1 {
        font-size: 60px;
        color: #E7A117;
        position: absolute;
        top: 100px;
        left: 50px;
        font-family: 'Anton', sans-serif;
    }

    .wrap {
        position: absolute;
        top: 200px;
        left: -150px;
        font-family: 'Anton', sans-serif;
        font-size: 60px;


        .line {
            width: 100vw;
        }

        .left,
        .right {
            width: 50vw;
            overflow: hidden;
            display: inline-block;
        }

        .left {
            color: #E7A117;
            transform: skew(0deg, -15deg);
        }

        .right {
            color: #F6EEE0;
            transform: skew(0deg, 15deg);
        }

        .left .content {
            width: 100vw;
            text-align: center;
        }

        .right .content {
            width: 100vw;
            text-align: center;
            transform: translate(-50vw);
        }
    }


    span {
        display: inline-block;
        font-size: 4vw;
        text-transform: uppercase;
        line-height: .8;
        transition: ease-out .6s;
    }

    #description-jumbo {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 15%;
        width: 100%;
        background-color: #1d1b2c;
        border-radius: 20px 0 0 0;
        padding: 10px 30px;

        // border: 1px solid #E7A117;
        .title-description {
            font-family: 'Anton', sans-serif;
            color: #E7A117;
            font-size: 18px;
            padding-top: 10px;
            padding-left: 10px;
        }

        span {
            font-family: 'Montserrat', sans-serif;
            color: #F6EEE0;
            font-size: 12px;
        }
    }
}

@media screen and (min-width: 700px) {
    #section-1 {
        height: calc(100vh - 60px);
        background-image: url(https://media.gettyimages.com/id/1081869160/it/foto/ha-abbastanza-familiarit%C3%A0-con-il-mondo-avanzato.jpg?s=2048x2048&w=gi&k=20&c=-3saErwF6vjhWbmqhX3qUvy0NfZy6SvLvo5lJaztlg0=);
        position: relative;
        border-bottom: 2px solid #E7A117;
        background-size: cover;

        span {
            display: inline-block;
            font-size: 4vw;
            text-transform: uppercase;
            line-height: .8;
            transition: ease-out .6s;
        }

        #description-jumbo {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 12%;
            width: 50%;
            background-color: #1d1b2c;
            border-radius: 20px 0 0 0;
            padding: 10px 30px;

            // border: 1px solid #E7A117;
            .title-description {
                font-family: 'Anton', sans-serif;
                color: #E7A117;
                font-size: 22px;
                padding-top: 10px;
                padding-left: 10px;
            }

            span {
                font-family: 'Montserrat', sans-serif;
                color: #F6EEE0;
                font-size: 16px;
            }
        }
    }
}

@media screen and (min-width: 992px) {

    #section-1 {
        height: calc(100vh - 60px);
        background-image: url(https://media.gettyimages.com/id/1081869160/it/foto/ha-abbastanza-familiarit%C3%A0-con-il-mondo-avanzato.jpg?s=2048x2048&w=gi&k=20&c=-3saErwF6vjhWbmqhX3qUvy0NfZy6SvLvo5lJaztlg0=);
        position: relative;
        border-bottom: 2px solid #E7A117;
        background-size: cover;

        // h1 {
        //     font-size: 110px;
        //     color: #E7A117;
        //     position: absolute;
        //     top: 100px;
        //     left: 50px;
        //     font-family: 'Anton', sans-serif;
        // }

        .wrap {
            font-family: 'Anton', sans-serif;
            font-size: 60px;


            .line {
                width: 100vw;
            }

            .left,
            .right {
                width: 50vw;
                overflow: hidden;
                display: inline-block;
            }

            .left {
                color: #E7A117;
                transform: skew(0deg, -15deg);
            }

            .right {
                color: #F6EEE0;
                transform: skew(0deg, 15deg);
            }

            .left .content {
                width: 100vw;
                text-align: center;
            }

            .right .content {
                width: 100vw;
                text-align: center;
                transform: translate(-50vw);
            }
        }


        span {
            display: inline-block;
            font-size: 4vw;
            text-transform: uppercase;
            line-height: .8;
            transition: ease-out .6s;
        }

        #description-jumbo {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 15%;
            width: 40%;
            background-color: #1d1b2c;
            border-radius: 20px 0 0 0;
            padding: 10px 30px;

            // border: 1px solid #E7A117;
            .title-description {
                font-family: 'Anton', sans-serif;
                color: #E7A117;
                font-size: 35px;
                padding-top: 10px;
                padding-left: 10px;
            }

            span {
                font-family: 'Montserrat', sans-serif;
                color: #F6EEE0;
                font-size: 20px;
            }
        }
    }


}
</style>