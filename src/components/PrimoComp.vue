<script>

export default {
    name: 'PrimoComp',
}

</script>


<template>
   <div id="section-1">
        <!-- <h1>&lt;My_developer/&gt;</h1> -->
        <h1>Abbiamo costruito<br/> una nuova casa per le tue idee</h1>
        <div id="description-jumbo">
            <span class="title-description">&lt;My_developer/&gt;</span><br/>
            <span>è il posto ideale per trasformare la tua idea in un progetto reale, </span>
            <span>qui troverai lo sviluppatore che stai cercando!</span> 
        </div>
   </div>
</template>

<style lang="scss" scoped>
     //font-family: 'Anton', sans-serif;
     //font-family: 'Handjet', cursive;
     //font-family: 'Josefin Sans', sans-serif;
     //font-family: 'Montserrat', sans-serif;
     #section-1{
         height: calc(100vh - 60px);
         background-image: url( https://media.gettyimages.com/id/1081869160/it/foto/ha-abbastanza-familiarit%C3%A0-con-il-mondo-avanzato.jpg?s=2048x2048&w=gi&k=20&c=-3saErwF6vjhWbmqhX3qUvy0NfZy6SvLvo5lJaztlg0=);
         position: relative;
         border-bottom: 2px solid #E7A117;
         background-size: cover;
         h1{
             font-size: 60px;
             color: #E7A117;
             position: absolute;
             top: 100px;
             left: 50px;
             font-family: 'Anton', sans-serif;
      
         }
         #description-jumbo{
             position: absolute; 
             bottom: 0;
             right: 0;
             height: 15%;
             width: 100%;
             background-color: #1d1b2c;
             border-radius: 20px 0 0 0;
             padding: 10px 30px;
             // border: 1px solid #E7A117;
             .title-description{
                 font-family: 'Anton', sans-serif;
                 color: #E7A117;
                 font-size: 18px;
                 padding-top: 10px;
                 padding-left: 10px;
             }
             span{
             font-family: 'Montserrat', sans-serif;
             color: #F6EEE0;
             font-size: 12px;
             }
         }
     }
     @media screen and (min-width: 700px) {
        #section-1{
         height: calc(100vh - 60px);
         background-image: url( https://media.gettyimages.com/id/1081869160/it/foto/ha-abbastanza-familiarit%C3%A0-con-il-mondo-avanzato.jpg?s=2048x2048&w=gi&k=20&c=-3saErwF6vjhWbmqhX3qUvy0NfZy6SvLvo5lJaztlg0=);
         position: relative;
         border-bottom: 2px solid #E7A117;
         background-size: cover;
         h1{
             font-size: 60px;
             color: #E7A117;
             position: absolute;
             top: 100px;
             left: 50px;
             font-family: 'Anton', sans-serif;
      
         }
         #description-jumbo{
             position: absolute; 
             bottom: 0;
             right: 0;
             height: 12%;
             width: 50%;
             background-color: #1d1b2c;
             border-radius: 20px 0 0 0;
             padding: 10px 30px;
             // border: 1px solid #E7A117;
             .title-description{
                 font-family: 'Anton', sans-serif;
                 color: #E7A117;
                 font-size: 22px;
                 padding-top: 10px;
                 padding-left: 10px;
             }
             span{
             font-family: 'Montserrat', sans-serif;
             color: #F6EEE0;
             font-size: 16px;
             }
         }
     }
     }
    
    @media screen and (min-width: 992px) {
    
        #section-1{
            height: calc(100vh - 60px);
            background-image: url( https://media.gettyimages.com/id/1081869160/it/foto/ha-abbastanza-familiarit%C3%A0-con-il-mondo-avanzato.jpg?s=2048x2048&w=gi&k=20&c=-3saErwF6vjhWbmqhX3qUvy0NfZy6SvLvo5lJaztlg0=);
            position: relative;
            border-bottom: 2px solid #E7A117;
            background-size: cover;
            h1{
            font-size: 110px;
            color: #E7A117;
            position: absolute;
            top: 100px;
            left: 50px;
            font-family: 'Anton', sans-serif;   
            }
        #description-jumbo{
            position: absolute; 
            bottom: 0;
            right: 0;
            height: 15%;
            width: 40%;
            background-color: #1d1b2c;
            border-radius: 20px 0 0 0;
            padding: 10px 30px;
            // border: 1px solid #E7A117;
            .title-description{
                font-family: 'Anton', sans-serif;
                color: #E7A117;
                font-size: 35px;
                padding-top: 10px;
                padding-left: 10px;
            }
            span{
            font-family: 'Montserrat', sans-serif;
            color: #F6EEE0;
            font-size: 20px;
            }
        }
        }
    
    
    }
</style>