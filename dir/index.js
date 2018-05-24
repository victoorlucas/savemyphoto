document.getElementById("getImage").addEventListener('click', () => {

    let message = document.getElementById("message");

    if(document.getElementById("imageInputURL").value == '' || !document.getElementById("imageInputURL").value.includes('instagram')){
        document.getElementById("imageInputURL").classList.add("is-danger")
        message.classList.add("has-text-danger")
        message.innerHTML = "Preencha com um link válido!"
    }else{
        document.getElementById("imageInputURL").classList.remove("is-danger")
        message.classList.remove("has-text-danger")
        message.innerHTML = "Carregando imagem"
        document.getElementById("getImage").classList.add("is-loading")

        try {
            const id = document.getElementById("imageInputURL").value.split("/p/")[1].replace('/','');
            fetch('http://localhost:3000/'+id)
                .then(res => {
                    if(res.status === 404){
                        document.getElementById("imageInputURL").classList.add("is-danger")
                        document.getElementById("getImage").classList.remove("is-loading")
                        message.classList.add("has-text-danger")
                        message.innerHTML = "Preencha com um link válido!"
                        return;
                    }
                    res.json().then(image => {
                        message.innerHTML = ""
                        document.getElementById("getImage").classList.remove("is-loading")
                        document.getElementById("image").innerHTML = '<img src="'+image.url+'" />'
                    })
                }, err => {
                    document.getElementById("imageInputURL").classList.add("is-danger")
                    document.getElementById("getImage").classList.remove("is-loading")
                    message.classList.add("has-text-danger")
                    message.innerHTML = "Um erro ocorreu!"
                })
        } catch (err){
            document.getElementById("imageInputURL").classList.add("is-danger")
            document.getElementById("getImage").classList.remove("is-loading")
            message.classList.add("has-text-danger")

            if(err.name === 'TypeError') message.innerHTML = "Preencha com um link válido!"
            else message.innerHTML = "Um erro ocorreu!"
        }
    }
})