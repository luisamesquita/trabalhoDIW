let JOGO_DESTAQUE = ['resident-evil-2-2019',
                    'super-mario-3d-world-bowsers-fury', 
                    'god-of-war-2',
                    'hollow-knight'];
const API_KEY = "f6a338153d63480fb7a4cd3cabaf5982";

function realizarRequisicao (http, tipo, url) {
    http.open(tipo, url+'?key='+API_KEY);
    http.send();

    let response = JSON.parse(this.responseText);

    return response;
}

function carregaInfoDestaques () {
    let arrayAuxiliar = [];
    for (let i = 0; i < JOGO_DESTAQUE.length; i++) {
        let http = new XMLHttpRequest();
        renponse = realizarRequisicao(http, "GET", "https://api.rawg.io/api/games/"+JOGO_DESTAQUE[i]);
        http.onload = function () {
            // Number
            document.getElementById("idJogo").innerHTML = response.id;

            //Imagem
            document.getElementById("imagemJogo").src = response.background_image;

            // String
            document.getElementById("nomeJogo").innerHTML = response.name_original;

            //String
            document.getElementById("descricao").innerHTML = response.description;

            // Array
            document.getElementById("publisher").innerHTML = response.developers.map(i => i.name).toString();

            // String
            document.getElementById("lancamento").innerHTML = response.released;

            // Array
            document.getElementById("plataformas").innerHTML = response.platforms.map(i => i.name).toString();

            // Array
            document.getElementById("genero").innerHTML = response.genres.map(i => i.name).toString();

            // Double/Float
            document.getElementById("avaliacao").innerHTML = response.rating;
        };
    }
}



function carregaMaisDetalhes () {
    let infos = '';
    document.querySelector('#maisDetalhes') = infos
}

function carregaMaisLancamentos() {
    
}