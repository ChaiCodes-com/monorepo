/**
 * AboutPage.tsx
 * Full-page About component showing ChAICodes branding
 * Can be used as a dedicated /about page
 */

import type { CSSProperties } from 'react';
import { CHAICODES_BRANDING } from '../shared/branding.js';

interface AboutPageProps {
  appName?: string | null;
  appLogo?: string | null;
}

export function AboutPage({ appName = null, appLogo = null }: AboutPageProps) {
  const bgStyle: CSSProperties = {
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at 15% 0%, rgba(200,16,46,0.14) 0%, transparent 45%), radial-gradient(ellipse at 85% 100%, rgba(145,163,176,0.07) 0%, transparent 45%), linear-gradient(160deg, #1a1214 0%, #221518 45%, #1a1214 100%)',
    fontFamily: "'Lora', Georgia, serif",
    color: '#e8e0dc',
    padding: '60px 16px',
  };

  const containerStyle: CSSProperties = {
    maxWidth: 820,
    margin: '0 auto',
    background: 'rgba(30,16,18,0.88)',
    border: '1px solid rgba(200,16,46,0.22)',
    borderRadius: 4,
    padding: 28,
    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
  };

  const headerStyle: CSSProperties = {
    textAlign: 'center',
    marginBottom: 40,
  } as const;

  const sealStyle: CSSProperties = {
    width: 80,
    height: 80,
    margin: '0 auto 20px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#2a1416,#1e1012)',
    border: '1px solid rgba(200,16,46,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Playfair Display',serif",
    fontSize: 32,
    color: '#C8102E',
    fontWeight: 700,
  };

  const titleStyle: CSSProperties = {
    fontFamily: "'Playfair Display',serif",
    fontSize: 32,
    fontWeight: 700,
    color: '#C8102E',
    letterSpacing: '0.04em',
    margin: '0 0 8px',
  };

  const subtitleStyle: CSSProperties = {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 14,
    color: '#91A3B0',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    margin: 0,
  };

  const dividerLineStyle: CSSProperties = {
    width: 120,
    height: 1,
    background: 'linear-gradient(90deg,transparent,#C8102E,transparent)',
    margin: '16px auto 0',
  };

  const sectionStyle: CSSProperties = {
    marginBottom: 32,
  };

  const sectionTitleStyle: CSSProperties = {
    fontFamily: "'Playfair Display',serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#C8102E',
    letterSpacing: '0.04em',
    marginBottom: 16,
    borderBottom: '1px solid rgba(200,16,46,0.15)',
    paddingBottom: 12,
  };

  const paragraphStyle: CSSProperties = {
    fontSize: 14,
    lineHeight: 1.8,
    color: '#e2d8d4',
    marginBottom: 12,
  };

  const linkStyle: CSSProperties = {
    color: '#C8102E',
    textDecoration: 'none',
    fontWeight: 600,
  };

  const featureListStyle: CSSProperties = {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: 0,
    margin: '16px 0',
  } as const;

  const featureItemStyle: CSSProperties = {
    display: 'flex',
    gap: 12,
    fontSize: 13,
    color: '#e2d8d4',
    lineHeight: 1.6,
  };

  const featureIconStyle: CSSProperties = {
    color: 'rgba(200,16,46,0.6)',
    flexShrink: 0,
  };

  const footerStyle: CSSProperties = {
    marginTop: 40,
    paddingTop: 24,
    borderTop: '1px solid rgba(200,16,46,0.15)',
    textAlign: 'center',
  } as const;

  const copyrightStyle: CSSProperties = {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 11,
    color: '#4a5560',
    letterSpacing: '0.06em',
    margin: 0,
  };

  return (
    <div style={bgStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: #C8102E; text-decoration: none; }
        a:hover { text-decoration: underline; }
      `}</style>

      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={sealStyle}>⚙️</div>
          <h1 style={titleStyle}>About ChAI Codes</h1>
          <p style={subtitleStyle}>Building AI-Powered Applications</p>
          <div style={dividerLineStyle} />
        </div>

        {/* Mission Section */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Our Mission</h2>
          <p style={paragraphStyle}>
            At ChAI Codes, we build intelligent, thoughtfully-designed applications that leverage artificial intelligence 
            to solve real problems. Our tools are crafted with attention to detail and a commitment to excellence.
          </p>
        </div>

        {/* App Info (if provided) */}
        {appName && (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>About This App</h2>
            <p style={paragraphStyle}>
              This application, <strong>{appName}</strong>
              {appLogo && ` ${appLogo}`}, was built by ChAI Codes using modern technologies 
              and best practices. We focus on creating intuitive experiences that empower our users.
            </p>
          </div>
        )}

        {/* What We Do */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>What We Do</h2>
          <ul style={featureListStyle}>
            <li style={featureItemStyle}>
              <span style={featureIconStyle}>⚡</span>
              <span><strong>AI Integration:</strong> We harness cutting-edge AI to enhance application capabilities and user experience.</span>
            </li>
            <li style={featureItemStyle}>
              <span style={featureIconStyle}>🎨</span>
              <span><strong>Design Quality:</strong> Every pixel is intentional. We believe great UX is invisible—it just works.</span>
            </li>
            <li style={featureItemStyle}>
              <span style={featureIconStyle}>🔒</span>
              <span><strong>User Focus:</strong> Your data security and privacy are paramount. We build with you in mind.</span>
            </li>
            <li style={featureItemStyle}>
              <span style={featureIconStyle}>📈</span>
              <span><strong>Scalable Solutions:</strong> Our applications grow with you, from individual users to enterprise needs.</span>
            </li>
          </ul>
        </div>

        {/* Values Section */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Our Values</h2>
          <ul style={featureListStyle}>
            <li style={featureItemStyle}>
              <span style={featureIconStyle}>✓</span>
              <span><strong>Excellence:</strong> We don't settle for "good enough." Every application is polished and refined.</span>
            </li>
            <li style={featureItemStyle}>
              <span style={featureIconStyle}>✓</span>
              <span><strong>Transparency:</strong> Clear pricing, honest communication, and straightforward terms.</span>
            </li>
            <li style={featureItemStyle}>
              <span style={featureIconStyle}>✓</span>
              <span><strong>Innovation:</strong> We stay at the forefront of technology to bring you the best tools available.</span>
            </li>
            <li style={featureItemStyle}>
              <span style={featureIconStyle}>✓</span>
              <span><strong>Community:</strong> We build for people. Your feedback shapes our future.</span>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Support & Contact</h2>
          <p style={paragraphStyle}>
            Questions about this application or our services? We're here to help.
          </p>
          <p style={{ ...paragraphStyle, textAlign: 'center', marginTop: 20 }}>
            <strong>📧 {CHAICODES_BRANDING.supportEmail}</strong>
          </p>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <p style={copyrightStyle}>
            © {new Date().getFullYear()} {CHAICODES_BRANDING.company}. All rights reserved.
          </p>
          <p style={{ ...copyrightStyle, marginTop: 8 }}>
            Made with ⚙️ at <a href={CHAICODES_BRANDING.website} style={linkStyle}>{CHAICODES_BRANDING.website}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
