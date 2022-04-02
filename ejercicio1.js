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
// Función para calcular la cantidad de días consecutivos de racha del usuario //
/*******************************************************************************************************/
export const diasRacha = async () => {
	// Obtenemos la fecha actual
	let now = dayjs().tz(zonaHor);
	// Hardcodeamos la fecha inicial como el día de hoy
	now = dayjs(fechaIni).tz(zonaHor);

	// Inicializamos los dias de racha en 0 dias
	let dias = 0;

	// Ordenamos la data de manera descendente por la fecha de sesion, usando la función utilitaria.
	// Esto con el fin de contabilizar por la fecha mas actual.
	const dataS = sortJson(data, 'dateSession', 'desc');
	// Realizamos un recorrido de la data ordenada
	const promises = dataS.map((ele, index) => {
		// Formateamos la fecha de la sesión
		const dateF = dayjs(ele.dateSession).tz(zonaHor).format(format);
		// Formatemos la fecha actual
		const nowF = now.format(format);
		// Comparamos la fecha actual (que ira variando segun la racha) con la fecha de sesion
		if (dateF === nowF) {
			// Si hay coincidencia vemos si completó la sesión ese día
			if (ele.isSessionCompleted) {
				// Si completo sesión ese día
				// Incrementamos en uno el día de racha
				dias++;
				// Decrementamos en un día la fecha actual para comparar con el siguiente día de sesión
				now = now.subtract(1, 'day');
			}
		}
	});
	// Esperamos el resultado del recorrido
	await Promise.all(promises);
	// Retornamos los días de racha
	return dias;
};
