let url = 'https://anime-db.p.rapidapi.com/anime/by-id/';

var filtre = document.getElementById("choixFiltre");
var btn = document.getElementById("button_choixParam");

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

function checkButton() {
    var param = document.getElementById("choixParam").value;
    filtre = filtre.options;
    if (filtre === 'Nom') {
        url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=' + param + '&sortBy=ranking&sortOrder=asc';
        return fetchData(url, options);
    } else if (filtre === 'ID') {
        url = 'https://anime-db.p.rapidapi.com/anime/by-id/' + param;
        return fetchData(url, options);
    } else if (filtre === 'Rank') {
        url = 'https://anime-db.p.rapidapi.com/anime/by-ranking/' + RANK;
        return fetchData(url, options);
    }
}

btn.addEventListener("click", checkButton);

fetchData();

