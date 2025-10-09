let url = 'https://anime-db.p.rapidapi.com/anime/by-id/';
let btn = document.getElementById("button_choixParam");
let recherche = document.getElementById("recherche");
let btnEffacer = document.getElementById("button_effacer");

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'dda0b0e7abmsh635c70595822706p1a5847jsnab7042edc621',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};


function createCard(result) {
    const card = document.createElement('div');
    card.classList.add('card');
    console.log(result);
    let genres = result.genres
    let synopsis = result.synopsis;
    let ranking = result.ranking;
    if (!result.hasRanking){
        ranking = "N/A";
    }
    if (synopsis === ""){
        synopsis = "N/A";
    }
    if (result.genres.length === 0){
        genres = "N/A";
    }
    card.innerHTML = `
        <h2>${result.title}</h2>    
        <img src="${result.image}"></img>
        <p><strong>Synopsis:</strong> ${synopsis}</p>
        <p><strong>Genres:</strong> ${genres}</p>
        <p><strong>Rank:</strong> ${ranking}</p>
        <p><strong>Id:</strong> ${result._id}</p>
    `;
    document.getElementById("result").appendChild(card);
}

function deleteCard() {
    let cards = document.getElementById("result");
    Array.from(cards.getElementsByClassName("card")).forEach(cards => cards.remove());
}

async function fetchData() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const data = JSON.parse(result);
        
        try{
            if (Array.isArray(data.data)) {
                for (let i = 0; i < data.data.length; i++){
                    console.log(data.data[i]);
                    createCard(data.data[i]);
                }
            } else {
                console.log(data.data);
                createCard(data.data);
            }
            
        } catch (error){
            createCard(data);
        }
        
    } catch (error) {
        console.error(error);
    }
}

function checkButton() {

    deleteCard();

    
    let filtre = document.getElementById("choixFiltre").value;

    if (filtre === 'Nom') {
        url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=' + recherche.value + '&sortBy=ranking&sortOrder=asc';
        return fetchData(url, options);
    } else if (filtre === 'ID') {
        url = 'https://anime-db.p.rapidapi.com/anime/by-id/' + recherche.value + '?page=1&size=1';
        return fetchData(url, options);
    } else if (filtre === 'Rank') {
        url = 'https://anime-db.p.rapidapi.com/anime/by-ranking/' + recherche.value;
        return fetchData(url, options);
    }
}

btnEffacer.addEventListener("click", event =>{
    deleteCard();
    recherche.value = "";
});

btn.addEventListener("click", checkButton);
recherche.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        checkButton();
    }
});