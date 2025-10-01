let url = 'https://anime-db.p.rapidapi.com/anime/by-id/';
let btn = document.getElementById("button_choixParam");

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '2893250d38msha2693fc658faba8p1d3d7ajsn469620810024',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};


function createCard(result) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h2>${result.title}</h2>    
        <img src="${result.image}"></img>
        <p><strong>Rating:</strong> ${result.rating}</p>
        <p><strong>Synopsis:</strong> ${result.synopsis}</p>
    `;
    document.body.appendChild(card);
}


async function fetchData() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const data = JSON.parse(result);
        console.log(data);
        console.log(data.data.length);
        
        try{
            for (let i = 0; i < data.data.length; i++){
            console.log(data.data[i]);
            createCard(data.data[i]);
            }
        } catch (error){
            createCard(data);
        }
        
    } catch (error) {
        console.error(error);
    }
}

function checkButton() {

    let param = document.getElementById("choixParam").value;
    let filtre = document.getElementById("choixFiltre").value;

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