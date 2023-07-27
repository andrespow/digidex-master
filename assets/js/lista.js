// Tablas

let dataTable;
let dataTableInitializaed = false;

const dataTableOptions = {
    pageLength: 25,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ Digimons por página",
        zeroRecords: "No se ha encontrado ningún Digimon",
        info: "Mostrando de _START_ a _END_ Digimons de un total de _TOTAL_ Digimons",
        infoEmpty: "No se ha encontrado ningún Digimon",
        infoFiltered: "(Digimons filtrados desde _MAX_ registros totales ",
        search: "Buscar",
        loadingRecords: "Cargando ...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }

    }
};

const initDataTable = async () => {
    if (dataTableInitializaed) {
        dataTable.destroy();
    }
    await listUsers();
    await listUsersMovil();
    dataTable = $("#datatable_users").DataTable(dataTableOptions);
    dataTableInitializaed = true;
};


const listUsers = async () => {
    try {
        const response = await fetch("https://digimon-api.vercel.app/api/digimon/");
        const users = await response.json();

        let content = ``;
        users.forEach((user, index) => {
            content +=
                `<tr>

                <td scope="row">${index + 1}</td>
                <td>${user.name}</td>
                <td><img src='${user.img}'></img></td>
                <td>${user.level}</td>
                </tr>`;

        });
        tableBody_users.innerHTML = content;

    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});

/* Movil */

const listUsersMovil = async () => {
    try {
        const response = await fetch("https://digimon-api.vercel.app/api/digimon/");
        const users = await response.json();

        let content = ``;
        users.forEach((user, index) => {
            content +=
                `   <div class="container-fluid">
                    <div id="bannerDiv" class="header display-flex"><img src='${user.img}' class="imagen"></img></div>
                    <div class="articulo display-block">
                    <br>
                    <article id="idDiv" class="contenido display-block">ID <br>${index + 1}</article>
                    <article id="nivelDiv" class="contenido display-block">Nivel <br> ${user.level}</article>
                    <article id="nombreDiv" class="contenido display-block">Nombre <br>${user.name}</article>
                    </div>
                </div><br><br>`;

        });
        tablaMovil.innerHTML = content;

    } catch (ex) {
        alert(ex);
    }
};