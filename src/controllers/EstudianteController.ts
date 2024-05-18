import { Estudiante } from '../entities/Estudiante';

export class TListaEstudiante{

    listaEstudiante: Estudiante[];

    constructor(){
        this.listaEstudiante = [
            new Estudiante("1234567890", "Juan", "Pérez", "Masculino" ,new Date(1990, 5, 15)),
            new Estudiante("0987654321", "María", "Gómez", "Femenino",new Date(1992, 8, 25))
        ];
    }

    public Insertar(op:Estudiante){
        this.listaEstudiante.push(op)
    }
    Modificar(pos: number, op: Estudiante){
        this.listaEstudiante[pos] = op;
    }
    Eliminar(pos: number){
        this.listaEstudiante.splice(pos, 1)
    }


}

