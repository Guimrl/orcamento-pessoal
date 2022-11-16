class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}
class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let id = localStorage.getItem('id')

        //array de despesas
        let despesas = Array()

        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++) {

            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            //existe a possibilidade de haver indices que foram removidos
            if(despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {
        console.log(despesa)
    } 
}

let bd = new Bd()

function cadastrarDespesa() {
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    
    if(despesa.validarDados()) {
        // bd.gravar(despesa)
        
        $('#modalTitulo').html('Registro inserido com sucesso')
        $('#modalTituloDiv').addClass('modal-header text-success')
        $('#modalConteudo').html('<p>Dispesa foi cadastrada</p>')
        $('#modalBtn').html('Voltar')
        $('#modalBtn').addClass('btn btn-success')

        $('#modalRegistrarDespesa').modal('show')

        //limpando formulário após inclusão de dados
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''


    } else {
        $('#modalTitulo').html('Erro na insclusão do registro')
        $('#modalTituloDiv').addClass('modal-header text-danger')
        $('#modalConteudo').html('<p>Erro na gravação, verifique os campos</p>')
        $('#modalBtn').html('Voltar e corrigir')
        $('#modalBtn').addClass('btn btn-danger')

        $('#modalRegistrarDespesa').modal('show')

    }
}

function carregaListaDespesas() {

    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()

    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')


//     <tr>
//     <td>15/04/2022</td>
//     <td>Alimentaçao</td>
//     <td>compras do mes</td>
//     <td>17.09</td>
//   </tr>

    //percorrer o array despesas, listando cada despesa de forma dinamica
    despesas.forEach(function(d) {
        
        console.log(d)
        //criando tr
        let linha = listaDespesas.insertRow()

        //criando td
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        //ajustar o tipo
        switch(parseInt(d.tipo)) {
            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Saúde'
                break
            case 5: d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    
    bd.pesquisar(despesa)
}