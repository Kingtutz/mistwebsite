import { event } from "@/lib/mist";

const EventSection = () => {
    return (
        <section
            id="event"
            className="scroll-mt-16 bg-mist-bg-alt px-4 py-24 text-center text-mist-text">
            <div className="mx-auto max-w-2xl">
                <h2 className="font-display text-4xl sm:text-5xl">{event.title}</h2>
                <p className="mt-6 text-mist-muted">{event.intro}</p>

                <div className="mt-12 space-y-8">
                    {event.courses.map((course) => (
                        <div key={course.heading}>
                            <h3 className="text-xs uppercase tracking-widest">{course.heading}</h3>
                            <p className="mt-2 text-mist-muted">{course.text}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-12 font-display text-3xl text-mist-accent">{event.price}</p>
                <p className="mt-4 text-sm text-mist-muted">{event.note}</p>
            </div>
        </section>
    );
};

export default EventSection;
