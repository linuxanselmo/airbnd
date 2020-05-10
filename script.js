const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
let dadosbrutos = [];
let tipos = [];
let totalPaginas = 1;

function capturaDados(){
//criando a caputra dos dados e um try catch para proteção de erros
    fetch(url)
    .then(response => response.json())
    .then(data => {
        dadosbrutos = data.map(
            item => {
                if (!tipos.includes(item.property_type)){
                    tipos.push(item.property_type);
                }
                item.priceFormatado = formatarPreco(item.price);
                return item;
            });
            criarQuartos();
    })
    .catch (err => {
    })
}


function formatarPreco(valor){
    const valorFormatado = new Intl.NumberFormat( 'pt-BR', {
        styele: 'currency',
        currency: 'BRL'
    }).format(valor);
    return valorFormatado;
}
 capturaDados();


 console.log(tipos);
 console.log(dadosbrutos);
 console.log(dadosbrutos.priceFormatado);

// carregandos os tipos de hospedagens no select
 $('#tipo').click(function(){
    var tipoLocal = [...tipos];
    var options = '<option value="#">Tipo de Aluguel</option>';
    for (let i = 0; i < tipoLocal.length; i++) {
        options += `<option value="${tipoLocal[i]}" >${tipoLocal[i]}</option>`;

    }
    $('#tipo').html(options).show;
 });

 function criarQuartos(){
    const conteudoQuartos = document.getElementById('criarQuartos');
    conteudoQuartos.innerHTML = '';

    dadosbrutos.map(quarto=> {
      const quartoHtml = `
      <div class="quarto">
        <figure>
          <img src="${quarto.photo}" alt="${quarto.name}">
        </figure>
        <label class="txtTipo">${quarto.property_type}</label>
        <p class="txtNome">${quarto.name}</p>
        <p class="txtPreco"><strong>R$ ${quarto.priceFormatado}</strong>/noite</p>
      </div>
      `;
      conteudoQuartos.insertAdjacentHTML('beforeend', quartoHtml);
    });

 }

