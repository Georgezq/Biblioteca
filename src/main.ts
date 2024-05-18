import { TListaDevolucion } from "./controllers/DevolucionController";
import { TListaEstudiante } from "./controllers/EstudianteController";
import { TListaLibroRevista } from "./controllers/LibroRevistaController";
import { TListaPrestamos } from "./controllers/PrestamosController";
import { Devolucion } from "./entities/Devolucion";
import { Estudiante } from "./entities/Estudiante";
import { LibroRevista } from "./entities/LibroRevista";
import { Prestamo } from "./entities/Prestamo";

const listaEstudiante = new TListaEstudiante();
const listaLibroRevista = new TListaLibroRevista();
const listaPrestamos = new TListaPrestamos();
const listaDevolucion = new TListaDevolucion();

const tablaLibros = document.getElementById('tablaLibros') as HTMLTableElement;
const formLibros = document.getElementById('formLibros') as HTMLFormElement;

const tablaEstudiantes = document.getElementById('tablaEstudiantes') as HTMLTableElement;
const formUsuario = document.getElementById('formUsuario') as HTMLFormElement;


const formPrestamos = document.getElementById('formPrestamos') as HTMLFormElement;
const tablaPrestamos = document.getElementById('tablaPrestamos') as HTMLFormElement;

const tablaDevolucion = document.getElementById('tablaDevoluciones') as HTMLTableElement;
const formDevolucion = document.getElementById('formDevoluciones') as HTMLFormElement;

//Funciones para Libros y Revistas

