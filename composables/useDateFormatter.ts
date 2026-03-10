// composables/useDateFormatter.ts

export function useDateFormatter(dateString: string | null | undefined): string {
  if (typeof dateString?.date !== 'string' || dateString?.date.trim() === '') {
    return 'Date non disponible'
  }

  const date = new Date(dateString?.date)

  // Options de formatage (exemple : jour/mois/année, heure:minute:seconde)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  // Formatage selon la locale de l'utilisateur
  return date.toLocaleString(undefined, options)
}
