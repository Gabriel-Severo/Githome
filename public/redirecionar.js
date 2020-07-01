const nomes = [...document.querySelectorAll('.favorito-nome')].map(elemento => elemento.textContent.trim())
const elementos = document.querySelectorAll('.favorito')
elementos.forEach((elemento, index) => {
    elemento.addEventListener("click", () => {
        window.location = `/repositorios?usuario=${nomes[index]}`
    })
    elemento.setAttribute("style", "cursor: pointer;")
})