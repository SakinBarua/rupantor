/* ============================================================
   রূপান্তর — Playable Game Logic
   Player vs AI card placement game
   ============================================================ */

(function() {
  'use strict';

  // ===== GAME CONSTANTS =====
  const BOARD_COLS = 8;
  const BOARD_ROWS = 6;
  const HAND_SIZE = 5;
  const MAX_TURNS = 12; // per player
  const DIRECTIONS = ['n', 'e', 's', 'w']; // 0=N, 1=E, 2=S, 3=W
  const DIR_VECTORS = {
    n: { dr: -1, dc: 0 },
    e: { dr: 0, dc: 1 },
    s: { dr: 1, dc: 0 },
    w: { dr: 0, dc: -1 }
  };
  const OPPOSITE_DIR = { n: 's', e: 'w', s: 'n', w: 'e' };

  // ===== GAME STATE =====
  let state = null;

  function initState(mode) {
    const allCards = window.RUPANTOR_DATA ? window.RUPANTOR_DATA.CARDS : [];
    const shuffled = allCards.slice().sort(function() { return Math.random() - 0.5; });

    state = {
      mode: mode || 'normal', // 'easy', 'normal', 'hard'
      deck: shuffled,
      board: [], // 2D array BOARD_ROWS x BOARD_COLS, each cell null or {card, owner, direction}
      playerHand: [],
      aiHand: [],
      playerScore: 0,
      aiScore: 0,
      playerMissions: [],
      aiMissions: [],
      completedPlayerMissions: [],
      completedAiMissions: [],
      currentTurn: 'player', // 'player' or 'ai'
      turnNum: 1,
      selectedCardIdx: null,
      gameOver: false,
      log: [],
      placingCard: false,
    };

    // Initialize board
    for (let r = 0; r < BOARD_ROWS; r++) {
      state.board.push(new Array(BOARD_COLS).fill(null));
    }

    // Deal initial hands
    for (let i = 0; i < HAND_SIZE; i++) {
      state.playerHand.push(state.deck.pop());
      state.aiHand.push(state.deck.pop());
    }

    // Deal missions (2 each, simplified)
    const missionTemplates = [
      { id: 'm1', name: 'ত্রিমূর্তি', desc: 'একই ধরনের ৩টি কার্ড সংলগ্নভাবে স্থাপন করো', target: 3, reward: 5, check: checkSameTypeAdjacent },
      { id: 'm2', name: 'শৃঙ্খল', desc: '৪টি কার্ড পরপর সংযুক্ত করে একটি শৃঙ্খল গঠন করো', target: 4, reward: 6, check: checkChain },
      { id: 'm3', name: 'কেন্দ্র', desc: 'টেবিলের কেন্দ্রে একটি কার্ড স্থাপন করো', target: 1, reward: 4, check: checkCenterPlacement },
      { id: 'm4', name: 'বিস্তার', desc: 'মোট ৫টি কার্ড টেবিলে স্থাপন করো', target: 5, reward: 3, check: checkTotalCards },
      { id: 'm5', name: 'বহুবিধ', desc: '৩টি ভিন্ন ধরনের কার্ড স্থাপন করো', target: 3, reward: 4, check: checkDifferentTypes },
      { id: 'm6', name: 'অনুরণন', desc: '২টি অনুরণিত সংযোগ গঠন করো', target: 2, reward: 6, check: checkResonantConnections },
    ];

    // Pick 2 random missions for each
    const shuffledMissions = missionTemplates.slice().sort(function() { return Math.random() - 0.5; });
    state.playerMissions = [shuffledMissions[0], shuffledMissions[1]];
    state.aiMissions = [shuffledMissions[2], shuffledMissions[3]];
  }

  // ===== MISSION CHECKERS =====
  function checkSameTypeAdjacent(board, owner) {
    // Find max cluster of same-type cards belonging to owner
    const visited = [];
    for (let r = 0; r < BOARD_ROWS; r++) visited.push(new Array(BOARD_COLS).fill(false));
    let maxCluster = 0;

    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS; c++) {
        if (visited[r][c]) continue;
        const cell = board[r][c];
        if (!cell || cell.owner !== owner) {
          visited[r][c] = true;
          continue;
        }
        // BFS cluster of same type
        const type = cell.card.type;
        let size = 0;
        const queue = [[r, c]];
        visited[r][c] = true;
        while (queue.length) {
          const [cr, cc] = queue.shift();
          size++;
          for (const d of DIRECTIONS) {
            const v = DIR_VECTORS[d];
            const nr = cr + v.dr, nc = cc + v.dc;
            if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLS) continue;
            if (visited[nr][nc]) continue;
            const ncell = board[nr][nc];
            if (!ncell || ncell.owner !== owner || ncell.card.type !== type) continue;
            visited[nr][nc] = true;
            queue.push([nr, nc]);
          }
        }
        if (size > maxCluster) maxCluster = size;
      }
    }
    return { current: Math.min(maxCluster, 99), target: 3 };
  }

  function checkChain(board, owner) {
    // Find longest chain of connected cards (adjacent cards)
    const visited = [];
    for (let r = 0; r < BOARD_ROWS; r++) visited.push(new Array(BOARD_COLS).fill(false));
    let maxChain = 0;

    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS; c++) {
        if (visited[r][c]) continue;
        const cell = board[r][c];
        if (!cell || cell.owner !== owner) continue;
        // BFS connected component
        let size = 0;
        const queue = [[r, c]];
        visited[r][c] = true;
        while (queue.length) {
          const [cr, cc] = queue.shift();
          size++;
          for (const d of DIRECTIONS) {
            const v = DIR_VECTORS[d];
            const nr = cr + v.dr, nc = cc + v.dc;
            if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLS) continue;
            if (visited[nr][nc]) continue;
            const ncell = board[nr][nc];
            if (!ncell || ncell.owner !== owner) continue;
            visited[nr][nc] = true;
            queue.push([nr, nc]);
          }
        }
        if (size > maxChain) maxChain = size;
      }
    }
    return { current: maxChain, target: 4 };
  }

  function checkCenterPlacement(board, owner) {
    // Center cells: rows 2-3, cols 3-4
    let count = 0;
    for (let r = 2; r <= 3; r++) {
      for (let c = 3; c <= 4; c++) {
        const cell = board[r][c];
        if (cell && cell.owner === owner) count++;
      }
    }
    return { current: count, target: 1 };
  }

  function checkTotalCards(board, owner) {
    let count = 0;
    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS; c++) {
        const cell = board[r][c];
        if (cell && cell.owner === owner) count++;
      }
    }
    return { current: count, target: 5 };
  }

  function checkDifferentTypes(board, owner) {
    const types = new Set();
    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS; c++) {
        const cell = board[r][c];
        if (cell && cell.owner === owner) types.add(cell.card.type);
      }
    }
    return { current: types.size, target: 3 };
  }

  function checkResonantConnections(board, owner) {
    let count = 0;
    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS; c++) {
        const cell = board[r][c];
        if (!cell || cell.owner !== owner) continue;
        // Check east and south neighbors
        for (const d of ['e', 's']) {
          const v = DIR_VECTORS[d];
          const nr = r + v.dr, nc = c + v.dc;
          if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLS) continue;
          const ncell = board[nr][nc];
          if (!ncell) continue;
          // Resonant if directions face each other
          if (cell.direction === d && ncell.direction === OPPOSITE_DIR[d]) {
            count++;
          }
        }
      }
    }
    return { current: count, target: 2 };
  }

  // ===== SCORING =====
  function calculateScore(board, owner) {
    let score = 0;
    const cards = [];
    const connections = [];
    const resonantConnections = [];

    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS; c++) {
        const cell = board[r][c];
        if (cell && cell.owner === owner) {
          cards.push(cell);
          score += 1; // 1 point per card

          // Check east and south neighbors for connections
          for (const d of ['e', 's']) {
            const v = DIR_VECTORS[d];
            const nr = r + v.dr, nc = c + v.dc;
            if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLS) continue;
            const ncell = board[nr][nc];
            if (!ncell) continue;
            // Any adjacent card = connection
            score += 1;
            connections.push({ from: [r, c], to: [nr, nc] });
            // Resonant if directions face each other
            if (cell.direction === d && ncell.direction === OPPOSITE_DIR[d]) {
              score += 1; // bonus point
              resonantConnections.push({ from: [r, c], to: [nr, nc] });
            }
          }
        }
      }
    }
    return { score: score, cards: cards.length, connections: connections, resonant: resonantConnections };
  }

  function updateScores() {
    const p = calculateScore(state.board, 'player');
    const a = calculateScore(state.board, 'ai');
    state.playerScore = p.score;
    state.aiScore = a.score;
    // Add mission rewards
    state.completedPlayerMissions.forEach(function(m) { state.playerScore += m.reward; });
    state.completedAiMissions.forEach(function(m) { state.aiScore += m.reward; });
  }

  function checkMissions(owner) {
    const missions = owner === 'player' ? state.playerMissions : state.aiMissions;
    const completed = owner === 'player' ? state.completedPlayerMissions : state.completedAiMissions;
    const completedIds = new Set(completed.map(function(m) { return m.id; }));

    missions.forEach(function(m) {
      if (completedIds.has(m.id)) return;
      const result = m.check(state.board, owner);
      if (result.current >= result.target) {
        completed.push(m);
        addLog(owner, 'মিশন পূরণ: ' + m.name + ' (+' + m.reward + ' পয়েন্ট)', true);
        if (owner === 'player') {
          showToast('🎯 মিশন পূরণ: ' + m.name + '!', 'success');
        }
      }
    });
  }

  // ===== ACTIONS =====
  function placeCard(row, col, direction) {
    if (state.gameOver || state.currentTurn !== 'player' || state.placingCard) return false;
    if (state.selectedCardIdx === null) return false;
    if (row < 0 || row >= BOARD_ROWS || col < 0 || col >= BOARD_COLS) return false;
    if (state.board[row][col] !== null) return false;

    state.placingCard = true;
    const card = state.playerHand[state.selectedCardIdx];
    state.board[row][col] = {
      card: card,
      owner: 'player',
      direction: direction
    };

    addLog('player', 'স্থাপন করলেন: ' + card.name_bn + ' (#' + String(card.num).padStart(3, '0') + ')');

    // Remove from hand
    state.playerHand.splice(state.selectedCardIdx, 1);
    state.selectedCardIdx = null;

    // Draw a new card if deck has cards
    if (state.deck.length > 0 && state.playerHand.length < HAND_SIZE) {
      state.playerHand.push(state.deck.pop());
    }

    // Check missions and update scores
    checkMissions('player');
    updateScores();
    renderAll();

    // End turn after a delay
    setTimeout(function() {
      state.placingCard = false;
      endTurn();
    }, 600);

    return true;
  }

  function drawCard() {
    if (state.gameOver || state.currentTurn !== 'player') return;
    if (state.deck.length === 0) {
      showToast('ডেকে আর কার্ড নেই', 'warn');
      return;
    }
    if (state.playerHand.length >= HAND_SIZE + 2) {
      showToast('হাতে আর কার্ড নেওয়া যাবে না', 'warn');
      return;
    }
    state.playerHand.push(state.deck.pop());
    addLog('player', 'ডেক থেকে একটি কার্ড টানলেন');
    renderHand();
    // End turn
    endTurn();
  }

  function endTurn() {
    if (state.gameOver) return;
    state.turnNum++;
    if (state.turnNum > MAX_TURNS * 2) {
      endGame();
      return;
    }
    state.currentTurn = 'ai';
    renderAll();
    setTimeout(function() { aiTurn(); }, 800);
  }

  // ===== AI LOGIC =====
  function aiTurn() {
    if (state.gameOver) return;
    if (state.aiHand.length === 0) {
      // Draw if possible
      if (state.deck.length > 0) {
        state.aiHand.push(state.deck.pop());
        addLog('ai', 'ডেক থেকে একটি কার্ড টানলেন');
      }
      finishAiTurn();
      return;
    }

    // AI strategy based on difficulty
    let placement;
    if (state.mode === 'hard') {
      placement = aiStrategicPlacement();
    } else if (state.mode === 'normal') {
      placement = Math.random() < 0.5 ? aiStrategicPlacement() : aiRandomPlacement();
    } else {
      placement = aiRandomPlacement();
    }

    if (!placement) {
      // Couldn't place — draw a card
      if (state.deck.length > 0) {
        state.aiHand.push(state.deck.pop());
        addLog('ai', 'ডেক থেকে একটি কার্ড টানলেন');
      }
      finishAiTurn();
      return;
    }

    const card = state.aiHand[placement.cardIdx];
    state.board[placement.row][placement.col] = {
      card: card,
      owner: 'ai',
      direction: placement.direction
    };
    addLog('ai', 'স্থাপন করলেন: ' + card.name_bn + ' (#' + String(card.num).padStart(3, '0') + ')');

    state.aiHand.splice(placement.cardIdx, 1);
    if (state.deck.length > 0 && state.aiHand.length < HAND_SIZE) {
      state.aiHand.push(state.deck.pop());
    }

    checkMissions('ai');
    updateScores();
    renderAll();

    setTimeout(function() { finishAiTurn(); }, 600);
  }

  function finishAiTurn() {
    if (state.gameOver) return;
    state.currentTurn = 'player';
    if (state.turnNum > MAX_TURNS * 2) {
      endGame();
      return;
    }
    renderAll();
  }

  function aiRandomPlacement() {
    // Find all empty cells adjacent to existing cards (or center if board empty)
    const validCells = getValidPlacementCells();
    if (validCells.length === 0) return null;
    const cell = validCells[Math.floor(Math.random() * validCells.length)];
    const cardIdx = Math.floor(Math.random() * state.aiHand.length);
    const direction = DIRECTIONS[Math.floor(Math.random() * 4)];
    return { row: cell[0], col: cell[1], cardIdx: cardIdx, direction: direction };
  }

  function aiStrategicPlacement() {
    // Try to place adjacent to AI's existing cards, prefer same type
    const validCells = getValidPlacementCells();
    if (validCells.length === 0) return null;

    let best = null;
    let bestScore = -1;

    for (const [r, c] of validCells) {
      for (let i = 0; i < state.aiHand.length; i++) {
        const card = state.aiHand[i];
        // Score this placement
        let score = Math.random() * 0.5;
        // Bonus for adjacent AI cards
        for (const d of DIRECTIONS) {
          const v = DIR_VECTORS[d];
          const nr = r + v.dr, nc = c + v.dc;
          if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLS) continue;
          const ncell = state.board[nr][nc];
          if (!ncell) continue;
          if (ncell.owner === 'ai') {
            score += 2;
            if (ncell.card.type === card.type) score += 3; // same type bonus
          }
        }
        // Center bonus
        if (r >= 2 && r <= 3 && c >= 3 && c <= 4) score += 1;

        if (score > bestScore) {
          bestScore = score;
          best = { row: r, col: c, cardIdx: i, direction: DIRECTIONS[Math.floor(Math.random() * 4)] };
        }
      }
    }
    return best;
  }

  function getValidPlacementCells() {
    // First card: center
    let hasAnyCard = false;
    for (let r = 0; r < BOARD_ROWS && !hasAnyCard; r++) {
      for (let c = 0; c < BOARD_COLS && !hasAnyCard; c++) {
        if (state.board[r][c]) hasAnyCard = true;
      }
    }
    if (!hasAnyCard) {
      return [[2, 3], [2, 4], [3, 3], [3, 4]]; // center cells
    }

    // Otherwise: empty cells adjacent to existing cards
    const cells = [];
    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS; c++) {
        if (state.board[r][c]) continue;
        let adjacent = false;
        for (const d of DIRECTIONS) {
          const v = DIR_VECTORS[d];
          const nr = r + v.dr, nc = c + v.dc;
          if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLS) continue;
          if (state.board[nr][nc]) { adjacent = true; break; }
        }
        if (adjacent) cells.push([r, c]);
      }
    }
    // Also allow some non-adjacent cells (sparse)
    if (cells.length < 3) {
      for (let r = 0; r < BOARD_ROWS; r++) {
        for (let c = 0; c < BOARD_COLS; c++) {
          if (!state.board[r][c] && cells.findIndex(function(p) { return p[0]===r && p[1]===c; }) === -1) {
            cells.push([r, c]);
          }
        }
      }
    }
    return cells;
  }

  // ===== END GAME =====
  function endGame() {
    state.gameOver = true;
    updateScores();
    addLog('system', 'গেম শেষ! চূড়ান্ত স্কোর — আপনি: ' + state.playerScore + ' | AI: ' + state.aiScore);
    showEndScreen();
  }

  function showEndScreen() {
    let winner;
    let winnerText;
    if (state.playerScore > state.aiScore) {
      winner = 'player';
      winnerText = 'আপনি জিতেছেন!';
    } else if (state.aiScore > state.playerScore) {
      winner = 'ai';
      winnerText = 'AI জিতেছে';
    } else {
      winner = 'tie';
      winnerText = 'ড্র!';
    }

    const modal = document.getElementById('game-end-modal');
    const content = modal.querySelector('.game-modal-content');
    const playerCards = state.board.flat().filter(function(c) { return c && c.owner === 'player'; }).length;
    const aiCards = state.board.flat().filter(function(c) { return c && c.owner === 'ai'; }).length;

    let emblemSvg;
    if (winner === 'player') {
      emblemSvg = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="#C9A961" stroke-width="2"/><polygon points="50,20 60,45 85,45 65,60 75,85 50,70 25,85 35,60 15,45 40,45" fill="#E8C878"/></svg>';
    } else if (winner === 'ai') {
      emblemSvg = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="#8B3A4A" stroke-width="2"/><polygon points="50,20 60,45 85,45 65,60 75,85 50,70 25,85 35,60 15,45 40,45" fill="#8B3A4A"/></svg>';
    } else {
      emblemSvg = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="#C9A961" stroke-width="2"/><circle cx="50" cy="50" r="20" fill="#C9A961"/></svg>';
    }

    content.innerHTML =
      '<div class="modal-emblem">' + emblemSvg + '</div>' +
      '<div class="winner-badge">' + (winner === 'player' ? 'VICTORY' : winner === 'ai' ? 'DEFEAT' : 'DRAW') + '</div>' +
      '<h2>' + winnerText + '</h2>' +
      '<div class="modal-subtitle">GAME OVER</div>' +
      '<div class="modal-stats">' +
        '<div class="modal-stat"><div class="modal-stat-num">' + state.playerScore + '</div><div class="modal-stat-label">আপনার পয়েন্ট</div></div>' +
        '<div class="modal-stat"><div class="modal-stat-num">' + state.aiScore + '</div><div class="modal-stat-label">AI পয়েন্ট</div></div>' +
        '<div class="modal-stat"><div class="modal-stat-num">' + playerCards + '</div><div class="modal-stat-label">আপনার কার্ড</div></div>' +
        '<div class="modal-stat"><div class="modal-stat-num">' + aiCards + '</div><div class="modal-stat-label">AI কার্ড</div></div>' +
        '<div class="modal-stat"><div class="modal-stat-num">' + state.completedPlayerMissions.length + '</div><div class="modal-stat-label">আপনার মিশন</div></div>' +
        '<div class="modal-stat"><div class="modal-stat-num">' + state.completedAiMissions.length + '</div><div class="modal-stat-label">AI মিশন</div></div>' +
      '</div>' +
      '<div style="display:flex;gap:12px;justify-content:center;margin-top:24px;flex-wrap:wrap;">' +
        '<button class="btn btn-primary" onclick="window.RUPANTOR_GAME.startGame(\'' + state.mode + '\')"><i class="fas fa-redo"></i> আবার খেলুন</button>' +
        '<button class="btn btn-outline" onclick="window.RUPANTOR_GAME.showStartScreen()"><i class="fas fa-home"></i> মূল মেনু</button>' +
      '</div>';
    modal.classList.add('active');
  }

  // ===== LOGGING =====
  function addLog(who, text, isMission) {
    state.log.unshift({ turn: state.turnNum, who: who, text: text, isMission: isMission });
    if (state.log.length > 30) state.log.pop();
    renderLog();
  }

  // ===== TOAST =====
  function showToast(text, type) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast ' + (type || '');
    toast.innerHTML = (type === 'success' ? '<i class="fas fa-check-circle"></i> ' : type === 'warn' ? '<i class="fas fa-exclamation-circle"></i> ' : type === 'error' ? '<i class="fas fa-times-circle"></i> ' : '<i class="fas fa-info-circle"></i> ') + text;
    container.appendChild(toast);
    setTimeout(function() {
      toast.classList.add('fade-out');
      setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
  }

  // ===== RENDERING =====
  function renderAll() {
    renderHeader();
    renderBoard();
    renderHand();
    renderMissions();
  }

  function renderHeader() {
    const turnEl = document.getElementById('turn-info');
    if (turnEl) {
      turnEl.innerHTML = 'TURN ' + Math.ceil(state.turnNum / 2) + ' / ' + MAX_TURNS +
        '<span class="turn-num">' + (state.currentTurn === 'player' ? 'আপনার চাল' : 'AI চিন্তা করছে...') + '</span>';
    }

    const playerPanel = document.getElementById('player-panel');
    const aiPanel = document.getElementById('ai-panel');
    if (playerPanel) playerPanel.classList.toggle('active', state.currentTurn === 'player' && !state.gameOver);
    if (aiPanel) aiPanel.classList.toggle('active', state.currentTurn === 'ai' && !state.gameOver);

    const playerScoreEl = document.getElementById('player-score');
    const aiScoreEl = document.getElementById('ai-score');
    if (playerScoreEl) playerScoreEl.textContent = state.playerScore;
    if (aiScoreEl) aiScoreEl.textContent = state.aiScore;
  }

  function renderBoard() {
    const grid = document.getElementById('board-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const validCells = state.currentTurn === 'player' && state.selectedCardIdx !== null && !state.gameOver
      ? getValidPlacementCells()
      : [];
    const validSet = new Set(validCells.map(function(c) { return c[0] + ',' + c[1]; }));

    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS; c++) {
        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.dataset.row = r;
        cell.dataset.col = c;

        const boardCell = state.board[r][c];
        if (boardCell) {
          cell.classList.add('placed');
          const card = boardCell.card;
          const t = card.type_info;
          const placedCard = document.createElement('div');
          placedCard.className = 'placed-card';
          placedCard.style.setProperty('--card-c1', t.color);
          placedCard.style.setProperty('--card-c2', t.c2);
          placedCard.style.setProperty('--card-accent', t.accent);
          if (boardCell.owner === 'ai') {
            placedCard.style.opacity = '0.85';
            placedCard.style.filter = 'hue-rotate(-20deg) brightness(0.9)';
          }
          placedCard.innerHTML =
            '<div class="direction-marker ' + boardCell.direction + '"></div>' +
            '<div class="card-num-mini">#' + String(card.num).padStart(3, '0') + '</div>' +
            '<div class="placed-card art">' + generateCardArtMini(card) + '</div>' +
            '<div class="card-name-mini">' + card.name_bn + '</div>';
          cell.appendChild(placedCard);
        } else if (validSet.has(r + ',' + c)) {
          cell.classList.add('valid-target');
        }

        cell.addEventListener('click', function() {
          handleCellClick(r, c);
        });

        grid.appendChild(cell);
      }
    }
  }

  function generateCardArtMini(card) {
    const t = card.type_info;
    const style = card.num % 6;
    let s = '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">';
    if (style === 0) {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const a = (i * 36 - 90) * Math.PI / 180;
        const r = i % 2 === 0 ? 14 : 6;
        pts.push((20 + Math.cos(a) * r).toFixed(1) + ',' + (20 + Math.sin(a) * r).toFixed(1));
      }
      s += '<polygon points="' + pts.join(' ') + '" fill="#FFFFFF" opacity="0.85"/>';
    } else if (style === 1) {
      s += '<circle cx="20" cy="20" r="14" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.8"/>';
      s += '<circle cx="20" cy="20" r="8" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.6"/>';
      s += '<circle cx="20" cy="20" r="3" fill="#FFFFFF"/>';
    } else if (style === 2) {
      s += '<polygon points="20,5 35,30 5,30" fill="#FFFFFF" opacity="0.85"/>';
    } else if (style === 3) {
      s += '<polygon points="20,5 35,20 20,35 5,20" fill="#FFFFFF" opacity="0.85"/>';
    } else if (style === 4) {
      for (let i = 0; i < 6; i++) {
        const a = (i * 60) * Math.PI / 180;
        const x1 = 20 + Math.cos(a) * 8;
        const y1 = 20 + Math.sin(a) * 8;
        const x2 = 20 + Math.cos(a) * 16;
        const y2 = 20 + Math.sin(a) * 16;
        s += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#FFFFFF" stroke-width="2" opacity="0.7"/>';
      }
      s += '<circle cx="20" cy="20" r="5" fill="#FFFFFF"/>';
    } else {
      s += '<rect x="16" y="6" width="8" height="28" fill="#FFFFFF" opacity="0.85"/>';
      s += '<rect x="6" y="16" width="28" height="8" fill="#FFFFFF" opacity="0.85"/>';
    }
    s += '</svg>';
    return s;
  }

  function renderHand() {
    const handEl = document.getElementById('player-hand');
    if (!handEl) return;
    handEl.innerHTML = '';

    state.playerHand.forEach(function(card, idx) {
      const t = card.type_info;
      const cardEl = document.createElement('div');
      cardEl.className = 'hand-card';
      if (state.selectedCardIdx === idx) cardEl.classList.add('selected');
      if (state.currentTurn !== 'player' || state.gameOver) cardEl.classList.add('disabled');
      cardEl.style.setProperty('--card-c1', t.color);
      cardEl.style.setProperty('--card-c2', t.c2);
      cardEl.style.setProperty('--card-accent', t.accent);
      cardEl.innerHTML =
        '<div class="hc-num">#' + String(card.num).padStart(3, '0') + ' · ' + t.en + '</div>' +
        '<div class="hc-art">' + generateCardArtMini(card) + '</div>' +
        '<div class="hc-name">' + card.name_bn + '</div>' +
        '<div class="hc-en">' + card.name_en + '</div>';
      cardEl.addEventListener('click', function() {
        if (state.currentTurn !== 'player' || state.gameOver) return;
        state.selectedCardIdx = state.selectedCardIdx === idx ? null : idx;
        renderHand();
        renderBoard();
      });
      handEl.appendChild(cardEl);
    });

    // Update action buttons
    const drawBtn = document.getElementById('btn-draw');
    if (drawBtn) drawBtn.disabled = state.currentTurn !== 'player' || state.gameOver || state.deck.length === 0;
  }

  function renderMissions() {
    const container = document.getElementById('missions-list');
    if (!container) return;
    container.innerHTML = '';

    state.playerMissions.forEach(function(m) {
      const isCompleted = state.completedPlayerMissions.some(function(c) { return c.id === m.id; });
      const result = m.check(state.board, 'player');
      const progress = Math.min(result.current / result.target, 1) * 100;

      const card = document.createElement('div');
      card.className = 'mission-card' + (isCompleted ? ' completed' : '');
      card.innerHTML =
        '<div class="mission-card-header">' +
          '<div class="mission-card-name">' + (isCompleted ? '<i class="fas fa-check-circle"></i> ' : '') + m.name + '</div>' +
          '<div class="mission-card-reward">+' + m.reward + ' পয়েন্ট</div>' +
        '</div>' +
        '<div class="mission-card-desc">' + m.desc + '</div>' +
        '<div class="mission-card-progress"><div class="mission-card-progress-bar" style="width:' + progress + '%;"></div></div>' +
        '<div class="mission-card-status">' + result.current + ' / ' + result.target + (isCompleted ? ' · পূরণ!' : '') + '</div>';
      container.appendChild(card);
    });
  }

  function renderLog() {
    const logEl = document.getElementById('game-log');
    if (!logEl) return;
    logEl.innerHTML = '';
    state.log.slice(0, 8).forEach(function(entry) {
      const div = document.createElement('div');
      div.className = 'game-log-entry ' + entry.who;
      div.innerHTML = '<span class="log-turn">T' + Math.ceil(entry.turn / 2) + '</span><span class="log-text">' + entry.text + '</span>';
      logEl.appendChild(div);
    });
  }

  // ===== CELL CLICK =====
  function handleCellClick(row, col) {
    if (state.gameOver || state.currentTurn !== 'player' || state.placingCard) return;
    if (state.board[row][col]) return; // already placed
    if (state.selectedCardIdx === null) {
      showToast('প্রথমে একটি কার্ড নির্বাচন করুন', 'warn');
      return;
    }

    // Check if cell is a valid target
    const validCells = getValidPlacementCells();
    const isValid = validCells.some(function(c) { return c[0] === row && c[1] === col; });
    if (!isValid) {
      showToast('এই স্থানে কার্ড স্থাপন করা যাবে না', 'warn');
      return;
    }

    // Show direction picker
    showDirectionPicker(row, col);
  }

  function showDirectionPicker(row, col) {
    // Remove any existing picker
    const existing = document.querySelector('.direction-picker');
    if (existing) existing.remove();

    const picker = document.createElement('div');
    picker.className = 'direction-picker';
    picker.innerHTML =
      '<button class="dp-n" data-dir="n">▲</button>' +
      '<button class="dp-w" data-dir="w">◀</button>' +
      '<button class="dp-c"></button>' +
      '<button class="dp-e" data-dir="e">▶</button>' +
      '<button class="dp-s" data-dir="s">▼</button>';

    // Position next to the cell
    const cell = document.querySelector('.board-cell[data-row="' + row + '"][data-col="' + col + '"]');
    if (!cell) return;
    const rect = cell.getBoundingClientRect();
    picker.style.position = 'fixed';
    picker.style.left = (rect.left + rect.width / 2 - 60) + 'px';
    picker.style.top = (rect.top + rect.height / 2 - 60) + 'px';

    document.body.appendChild(picker);

    picker.querySelectorAll('button[data-dir]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const dir = btn.dataset.dir;
        picker.remove();
        placeCard(row, col, dir);
      });
    });

    // Close on outside click
    setTimeout(function() {
      const handler = function(e) {
        if (!picker.contains(e.target)) {
          picker.remove();
          document.removeEventListener('click', handler);
        }
      };
      document.addEventListener('click', handler);
    }, 100);
  }

  // ===== START SCREEN =====
  function showStartScreen() {
    const modal = document.getElementById('game-end-modal');
    if (modal) modal.classList.remove('active');

    const container = document.getElementById('game-container');
    if (!container) return;

    container.innerHTML =
      '<div class="start-screen">' +
        '<svg width="100" height="100" viewBox="0 0 100 100" style="margin:0 auto 24px;">' +
          '<circle cx="50" cy="50" r="44" fill="none" stroke="#C9A961" stroke-width="1.5"/>' +
          '<polygon points="50,28 56,50 50,72 44,50" fill="#E8C878"/>' +
          '<polygon points="28,50 50,44 72,50 50,56" fill="#C9A961"/>' +
          '<circle cx="50" cy="50" r="3" fill="#FFE066"/>' +
        '</svg>' +
        '<h1 style="font-family:var(--font-serif-bn);font-weight:800;font-size:3rem;background:linear-gradient(135deg,#F5F1E8,#E8C878,#C9A961);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px;">রূপান্তর খেলুন</h1>' +
        '<p style="font-family:var(--font-display);font-size:0.9rem;letter-spacing:0.3em;color:#C9A961;text-transform:uppercase;margin-bottom:8px;">PLAYABLE GAME MODE</p>' +
        '<p style="color:#B8C0D4;max-width:600px;margin:0 auto 32px;font-size:1.05rem;line-height:1.7;">কার্ড স্থাপন করো, সংযোগ গড়ে তোলো, গোপন মিশন পূরণ করো, এবং AI-এর বিরুদ্ধে জয়লাভ করো।</p>' +
        '<h3 style="font-family:var(--font-display);font-size:0.85rem;letter-spacing:0.3em;color:#C9A961;text-transform:uppercase;margin-bottom:16px;">কঠিনতা নির্বাচন করুন</h3>' +
        '<div class="game-mode-cards">' +
          '<div class="game-mode-card" onclick="window.RUPANTOR_GAME.startGame(\'easy\')">' +
            '<div class="gm-icon"><i class="fas fa-seedling"></i></div>' +
            '<div class="gm-title">সহজ</div>' +
            '<div class="gm-desc">AI এলোমেলোভাবে খেলে। নতুন খেলোয়াড়দের জন্য আদর্শ।</div>' +
          '</div>' +
          '<div class="game-mode-card" onclick="window.RUPANTOR_GAME.startGame(\'normal\')">' +
            '<div class="gm-icon"><i class="fas fa-balance-scale"></i></div>' +
            '<div class="gm-title">সাধারণ</div>' +
            '<div class="gm-desc">AI মাঝে মাঝে কৌশল ব্যবহার করে। ভারসাম্যপূর্ণ চ্যালেঞ্জ।</div>' +
          '</div>' +
          '<div class="game-mode-card" onclick="window.RUPANTOR_GAME.startGame(\'hard\')">' +
            '<div class="gm-icon"><i class="fas fa-fire"></i></div>' +
            '<div class="gm-title">কঠিন</div>' +
            '<div class="gm-desc">AI সর্বদা কৌশলগতভাবে খেলে। অভিজ্ঞ খেলোয়াড়দের জন্য।</div>' +
          '</div>' +
        '</div>' +
        '<div style="max-width:600px;margin:32px auto 0;text-align:left;background:rgba(201,169,97,0.05);border:1px solid rgba(201,169,97,0.2);border-radius:12px;padding:20px;">' +
          '<h4 style="color:#E8C878;font-family:var(--font-serif-bn);font-size:1rem;margin-bottom:12px;"><i class="fas fa-info-circle"></i> কীভাবে খেলবেন</h4>' +
          '<ol style="color:#B8C0D4;font-size:0.9rem;line-height:1.8;padding-left:20px;">' +
            '<li><strong style="color:#F5F1E8;">কার্ড নির্বাচন:</strong> নিচের হাত থেকে একটি কার্ডে ক্লিক করুন।</li>' +
            '<li><strong style="color:#F5F1E8;">স্থান নির্বাচন:</strong> টেবিলে একটি উজ্জ্বল ঘরে ক্লিক করুন।</li>' +
            '<li><strong style="color:#F5F1E8;">দিক নির্বাচন:</strong> কার্ডের দিক নির্বাচন করুন (উত্তর/পূর্ব/দক্ষিণ/পশ্চিম)।</li>' +
            '<li><strong style="color:#F5F1E8;">সংযোগ:</strong> সংলগ্ন কার্ডের সাথে সংযোগ গড়ে ওঠে। দিক মিললে অনুরণিত সংযোগ — বোনাস পয়েন্ট।</li>' +
            '<li><strong style="color:#F5F1E8;">মিশন:</strong> গোপন মিশন পূরণ করে অতিরিক্ত পয়েন্ট অর্জন করুন।</li>' +
            '<li><strong style="color:#F5F1E8;">বিজয়:</strong> ১২ টার্ন পরে সবচেয়ে বেশি পয়েন্ট পাওয়া খেলোয়াড় বিজয়ী।</li>' +
          '</ol>' +
          '<div style="margin-top:16px;text-align:center;">' +
            '<button class="btn btn-outline" onclick="window.RUPANTOR_GAME.showTutorial()" style="font-size:0.85rem;padding:8px 18px;"><i class="fas fa-play-circle"></i> টিউটোরিয়াল দেখুন</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function startGame(mode) {
    const modal = document.getElementById('game-end-modal');
    if (modal) modal.classList.remove('active');

    // Show tutorial first if available and not seen before
    const hasSeenTutorial = sessionStorage.getItem('rupantor_tutorial_seen');
    if (!hasSeenTutorial && window.RUPANTOR_TUTORIAL) {
      sessionStorage.setItem('rupantor_tutorial_seen', '1');
      window.RUPANTOR_TUTORIAL.show(function() {
        actuallyStartGame(mode);
      });
    } else {
      actuallyStartGame(mode);
    }
  }

  function actuallyStartGame(mode) {
    initState(mode);
    renderGameUI();
    renderAll();
    renderLog();
    addLog('system', 'গেম শুরু! মোড: ' + (mode === 'easy' ? 'সহজ' : mode === 'hard' ? 'কঠিন' : 'সাধারণ'));
    showToast('গেম শুরু হলো! কার্ড নির্বাচন করুন', 'success');
  }

  function renderGameUI() {
    const container = document.getElementById('game-container');
    if (!container) return;
    container.innerHTML =
      '<div class="game-header">' +
        '<div class="player-panel active" id="player-panel">' +
          '<div class="player-avatar human"><i class="fas fa-user"></i></div>' +
          '<div class="player-info"><div class="player-name">আপনি</div><div class="player-score" id="player-score">0</div></div>' +
        '</div>' +
        '<div class="turn-indicator" id="turn-info">TURN 1 / 12<span class="turn-num">আপনার চাল</span></div>' +
        '<div class="player-panel ai" id="ai-panel">' +
          '<div class="player-info" style="text-align:right;"><div class="player-name">AI</div><div class="player-score" id="ai-score">0</div></div>' +
          '<div class="player-avatar ai"><i class="fas fa-robot"></i></div>' +
        '</div>' +
      '</div>' +

      '<div class="game-board-wrapper">' +
        '<div class="board-grid" id="board-grid"></div>' +
      '</div>' +

      '<div class="player-hand-wrapper">' +
        '<div class="hand-header">' +
          '<div class="hand-title"><i class="fas fa-hand-paper"></i> আপনার হাত</div>' +
          '<div class="hand-actions">' +
            '<button class="hand-action-btn" id="btn-draw" onclick="window.RUPANTOR_GAME.drawCard()"><i class="fas fa-plus"></i> কার্ড টানুন</button>' +
            '<button class="hand-action-btn" id="btn-tutorial" onclick="window.RUPANTOR_GAME.showTutorial()"><i class="fas fa-question-circle"></i> টিউটোরিয়াল</button>' +
            '<button class="hand-action-btn" onclick="window.RUPANTOR_GAME.showStartScreen()"><i class="fas fa-flag"></i> ছেড়ে দিন</button>' +
          '</div>' +
        '</div>' +
        '<div class="player-hand" id="player-hand"></div>' +
      '</div>' +

      '<div class="missions-panel">' +
        '<div class="missions-title"><i class="fas fa-bullseye"></i> আপনার গোপন মিশন</div>' +
        '<div class="missions-list" id="missions-list"></div>' +
      '</div>' +

      '<div class="game-log" id="game-log"></div>';
  }

  // ===== INIT =====
  function init() {
    showStartScreen();
  }

  // ===== PUBLIC API =====
  window.RUPANTOR_GAME = {
    init: init,
    startGame: startGame,
    showStartScreen: showStartScreen,
    showTutorial: function() {
      if (window.RUPANTOR_TUTORIAL) {
        window.RUPANTOR_TUTORIAL.show(function() {
          showToast('টিউটোরিয়াল সম্পূর্ণ!', 'success');
        });
      }
    },
    drawCard: drawCard,
    placeCard: placeCard,
    showToast: showToast,
  };

  // Auto-init on DOMContentLoaded if on game page
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('game-container')) {
      init();
    }
  });
})();
