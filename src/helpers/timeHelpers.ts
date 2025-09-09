import { DateTime } from "luxon";
export const TimeOnly = (eventTimeUtc: string, timeZone: string): string => {
    const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: "utc" }).setZone(
      timeZone
    );
    return eventDateTime.setZone(timeZone).toFormat("HH:mm");
  };

export const DateOnly = (eventTimeUtc: string, timeZone: string): string => {
    const now = DateTime.now().setZone(timeZone);
    const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: "utc" }).setZone(
      timeZone
    );
  
    if (eventDateTime.hasSame(now, "day")) {
      return "Today";
    }
  
    if (eventDateTime.hasSame(now.minus({ days: 1 }), "day")) {
      return "Yesterday";
    }
  
    if (eventDateTime.hasSame(now, "year")) {
      return eventDateTime.setZone(timeZone).toFormat("d LLL");
    }
  
    return eventDateTime.setZone(timeZone).toFormat("d LLL yyyy");
  };
  
  export const YearOnly = (eventTimeUtc: string, timeZone: string): string => {
    const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: "utc" }).setZone(timeZone);
    return eventDateTime.toFormat("yyyy");
  };

export const FormatDateTime = (eventTimeUtc: string, timeZone: string): string => {
    const now = DateTime.now().setZone(timeZone);
    const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: "utc" }).setZone(timeZone);

    if (eventDateTime.hasSame(now, "day")) {
      return `Today @${eventDateTime.toFormat("HH:mm:ss")}`;
    }

    return eventDateTime.toFormat("dd/MM/yyyy @HH:mm:ss");
};