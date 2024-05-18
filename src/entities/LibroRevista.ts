// entities/LibroRevista.ts
import { Estudiante } from './Estudiante';

export class LibroRevista {
    Tipo: string;
    codigo: string;
    categoria: string;
    editorial: string;
    nombre: string;
    autor: string;
    anioPublicacion: number;
    prestado: boolean;
    estudiante?: Estudiante;
    fechaEntrega?: Date ;

    constructor(tipo: string,codigo: string, categoria: string, editorial: string, nombre: string, autor: string, anioPublicacion: number) {
        this.Tipo = tipo;
        this.codigo = codigo;
        this.categoria = categoria;
        this.editorial = editorial;
        this.nombre = nombre;
        this.autor = autor;
        this.anioPublicacion = anioPublicacion;
        this.prestado = false;
    }
}
