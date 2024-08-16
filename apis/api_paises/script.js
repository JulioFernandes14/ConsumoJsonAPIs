const urls = [
 'https://restcountries.com/v3.1/all'
];

async function getJson(url)  {

    const response = await fetch(url);
    const dados = await response.json();
    return dados;

}

function gerarCards(arrObj,regex) {

    const container = document.createElement('div');
    container.classList = 'sessao-cards row'

    arrObj.then(arr => {
        arr.forEach(obj => {
		
            if (regex.test(obj.name.common.toLowerCase())) {
				
				const card = document.createElement('div');
				card.classList = 'col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 cardP';

				const informacoes = document.createElement('div');
				informacoes.classList = 'informacoes';

				// Div imagem
				const cardImg = document.createElement('div');
				cardImg.classList = 'card-img';

				const img = document.createElement('img');
				img.src = `${obj.flags.png}`;

				cardImg.appendChild(img);

				// Div conteúdo

				const cardConteudo = document.createElement('div');
				cardConteudo.classList = 'card-conteudo';

				const nome = document.createElement('span');
				nome.classList = 'nome-pais';
				nome.textContent = `Name: ${obj.name.common}`;

				const capital = document.createElement('span');
				capital.classList = 'capital-pais';
				capital.textContent = `Capital: ${obj.capital}`;

				const continente = document.createElement('span');
				continente.classList = 'continente-pais';
				continente.textContent = `Continent: ${obj.region}`;

				const populacao = document.createElement('span');
				populacao.classList = 'populacao-pais';
				populacao.textContent = `Population: ${obj.population.toLocaleString('pt-BR')}`;

				cardConteudo.appendChild(nome);
				cardConteudo.appendChild(capital);
				cardConteudo.appendChild(continente);
				cardConteudo.appendChild(populacao);

				//Div link

				const cardLink = document.createElement('div');
				cardLink.classList = 'card-link';

				const link = document.createElement('a');
				link.href = `${obj.maps.googleMaps}`;
				link.target = '_blank';
				link.textContent = 'View on maps';

				cardLink.append(link)

				//Setando card

				informacoes.appendChild(cardImg);
				informacoes.appendChild(cardConteudo);
				informacoes.appendChild(cardLink);

				card.appendChild(informacoes)
				container.appendChild(card);
			}
		})
    });
    

    return container

}

const listaObj = getJson(urls);

const defaultRegex = new RegExp('');
const painel = gerarCards(listaObj,defaultRegex);

document.addEventListener('DOMContentLoaded',function(){

    const main = document.querySelector('main');
	const busca = document.querySelector('#busca');

    main.appendChild(painel);
	
	busca.addEventListener('input',function(){
		
		main.textContent = '';
		
		const regex = new RegExp(`^${busca.value.toLowerCase()}`);
		const painelBusca = gerarCards(listaObj,regex);
		main.appendChild(painelBusca);
		
	});

});