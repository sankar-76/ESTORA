export const injectGlobalStyles = () => {
  if (document.getElementById('estora-styles')) return;

  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(fontLink);

  const styleTag = document.createElement('style');
  styleTag.id = 'estora-styles';
  styleTag.textContent = `
    :root {
      --estora-bg: #F7F5F0;
      --estora-card-bg: #FCFBF9;
      --estora-charcoal: #181817;
      --estora-beige: #EAE5DC;
      --estora-bronze: #9A7B56;
      --estora-bronze-hover: #836746;
      --estora-grey-soft: #76736E;
      --estora-grey-light: #EFECE6;
      --estora-border: #E2DDD3;
      --estora-font-serif: 'Cormorant Garamond', Georgia, serif;
      --estora-font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    html {
      scroll-behavior: smooth;
      background-color: var(--estora-bg);
      color: var(--estora-charcoal);
      font-family: var(--estora-font-sans);
      -webkit-font-smoothing: antialiased;
    }

    body {
      overflow-x: hidden;
      background-color: var(--estora-bg);
    }

    .font-serif { font-family: var(--estora-font-serif); }
    .font-sans { font-family: var(--estora-font-sans); }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: var(--estora-bg);
    }
    ::-webkit-scrollbar-thumb {
      background: #C4BEB4;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--estora-bronze);
    }

    /* Subtle Glass & Overlay effects */
    .glass-header {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    /* Keyframe Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes pulseSlow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    .animate-fade-in {
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-scale-in {
      animation: scaleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Image zoom container */
    .img-hover-zoom {
      overflow: hidden;
    }
    .img-hover-zoom img {
      transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
    }
    .img-hover-zoom:hover img {
      transform: scale(1.06);
    }

    /* Hairline dividers */
    .border-hairline {
      border-color: var(--estora-border);
    }

    .border-hairline-b {
      border-bottom: 1px solid var(--estora-border);
    }

    .border-hairline-t {
      border-top: 1px solid var(--estora-border);
    }

    /* Custom Focus Outline */
    input:focus, select:focus, textarea:focus, button:focus-visible {
      outline: 1px solid var(--estora-bronze);
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(styleTag);
};
