# AYAH CHAT voice token server

Node.js starter backend for LiveKit room tokens.

Set these environment variables in your hosting dashboard: `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`. Start command: `npm start`.

Health check: `/health`. Token endpoint: `POST /token` with JSON `{ "roomName": "lobby", "identity": "user123" }`.

SECURITY: Development starter only. Before public launch, verify each user's auth token, authorize private rooms and roles, add rate limits and participant limits, and use HTTPS. Never commit `.env` or put the LiveKit API secret in the mobile app or GitHub.
