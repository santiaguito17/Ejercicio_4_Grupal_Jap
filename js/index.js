"use strict";

const URL = "https://japceibal.github.io/japflix_api/movies-data.json";

// console.log(URL);

const BUSQUEDA = document.getElementById("inputBuscar");

const BOTONBUSCAR = document.getElementById("btnBuscar");

const LISTA = document.getElementById("lista");

let peliculas = [];

// LISTA CON []
// OBJETOS CON {}

let data = function (url) {
  let result = {};
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
};

document.addEventListener("DOMContentLoaded", function () {
  data(URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      peliculas = resultObj.data;

      // mostrarPeliculas(peliculas);
    }
  });
});

const getStars = (number) => {
  switch (number) {
    case 1:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
    case 2:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
    case 3:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
    case 4:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>`;
    case 5:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>`;
  }
};

function mostrarPeliculas(array) {
  let informacion = "";

  // ! no mostrar si no hay input
  // !

  array.forEach((element) => {
    // console.log(element);
    informacion += `<li id="${
      element.id
    }" class=" list-group-item list-group-item-action h5 bg-dark p-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" > <div class="d-flex justify-content-between mb-2 mt-3 text-light" > ${
      element.title
    } 
  
     <span>

     ${getStars(Math.round(element.vote_average / 2))}
  
     </span>
  
      </div> <p class="text-muted"> ${element.tagline} </p> </li>`;
  });

  LISTA.innerHTML = informacion;

  array.forEach((element) => {
    document.getElementById(element.id).onclick = () => {
      agregarTitulo(element.title);
      agregarDescripcion(element.overview);
      agregarGeneros(element.genres);
      agregarFecha(element.release_date);
      agregarDuracion(element.runtime);
      agregarCosto(element.budget);
      agregarGanancia(element.revenue);
    };
  });
}

BOTONBUSCAR.onclick = () => {
  const filtro = (genre) =>
    genre.name.toLowerCase().includes(BUSQUEDA.value.toLowerCase());

  mostrarPeliculas(
    peliculas.filter(
      (pelicula) =>
        pelicula.title.toLowerCase().includes(BUSQUEDA.value.toLowerCase()) ||
        pelicula.overview
          .toLowerCase()
          .includes(BUSQUEDA.value.toLowerCase()) ||
        pelicula.tagline.toLowerCase().includes(BUSQUEDA.value.toLowerCase()) ||
        pelicula.genres.some((genre) => filtro(genre))
    )
  );
};

const OFFCANVAS_TITULO = document.getElementById("offcanvas-title");

const OFFCANVAS_DESCRIPCION = document.getElementById("offcanvas-overview");

const OFFCANVAS_GENEROS = document.getElementById("offcanvas-genres");

function agregarTitulo(titulo) {
  OFFCANVAS_TITULO.innerHTML = titulo;}

function agregarDescripcion(descripcion) {
  OFFCANVAS_DESCRIPCION.innerHTML = descripcion;}

function agregarGeneros(generos) {
  let res = "";
  
  generos.forEach((element) => {
    res += `${element.name} `;
  });

  OFFCANVAS_GENEROS.innerHTML = res;
}

const YEAR = document.getElementById("year");

const RUNTIME = document.getElementById ("runtime");

const BUDGET = document.getElementById ("budget");

const REVENUE = document.getElementById ("revenue");

function agregarFecha (year) {
  YEAR.innerHTML = year.split("-")[0];}

function agregarDuracion (runtime) {
  RUNTIME.innerHTML = `${runtime} mins`;}

function agregarCosto (budget) {
  BUDGET.innerHTML = `$${budget}`;}

function agregarGanancia (revenue) {
  REVENUE.innerHTML = `$${revenue}`;
}