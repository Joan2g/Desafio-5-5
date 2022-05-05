const socket = io();

socket.on("message_back", (data) => {
    console.log(data)
    render(data)
    socket.emit("message_client", "Hola servidor")
})

socket.on("message_back2", (data) => {
    console.log(data)
    renderProduct(data)
    socket.emit("message_client2", )
})



const render = (data) => {
    let html = data.map(x => {
        return `
            <p><span class="text-primary"><strong>${x.nombre}</strong></span> :<span class="fst-italic text-success"> ${x.msn}</span></p>
        `;
            
    }).join(" ")
    document.querySelector("#caja").innerHTML = html
}

const addMsn = () => {

    let obj = {
        nombre: document.querySelector("#nb").value,
        msn: document.querySelector("#msn").value
    }

    socket.emit("data_client", obj)

    document.querySelector("#msn").value = ""

    return false
}

const addProduct = () => {
    let product = {
        title: document.querySelector("#title").value,
        price: document.querySelector("#price").value,
        thumbnail: document.querySelector("#thumbnail").value
    }

    socket.emit("data_client2", product)

    document.querySelector("#title").value = ""
    document.querySelector("#price").value = ""
    document.querySelector("#thumbnail").value = ""

    return false
}

const renderProduct = (data) => {
    let form = data.map(x => {
        return`
            <tr>
                <td><strong>${x.title}</strong></td>
                <td><strong>$ ${x.price}</strong></td>
                <td><strong>${x.thumbnail}</strong></td>
            </tr>
            `
    }).join(" ")
    document.querySelector("#caja2").innerHTML = form
}

const formu = document.getElementById("formulario");
    formu.addEventListener("submit", function (event) {
        event.preventDefault()
    })
   
