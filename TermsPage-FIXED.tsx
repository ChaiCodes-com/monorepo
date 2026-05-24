/**
 * TermsPage.tsx
 * Full Terms & Conditions page
 * Includes: Account access, session limits, subscriptions, refund policy, etc.
 */

import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { CHAICODES_BRANDING } from '../shared/branding.js';

interface TermsPageProps {
  appName?: string;
}

export function TermsPage({ appName = 'Our Application' }: TermsPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

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
    marginBottom: 30,
  };

  const titleStyle: CSSProperties = {
    fontFamily: "'Playfair Display',serif",
    fontSize: 28,
    fontWeight: 700,
    color: '#C8102E',
    letterSpacing: '0.04em',
    margin: 0,
  };

  const dividerStyle: CSSProperties = {
    width: 80,
    height: 1,
    background: 'linear-gradient(90deg,transparent,#C8102E,transparent)',
    margin: '12px auto 0',
  };

  const contentWrapperStyle: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    maxHeight: '80vh',
    paddingRight: '12px',
    marginBottom: '20px',
  };

  const sectionTitleStyle: CSSProperties = {
    color: '#C8102E',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 700,
  };

  const textStyle: CSSProperties = {
    marginBottom: 12,
    fontSize: 13,
    lineHeight: 1.8,
    color: '#e2d8d4',
  };

  const highlightStyle: CSSProperties = {
    color: '#91A3B0',
    fontWeight: 600,
  };

  const listStyle: CSSProperties = {
    marginBottom: 12,
    paddingLeft: 20,
    color: '#666',
    fontSize: 13,
    lineHeight: 1.8,
  };

  return (
    <div style={bgStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>Terms & Conditions</h1>
          <div style={dividerStyle} />
        </div>

        {/* Content */}
        <div ref={contentRef} style={contentWrapperStyle}>
          <div style={textStyle}>
            By accessing and using {appName} and related services, you agree to be bound by these Terms & Conditions. 
            If you do not agree to these terms, please do not use this service.
          </div>

          {/* 1. Account and Access */}
          <h3 style={sectionTitleStyle}>1. Account and Access</h3>
          <div style={textStyle}>
            By entering an access code or subscribing to {appName}, you agree to use this service solely for 
            legitimate purposes. Access codes are <span style={highlightStyle}>non-transferable and for personal use only</span>. 
            Sharing your access code with other users is prohibited.
          </div>

          {/* 2. Concurrent Session Limits */}
          <h3 style={sectionTitleStyle}>2. Concurrent Session Limits</h3>
          <div style={textStyle}>
            <span style={highlightStyle}>Maximum 2 concurrent active sessions per access code.</span> If you attempt to log in 
            from a third device simultaneously, you will receive an error message. You must log out from another device or wait 
            for your previous session to expire before logging in from a new device. We enforce this limit to prevent unauthorized 
            account sharing and to ensure compliance with our licensing terms.
          </div>

          {/* 3. Subscriptions */}
          <h3 style={sectionTitleStyle}>3. Subscriptions and Automatic Renewal</h3>
          <div style={textStyle}>
            Subscriptions renew automatically on the anniversary of your purchase date (monthly or annually, depending on your plan). 
            <span style={highlightStyle}> You may cancel your subscription at any time</span> through your account settings or by 
            contacting <strong>{CHAICODES_BRANDING.supportEmail}</strong>. Cancellations take effect at the end of your current 
            billing period.
          </div>

          {/* 4. Refund Policy */}
          <h3 style={sectionTitleStyle}>4. Refund Policy</h3>
          
          <h4 style={{ ...sectionTitleStyle, marginTop: 12, fontSize: 12 }}>Subscription Refunds</h4>
          <div style={textStyle}>
            <strong>Grace Period (24 Hours):</strong> If you cancel your subscription within <span style={highlightStyle}>24 hours 
            of purchase AND have not used the service</span>, you are eligible for a full refund. This applies to both monthly and 
            annual subscriptions.
          </div>
          <div style={textStyle}>
            <strong>No Refunds After Grace Period:</strong> Once the 24-hour grace period has expired or the service has been used, 
            <span style={highlightStyle}> no refunds are issued</span> for subscription fees. You may cancel to prevent future charges.
          </div>

          <h4 style={{ ...sectionTitleStyle, marginTop: 12, fontSize: 12 }}>Token Purchases</h4>
          <div style={textStyle}>
            <strong>Refundable:</strong> Tokens purchased due to <span style={highlightStyle}>accidental duplicate charges or 
            documented system errors</span> are refundable. Contact <strong>{CHAICODES_BRANDING.supportEmail}</strong> with proof of error.
          </div>
          <div style={textStyle}>
            <strong>Non-Refundable:</strong> Tokens that have been used or spent in the application cannot be refunded. 
            <span style={highlightStyle}> Unused tokens purchased intentionally are non-refundable.</span>
          </div>

          <h4 style={{ ...sectionTitleStyle, marginTop: 12, fontSize: 12 }}>No Refunds For:</h4>
          <ul style={listStyle}>
            <li>Tokens that have been consumed or used in the application (even partially)</li>
            <li>Subscription fees for billing periods that have already been charged</li>
            <li>Chargebacks initiated without contacting support first</li>
            <li>Refund requests submitted beyond reasonable timeframes</li>
          </ul>

          {/* 5. Limitation of Liability */}
          <h3 style={sectionTitleStyle}>5. Limitation of Liability</h3>
          <div style={textStyle}>
            {appName} and its services are provided on an "as-is" basis. To the maximum extent permitted by law, ChAI Codes and 
            its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including 
            but not limited to loss of data, revenue, or profits, even if advised of the possibility of such damages.
          </div>

          {/* 6. Intellectual Property */}
          <h3 style={sectionTitleStyle}>6. Intellectual Property</h3>
          <div style={textStyle}>
            All content, features, and functionality of {appName} (including but not limited to all information, software, text, 
            displays, images, video, and audio) are the exclusive property of ChAI Codes, its licensors, or other providers of 
            such material and are protected by United States and international copyright laws.
          </div>

          {/* 7. User Conduct */}
          <h3 style={sectionTitleStyle}>7. User Conduct</h3>
          <div style={textStyle}>
            You agree not to use {appName} for any unlawful or prohibited purpose. You further agree not to:
          </div>
          <ul style={listStyle}>
            <li>Harass, intimidate, or harm any person or entity</li>
            <li>Access, copy, or distribute the service in any manner</li>
            <li>Attempt to gain unauthorized access to the service</li>
            <li>Interfere with or disrupt the service or its servers</li>
            <li>Transmit any harmful code, malware, or viruses</li>
            <li>Share access codes or credentials with unauthorized parties</li>
          </ul>

          {/* 8. Termination */}
          <h3 style={sectionTitleStyle}>8. Termination of Access</h3>
          <div style={textStyle}>
            ChAI Codes may terminate your access to {appName} at any time if you violate these Terms & Conditions or engage in 
            prohibited conduct. Upon termination, your right to use the service immediately ceases.
          </div>

          {/* 9. Privacy */}
          <h3 style={sectionTitleStyle}>9. Privacy and Data</h3>
          <div style={textStyle}>
            Your use of {appName} is also governed by our Privacy Policy. Please review our Privacy Policy to understand our 
            practices regarding the collection and use of your personal information.
          </div>

          {/* 10. Service Availability */}
          <h3 style={sectionTitleStyle}>10. Service Availability</h3>
          <div style={textStyle}>
            While we strive for continuous service availability, {appName} may experience downtime for maintenance, updates, or 
            other reasons. ChAI Codes is not liable for any interruptions or unavailability of the service.
          </div>

          {/* 11. Changes to Terms */}
          <h3 style={sectionTitleStyle}>11. Changes to Terms</h3>
          <div style={textStyle}>
            ChAI Codes reserves the right to modify these Terms & Conditions at any time. Changes will be effective immediately 
            upon posting. Your continued use of the service constitutes acceptance of the modified terms.
          </div>

          {/* 12. Contact Information */}
          <h3 style={sectionTitleStyle}>12. Contact and Support</h3>
          <div style={textStyle}>
            If you have questions about these Terms & Conditions or need support, please contact us at:
          </div>
          <div style={{ ...textStyle, textAlign: 'center', fontWeight: 600, marginTop: 12 }}>
            📧 {CHAICODES_BRANDING.supportEmail}
          </div>

          {/* 13. Governing Law */}
          <h3 style={sectionTitleStyle}>13. Governing Law</h3>
          <div style={textStyle}>
            These Terms & Conditions are governed by and construed in accordance with the laws of the United States, and you 
            irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </div>

          {/* 14. Acknowledgment */}
          <h3 style={sectionTitleStyle}>14. Acknowledgment</h3>
          <div style={{ ...textStyle, marginBottom: 28 }}>
            By using {appName}, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. 
            If you do not agree to these terms, please do not use this service.
          </div>

          {/* Last Updated */}
          <div style={{ color: '#4a5560', fontSize: 12, textAlign: 'center', paddingTop: 12, borderTop: '1px solid rgba(200,16,46,0.15)' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
