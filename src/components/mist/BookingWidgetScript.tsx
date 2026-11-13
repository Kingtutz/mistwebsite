"use client";

import Script from "next/script";

// The bokabord/WaiterAid widget only binds its click handler on DOMContentLoaded.
// next/script loads it after that event has already fired, so we re-dispatch it
// once the script is loaded to let the widget initialise.
const BookingWidgetScript = () => (
    <Script
        src="https://app.bokabord.se/widget-popup/widget.min.js"
        strategy="afterInteractive"
        onLoad={() => document.dispatchEvent(new Event("DOMContentLoaded"))}
    />
);

export default BookingWidgetScript;
