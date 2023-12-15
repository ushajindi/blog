import { format } from 'date-fns';

export function TextWrap(str: string): string {
  const wrapLength = 55;
  if (str.length > wrapLength) {
    let text = '';
    const count = Math.floor(str.length / wrapLength);
    for (let i = 0; i < count; i += 1) {
      text += `${str.slice(i * wrapLength, (i + 1) * wrapLength)}\n`;
    }
    text += str.slice(count * wrapLength);
    return text;
  }
  return str;
}
export function TypeIf(
  str: string | undefined,
  type: 'edit' | 'create'
): string {
  if (type === 'edit') {
    if (str) {
      return str;
    }
    return '';
  }
  return '';
}
export function formatDate(date: Date) {
  return format(new Date(date), 'MMMM d, yyyy');
}
