<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/11jh2OP_5qZMjfovSn3yivuK54GOUHhki

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## Google Analytics (GA4) ✅

To enable Google Analytics tracking for page views and clicks:

1. Add your Measurement ID to local env: create `.env.local` with:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. The app will automatically initialize GA on startup and send page_view events whenever the SPA `view` changes, and will also send `click` events for user clicks.

3. Verify events in Google Analytics > Admin > DebugView (or in Realtime and Events). For local testing, use the GA DebugView and the GA4 Debug extension if needed.

Privacy note: Ensure you follow local privacy and consent laws when enabling analytics (cookie banners, consent flows, etc.).

