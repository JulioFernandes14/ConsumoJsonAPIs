async function getJson(url)  {

    const response = await fetch(url);
    const dados = await response.json();
    return dados;

}

function seletor(tag) {
	
	return document.querySelector(tag);
	
}

document.addEventListener('DOMContentLoaded',function(){

	const card = seletor('main > div');
	const cardConteudo = seletor('main > div > div');
	const input = seletor('input');
	const btn = seletor ('button');
	
	btn.addEventListener('click',function(){
		
		const cep = getJson(`https://viacep.com.br/ws/${input.value}/json`);
		
		cardConteudo.textContent = '';
		
		console.log(cep);
		
		cep.then(item => {
			
			if (item.erro) {
				
				cardConteudo.textContent = 'Cep inválido';
				
			} else {
				const cepT = document.createElement('p');
				cepT.textContent = `Cep: ${item.cep}`;
				
				const logradouro = document.createElement('p');
				logradouro.textContent = `Logradouro: ${item.logradouro}`;
				
				const bairro = document.createElement('p');
				bairro.textContent = `Bairro: ${item.bairro}`;
				
				const localidade = document.createElement('p');
				localidade.textContent = `Localidade: ${item.localidade}, ${item.uf}`;
				
				cardConteudo.appendChild(cepT);
				cardConteudo.appendChild(logradouro);
				cardConteudo.appendChild(bairro);
				cardConteudo.appendChild(localidade);
			}
			
		}).catch(error => {
			cardConteudo.textContent = 'Cep inválido';
		});
		
	});

});