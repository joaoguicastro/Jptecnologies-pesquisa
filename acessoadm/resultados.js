window.addEventListener('DOMContentLoaded', function() {
    var responses = JSON.parse(localStorage.getItem('responses')) || [];

    var pessimoCount = 0;
    var ruimCount = 0;
    var bomCount = 0;
    var muitoBomCount = 0;
    var excelenteCount = 0;

    responses.forEach(function(response) {
        switch (response.rating) {
            case 'pessimo':
                pessimoCount++;
                break;
            case 'ruim':
                ruimCount++;
                break;
            case 'bom':
                bomCount++;
                break;
            case 'muito_bom':
                muitoBomCount++;
                break;
            case 'excelente':
                excelenteCount++;
                break;
        }
    });

    document.getElementById('contadorPessimo').textContent = pessimoCount;
    document.getElementById('contadorRuim').textContent = ruimCount;
    document.getElementById('contadorBom').textContent = bomCount;
    document.getElementById('contadorMuitoBom').textContent = muitoBomCount;
    document.getElementById('contadorExcelente').textContent = excelenteCount;

    var feedbackChart = new Chart(document.getElementById('pesquisaGrafico'), {
        type: 'doughnut',
        data: {
            labels: ['Péssimo', 'Ruim', 'Bom', 'Muito Bom', 'Excelente'],
            datasets: [{
                data: [pessimoCount, ruimCount, bomCount, muitoBomCount, excelenteCount],
                backgroundColor: ['#FF0000', '#FFC107', '#4CAF50', '#03A9F4', '#9C27B0']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: '#000'
                }
            }
        }
    });
});
