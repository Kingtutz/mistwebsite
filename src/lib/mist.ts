// All the text content for the Mist site lives here, so it's easy to edit.

export const bar = {
    name: "Mist",
    tagline: "Cocktail Bar",
    address: "Exempelgatan 1, Stockholm",
    email: "hej@mistbar.se",
    phone: "08 — 123 45 67",
    instagram: "https://www.instagram.com/",
    bookingUrl: "#contact",
    hours: [
        { days: "Wed — Thu", time: "17:00 — 00:00" },
        { days: "Fri — Sat", time: "17:00 — 02:00" },
        { days: "Sun — Tue", time: "Closed" },
    ],
};

export const event = {
    title: "Fog Nights",
    intro: "Every Thursday our bartenders take over the bar with a short menu of experimental serves. Four drinks, one evening only.",
    courses: [
        { heading: "Opener", text: "Champagne, elderflower, cucumber mist" },
        { heading: "Second", text: "Smoked mezcal, grapefruit, agave, sea salt" },
        { heading: "Third", text: "Rye whiskey, amaro, cold-brew coffee" },
        { heading: "Closer", text: "Dark rum, banana, brown butter, nutmeg" },
    ],
    price: "495:-",
    note: "Non-alcoholic pairing available. Book in advance.",
};

export const intro =
    "Mist is a cocktail bar for slow evenings and long conversations. Low light, good music and drinks made with care.";

export type MenuItem = { name: string; description?: string; price: string };
export type MenuSection = { title: string; items: MenuItem[] };
export type MenuTab = { id: string; label: string; sections: MenuSection[] };

export const menu: MenuTab[] = [
    {
        id: "cocktails",
        label: "Cocktails",
        sections: [
            {
                title: "Signatures",
                items: [
                    { name: "MIST", description: "gin, yuzu, lavender, egg white", price: "165" },
                    { name: "HARBOUR FOG", description: "mezcal, pineapple, smoked salt, lime", price: "175" },
                    { name: "MIDNIGHT SOUR", description: "bourbon, blackberry, lemon, aquafaba", price: "165" },
                    { name: "SILVER LINING", description: "vodka, pear, elderflower, prosecco", price: "160" },
                ],
            },
            {
                title: "Classics",
                items: [
                    { name: "NEGRONI", description: "gin, campari, sweet vermouth", price: "155" },
                    { name: "OLD FASHIONED", description: "rye, demerara, angostura", price: "165" },
                    { name: "DRY MARTINI", description: "gin or vodka, dry vermouth, olive or twist", price: "165" },
                    { name: "ESPRESSO MARTINI", description: "vodka, coffee liqueur, espresso", price: "155" },
                ],
            },
            {
                title: "Zero proof",
                items: [
                    { name: "CLEAR SKY", description: "seedlip, cucumber, mint, tonic", price: "110" },
                    { name: "SOFT RAIN", description: "hibiscus, ginger, lime, soda", price: "105" },
                ],
            },
        ],
    },
    {
        id: "drinks",
        label: "Wine & Beer",
        sections: [
            {
                title: "Wine by the glass",
                items: [
                    { name: "CHAMPAGNE", description: "brut, Épernay", price: "175" },
                    { name: "RIESLING", description: "Mosel, Germany", price: "135" },
                    { name: "PINOT NOIR", description: "Burgundy, France", price: "145" },
                ],
            },
            {
                title: "Beer",
                items: [
                    { name: "PILSNER", description: "draught 40 cl", price: "89" },
                    { name: "IPA", description: "local brewery, 33 cl", price: "95" },
                    { name: "ALCOHOL-FREE LAGER", price: "65" },
                ],
            },
        ],
    },
    {
        id: "snacks",
        label: "Snacks",
        sections: [
            {
                title: "Bar snacks",
                items: [
                    { name: "MIST NUT MIX", description: "smoked almonds, cashews, rosemary", price: "65" },
                    { name: "OLIVES", description: "nocellara, lemon, chili", price: "65" },
                    { name: "OYSTERS", description: "shallot vinegar, lemon", price: "45/st" },
                    { name: "CROQUETTES", description: "gruyère, jamón", price: "125" },
                    { name: "CHEESE & CHARCUTERIE", description: "for sharing", price: "245" },
                ],
            },
        ],
    },
];
