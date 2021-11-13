class Gasto extends Dato{
    static contadorGastos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Gasto.contadorGastos;
    }
    get id(){
        return this._id;
    }
}