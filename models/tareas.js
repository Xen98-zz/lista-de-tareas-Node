const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    // Genera el arreglo de las tareas
    get listadoArr() {
    
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            listado.push( this._listado[key] );
        });

        return listado;
    }

    // Constructor del objeto
    constructor() {

        this._listado = {};
    }

    // Carga las tareas al objeto
    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        });
    }

    // Crea una tarea nueva
    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    // Hace el listado de todas las tareas 
    listadoCompleto() {

        this.listadoArr.forEach( (tarea, i) => {
            console.log('\n');
            console.log(`${String( i + 1 ).cyan + '.'.cyan} ${tarea.desc} :: ` + ( tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red ) );
        });
    }
}

module.exports = Tareas;