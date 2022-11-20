// https://api.rawg.io/api/games/{id}/suggested
let JOGO_DESTAQUE = ['a-plague-tale-requiem',
                    'super-mario-3d-world-bowsers-fury', 
                    'god-of-war-2',
                    'hollow-knight'];
const API_KEY = "f6a338153d63480fb7a4cd3cabaf5982";
let responseDestaques = null;

const urlParams = new URLSearchParams(location.search);
if (urlParams.get('id') != null) carregaMaisDetalhes();

function carregaInfoDestaques () {
    let http = [];
    let html = '';
    for (let i = 0; i < JOGO_DESTAQUE.length; i++) {
        (function(i) {
            http[i] = new XMLHttpRequest();
            http[i].onload = function () {
                responseDestaques = JSON.parse(http[i].responseText);
                if (i == 0) {
                    document.getElementById("imagemJogo").src = responseDestaques.background_image;
                    document.getElementById("nomeJogo").innerHTML = responseDestaques.name_original;
                    document.getElementById("lancamento").innerHTML = responseDestaques.released;
                    document.getElementById("avaliacao").innerHTML = responseDestaques.metacritic;
                    document.getElementById("referencia").href = "detalhes.html?id="+responseDestaques.id;
                } else {
                    html = `<div class="carousel-item">
                            <article class="section-row-gap-50 section-column-xxs height-200px-xxxxs">
                                <body background="${responseDestaques.background_image_additional}">
                                    <img id="imagemJogo" src="${responseDestaques.background_image}"
                                        width="320" height="205"/>
                                    <section class="width-250px section-column-gap-25">
                                        <header>
                                            <h3 id="nomeJogo">${responseDestaques.name_original}</h3>
                                        </header>
                                        <div class="truncate-title">
                                            <span class="font-weight-700">Lançamento: </span>
                                            <span id="lancamento">${responseDestaques.released}</span>
                                        </div>
                                        <div>
                                            <span class="font-weight-700">Avaliação: </span>
                                            <span id="avaliacao" class="font-score">${responseDestaques.metacritic}</span>
                                        </div>
                                        <a href="detalhes.html?id=${responseDestaques.id}"
                                            class="section-row-flex-end-left truncate-title">
                                            Mais detalhes ...
                                        </a>
                                    </section>
                                </body>
                            </article>
                        </div>`;
                }
                document.getElementById("destaques").innerHTML = 
                document.getElementById("destaques").innerHTML + html;
                html = '';
            };
            http[i].open("GET", "https://api.rawg.io/api/games/"+JOGO_DESTAQUE[i]+'?key='+API_KEY);
            http[i].send();
        })(i);
    }
}

function carregaMaisDetalhes () {
    http = new XMLHttpRequest();
    let idJogo = parseInt(urlParams.get('id'));
    let response;
    http.onload = function () {
        response = JSON.parse(http.responseText);
        document.getElementById("imagemJogo").src = response.background_image_additional;
        document.getElementById("nomeJogo").innerHTML = response.name_original;
        document.getElementById("lancamento").innerHTML = response.released;
        document.getElementById("avaliacao").innerHTML = response.metacritic;
        document.getElementById("descricaoJogo").innerHTML = response.description;
        document.getElementById("publisher").innerHTML = response.developers.map(i => i.name).toString();
        document.getElementById("plataformas").innerHTML = response.platforms.map(i => i.platform.name).toString();
        document.getElementById("genero").innerHTML = response.genres.map(i => i.name).toString();
        document.getElementById("avaliacao").innerHTML = response.metacritic;
        document.getElementById("lojas").innerHTML = response.stores.map(i => i.store.name).toString();
    }

    http.open("GET", "https://api.rawg.io/api/games/"+idJogo+'?key='+API_KEY);
    http.send();
}