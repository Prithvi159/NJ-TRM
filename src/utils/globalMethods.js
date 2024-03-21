import dayjs from 'dayjs';

export const toTitleCase = (str) => {
  return str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

export const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};



export const formatDate = (date) => {
  return dayjs(date).format('MM/DD/YYYY');
};
