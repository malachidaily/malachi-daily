# Malachi Daily App

This is a Progressive Web App (PWA) to help comunity gather together and memorize scripture, in a fun and interactive way. The content is curated by the Malachi Daily team.

## Toolkit / Stack

- [Astro](https://astro.build/) - JavaScript framework.
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework.
- [Alpine.js](https://alpinejs.dev/) - Interactive layer and state management.
- [Daisy UI](https://daisyui.com/) - UI CSS library.
- [PWA Install Dialog](https://github.com/storedotapp/pwa-install-dialog) - Makes it easy where people can install the app on their device.
- [Netlify](https://www.netlify.com/) - Where I host the site.
- [Google Analytics](https://analytics.google.com/) - This is for analytics.
- [Google Tag Manager](https://www.google.com/tagmanager/) - This is for analytics.
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) - This is for notifications.
- [Bolls Life Bible API](https://bolls.life/) - This is where we get our verses from.
- [Baserow.io](https://baserow.io/) - This is where we store our data for upcoming verses.

## Get Started

To get this working properly, you will need to set up your own environment variable. Email Cam for it.

```bash
BASEROW_TOKEN="..."
```

```bash
npm install
npm run dev
```

## Deploy to Netlify

This happens automatically when a GitHub PR is merged and/or when the `main` branch is pushed. It will deply to https://app.malachidaily.com. All changes should then be visible on any device with the app installed. 

## Future Ideas

- Implement [`BibleScraper`](https://github.com/IonicaBizau/bible-scraper) instead of Bolls List Bible API, or as a backup, because it'll give us access to the entire Bible.com library of Bible Versions and verses.
- Use PWABuilder to turn this into an app to be shipped to the Android Google Play Store and the iOS Apple App Store.