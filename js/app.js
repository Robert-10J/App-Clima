import { api_key } from "./api_key.js";

const ciudad = document.querySelector('#city');
let ciudadBus = '';

ciudad.addEventListener('input', ( e ) => {
    e.preventDefault()
    ciudadBus = e.target.value;    
});

const consultarClimaBtn = document.querySelector('#consultaClima');
consultarClimaBtn.addEventListener('click', mostrarClima);

function mostrarClima() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadBus}&appid=${api_key}&lang=sp&units=metric`;

    fetch( url )
        .then( respuesta => respuesta.json())
        .then( mostrar => printHTML(mostrar))
        //.catch( error => console.log( error))
}

function printHTML({ main, weather,  name}) {
    const infor = document.querySelector('.resultados');

    const {temp, temp_min ,humidity} = main;
    const info = weather[0];
    const icon = `https://openweathermap.org/img/wn/${info.icon}@2x.png`;

    infor.innerHTML = `
        <p>Temperatura: <span> ${temp} C°</span></p>
        <p>Temperatura Mínima: <span> ${temp_min} C°</span></p>
        <p>Húmedad: <span> ${humidity}%</span></p>
        <p>Ciudad: <span> ${name}</span></p>
        <p>Clima: <span>${info.description}</span></p>
        <img src=${icon}>
    `;
}