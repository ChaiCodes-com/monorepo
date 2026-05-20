# ChAI Codes Monorepo

Shared packages and applications for ChAI Codes projects.

## Packages

- **@chaicodes/stripe-helpers** — Payment system with subscriptions and tokens
- **@chaicodes/legal-pages** — About pages and Terms & Conditions components

## Apps

- **resolution-composer** — Resolution generation tool for Kappa Psi

## Getting Started

`ash
# Install all dependencies
npm install

# Install a specific workspace
cd packages/stripe-helpers
npm install

# Use in an app
cd apps/resolution-composer
npm install @chaicodes/stripe-helpers
`

## Development

Each workspace is independent. Make changes in packages/, then update apps to use the latest.

## License

MIT © ChAI Wang
