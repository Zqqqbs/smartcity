
import React from 'react';
import { EVENTS, EVENT_CATEGORIES } from '../constants';
import { EventItem } from '../types';
import { FilterSidebar } from './FilterSidebar';

const EventCard: React.FC<{ event: EventItem }> = ({ event }) => {
  const colSpanClass = `lg:col-span-${event.colSpan || 1}`;
  const rowSpanClass = `lg:row-span-${event.rowSpan || 1}`;

  return (
    <div className={`${event.bgColor} ${event.textColor} rounded-lg overflow-hidden relative flex flex-col p-6 ${colSpanClass} ${rowSpanClass} min-h-[250px]`}>
      {event.imageUrl && (
        <>
            <img src={event.imageUrl} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
        </>
      )}
      <div className="relative z-10 flex flex-col h-full">
        <h3 className={`text-xl font-bold ${event.imageUrl ? 'mt-auto' : ''}`}>{event.title}</h3>
        {event.description && <p className="mt-2 text-sm">{event.description}</p>}
      </div>
    </div>
  );
};


export const EventsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {EVENTS.map(event => <EventCard key={event.id} event={event} />)}
            <div className="md:col-span-2 lg:col-span-1">
                 <FilterSidebar categories={EVENT_CATEGORIES} activeCategory="Конференции и саммиты" />
            </div>
        </div>
    </section>
  );
};
