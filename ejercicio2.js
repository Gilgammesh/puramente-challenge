/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import data from './data.json';
import sortJson from './sortJson';
import { zonaHor, fechaIni, format } from './variables';

/*******************************************************************************************************/
// Extendemos UTC y Time Zone a DaysJS //
/*******************************************************************************************************/
dayjs.extend(utc);
dayjs.extend(timezone);

/*******************************************************************************************************/
// Función para calcular el record histórico de días de racha del usuario //
/*******************************************************************************************************/
export const maximaRacha = async () => {
	// Obtenemos la fecha actual
	let now = dayjs().tz(zonaHor);
	// Hardcodeamos la fecha inicial como el día de hoy
	now = dayjs(fechaIni).tz(zonaHor);
	// Inicializamos los dias de racha en 0 dias
	let dias = 0;
	// Inicializamos el index del array
	let i = 0;
	// Inicializamos el array de dias
	let arrayDias = [];

	// Ordenamos la data de manera descendente por la fecha de sesion, usando la función utilitaria.
	// Esto con el fin de contabilizar por la fecha mas actual.
	const dataS = sortJson(data, 'dateSession', 'desc');
	// Realizamos un recorrido de la data ordenada
	const promises = dataS.map((ele, index) => {
		// Formateamos la fecha de la sesión
		const dateF = dayjs(ele.dateSession).tz(zonaHor).format(format);
		// Formatemos la fecha actual
		const nowF = now.format(format);
		// Si la fecha actual coincide con la fecha de sesion y si completo sesión ese día
		if (dateF === nowF && ele.isSessionCompleted) {
			// Incrementamos en uno el día de racha
			dias++;
			// Decrementamos en un día la fecha actual para comparar con el siguiente día de sesión
			now = now.subtract(1, 'day');
			// Guardamos el número de dias en su index correspondiente
			arrayDias[i] = dias;
		}
		// Si existen saltos de fecha o fechas en que el usuario no hizo sesion o sesiones y si completo sesión ese día
		if (dateF < nowF && ele.isSessionCompleted) {
			// Reiniciamos los dias a 1
			dias = 1;
			// Incrementamos el indice del array en uno
			i++;
			// Guardamos el número de días en su index correspondiente
			arrayDias[i] = dias;
			// Establecemos la fecha actual como un decremento de un día de la fecha de sesión para seguir comparando
			now = dayjs(ele.dateSession).tz(zonaHor).subtract(1, 'day');
		}
	});
	// Esperamos el resultado del recorrido
	await Promise.all(promises);
	// Obtenemos el máximo número de dias del array de días, usando la funcíón nativa max de la librería Math
	const maxDias = Math.max(...arrayDias);
	// Retornamos el máximo de días
	return maxDias;
};
