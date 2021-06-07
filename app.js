require( 'colors' );

const { guardarDB, leerDB } = require( './helpers/manipularArchivo' );

const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        listadoTareasCompletar
        } = require( './helpers/inquirer' );

const Tareas = require( './models/tareas' );

console.clear();

// Funcion principal
const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    // Cargar tareas
    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // Imprimir el menú
        opt = await inquirerMenu();
        
        switch(opt) {
            case '1':
                // Crear tareas
                const desc = await leerInput( 'Descripción: ' );
                tareas.crearTarea(desc);
            break;
            case '2':
                // Listar tareas 
                tareas.listadoCompleto();
            break;
            case '3':
                // Listar tareas completadas
                tareas.listarPendientesCompletadas( true );
            break;
            case '4':
                // Leer tareas pendientes
                tareas.listarPendientesCompletadas( false );
            break;
            case '5':
                // Completar tarea
                const ids = await listadoTareasCompletar ( tareas.listadoArr );
                tareas.toggleCompletadas( ids );

            break;
            case '6':
                // Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const confirmacion = await confirmar('¿Está seguro que desea borrar la tarea?'.red);
                    if ( confirmacion ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada'.green);
                    }
                }
            break;
        }

        // Guardar tareas
        guardarDB(tareas.listadoArr);

        // Pausar aplicación
        if (opt !== '0') await pausa();
        
    } while( opt !== '0');
}

main();