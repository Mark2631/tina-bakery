"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateForDisplay, isDateAvailable, toLocalDateString } from "@/lib/dates";

type DatePickerProps = {
  id: string;
  value: string;
  minDate: string;
  isCustom?: boolean;
  invalid?: boolean;
  errorId?: string;
  onChange: (value: string) => void;
};

const weekdays = [
  { short: "Su", full: "Sunday" },
  { short: "Mo", full: "Monday" },
  { short: "Tu", full: "Tuesday" },
  { short: "We", full: "Wednesday" },
  { short: "Th", full: "Thursday" },
  { short: "Fr", full: "Friday" },
  { short: "Sa", full: "Saturday" },
];

function parseDateKey(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 12));
}

function formatDateKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function dateKeyForParts(year: number, month: number, day: number) {
  return formatDateKey(new Date(Date.UTC(year, month, day, 12)));
}

function monthStart(value: string) {
  const date = parseDateKey(value) ?? new Date();
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 12));
}

function addDays(value: string, amount: number) {
  const date = parseDateKey(value);
  if (!date) return value;
  date.setUTCDate(date.getUTCDate() + amount);
  return formatDateKey(date);
}

function addMonths(value: string, amount: number) {
  const date = parseDateKey(value);
  if (!date) return value;
  const targetMonth = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1, 12),
  );
  const lastDay = new Date(
    Date.UTC(targetMonth.getUTCFullYear(), targetMonth.getUTCMonth() + 1, 0, 12),
  ).getUTCDate();
  targetMonth.setUTCDate(Math.min(date.getUTCDate(), lastDay));
  return formatDateKey(targetMonth);
}

function monthIndex(value: string) {
  const date = parseDateKey(value);
  return date ? date.getUTCFullYear() * 12 + date.getUTCMonth() : 0;
}

