# Parsadiwan Village Website

## Current State
New project, no existing application files.

## Requested Changes (Diff)

### Add
- Running notification ticker at the very top of every page (marquee/scrolling)
- Home page: hero section, Sarpanch profile, village stats, quick services, latest news
- About page: village history, population info, panchayat members
- Downloads page: list of downloadable forms/documents (PDF links)
- Notifications page: full list of announcements and notices
- Contact page: panchayat office address, phone, email, contact form
- Navigation bar with colored tabs for each page
- Bilingual (Hindi + English) content throughout
- Footer with address, sitemap, and portal links

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Store notifications, downloads list, and contact form submissions
2. Frontend: Multi-page React app with React Router
   - Global notification ticker component (top of all pages)
   - Header with logo and colored tab navigation
   - Home page with hero, sarpanch card, stats, services, news
   - About page with village info and panchayat members
   - Downloads page with forms grid
   - Notifications page with full announcements list
   - Contact page with office info and form
   - Footer component
3. Seed sample data for notifications, downloads, and village info
