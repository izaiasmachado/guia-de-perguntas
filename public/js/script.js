function formatDateToBrowserTimezone(date) {
  // Cria um objeto Date a partir do argumento recebido
  const dateObj = new Date(date);

  // Função auxiliar para adicionar um zero à esquerda se necessário
  const padZero = (num) => num.toString().padStart(2, "0");

  // Extrai as partes da data e hora, ajustadas para a timezone do browser
  const day = padZero(dateObj.getDate());
  const month = padZero(dateObj.getMonth() + 1); // Os meses são indexados a partir de 0
  const year = dateObj.getFullYear();
  const hours = padZero(dateObj.getHours());
  const minutes = padZero(dateObj.getMinutes());

  // Formata a string no formato desejado
  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}
