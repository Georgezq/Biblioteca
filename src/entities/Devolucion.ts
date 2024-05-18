import { Prestamo } from "./Prestamo";

// entities/Prestamo.ts
export class Devolucion {
    CodigoPrestamo: Prestamo;
    FechaDevolucion: Date = new Date();
    Devuelto: boolean;

    constructor(codigoP: Prestamo , fechaDevolucion: Date) {
        this.CodigoPrestamo = codigoP;
        this.FechaDevolucion = fechaDevolucion          
        this.Devuelto = false;
    }
}
