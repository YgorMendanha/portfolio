import React, { useEffect, useState } from "react";
import dayjs from "dayjs"; // Para manipulação de datas
import { useWindowSize } from "@/hooks/useWindowSize";

interface Event {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface TimelineItemProps {
  title: string;
  description: string;
  date: string;
  width: number;
  isLast: boolean;
  isCurrent: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  date,
  width,
  isLast,
  isCurrent,
}) => (
  <div className="flex flex-col items-center relative">
    {/* Data acima da bolinha */}
    <div className="text-xs text-gray-500 mb-1">{date}</div>
    <div className="flex items-center relative">
      {/* Linha Conectando Eventos */}
      {!isCurrent && (
        <>
          <div className="w-4 h-4 bg-purple rounded-full z-10"></div>
          {!isLast && (
            <div
              className="h-1 bg-purple"
              style={{
                width: `${width}px`,
                minWidth: "4rem",
              }}
            ></div>
          )}
        </>
      )}
      {isCurrent && (
        <div
          className="h-1 bg-purple"
          style={{
            width: "100%",
          }}
        ></div>
      )}
    </div>
    <div className="mt-2 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

export const HorizontalTimeline = ({
  events,
  lastTitle,
}: {
  events: Event[];
  lastTitle: string;
}) => {
  const getDurationInMonths = (startDate: string, endDate: string) => {
    return dayjs(endDate).diff(dayjs(startDate), "month");
  };

  const eventDurations = events.map((event) =>
    getDurationInMonths(event.startDate, event.endDate)
  );

  const maxDuration = Math.max(...eventDurations);
  const { width } = useWindowSize();
  const [size, setSize] = useState<number>(300);

  useEffect(() => {
    if (width) {
      if (width > 1536) {
        setSize(300);
      }
      if (width < 1536) {
        setSize(500);
      }
      if (width < 1024) {
        setSize(300);
      }
      if (width < 768) {
        setSize(180);
      }
      if (width < 640) {
        setSize(100);
      }
      if (width < 500) {
        setSize(10);
      }
    }
  }, [width]);

  const baseWidth = 80;
  const scaleFactor = size / maxDuration;

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex items-center w-full flex-nowrap">
        {events.map((event, index) => (
          <TimelineItem
            key={index}
            title={event.title}
            description={event.description}
            date={dayjs(event.startDate).format("MMM YYYY")}
            width={eventDurations[index] * scaleFactor + baseWidth}
            isLast={index === events.length - 1}
            isCurrent={event.title === lastTitle}
          />
        ))}
      </div>
    </div>
  );
};