function mostrarLista() {
    const tbody = tablaLibros.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = '';
        listaLibroRevista.listaLibroRevista.forEach((libro, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">${libro.Tipo}</td>
                <td class="px-6 py-4">${libro.codigo}</td>
                <td class="px-6 py-4">${libro.categoria}</td>
                <td class="px-6 py-4">${libro.editorial}</td>
                <td class="px-6 py-4">${libro.nombre}</td>
                <td class="px-6 py-4">${libro.autor}</td>
                <td class="px-6 py-4">${libro.anioPublicacion}</td>
                <td class="px-6 py-4">${libro.prestado ? 'Prestado' : 'Disponible'}</td>
                <td class="px-6 py-4 flex gap-5">
                    <button class="px-3 hover:bg-yellow-500 hover:text-white hover:rounded hover:scale-100 hover:transition hover:ease-in-out hover:delay-200 hover:duration-150" data-index="${index}">Editar</button>
                    <button class="px-3 hover:bg-red-500 hover:text-white hover:rounded hover:scale-100 hover:transition hover:ease-in-out hover:delay-200 hover:duration-150 " data-index="${index}">Eliminar</button>
                </td>
                </tr>
            `;
            tbody.appendChild(row);
        });

        const btnEditElements = document.querySelectorAll('.btn-edit');
        btnEditElements.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = parseInt((event.target as HTMLButtonElement).getAttribute('data-index') || '');
                const libro = listaLibroRevista.listaLibroRevista[index];
                if (libro) {
                    (document.getElementById('tipo') as HTMLInputElement).value = libro.Tipo;
                    (document.getElementById('codigo') as HTMLInputElement).value = libro.codigo.toString();
                    (document.getElementById('categoria') as HTMLInputElement).value = libro.categoria.toString();
                    (document.getElementById('editorial') as HTMLInputElement).value = libro.editorial.toString();
                    (document.getElementById('nomlibro') as HTMLInputElement).value = libro.nombre.toString();
                    (document.getElementById('autor') as HTMLInputElement).value = libro.autor.toString();
                    (document.getElementById('apublicacion') as HTMLInputElement).value = libro.anioPublicacion.toString();
                    (document.getElementById('product-index') as HTMLInputElement).value = index.toString();

                }
            });
        });

        const btnDeleteElements = document.querySelectorAll('.btn-delete');
        btnDeleteElements.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = parseInt((event.target as HTMLButtonElement).getAttribute('data-index') || '');
                if (!isNaN(index)) {
                    listaLibroRevista.Eliminar(index);
                    mostrarLista();
                }
            });
        });
    }
}

function agregarLibro(tipo: string,codigo: string, categoria: string, editorial: string, nombre: string, autor: string, anioPublicacion: number) {
    const Librorevists = new LibroRevista(tipo, codigo, categoria, editorial, nombre, autor, anioPublicacion);
    listaLibroRevista.Insertar(Librorevists);
    mostrarLista();
    cargarCodigosLibro();
}

if (formLibros) {
    formLibros.addEventListener('submit', (event) => {
        event.preventDefault();
        const index = parseInt((document.getElementById('product-index') as HTMLInputElement).value);
        const tipo = (document.getElementById('tipo') as HTMLInputElement).value;
        const codigo = (document.getElementById('codigo') as HTMLInputElement).value;
        const categoria = (document.getElementById('categoria') as HTMLInputElement).value;
        const editorial = (document.getElementById('editorial') as HTMLInputElement).value;
        const nombre = (document.getElementById('nomlibro') as HTMLInputElement).value;
        const autor = (document.getElementById('autor') as HTMLInputElement).value;
        const anioPublicacion = parseInt((document.getElementById('apublicacion') as HTMLInputElement).value);


        if (nombre && tipo && codigo && anioPublicacion) {
                if (isNaN(index)) {
                    agregarLibro(tipo, codigo, categoria, editorial, nombre, autor, anioPublicacion);
                } else {
                    const libro = new LibroRevista(tipo, codigo, categoria, editorial, nombre, autor, anioPublicacion);
                    listaLibroRevista.Modificar(index, libro);
                }
                mostrarLista();
                formLibros.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
}

//Funciones para Estudiantes

export function mostrarListaUsuario() {
    const tbody = tablaEstudiantes.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = '';
        listaEstudiante.listaEstudiante.forEach((estudiante, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
               <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               <td class="px-6 py-4 ">${estudiante.cedula}</td>
               <td class="px-6 py-4">${estudiante.nombre}</td>
               <td class="px-6 py-4">${estudiante.apellido}</td>
               <td class="px-6 py-4">${estudiante.sexo}</td>
               <td class="px-6 py-4">${estudiante.fechaNacimiento}</td>
               <td class="px-6 py-4">${estudiante.sancionado ? 'Sancionado' : 'Disponible'}</td>
               <td class="px-6 py-4 flex gap-5">
               <button class="px-3 hover:bg-yellow-500 hover:text-white hover:rounded hover:scale-100 hover:transition hover:ease-in-out hover:delay-200 hover:duration-150" data-index="${index}">Editar</button>
               <button class="px-3 hover:bg-red-500 hover:text-white hover:rounded hover:scale-100 hover:transition hover:ease-in-out hover:delay-200 hover:duration-150 " data-index="${index}">Eliminar</button>
               </td>
               </tr>
            `;
            tbody.appendChild(row);
        });

        const btnEditElements = document.querySelectorAll('.btn-editUsuario');
        btnEditElements.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = parseInt((event.target as HTMLButtonElement).getAttribute('data-index') || '');
                const libro = listaEstudiante.listaEstudiante[index];
                if (libro) {
                    (document.getElementById('cedula') as HTMLInputElement).value = libro.cedula;
                    (document.getElementById('nombre') as HTMLInputElement).value = libro.nombre.toString();
                    (document.getElementById('apellido') as HTMLInputElement).value = libro.apellido.toString();
                    (document.getElementById('sexo') as HTMLInputElement).value = libro.sexo.toString();
                    (document.getElementById('fnacimiento') as HTMLInputElement).value = libro.fechaNacimiento.toString();
                    (document.getElementById('product-index') as HTMLInputElement).value = index.toString();

                }
            });
        });

        const btnDeleteElements = document.querySelectorAll('.btn-deleteUsuario');
        btnDeleteElements.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = parseInt((event.target as HTMLButtonElement).getAttribute('data-index') || '');
                if (!isNaN(index)) {
                    listaEstudiante.Eliminar(index);
                    mostrarListaUsuario();
                }
            });
        });
    }
}

function agregarUsuario(cedula: string, nombre: string, apellido: string,sexo: string, fechaNacimiento: Date) {
    const estudiante = new Estudiante(cedula, nombre, apellido, sexo ,fechaNacimiento);
    listaEstudiante.Insertar(estudiante);
    mostrarListaUsuario();
    cargarCedulas();
}

