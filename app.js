require( 'colors' );

const { guardarDB, leerDB } = require( './helpers/guardarArchivo' );

const { inquirerMenu, 
        pausa,
        leerInput 
        } = require( './helpers/inquirer' );

const Tareas = require( './models/tareas' );

console.clear();

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
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                // Leer tareas
                tareas.listadoCompleto();
            break;
        }

        // Guardar tareas
        guardarDB(tareas.listadoArr);

        // Pausar aplicación
        if (opt !== '0') await pausa();
        
    } while( opt !== '0');
}

main();