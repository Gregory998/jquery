// TOUT LE CODE DOIT ÊTRE FAIT DANS LA FORMULE SUIVANTE :

$(document).ready(function(){
    console.log("ok")
    // Ici on lit la valeur du h1
    let coucou = $("#coucou").html()
    console.log(coucou)
    // Ici on modifie la valeur du h1
    $("#coucou").html("Jo est méchant avec le formateur")
    // Ici je récupère les <li>
    console.log($('li'))
    // eq permet d'accéder à l'index d'un tableau d'élément jquery
    // chat devient tardigrade
    $('li').eq(1).html('Tartigrade')
    // Ici on change la couleur du premier <li>
    $('li').eq(0).css("color", "red")
    // Ici on modifie les li comme si on était dans le CSS 
    $('li').css({
        "list-style" : "none",
        "font-size" : "5em",
    })
    // Ici on modifie le button afin qu'il devient vert quand on click dessus
    $("#btn").on('click', function(){
        $(this).css("background-color", "chartreuse")
    })
    // Ici on modifie la couleur du premier <p>
    $('p').first().css("color", "blue")
    
    // Ici le bouton change de couleur quand on passe dessus
    $('.cacher').each(function(){
        $(this).on("mouseover", hover).on("mouseleave", nohover)
    });

    function hover () {
        $(this).addClass("orange")
        $(this).removeClass('violet')
    }
    function nohover () {
        $(this).addClass("violet")
        $(this).removeClass('orange')
    }


    // API KEY
    // 629025a4599e76c12ebcbfbee2f35b765c7fbd4400e9281b624b66628166e21c

    let ctx = $('#chart')
    

    $('#ajax').on('click', function(){
        $.ajax("https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=60&api_key=629025a4599e76c12ebcbfbee2f35b765c7fbd4400e9281b624b66628166e21c")
        .done(function(res){
            let data = res.Data.Data
            console.log(data)

            let time = []
            let valueMaxBTC = []
            let valueMinBTC = []
            data.forEach(element => {
                time.push(convertTimeStamp(element.time))
                valueMaxBTC.push(element.high)
                valueMinBTC.push(element.low)
            });
            console.log(time)
            new Chart(ctx, {
                type: 'line',
                data: {
                  labels: time,
                  datasets: [{
                    label: 'Value max of Bitcoin until 2 months',
                    data: valueMaxBTC,
                    borderWidth: 1
                  },{
                    label: 'Value min of Bitcoin until 2 months',
                    data: valueMinBTC,
                    borderWidth: 1
                    }],
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
            });

        })
    })

    function convertTimeStamp(time) {
        let date = new Date(time * 1000)
        let year = date.getFullYear()
        let month = date.getMonth() < 10 ? "0" + date.getMonth():date.getMonth()
        let day = date.getDay() < 10 ? "0" + date.getDay():date.getDay()
        return `${day}/${month}/${year}`
    }

})