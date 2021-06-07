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

    borrarTarea( id = '' ) {
        if  (this._listado[id]) {
            delete this._listado[id];
        }
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

        console.log('\n');
        
        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${i+1}.`.cyan;
            const { desc, completadoEn} = tarea;
            const estado = ( completadoEn ) ? 'Completado'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas( completadas = true ) {
        
        console.log('\n');
        
        let contador = 1;

        this.listadoArr.forEach( (tarea, i) => {

            const { desc, completadoEn} = tarea;
            const estado = ( completadoEn ) ? 'Completado'.green : 'Pendiente'.red;

            if ( completadas ) {
                if ( completadoEn ) {
                    console.log(`${contador}. `.cyan + `${desc} :: ${completadoEn.green}`);
                    contador++;
                }
            } else {
                if ( !completadoEn ) {
                    console.log(`${contador}. `.cyan + `${desc} :: ${estado}`);
                    contador++;
                }
            }


        });
    }

    // Marcar como completadas o pendientes las tareas 
    toggleCompletadas ( ids = [] ) {

        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;