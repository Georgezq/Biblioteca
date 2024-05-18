import { Prestamo } from "../entities/Prestamo";

export class TListaPrestamos{

    listaPrestamo: Prestamo[];

    constructor(){
        this.listaPrestamo = [ ];
    }

    public Insertar(op:Prestamo){
        this.listaPrestamo.push(op)
    }
    Modificar(pos: number, op: Prestamo){
        this.listaPrestamo[pos] = op;
    }
    Eliminar(pos: number){
        this.listaPrestamo.splice(pos, 1)
    }


}

