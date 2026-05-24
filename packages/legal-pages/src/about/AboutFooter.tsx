/**
 * AboutFooter.tsx
 * Compact About component for footer or sidebar placement
 * Shows ChAICodes branding in minimal space
 */

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { CHAICODES_BRANDING } from '../shared/branding.js';

interface AboutFooterProps {
  appName?: string | null;
  appLogo?: string | null;
  onLearnMore?: (() => void) | null;
}

export function AboutFooter({ appName = null, appLogo = null, onLearnMore = null }: AboutFooterProps) {
  const [expanded, setExpanded] = useState(false);

  const footerStyle: CSSProperties = {
    background: 'rgba(30,16,18,0.88)',
    border: '1px solid rgba(200,16,46,0.15)',
    borderRadius: 4,
    padding: 16,
    marginTop: 24,
    textAlign: 'center',
  };

  const compactStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  };

  const sealStyle: CSSProperties = {
    fontSize: 24,
    color: '#C8102E',
    fontWeight: 700,
  };

  const titleStyle: CSSProperties = {
    fontFamily: "'Playfair Display',serif",
    fontSize: 14,
    fontWeight: 700,
    color: '#C8102E',
    letterSpacing: '0.04em',
    margin: 0,
  };

  const textStyle: CSSProperties = {
    fontFamily: "'Lora',serif",
    fontSize: 12,
    color: '#8a9aa8',
    lineHeight: 1.6,
    margin: '8px 0 0 0',
  };

  const linkButtonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#91A3B0',
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 11,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: 8,
    padding: 0,
  };

  const emailStyle: CSSProperties = {
    fontFamily: "'Lora',serif",
    fontSize: 11,
    color: '#91A3B0',
    textDecoration: 'none',
    marginTop: 4,
  };

  const copyrightStyle: CSSProperties = {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 10,
    color: '#2e3640',
    letterSpacing: '0.06em',
    marginTop: 12,
    paddingTop: 12,
    borderTop: '1px solid rgba(200,16,46,0.1)',
  };

  const expandedSectionStyle: CSSProperties = {
    background: 'rgba(10,4,5,0.5)',
    border: '1px solid rgba(145,163,176,0.15)',
    borderRadius: 3,
    padding: 12,
    marginTop: 12,
    textAlign: 'left',
  };

  const expandedTextStyle: CSSProperties = {
    fontFamily: "'Lora',serif",
    fontSize: 12,
    color: '#b8b0ac',
    lineHeight: 1.65,
    margin: 0,
  };

  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <div style={footerStyle}>
      {/* Compact view */}
      <div style={compactStyle}>
        <div style={sealStyle}>⚙️</div>
        <h3 style={titleStyle}>Built by ChAI Codes</h3>
        
        {appName && (
          <p style={textStyle}>
            {appName}
            {appLogo && ` ${appLogo}`}
          </p>
        )}

        <p style={textStyle}>
          Intelligent applications, thoughtfully designed.
        </p>

        <button 
          style={linkButtonStyle}
          onClick={handleLearnMore}
        >
          {expanded ? 'Hide Details' : 'Learn More'}
        </button>

        <a 
          href={`mailto:${CHAICODES_BRANDING.supportEmail}`}
          style={emailStyle}
        >
          {CHAICODES_BRANDING.supportEmail}
        </a>

        {/* Expanded details */}
        {expanded && (
          <div style={expandedSectionStyle}>
            <p style={expandedTextStyle}>
              <strong style={{ color: '#C8102E' }}>About Us:</strong> ChAI Codes builds modern applications 
              leveraging artificial intelligence to solve real problems with attention to design and detail.
            </p>
            
            <p style={{ ...expandedTextStyle, marginTop: 8 }}>
              <strong style={{ color: '#C8102E' }}>Our Focus:</strong> Excellence in AI integration, 
              user experience design, security, and scalability.
            </p>

            <p style={{ ...expandedTextStyle, marginTop: 8 }}>
              <strong style={{ color: '#C8102E' }}>Support:</strong> Questions? Contact us at{' '}
              <a href={`mailto:${CHAICODES_BRANDING.supportEmail}`} style={{ color: '#C8102E' }}>
                {CHAICODES_BRANDING.supportEmail}
              </a>
            </p>
          </div>
        )}

        <p style={copyrightStyle}>
          © {new Date().getFullYear()} {CHAICODES_BRANDING.company}. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AboutFooter;
