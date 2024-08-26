const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    yesterday: "yesterday",
    daysAgo: "{{count}} days",
    weeksAgo: "{{count}} weeks",
    monthsAgo: "{{count}} months",
  },
  vi: {
    yesterday: "hôm qua",
    daysAgo: "{{count}} ngày",
    weeksAgo: "{{count}} tuần",
    monthsAgo: "{{count}} tháng",
  },
};

type Language = "en" | "vi";

function translate(key: string, language: Language, count?: number): string {
  let translation = translations[language][key];
  if (count !== undefined) {
    translation = translation.replace("{{count}}", count.toString());
  }
  return translation;
}

export function formatTimeDifference(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 0) return "0m ago";

  // Đơn vị thời gian
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (minutes < 60) {
    return `${minutes}m ago`;
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

export function formatTimeAgoV2(
  inputDate: Date | string,
  language: Language = "en"
): string {
  const now = new Date();
  const date = new Date(inputDate);

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInDays < 1) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  if (diffInDays === 1) {
    return translate("yesterday", language);
  }
  if (diffInDays < 7) {
    return translate("daysAgo", language, diffInDays);
  }
  if (diffInWeeks < 5) {
    return translate("weeksAgo", language, diffInWeeks);
  }
  return translate("monthsAgo", language, diffInMonths);
}
