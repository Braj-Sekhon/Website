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

- Built Node.js backend to monitor Minecraft and Terraria servers on the same PC:
  - Status (online / offline)
  - Player Count

## Current State

This is a refactored version of my first website focused on the technical infrastructure and learning journey — experimental features are removed.

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

Through this whole project, the world of web development was demystified for me. I now understand the full stack from network packets to UI components, which makes me a more effective developer when debugging production issues or architecting new systems. This hands-on approach taught me far more than any tutorial could.
