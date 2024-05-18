import { Devolucion } from "../entities/Devolucion";

export class TListaDevolucion{

    listaDevolucion: Devolucion[];

    constructor(){
        this.listaDevolucion = [ ];
    }

    public Insertar(op:Devolucion){
        this.listaDevolucion.push(op)
    }

    Modificar(pos: number, op: Devolucion){
        this.listaDevolucion[pos] = op;
    }
    Eliminar(pos: number){
        this.listaDevolucion.splice(pos, 1)
    }


}

