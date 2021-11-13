const ingresos = [
    new Ingreso('Salario', 2150),
    new Ingreso('Venta coche', 1500)
];

const gastos = [
    new Gasto('Alquiler piso', 600),
    new Gasto('Seguro salud', 50),
    new Gasto('Ropa', 240)
];

let cargarApp = ()=>{
    cargarHeader();
    cargarIngresos();
    cargarGastos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalGastos = ()=>{
    let totalGasto = 0;
    for(let gasto of gastos){
        totalGasto += gasto.valor;
    }
    return totalGasto;
}

let cargarHeader = ()=>{
    let saldo = totalIngresos() - totalGastos();
    let porcentajeGasto = totalGastos()/totalIngresos();
    document.getElementById('saldo').innerHTML = formatoMoneda(saldo);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('gastos').innerHTML = formatoMoneda(totalGastos());
}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-ES',{style:'currency', currency:'EUR', minimumFractionDigits:2});
}


const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `<div class="elemento">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <img src="/src/img/close.png" alt="" onclick='eliminarIngreso(${ingreso.id})'/>
                            </button>
                        </div>
                    </div>
                </div>`;
    return ingresoHTML;
}

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarHeader();
    cargarIngresos();
}

const cargarGastos = ()=>{
    let gastosHTML = '';
    for(let gasto of gastos){
        gastosHTML += crearGastoHTML(gasto);
    }
    document.getElementById('lista-gastos').innerHTML = gastosHTML;
}

const crearGastoHTML = (gasto)=>{
    let gastoHTML =  `<div class="elemento">
    <div class="elemento_descripcion">${gasto.descripcion}</div>
    <div class="elemento_valor">- ${formatoMoneda(gasto.valor)}
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <img src="/src/img/cancel.png" alt="" onclick='eliminarGasto(${gasto.id})'/>
            </button>
        </div>
    </div>
</div>`;
    return gastoHTML;
}

let eliminarGasto = (id)=>{
    let indiceEliminar = gastos.findIndex(gasto => gasto.id === id);
    gastos.splice(indiceEliminar, 1);
    cargarHeader();
    cargarGastos();
}

let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarHeader();
            cargarIngresos();
        }
        else if(tipo.value === 'gasto'){
           gastos.push( new Gasto(descripcion.value, +valor.value));
           cargarHeader();
           cargarGastos();
        }
    }
}