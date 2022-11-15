// let JOGO_DESTAQUE = ['resident-evil-2-2019',
//                     'super-mario-3d-world-bowsers-fury', 
//                     'god-of-war-2',
//                     'hollow-knight'];
let JOGO_DESTAQUE = "resident-evil-2-2019";
const API_KEY = "f6a338153d63480fb7a4cd3cabaf5982";
// nomeJogo
// descricao
// publisher
// lancamento
// plataformas
// genero
// avaliacao

function carregaInfoDestaques () {
    let infos;
    let infoGenero;
    let infoPublisher;

    // for (let i = 0; i < JOGO_DESTAQUE.length; i++) {
        let http = new XMLHttpRequest();
        http.open('GET', 'https://api.rawg.io/api/games/'+JOGO_DESTAQUE+'?key='+API_KEY);
        http.send();

        http.onload = function () {
            let response = JSON.parse(this.responseText);
            console.log(response);
            document.getElementById("nomeJogo").innerHTML = response.nameOriginal;
        };
        // infos = realizarRequisicao(http, "GET", "https://api.rawg.io/api/games/"+JOGO_DESTAQUE[i]);
        // infoGenero = realizarRequisicao("GET", "https://api.rawg.io/api/genres/"+JOGO_DESTAQUE[i]);
        // infoPublisher = realizarRequisicao("GET", "https://api.rawg.io/api/publishers/"+JOGO_DESTAQUE[i]);
        
        // console.log(infos);
        // console.log(infoGenero);
        // console.log(infoPublisher);
        
        // http.onload = function () {
        //     // let response = JSON.parse(this.responseText);
    
        //     //String
        //     let nomeJogo = infos.nameOriginal;
    
        //     //String
        //     let descricao = infos.description;
    
        //     //String
        //     let publisher = infoPublisher.name;
    
        //     //String
        //     let lancamento = infos.released;
    
        //     //Array
        //     let plataformas = infos.platforms;
    
        //     //String
        //     let genero = infoGenero.name;
    
        //     // Integer
        //     let avaliacao = infos.rating;
            
        //     document.getElementById("nomeJogo").innerHTML = nomeJogo;
        // }
    // }
   
    // let http = new XMLHttpRequest();
    // console.log(infos);
    // console.log(infoGenero);
    // console.log(infoPublisher)
    // http.onload = function () {
    //     // let response = JSON.parse(this.responseText);

    //     //String
    //     let nomeJogo = infos.nameOriginal;

    //     //String
    //     let descricao = infos.description;

    //     //String
    //     let publisher = infoPublisher.name;

    //     //String
    //     let lancamento = infos.released;

    //     //Array
    //     let plataformas = infos.platforms;

    //     //String
    //     let genero = infoGenero.name;

    //     // Integer
    //     let avaliacao = infos.rating;    
    // }

    // http.open("GET", "https://api.rawg.io/api/games/");
    // http.setRequestHeader("key", "f6a338153d63480fb7a4cd3cabaf5982")
    // http.send("id=JOGO_DESTAQUE")

}

function realizarRequisicao (http, tipo, url, parametro = null, valorParamentro=null) {
    http.open(tipo, url);
    http.setRequestHeader("key", "f6a338153d63480fb7a4cd3cabaf5982");
    http.send();

    let response = JSON.parse(this.responseText);

    return response;
}

function obtemInfoGenero() {
    let http = new XMLHttpRequest();

    http.open("GET", "https://api.rawg.io/api/games/{id}");
    http.setRequestHeader("key", "f6a338153d63480fb7a4cd3cabaf5982")
    http.send("id=JOGO_DESTAQUE")
}

function carregaMaisDetalhes () {
    let infos = '';
    document.querySelector('#maisDetalhes') = infos
}