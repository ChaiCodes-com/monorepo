/**
 * branding.js
 * Shared ChAICodes branding configuration
 */

export const CHAICODES_BRANDING = {
  // Company Info
  company: 'ChAI Wang',
  website: 'https://chaicodes.com',
  supportEmail: 'support@chaicodes.com',
  
  // Logo & Identity
  logo: {
    text: 'ChAI',
    symbol: '⚙️', // Can be replaced with actual SVG
  },

  // Colors
  colors: {
    primary: '#C8102E', // Deep red
    secondary: '#91A3B0', // Muted blue-gray
    accent: '#5dcc6a', // Green (for success)
    warning: '#e03050', // Red (for warnings)
    background: '#1a1214', // Dark background
    lightBg: '#f5f5f5', // Light background
    text: '#e8e0dc', // Light text
    darkText: '#333', // Dark text
    border: 'rgba(200,16,46,0.22)', // Subtle border
  },

  // Typography
  fonts: {
    primary: "'Lora', Georgia, serif",
    heading: "'Playfair Display', serif",
    label: "'Cormorant Garamond', serif",
    mono: 'monospace',
  },

  // Sizes & Spacing
  sizes: {
    containerMax: 820,
    spacing: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32,
    },
  },

  // Social/Links (if needed)
  social: {
    github: 'https://github.com/chaifuwang-max',
    twitter: 'https://twitter.com/chaiwang',
    email: 'support@chaicodes.com',
  },
};

/**
 * Shared CSS-in-JS styles
 */
export const SHARED_STYLES = {
  // Global style for modals/overlays
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    background: 'rgba(10,4,6,0.82)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
  },

  // Container for content
  modalContent: {
    maxWidth: 600,
    width: '100%',
    background: 'linear-gradient(160deg,#221518,#1a1214)',
    border: `1px solid rgba(200,16,46,0.35)`,
    borderRadius: 4,
    padding: '36px 32px 28px',
    boxShadow: '0 16px 60px rgba(0,0,0,0.7)',
    position: 'relative',
  },

  // Close button
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 16,
    background: 'none',
    border: 'none',
    color: '#91A3B0',
    fontSize: 20,
    cursor: 'pointer',
    lineHeight: 1,
    padding: '2px 6px',
    fontFamily: "'Cormorant Garamond',serif",
  },

  // Section header
  sectionHeader: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: '#C8102E',
    marginBottom: 14,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  // Horizontal line
  divider: {
    flex: 1,
    height: 1,
    background: 'rgba(200,16,46,0.18)',
    display: 'block',
  },

  // Link styles
  link: {
    color: '#C8102E',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  // Button styles
  button: {
    primary: {
      padding: '11px 24px',
      background: 'rgba(200,16,46,0.12)',
      border: '1px solid rgba(200,16,46,0.28)',
      borderRadius: 3,
      color: '#C8102E',
      cursor: 'pointer',
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
    },
    secondary: {
      padding: '11px 24px',
      background: 'transparent',
      border: '1px solid rgba(145,163,176,0.3)',
      borderRadius: 3,
      color: '#91A3B0',
      cursor: 'pointer',
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: 12,
      letterSpacing: '0.1em',
      textDecoration: 'underline',
      textDecorationColor: 'rgba(74,85,96,0.4)',
    },
  },

  // Text styles
  heading1: {
    fontFamily: "'Playfair Display',serif",
    fontSize: 28,
    fontWeight: 700,
    color: '#C8102E',
    letterSpacing: '0.04em',
  },

  heading2: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#C8102E',
    letterSpacing: '0.04em',
  },

  heading3: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 14,
    fontWeight: 700,
    color: '#C8102E',
    marginTop: 20,
    marginBottom: 10,
  },

  bodyText: {
    fontFamily: "'Lora',serif",
    fontSize: 13,
    lineHeight: 1.8,
    color: '#e2d8d4',
  },

  lightText: {
    fontFamily: "'Lora',serif",
    fontSize: 12,
    color: '#4a5560',
    fontStyle: 'italic',
  },
};

/**
 * Get branding config with optional customization
 */
export function getBrandingConfig(overrides = {}) {
  return {
    ...CHAICODES_BRANDING,
    ...overrides,
  };
}

export default CHAICODES_BRANDING;
