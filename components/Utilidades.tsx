export const formatearFecha = (fecha: string) => {
  return fecha.substring(8) + "/" + fecha.substring(5, 7) + "/" + fecha.substring(0, 4);
}

export const formatearFechaSimple = (fecha: string) => {
  let fecha_tmp = fecha.split( " " );
  let fecha_tmp2 = fecha_tmp[1].split( ":" )
  return fecha_tmp[0].substring(8) + "/" + fecha_tmp[0].substring(5, 7) + "/" + fecha_tmp[0].substring(0, 4) + " " + fecha_tmp2[0]+":"+fecha_tmp2[1]+" hrs.";
}

export const formatearFechaDia = (fechaStr: string): string => {

  // Reemplazamos el espacio entre fecha y hora con una 'T'
  const fecha = new Date(fechaStr.replace(' ', 'T'));

  // Validamos que la fecha sea válida
  if (isNaN(fecha.getTime())) {
    return ' ';
  }

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const fechaFormateada = new Intl.DateTimeFormat('es-MX', opciones).format(fecha);

  // Separar para insertar "del"
  const partes = fechaFormateada.split(' de ');
  const fechaTexto = `${partes[0]} de ${partes[1]} del ${partes[2]}`;

  // Obtener hora en formato de 24h
  const horas = fecha.getHours().toString().padStart(2, '0');

  return `${fechaTexto.charAt(0).toUpperCase() + fechaTexto.slice(1)} a las ${horas} hrs.`;
}

export const formatearFechaDiaCorta = (fechaStr: string): string => {

  // Reemplazamos el espacio entre fecha y hora con una 'T'
  const fecha = new Date(fechaStr.replace(' ', 'T'));

  // Validamos la fecha
  if (isNaN(fecha.getTime())) {
    return ' ';
  }

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const fechaFormateada = new Intl.DateTimeFormat('es-MX', opciones).format(fecha);

  let f1 = fechaFormateada.split(' de ');
  let f2 = f1[0] + " de " + f1[1] ;
  let f3 = f2.split( ', ' );
  return f3[1];
}

export const formatearFechaSoloDia = (fechaStr: string): string => {
  // Reemplazamos espacio entre fecha y hora por 'T' para formato ISO
  const fecha = new Date(fechaStr.replace(' ', 'T'));

  if (isNaN(fecha.getTime())) {
    return '';
  }

  const opciones: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
  };

  // Esto devuelve algo como "14 de agosto"
  let fechaFormateada = new Intl.DateTimeFormat('es-MX', opciones).format(fecha);

  // Convertir primera letra del mes a mayúscula
  fechaFormateada = fechaFormateada.replace(
    /^(\d+ de )(\p{L})/u,
    (_, dia, letra) => `${dia}${letra.toUpperCase()}`
  );

  // Reordenar para que quede "Agosto 14"
  const [dia, mes] = fechaFormateada.split(' de ');
  return `${mes} ${dia}`;
};

export const formatearFechaSoloHora = (fechaStr: string): string => {

  let f = fechaStr.split( ' ' );
  return f[1].substring(0,5);

};

export const formatearTelefono = (telefono: string) => {
  // Elimina el prefijo "52" si está presente al inicio
  if (telefono.startsWith("52")) {
    telefono = telefono.slice(2);
  }

  // Asegúrate de que queden al menos 10 dígitos después del prefijo
  if (telefono.length !== 10) {
    return telefono; // Retorna el valor original si no tiene el formato esperado
  }

  // Divide el número en partes y agrega los espacios
  const parte1 = telefono.slice(0, 3);
  const parte2 = telefono.slice(3, 6);
  const parte3 = telefono.slice(6, 10);

  return `${parte1} ${parte2} ${parte3}`;
}

export const normalizeText = (text:string) => {
  return text
    .toLowerCase() // pasa todo a minúsculas
    .normalize("NFD") // descompone caracteres con acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
    .replace(/\s+/g, ""); // elimina todos los espacios
}

export function obtenerEstadosOrdenados() {
  const estados = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Estado de México",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas"
  ];

  return estados.sort((a, b) => a.localeCompare(b));
}

export const formatearMiles = (valor: string): string => {
  const numero = Number(valor);

  if (isNaN(numero)) {
    return '';
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: valor.includes('.') ? valor.split('.')[1].length : 0,
    maximumFractionDigits: valor.includes('.') ? valor.split('.')[1].length : 0
  }).format(numero);
};

export const formatearIntervaloMinutos = (valor:string) : string =>{
  let intervalo = valor.split( "-" );
  return "Entre el minuto " + intervalo[0] + " y el minuto " + intervalo[1];
}

export function getUserLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve) => {
    // Si el navegador no soporta geolocalización
    if (!navigator.geolocation) {
      resolve({ lat: 0, lng: 0 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // Usuario negó permiso o hubo error
        resolve({ lat: 0, lng: 0 });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
}

export function generarMesesDesde(fechaInicio: string) {
  const inicio = new Date(fechaInicio);
  const hoy = new Date();

  // Normalizamos ambos al primer día del mes
  inicio.setDate(1);
  hoy.setDate(1);

  const meses = [];
  const actual = new Date(hoy);

  while (
    actual.getFullYear() > inicio.getFullYear() ||
    (actual.getFullYear() === inicio.getFullYear() &&
      actual.getMonth() >= inicio.getMonth())
  ) {
    const year = actual.getFullYear();
    const month = actual.getMonth();

    const label = actual
      .toLocaleDateString("es-MX", {
        month: "long",
        year: "numeric",
      })
      .toUpperCase();

    const value = `${year}-${String(month + 1).padStart(2, "0")}`;

    meses.push({
      label,
      value,
    });

    actual.setMonth(actual.getMonth() - 1); // 👈 ahora va hacia atrás
  }

  return meses;
}
