import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: Date) {
  const date = new Date(dateStr).toLocaleDateString('en-EN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return date;
}

export function escapeText(text: string) {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
}

export function validateFile(file: File) {
  return file instanceof File && file.name !== '' && file.size > 0;
}

export function stripHtmlTags(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
