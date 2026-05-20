/**
 * @chaicodes/legal-pages
 * Main package exports
 */

// Branding and configuration
export { 
  CHAICODES_BRANDING, 
  SHARED_STYLES, 
  getBrandingConfig 
} from './shared/branding.js';

// About components
export { AboutPage } from './about/AboutPage.jsx';
export { AboutFooter } from './about/AboutFooter.jsx';

// Terms & Conditions components
export { TermsPage } from './terms/TermsPage.jsx';
export { TermsModal } from './terms/TermsModal.jsx';

// Default exports
export default {
  AboutPage: require('./about/AboutPage.jsx').default,
  AboutFooter: require('./about/AboutFooter.jsx').default,
  TermsPage: require('./terms/TermsPage.jsx').default,
  TermsModal: require('./terms/TermsModal.jsx').default,
};
