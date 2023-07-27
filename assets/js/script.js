let url = 'https://digimon-api.vercel.app/api/digimon';
let selectDigimones = document.getElementById("digimon");


async function getDigimones(){
    try{
        let urlBase = url;
        let response = await fetch(urlBase);
        let digimones = await response.json();
        
        

        let acumulador = "<option value=''>Elige un digimon</option>";
        digimones.forEach(digimon => {
            acumulador += `<option value="${digimon.name}">${digimon.name.toUpperCase()}</option>`  
        });
        selectDigimones.innerHTML = acumulador;

    } catch (error) {
        alert("Ha ocurrido un error al consultar los digimons");
    }
}

function getDigimon(nombre){
    let urlBase = url + "/name/" + nombre;
    fetch(urlBase)
    .then(response => response.json())
    .then(digimon => {
        mostrarModal(digimon[0]);
    }).catch((error) => {
        console.log(error)
        alert("Ha ocurrido un error al consultar el digimon");
    })

}

function main () {
    getDigimones();
}

main();

selectDigimones.addEventListener("change", function (){
    getDigimon(selectDigimones.value);
});

function mostrarModal(digimon){

    const myModal = new bootstrap.Modal("#exampleModal");
    document.getElementById("nombresDigimon").innerText = digimon.name;

    let imagenModal = document.querySelector("#exampleModal img");
    imagenModal.setAttribute("src", digimon.img);
    imagenModal.setAttribute("alt", digimon.name);
    document.getElementById("nvDigimon").innerText = digimon.level;



    myModal.show();
}






const input = document.querySelector('#input');
const imgDigi = document.querySelector('#imagenDigimon');
const digiTitle = document.querySelector('#nombreDigimon');
const digiText = document.querySelector('#nivelDigimon');


const fetchAPI = async () => {
    const response = await fetch(url+"/");
    const data = await response.json();

    return data;

}

function digiApi() {
    input.addEventListener('change', async ({ target }) => {
        const digiArr = await fetchAPI();

        const find = digiArr.find(({ name }) => name.toLowerCase() === target.value.toLowerCase());

        const imagen = find.img;
        const { name, level, img } = find;

        digiText.innerText = `Digimon de tipo ${level}`;
        digiTitle.innerHTML = name;
        imgDigi.src = imagen;

        return find;
    })
}


window.onload = () => digiApi();


