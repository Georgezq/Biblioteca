import { LibroRevista } from '../entities/LibroRevista';
// import { Estudiante } from '../entities/Estudiante';

// let librosRevistas: LibroRevista[] = [];

export class TListaLibroRevista {
    listaLibroRevista: LibroRevista[];

    constructor(){
        this.listaLibroRevista = [
            new LibroRevista("Libro", "099", "Salud", "Casin", "Las 7 vidas eternas", "George", 1999),
            new LibroRevista("Revista", "1234", "Informatica", "CasaInformatica", "Nuevas repercusiones tecnologicas", "Joselyn", 2023)
        ]
    }

    public Insertar(op:LibroRevista){
        this.listaLibroRevista.push(op)
    }
    Modificar(pos: number, op: LibroRevista){
        this.listaLibroRevista[pos] = op;
    }
    Eliminar(pos: number){
        this.listaLibroRevista.splice(pos, 1)
    }
}

// export function prestarLibroRevista(codigo: string, estudiante: Estudiante, fechaPrestamo: Date, fechaEntrega: Date): boolean {
//     const libroRevista = librosRevistas.find(lr => lr.codigo === codigo);

//     if (!libroRevista || libroRevista.prestado || estudiante.sancionado) {
//         return false; 
//     }

//     libroRevista.prestado = true;
//     // Aquí podrías guardar la información del préstamo en otra estructura de datos
//     return true; 
// }

// controllers/LibroRevistaController.ts

// export function devolverLibroRevista(codigo: string, fechaDevolucion: Date): boolean {
//     const libroRevista = librosRevistas.find(lr => lr.codigo === codigo);

//     if (!libroRevista || !libroRevista.prestado) {
//         return false; // El libro no estaba prestado
//     }

//     // Verificamos si estudiante y fechaEntrega son definidos antes de operar con ellos
//     if (libroRevista.estudiante && libroRevista.fechaEntrega) {
//         // Calculamos la diferencia de días entre la fecha de entrega y la fecha de devolución
//         const diffDias = Math.ceil((fechaDevolucion.getTime() - libroRevista.fechaEntrega.getTime()) / (1000 * 60 * 60 * 24));

//         // Si el estudiante se pasó de la fecha de entrega, se le sanciona
//         if (diffDias > 0) {
//             sancionarEstudiante(libroRevista.estudiante.cedula); // Sancionar al estudiante
//         }
//     }

//     // Actualizamos el estado del libro
//     libroRevista.prestado = false;
//     // Aquí podrías eliminar el registro del préstamo de la estructura de datos
//     return true; // Libro devuelto exitosamente
// }

