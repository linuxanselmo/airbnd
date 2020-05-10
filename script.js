const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
let quartos = [];
let tipos = [];
let totalPaginas = 1;

function capturaDados(){
    //criando a caputra dos dados e um try catch para proteção de erros

        fetch(url)
        .then(response => response.json())
        .then(data => {
            quartos = data.map(
                item => {
                    if (!tipos.includes(item.property_type)){
                        tipos.push(item.property_type);
                    }
                    item.priceFormatado = formatarPreco(item.price);
                    return item;
                });
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

 let dados = [...quartos];
// carregandos os tipos de hospedagens no select
 $('#tipo').click(function(){
    var tipoLocal = [...tipos];
    var options = '<option value="#">Tipo de Aluguel</option>';
    for (let i = 0; i < tipoLocal.length; i++) {
        options += `<option value="${tipoLocal[i]}" >${tipoLocal[i]}</option>`;

    }
    $('#tipo').html(options).show;
 });

    console.log(tipos);
    console.log(quartos);
    console.log(dados.priceFormatado);

