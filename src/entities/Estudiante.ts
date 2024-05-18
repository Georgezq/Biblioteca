import { LibroRevista } from './LibroRevista';
// entities/Estudiante.ts
export class Estudiante {
    cedula: string;
    nombre: string;
    apellido: string;
    sexo: string;
    fechaNacimiento: Date;
    sancionado: boolean;
    librosPrestados: LibroRevista[];

    constructor(cedula: string, nombre: string, apellido: string, sexo: string,fechaNacimiento: Date) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.sancionado = false; 
        this.librosPrestados = [];
    }
}
