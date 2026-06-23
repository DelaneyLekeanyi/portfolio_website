// Interactive Logic for Delaney LekeAnyi Portfolio & Sports Betting Dashboard

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================
     1. NAVIGATION & SPA ROUTING STATE
     ========================================== */
  const portfolioView = document.getElementById('portfolio-view');
  const dashboardView = document.getElementById('dashboard-view');
  const toggleDashboardBtn = document.getElementById('toggle-dashboard-btn');
  const openBettingConceptBtn = document.getElementById('open-betting-concept-btn');
  const exitDashboardBtn = document.getElementById('exit-dashboard-btn');
  
  // Mobile Nav Elements
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.querySelectorAll('.nav-link');
  const logoBtn = document.getElementById('nav-logo');

  // Router functions
  function showDashboard() {
    portfolioView.classList.remove('active');
    dashboardView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Entered Sports Betting Hub Concept', 'info');
    startSessionTimer();
  }

  function showPortfolio() {
    dashboardView.classList.remove('active');
    portfolioView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Event Listeners for SPA Toggle
  toggleDashboardBtn.addEventListener('click', showDashboard);
  openBettingConceptBtn.addEventListener('click', showDashboard);
  exitDashboardBtn.addEventListener('click', showPortfolio);

  logoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPortfolio();
  });

  // Mobile Menu Toggling
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    if (navMenu.classList.contains('open')) {
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });

  // Close mobile menu on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Highlight Active
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      navMenu.classList.remove('open');
      menuIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  // Portfolio Scroll Active Section Highlight
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    if (!portfolioView.classList.contains('active')) return;
    
    let current = '';
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
          link.classList.add('active');
        }
      });
    }
  });

  /* ==========================================
     2. PORTFOLIO FILTERS & MODALS
     ========================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active button class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = card.classList.contains('featured') && window.innerWidth > 1024 ? 'grid' : 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Case Study Contents Database
  const caseStudiesData = {
    echoroots: {
      title: 'EchoRootsCam',
      subtitle: 'Indigenous Language Learning Platform',
      role: 'UI/UX Design, System Architecture, Database Design, Frontend Development',
      timeline: '4 Months (2024)',
      tools: 'Figma, Next.js, Node.js, MongoDB, Lucidchart',
      sections: [
        {
          title: 'Problem Statement',
          content: 'Cameroon is linguistically diverse with over 250 indigenous languages. However, globalization and urbanization have left many of these languages critically endangered. Younger generations lack interactive, high-fidelity digital platforms to learn and practice their mother tongues in a modern way.'
        },
        {
          title: 'User Research & Personas',
          content: 'We surveyed 150 young Cameroonians in cities like Buea, Douala, and Yaounde. 88% expressed a strong desire to learn their native languages, but cited lack of structured materials (92%) and boring, static text resources (85%) as main barriers. We established two key personas to guide our UX direction:',
          html: `
            <div class="personas-grid">
              <div class="persona-box">
                <div class="persona-avatar-box"><i data-lucide="user"></i></div>
                <div class="persona-details">
                  <h4>Amadou (23, University Student)</h4>
                  <span>Goal: Learn Fulfulde to speak with elderly relatives.</span>
                  <p>"I want micro-lessons that I can do on my commute. Gamification keeps me motivated."</p>
                </div>
              </div>
              <div class="persona-box">
                <div class="persona-avatar-box"><i data-lucide="user"></i></div>
                <div class="persona-details">
                  <h4>Beatrice (31, Working Parent)</h4>
                  <span>Goal: Pass on the Ewondo language to her kids.</span>
                  <p>"I need accurate pronunciation guides and clean voice recording features to ensure my kids speak correctly."</p>
                </div>
              </div>
            </div>
          `
        },
        {
          title: 'User Journey Map',
          content: 'We mapped the user onboarding through to daily streak maintenance to minimize friction points.',
          html: `
            <div class="journey-map-container">
              <table class="journey-table">
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>Action</th>
                    <th>User Emotion</th>
                    <th>Touchpoint Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1. Onboarding</td>
                    <td>Select dialect & set daily goals</td>
                    <td>Curious / Hopeful</td>
                    <td>Simple progress selectors & clear benefits</td>
                  </tr>
                  <tr>
                    <td>2. Learning</td>
                    <td>Take audio lessons & quick quizzes</td>
                    <td>Focused / Challenged</td>
                    <td>Provide immediate micro-rewards and instant corrections</td>
                  </tr>
                  <tr>
                    <td>3. Reflection</td>
                    <td>Check pronunciation score</td>
                    <td>Satisfied / Motivated</td>
                    <td>AI-assisted phonetics visualizer with helpful tips</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        },
        {
          title: 'Design Process & Wireframes',
          content: 'Using Figma, we crafted low-fidelity paper wireframes, advancing to high-fidelity grid layouts. Colors were inspired by national Cameroonian colors but toned into professional slate gradients for readability. Accent indicators for letters were redesigned to be touch-friendly on mobile screens.'
        },
        {
          title: 'Challenges & Solutions',
          content: '<strong>Challenge 1:</strong> Cameroonian languages use special phonetic letters not in the standard Latin alphabet.<br><em>Solution:</em> Crafted custom web-font bindings and custom on-screen keyboards for phonetic inputs.<br><br><strong>Challenge 2:</strong> Low-bandwidth internet in remote regions.<br><em>Solution:</em> Optimized audio clips into highly-compressed WebM format and set up local browser cache caching.'
        },
        {
          title: 'Lessons Learned',
          content: 'Culture-centric software requires active co-design. Working directly with village elders and language teachers helped us avoid linguistic errors and construct high-fidelity learning pathways.'
        }
      ]
    },
    newsfeed: {
      title: 'News Feed Application',
      subtitle: 'Minimal News Aggregator Mobile App',
      role: 'UI/UX Designer, Mobile Developer',
      timeline: '2 Months (2023)',
      tools: 'Flutter, Figma, NewsAPI',
      sections: [
        {
          title: 'Problem Statement',
          content: 'Modern news applications suffer from ads, visual clutter, and sensationalized design patterns. Users want a premium, quiet reading environment that loads instantly, filters sources dynamically, and lets them digest headlines clean.'
        },
        {
          title: 'Design Philosophy',
          content: 'We prioritized typography. Large, readable sans-serif headers, high contrast margins, and deep slate background layouts. Smooth micro-gestures were added so users can swipe stories to save or hide them instantly.'
        },
        {
          title: 'Implementation & Testing',
          content: 'The mobile interface was built using Flutter to ensure smooth, responsive 60fps card sweeps on both iOS and Android platforms. NewsAPI was integrated on the backend with caching rules.'
        }
      ]
    },
    foodorder: {
      title: 'Food Ordering Application',
      subtitle: 'Streamlined Local Food Delivery UI',
      role: 'UI/UX Designer, Mobile Developer',
      timeline: '3 Months (2025)',
      tools: 'Flutter, Figma, Google Maps API',
      sections: [
        {
          title: 'Problem Statement',
          content: 'Most food delivery apps have high checkout dropoff rates because of nested payment prompts, hard-to-read listings, and static delivery tracking.'
        },
        {
          title: 'Key Design Interventions',
          content: '1. **Three-Click Order Checkout:** Presaved wallet and address items are loaded by default.<br>2. **Real-time Map Integration:** Replaced static texts with a smooth, stylized interactive map route display.<br>3. **Vibrant Imagery:** High contrast cards showcasing large dishes to drive engagement.'
        }
      ]
    },
    portfolio: {
      title: 'Portfolio Website',
      subtitle: 'High Performance Professional Showcase',
      role: 'Designer, Full-Stack Developer',
      timeline: 'Ongoing (2026)',
      tools: 'HTML, CSS, JavaScript, Lucide CDN',
      sections: [
        {
          title: 'Goals',
          content: 'Build a premium developer portfolio that proves both engineering capability and UI/UX expertise. Avoid heavy framework templates that slow down initial loads, opting instead for clean single-page architecture, responsive grid CSS structures, and beautiful interactive demo elements (the Sports Betting Concept).'
        }
      ]
    }
  };

  const caseStudyModal = document.getElementById('case-study-modal');
  const closeCaseStudyBtn = document.getElementById('close-case-study-btn');
  const caseStudyContentArea = document.getElementById('case-study-content-area');
  const openCaseStudyBtns = document.querySelectorAll('.open-case-study');

  function openModal(projectId) {
    const data = caseStudiesData[projectId];
    if (!data) return;

    let sectionsHtml = '';
    data.sections.forEach(sec => {
      sectionsHtml += `
        <div class="cs-section">
          <h3>${sec.title}</h3>
          <p>${sec.content}</p>
          ${sec.html || ''}
        </div>
      `;
    });

    caseStudyContentArea.innerHTML = `
      <div class="case-study-title-group">
        <h2>${data.title}</h2>
        <span class="case-study-subtitle">${data.subtitle}</span>
      </div>
      <div class="case-study-meta-grid">
        <div class="meta-block">
          <h4>My Role</h4>
          <p>${data.role}</p>
        </div>
        <div class="meta-block">
          <h4>Timeline</h4>
          <p>${data.timeline}</p>
        </div>
        <div class="meta-block">
          <h4>Tools</h4>
          <p>${data.tools}</p>
        </div>
      </div>
      ${sectionsHtml}
    `;

    caseStudyModal.classList.add('open');
    lucide.createIcons();
  }

  function closeModal() {
    caseStudyModal.classList.remove('open');
  }

  openCaseStudyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const proj = btn.getAttribute('data-project');
      openModal(proj);
    });
  });

  closeCaseStudyBtn.addEventListener('click', closeModal);
  caseStudyModal.addEventListener('click', (e) => {
    if (e.target === caseStudyModal) closeModal();
  });

  // Contact Form Submission
  const contactForm = document.getElementById('portfolio-contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    console.log('Form Submit:', { name, email, message });
    showToast(`Thanks for writing, ${name}! Delaney will get back to you soon.`, 'success');
    contactForm.reset();
  });

  // Mock Resume Downloads
  const downloadCVHero = document.getElementById('download-cv-hero');
  const downloadResumeContact = document.getElementById('download-resume-contact');

  function triggerResumeDownload(e) {
    e.preventDefault();
    showToast('Downloading Delaney_LekeAnyi_Resume.pdf (Demo)...', 'success');
  }

  downloadCVHero.addEventListener('click', triggerResumeDownload);
  downloadResumeContact.addEventListener('click', triggerResumeDownload);

  /* ==========================================
     3. TOAST SYSTEM
     ========================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'error') iconName = 'x-circle';

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="toast-icon"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      toast.style.animation = 'slide-out 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  }

  /* ==========================================
     4. SPORTS BETTING DASHBOARD CONCEPTS
     ========================================== */
  
  // State variables
  let walletBalance = 500.00;
  let dailyDepositLimit = 100.00;
  let dailyAmountSpent = 0.00;
  
  // Dashboard Sub-navigation tabs
  const dbMenuBtns = document.querySelectorAll('.db-menu-btn');
  const dbTabPanels = document.querySelectorAll('.db-tab-panel');

  dbMenuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dbMenuBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      dbTabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.getAttribute('id') === `tab-${targetTab}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  // Wallet display synchronizer
  function updateWalletDisplay() {
    const formattedVal = `$${walletBalance.toFixed(2)}`;
    document.getElementById('db-header-balance').innerText = formattedVal;
    document.getElementById('wallet-card-balance-val').innerText = formattedVal;
    
    // Update Limit gauge labels
    const spentText = `$${dailyAmountSpent.toFixed(2)}`;
    document.getElementById('spent-bar-text').innerText = spentText;
    
    const limitLabel = dailyDepositLimit > 0 ? `$${dailyDepositLimit.toFixed(2)}` : 'None';
    document.getElementById('limit-bar-text').innerText = `Limit: ${limitLabel}`;
    document.getElementById('active-limit-value').innerText = dailyDepositLimit > 0 ? `$${dailyDepositLimit.toFixed(2)} Daily` : 'None';
    document.getElementById('safety-current-limit-label').innerText = dailyDepositLimit > 0 ? `$${dailyDepositLimit.toFixed(2)} (Daily)` : 'None';

    // Update safety progress bar width
    const progressBar = document.getElementById('spending-progress-bar');
    if (dailyDepositLimit > 0) {
      const pct = Math.min((dailyAmountSpent / dailyDepositLimit) * 100, 100);
      progressBar.style.width = `${pct}%`;
      progressBar.className = 'budget-progress-bar';
      if (pct < 50) progressBar.classList.add('green');
      else if (pct < 85) progressBar.classList.add('yellow');
      else progressBar.classList.add('red');
    } else {
      progressBar.style.width = '0%';
    }
  }

  // Live Matches Simulation Data
  let liveMatches = [
    { id: 1, sport: 'soccer', homeTeam: 'Chelsea', awayTeam: 'Real Madrid', scoreHome: 1, scoreAway: 1, time: '74\'', odds: { home: 2.10, draw: 3.10, away: 2.80 } },
    { id: 2, sport: 'basketball', homeTeam: 'LA Lakers', awayTeam: 'Golden State', scoreHome: 98, scoreAway: 101, time: 'Q4 2:15', odds: { home: 2.45, draw: 12.00, away: 1.55 } },
    { id: 3, sport: 'tennis', homeTeam: 'C. Alcaraz', awayTeam: 'N. Djokovic', scoreHome: 2, scoreAway: 1, time: 'Set 4 - G: 4-3', odds: { home: 1.40, draw: 0, away: 2.65 } }
  ];

  const liveMatchesContainer = document.getElementById('live-matches-feed');

  // Render Live Match Feed
  function renderLiveMatches() {
    if (!liveMatchesContainer) return;
    
    // Keep reference to currently selected button ID if any
    const activeSelectedOdds = Array.from(document.querySelectorAll('.odd-btn.selected')).map(btn => ({
      matchId: btn.getAttribute('data-match-id'),
      outcome: btn.getAttribute('data-outcome')
    }));

    liveMatchesContainer.innerHTML = '';
    
    liveMatches.forEach(match => {
      const isSelectedHome = activeSelectedOdds.some(o => o.matchId == match.id && o.outcome === 'home') ? 'selected' : '';
      const isSelectedDraw = activeSelectedOdds.some(o => o.matchId == match.id && o.outcome === 'draw') ? 'selected' : '';
      const isSelectedAway = activeSelectedOdds.some(o => o.matchId == match.id && o.outcome === 'away') ? 'selected' : '';

      const isTennis = match.sport === 'tennis';

      const matchCard = document.createElement('div');
      matchCard.className = 'match-row-card glass-card';
      matchCard.innerHTML = `
        <div class="match-details-side">
          <div class="match-info-meta">
            <span class="pulse-dot"></span>
            <span class="match-live-period">LIVE • ${match.time}</span>
            <span style="color: var(--text-secondary); text-transform: uppercase;">${match.sport}</span>
          </div>
          <div class="match-teams-score">
            <div class="team-score-row">
              <span class="team-name">${match.homeTeam}</span>
              <span class="team-score">${match.scoreHome}</span>
            </div>
            <div class="team-score-row">
              <span class="team-name">${match.awayTeam}</span>
              <span class="team-score">${match.scoreAway}</span>
            </div>
          </div>
        </div>
        
        <div class="odds-bet-panel">
          <button class="odd-btn ${isSelectedHome}" data-match-id="${match.id}" data-outcome="home" data-team="${match.homeTeam}" data-odds="${match.odds.home.toFixed(2)}">
            <span class="odd-label">1</span>
            <span class="odd-value">${match.odds.home.toFixed(2)}</span>
          </button>
          
          ${!isTennis ? `
          <button class="odd-btn ${isSelectedDraw}" data-match-id="${match.id}" data-outcome="draw" data-team="Draw" data-odds="${match.odds.draw.toFixed(2)}">
            <span class="odd-label">X</span>
            <span class="odd-value">${match.odds.draw.toFixed(2)}</span>
          </button>
          ` : ''}
          
          <button class="odd-btn ${isSelectedAway}" data-match-id="${match.id}" data-outcome="away" data-team="${match.awayTeam}" data-odds="${match.odds.away.toFixed(2)}">
            <span class="odd-label">2</span>
            <span class="odd-value">${match.odds.away.toFixed(2)}</span>
          </button>
        </div>
      `;
      
      liveMatchesContainer.appendChild(matchCard);
    });

    // Reattach odds listeners
    attachOddsClickListeners();
  }

  // Odds Select click handlers
  let activeBetSlipItem = null;
  const betSlipItemsContainer = document.getElementById('betslip-items-container');
  const betSlipSummaryBox = document.getElementById('betslip-summary-box');
  const slipCombinedOdds = document.getElementById('slip-combined-odds');
  const slipEstPayout = document.getElementById('slip-est-payout');
  const stakeInput = document.getElementById('slip-stake-input');
  const placeBetBtn = document.getElementById('place-bet-btn');
  const clearSlipBtn = document.getElementById('clear-slip-btn');
  const limitWarningBox = document.getElementById('slip-limit-warning');

  function attachOddsClickListeners() {
    const oddsButtons = document.querySelectorAll('.odd-btn');
    oddsButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const matchId = parseInt(btn.getAttribute('data-match-id'));
        const outcome = btn.getAttribute('data-outcome');
        const teamName = btn.getAttribute('data-team');
        const odds = parseFloat(btn.getAttribute('data-odds'));
        
        // Remove selections from other buttons in the same row
        const siblingButtons = btn.parentElement.querySelectorAll('.odd-btn');
        siblingButtons.forEach(sb => sb.classList.remove('selected'));
        
        // Toggle selected state
        btn.classList.add('selected');
        
        const match = liveMatches.find(m => m.id === matchId);
        
        // Construct Bet slip item
        activeBetSlipItem = {
          matchId,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          outcome,
          selection: teamName,
          odds
        };
        
        renderBetSlip();
      });
    });
  }

  function renderBetSlip() {
    if (!activeBetSlipItem) {
      betSlipItemsContainer.innerHTML = `
        <div class="betslip-empty-state">
          <i data-lucide="receipt"></i>
          <p>Select odds from the live panel to construct your bet.</p>
        </div>
      `;
      betSlipSummaryBox.style.display = 'none';
      limitWarningBox.style.display = 'none';
      lucide.createIcons();
      return;
    }

    betSlipItemsContainer.innerHTML = `
      <div class="slip-item-card">
        <button class="slip-remove-btn" id="remove-slip-item-btn"><i data-lucide="x"></i></button>
        <div class="slip-item-match">${activeBetSlipItem.homeTeam} vs ${activeBetSlipItem.awayTeam}</div>
        <div class="slip-item-market">Market: Full Time Outcome (${activeBetSlipItem.outcome.toUpperCase()})</div>
        <div class="slip-item-footer">
          <span>Selection: ${activeBetSlipItem.selection}</span>
          <span class="text-gradient">${activeBetSlipItem.odds.toFixed(2)}</span>
        </div>
      </div>
    `;

    betSlipSummaryBox.style.display = 'flex';
    slipCombinedOdds.innerText = activeBetSlipItem.odds.toFixed(2);
    
    // Add remove event listener
    document.getElementById('remove-slip-item-btn').addEventListener('click', clearSlip);
    
    calculateBetPayout();
    lucide.createIcons();
  }

  function calculateBetPayout() {
    if (!activeBetSlipItem) return;
    const stake = parseFloat(stakeInput.value) || 0;
    const payout = stake * activeBetSlipItem.odds;
    slipEstPayout.innerText = `$${payout.toFixed(2)}`;

    // Verify against daily limits
    if (dailyDepositLimit > 0 && dailyAmountSpent + stake > dailyDepositLimit) {
      limitWarningBox.style.display = 'block';
      placeBetBtn.disabled = true;
    } else {
      limitWarningBox.style.display = 'none';
      placeBetBtn.disabled = false;
    }
  }

  stakeInput.addEventListener('input', calculateBetPayout);

  function clearSlip() {
    activeBetSlipItem = null;
    // Clear styles
    document.querySelectorAll('.odd-btn').forEach(btn => btn.classList.remove('selected'));
    renderBetSlip();
  }

  clearSlipBtn.addEventListener('click', clearSlip);

  // Active bets container updates
  const activeBetsContainer = document.getElementById('active-bets-container');
  const statTotalPlaced = document.getElementById('stat-total-placed');
  const statNetProfit = document.getElementById('stat-net-profit');

  let activeBetsList = [
    { id: 101, details: 'Man Utd vs Liverpool', market: 'Full Time Winner (1) • Odds: 2.10', stake: 20.00, payout: 42.00, progress: 72, timer: 12 }
  ];
  let totalBetsCount = 24;
  let accumulatedNetProfit = 142.80;

  function renderActiveBets() {
    activeBetsContainer.innerHTML = '';
    
    if (activeBetsList.length === 0) {
      activeBetsContainer.innerHTML = `
        <div class="betslip-empty-state">
          <p>No active tracking bets. Place one from the Live Betting screen.</p>
        </div>
      `;
      return;
    }

    activeBetsList.forEach(bet => {
      const item = document.createElement('div');
      item.className = 'bet-item active-bet';
      item.innerHTML = `
        <div class="bet-logo"><i data-lucide="activity"></i></div>
        <div class="bet-details">
          <h4>${bet.details}</h4>
          <p>${bet.market}</p>
          <div class="bet-progress-bar-bg"><div class="bet-progress-bar" style="width: ${bet.progress}%;"></div></div>
        </div>
        <div class="bet-financials">
          <span class="stake-label">Stake: $${bet.stake.toFixed(2)}</span>
          <span class="payout-est text-green">To Win: $${bet.payout.toFixed(2)}</span>
        </div>
      `;
      activeBetsContainer.appendChild(item);
    });
    lucide.createIcons();
  }

  // Place Bet Click Action
  placeBetBtn.addEventListener('click', () => {
    if (!activeBetSlipItem) return;
    const stakeVal = parseFloat(stakeInput.value) || 0;
    
    if (stakeVal <= 0) {
      showToast('Please enter a valid stake amount', 'warning');
      return;
    }
    
    if (stakeVal > walletBalance) {
      showToast('Insufficient wallet balance!', 'error');
      return;
    }

    // Limit check double check
    if (dailyDepositLimit > 0 && dailyAmountSpent + stakeVal > dailyDepositLimit) {
      showToast('Responsible Play warning: Exceeds your daily budget limit!', 'error');
      return;
    }

    // Deduct
    walletBalance -= stakeVal;
    dailyAmountSpent += stakeVal;
    
    // Add transaction log
    addLedgerRow('Bet Stake', `Placed: ${activeBetSlipItem.selection} (${activeBetSlipItem.homeTeam} vs ${activeBetSlipItem.awayTeam})`, -stakeVal);

    // Add active bet
    const newBet = {
      id: Date.now(),
      details: `${activeBetSlipItem.homeTeam} vs ${activeBetSlipItem.awayTeam}`,
      market: `Winner: ${activeBetSlipItem.selection} • Odds: ${activeBetSlipItem.odds.toFixed(2)}`,
      stake: stakeVal,
      payout: stakeVal * activeBetSlipItem.odds,
      progress: 5,
      timer: 10 // settled after 10 ticks
    };

    activeBetsList.push(newBet);
    totalBetsCount += 1;
    statTotalPlaced.innerText = totalBetsCount;

    // Toast & Sync
    showToast(`Bet placed on ${activeBetSlipItem.selection}!`, 'success');
    clearSlip();
    updateWalletDisplay();
    renderActiveBets();

    // Start countdown simulation for this bet
    simulateBetResolution(newBet.id);
  });

  // Simulated Bet Resolution
  function simulateBetResolution(betId) {
    const betInterval = setInterval(() => {
      const bet = activeBetsList.find(b => b.id === betId);
      if (!bet) {
        clearInterval(betInterval);
        return;
      }

      bet.timer -= 1;
      bet.progress = Math.min(100 - (bet.timer * 10), 100);
      
      // Update DOM progress bars directly if visible
      renderActiveBets();

      if (bet.timer <= 0) {
        clearInterval(betInterval);
        
        // Random outcome (60% win rate for interactive demos)
        const isWin = Math.random() < 0.6;
        
        if (isWin) {
          walletBalance += bet.payout;
          accumulatedNetProfit += (bet.payout - bet.stake);
          addLedgerRow('Settlement', `Win: ${bet.details}`, bet.payout);
          showToast(`WINNER! Live Bet Resolved: ${bet.details}. Won $${bet.payout.toFixed(2)}!`, 'success');
        } else {
          accumulatedNetProfit -= bet.stake;
          addLedgerRow('Loss Settlement', `Lost: ${bet.details}`, 0.00);
          showToast(`LOST! Live Bet Resolved: ${bet.details}. Lost stake of $${bet.stake.toFixed(2)}.`, 'error');
        }

        // Filter settled bet out of active
        activeBetsList = activeBetsList.filter(b => b.id !== betId);
        
        // Sync values
        const formatProfit = accumulatedNetProfit >= 0 ? `+$${accumulatedNetProfit.toFixed(2)}` : `-$${Math.abs(accumulatedNetProfit).toFixed(2)}`;
        statNetProfit.innerText = formatProfit;
        statNetProfit.className = accumulatedNetProfit >= 0 ? 'metric-value text-green' : 'metric-value text-red';
        
        updateWalletDisplay();
        renderActiveBets();
      }
    }, 1000);
  }

  // Match scores simulator ticks
  setInterval(() => {
    if (!dashboardView.classList.contains('active')) return;

    liveMatches.forEach(match => {
      // Random score updates
      if (Math.random() < 0.15) {
        if (match.sport === 'soccer') {
          if (Math.random() < 0.5) match.scoreHome += 1;
          else match.scoreAway += 1;
        } else if (match.sport === 'basketball') {
          const pt = Math.random() < 0.5 ? 2 : 3;
          if (Math.random() < 0.5) match.scoreHome += pt;
          else match.scoreAway += pt;
        } else if (match.sport === 'tennis') {
          // just increment game scores e.g., 4-3 -> 4-4
          const parts = match.time.split('G: ')[1].split('-');
          let gh = parseInt(parts[0]);
          let ga = parseInt(parts[1]);
          if (Math.random() < 0.5) gh += 1;
          else ga += 1;
          
          if (gh >= 6 || ga >= 6) {
            gh = 0; ga = 0;
            match.scoreHome = Math.random() < 0.5 ? match.scoreHome + 1 : match.scoreHome;
          }
          match.time = `Set 4 - G: ${gh}-${ga}`;
        }

        // Fluctuate Odds slightly
        match.odds.home = Math.max(1.10, match.odds.home + (Math.random() - 0.5) * 0.2);
        if (match.odds.draw) match.odds.draw = Math.max(1.50, match.odds.draw + (Math.random() - 0.5) * 0.3);
        match.odds.away = Math.max(1.10, match.odds.away + (Math.random() - 0.5) * 0.2);
      }
    });

    renderLiveMatches();
  }, 3000);

  // Fund Management tab switcher
  const btnToggleDeposit = document.getElementById('btn-toggle-deposit');
  const btnToggleWithdraw = document.getElementById('btn-toggle-withdraw');
  const walletDepositForm = document.getElementById('wallet-deposit-form');
  const walletWithdrawForm = document.getElementById('wallet-withdraw-form');

  btnToggleDeposit.addEventListener('click', () => {
    btnToggleDeposit.classList.add('active');
    btnToggleWithdraw.classList.remove('active');
    walletDepositForm.style.display = 'block';
    walletWithdrawForm.style.display = 'none';
  });

  btnToggleWithdraw.addEventListener('click', () => {
    btnToggleWithdraw.classList.add('active');
    btnToggleDeposit.classList.remove('active');
    walletWithdrawForm.style.display = 'block';
    walletDepositForm.style.display = 'none';
  });

  // Presets deposit values click listener
  const presetBtns = document.querySelectorAll('.preset-btn');
  const depositInput = document.getElementById('deposit-amount-input');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      depositInput.value = btn.getAttribute('data-val');
    });
  });

  // Transaction History ledger helper
  const transactionLedgerTbody = document.getElementById('transaction-ledger-tbody');

  function addLedgerRow(type, details, amount) {
    const today = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const row = document.createElement('tr');
    
    let tagClass = 'stake';
    if (type === 'Deposit') tagClass = 'deposit';
    else if (type === 'Settlement') tagClass = 'settlement';
    else if (type === 'Withdrawal' || type === 'Loss Settlement') tagClass = 'withdrawal';

    const amtStr = amount >= 0 ? `+$${amount.toFixed(2)}` : `-$${Math.abs(amount).toFixed(2)}`;
    const amtColorClass = amount > 0 ? 'text-green' : (amount === 0 ? 'text-secondary' : 'text-primary');

    row.innerHTML = `
      <td>${today}</td>
      <td><span class="ledger-tag ${tagClass}">${type}</span></td>
      <td>${details}</td>
      <td class="${amtColorClass}">${amtStr}</td>
    `;
    
    // Insert at top of ledger
    transactionLedgerTbody.insertBefore(row, transactionLedgerTbody.firstChild);
  }

  // Handle deposit form submission
  walletDepositForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amt = parseFloat(depositInput.value) || 0;
    if (amt <= 0) return;

    walletBalance += amt;
    addLedgerRow('Deposit', 'Credit Account', amt);
    showToast(`Deposited $${amt.toFixed(2)} successfully.`, 'success');
    walletDepositForm.reset();
    updateWalletDisplay();
  });

  // Handle withdrawal form submission
  const withdrawInput = document.getElementById('withdraw-amount-input');
  walletWithdrawForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amt = parseFloat(withdrawInput.value) || 0;
    if (amt <= 0) return;

    if (amt > walletBalance) {
      showToast('Cannot withdraw more than your current wallet balance!', 'error');
      return;
    }

    walletBalance -= amt;
    addLedgerRow('Withdrawal', 'Payout request', -amt);
    showToast(`Withdrawal of $${amt.toFixed(2)} requested successfully.`, 'success');
    walletWithdrawForm.reset();
    updateWalletDisplay();
  });

  /* ==========================================
     5. RESPONSIBLE PLAY SYSTEM
     ========================================== */
  
  // Set Deposit limits
  const limitForm = document.getElementById('responsible-limit-form');
  const limitVal = document.getElementById('limit-value-input');
  const removeLimitsBtn = document.getElementById('remove-limits-btn');

  limitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = parseFloat(limitVal.value) || 0;
    if (val <= 10) {
      showToast('Minimum limit is $10.00', 'warning');
      return;
    }
    dailyDepositLimit = val;
    showToast(`Daily budget limit updated to $${val.toFixed(2)}`, 'success');
    updateWalletDisplay();
    calculateBetPayout(); // refresh slip validation
  });

  removeLimitsBtn.addEventListener('click', () => {
    dailyDepositLimit = 0;
    showToast('Daily spending limits removed.', 'info');
    updateWalletDisplay();
    calculateBetPayout();
  });

  // Session timer variables
  let sessionSeconds = 0;
  let sessionTimerInterval = null;
  let sessionAlertThresholdMins = 5; // Alert after 5 mins (demo default)
  let sessionAlertTriggered = false;

  const sessionTimerValue = document.getElementById('session-timer-value');
  const sessionTimerLargeValue = document.getElementById('session-timer-large-value');
  const sessionAlertLimitSelect = document.getElementById('session-alert-limit');
  const setSessionAlertBtn = document.getElementById('set-session-alert-btn');

  function startSessionTimer() {
    if (sessionTimerInterval) return;
    
    sessionTimerInterval = setInterval(() => {
      sessionSeconds += 1;
      
      const mins = Math.floor(sessionSeconds / 60);
      const secs = sessionSeconds % 60;
      const hours = Math.floor(mins / 60);
      
      const formattedMins = String(mins % 60).padStart(2, '0');
      const formattedSecs = String(secs).padStart(2, '0');
      const formattedHours = String(hours).padStart(2, '0');
      
      sessionTimerValue.innerText = `${formattedMins}:${formattedSecs}`;
      sessionTimerLargeValue.innerText = `${formattedHours}:${formattedMins}:${formattedSecs}`;

      // Responsible limits check: warn user on reaching thresh
      if (mins >= sessionAlertThresholdMins && !sessionAlertTriggered) {
        sessionAlertTriggered = true;
        showToast(`Responsible Gaming warning: You have been playing for ${sessionAlertThresholdMins} minutes. Take a break!`, 'warning');
        alert(`Responsible Play Notice: You have been active in the sports betting session for ${sessionAlertThresholdMins} minutes. Please consider taking a rest.`);
      }
    }, 1000);
  }

  setSessionAlertBtn.addEventListener('click', () => {
    sessionAlertThresholdMins = parseInt(sessionAlertLimitSelect.value);
    sessionAlertTriggered = false;
    showToast(`Session warning target updated to ${sessionAlertThresholdMins} minutes.`, 'success');
  });

  // Self Exclusion Mechanism
  const exclusionPeriodSelect = document.getElementById('exclusion-period-select');
  const triggerExclusionBtn = document.getElementById('trigger-exclusion-btn');
  const exclusionOverlay = document.getElementById('exclusion-overlay');
  const exclusionTimerDisplay = document.getElementById('exclusion-timer-display');
  const forceExitExclusionBtn = document.getElementById('force-exit-exclusion-btn');

  let exclusionEndTime = null;
  let exclusionCountdownInterval = null;

  triggerExclusionBtn.addEventListener('click', () => {
    const confirmChoice = confirm("Are you sure you want to self-exclude? This locks your access to the betting dashboard for the chosen period.");
    if (!confirmChoice) return;

    const seconds = parseInt(exclusionPeriodSelect.value);
    exclusionEndTime = Date.now() + (seconds * 1000);
    
    // Show Overlay
    exclusionOverlay.style.display = 'flex';
    showToast('Self-exclusion active. Sports betting disabled.', 'warning');
    
    // Reset any active bet building
    clearSlip();

    runExclusionTimer();
  });

  function runExclusionTimer() {
    if (exclusionCountdownInterval) clearInterval(exclusionCountdownInterval);

    exclusionCountdownInterval = setInterval(() => {
      const timeLeft = exclusionEndTime - Date.now();
      
      if (timeLeft <= 0) {
        clearInterval(exclusionCountdownInterval);
        exclusionOverlay.style.display = 'none';
        showToast('Self-exclusion period ended. Access restored.', 'success');
      } else {
        const totalSecs = Math.floor(timeLeft / 1000);
        const hrs = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        
        exclusionTimerDisplay.innerText = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    }, 1000);
  }

  forceExitExclusionBtn.addEventListener('click', () => {
    // Hide overlay view (keeps dashboard inaccessible until timer expires)
    exclusionOverlay.style.display = 'none';
    showPortfolio();
  });

  /* ==========================================
     6. INITIAL LOADS
     ========================================== */
  renderLiveMatches();
  renderActiveBets();
  updateWalletDisplay();

});
