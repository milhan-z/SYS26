import { site } from "@/data/site";

/** Format an ISO datetime as the UTC stamp Google Calendar expects. */
function toGoogleStamp(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

/** Build an "Add to Google Calendar" link from the event config. */
export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: site.event.title,
    dates: `${toGoogleStamp(site.event.start)}/${toGoogleStamp(site.event.end)}`,
    details: site.meta.description,
    location: `${site.venue.name}, ${site.venue.addressLines.join(", ")}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