export function DatePicker({
  id,
  value,
  minDate,
  isCustom = false,
  invalid = false,
  errorId,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => monthStart(value || minDate));
  const [activeDate, setActiveDate] = useState(value || minDate);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dayButtonRefs = useRef(new Map<string, HTMLButtonElement>());
  const calendarId = `${id}-calendar`;
  const descriptionId = `${id}-availability`;
  const monthName = new Intl.DateTimeFormat("en-KE", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(visibleMonth);
  const currentMonthIndex =
    visibleMonth.getUTCFullYear() * 12 + visibleMonth.getUTCMonth();
  const earliestMonthIndex = monthIndex(minDate);
  const today = toLocalDateString(new Date());
  const dayKeys = useMemo(() => {
    const year = visibleMonth.getUTCFullYear();
    const month = visibleMonth.getUTCMonth();
    const firstWeekday = new Date(Date.UTC(year, month, 1, 12)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0, 12)).getUTCDate();

    return Array.from({ length: 42 }, (_, index) => {
      const day = index - firstWeekday + 1;
      return day < 1 || day > daysInMonth
        ? null
        : dateKeyForParts(year, month, day);
    });
  }, [visibleMonth]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      dayButtonRefs.current.get(activeDate)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [activeDate, open, visibleMonth]);

  function isUnavailable(dateKey: string) {
    return dateKey < minDate || !isDateAvailable(dateKey, isCustom);
  }

  function focusDate(dateKey: string) {
    if (isUnavailable(dateKey)) return;
    setActiveDate(dateKey);
    setVisibleMonth(monthStart(dateKey));
  }

  function handleDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, dateKey: string) {
    const date = parseDateKey(dateKey);
    if (!date) return;

    let target: string | null = null;
    switch (event.key) {
      case "ArrowLeft":
        target = addDays(dateKey, -1);
        break;
      case "ArrowRight":
        target = addDays(dateKey, 1);
        break;
      case "ArrowUp":
        target = addDays(dateKey, -7);
        break;
      case "ArrowDown":
        target = addDays(dateKey, 7);
        break;
      case "Home":
        target = addDays(dateKey, -date.getUTCDay());
        break;
      case "End":
        target = addDays(dateKey, 6 - date.getUTCDay());
        break;
      case "PageUp":
        target = addMonths(dateKey, -1);
        break;
      case "PageDown":
        target = addMonths(dateKey, 1);
        break;
      default:
        return;
    }

    if (!target) return;
    event.preventDefault();
    const direction = target < dateKey ? -1 : 1;
    for (let step = 0; step < 370; step += 1) {
      if (target < minDate && direction < 0) return;
      if (!isUnavailable(target)) {
        focusDate(target);
        return;
      }
      target = addDays(target, direction);
    }
  }

  function openCalendar() {
    if (open) {
      setOpen(false);
      return;
    }
    const focusTarget = value && !isUnavailable(value) ? value : minDate;
    setVisibleMonth(monthStart(focusTarget));
    setActiveDate(focusTarget);
    setOpen(true);
  }

  function selectDate(dateKey: string) {
    if (isUnavailable(dateKey)) return;
    onChange(dateKey);
    setActiveDate(dateKey);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function changeMonth(amount: number) {
    const next = new Date(
      Date.UTC(
        visibleMonth.getUTCFullYear(),
        visibleMonth.getUTCMonth() + amount,
        1,
        12,
      ),
    );
    setVisibleMonth(next);
    const firstDate = formatDateKey(next);
    let candidate = firstDate;
    for (let step = 0; step < 31 && isUnavailable(candidate); step += 1) {
      candidate = addDays(candidate, 1);
    }
    if (!isUnavailable(candidate)) setActiveDate(candidate);
  }

  return (
    <div
      className="date-picker"
      data-open={open}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className="date-picker-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={calendarId}
        aria-describedby={
          invalid && errorId ? `${descriptionId} ${errorId}` : descriptionId
        }
        data-invalid={invalid ? "true" : undefined}
        onClick={openCalendar}
      >
        <CalendarDays size={18} aria-hidden="true" />
        <span>{value ? formatDateForDisplay(value) : "Choose a date"}</span>
      </button>
      <p id={descriptionId} className="sr-only">
        Sundays and dates before {formatDateForDisplay(minDate)} are unavailable.
      </p>
      <div
        id={calendarId}
        className="date-picker-panel"
        role="dialog"
        aria-label="Choose a delivery date"
        hidden={!open}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
            requestAnimationFrame(() => triggerRef.current?.focus());
          }
        }}
      >
        <div className="date-picker-heading">
          <button
            type="button"
            className="date-picker-nav"
            aria-label="Show previous month"
            disabled={currentMonthIndex <= earliestMonthIndex}
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft size={17} aria-hidden="true" />
          </button>
          <h3 id={`${id}-month`} aria-live="polite">
            {monthName}
          </h3>
          <button
            type="button"
            className="date-picker-nav"
            aria-label="Show next month"
            onClick={() => changeMonth(1)}
          >
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="date-picker-weekdays" role="row">
          {weekdays.map((day) => (
            <span key={day.full} role="columnheader" aria-label={day.full}>
              {day.short}
            </span>
          ))}
        </div>
        <div
          className="date-picker-grid"
          role="grid"
          aria-labelledby={`${id}-month`}
        >
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <div className="date-picker-week" role="row" key={weekIndex}>
              {dayKeys.slice(weekIndex * 7, weekIndex * 7 + 7).map((dateKey, dayIndex) => {
                if (!dateKey) {
                  return (
                    <span
                      className="date-picker-empty"
                      role="gridcell"
                      aria-disabled="true"
                      key={`empty-${weekIndex}-${dayIndex}`}
                    />
                  );
                }

                const unavailable = isUnavailable(dateKey);
                const date = parseDateKey(dateKey);
                const isSunday = date?.getUTCDay() === 0;
                const unavailableReason = isSunday
                  ? "Tina Bakers is closed"
                  : "Before the earliest available date";

                return (
                  <span
                    className="date-picker-cell"
                    role="gridcell"
                    aria-selected={value === dateKey}
                    aria-disabled={unavailable}
                    key={dateKey}
                  >
                    <button
                      ref={(node) => {
                        if (node) dayButtonRefs.current.set(dateKey, node);
                        else dayButtonRefs.current.delete(dateKey);
                      }}
                      type="button"
                      className="date-picker-day"
                      disabled={unavailable}
                      tabIndex={activeDate === dateKey && !unavailable ? 0 : -1}
                      aria-label={`${formatDateForDisplay(dateKey)}${unavailable ? `, ${unavailableReason}` : ""}`}
                      aria-pressed={value === dateKey}
                      aria-current={today === dateKey ? "date" : undefined}
                      onKeyDown={(event) => handleDayKeyDown(event, dateKey)}
                      onClick={() => selectDate(dateKey)}
                    >
                      {date?.getUTCDate()}
                    </button>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        <p className="date-picker-note">
          Sundays and dates before the earliest available day are unavailable.
        </p>
      </div>
    </div>
  );
}
