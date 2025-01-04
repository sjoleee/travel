const getTimeDiff = (start: string, end: string) => {
  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);
  const diffMin = endHour * 60 + endMin - (startHour * 60 + startMin);
  return `${Math.floor(diffMin / 60)}시간 ${diffMin % 60}분`;
};

export default getTimeDiff;
