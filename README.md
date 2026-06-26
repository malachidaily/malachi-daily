# Malachi Daily App - OSS

This is a Progressive Web App (PWA) to help people memorize scripture in a fun and interactive way. Pick any passage (or start with a curated list of classics); your verses are saved locally in the browser, with no account or backend required.

## Toolkit / Stack

- [Astro](https://astro.build/) - JavaScript framework.
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework.
- [Alpine.js](https://alpinejs.dev/) - Interactive layer and state management.
- [Daisy UI](https://daisyui.com/) - UI CSS library.
- [Netlify](https://www.netlify.com/) - Where I host the site.
- [Google Analytics](https://analytics.google.com/) - This is for analytics.
- [Google Tag Manager](https://www.google.com/tagmanager/) - This is for analytics.
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) - This is for notifications.
- [Bolls Life Bible API](https://bolls.life/) - This is where we get our verses from.

## Get Started

No environment variables are required. Verse text comes from the public bolls.life API, and each person's verses are stored in their browser's localStorage.

```bash
bun install
bun run dev
```

## [See Our Wiki](https://wiki.mutable.ai/cameronapak/malachi-daily)

This will help you get more familiar with the codebase. 

## Deploy to Netlify

This happens automatically when a GitHub PR is merged and/or when the `main` branch is pushed. It will deply to https://app.malachidaily.com. All changes should then be visible on any device with the app installed. 

## Contributing

See the [Issues Tab](https://github.com/cameronapak/malachi-daily/issues) on GitHub for ways where you can contribute. All contributions must be submitted as a Pull Request (PR). Your contribution is welcomed. 

_It is worth noting that we cannot promise your PR will be merged, but we will do our best to help and honor your help._

### Ideas

- Implement [`BibleScraper`](https://github.com/IonicaBizau/bible-scraper) instead of Bolls List Bible API, or as a backup, because it'll give us access to the entire Bible.com library of Bible Versions and verses.
- Use PWABuilder to turn this into an app to be shipped to the Android Google Play Store and the iOS Apple App Store.
