/*******************************************************************************************************/
// Creamos una función para ordenar el array por un campo específico y en un orden dado //
/*******************************************************************************************************/
const sortJson = (data, campo, orden) => {
	// Retornamos el json ordenado
	return data.sort((a, b) => {
		const x = a[campo];
		const y = b[campo];
		// Si el orden es ascendente
		if (orden === 'asc') {
			return x < y ? -1 : x > y ? 1 : 0;
		}
		// Si el orden es descendente
		if (orden === 'desc') {
			return x > y ? -1 : x < y ? 1 : 0;
		}
		// Caso contrario retornamos nulo
		return null;
	});
};

/*******************************************************************************************************/
// Exportamos la función por defecto //
/*******************************************************************************************************/
export default sortJson;
