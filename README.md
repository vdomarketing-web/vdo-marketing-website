# V DO MARKETING — Editable Creative Studio Website

Open this folder in VS Code. Start with `index.html` (Live Server recommended).

## Choose your look (no coding knowledge required)
Open `js/site-config.js`:
- `theme`: `"dark"`, `"light"`, or `"electric"`
- `heroStyle`: `"showreel"`, `"cinematic"`, or `"typography"`
- `motionIntensity`: `"full"`, `"balanced"`, or `"subtle"`
- `brandName`, `tagline`, `email`, `phone`, `location`, `socials`
- `showDesignPanel`: true/false

The small Design panel appears at the bottom-left of the homepage when enabled. It lets you preview theme and hero variants live. Your final choice should also be saved in `site-config.js`.

## Pages included
- `index.html`
- `services/website-development.html`
- `services/seo.html`
- `services/social-media-management.html`
- `services/content-creation.html`
- `services/paid-ads.html`
- `services/influencer-marketing.html`
- `services/affiliate-marketing.html`
- `about.html`, `blog.html`, `faq.html`, `contact.html`

## Replace demo content
- Search for `EDIT:` comments in HTML/CSS/JS.
- Replace `assets/showreel-placeholder.mp4` with your own video and update the video source in `js/main.js`.
- Replace CSS image URLs / gradient placeholders with your own images. Keep image files inside `assets/`.
- Update all contact details, social links, service copy and blog cards before publishing.

## Animation stack
GSAP + ScrollTrigger and Lenis are loaded from CDNs. If unavailable, CSS reveal animations and native scrolling still work. Reduced-motion preferences are respected. The visual effects include reveal-on-scroll, staggered cards, magnetic-style buttons, pointer glow, counters, marquee, animated nav, tilt cards and page intro.

## Important
This is a polished, editable front-end starter. The contact form is a front-end demo and needs a form endpoint (e.g. Formspree or your own backend) before it can receive enquiries. Replace all sample portfolio/blog content with genuine work; no client results or testimonials are invented.


## Expanded edition
Every page now has additional editorial sections, larger visual layouts and a portfolio/creative showcase section near the end. Portfolio cards are visual placeholders; replace them with approved client/team projects, videos and links before launch.


## Art direction update
This edition uses a more editorial, studio-led layout with restrained orange accents, sharper typography, asymmetric visual composition and less repetitive card styling. The portfolio showcase appears once on the homepage near the end. Its three panels are visual mock-ups only; replace them with your team's real work before launch. No client outcomes, testimonials or performance figures are claimed.
