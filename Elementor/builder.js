<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"></script>
<script>
    /* ===================== Data ===================== */
    const PLAYERS_START = [
        { id: 'courtois', name: 'Courtois', num: 13, role: 'GK', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Courtois-1.png' },
        { id: 'valverde', name: 'Valverde', num: 8, role: 'RDMF', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Valverde-1.png' },
        { id: 'asencio', name: 'Asencio', num: 17, role: 'CB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Asencio-1.png' },
        { id: 'tchouameni', name: 'Tchouameni', num: 14, role: 'LDMF', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Tchouameni-1.png' },
        { id: 'frangarcia', name: 'Fran Garcia', num: 20, role: 'LB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Fran-Garcia-1.png' },
        { id: 'ceballos', name: 'Ceballos', num: 19, role: 'CM', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Ceballos-1.png' },
        { id: 'camavinga', name: 'Camavinga', num: 6, role: 'DMF', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Camavinga-1.png' },
        { id: 'bellingham', name: 'Bellingham', num: 5, role: 'CAM', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Bellingham-1.png' },
        { id: 'arda', name: 'Arda', num: 15, role: 'CAM', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Arda-1.png' },
        { id: 'mbappe', name: 'Mbappé', num: 10, role: 'ST', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Mbappe-1.png' },
        { id: 'vinicius', name: 'Vinicius', num: 7, role: 'LW', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Vinicius-1.png' },
    ];

    const PLAYERS_SUBS = [
        { id: 'lunin', name: 'Lunin', num: 1, role: 'GK', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Lunin-1.png' },
        { id: 'militao', name: 'Militao', num: 3, role: 'RCB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Militao-1.png' },
        { id: 'huijsen', name: 'Huijsen', num: 24, role: 'LCB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Huijsen-1.png' },
        { id: 'carvajal', name: 'Carvajal', num: 2, role: 'RB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Carvajal-1.png' },
        { id: 'alaba', name: 'Alaba', num: 4, role: 'CB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Alaba-1.png' },
        { id: 'arnold', name: 'Arnold', num: 12, role: 'RB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Arnold-1.png' },
        { id: 'mastantuono', name: 'Mastantuono', num: 30, role: 'RW', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Mastantuono-1.png' },
        { id: 'carreras', name: 'Carreras', num: 18, role: 'LB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Carreras-1.png' },
        { id: 'rudiger', name: 'Rüdiger', num: 22, role: 'CB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Rudiger-1.png' },
        { id: 'mendy', name: 'Mendy', num: 23, role: 'LB', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Mendy-1.png' },
        { id: 'diaz', name: 'Diaz', num: 21, role: 'RW', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Diaz-1.png' },
        { id: 'rodrygo', name: 'Rodrygo', num: 11, role: 'RW', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Rodrygo-1.png' },
        { id: 'gonzalo', name: 'Gonzalo', num: 16, role: 'ST', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Gonzalo-1.png' },
        { id: 'endrick', name: 'Endrick', num: 9, role: 'ST', img: '/proxy?url=https://casamadridista.com/wp-content/uploads/2025/08/Endrick-1.png' },
    ];

    /* ====== Field mapping (inside gray box of image) ====== */
    function mapToField(x, y) {
        const L = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--field-left'));
        const R = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--field-right'));
        const T = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--field-top'));
        const B = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--field-bottom'));
        const left = L + (x / 100) * (R - L);
        const top = T + (y / 100) * (B - T);
        return { left: left + '%', top: top + '%' };
    }

    /* ====== Formations (x,y in 0–100 inside FIELD) ====== */
    const FORM = {
        '4-2-3-1': [
            { id: 'GK', x: 50, y: 90 },
            { id: 'RB', x: 80, y: 65 }, { id: 'RCB', x: 60, y: 69 }, { id: 'LCB', x: 40, y: 69 }, { id: 'LB', x: 20, y: 65 },
            { id: 'RDMF', x: 63, y: 47 }, { id: 'LDMF', x: 37, y: 47 },
            { id: 'RW', x: 75, y: 36 }, { id: 'CAM', x: 50, y: 38 }, { id: 'LW', x: 25, y: 36 },
            { id: 'ST', x: 50, y: 15 }
        ],
        '4-3-3': [
            { id: 'GK', x: 50, y: 90 },
            { id: 'RB', x: 80, y: 65 }, { id: 'RCB', x: 60, y: 66 }, { id: 'LCB', x: 40, y: 66 }, { id: 'LB', x: 20, y: 65 },
            { id: 'RCM', x: 72, y: 39 }, { id: 'CM', x: 50, y: 40 }, { id: 'LCM', x: 28, y: 39 },
            { id: 'RW', x: 73, y: 16 }, { id: 'ST', x: 50, y: 15 }, { id: 'LW', x: 27, y: 16 }
        ],
        '4-4-2': [
            { id: 'GK', x: 50, y: 90 },
            { id: 'RB', x: 80, y: 65 }, { id: 'RCB', x: 60, y: 66 }, { id: 'LCB', x: 40, y: 66 }, { id: 'LB', x: 20, y: 65 },
            { id: 'RM', x: 76, y: 39 }, { id: 'RCM', x: 58, y: 40 }, { id: 'LCM', x: 40, y: 40 }, { id: 'LM', x: 24, y: 39 },
            { id: 'RST', x: 61, y: 15 }, { id: 'LST', x: 39, y: 15 }
        ],
        '3-5-2': [
            { id: 'GK', x: 50, y: 90 },
            { id: 'RCB', x: 70, y: 65 }, { id: 'CB', x: 50, y: 66 }, { id: 'LCB', x: 30, y: 65 },
            { id: 'RWB', x: 76, y: 40 }, { id: 'RCM', x: 63, y: 42 }, { id: 'CAM', x: 50, y: 42 }, { id: 'LCM', x: 37, y: 42 }, { id: 'LWB', x: 24, y: 40 },
            { id: 'RST', x: 61, y: 15 }, { id: 'LST', x: 39, y: 15 }
        ],
        '5-3-2': [
            { id: 'GK', x: 50, y: 90 },
            { id: 'RB', x: 80, y: 65 }, { id: 'RCB', x: 65, y: 66 }, { id: 'CB', x: 50, y: 66 }, { id: 'LCB', x: 35, y: 66 }, { id: 'LB', x: 20, y: 65 },
            { id: 'RCM', x: 72, y: 39 }, { id: 'CM', x: 50, y: 40 }, { id: 'LCM', x: 28, y: 39 },
            { id: 'RST', x: 61, y: 15 }, { id: 'LST', x: 39, y: 15 }
        ],
        '4-1-4-1': [
            { id: 'GK', x: 50, y: 90 },
            { id: 'RB', x: 80, y: 65 }, { id: 'RCB', x: 60, y: 69 }, { id: 'LCB', x: 40, y: 69 }, { id: 'LB', x: 20, y: 65 },
            { id: 'DMF', x: 50, y: 51 },
            { id: 'RM', x: 77, y: 34 }, { id: 'RCM', x: 61, y: 36 }, { id: 'LCM', x: 39, y: 36 }, { id: 'LM', x: 23, y: 34 },
            { id: 'ST', x: 50, y: 15 }
        ],
        '3-4-3': [
            { id: 'GK', x: 50, y: 90 },
            { id: 'RCB', x: 70, y: 65 }, { id: 'CB', x: 50, y: 66 }, { id: 'LCB', x: 30, y: 65 },
            { id: 'RWB', x: 76, y: 39 }, { id: 'RCM', x: 58, y: 40 }, { id: 'LCM', x: 40, y: 40 }, { id: 'LWB', x: 24, y: 39 },
            { id: 'RW', x: 73, y: 16 }, { id: 'ST', x: 50, y: 15 }, { id: 'LW', x: 27, y: 16 }
        ],
        '4-5-1': [
            { id: 'GK', x: 50, y: 90 },
            { id: 'RB', x: 80, y: 65 }, { id: 'RCB', x: 60, y: 66 }, { id: 'LCB', x: 40, y: 66 }, { id: 'LB', x: 20, y: 65 },
            { id: 'RM', x: 76, y: 38 }, { id: 'RCM', x: 63, y: 40 }, { id: 'CAM', x: 50, y: 40 }, { id: 'LCM', x: 37, y: 40 }, { id: 'LM', x: 24, y: 38 },
            { id: 'ST', x: 50, y: 15 }
        ],
    };

    const LABEL = { GK: 'GK', RB: 'RB', LB: 'LB', RCB: 'RCB', LCB: 'LCB', CB: 'CB', DMF: 'DMF', RDMF: 'DMF', LDMF: 'DMF', RCM: 'CM', LCM: 'CM', CM: 'CM', CAM: 'CAM', RM: 'RM', LM: 'LM', RW: 'RW', LW: 'LW', ST: 'ST', RST: 'ST', LST: 'ST', RWB: 'RWB', LWB: 'LWB' };

    /* ===================== State ===================== */
    const pitchEl = document.getElementById('pitch');
    const benchEl = document.getElementById('bench');
    const benchGrid = document.getElementById('benchGrid');
    const formationSelect = document.getElementById('formation-select');
    const formationTitle = document.getElementById('formation-title');
    const formationInput = document.getElementById('formation-input');
    const formationCardTitle = document.getElementById('card-title');
    const toggleNames = document.getElementById('toggle-names');
    const resetBtn = document.getElementById('reset-btn');
    const downloadBtn = document.getElementById('download-btn');

    let state = { formation: '4-3-3', slots: {}, dragging: null };

    formationCardTitle.textContent = `${state.formation} Formation`;

    /* ===================== Init ===================== */
    function init(resetLineup = true) {
        // set names toggle class
        //  pitchEl.classList.toggle('names-off', !toggleNames.checked);
        if (resetLineup) {
            // 1. Add switching class for animation
            pitchEl.classList.add('switching');

            // 2. Fade out current players
            pitchEl.querySelectorAll('.player').forEach(player => {
                player.classList.add('fade-out');
            });

            // 3. Wait for fade-out, then reset lineup
            setTimeout(() => {
                pitchEl.querySelectorAll('.player').forEach(player => player.remove());

                renderFormationSlots();

                state.slots = {};
                // Assign starting players to slots by order
                const starters = [...PLAYERS_START];
                FORM[state.formation].forEach((slot, i) => {
                    if (starters[i]) {
                        state.slots[slot.id] = starters[i].id;
                    }
                });

                syncPlayersToSlots();
                renderBench();

                // 4. Remove switching class after animation
                pitchEl.querySelectorAll('.player').forEach(player => {
                    player.classList.add('fade-in');
                    // Remove fade-in class after animation completes
                    setTimeout(() => player.classList.remove('fade-in'), 400);
                });
            }, 300); // Match this to your .fade-out transition duration
        } else {
            renderFormationSlots();
            syncPlayersToSlots();
            renderBench();
        }
    }

    /* ===================== Slots & Players Rendering ===================== */
    function renderFormationSlots() {
        pitchEl.classList.add('switching');
        // clear existing slots (KEEP players for smooth animation)
        pitchEl.querySelectorAll('.slot').forEach(n => n.remove());

        FORM[state.formation].forEach(s => {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.dataset.slotId = s.id;
            const pos = mapToField(s.x, s.y);
            slot.style.left = pos.left; slot.style.top = pos.top;
            const label = document.createElement('div'); label.className = 'label'; label.textContent = LABEL[s.id] || s.id; slot.appendChild(label);
            pitchEl.appendChild(slot);
        });

        setTimeout(() => pitchEl.classList.remove('switching'), 600);
    }

    function syncPlayersToSlots() {
        // ensure each slot shows a player if mapped
        for (const s of FORM[state.formation]) {
            const pid = state.slots[s.id];
            const pos = mapToField(s.x, s.y);
            const slotEl = getSlotEl(s.id);
            slotEl.classList.toggle('filled', !!pid);
            const label = slotEl.querySelector('.label'); if (label) label.style.opacity = pid ? .2 : 1;

            let pel = pid ? document.querySelector(`.player[data-player-id="${pid}"]`) : null;
            if (!pel && pid) { pel = createPlayerEl(pid); }
            if (pel && pid) { pel.style.left = pos.left; pel.style.top = pos.top; }
        }
    }

    function createPlayerEl(pid) {
        const p = findPlayer(pid); if (!p) return null;
        const el = document.createElement('div'); el.className = 'player'; el.dataset.playerId = pid; el.dataset.from = 'slot';
        el.innerHTML = `<div class="img"><img crossorigin="anonymous" alt="${p.name}"  src="${p.img}" draggable="false"></div><div class="name">${p.name} <span style="opacity:.6">${p.num}</span></div>`;
        attachPointerDnD(el, { type: 'slot', playerId: pid });
        pitchEl.appendChild(el);
        return el;
    }

    function getSlotEl(id) { return pitchEl.querySelector(`.slot[data-slot-id="${id}"]`); }
    function getSlotOfPlayer(pid) { return Object.entries(state.slots).find(([, v]) => v === pid)?.[0] || null; }

    /* ===================== Bench ===================== */
    function renderBench() {
        benchGrid.innerHTML = '';
        const onPitch = new Set(Object.values(state.slots));
        const pool = [...PLAYERS_START, ...PLAYERS_SUBS].filter(p => !onPitch.has(p.id));
        for (const p of pool) {
            const cell = document.createElement('div');
            const item = document.createElement('div'); item.className = 'bench-item'; item.dataset.playerId = p.id; item.innerHTML = `</div><div class="img"><img crossorigin="anonymous" alt="${p.name}" src="${p.img}" draggable="false"></div>`;
            attachPointerDnD(item, { type: 'bench', playerId: p.id });
            const nm = document.createElement('div'); nm.className = 'bench-name'; nm.innerHTML = `${ p.name } <span style="opacity:.6">${p.num}</span>`;
            cell.appendChild(item); cell.appendChild(nm); benchGrid.appendChild(cell);
        }
    }

    /* ===================== Pointer DnD (mobile + desktop) ===================== */
    function attachPointerDnD(el, meta) {
        el.addEventListener('pointerdown', (e) => startDrag(e, meta));
    }

    function startDrag(e, meta) {
        // Prevent native drag/image ghosting on desktop
        e.preventDefault();

        const pid = meta.playerId;
        const fromSlot = meta.type === 'slot' ? getSlotOfPlayer(pid) : null;
        const ghost = document.createElement('div'); ghost.className = 'drag-ghost'; ghost.innerHTML = `< div class='img' > <img crossorigin="anonymous" src='${findPlayer(pid).img}' alt='' draggable="false"></div>`; document.body.appendChild(ghost);

        const dragging = state.dragging = { pid, from: meta.type, fromSlot, ghost, overSlot: null };
        updateGhost(e.clientX, e.clientY);

        // Capture moves globally so we keep getting pointermove even if leaving the element
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp, { once: true });
        document.body.style.userSelect = 'none';

        function onMove(ev) { updateGhost(ev.clientX, ev.clientY); highlightNearest(ev.clientX, ev.clientY); }
        function onUp(ev) { document.removeEventListener('pointermove', onMove); document.body.style.userSelect = ''; dropAt(ev.clientX, ev.clientY); cleanup(); }

        function cleanup() { ghost.remove(); state.dragging = null; pitchEl.querySelectorAll('.slot.over').forEach(s => s.classList.remove('over')); benchEl.classList.remove('over'); }
    }

    function updateGhost(x, y) { if (state.dragging) { state.dragging.ghost.style.left = x + 'px'; state.dragging.ghost.style.top = y + 'px'; } }

    function getSlotCenters() {
        // cache center coords
        const list = [];
        for (const s of FORM[state.formation]) {
            const el = getSlotEl(s.id); const r = el.getBoundingClientRect(); list.push({ id: s.id, x: r.left + r.width / 2, y: r.top + r.height / 2, el });
        }
        return list;
    }

    function highlightNearest(px, py) {
        const centers = getSlotCenters();
        let best = null, d2min = Infinity;
        for (const c of centers) { const dx = px - c.x, dy = py - c.y; const d2 = dx * dx + dy * dy; if (d2 < d2min) { d2min = d2; best = c; } }
        pitchEl.querySelectorAll('.slot.over').forEach(s => s.classList.remove('over'));
        const radius = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--avatar')) * 0.8;
        if (best && Math.sqrt(d2min) < radius * 1.1) { best.el.classList.add('over'); state.dragging.overSlot = best.id; }
        else { state.dragging.overSlot = null; }

        // bench highlight
        const br = benchEl.getBoundingClientRect();
        if (px > br.left && px < br.right && py > br.top && py < br.bottom) { benchEl.classList.add('over'); } else benchEl.classList.remove('over');
    }

    function dropAt(px, py) {
        const d = state.dragging; if (!d) return;

        // If dropped on bench and the player is from pitch -> remove with animation
        const br = benchEl.getBoundingClientRect();
        const onBench = (px > br.left && px < br.right && py > br.top && py < br.bottom);
        if (onBench) { if (d.from === 'slot') { animateRemoveToBench(d.pid); } return; }

        const target = d.overSlot; if (!target) { // no valid slot near — if came from bench, cancel; if from slot, snap back
            if (d.from === 'slot') movePlayerToSlot(d.pid, d.fromSlot); return;
        }

        // If dropping onto the SAME slot, keep them in place (do nothing)
        if (d.from === 'slot' && target === d.fromSlot) { movePlayerToSlot(d.pid, target); return; }

        // Proceed with swap/placement
        handlePlacement(d.pid, target, d.fromSlot);
    }

    /* ===================== Placement Logic ===================== */
    function handlePlacement(incomingId, targetSlot, fromSlot) {
        const prev = state.slots[targetSlot];

        // swap if dragging from another slot and target occupied by someone else
        if (fromSlot && prev && prev !== incomingId) {
            state.slots[fromSlot] = prev;   // move previous occupant to source slot
            movePlayerToSlot(prev, fromSlot);
        } else if (fromSlot) {
            delete state.slots[fromSlot];
            const srcEl = getSlotEl(fromSlot); if (srcEl) srcEl.classList.remove('filled');
        }

        state.slots[targetSlot] = incomingId;
        movePlayerToSlot(incomingId, targetSlot);

        // If previous existed and we came from bench, send previous to bench with fade
        if (prev && (!fromSlot || prev === incomingId)) animateRemoveToBench(prev);

        renderBench();
    }

    function movePlayerToSlot(pid, slotId) {
        const slot = FORM[state.formation].find(s => s.id === slotId); if (!slot) return;
        const pos = mapToField(slot.x, slot.y);
        let el = document.querySelector(`.player[data - player - id= "${pid}"]`);
        if (!el) el = createPlayerEl(pid);
        el.style.left = pos.left; el.style.top = pos.top; el.classList.add('dragging'); setTimeout(() => el.classList.remove('dragging'), 180);
        const slotEl = getSlotEl(slotId); slotEl.classList.add('filled'); const label = slotEl.querySelector('.label'); if (label) label.style.opacity = .2;
    }

    function animateRemoveToBench(pid) {
        // remove mapping
        const fromSlot = getSlotOfPlayer(pid); if (fromSlot) { delete state.slots[fromSlot]; const sEl = getSlotEl(fromSlot); if (sEl) { sEl.classList.remove('filled'); const lbl = sEl.querySelector('.label'); if (lbl) lbl.style.opacity = 1; } }
        const el = document.querySelector(`.player[data - player - id= "${pid}"]`);
        if (el) { el.classList.add('fade-out'); setTimeout(() => { el?.remove(); renderBench(); }, 320); }
    }

    /* ===================== Helpers ===================== */
    function findPlayer(id) { return [...PLAYERS_START, ...PLAYERS_SUBS].find(p => p.id === id); }

    /* ===================== Controls ===================== */
    formationSelect.addEventListener('change', function () {
        pitchEl.classList.add('switching');
        const oldSlots = { ...state.slots };
        state.formation = formationSelect.value;
        formationTitle.textContent = `${ state.formation } Formation`;
        formationCardTitle.textContent = formationCardTitle.textContent != '' ? formationCardTitle.textContent : `${ state.formation } Formation`;
        renderFormationSlots();
        // Re-map current players by label similarity to new formation
        const newIds = FORM[state.formation].map(s => s.id);
        state.slots = {};
        for (const [oldSlot, pid] of Object.entries(oldSlots)) {
            const want = LABEL[oldSlot];
            let target = newIds.find(ns => LABEL[ns] === want && !state.slots[ns]);
            if (!target) target = newIds.find(ns => !state.slots[ns]);
            if (target) state.slots[target] = pid;
        }
        syncPlayersToSlots();
        renderBench();
        setTimeout(() => pitchEl.classList.remove('switching'), 620);
    });

    toggleNames.addEventListener('click', function () {
        this.classList.toggle('active')
        pitchEl.classList.toggle('names-off');
    });

    formationInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        formationCardTitle.textContent = val ? val : `${ state.formation } Formation`;
    });

    resetBtn.addEventListener('click', () => { init(true); });
    downloadBtn.addEventListener('click', () => {
        // Set the title text
        const titleText = formationInput.value || `${ state.formation } Formation`;

        const images = document.querySelector('body').querySelectorAll('img');
        const loadPromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve); // Handle errors gracefully
            });
        });
        Promise.all(loadPromises).then(() => {
            domtoimage.toPng(document.querySelector('.pitch'), {
                useCORS: true,       // Attempts CORS for any remaining cross-origin
                allowTaint: false,   // Don't allow tainting (we want clean export)
                logging: true,       // Enable logs for debugging in console
                scale: 2,             // Higher res for better quality (optional)
                proxy: '/proxy?url=',
            }).then(dataUrl => {
                const img = new Image();
                img.src = dataUrl;

                img.onload = function () {
                    const pitch = document.querySelector('.pitch');

                    const width = pitchEl.clientWidth;

                    const cropX = width < 1040 ? 118 : 228;   // pixels from left
                    const cropY = 0;   // pixels from top
                    const cropWidth = 712;
                    const cropHeight = 872;

                    const canvas = document.createElement("canvas");
                    canvas.width = cropWidth;
                    canvas.height = cropHeight;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

                    // Save cropped image
                    const croppedDataUrl = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.href = croppedDataUrl;
                    link.download = `${ formationCardTitle.textContent }.png`;
                    link.click();
                };
            }).catch(err => {
                console.error('html2canvas error:', err);
                alert('Failed to generate image. Check console for details.');
            });
        });
    });
    // Initialize app
    init(true);
</script>