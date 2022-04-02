/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import { diasRacha } from './ejercicio1';
import { maximaRacha } from './ejercicio2';

/*******************************************************************************************************/
// Definimos la función Progreso del usuario //
/*******************************************************************************************************/
const getProgreso = async () => {
	console.log('Progreso de Usuario');
	console.log('===================');
	// Obtenemos los días de racha de la función del ejercicio1
	// Hardcodeamos la fecha inicial como el día de hoy
	const dias = await diasRacha();
	console.log(`Días de racha: ${dias}`);
	// Obtenemos los días de racha de la función del ejercicio2
	const diasM = await maximaRacha();
	console.log(`Máxima racha: ${diasM}`);
};

/*******************************************************************************************************/
// Ejecutamos la función progreso del usuario //
/*******************************************************************************************************/
getProgreso();
