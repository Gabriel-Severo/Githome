function like(){
    const linguagem = document.querySelector('.linguagem').textContent
    const usuario = window.location.href.split('?')[1]
    const img = document.querySelector('.img').src
    window.location = 'like?' + usuario + "&linguagem=" + linguagem + "&imagem=" + img
}