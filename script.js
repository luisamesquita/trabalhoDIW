// https://api.rawg.io/api/games/{id}/suggested
// https://api.rawg.io/api/publishers
// https://api.rawg.io/api/games
let JOGO_DESTAQUE = ['a-plague-tale-requiem',
                    'super-mario-3d-world-bowsers-fury', 
                    'god-of-war-2',
                    'hollow-knight'];
const API_KEY = "f6a338153d63480fb7a4cd3cabaf5982";
let responseDestaques = null;
let proximaURL;
// let listaJogos = [];

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
                    document.getElementById("lancamento").innerHTML = (new Date(responseDestaques.released)).getDate() 
                                                                + "/" + (new Date(responseDestaques.released)).getMonth() 
                                                                + "/" + (new Date(responseDestaques.released)).getFullYear();
                    document.getElementById("avaliacao").innerHTML = (responseDestaques.metacritic != null || responseDestaques.metacritic != "") ? responseDestaques.metacritic : "-";
                    document.getElementById("referencia").href = "detalhes.html?id="+responseDestaques.id;
                } else {
                    html = `<div class="carousel-item">
                            <article class="section-row-gap-50 section-column-xxs">
                                <img id="imagemJogo" src="${responseDestaques.background_image}"
                                    width="250" height="200"/>
                                <section class="width-100px section-column-gap-25">
                                    <header>
                                        <h3 id="nomeJogo">${responseDestaques.name_original}</h3>
                                    </header>
                                    <div class="section-column-gap-16">
                                        <div class="truncate-title">
                                            <span class="font-weight-700">Lançamento: </span>
                                            <span id="lancamento">
                                                ${(new Date(responseDestaques.released)).getDate() + "/" + 
                                                (new Date(responseDestaques.released)).getMonth() + "/" + 
                                                (new Date(responseDestaques.released)).getFullYear()}
                                            </span>
                                        </div>
                                        <div class="section-row-gap-16 section-column-xxs">
                                            <div class="truncate-title">
                                                <span class="font-weight-700">Avaliação: </span>
                                                <span id="avaliacao" class="font-score">${(responseDestaques.metacritic != null || responseDestaques.metacritic != "") ? responseDestaques.metacritic : "-"}</span>
                                            </div>        
                                        </div>
                                        <div class="section-row-gap-8">
                                            <a href="detalhes.html?id=${responseDestaques.id}"
                                                class="section-row-flex-end-left truncate-title">
                                                Mais detalhes ...
                                            </a>
                                        </div>
                                    </div>
                                </section>
                            </article>
                        </div>`;
                }
                document.getElementById("destaques").innerHTML += html;
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
        let avaliacao = response.metacritic !== null ? response.metacritic : "-";
        let developers = response.developers.map(i => (i.name != null || i.name != "") ? i.name : "-").toString();
        let plataforms = response.platforms.map(i => (i.platform.name != null || i.platform.name != "") ? i.platform.name : "-").toString();
        let genero = response.genres.map(i => (i.name != null || i.name != "") ? i.name : "-").toString();
        let lojas = response.stores.map(i => (i.store.name != null || i.store.name != "") ? i.store.name : "-").toString();
        document.getElementById("imagemJogo").src = response.background_image_additional;
        document.getElementById("nomeJogo").innerHTML = response.name_original;
        document.getElementById("lancamento").innerHTML = (new Date(response.released)).getDate() + "/" + (new Date(response.released)).getMonth() + "/" + (new Date(response.released)).getFullYear();
        document.getElementById("avaliacao").innerHTML = avaliacao;
        document.getElementById("descricaoJogo").innerHTML = response.description;
        document.getElementById("publisher").innerHTML = developers;
        document.getElementById("plataformas").innerHTML = plataforms;
        document.getElementById("genero").innerHTML = genero;
        document.getElementById("lojas").innerHTML = lojas;
    }

    http.open("GET", "https://api.rawg.io/api/games/"+idJogo+'?key='+API_KEY);
    http.send();
}

function carregaInfoGeneros() {
    http = new XMLHttpRequest();
    let response;
    http.onload = function () {
        response = JSON.parse(http.responseText);
        response = response.results;
        for (let i = 0; i < 4; i++) {
            document.getElementById("generos").innerHTML +=
            `<a class="section-column-gap-16 --font-size-tiny">
                <div class="section-row-gap-25">
                    <div class="truncate-title-item">
                        <span id = "nomeGenero">${response[i].name}</span>
                    </div>
                </div>
                <img 
                    width="250" height="200"
                    src="${response[i].image_background}"
                />
                <span class="font-weight-700">Principais Jogos</span>
                <ul>
                    <li>${response[i].games[0].name}</li>
                    <li>${response[i].games[1].name}</li>
                    <li>${response[i].games[2].name}</li>
                    <li>${response[i].games[3].name}</li>
                    <li>${response[i].games[4].name}</li>
                    <li>${response[i].games[5].name}</li>
                </ul>
            </a>`;
        }
    }

    http.open("GET", "https://api.rawg.io/api/genres?key="+API_KEY);
    http.send();
}

function limpar() {
    document.getElementById("inputPesquisarJogo").value = "";
}

function carregaPesquisa() {
    document.getElementById("cardsPesquisas").innerHTML = "";
    let http = [];
    let responsePesquisa;
    let listaJogosFiltradaNomes;
    let itemParaPesquisar = document.getElementById("inputPesquisarJogo").value;
    let x = 2;
    for (let i = 1; i < x; i++) {
        (function(i) {
            http[i] = new XMLHttpRequest();
            http[i].onload = function () {
                responsePesquisa = JSON.parse(http[i].responseText);
                if (responsePesquisa.next != null) {
                    x++;
                } else { i = x;}
                responsePesquisa.results.forEach(jogo => {
                    let avaliacao = (jogo.metacritic != null) ? jogo.metacritic : "-";
                    let genero = jogo.genres.map(i => (i.name != null || i.name != "") ? i.name : "-").toString();
                    document.getElementById("cardsPesquisas").innerHTML +=
                    `<div class="card row-8 my-1 mx-1 col-sm-3 background-pastel" >
                        <img src="${jogo.background_image}" class="card-img-top">
                        <div class="card-body">
                            <h3 class="card-title">${jogo.name}</h5>
                            <div class="truncate-title">
                                <span class="card-text font-weight-700">Avaliação: </span>
                                <span id="avaliacao">${avaliacao}</span>
                            </div>
                            <div class="truncate-title">
                                <span class="card-text font-weight-700">Gênero: </span>
                                <span id="lancamento">${genero}</span>
                            </div>
                            <a href="detalhes.html?id=${jogo.id}"
                                class="section-row-flex-end-left truncate-title">
                                Mais detalhes ...
                            </a>
                        </div>
                    </div>`;
                })
                console.log(listaJogosFiltradaNomes);
            };
            http[i].open("GET", "https://api.rawg.io/api/games?key=f6a338153d63480fb7a4cd3cabaf5982&page="+i+"&page_size=40&search="+itemParaPesquisar+"&search_precise=true");
            http[i].send();
        })(i);
    }

    
}