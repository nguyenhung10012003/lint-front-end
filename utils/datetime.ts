export function formatTimeDifference(date: Date, lang: string): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 0) return "0";

  // Đơn vị thời gian
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (minutes < 60) {
    return `${minutes} {}`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 30) {
    return `${days}d ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return date.toLocaleDateString();
  }
}
