export function useFormatDate(content: string) {
  if (!content) return '';
  const formattedDate = content.slice(2).replace(/-/g, '.');

  return formattedDate;
}
