const HOUR = 60 * 60 * 1000;
const KENYA_TIME_ZONE = "Africa/Nairobi";
const KENYA_OFFSET = 3 * HOUR;

function kenyaDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: KENYA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  return {
    year: Number(parts.find((part) => part.type === "year")?.value),
    month: Number(parts.find((part) => part.type === "month")?.value),
    day: Number(parts.find((part) => part.type === "day")?.value),
  };
}

function parseCalendarDate(value: string | Date) {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    const { year, month, day } = kenyaDateParts(value);
    return new Date(Date.UTC(year, month - 1, day));
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, yearText, monthText, dayText] = match;
  const date = new Date(
    Date.UTC(Number(yearText), Number(monthText) - 1, Number(dayText)),
  );
  if (
    date.getUTCFullYear() !== Number(yearText) ||
    date.getUTCMonth() !== Number(monthText) - 1 ||
    date.getUTCDate() !== Number(dayText)
  )
    return null;
  return date;
}

export function isSundayDate(value: string): boolean {
  const date = parseCalendarDate(value);
  return Boolean(date && date.getUTCDay() === 0);
}

function kenyaStartOfDay(date: Date) {
  return (
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
    KENYA_OFFSET
  );
}

function formatKenyaDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-KE", {
    ...options,
    timeZone: KENYA_TIME_ZONE,
  }).format(date);
}

export function getStandardMinDate(): Date {
  return new Date(Date.now() + 24 * HOUR);
}

export function getCustomMinDate(): Date {
  return new Date(Date.now() + 48 * HOUR);
}

export function toLocalDateString(date: Date): string {
  const { year, month, day } = kenyaDateParts(date);
  return `${year}-${`${month}`.padStart(2, "0")}-${`${day}`.padStart(2, "0")}`;
}

export function isDateAvailable(
  value: string | Date,
  isCustom = false,
  now = Date.now(),
): boolean {
  const selectedDate = parseCalendarDate(value);
  if (!selectedDate || selectedDate.getUTCDay() === 0) return false;
  const minimum = now + (isCustom ? 48 : 24) * HOUR;
  return kenyaStartOfDay(selectedDate) >= minimum;
}

export function getEarliestAvailableDate(
  isCustom = false,
  now = Date.now(),
): Date {
  const minimum = now + (isCustom ? 48 : 24) * HOUR;
  const parts = kenyaDateParts(new Date(minimum));
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  while (kenyaStartOfDay(date) < minimum || date.getUTCDay() === 0)
    date.setUTCDate(date.getUTCDate() + 1);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12),
  );
}

export function getLeadTimeMessage(isCustom = false): string {
  if (isCustom) return "Custom cakes need 48 hours notice.";
  const orderBy = getStandardMinDate();
  const deliveryOn = getEarliestAvailableDate(false);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return `Order at least 24 hours ahead. Order by ${formatKenyaDate(orderBy, options)} for delivery on ${formatKenyaDate(deliveryOn, options)}.`;
}

export function formatDateForDisplay(value: string): string {
  if (!value) return "";
  const date = parseCalendarDate(value);
  if (!date) return value;
  return formatKenyaDate(new Date(date.getTime() + 12 * HOUR - KENYA_OFFSET), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
