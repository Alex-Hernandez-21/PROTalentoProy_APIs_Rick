rickMorty = []; 
//capturo mi div con esta clase
let animated = document.querySelector('.animated');
const searchInput = document.querySelector('#search-input');

const URL1 = "https://rickandmortyapi.com/api/character";

// //llamo la API
// fetch('https://rickandmortyapi.com/api/character')
// //la guardo en un Json
// .then((response) =>response.json())
// //la guardo en data
// .then((data) => {
// 	console.log(data.results);

// 	data.results.map((item) => {
// 		const animatedCard = document.createElement("div");
// 		animatedCard.innerHTML= `
// 								<h3>${item.name}</h3>
// 								<img src="${item.image}"></img>`;
// 		animated.append(animatedCard);
// 	});
// });

// let pagina = 1;
// const btnAnterior = document.getElementById('btnAnterior');
// const btnSiguiente = document.getElementById('btnSiguiente');

// btnSiguiente.addEventListener('click', () => {
// 	if(pagina < 42){
// 		pagina += 1;
// 		getAnimated();
// 	}
// });

// btnAnterior.addEventListener('click', () => {
// 	if(pagina > 1){
// 		pagina -= 1;
// 		getAnimated();
// 	}
// });

const getAnimated = async() => {
	try{
		const response = await fetch("https://rickandmortyapi.com/api/character");
		const data = await response.json();    //parsear la API a JSON
		const dataSelect = data.results; 
		// console.log(dataSelect);      //llamo lo que necesito de la API y lo guardo en variable
		return dataSelect;
	}
	catch(error) {
        console.log(error);
    }
};


//función para crear los div-cards
const createCard = (item) => {
	const animatedCard = document.createElement("div");
			animatedCard.classList = 'card-div';         
			animatedCard.innerHTML= `
								<h3>${item.name}</h3>
								<img src="${item.image}"></img>`;
			animated.append(animatedCard); 
};



window.addEventListener('DOMContentLoaded', async() => {     // evento para mostrar las cards cuando carga la página
	const data = await getAnimated();                        // llamo la función de la API
	// console.log(data[0].name);
	// console.log(data[0].image)
	renderAnimated(data);
	normalizeRick(data);
});   


const normalizeRick = (array) => {
	for(let p of array){
		const personaje = {
			// name: name,        
		};
		personaje.name = p.name.toLowerCase();
		personaje.image = p.image;
		rickMorty.push(personaje);
		// console.log(p);
	}
    // console.log(rickMorty);    
}

//función para recorrer la array de personajes 
const renderAnimated = (array) => {
    for (let i = 0; i < array.length; i++) {
        createCard(array[i]);
    }
}


//función para filtrar mi buscador con las cards

searchInput.addEventListener('keyup', e => {
	// const inputValue = searchInput.value.toLowerCase(); 
	let globalRick = searchByName(searchInput.value.toLowerCase());
	animated.innerHTML = '';
	renderAnimated(globalRick);	
	console.log(globalRick);
});


const searchByName = (searchingParameter) => {
    const filterRick = rickMorty.filter((personaje)=> {
        if(personaje.name.includes(searchingParameter)) {
            return personaje;
        }
		// console.log(rickMorty);
    });
    return filterRick;
}


