export const generateGoogleCalendarLink = (event: {
  title: string;
  location: string;
  description: string;
  startTime: string;
  endTime: string;
}) => {
  const { title, location, description, startTime, endTime } = event;

  const formattedStart = startTime.replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
  const formattedEnd = endTime.replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formattedStart}/${formattedEnd}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;
};