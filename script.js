const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
let quartos = [];
let tipos = [];
let totalPaginas = 1;

function capturaDados(){
    //criando a caputra dos dados e um try catch para proteção de erros
    try {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            quartos = data.map(
                item => {
                    if (!tipos.includes(item.property_type)){
                        tipos.push(item.property_type);
                    }
                    return item;
                });
        })
    } catch (e) {
        console.log(e);
    }
}

function formatarPreco(valor){
    const valorFormatado = new Intl.MumberFormat( 'pt-BR', {
        styele: 'currency',
        currency: 'BRL'
    }).format(valor);
    return valorFormatado;
}
let dados = capturaDados();

function autoTipo(){
    console.log(tipos);
    console.log(dados.name);
}
