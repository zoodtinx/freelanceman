export function formatBytes(bytes: number = 0, decimals: number = 2): string {
  if (!Number.isFinite(bytes) || isNaN(bytes) || bytes < 0) return ''; // Return empty string for invalid inputs

  if (bytes === 0) return '0 Bytes'; // Explicit 0 bytes case

  const k = 1024; // 1 KB = 1024 Bytes
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const formattedValue = (bytes / Math.pow(k, i)).toFixed(decimals);

  if (isNaN(parseFloat(formattedValue))) {
    return ''; // Return empty string if parsing failed
  }

  return `${parseFloat(formattedValue)} ${sizes[i]}`;
}
