export const useTimeFormatter = () => {
  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}.00`;
  };

  return { formatHour };
};
