const climas = getJson('https://api.open-meteo.com/v1/forecast?latitude=-22.9064&longitude=-43.1822&hourly=temperature_2m');

async function getJson(url)  {

    const response = await fetch(url);
    const dados = await response.json();
    return dados;

}

function getTime(obj) {
	
	let minMax = [];
	
	arrTempo = obj.hourly.temperature_2m;
	
	let cicloInicio = 0
	let cicloFim = 23;
		
	for (let i = 0; i < 7; i++) {
		
		const climaDia = arrTempo.slice(cicloInicio,cicloFim);
		
		const retornarDia = {
		min: Math.min.apply(null, climaDia),
		max: Math.max.apply(null, climaDia)
	}

	minMax.push(retornarDia);

	cicloInicio = cicloFim + 1;
	cicloFim += 24;

	}
	
	return minMax;
	
	
}

function mostrarClima(arr) {
	
	const hoje = new Date();
	
	const tabela = document.createElement('div');
	tabela.classList = 'row tabela-clima';
	
	const celulaDia = document.createElement('div');
	celulaDia.classList = 'col-6 cabecalho';
	celulaDia.textContent = `Dia`;
		
	const celulaMinima = document.createElement('div');
	celulaMinima.classList = 'col-3 cabecalho';
	celulaMinima.textContent = `Mínima (°C)`;
		
	const celulaMaxima = document.createElement('div');
	celulaMaxima.classList = 'col-3 cabecalho';
	celulaMaxima.textContent = `Máxima (°C)`;
	
	tabela.appendChild(celulaDia);
	tabela.appendChild(celulaMinima);
	tabela.appendChild(celulaMaxima);
	
	for (let i = 0; i < 7; i++) {
		
		const celulaDia = document.createElement('div');
		celulaDia.classList = 'col-6';
		celulaDia.textContent = `${((hoje.getDate() + i).toString().padStart(2, '0')).toString().padStart(2, '0')}/${(hoje.getMonth()+1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;
		
		const celulaMinima = document.createElement('div');
		celulaMinima.classList = 'col-3';
		celulaMinima.textContent = `${arr[i].min}`;
		
		const celulaMaxima = document.createElement('div');
		celulaMaxima.classList = 'col-3';
		celulaMaxima.textContent = `${arr[i].max}`;
		
		tabela.appendChild(celulaDia);
		tabela.appendChild(celulaMinima);
		tabela.appendChild(celulaMaxima);
		
	}
	
	return tabela;
	
}

document.addEventListener('DOMContentLoaded',function(){
	
	climas.then(item => {
	
		const resultado = getTime(item);
		
		const painel = document.querySelector('main');
		
		painel.appendChild(mostrarClima(resultado));
	
	});
	
});
