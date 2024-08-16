const url = 'https://api.open-meteo.com/v1/forecast?latitude=-22.91&longitude=-43.17&hourly=temperature_2m';

// Função para buscar dados da previsão do tempo
function fetchWeatherData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da previsão do tempo');
            }
            return response.json();
        })
        .then(data => {
            // Exibe algumas informações da previsão do tempo no console
            const hourlyData = data.hourly;
            console.log('Temperatura prevista para as próximas horas no Rio de Janeiro, RJ:');
            hourlyData.temperature_2m.forEach((temp, index) => {
                console.log(`Hora ${index}: ${temp}°C`);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// Chama a função para buscar e exibir os dados da previsão do tempo
fetchWeatherData();