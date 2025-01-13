export function formatBytes(bytes: number | string = 0, decimals: number = 2): string {
  
  bytes = Number(bytes); 

  if (!Number.isFinite(bytes) || isNaN(bytes) || bytes < 0) {
    console.log('trigger'); 
    return ''; 
  } 

  if (bytes === 0) return '0 Bytes'; 

  const k = 1024; 
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const formattedValue = (bytes / Math.pow(k, i)).toFixed(decimals);

  if (isNaN(parseFloat(formattedValue))) {
    console.log('trigger'); 
    return ''; 
  }

  return `${parseFloat(formattedValue)} ${sizes[i]}`;
}
