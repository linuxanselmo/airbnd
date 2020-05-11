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
            criarfiltro();

            criarQuartos(dadosbrutos);
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

// carregandos os tipos de hospedagens
 function criarfiltro(){
    let filtro = '';
    tipos.map((nome, indice) => {
        filtro +=`
        <a href="javascript:tipagem(${indice})" class="btn btn-info botoaofiltro filtro-${indice}">${nome}</a>
        `;
    })
    const barraHtml =`
    ${filtro}
        <a href="index.html" class="btn btn-warning botaofiltro limpar">Limpar</a>
    `;
    const containerfiltro = document.getElementById('filtros');
    containerfiltro.innerHTML = barraHtml;
 };


 function criarQuartos(dados){
    const conteudoQuartos = document.getElementById('criarQuartos');
    conteudoQuartos.innerHTML = '';

    dados.map(quarto=> {
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

 function tipagem(indice)
    if (tipos[indice]){
        const filtrado = dadosbrutos.filter( dados => dados.property_type === tipos[indice]);
        criarQuartos(filtrado);
    }
 }