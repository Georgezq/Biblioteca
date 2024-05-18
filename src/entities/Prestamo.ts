// entities/Prestamo.ts
import { Estudiante } from './Estudiante';
import { LibroRevista } from './LibroRevista';

export class Prestamo {
    CodigoPrestamo: string;
    estudiante: Estudiante;
    libro: LibroRevista;
    fechaPrestamo: Date;
    fechaEntrega: Date;

    constructor(codigoP: string, estudiante: Estudiante, libro: LibroRevista, fechaPrestamo: Date, fechaEntrega: Date) {
        this.CodigoPrestamo = codigoP;
        this.estudiante = estudiante;
        this.libro = libro;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaEntrega = fechaEntrega;
    }
}
