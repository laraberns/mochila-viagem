const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")

// transformando o local storage em array
const itens = JSON.parse(localStorage.getItem("itens")) || []


// criando elemento na lista e NAO no localstorage pela funcao criaElemento
itens.forEach((elemento) => {
    criaElemento(elemento)
})

// cria o evento submit toda vez que clica "adicionar"
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]

    // cria a variavel itemAtual com o nome e quantidade escritos exemplo {nome: 'Caderno', quantidade: '1'}
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // verifica se ja existe um item com mesmo nome, caso sim retorna com {nome: 'Caderno', quantidade: '1', id: 3} ou undefined
    const existe = itens.find(elemento => elemento.nome === nome.value)

    // se id ja existe o id continua o mesmo e chama a funcao atualizaElemento para o itemAtual
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        // altera o elemento dentro do array de itens
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }

    // se o id nao existe, cria novo id, chama a funcao para criar elementos e empurra item novo para o array de itens
    else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0
        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    // cria o localstorage de acordo com a array de itens
    localStorage.setItem("itens", JSON.stringify(itens))

    // limpa campo de digitacao do form
    nome.value = ""
    quantidade.value = ""
})

// cria o elemento e adiciona na lista - mas nao no local storage
function criaElemento(item) {

    // novoItem = cria o elemento com padrao de lista
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    // numeroItem = cria o elemento com padrao de numero da lista e adiciona no texto a quantidade
    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade

    // adiciona o id data-id no item criado
    numeroItem.dataset.id = item.id

    // novoItem = adiciona o numero como filho do novoItem e adiciona o texto do nome no item
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    // adiciona a funcao botaoDeleta como filho e variavel item.id
    novoItem.appendChild(botaoDeleta(item.id))

    // adiciona o novoItem criado dentro da lista
    lista.appendChild(novoItem)

}

// altera a quantidade do item pela nova so na lista
function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}

// cria o elemento botao e adiciona a funcao deletaelemento com o pai do elementoBotao que eh o item
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao

}

// deleta o item da lista e localstorage
function deletaElemento(tag, id) {
    // deleta o item da lista
    tag.remove()

    // deleta o item do array lista
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    // empurra lista para localstorage
    localStorage.setItem("itens", JSON.stringify(itens))
}

const botaoTema = document.getElementById("btn")

  // add class dark-mode para o body e assim altera cor de fundo e icone do dark mode
botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
})