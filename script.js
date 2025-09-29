let url = 'https://anime-db.p.rapidapi.com/anime/by-id/';

var btnID = document.getElementById("button_ID");
var btnNAME = document.getElementById("button_NAME");
var btnRANK = document.getElementById("button_RANK")

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'dda0b0e7abmsh635c70595822706p1a5847jsnab7042edc621',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

async function fetchData() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

function checkName() {
    var NAME = document.getElementById("valeur_NAME").value;
    url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=' + NAME + '&sortBy=ranking&sortOrder=asc';
    return fetchData(url, options);
}

function checkID() {
    var ID = document.getElementById("valeur_ID").value;
    url = 'https://anime-db.p.rapidapi.com/anime/by-id/' + ID;
    return fetchData(url, options);
}

function checkRank() {
    var RANK = document.getElementById("valeur_RANK").value;
    url = 'https://anime-db.p.rapidapi.com/anime/by-ranking/' + RANK;
    return fetchData(url, options);
}

btnID.addEventListener("click", checkID);
btnNAME.addEventListener("click", checkName);
btnRANK.addEventListener("click", checkRank);

fetchData();

