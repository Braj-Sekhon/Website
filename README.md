# Self-Hosted Web Infrastructure

The website that taught me how the internet actually works—from Apache on my PC to SvelteKit on Vercel.

## The Journey

Rather than using managed hosting platforms, I wanted to understand web infrastructure from first principles: how servers, domains, and networks actually work under the hood.

### Phase 1 - Local Hosting

- Configured Apache web server on personal PC
- Deployed basic HTML/CSS/JS site locally
- Learned about ports, HTTP requests, server configuration files

### Phase 2 - Internet Connectivity

- Implemented CloudFlare Argo Tunnel for secure public access without port forwarding
- Self-taught DNS architecture: A records, CNAME records, nameservers
- Configured SSL/TLS certificates for HTTPS

### Phase 3 - Modern Stack Migration

- Migrated from static HTML to SvelteKit framework
- Learned component-based architecture, routing, and state management
- Eventually deployed to cloud hosting (Vercel) for reliability

### Phase 4 - Backend Services

- Built Node.js backend to monitor Minecraft and Terraria servers running on same PC
- Implemented real-time server status checking
- Created API endpoints for external queries

## Current State

This is a refactored version focused on the technical infrastructure and learning journey, with some experimental features removed for clarity.

I've streamlined this version to focus on the core portfolio content and infrastructure lessons learned, removing some of the hobby-focused elements.

## Tech Stack

- **Frontend:** HTML/CSS/JS → SvelteKit
- **Backend:** Node.js, Apache (formerly)
- **Infrastructure:** CloudFlare Argo Tunnel (formerly), DNS management
- **Deployment:** Self-hosted → Vercel (cloud)

## Running Locally

```bash
pnpm install
pnpm run dev
```

## What I Learned

Understanding infrastructure at this level demystified the "magic" of web development. I now understand the full stack from network packets to UI components, which makes me a more effective developer when debugging production issues or architecting new systems. This hands-on approach taught me far more than any tutorial could.
