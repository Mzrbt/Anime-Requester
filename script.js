const url = 'https://anime-db.p.rapidapi.com/anime/by-id/1';
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

fetchData();

/*
window.addEventListener("load", () =>{
    function sendData() {

    }
})*/