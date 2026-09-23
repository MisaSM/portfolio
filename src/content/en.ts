import type { SiteContent } from './types'

// Placeholder until the résumé PDF is added (issue "Résumé, final links and launch").
const resumeHref = '#'

export const en: SiteContent = {
  lang: 'en',

  meta: {
    ogImageAlt:
      'Misa Sarabia Molina, Full-Stack Software Developer, beside a red anemone on a dark background.',
  },

  person: {
    name: 'Misa',
    fullName: 'Misa Sarabia Molina',
    email: 'misaelsarabiamolina@gmail.com',
  },

  header: {
    skipLink: 'Skip to content',
    homeLabel: 'Misa, home',
    navLabel: 'Primary',
    nav: [
      { label: 'Work', target: 'work' },
      { label: 'Stack', target: 'stack' },
      { label: 'Contact', target: 'contact' },
    ],
    resume: { label: 'Résumé', href: resumeHref },
  },

  hero: {
    greeting: 'Hi, I’m',
    role: 'Full-Stack Software Developer',
    summary:
      'Building across React, TypeScript, PostgreSQL, Angular and C#/.NET. Sole developer of a five-app delivery platform, with earlier work in government and aerospace software.',
    facts: [
      { term: 'Currently', detail: 'Full-Stack Developer at PorChat' },
      { term: 'Based in', detail: 'Ciudad Obregón, Sonora. Open to remote.' },
      {
        term: 'Education',
        detail:
          'Bachelor’s in Software Development and Management. 4.0 GPA, graduated with honors.',
      },
      { term: 'Languages', detail: 'Spanish (native), English (C1)' },
    ],
  },

  work: {
    heading: 'Selected work',
    builtWithLabel: 'Built with',
    projects: [
      {
        id: 'porchat-go',
        period: 'April – July 2026',
        team: 'Sole developer',
        title: 'PorChat Go',
        description:
          'A delivery platform of five applications (driver, group leader, publisher, admin and public link ingestion) on a 16-table PostgreSQL schema with a full row-level security policy set.',
        diagram: {
          drivers: ['Driver A', 'Driver B'],
          functionTitle: 'Claim edge function',
          steps: ['Authorization check', 'Eligibility check', 'Atomic conditional UPDATE'],
          outcomes: { won: 'Claimed', lost: 'HTTP 409 Conflict' },
          description:
            'Two drivers send claims for the same shipment to the claim edge function, which runs an authorization check, an eligibility check and an atomic conditional update. One request is claimed; the other receives HTTP 409 Conflict.',
          caption:
            'Two drivers claim the same shipment at the same moment. A single conditional UPDATE decides the winner; the other request is refused.',
        },
        problems: [
          {
            title: 'Exactly one driver wins',
            body: 'Claims run through a Deno edge function: authorization and eligibility checks in sequence, then one atomic conditional UPDATE. Every conflicting request gets an HTTP 409, and a dedicated integration test holds that line.',
          },
          {
            title: 'Prices the client can’t touch',
            body: 'Shipping cost is calculated inside PostgreSQL, closing a hole where the price could be tampered with client-side. SECURITY DEFINER triggers keep delivery counts and ratings consistent on every write path.',
          },
          {
            title: 'Notifications that route themselves',
            body: 'A Firebase Cloud Messaging v1 pipeline written in Deno, authenticated with WebCrypto and sending data-only payloads, so the service worker decides where each tap goes.',
          },
          {
            title: 'Five apps, one pipeline',
            body: 'Shared component and type packages across pnpm workspaces. GitHub Actions gates every change on typecheck, lint and build, then deploys five Cloudflare Pages apps and every edge function automatically.',
          },
        ],
        builtWith: [
          'PostgreSQL',
          'Supabase Edge Functions (Deno)',
          'Firebase Cloud Messaging',
          'pnpm workspaces',
          'GitHub Actions',
          'Cloudflare Pages',
        ],
      },
      {
        id: 'porchat',
        period: 'November 2025 – present',
        team: 'Team of six',
        title: 'PorChat',
        description:
          'A four-application monorepo: React/Vite store and admin apps, an Expo React Native client and a landing site, shipped through two-reviewer pull requests, CI lint and type-check gates and a stage-to-production pipeline.',
        problems: [
          {
            title: 'Channels that unsubscribed themselves',
            body: 'A silent Supabase Realtime failure: duplicate postgres_changes subscriptions were making channels drop themselves. Ad-hoc subscriptions were replaced with a ref-counted channel registry.',
          },
          {
            title: 'Writes that came back from the past',
            body: 'Odd save behavior turned out to be React Query pausing offline mutations instead of failing them. Reconfiguring the mutation network mode stopped stale writes from replaying minutes later.',
          },
          {
            title: 'An installable, offline-aware store',
            body: 'Led the store app’s PWA conversion with Workbox: offline handling, platform-specific install flows, update checks and a documented service-worker recovery procedure.',
          },
          {
            title: 'Closing a data leak',
            body: 'Found a row-level security gap exposing impersonation audit data to authenticated clients, and reworked session detection to prevent cross-account leakage.',
          },
        ],
        builtWith: [
          'React',
          'Vite',
          'Expo (React Native)',
          'Supabase Realtime',
          'TanStack Query',
          'Workbox',
        ],
      },
    ],
    earlier: {
      heading: 'Earlier work',
      roles: [
        {
          period: 'Jan – May 2025',
          organization: 'Pinnacle Aerospace / Sonora Software',
          role: 'Full-Stack Developer Intern',
          details: [
            'Angular and C#/.NET features for internal HR tooling, including role-based scheduling for in-office and remote work.',
            'XML/JSON parsing utilities and REST API cleanup, in a Scrum team alongside QA, DevOps and tech leads.',
          ],
        },
        {
          period: 'Mar – Oct 2024',
          organization: 'Government of Sonora',
          role: 'Frontend Developer, Subsecretaría de Gobierno Digital',
          details: [
            'A biometric authentication app in C#/.NET with the DigitalPersona SDK, replacing manual identity checks for parents.',
            'An Angular attendance system for CENDIS, a special-needs education facility, replacing a paper-based process.',
            'University website content and structure reworked to meet government web standards.',
          ],
        },
      ],
    },
  },

  stack: {
    heading: 'Tech stack',
    coreLabel: 'Core',
    core: ['TypeScript', 'React', 'PostgreSQL', 'Supabase', 'C# / .NET', 'Angular'],
    groups: [
      { title: 'Languages', items: 'TypeScript, C#, SQL, JavaScript, HTML5, CSS3' },
      {
        title: 'Frontend',
        items:
          'TanStack Router, TanStack Query, Tailwind CSS, Radix UI, Ant Design, Vite, React Native (Expo), PWA / Workbox',
      },
      {
        title: 'Backend',
        items: '.NET Core, ASP.NET, REST APIs, JSON, XML, Supabase Edge Functions (Deno)',
      },
      {
        title: 'Data',
        items: 'PostgreSQL with row-level security, PL/pgSQL, triggers and migrations; SQL Server',
      },
      {
        title: 'Services',
        items:
          'Supabase Auth, Realtime and Storage; Firebase Cloud Messaging; Twilio; Sentry; Leaflet',
      },
      {
        title: 'Tooling and practice',
        items:
          'Git, GitHub Actions, Cloudflare Pages, Docker, Linux, pnpm workspaces, Supabase CLI. Agile, Scrum, pull-request review, monorepo architecture.',
      },
    ],
  },

  contact: {
    heading: 'Contact',
    copyButton: { idle: 'Copy email', success: 'Copied' },
    copyStatus: {
      success: 'Email copied to your clipboard.',
      failure: 'Copying isn’t available here. Select the address to copy it.',
    },
    links: [
      { label: 'GitHub', href: 'https://github.com/MisaSM' },
      { label: 'Résumé (PDF)', href: resumeHref },
    ],
  },
}
