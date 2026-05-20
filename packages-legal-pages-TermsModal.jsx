/**
 * TermsModal.jsx
 * Modal version of Terms & Conditions
 * Can be opened/closed by parent component
 */

import React, { useRef } from 'react';
import { CHAICODES_BRANDING } from '../shared/branding.js';

export function TermsModal({ appName = 'Our Application', isOpen = true, onClose = () => {} }) {
  const contentRef = useRef(null);

  // Don't render if not open
  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    background: 'rgba(10,4,6,0.82)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
  };

  const modalStyle = {
    maxWidth: 600,
    width: '100%',
    background: 'linear-gradient(160deg,#221518,#1a1214)',
    border: '1px solid rgba(200,16,46,0.35)',
    borderRadius: 4,
    padding: '36px 32px 28px',
    boxShadow: '0 16px 60px rgba(0,0,0,0.7)',
    position: 'relative',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const closeButtonStyle = {
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
  };

  const headerStyle = {
    marginBottom: 22,
  };

  const titleStyle = {
    fontFamily: "'Playfair Display',serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#C8102E',
    letterSpacing: '0.04em',
  };

  const dividerStyle = {
    width: 80,
    height: 1,
    background: 'linear-gradient(90deg,transparent,#C8102E,transparent)',
    margin: '12px 0 0',
  };

  const contentWrapperStyle = {
    flex: 1,
    overflowY: 'auto',
    paddingRight: '12px',
    marginBottom: '20px',
  };

  const sectionTitleStyle = {
    color: '#C8102E',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 700,
  };

  const textStyle = {
    marginBottom: 12,
    fontFamily: "'Lora',serif",
    fontSize: 13,
    lineHeight: 1.8,
    color: '#e2d8d4',
  };

  const highlightStyle = {
    color: '#91A3B0',
    fontWeight: 600,
  };

  const closeModalStyle = {
    display: 'block',
    width: '100%',
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
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          style={closeButtonStyle}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div style={headerStyle}>
          <div style={titleStyle}>Terms & Conditions</div>
          <div style={dividerStyle} />
        </div>

        {/* Content */}
        <div ref={contentRef} style={contentWrapperStyle}>
          <div style={textStyle}>
            By using {appName}, you agree to these terms. Please read carefully.
          </div>

          {/* 1. Account Access */}
          <h3 style={sectionTitleStyle}>1. Account and Access</h3>
          <div style={textStyle}>
            Access codes are <span style={highlightStyle}>non-transferable and personal</span>. 
            Sharing your access code is prohibited.
          </div>

          {/* 2. Concurrent Sessions */}
          <h3 style={sectionTitleStyle}>2. Concurrent Sessions</h3>
          <div style={textStyle}>
            <span style={highlightStyle}>Maximum 2 concurrent sessions per access code.</span> Attempting to log in from 
            a third device will result in an error.
          </div>

          {/* 3. Subscriptions */}
          <h3 style={sectionTitleStyle}>3. Subscriptions</h3>
          <div style={textStyle}>
            Subscriptions renew automatically. <span style={highlightStyle}>Cancel anytime</span> through your account settings 
            or by contacting {CHAICODES_BRANDING.supportEmail}.
          </div>

          {/* 4. Refund Policy */}
          <h3 style={sectionTitleStyle}>4. Refund Policy</h3>
          
          <h4 style={{ ...sectionTitleStyle, fontSize: 12, marginTop: 12 }}>Subscriptions</h4>
          <div style={textStyle}>
            <strong>24-Hour Grace Period:</strong> If you cancel within 24 hours of purchase and have not used the service, 
            you are eligible for a full refund. This applies to monthly and annual subscriptions.
          </div>
          <div style={textStyle}>
            <strong>After 24 Hours:</strong> <span style={highlightStyle}>No refunds</span> are issued for subscription fees 
            after the grace period expires or if the service has been used.
          </div>

          <h4 style={{ ...sectionTitleStyle, fontSize: 12, marginTop: 12 }}>Tokens</h4>
          <div style={textStyle}>
            <strong>Refundable:</strong> Tokens purchased due to <span style={highlightStyle}>accidental duplicate charges 
            or documented system errors</span>.
          </div>
          <div style={textStyle}>
            <strong>Non-Refundable:</strong> Tokens that have been used, or unused tokens purchased intentionally.
          </div>

          {/* 5. User Conduct */}
          <h3 style={sectionTitleStyle}>5. User Conduct</h3>
          <div style={textStyle}>
            You agree not to use {appName} for unlawful purposes, harassment, unauthorized access, or sharing credentials.
          </div>

          {/* 6. Limitation of Liability */}
          <h3 style={sectionTitleStyle}>6. Limitation of Liability</h3>
          <div style={textStyle}>
            {appName} is provided "as-is." ChAI Codes is not liable for indirect, incidental, or consequential damages.
          </div>

          {/* 7. Contact */}
          <h3 style={sectionTitleStyle}>7. Questions?</h3>
          <div style={{ ...textStyle, textAlign: 'center', fontWeight: 600, marginBottom: 0 }}>
            📧 {CHAICODES_BRANDING.supportEmail}
          </div>
        </div>

        {/* Close Button */}
        <button style={closeModalStyle} onClick={onClose}>
          I Understand
        </button>
      </div>
    </div>
  );
}

export default TermsModal;
