(function () {
  "use strict";

  const STORAGE_KEY = "sonova_drag_unlock_v3";
  const MODE_KEY = "sonova_drag_unlock_mode_v3";

  const REVEAL_MS = 2200;

  const PIECES = [1, 2, 3, 4, 5, 6, 7];

  function googleFavicon(domain, size) {
    const d = String(domain || "").trim();
    const sz = Number(size || 128);
    if (!d) return "";
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=${sz}`;
  }

  const SONOVA_CUIDA = {
    phone: "0800 718 7315",
    email: "sonova@cpsbrasil.com",
    site: "https://viverbem.careglobalpartners.com.br/",
    code: "sonova-cuida"
  };

  const PORTAIS = [
    {
      key: "adp",
      stage: 1,
      title: "ADP Expert",
      sub: "Usabilidade: acesso ao portal de folha",
      url: "https://expert.cloud.brasil.adp.com/ipclogin/1/loginform.html?TYPE=33554433&REALMOID=06-000f0243-eb2e-117b-922c-11720acb0000&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-t8SOWIK%2fgJwbjEv4UX5gkf1B0Omto2OBtIjuIUUFMSwG89pqbtT%2bKprwK%2fbvYoHl&TARGET=-SM-http%3a%2f%2fexpert%2ecloud%2ebrasil%2eadp%2ecom%2fexpert%2fv4%2f",
      icon: googleFavicon("https://br.adp.com/-/media/adp2022/ui/touch-icons/android_adplogo_128x128_en.png?rev=662da0f9350e43138ca7ab72cac0c3ab", 128),
      steps: [
        "Acessar o portal e localizar a área principal.",
        "Validar primeiro login e parâmetros básicos.",
        "Se falhar, registrar mensagem e horário do teste."
      ],
      xp: 25,
      seq: [1, 2, 3]
    },
    {
      key: "docusign",
      stage: 2,
      title: "Assinatura de contrato (DocuSign)",
      sub: "Você recebeu um DocuSign para assinatura",
      url: "",
      icon: googleFavicon("docusign.com", 128),
      steps: [
        "Abrir o e-mail do DocuSign recebido.",
        "Revisar e assinar conforme instruções do documento.",
        "Salvar o comprovante/arquivo para referência."
      ],
      xp: 10,
      seq: [4, 5, 6]
    },
    {
      key: "ctps_econsig",
      stage: 3,
      title: "CTPS Digital e eConsignado",
      sub: "Solicitação via CTPS Digital (fluxo orientado)",
      url: "",
      icon: googleFavicon("gov.br", 128),
      steps: [
        "Acessar a CTPS Digital (app) com login gov.br.",
        "Localizar a opção de eConsignado (quando aplicável).",
        "Em caso de erro, registrar tela e abrir chamado interno."
      ],
      xp: 12,
      seq: [1, 2, 3]
    },
    {
      key: "alelo_vr",
      stage: 4,
      title: "Alelo VR",
      sub: "Como usar VR no dia a dia",
      url: "",
      icon: googleFavicon("alelo.com.br", 128),
      steps: [
        "Confirmar recebimento do cartão/credencial (se aplicável).",
        "Usar em estabelecimentos credenciados (VR).",
        "Se recusado, registrar local, data e evidência do erro."
      ],
      xp: 12,
      seq: [4, 5, 6]
    },
    {
      key: "vt_form",
      stage: 5,
      title: "Atualização de VT (Formulário digital)",
      sub: "Solicitar/atualizar Vale-Transporte via formulário",
      url: "https://drive.google.com/file/d/1uS55t_X731T8PTX5E7z8dcn3Cgwr1Uc2/view",
      icon: googleFavicon("drive.google.com", 128),
      steps: [
        "Abrir o formulário e preencher os dados solicitados.",
        "Anexar evidências quando necessário (rotas/linhas).",
        "Acompanhar retorno conforme prazo interno."
      ],
      xp: 12,
      seq: [7, 1, 2]
    },
    {
      key: "sulamerica",
      stage: 6,
      title: "SulAmérica (Saúde e Odonto)",
      sub: "Acesso e consulta do plano",
      url: "https://saude.sulamericaseguros.com.br/segurado/login/",
      icon: googleFavicon("saude.sulamericaseguros.com.br", 128),
      steps: [
        "Acessar o portal e realizar login/cadastro.",
        "Localizar carteirinha, rede credenciada e autorizações.",
        "Se falhar, registrar erro e abrir tratativa com DP."
      ],
      xp: 15,
      seq: [6, 1, 2]
    },
    {
      key: "petlove",
      stage: 7,
      title: "Petlove",
      sub: "Portal/app para saúde pet",
      url: "https://central-de-saude.petlove.com.br/#/login",
      icon: googleFavicon("petlove.com.br", 128),
      steps: [
        "Acessar com e-mail e validar cadastro.",
        "Configurar senha no primeiro acesso (se necessário).",
        "Em falhas, registrar contexto (app/navegador)."
      ],
      xp: 12,
      seq: [5, 1, 2]
    },
    {
      key: "wellhub",
      stage: 8,
      title: "Wellhub",
      sub: "Ativação e planos no app",
      url: "https://identity.gympass.com/auth/realms/master/protocol/openid-connect/auth?client_id=mobile-sso&redirect_uri=https%3A%2F%2Fbilling-clients.gympass.com%2Fclient%2F1daaa2f6-fd56-4fe0-ac14-82e243cc0dc2%2Ffinance%2F25c969c6-6d52-4dc3-ad38-29e4ffffd92a&state=2193d94d-1696-4a34-b339-620f8e43ad30&response_mode=query&response_type=code&scope=openid&nonce=03fd4699-ffbf-4741-8c70-a3866983d8f7",
      icon: googleFavicon("gympass.com", 128),
      steps: [
        "Confirmar uso do e-mail corporativo no app.",
        "Se não ativar, solicitar reenvio/ativação no canal interno.",
        "Em falhas, registrar mensagem e horário do teste."
      ],
      xp: 12,
      seq: [4, 1, 2]
    },
    {
      key: "univers",
      stage: 9,
      title: "Univers (Desconto em Farmácia)",
      sub: "Uso do benefício de medicamentos",
      url: "https://portalgestor.univers-pbm.com.br/beneficioMedicamentos/gestor/consulta/consulta_consumo_receita.xhtml",
      icon: googleFavicon("univers-pbm.com.br", 128),
      steps: [
        "Confirmar cadastro/login no app.",
        "No uso, informar CPF e selecionar o benefício no balcão.",
        "Se falhar, registrar farmácia e evidência do erro."
      ],
      xp: 12,
      seq: [3, 1, 2]
    },
    {
      key: "sonova_cuida",
      stage: 10,
      title: "Sonova Cuida",
      sub: "Assistência ao colaborador e dependentes (24/7)",
      url: SONOVA_CUIDA.site,
      icon: googleFavicon("https://www.sonova.com/brazil/pt/beneficios-e-bem-estar", 128),
      steps: [
        `Contato: ${SONOVA_CUIDA.phone} | ${SONOVA_CUIDA.email}`,
        `Site: ${SONOVA_CUIDA.site} (código: ${SONOVA_CUIDA.code})`,
        "Em necessidade, registre o caso e acione o canal adequado."
      ],
      xp: 18,
      seq: [2, 4, 6]
    }
  ];

  const elBoard = document.getElementById("board");
  const elTray = document.getElementById("tray");
  const elSlots = document.getElementById("slots");
  const elResult = document.getElementById("resultline");

  const elStageSub = document.getElementById("stage-sub");
  const elStatus = document.getElementById("pill-status");

  const elXP = document.getElementById("kpi-xp");
  const elDone = document.getElementById("kpi-done");
  const elLevel = document.getElementById("pill-level");

  const btnReveal = document.getElementById("btn-reveal");
  const btnReset = document.getElementById("btn-reset");
  const btnClear = document.getElementById("btn-clear");
  const btnMode = document.getElementById("btn-mode");

  const elPortalTitle = document.getElementById("portal-title");
  const elPortalSub = document.getElementById("portal-sub");
  const elPortalSteps = document.getElementById("portal-steps");
  const btnOpen = document.getElementById("btn-open");
  const btnCopy = document.getElementById("btn-copy");
  const btnQR = document.getElementById("btn-qr");
  const btnCopyCard = document.getElementById("btn-copy-card");

  const qrbox = document.getElementById("qrbox");
  const qrimg = document.getElementById("qrimg");
  const qrlink = document.getElementById("qrlink");

  const btnCert = document.getElementById("btn-cert");
  const inName = document.getElementById("in-name");
  const certwrap = document.getElementById("certwrap");
  const certname = document.getElementById("certname");
  const certstages = document.getElementById("certstages");
  const certxp = document.getElementById("certxp");
  const certdate = document.getElementById("certdate");
  const certitems = document.getElementById("certitems");
  const btnPrint = document.getElementById("btn-print");
  const btnHide = document.getElementById("btn-hide");

  const toastEl = document.getElementById("toast");

  const state = loadState();
  hydrateState();

  initMode();
  renderBoard();
  renderTray();
  renderSlots();
  refreshHUD();
  renderPortalCardFromSelection();

  btnReset.addEventListener("click", () => {
    const ok = confirm("Confirma resetar o progresso e as liberações?");
    if (!ok) return;
    saveState(freshState());
    location.reload();
  });

  btnClear.addEventListener("click", () => {
    clearSlotsToTray();
    setResult("", "");
  });

  btnMode.addEventListener("click", () => {
    const cur = localStorage.getItem(MODE_KEY) || "normal";
    const next = cur === "normal" ? "audit" : "normal";
    localStorage.setItem(MODE_KEY, next);
    applyMode(next);
  });

  btnReveal.addEventListener("click", () => {
    revealCurrentPista();
  });

  btnQR.addEventListener("click", () => {
    if (btnQR.disabled) return;
    qrbox.classList.toggle("show");
    btnQR.textContent = qrbox.classList.contains("show") ? "Ocultar QR" : "Mostrar QR";
  });

  btnCopy.addEventListener("click", async () => {
    if (!state.ui.currentUrl) return;
    await copyToClipboard(state.ui.currentUrl);
    toast("Link copiado.");
  });

  btnOpen.addEventListener("click", () => {
    if (!state.ui.currentUrl) return;
    window.open(state.ui.currentUrl, "_blank", "noopener,noreferrer");
  });

  btnCopyCard.addEventListener("click", async () => {
    const txt = buildPortalSummaryText();
    await copyToClipboard(txt);
    toast("Resumo copiado.");
  });

  btnCert.addEventListener("click", () => {
    if (!allDone()) return;
    openCertificate();
  });

  btnPrint.addEventListener("click", () => window.print());
  btnHide.addEventListener("click", () => closeCertificate());

  elSlots.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      slot.classList.add("over");
    });
    slot.addEventListener("dragleave", () => slot.classList.remove("over"));
    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      slot.classList.remove("over");

      const piece = Number(e.dataTransfer.getData("text/plain"));
      if (!Number.isFinite(piece)) return;

      placePieceIntoSlot(piece, Number(slot.dataset.slot));
    });
  });

  elTray.addEventListener("dragover", (e) => e.preventDefault());
  elTray.addEventListener("drop", (e) => {
    e.preventDefault();
    const piece = Number(e.dataTransfer.getData("text/plain"));
    if (!Number.isFinite(piece)) return;
    returnPieceToTray(piece);
    setResult("", "");
  });

  elBoard.addEventListener("click", (e) => {
    const card = e.target.closest("[data-portal]");
    if (!card) return;
    const key = card.dataset.portal;
    state.ui.selectedPortalKey = key;
    saveState(state);
    renderPortalCardFromSelection();
  });

  function renderBoard() {
    elBoard.innerHTML = "";

    const currentStage = getCurrentStage();

    PORTAIS.forEach((p) => {
      const isOpen = !!state.unlocked[p.key];
      const isCurrent = p.stage === currentStage && !isOpen;

      const flip = document.createElement("div");
      flip.className = "flip" + (isOpen ? " open" : "") + (isCurrent ? " current-glow" : "");
      flip.dataset.portal = p.key;

      const inner = document.createElement("div");
      inner.className = "flip-inner";

      const back = document.createElement("div");
      back.className = "face back";

      const backTop = document.createElement("div");
      backTop.className = "back-top";

      const left = document.createElement("div");
      const tag = document.createElement("div");
      tag.className = "stage-tag";
      tag.textContent = `ETAPA ${p.stage}`;

      const ltitle = document.createElement("div");
      ltitle.className = "locked-title";
      ltitle.textContent = isCurrent ? "Etapa atual" : "Bloqueado";

      const lsub = document.createElement("div");
      lsub.className = "locked-sub";
      lsub.textContent = isCurrent ? "Arraste 3 peças para o cadeado" : "Desbloqueie a etapa anterior";

      left.appendChild(tag);
      left.appendChild(ltitle);
      left.appendChild(lsub);

      backTop.appendChild(left);
      back.appendChild(backTop);

      const backBody = document.createElement("div");
      backBody.className = "back-body";

      backBody.appendChild(buildCenterIcon(p, true));

      const pista = document.createElement("div");
      pista.className = "pista hidden";
      pista.id = `pista_${p.key}`;
      pista.textContent = `Sequência: ${p.seq.join(" - ")}`;

      backBody.appendChild(pista);
      back.appendChild(backBody);

      const front = document.createElement("div");
      front.className = "face front";

      const fbody = document.createElement("div");
      fbody.className = "front-body";

      const ftitle = document.createElement("div");
      ftitle.className = "front-title";
      ftitle.textContent = p.title;

      const fsub = document.createElement("div");
      fsub.className = "front-sub";
      fsub.textContent = p.sub;

      const ficon = buildCenterIcon(p, false);

      const tools = document.createElement("div");
      tools.className = "front-tools";

      const bDetails = mkBtn("Ver fluxo", "btn small ghost", () => {
        state.ui.selectedPortalKey = p.key;
        saveState(state);
        renderPortalCardFromSelection();
        toast("Fluxo carregado na carta.");
      });

      tools.appendChild(bDetails);

      if (p.url) {
        const bOpen = mkBtn("Abrir", "btn small primary", () => window.open(p.url, "_blank", "noopener,noreferrer"));
        const bCopy = mkBtn("Copiar", "btn small", async () => {
          await copyToClipboard(p.url);
          toast("Link copiado.");
        });
        tools.appendChild(bOpen);
        tools.appendChild(bCopy);
      }

      fbody.appendChild(ftitle);
      fbody.appendChild(fsub);
      fbody.appendChild(ficon);
      fbody.appendChild(tools);

      front.appendChild(fbody);

      inner.appendChild(back);
      inner.appendChild(front);
      flip.appendChild(inner);

      elBoard.appendChild(flip);
    });
  }

  function buildCenterIcon(p, locked) {
    const wrap = document.createElement("div");
    wrap.className = "card-iconwrap";

    const iconUrl = String(p.icon || "").trim();

    if (iconUrl) {
      const img = document.createElement("img");
      img.className = "card-logo" + (locked ? " locked" : "");
      img.alt = p.title;
      img.src = iconUrl;

      img.onerror = () => {
        img.remove();
        wrap.appendChild(buildMonogram(p.key, locked));
      };

      wrap.appendChild(img);
      return wrap;
    }

    wrap.appendChild(buildMonogram(p.key, locked));
    return wrap;
  }

  function buildMonogram(key, locked) {
    const mono = document.createElement("div");
    mono.className = "card-mono" + (locked ? " locked" : "");
    mono.textContent = iconLabelForKey(key);
    return mono;
  }

  function iconLabelForKey(key) {
    const map = {
      adp: "ADP",
      docusign: "DS",
      ctps_econsig: "CTPS",
      alelo_vr: "ALELO",
      vt_form: "VT",
      sulamerica: "SA",
      petlove: "PET",
      wellhub: "WH",
      univers: "UNI",
      sonova_cuida: "SC"
    };
    return map[key] || "DP";
  }

  function renderTray() {
    elTray.innerHTML = "";
    PIECES.forEach((n) => {
      const used = state.usedPieces[n] === true;
      const el = document.createElement("div");
      el.className = "piece" + (used ? " used" : "");
      el.textContent = String(n);
      el.draggable = !used;
      el.dataset.piece = String(n);

      el.addEventListener("dragstart", (e) => {
        if (used) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData("text/plain", String(n));
      });

      elTray.appendChild(el);
    });
  }

  function renderSlots() {
    const slots = elSlots.querySelectorAll(".slot");
    slots.forEach((slot) => {
      const idx = Number(slot.dataset.slot);
      slot.querySelectorAll(".slotpiece").forEach((x) => x.remove());

      const val = state.slots[idx];
      if (val == null) return;

      const sp = document.createElement("div");
      sp.className = "slotpiece";
      sp.textContent = String(val);
      sp.draggable = true;
      sp.dataset.piece = String(val);

      sp.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", String(val));
      });

      sp.addEventListener("dblclick", () => {
        removePieceFromSlot(idx);
        setResult("", "");
      });

      slot.appendChild(sp);
    });
  }

  function refreshHUD() {
    const doneCount = Object.values(state.unlocked).filter(Boolean).length;
    const total = PORTAIS.length;
    const xp = state.xp;

    elXP.textContent = String(xp);
    elDone.textContent = `${doneCount}/${total}`;
    elLevel.textContent = `Nível ${computeLevel(xp)}`;

    const currentStage = getCurrentStage();
    if (doneCount === total) {
      elStageSub.textContent = `Concluído: ${total} etapas liberadas`;
      elStatus.textContent = "Concluído";
      btnCert.disabled = false;
      btnReveal.disabled = true;
    } else {
      elStageSub.textContent = `Etapa ${currentStage} de ${total}: desbloqueie o próximo item`;
      elStatus.textContent = "Em progresso";
      btnCert.disabled = true;
      btnReveal.disabled = false;
    }
  }

  function renderPortalCardFromSelection() {
    const key = state.ui.selectedPortalKey || null;
    if (!key) {
      setPortalCardEmpty();
      return;
    }

    const p = PORTAIS.find(x => x.key === key);
    if (!p) {
      setPortalCardEmpty();
      return;
    }

    elPortalTitle.textContent = p.title;

    if (!state.unlocked[p.key]) {
      elPortalSub.textContent = "Ainda bloqueado. Desbloqueie a etapa para ver o fluxo completo.";
      elPortalSteps.innerHTML = "";
      btnOpen.disabled = true;
      btnCopy.disabled = true;
      btnQR.disabled = true;
      qrbox.classList.remove("show");
      state.ui.currentUrl = "";
      saveState(state);
      return;
    }

    showPortalDetails(p);
  }

  function showPortalDetails(p) {
    elPortalTitle.textContent = p.title;
    elPortalSub.textContent = p.sub;

    elPortalSteps.innerHTML = "";
    p.steps.forEach((s) => {
      const div = document.createElement("div");
      div.className = "step";
      div.textContent = s;
      elPortalSteps.appendChild(div);
    });

    if (p.url) {
      btnOpen.disabled = false;
      btnCopy.disabled = false;
      btnQR.disabled = false;

      state.ui.currentUrl = p.url;
      saveState(state);

      qrbox.classList.remove("show");
      btnQR.textContent = "Mostrar QR";
      qrlink.textContent = p.url;
      qrimg.src = qrUrl(p.url, 320);
    } else {
      btnOpen.disabled = true;
      btnCopy.disabled = true;
      btnQR.disabled = true;
      qrbox.classList.remove("show");
      state.ui.currentUrl = "";
      saveState(state);
    }
  }

  function setPortalCardEmpty() {
    elPortalTitle.textContent = "Selecione um card";
    elPortalSub.textContent = "Clique em um card do tabuleiro para ver o status e, quando liberar, o fluxo em 3 passos";
    elPortalSteps.innerHTML = "";
    btnOpen.disabled = true;
    btnCopy.disabled = true;
    btnQR.disabled = true;
    qrbox.classList.remove("show");
    state.ui.currentUrl = "";
    saveState(state);
  }

  function placePieceIntoSlot(piece, slotIdx) {
    if (state.usedPieces[piece]) {
      toast("Essa peça já está usada em um slot.");
      return;
    }

    const cur = state.slots[slotIdx];
    if (cur != null) {
      state.usedPieces[cur] = false;
      state.slots[slotIdx] = null;
    }

    state.slots[slotIdx] = piece;
    state.usedPieces[piece] = true;

    saveState(state);
    renderTray();
    renderSlots();

    if (state.slots.every(x => x != null)) {
      validateSequence();
    } else {
      setResult("", "");
    }
  }

  function removePieceFromSlot(slotIdx) {
    const cur = state.slots[slotIdx];
    if (cur == null) return;
    state.slots[slotIdx] = null;
    state.usedPieces[cur] = false;
    saveState(state);
    renderTray();
    renderSlots();
  }

  function returnPieceToTray(piece) {
    const idx = state.slots.findIndex(x => x === piece);
    if (idx >= 0) {
      state.slots[idx] = null;
      state.usedPieces[piece] = false;
      saveState(state);
      renderTray();
      renderSlots();
    }
  }

  function clearSlotsToTray() {
    for (let i = 0; i < state.slots.length; i++) {
      const cur = state.slots[i];
      if (cur != null) state.usedPieces[cur] = false;
      state.slots[i] = null;
    }
    saveState(state);
    renderTray();
    renderSlots();
  }

  function validateSequence() {
    const curStage = getCurrentStage();
    const portal = PORTAIS.find(p => p.stage === curStage);
    if (!portal) return;

    const attempt = state.slots.slice();
    const ok = sameArray(attempt, portal.seq);

    if (!ok) {
      setResult("Sequência incorreta. Ajuste e tente novamente.", "bad");
      toast("Quase. Ajuste a ordem das peças.");
      return;
    }

    state.unlocked[portal.key] = true;
    state.xp += Number(portal.xp || 10);

    clearSlotsToTray();

    state.ui.selectedPortalKey = portal.key;
    state.ui.currentUrl = portal.url || "";
    saveState(state);

    setResult("Etapa liberada. Item desbloqueado.", "ok");
    toast(`Liberado: ${portal.title}`);

    renderBoard();
    renderTray();
    renderSlots();
    refreshHUD();
    showPortalDetails(portal);

    if (allDone()) {
      btnCert.disabled = false;
      elStatus.textContent = "Concluído";
      toast("Trilha concluída. Gere o certificado.");
    }
  }

  function revealCurrentPista() {
  const curStage = getCurrentStage();
  const portal = PORTAIS.find(p => p.stage === curStage);
  if (!portal) return;

  state.ui.selectedPortalKey = portal.key;
  saveState(state);
  renderPortalCardFromSelection();

  // Garante que o card da etapa atual esteja na tela
  const cardEl = document.querySelector(`[data-portal="${portal.key}"]`);
  if (cardEl && typeof cardEl.scrollIntoView === "function") {
    cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const el = document.getElementById(`pista_${portal.key}`);
  if (!el) {
    toast("Pista não encontrada nesta etapa. Recarregue a página.");
    return;
  }

  // Revela por alguns segundos (e reforça visualmente)
  el.classList.remove("hidden");
  el.classList.add("revealed");
  toast("Pista revelada.");

  setTimeout(() => {
    el.classList.add("hidden");
    el.classList.remove("revealed");
  }, REVEAL_MS);
}

  function openCertificate() {
    const name = (inName.value || "").trim() || "Colaborador(a)";
    certname.textContent = name;

    const doneCount = Object.values(state.unlocked).filter(Boolean).length;
    const total = PORTAIS.length;

    certstages.textContent = `${doneCount}/${total}`;
    certxp.textContent = String(state.xp);
    certdate.textContent = formatDateBR(new Date());

    const unlockedTitles = PORTAIS
      .filter(p => !!state.unlocked[p.key])
      .map(p => p.title);

    const itemsText = unlockedTitles.length
      ? unlockedTitles.map((t, i) => `${i + 1}. ${t}`).join("\n")
      : "Nenhum item liberado.";

    certitems.textContent = itemsText;

    certwrap.classList.add("show");
    certwrap.setAttribute("aria-hidden", "false");
    toast("Certificado pronto. Você pode imprimir/salvar em PDF.");
  }

  function closeCertificate() {
    certwrap.classList.remove("show");
    certwrap.setAttribute("aria-hidden", "true");
  }

  function freshState() {
    const used = {};
    PIECES.forEach(n => used[n] = false);
    return {
      unlocked: {},
      xp: 0,
      slots: [null, null, null],
      usedPieces: used,
      ui: {
        selectedPortalKey: "",
        currentUrl: ""
      }
    };
  }

  function hydrateState() {
    if (!state.unlocked) state.unlocked = {};
    if (typeof state.xp !== "number") state.xp = 0;
    if (!Array.isArray(state.slots) || state.slots.length !== 3) state.slots = [null, null, null];

    if (!state.usedPieces) state.usedPieces = {};
    PIECES.forEach((n) => {
      if (typeof state.usedPieces[n] !== "boolean") state.usedPieces[n] = false;
    });

    if (!state.ui) state.ui = { selectedPortalKey: "", currentUrl: "" };

    saveState(state);
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return freshState();
      return JSON.parse(raw);
    } catch {
      return freshState();
    }
  }

  function saveState(obj) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  }

  function getCurrentStage() {
    for (const p of PORTAIS) {
      if (!state.unlocked[p.key]) return p.stage;
    }
    return PORTAIS.length;
  }

  function allDone() {
    return PORTAIS.every(p => !!state.unlocked[p.key]);
  }

  function setResult(text, cls) {
    elResult.textContent = text || "";
    elResult.classList.remove("ok", "bad");
    if (cls) elResult.classList.add(cls);
  }

  function sameArray(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (Number(a[i]) !== Number(b[i])) return false;
    }
    return true;
  }

  function computeLevel(xp) {
    const n = Math.floor(Number(xp || 0) / 40) + 1;
    return clamp(n, 1, 99);
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function mkBtn(text, cls, onClick) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = cls;
    b.textContent = text;
    b.addEventListener("click", (e) => {
      e.preventDefault();
      onClick();
    });
    return b;
  }

  function qrUrl(data, size) {
    const s = Number(size || 320);
    const enc = encodeURIComponent(String(data || ""));
    return `https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&data=${enc}`;
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(String(text));
    } catch {
      const ta = document.createElement("textarea");
      ta.value = String(text);
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }

  function buildPortalSummaryText() {
    const key = state.ui.selectedPortalKey;
    if (!key) return "Sonova Onboarding RH/DP – Nenhuma etapa selecionada.";
    const p = PORTAIS.find(x => x.key === key);
    if (!p) return "Sonova Onboarding RH/DP – Etapa inválida.";

    const status = state.unlocked[p.key] ? "LIBERADO" : "BLOQUEADO";
    const link = state.unlocked[p.key] && p.url ? p.url : "Sem link (use o fluxo em 3 passos)";

    const lines = [
      `SONOVA ONBOARDING RH/DP – ${p.title} (${status})`,
      p.sub,
      "",
      "Fluxo (3 passos):",
      ...p.steps.map((x, i) => `${i + 1}. ${x}`),
      "",
      `Link: ${link}`
    ];
    return lines.join("\n");
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    toastEl.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      toastEl.classList.remove("show");
      toastEl.setAttribute("aria-hidden", "true");
    }, 1600);
  }

  function initMode() {
    const mode = localStorage.getItem(MODE_KEY) || "normal";
    applyMode(mode);
  }

  function applyMode(mode) {
    document.body.classList.toggle("audit", mode === "audit");
  }

  function formatDateBR(d) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = String(d.getFullYear());
    return `${dd}/${mm}/${yyyy}`;
  }

})();
