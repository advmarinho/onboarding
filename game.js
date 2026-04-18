(function () {
  "use strict";

  const STORAGE_KEY = "sonova_onboarding_v4";
  const MODE_KEY = "sonova_onboarding_mode_v4";

  function googleFavicon(domain, size) {
    const d = String(domain || "").trim();
    const sz = Number(size || 128);
    if (!d) return "";
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=${sz}`;
  }

  const SONOVA_CUIDA = {
    phone: "0800 718 7815",
    email: "sonova@cpsbrasil.com",
    site: "https://viverbem.careglobalpartners.com.br/",
    code: "sonova-cuida"
  };

  /* ============================================================
     BENEFÍCIOS E ACESSOS
     (Alelo VR foi substituído por iFood Benefícios)
     ============================================================ */
  const PORTAIS = [
    {
      key: "adp",
      stage: 1,
      title: "ADP Expert",
      sub: "Usabilidade: acesso ao portal de folha",
      url: "https://expert.cloud.brasil.adp.com/ipclogin/1/loginform.html?TYPE=33554433&REALMOID=06-000f0243-eb2e-117b-922c-11720acb0000&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-t8SOWIK%2fgJwbjEv4UX5gkf1B0Omto2OBtIjuIUUFMSwG89pqbtT%2bKprwK%2fbvYoHl&TARGET=-SM-http%3a%2f%2fexpert%2ecloud%2ebrasil%2eadp%2ecom%2fexpert%2fv4%2f",
      icon: googleFavicon("adp.com", 128),
      steps: [
        "Acessar o portal e localizar a área principal.",
        "Validar primeiro login e parâmetros básicos.",
        "Se falhar, registrar mensagem e horário do teste."
      ],
      xp: 25
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
      xp: 10
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
      xp: 12
    },
    {
      key: "ifood",
      stage: 4,
      title: "iFood Benefícios",
      sub: "Vale-refeição e vale-alimentação no app do iFood",
      url: "https://beneficios.ifood.com.br/",
      icon: googleFavicon("ifood.com.br", 128),
      steps: [
        "Baixar o app 'iFood Benefícios' e fazer login com seu CPF.",
        "Ativar o saldo de refeição/alimentação (crédito mensal).",
        "Usar no app do iFood ou no cartão físico em restaurantes e mercados credenciados."
      ],
      xp: 12
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
      xp: 12
    },
    {
      key: "sulamerica",
      stage: 6,
      title: "SulAmérica (Saúde e Odonto)",
      sub: "Acesso e consulta do plano",
      url: "https://saude.sulamericaseguros.com.br/segurado/login/",
      icon: googleFavicon("sulamericaseguros.com.br", 128),
      steps: [
        "Acessar o portal e realizar login/cadastro.",
        "Localizar carteirinha, rede credenciada e autorizações.",
        "Se falhar, registrar erro e abrir tratativa com DP."
      ],
      xp: 15
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
      xp: 12
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
      xp: 12
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
      xp: 12
    },
    {
      key: "sonova_cuida",
      stage: 10,
      title: "Sonova Cuida",
      sub: "Assistência ao colaborador e dependentes (24/7)",
      url: SONOVA_CUIDA.site,
      icon: googleFavicon("sonova.com", 128),
      steps: [
        `Contato: ${SONOVA_CUIDA.phone} | ${SONOVA_CUIDA.email}`,
        `Site: ${SONOVA_CUIDA.site} (código: ${SONOVA_CUIDA.code})`,
        "Em necessidade, registre o caso e acione o canal adequado."
      ],
      xp: 18
    }
  ];

  /* ============================================================
     Referências de DOM
     ============================================================ */
  const elBoard = document.getElementById("board");
  const elStageSub = document.getElementById("stage-sub");
  const elStatus = document.getElementById("pill-status");

  const elXP = document.getElementById("kpi-xp");
  const elDone = document.getElementById("kpi-done");
  const elLevel = document.getElementById("pill-level");

  // NOVO — barra de progresso
  const elProgressLabel = document.getElementById("progress-label");
  const elProgressHint = document.getElementById("progress-hint");
  const elProgressFill = document.getElementById("progress-fill");
  const elProgressbar = document.getElementById("progressbar");

  const btnReset = document.getElementById("btn-reset");
  const btnMode = document.getElementById("btn-mode");

  const elPortalTitle = document.getElementById("portal-title");
  const elPortalSub = document.getElementById("portal-sub");
  const elPortalSteps = document.getElementById("portal-steps");
  const btnOpen = document.getElementById("btn-open");
  const btnCopy = document.getElementById("btn-copy");
  const btnQR = document.getElementById("btn-qr");
  const btnDone = document.getElementById("btn-done");
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

  /* ============================================================
     Estado
     ============================================================ */
  const state = loadState();
  hydrateState();

  initMode();
  renderBoard();
  refreshHUD();
  renderPortalCardFromSelection();

  /* ============================================================
     Listeners
     ============================================================ */
  btnReset.addEventListener("click", () => {
    const ok = confirm("Confirma resetar o progresso e as marcações?");
    if (!ok) return;
    saveState(freshState());
    location.reload();
  });

  btnMode.addEventListener("click", () => {
    const cur = localStorage.getItem(MODE_KEY) || "normal";
    const next = cur === "normal" ? "audit" : "normal";
    localStorage.setItem(MODE_KEY, next);
    applyMode(next);
    toast(next === "audit" ? "Modo auditoria" : "Modo normal");
  });

  // ============================================================
  // ALTERADO — Abrir portal agora também marca como concluído
  // (1 clique: abre o link + marca como concluído + soma XP)
  // ============================================================
  btnOpen.addEventListener("click", () => {
    const p = getSelectedPortal();
    if (!p || !p.url) return;

    // Marca como concluído automaticamente (se ainda não estava)
    if (!state.done[p.key]) {
      state.done[p.key] = true;
      state.xp += Number(p.xp || 10);
      saveState(state);
      toast(`Concluído: ${p.title}`);
      renderBoard();
      refreshHUD();
      renderPortalCardFromSelection();
    }

    // Abre o portal em nova aba
    window.open(p.url, "_blank", "noopener");
  });

  btnCopy.addEventListener("click", async () => {
    const p = getSelectedPortal();
    if (!p || !p.url) return;
    await copyToClipboard(p.url);
    toast("Link copiado.");
  });

  btnQR.addEventListener("click", () => {
    const p = getSelectedPortal();
    if (!p || !p.url) return;
    qrimg.src = qrUrl(p.url, 320);
    qrlink.textContent = p.url;
    qrbox.classList.toggle("show");
  });

  btnCopyCard.addEventListener("click", async () => {
    const text = buildPortalSummaryText();
    await copyToClipboard(text);
    toast("Resumo copiado.");
  });

  btnDone.addEventListener("click", () => {
    const p = getSelectedPortal();
    if (!p) return;
    const already = !!state.done[p.key];
    if (already) {
      state.done[p.key] = false;
      state.xp = Math.max(0, state.xp - Number(p.xp || 10));
      toast(`Desmarcado: ${p.title}`);
    } else {
      state.done[p.key] = true;
      state.xp += Number(p.xp || 10);
      toast(`Concluído: ${p.title}`);
    }
    saveState(state);
    renderBoard();
    refreshHUD();
    renderPortalCardFromSelection();
  });

  btnCert.addEventListener("click", () => openCertificate());
  btnHide.addEventListener("click", () => closeCertificate());
  btnPrint.addEventListener("click", () => window.print());

  /* ============================================================
     Render
     ============================================================ */
  function renderBoard() {
    elBoard.innerHTML = "";
    PORTAIS.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.portal = p.key;
      if (p.key === state.ui.selectedPortalKey) card.classList.add("selected");
      if (state.done[p.key]) card.classList.add("done");

      const icon = p.icon
        ? `<img class="card-logo" src="${p.icon}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'card-mono',textContent:'${(p.title || '?').slice(0,2).toUpperCase()}'}))" />`
        : `<div class="card-mono">${(p.title || "?").slice(0, 2).toUpperCase()}</div>`;

      card.innerHTML = `
        <div class="card-top">
          <div class="stage-tag">Etapa ${p.stage}</div>
          <div class="card-status">${state.done[p.key] ? "Concluído" : "Pendente"}</div>
        </div>
        <div class="card-title">${p.title}</div>
        <div class="card-iconwrap">${icon}</div>
        <div>
          <div class="card-sub">${p.sub}</div>
          <div class="card-foot">Clique para ver o passo a passo →</div>
        </div>
      `;

      card.addEventListener("click", () => {
        state.ui.selectedPortalKey = p.key;
        saveState(state);
        renderBoard();
        renderPortalCardFromSelection();
      });

      elBoard.appendChild(card);
    });
  }

  function renderPortalCardFromSelection() {
    const p = getSelectedPortal();
    if (!p) {
      elPortalTitle.textContent = "Selecione um card";
      elPortalSub.textContent = "O passo a passo do item aparece aqui";
      elPortalSteps.innerHTML = "";
      btnOpen.disabled = true;
      btnCopy.disabled = true;
      btnQR.disabled = true;
      btnDone.disabled = true;
      btnDone.textContent = "Marcar como concluído";
      qrbox.classList.remove("show");
      return;
    }

    elPortalTitle.textContent = p.title;
    elPortalSub.textContent = p.sub;
    elPortalSteps.innerHTML = "";
    p.steps.forEach((txt, i) => {
      const d = document.createElement("div");
      d.className = "step";
      d.innerHTML = `<div class="step-num">${i + 1}</div><div>${txt}</div>`;
      elPortalSteps.appendChild(d);
    });

    const hasUrl = !!p.url;
    btnOpen.disabled = !hasUrl;
    btnCopy.disabled = !hasUrl;
    btnQR.disabled = !hasUrl;
    btnDone.disabled = false;
    btnDone.textContent = state.done[p.key] ? "Desmarcar" : "Marcar como concluído";

    // Texto do botão "Abrir portal" indica que vai concluir
    if (hasUrl) {
      btnOpen.textContent = state.done[p.key] ? "Abrir portal ↗" : "Abrir portal (conclui)";
    } else {
      btnOpen.textContent = "Sem link — siga o passo a passo";
    }

    qrbox.classList.remove("show");
  }

  function refreshHUD() {
    const total = PORTAIS.length;
    const doneCount = countDone();

    elDone.textContent = `${doneCount}/${total}`;
    elXP.textContent = String(state.xp);
    elLevel.textContent = `Nível ${computeLevel(state.xp)}`;

    elStatus.textContent = `${doneCount} de ${total} concluídos`;
    elStageSub.textContent =
      doneCount === 0
        ? "Clique em um card para ver o passo a passo"
        : doneCount === total
          ? "Tudo concluído — gere seu certificado!"
          : `Faltam ${total - doneCount} para concluir a trilha`;

    btnCert.disabled = doneCount < total;

    // NOVO — atualiza a barra de progresso no topo
    refreshProgress(doneCount, total);
  }

  /* ============================================================
     NOVO — Atualiza a barra de progresso sticky
     ============================================================ */
  function refreshProgress(done, total) {
    if (!elProgressFill) return;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    elProgressFill.style.width = pct + "%";

    if (done === 0) {
      elProgressLabel.textContent = `0 de ${total} concluídos`;
      elProgressHint.textContent = "Comece pelo primeiro card";
    } else if (done < total) {
      elProgressLabel.textContent = `${done} de ${total} concluídos (${pct}%)`;
      const nextPending = PORTAIS.find(p => !state.done[p.key]);
      elProgressHint.textContent = nextPending ? `Próximo: ${nextPending.title}` : "";
    } else {
      elProgressLabel.textContent = `Tudo concluído! ${done}/${total} (100%)`;
      elProgressHint.textContent = "Gere o certificado →";
    }

    elProgressbar.classList.toggle("complete", done === total);
  }

  /* ============================================================
     Certificado
     ============================================================ */
  function openCertificate() {
    const name = (inName.value || "").trim() || "Colaborador(a)";
    certname.textContent = name;

    const doneCount = countDone();
    const total = PORTAIS.length;

    certstages.textContent = `${doneCount}/${total}`;
    certxp.textContent = String(state.xp);
    certdate.textContent = formatDateBR(new Date());

    const unlockedTitles = PORTAIS
      .filter(p => !!state.done[p.key])
      .map(p => p.title);

    const itemsText = unlockedTitles.length
      ? unlockedTitles.map((t, i) => `${i + 1}. ${t}`).join("\n")
      : "Nenhum item concluído.";

    certitems.textContent = itemsText;

    certwrap.classList.add("show");
    certwrap.setAttribute("aria-hidden", "false");
    toast("Certificado pronto. Você pode imprimir/salvar em PDF.");
  }

  function closeCertificate() {
    certwrap.classList.remove("show");
    certwrap.setAttribute("aria-hidden", "true");
  }

  /* ============================================================
     Estado / util
     ============================================================ */
  function freshState() {
    return {
      done: {},
      xp: 0,
      ui: { selectedPortalKey: "" }
    };
  }

  function hydrateState() {
    if (!state.done) state.done = {};
    if (typeof state.xp !== "number") state.xp = 0;
    if (!state.ui) state.ui = { selectedPortalKey: "" };
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
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch {}
  }

  function getSelectedPortal() {
    const key = state.ui.selectedPortalKey;
    if (!key) return null;
    return PORTAIS.find(p => p.key === key) || null;
  }

  function countDone() {
    return PORTAIS.filter(p => !!state.done[p.key]).length;
  }

  function computeLevel(xp) {
    const n = Math.floor(Number(xp || 0) / 40) + 1;
    return Math.max(1, Math.min(99, n));
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
    const p = getSelectedPortal();
    if (!p) return "Sonova Onboarding RH/DP – Nenhuma etapa selecionada.";

    const status = state.done[p.key] ? "CONCLUÍDO" : "PENDENTE";
    const link = p.url || "Sem link (siga o passo a passo)";

    const lines = [
      `SONOVA ONBOARDING RH/DP – ${p.title} (${status})`,
      p.sub,
      "",
      "Passo a passo:",
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
    clearTimeout(toast._to);
    toast._to = setTimeout(() => {
      toastEl.classList.remove("show");
      toastEl.setAttribute("aria-hidden", "true");
    }, 1800);
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