if (formUsuario) {
    formUsuario.addEventListener('submit', (event) => {
        event.preventDefault();
        const index = parseInt((document.getElementById('product-index') as HTMLInputElement).value);
        const cedula = (document.getElementById('cedula') as HTMLInputElement).value;
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const apellido = (document.getElementById('apellido') as HTMLInputElement).value;
        const sexo = (document.getElementById('sexo') as HTMLInputElement).value;
        const fechaNacimientoString = (document.getElementById('fnacimiento') as HTMLInputElement).value;
        const fechaNacimiento = new Date(fechaNacimientoString);


        if (nombre && cedula && cedula && apellido ) {
                if (isNaN(index)) {
                    agregarUsuario(cedula, nombre, apellido, sexo,fechaNacimiento);
                } else {
                    const libro = new Estudiante(cedula, nombre, apellido, sexo ,fechaNacimiento);
                    listaEstudiante.Modificar(index, libro);
                }
                mostrarListaUsuario();
                formUsuario.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
}

//Cargar cedulas y codigos

// Función para cargar las opciones de cédula
function cargarCedulas() {
    const selectCedula = document.getElementById('cedulaCargar');
    if (selectCedula) {
        // Limpiar opciones previas
        selectCedula.innerHTML = '<option value="">Seleccionar Cédula</option>';
        //Fitlrar los estudiantes sancionados
        const estudiantesSancionados = listaEstudiante.listaEstudiante.filter(estudiante => !estudiante.sancionado);
        // Llenar con las cédulas de los estudiantes
        estudiantesSancionados.forEach(estudiante => {
            const option = document.createElement('option');
            option.value = estudiante.cedula;
            option.textContent = estudiante.cedula;
            if (selectCedula) {
                selectCedula.appendChild(option);
            }
        })
        
    }
}

// Función para cargar las opciones de código de libro
function cargarCodigosLibro() {
    const selectCodLibro = document.getElementById('codLibroCargar');
    if (selectCodLibro) {
        // Limpiar opciones previas
        selectCodLibro.innerHTML = '<option value="">Seleccionar Código de Libro</option>';
        // Filtrar los libros que no estén prestados
        const librosDisponibles = listaLibroRevista.listaLibroRevista.filter(libro => !libro.prestado);
        // Llenar con los códigos de los libros disponibles
        librosDisponibles.forEach(libro => {
            const option = document.createElement('option');
            option.value = libro.codigo;
            option.textContent = libro.codigo;
            if (selectCodLibro) {
                selectCodLibro.appendChild(option);
            }
        });
    }
}

// Función para cargar las opciones de cédula
function cargarCodPrestamo() {
    const selectCodPrestamo = document.getElementById('codprestamo');
    if (selectCodPrestamo) {
        // Limpiar opciones previas
        selectCodPrestamo.innerHTML = '<option value="">Seleccionar Código del Prestamo</option>';
        // Filtrar los préstamos donde el libro esté prestado
        const prestamosPrestados = listaPrestamos.listaPrestamo.filter(prestamo => prestamo.libro.prestado);
        // Llenar con los códigos de los libros prestados
        prestamosPrestados.forEach(prestamo => {
            const option = document.createElement('option');
            option.value = prestamo.CodigoPrestamo;
            option.textContent = prestamo.CodigoPrestamo;
            selectCodPrestamo.appendChild(option);
        });
    }
}

//Cargar fecha predeterminada

function cargarFecha(){
    const inputFecha = document.getElementById('fprestamo') as HTMLInputElement;
    if (inputFecha) {
        const fechaActual = new Date();
        const fechaFormatoISO = fechaActual.toISOString().slice(0, 10);
        inputFecha.value = fechaFormatoISO;
    } else {
        console.error("El elemento con el ID 'fprestamo' no se encontró en el documento.");
    }
}

function mostrarListaPrestamo() {
    const tbody = tablaPrestamos.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = '';
        listaPrestamos.listaPrestamo.forEach((prestamos) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">${prestamos.estudiante.cedula}</td>
                <td class="px-6 py-4">${prestamos.libro.codigo}</td>
                <td class="px-6 py-4">${prestamos.fechaPrestamo}</td>
                <td class="px-6 py-4">${prestamos.fechaEntrega}</td>
                </tr>       
            `;
            tbody.appendChild(row);
        });
    }
}

//Funciones para el prestamo

function agregarPrestamo(codigoP:string, estudiante: Estudiante, libro: LibroRevista, fechaPrestamo: Date, fechaEntrega: Date) {
    const prestamos = new Prestamo(codigoP, estudiante, libro, fechaPrestamo, fechaEntrega);
    listaPrestamos.Insertar(prestamos);
    mostrarListaPrestamo();
    cargarCodPrestamo();
}

if (formPrestamos) {
    formPrestamos.addEventListener('submit', (event) => {
        event.preventDefault();
        const index = parseInt((document.getElementById('product-index') as HTMLInputElement).value);

        const codigoP = (document.getElementById('codigoP') as HTMLInputElement).value;

        const cedula = (document.getElementById('cedulaCargar') as HTMLInputElement).value;
        const codigoLibro = (document.getElementById('codLibroCargar') as HTMLInputElement).value;
        
        const fechaPrestamoString = (document.getElementById('fprestamo') as HTMLInputElement).value;
        const fechaPrestamo = new Date(fechaPrestamoString);
       
        const fechaEntregaString = (document.getElementById('fentrega') as HTMLInputElement).value;
        const fechaEntrega = new Date(fechaEntregaString);

        if (codigoLibro && cedula && fechaEntrega && fechaPrestamo ) {
            // Buscar el estudiante correspondiente a la cédula
            const estudiante = listaEstudiante.listaEstudiante.find(est => est.cedula === cedula);
            if (!estudiante) {
                alert('No se encontró el estudiante con la cédula especificada.');
                return;
            }

            // Buscar el libro correspondiente al código
            const libro = listaLibroRevista.listaLibroRevista.find(lib => lib.codigo === codigoLibro);
            if (!libro) {
                alert('No se encontró el libro con el código especificado.');
                return;
            }

            // Cambiar el estado del libro a prestado
            const libroPrestado = listaLibroRevista.listaLibroRevista.find(libro => libro.codigo === codigoLibro);
            if (libroPrestado) {
                libroPrestado.prestado = true;
                mostrarLista(); 
            } else {
                alert('No se encontró el libro seleccionado.');
                return;
            }

            if (isNaN(index)) {
                agregarPrestamo(codigoP, estudiante, libro, fechaPrestamo, fechaEntrega);
                cargarCodigosLibro();
            } else {
                const prestamo = new Prestamo(codigoP ,estudiante, libro, fechaPrestamo, fechaEntrega);
                listaPrestamos.Modificar(index, prestamo);
            }
            mostrarListaPrestamo();
            formPrestamos.reset();
            cargarFecha();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
}

//Funciones para la devolución

function mostrarListaDevolucion() {
    const tbody = tablaDevolucion.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = '';
        listaDevolucion.listaDevolucion.forEach((prestamos) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">${prestamos.CodigoPrestamo.CodigoPrestamo}</td>
                <td class="px-6 py-4">${prestamos.FechaDevolucion}</td>
                </tr>
            `;
            tbody.appendChild(row);
        });
    }
}

function agregarDevolucion(codigoP: Prestamo , fechaDevolucion: Date) {
    // Verificar si el estudiante se ha pasado de la fecha de devolución
    const fechaEntrega = codigoP.fechaEntrega;
    // Calcular la diferencia en milisegundos entre la fecha de devolución y la fecha de entrega establecida
    const diferenciaFechas = fechaDevolucion.getTime() - fechaEntrega.getTime();
    const diasDeRetraso = diferenciaFechas / (1000 * 3600 * 24);
    // Si hay retraso, aplicar sanción al estudiante
    if (diasDeRetraso > 0) {
        const estudiante = codigoP.estudiante;
        const libro = codigoP.libro;
        if (estudiante) {
            const sancionDias = 15;
            estudiante.sancionado = true;
            libro.prestado = false;
            mostrarListaUsuario();
            mostrarLista();
            window.alert(`El estudiante se ha retrasado ${diasDeRetraso} días. Se le aplicará una sanción de ${sancionDias} días.`);
        } else {
            console.log('Estudiante no encontrado.');
        }
    }

    const devolucion = new Devolucion(codigoP, fechaDevolucion);
    listaDevolucion.Insertar(devolucion);
    mostrarListaDevolucion();
    cargarCodPrestamo();

}

if (formDevolucion) {
    formDevolucion.addEventListener('submit', (event) => {
        event.preventDefault();
        const index = parseInt((document.getElementById('product-index') as HTMLInputElement).value);
        const codPrestamo = (document.getElementById('codprestamo') as HTMLInputElement).value;
        const fechaDevolucionString = (document.getElementById('fdevolucion') as HTMLInputElement).value;
        const fechaDevolucion = new Date(fechaDevolucionString);

        if (codPrestamo) {
            // Buscar el préstamo correspondiente al código
            const prestamo = listaPrestamos.listaPrestamo.find(p => p.CodigoPrestamo === codPrestamo);
            if (!prestamo) {
                alert('No se encontró el préstamo correspondiente al código.');
                return;
            }     

            if (isNaN(index)) {
                agregarDevolucion(prestamo, fechaDevolucion);
                cargarCodPrestamo();
                cargarCedulas();
                cargarCodigosLibro();

            } else {
                const devolucion = new Devolucion(prestamo, fechaDevolucion);
                listaDevolucion.Modificar(index, devolucion);
            }
            mostrarListaDevolucion();
            formDevolucion.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
}

cargarFecha();
cargarCedulas();
cargarCodigosLibro();
cargarCodPrestamo();

mostrarLista();
mostrarListaUsuario();
mostrarListaPrestamo();
mostrarListaDevolucion();