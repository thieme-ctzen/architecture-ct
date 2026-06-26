(() => {
  const appEl = document.querySelector(".app");
  const sidebarEl = document.querySelector(".sidebar");
  const mainEl = document.querySelector(".main");
  const wrap = document.getElementById("wrap");
  const grid = document.getElementById("grid");
  const nodesLayer = document.getElementById("nodes");
  const svg = document.getElementById("svg");
  const toast = document.getElementById("toast");
  const search = document.getElementById("search");
  const canvasNameEl = document.getElementById("canvasName");

  const btnConnect = document.getElementById("btnConnect");
  const btnGrid = document.getElementById("btnGrid");
  const btnFlow = document.getElementById("btnFlow");
  const btnPreview = document.getElementById("btnPreview");
  const btnTemplate = document.getElementById("btnTemplate");
  const btnExport = document.getElementById("btnExport");
  const btnImport = document.getElementById("btnImport");
  const btnReset = document.getElementById("btnReset");
  const btnCenter = document.getElementById("btnCenter");
  const btnGenerateProject = document.getElementById("btnGenerateProject");
  const btnZoomIn = document.getElementById("btnZoomIn");
  const btnZoomOut = document.getElementById("btnZoomOut");
  const zoomPct = document.getElementById("zoomPct");
  const marqueeEl = document.getElementById("marquee");
  const previewPickEl = document.getElementById("previewPick");
  const textBar = document.getElementById("textBar");
  const tbText = document.getElementById("tbText");
  const tbDec = document.getElementById("tbDec");
  const tbInc = document.getElementById("tbInc");
  const tbFont = document.getElementById("tbFont");
  const tbColor = document.getElementById("tbColor");
  const tbAlign = document.getElementById("tbAlign");
  const tbAreaTitle = document.getElementById("tbAreaTitle");
  const tbAreaColor = document.getElementById("tbAreaColor");
  const tbAreaPattern = document.getElementById("tbAreaPattern");
  const tbAreaWidth = document.getElementById("tbAreaWidth");
  const tbAreaAnimate = document.getElementById("tbAreaAnimate");
  const tbAreaLock = document.getElementById("tbAreaLock");
  const btnSettings = document.getElementById("btnSettings");
  const btnSidebar = document.getElementById("btnSidebar");
  const nativeLaunchWrap = document.getElementById("nativeLaunchWrap");
  const nativePrimaryBtn = document.getElementById("nativePrimaryBtn");
  const nativeFlyout = document.getElementById("nativeFlyout");
  const nativeFlyoutArrow = document.getElementById("nativeFlyoutArrow");
  const featuresLaunchWrap = document.getElementById("featuresLaunchWrap");
  const featuresPrimaryBtn = document.getElementById("featuresPrimaryBtn");
  const featuresFlyout = document.getElementById("featuresFlyout");
  const featuresFlyoutArrow = document.getElementById("featuresFlyoutArrow");
  const settingsPanel = document.getElementById("settingsPanel");
  const cfgLineType = document.getElementById("cfgLineType");
  const cfgConnectorType = document.getElementById("cfgConnectorType");
  const cfgMarker = document.getElementById("cfgMarker");
  const cfgFlowDots = document.getElementById("cfgFlowDots");
  const cfgLineColor = document.getElementById("cfgLineColor");
  const cfgFlowColor = document.getElementById("cfgFlowColor");
  const cfgLanguage = document.getElementById("cfgLanguage");

  const modalBack = document.getElementById("modalBack");
  const previewBack = document.getElementById("previewBack");
  const tplBack = document.getElementById("tplBack");
  const exportBack = document.getElementById("exportBack");
  const importBack = document.getElementById("importBack");
  const projectBack = document.getElementById("projectBack");
  const btnClose = document.getElementById("btnClose");
  const btnPreviewClose = document.getElementById("btnPreviewClose");
  const btnTplClose = document.getElementById("btnTplClose");
  const btnExportClose = document.getElementById("btnExportClose");
  const btnExportCancel = document.getElementById("btnExportCancel");
  const btnExportApply = document.getElementById("btnExportApply");
  const exportFileNameInput = document.getElementById("exportFileNameInput");
  const btnImportClose = document.getElementById("btnImportClose");
  const btnImportCancel = document.getElementById("btnImportCancel");
  const btnImportApply = document.getElementById("btnImportApply");
  const btnProjectClose = document.getElementById("btnProjectClose");
  const btnProjectCancel = document.getElementById("btnProjectCancel");
  const btnProjectCreate = document.getElementById("btnProjectCreate");
  const btnTplPaste = document.getElementById("btnTplPaste");
  const tplList = document.getElementById("tplList");
  const importModeSwitch = document.getElementById("importModeSwitch");
  const importModePasteBtn = document.getElementById("importModePasteBtn");
  const importModeFileBtn = document.getElementById("importModeFileBtn");
  const importPastePanel = document.getElementById("importPastePanel");
  const importFilePanel = document.getElementById("importFilePanel");
  const importPasteArea = document.getElementById("importPasteArea");
  const importFileInput = document.getElementById("importFileInput");
  const importDropzone = document.getElementById("importDropzone");
  const importDropTitle = document.getElementById("importDropTitle");
  const importDropSubtitle = document.getElementById("importDropSubtitle");
  const importSelectedFile = document.getElementById("importSelectedFile");
  const btnDownloadPng = document.getElementById("btnDownloadPng");
  const btnDownloadPdf = document.getElementById("btnDownloadPdf");
  const previewImg = document.getElementById("previewImg");
  const fTitle = document.getElementById("fTitle");
  const fDesc = document.getElementById("fDesc");
  const fLogo = document.getElementById("fLogo");
  const fType = document.getElementById("fType");
  const btnSaveNode = document.getElementById("btnSaveNode");
  const btnDeleteNode = document.getElementById("btnDeleteNode");
  const pOverallChallenges = document.getElementById("pOverallChallenges");
  const pOverallGoals = document.getElementById("pOverallGoals");
  const pOverallExpectations = document.getElementById("pOverallExpectations");
  const pOverallL1 = document.getElementById("pOverallL1");
  const pOverallL2 = document.getElementById("pOverallL2");
  const pOverallL3 = document.getElementById("pOverallL3");
  const ctxMenu = document.getElementById("ctxMenu");
  const ctxCanvasMenu = document.getElementById("ctxCanvasMenu");
  const edgeTypeBar = document.getElementById("edgeTypeBar");
  if(btnImportApply) btnImportApply.disabled = true;

  // viewport pan+zoom
  let view = { x: 0, y: 0, z: 1 };
  let isPanning = false;
  let isMiddlePanning = false;
  let panStart = { x: 0, y: 0, vx: 0, vy: 0 };
  // flags
  let connectMode = true;
  let flowOn = true;
  let hoveredNodeId = null;

  // data
  let nodes = []; // {id, x,y,w,h, title, desc, type, icon, kind}
  let edges = []; // {id, from:{node,port}, to:{node,port}}
  let selected = { type:null, id:null }; // node|edge
  let selectedNodeIds = new Set();
  let connectFrom = null; // {nodeId, port}
  let connectDrag = null; // {from:{nodeId,port}, to:{x,y}, moved}
  let dragSolutionItem = null; // {nodeId, index}
  let marquee = null; // {x1,y1,x2,y2, append}
  let suppressWrapClick = false;
  let suppressNodeClick = false;
  let itemHistory = { undo: [], redo: [] };
  let actionHistory = { undo: [], redo: [] };
  let restoringHistory = false;
  let nativeFlyoutHoverTimer = null;
  let nativeFlyoutHideTimer = null;
  let nativeFlyoutPinned = false;
  let featuresFlyoutHoverTimer = null;
  let featuresFlyoutHideTimer = null;
  let featuresFlyoutPinned = false;
  const STORAGE_KEY = "clevertap_canvas_state_v3";
  const PROJECT_OVERALL_KEY = "clevertap_canvas_project_overall_v1";
  const SCHEMA_VERSION = 4;
  let persistTimer = null;
  let canvasName = "Diagrama CleverTap";
  let ctxTargetNodeId = null;
  let ctxClickPos = null;
  let edgeCfg = {
    connectorType: "curved",
    lineType: "dashed",
    marker: "arrow",
    flowDots: 2,
    lineColor: "#94a3b8",
    activeColor: "#ef4444",
    flowColor: "#2563eb"
  };

  // modal
  let editingNodeId = null;
  let previewDataUrl = "";
  let previewImageSize = { w:0, h:0 };
  let previewPickMode = false;
  let previewPickDrag = null;
  let selectedImportFile = null;
  let importMode = "paste";
  let html2canvasLoader = null;
  let jsPdfLoader = null;
  const DUP_ICON_URL = "https://www.pngall.com/wp-content/uploads/16/Black-Copy-Icon-PNG-Photos.png";
  const COMPACT_ICON_URL = "https://cdn-icons-png.flaticon.com/512/2223/2223714.png";
  const MAXIMIZE_ICON_URL = "https://cdn-icons-png.flaticon.com/512/8373/8373559.png";
  const TEMPLATE_LIBRARY_KEY = "clevertap_canvas_templates_v1";
  const DRIVE_PROJECT_WEBHOOK_URL = "";
  let projectOverallInfo = {
    challenges: "",
    businessGoals: "",
    expectations: "",
    l1: "",
    l2: "",
    l3: ""
  };
  const CLEVERTAP_ARQ_TEMPLATE = JSON.parse(String.raw`{
  "format": "clevertap.canvas-doc.v1",
  "schemaVersion": 1,
  "exportedAt": "2026-03-04T19:47:54.557Z",
  "canvas": {
    "view": {
      "x": 247.35918727332546,
      "y": 178.49611620004447,
      "z": 0.6836669506743931
    },
    "flowOn": true,
    "connectMode": true,
    "name": "Clevertap Arquitetura",
    "edgeCfg": {
      "connectorType": "curved",
      "lineType": "dashed",
      "marker": "arrow",
      "lineColor": "#d1d1d1",
      "activeColor": "#ef4444",
      "flowColor": "#eb2424"
    }
  },
  "indexes": {
    "nodeCount": 28,
    "edgeCount": 0,
    "nodeIds": [
      "n_e8698d52",
      "n_76f2698c",
      "n_07322311",
      "n_6aecb6a6",
      "n_9f068eef",
      "n_ef541179",
      "n_bde90527",
      "n_22f14357",
      "n_d179f91a",
      "n_2c161496",
      "n_46b76dad",
      "n_10a515fc",
      "n_f976045f",
      "n_a84b4160",
      "n_4d2b58d9",
      "n_d0494966",
      "n_652817e3",
      "n_55ac0e71",
      "n_dfa6e41e",
      "n_e810a2c3",
      "n_7af0f680",
      "n_ba413691",
      "n_a80c7530",
      "n_216fcc78",
      "n_350c3a4d",
      "n_0bc8b132",
      "n_a52fb00e",
      "n_941970f2"
    ],
    "edgeIds": []
  },
  "nodes": [
    {
      "id": "n_e8698d52",
      "nodeRef": "core:clever-ai:n_e8698d52",
      "order": 1,
      "kind": "Core",
      "variant": "organizer",
      "title": "Clever.AI",
      "position": { "x": -174, "y": 94 },
      "size": { "w": 1099, "h": 430, "userMinH": 430 },
      "style": {
        "type": "blue","icon": "ORG","logoUrl": "","stickyColor": "",
        "fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left",
        "solutionLayout": "pills","solutionLogo": "","stackCatalog": ""
      },
      "content": { "description": "","text": "","items": [],"orgOptions": ["Fonte de dados","Mecanismo de integração","Orquestrador","Canais de comunicação","Data Layer"],"stacks": [] }
    },
    {
      "id": "n_76f2698c","nodeRef": "solucao-ai:ai-agent:n_76f2698c","order": 2,"kind": "Solução AI","variant": "ai","title": "AI Agent",
      "position": { "x": 175, "y": 160 },"size": { "w": 368, "h": 345, "userMinH": 343 },
      "style": { "type": "blue","icon": "AI","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Agentes inteligentes para estratégia, decisão e ação.","text": "","items": ["Strategy Agents","Decision Agents","Creative Agents","Action Agents","IntelliNODE","Product Recommendations"],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_07322311","nodeRef": "solucao-ai:askai:n_07322311","order": 3,"kind": "Solução AI","variant": "ai","title": "AskAI",
      "position": { "x": -157, "y": 163 },"size": { "w": 331, "h": 260, "userMinH": 194 },
      "style": { "type": "blue","icon": "AI","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Camada de decisão e recomendação da jornada com AI.","text": "","items": ["Best Time to Deliver","Preferred Channel","Predictive Segmentation","Lifecycle Optmizer"],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_6aecb6a6","nodeRef": "solucao-ai:scribeai:n_6aecb6a6","order": 4,"kind": "Solução AI","variant": "ai","title": "ScribeAI",
      "position": { "x": 545, "y": 161 },"size": { "w": 360, "h": 291, "userMinH": 220 },
      "style": { "type": "blue","icon": "AI","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Assistente de conteúdo com AI generativa.","text": "","items": ["Copy Generation","Emotion Signals","Content Rewrite","Emotion Optimization","Channel Support"],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_9f068eef","nodeRef": "core:orquestrador:n_9f068eef","order": 5,"kind": "Core","variant": "organizer","title": "Orquestrador",
      "position": { "x": -175, "y": -363 },"size": { "w": 1093, "h": 449, "userMinH": 449 },
      "style": { "type": "blue","icon": "ORG","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "","text": "","items": [],"orgOptions": ["Fonte de dados","Mecanismo de integração","Orquestrador","Canais de comunicação","Data Layer","Clever.AI"],"stacks": [] }
    },
    {
      "id": "n_ef541179","nodeRef": "solucao:martech:n_ef541179","order": 6,"kind": "Solução","variant": "solution","title": "Martech",
      "position": { "x": -131, "y": -274 },"size": { "w": 302, "h": 326, "userMinH": 260 },
      "style": { "type": "red","icon": "M","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "","text": "","items": ["Experimentação","Campanhas batch","Native Display","Customer Journeys","Campanhas Real Time","Audiences","Hiperpersonalização"],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_bde90527","nodeRef": "solucao:segments:n_bde90527","order": 7,"kind": "Solução","variant": "solution","title": "Segments",
      "position": { "x": 549, "y": -279 },"size": { "w": 329, "h": 310, "userMinH": 310 },
      "style": { "type": "red","icon": "S","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "grid","solutionLogo": "","stackCatalog": "" },
      "content": {
        "description": "","text": "",
        "items": [
          { "icon": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Clock_icon.svg","label": "RFM","mono": false },
          { "icon": "https://marketplace.canva.com/XL6M0/MAEpMrXL6M0/1/tl/canva-clock-real-realtime-time-icon-icon-MAEpMrXL6M0.png","label": "Real-time","mono": false },
          { "icon": "https://cdn-icons-png.flaticon.com/512/5799/5799191.png","label": "Preditiva","mono": false },
          { "icon": "https://cdn-icons-png.flaticon.com/512/12282/12282281.png","label": "Psicográfica","mono": true },
          { "icon": "https://idecbrasil.com.br/wp-content/uploads/2025/03/processo-1.png","label": "Comportamental","mono": true }
        ],
        "orgOptions": [],"stacks": []
      }
    },
    {
      "id": "n_22f14357","nodeRef": "solucao:analytics:n_22f14357","order": 8,"kind": "Solução","variant": "solution","title": "Analytics",
      "position": { "x": 198, "y": -271 },"size": { "w": 324, "h": 314, "userMinH": 314 },
      "style": { "type": "red","icon": "A","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "","text": "","items": ["Drop offs","Desinstalações","Cortes de Retenção","Comportamental","Tendências","Impacto Real"],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_d179f91a","nodeRef": "core:mecanismo-de-integracao:n_d179f91a","order": 9,"kind": "Core","variant": "organizer","title": "Mecanismo de integração",
      "position": { "x": -536, "y": -362 },"size": { "w": 349, "h": 467, "userMinH": 467 },
      "style": { "type": "blue","icon": "ORG","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "","text": "","items": [],"orgOptions": ["Fonte de dados","Mecanismo de integração","Orquestrador","Canais de comunicação","Data Layer","Clever.AI"],"stacks": [] }
    },
    {
      "id": "n_2c161496","nodeRef": "integration:sdk:n_2c161496","order": 10,"kind": "Integration","variant": "default","title": "SDK",
      "position": { "x": -503, "y": -169 },"size": { "w": 280, "h": 122, "userMinH": 0 },
      "style": { "type": "blue","icon": "SDK","logoUrl": "https://icons.veryicon.com/png/o/miscellaneous/hekr/open-sdk-download.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Instrumentacao App/Web para coleta e mensageria.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_46b76dad","nodeRef": "integration:nativo:n_46b76dad","order": 11,"kind": "Integration","variant": "default","title": "Nativo",
      "position": { "x": -501, "y": -35 },"size": { "w": 280, "h": 105, "userMinH": 0 },
      "style": { "type": "blue","icon": "N","logoUrl": "https://images.icon-icons.com/3251/PNG/512/plug_connected_regular_icon_202791.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Capacidade nativa da plataforma (sem conector externo).","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_10a515fc","nodeRef": "integration:api:n_10a515fc","order": 12,"kind": "Integration","variant": "default","title": "API",
      "position": { "x": -503, "y": -283 },"size": { "w": 280, "h": 105, "userMinH": 0 },
      "style": { "type": "blue","icon": "API","logoUrl": "https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Conector server-to-server para eventos, perfis e integracoes.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_f976045f","nodeRef": "core:canais-de-comunicacao:n_f976045f","order": 13,"kind": "Core","variant": "organizer","title": "Canais de comunicação",
      "position": { "x": 931, "y": -364 },"size": { "w": 340, "h": 1109, "userMinH": 1109 },
      "style": { "type": "blue","icon": "ORG","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "","text": "","items": [],"orgOptions": ["Fonte de dados","Mecanismo de integração","Orquestrador","Canais de comunicação","Data Layer","Clever.AI"],"stacks": [] }
    },
    {
      "id": "n_a84b4160","nodeRef": "channel:app:n_a84b4160","order": 14,"kind": "Channel","variant": "stack","title": "App",
      "position": { "x": 960, "y": -280 },"size": { "w": 280, "h": 121, "userMinH": 0 },
      "style": { "type": "red","icon": "APP","logoUrl": "https://cdn-icons-png.flaticon.com/512/8766/8766948.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Push, In-App, App Inbox, Native Display.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_4d2b58d9","nodeRef": "channel:web:n_4d2b58d9","order": 15,"kind": "Channel","variant": "stack","title": "Web",
      "position": { "x": 961, "y": -154 },"size": { "w": 280, "h": 137, "userMinH": 0 },
      "style": { "type": "red","icon": "WEB","logoUrl": "https://cdn-icons-png.flaticon.com/512/5339/5339181.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Web Push, Pop-ups, Exit intent, Native Display.","text": "","items": [],"orgOptions": [],"stacks": [{ "id": "web-sdk","label": "Web SDK" }] }
    },
    {
      "id": "n_d0494966","nodeRef": "channel:email:n_d0494966","order": 16,"kind": "Channel","variant": "default","title": "Email",
      "position": { "x": 961, "y": 331 },"size": { "w": 280, "h": 105, "userMinH": 0 },
      "style": { "type": "red","icon": "EM","logoUrl": "https://static.vecteezy.com/system/resources/thumbnails/014/440/980/small/email-message-icon-design-in-blue-circle-png.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Campanhas e mensagens com HTML rico.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_652817e3","nodeRef": "channel:sms:n_652817e3","order": 17,"kind": "Channel","variant": "default","title": "SMS",
      "position": { "x": 961, "y": -13 },"size": { "w": 280, "h": 105, "userMinH": 0 },
      "style": { "type": "red","icon": "SMS","logoUrl": "https://cdn-icons-png.flaticon.com/512/733/733533.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Mensagens transacionais e promocionais.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_55ac0e71","nodeRef": "ads:facebook-ads:n_55ac0e71","order": 18,"kind": "Ads","variant": "default","title": "Facebook Ads",
      "position": { "x": 959, "y": 626 },"size": { "w": 280, "h": 92, "userMinH": 0 },
      "style": { "type": "red","icon": "FB","logoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/960px-2023_Facebook_icon.svg.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Export de audiencia para remarketing.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_dfa6e41e","nodeRef": "ads:tiktok-ads:n_dfa6e41e","order": 19,"kind": "Ads","variant": "default","title": "TikTok Ads",
      "position": { "x": 961, "y": 439 },"size": { "w": 280, "h": 92, "userMinH": 0 },
      "style": { "type": "red","icon": "TT","logoUrl": "https://www.oviond.com/wp-content/uploads/2023/06/tiktok-ads-icon.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Export de audiencia para remarketing.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_e810a2c3","nodeRef": "ads:google-ads:n_e810a2c3","order": 20,"kind": "Ads","variant": "default","title": "Google Ads",
      "position": { "x": 959, "y": 533 },"size": { "w": 280, "h": 92, "userMinH": 0 },
      "style": { "type": "red","icon": "GA","logoUrl": "https://static.vecteezy.com/system/resources/previews/042/712/671/non_2x/google-ads-icon-logo-symbol-free-png.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Export de audiencia para remarketing.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_7af0f680","nodeRef": "core:fonte-de-dados:n_7af0f680","order": 21,"kind": "Core","variant": "organizer","title": "Fonte de dados",
      "position": { "x": -535, "y": 113 },"size": { "w": 352, "h": 407, "userMinH": 407 },
      "style": { "type": "blue","icon": "ORG","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "","text": "","items": [],"orgOptions": ["Fonte de dados","Mecanismo de integração","Orquestrador","Canais de comunicação","Data Layer","Clever.AI"],"stacks": [] }
    },
    {
      "id": "n_ba413691","nodeRef": "data:data-lake:n_ba413691","order": 22,"kind": "Data","variant": "default","title": "Data Lake",
      "position": { "x": -502, "y": 296 },"size": { "w": 280, "h": 92, "userMinH": 0 },
      "style": { "type": "green","icon": "DL","logoUrl": "https://images.icon-icons.com/1502/PNG/512/officedatabase_103574.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Armazenamento bruto/historico.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_a80c7530","nodeRef": "data:data-warehouse:n_a80c7530","order": 23,"kind": "Data","variant": "default","title": "Data Warehouse",
      "position": { "x": -502, "y": 395 },"size": { "w": 280, "h": 92, "userMinH": 0 },
      "style": { "type": "green","icon": "DW","logoUrl": "https://images.icon-icons.com/1502/PNG/512/officedatabase_103574.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Camada analitica/BI e modelagem.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_216fcc78","nodeRef": "data:data-queue:n_216fcc78","order": 24,"kind": "Data","variant": "default","title": "Data Queue",
      "position": { "x": -502, "y": 196 },"size": { "w": 280, "h": 92, "userMinH": 0 },
      "style": { "type": "green","icon": "DQ","logoUrl": "https://images.icon-icons.com/1502/PNG/512/officedatabase_103574.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Streaming buffer/ingestao.","text": "","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_350c3a4d","nodeRef": "texto:texto-livre:n_350c3a4d","order": 25,"kind": "Texto","variant": "text","title": "Texto Livre",
      "position": { "x": 134, "y": -425 },"size": { "w": 220, "h": 61, "userMinH": 0 },
      "style": { "type": "gray","icon": "T","logoUrl": "","stickyColor": "","fontSize": 36,"fontFamily": "Verdana","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "","text": "Arquitetura da CleverTap","items": [],"orgOptions": [],"stacks": [] }
    },
    {
      "id": "n_0bc8b132","nodeRef": "solucao:tesseractdb:n_0bc8b132","order": 26,"kind": "Solução","variant": "solution","title": "TesseractDB™",
      "position": { "x": -173, "y": 530 },"size": { "w": 1095, "h": 211, "userMinH": 211 },
      "style": { "type": "red","icon": "T","logoUrl": "","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "tesseract","solutionLogo": "https://clevertap.com/wp-content/uploads/2024/03/Hyper-personalization-image.png","stackCatalog": "" },
      "content": {
        "description": "","text": "",
        "items": [
          { "icon": "https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png","label": "Retenção entre 3~10 anos" },
          { "icon": "https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png","label": "Escala e Performance" },
          { "icon": "https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png","label": "Dados em tempo real" },
          { "icon": "https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png","label": "Visão Unificada do Cliente" },
          { "icon": "https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png","label": "Redução de Custo e Complexidade" }
        ],
        "orgOptions": [],"stacks": []
      }
    },
    {
      "id": "n_a52fb00e","nodeRef": "channel:whatsapp:n_a52fb00e","order": 27,"kind": "Channel","variant": "stack","title": "WhatsApp",
      "position": { "x": 961, "y": 206 },"size": { "w": 280, "h": 121, "userMinH": 0 },
      "style": { "type": "red","icon": "WA","logoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/960px-WhatsApp.svg.png","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "whatsappProviders" },
      "content": { "description": "Canal conversacional (menu/flows/IA).","text": "","items": [],"orgOptions": [],"stacks": [{ "id": "direct","label": "Direct" }] }
    },
    {
      "id": "n_941970f2","nodeRef": "channel:rcs:n_941970f2","order": 28,"kind": "Channel","variant": "default","title": "RCS",
      "position": { "x": 961, "y": 97 },"size": { "w": 280, "h": 105, "userMinH": 0 },
      "style": { "type": "red","icon": "RCS","logoUrl": "https://avatars.githubusercontent.com/u/67345131?s=280&v=4","stickyColor": "","fontSize": 28,"fontFamily": "Georgia","color": "#1e293b","align": "left","solutionLayout": "pills","solutionLogo": "","stackCatalog": "" },
      "content": { "description": "Mensagens ricas (cards, botoes) via operadoras.","text": "","items": [],"orgOptions": [],"stacks": [] }
    }
  ],
  "edges": []
}`);
  const builtinCanvasTemplates = [
    {
      id: "clevertap-arquitetura",
      name: "Clevertap Arquitetura",
      description: "Template completo base da arquitetura CleverTap.",
      data: CLEVERTAP_ARQ_TEMPLATE
    }
  ];
  let customCanvasTemplates = [];
  let currentLanguage = "pt";
  let canvasNameI18n = null;
  let compactToggleAnim = null; // { nodeId, mode: "compact" | "expand" }
  let compactToggleAnimTimer = null;

  const LANGUAGES = ["pt", "es", "en"];
  const UI_MESSAGES = {
    pt: {
      hintHtml: `<b>Como conectar:</b> clique em qualquer ponto do bloco para usar o port mais próximo, ou arraste de um <b>port</b> para outro.<br><br><b>Atalhos:</b> apagar seleção <span class="kbd">Del</span> • editar bloco: <b>duplo clique</b> • multi seleção: <span class="kbd">Shift</span> + clique ou arraste no fundo • pan: arrastar fundo • zoom: <span class="kbd">Ctrl</span> + scroll`,
      searchPlaceholder: "Buscar blocos...",
      freeTextPlaceholder: "Digite aqui sua anotação...",
      stickyToolbarPlaceholder: "Duplo clique no sticky para editar o texto",
      importSelectFile: "Selecionar arquivo JSON",
      importPasteMode: "Colar JSON",
      importFileMode: "Arquivo",
      importDropTitle: "Arraste seu arquivo JSON aqui",
      importDropSubtitle: "ou clique para selecionar no computador",
      importSelectedFile: "Nenhum arquivo selecionado",
      importNoFile: "Selecione um arquivo JSON.",
      importFileSelected: "Arquivo selecionado: {name}",
      importJsonPlaceholder: "Cole o JSON exportado aqui...",
      templateJsonPrompt: "Cole aqui o JSON do template:",
      templateInvalid: "JSON de template inválido.",
      templateImported: "Template importado.",
      templateImportedDesc: "Template importado via JSON.",
      importJsonEmpty: "Cole um JSON para importar.",
      invalidJson: "JSON inválido.",
      invalidTemplate: "Template inválido.",
      templateApplied: `Template "{name}" aplicado.`,
      templateApplyConfirm: `Aplicar o template "{name}"? O canvas atual será substituído.`,
      layoutImported: "Layout importado.",
      languageChanged: "Idioma alterado para Português.",
      apply: "Aplicar",
      confirmReset: "Resetar tudo?",
      exportFileNameRequired: "Informe um nome de arquivo.",
      exportDownloaded: "Arquivo JSON exportado.",
      blockAdded: "Bloco adicionado. Duplo clique para editar."
    },
    es: {
      hintHtml: `<b>Cómo conectar:</b> haz clic en cualquier punto del bloque para usar el port más cercano, o arrastra de un <b>port</b> a otro.<br><br><b>Atajos:</b> borrar selección <span class="kbd">Del</span> • editar bloque: <b>doble clic</b> • selección múltiple: <span class="kbd">Shift</span> + clic o arrastra sobre el fondo • pan: arrastrar el fondo • zoom: <span class="kbd">Ctrl</span> + scroll`,
      searchPlaceholder: "Buscar bloques...",
      freeTextPlaceholder: "Escribe tu anotación aquí...",
      stickyToolbarPlaceholder: "Haz doble clic en la nota para editar el texto",
      importSelectFile: "Seleccionar archivo JSON",
      importPasteMode: "Pegar JSON",
      importFileMode: "Archivo",
      importDropTitle: "Arrastra tu archivo JSON aquí",
      importDropSubtitle: "o haz clic para elegirlo en tu ordenador",
      importSelectedFile: "Ningún archivo seleccionado",
      importNoFile: "Selecciona un archivo JSON.",
      importFileSelected: "Archivo seleccionado: {name}",
      importJsonPlaceholder: "Pega aquí el JSON exportado...",
      templateJsonPrompt: "Pega aquí el JSON de la plantilla:",
      templateInvalid: "JSON de plantilla inválido.",
      templateImported: "Plantilla importada.",
      templateImportedDesc: "Plantilla importada mediante JSON.",
      importJsonEmpty: "Pega un JSON para importar.",
      invalidJson: "JSON inválido.",
      invalidTemplate: "Plantilla inválida.",
      templateApplied: `Plantilla "{name}" aplicada.`,
      templateApplyConfirm: `¿Aplicar la plantilla "{name}"? El lienzo actual será reemplazado.`,
      layoutImported: "Diseño importado.",
      languageChanged: "Idioma cambiado a Español.",
      apply: "Aplicar",
      confirmReset: "¿Restablecer todo?",
      exportFileNameRequired: "Ingresa un nombre de archivo.",
      exportDownloaded: "Archivo JSON exportado.",
      blockAdded: "Bloque añadido. Haz doble clic para editar."
    },
    en: {
      hintHtml: `<b>How to connect:</b> click any point on a block to use the nearest port, or drag from one <b>port</b> to another.<br><br><b>Shortcuts:</b> delete selection <span class="kbd">Del</span> • edit block: <b>double click</b> • multi-select: <span class="kbd">Shift</span> + click or drag on the background • pan: drag background • zoom: <span class="kbd">Ctrl</span> + scroll`,
      searchPlaceholder: "Search blocks...",
      freeTextPlaceholder: "Type your note here...",
      stickyToolbarPlaceholder: "Double-click the sticky note to edit the text",
      importSelectFile: "Select JSON file",
      importPasteMode: "Paste JSON",
      importFileMode: "File",
      importDropTitle: "Drop your JSON file here",
      importDropSubtitle: "or click to browse your computer",
      importSelectedFile: "No file selected",
      importNoFile: "Select a JSON file.",
      importFileSelected: "Selected file: {name}",
      importJsonPlaceholder: "Paste the exported JSON here...",
      templateJsonPrompt: "Paste the template JSON here:",
      templateInvalid: "Invalid template JSON.",
      templateImported: "Template imported.",
      templateImportedDesc: "Template imported via JSON.",
      importJsonEmpty: "Paste a JSON payload to import.",
      invalidJson: "Invalid JSON.",
      invalidTemplate: "Invalid template.",
      templateApplied: `Template "{name}" applied.`,
      templateApplyConfirm: `Apply the template "{name}"? The current canvas will be replaced.`,
      layoutImported: "Layout imported.",
      languageChanged: "Language changed to English.",
      apply: "Apply",
      confirmReset: "Reset everything?",
      exportFileNameRequired: "Enter a file name.",
      exportDownloaded: "JSON file exported.",
      blockAdded: "Block added. Double-click to edit."
    }
  };
  const PHRASE_BUNDLES = [
    { pt:"Conectores de Integração", es:"Conectores de Integración", en:"Integration Connectors" },
    { pt:"Bloco Central", es:"Bloque Central", en:"Core Block" },
    { pt:"Canais", es:"Canales", en:"Channels" },
    { pt:"Conectores de Dados", es:"Conectores de Datos", en:"Data Connectors" },
    { pt:"Soluções CleverTap", es:"Soluciones CleverTap", en:"CleverTap Solutions" },
    { pt:"Profile", es:"Perfil", en:"Profile" },
    { pt:"Profile / CDP", es:"Perfil / CDP", en:"Profile / CDP" },
    { pt:"Visão de CDP do cliente", es:"Vista CDP del cliente", en:"Customer CDP view" },
    { pt:"Propriedades", es:"Propiedades", en:"Properties" },
    { pt:"Canais favoritos", es:"Canales favoritos", en:"Favorite channels" },
    { pt:"Eventos recentes", es:"Eventos recientes", en:"Recent events" },
    { pt:"Idade", es:"Edad", en:"Age" },
    { pt:"Cidade", es:"Ciudad", en:"City" },
    { pt:"Nascimento", es:"Nacimiento", en:"Birth date" },
    { pt:"Categoria favorita", es:"Categoría favorita", en:"Favorite category" },
    { pt:"34 anos", es:"34 años", en:"34 years old" },
    { pt:"Comprou produto", es:"Compró un producto", en:"Bought product" },
    { pt:"Viu página de oferta", es:"Vio la página de oferta", en:"Viewed offer page" },
    { pt:"Iniciou app", es:"Inició la app", en:"Started app" },
    { pt:"Abriu push", es:"Abrió un push", en:"Opened push" },
    { pt:"Clicou em campanha", es:"Hizo clic en una campaña", en:"Clicked campaign" },
    { pt:"Bloco de área", es:"Bloque de área", en:"Area block" },
    { pt:"Área pontilhada redimensionável", es:"Área punteada redimensionable", en:"Resizable dotted area" },
    { pt:"Adicionar Bloco de área aqui", es:"Añadir bloque de área aquí", en:"Add area block here" },
    { pt:"Nome da área", es:"Nombre del área", en:"Area name" },
    { pt:"Animar linha pontilhada", es:"Animar línea punteada", en:"Animate dotted line" },
    { pt:"Bloquear movimentação", es:"Bloquear movimiento", en:"Lock movement" },
    { pt:"Desbloquear movimentação", es:"Desbloquear movimiento", en:"Unlock movement" },
    { pt:"Espessura do pixel", es:"Grosor del píxel", en:"Pixel thickness" },
    { pt:"Anotações", es:"Anotaciones", en:"Notes" },
    { pt:"Texto Livre", es:"Texto Libre", en:"Free Text" },
    { pt:"Nota flutuante no canvas", es:"Nota flotante en el lienzo", en:"Floating note on the canvas" },
    { pt:"Sticky Note", es:"Nota adhesiva", en:"Sticky Note" },
    { pt:"Post-it colorido", es:"Nota adhesiva de color", en:"Colored sticky note" },
    { pt:"Arquitetura CleverTap", es:"Arquitectura CleverTap", en:"CleverTap Architecture" },
    { pt:"Diagrama CleverTap", es:"Diagrama CleverTap", en:"CleverTap Diagram" },
    { pt:"Templates", es:"Plantillas", en:"Templates" },
    { pt:"Export JSON", es:"Exportar JSON", en:"Export JSON" },
    { pt:"Nome do arquivo", es:"Nombre del archivo", en:"File name" },
    { pt:"Digite o nome do arquivo e siga para baixar o JSON.", es:"Escribe el nombre del archivo y sigue para descargar el JSON.", en:"Enter the file name and continue to download the JSON." },
    { pt:"Seguir", es:"Seguir", en:"Continue" },
    { pt:"Informe um nome de arquivo.", es:"Ingresa un nombre de archivo.", en:"Enter a file name." },
    { pt:"Import JSON", es:"Importar JSON", en:"Import JSON" },
    { pt:"Modo de importação", es:"Modo de importación", en:"Import mode" },
    { pt:"Colar JSON", es:"Pegar JSON", en:"Paste JSON" },
    { pt:"Arquivo", es:"Archivo", en:"File" },
    { pt:"Arquivo JSON", es:"Archivo JSON", en:"JSON file" },
    { pt:"Arraste seu arquivo JSON aqui", es:"Arrastra tu archivo JSON aquí", en:"Drop your JSON file here" },
    { pt:"ou clique para selecionar no computador", es:"o haz clic para elegirlo en tu ordenador", en:"or click to browse your computer" },
    { pt:"Nenhum arquivo selecionado", es:"Ningún archivo seleccionado", en:"No file selected" },
    { pt:"Reset", es:"Reiniciar", en:"Reset" },
    { pt:"Selecionar área", es:"Seleccionar área", en:"Select area" },
    { pt:"Centralizar", es:"Centrar", en:"Center" },
    { pt:"Gerar projeto", es:"Generar proyecto", en:"Generate project" },
    { pt:"Config Canva", es:"Configuración del lienzo", en:"Canvas Settings" },
    { pt:"Configurações", es:"Configuración", en:"Settings" },
    { pt:"Clique para renomear", es:"Haz clic para renombrar", en:"Click to rename" },
    { pt:"Expandir sidebar", es:"Expandir barra lateral", en:"Expand sidebar" },
    { pt:"Recolher sidebar", es:"Contraer barra lateral", en:"Collapse sidebar" },
    { pt:"Expandir seção", es:"Expandir sección", en:"Expand section" },
    { pt:"Recolher seção", es:"Contraer sección", en:"Collapse section" },
    { pt:"Tipo linha", es:"Tipo de línea", en:"Line type" },
    { pt:"Tracejada", es:"Trazada", en:"Dashed" },
    { pt:"Sólida", es:"Sólida", en:"Solid" },
    { pt:"Pontilhada", es:"Punteada", en:"Dotted" },
    { pt:"Conector", es:"Conector", en:"Connector" },
    { pt:"Livre", es:"Libre", en:"Free" },
    { pt:"Reto", es:"Recto", en:"Straight" },
    { pt:"Ponteiro", es:"Indicador", en:"Pointer" },
    { pt:"Seta", es:"Flecha", en:"Arrow" },
    { pt:"Ponto", es:"Punto", en:"Dot" },
    { pt:"Nenhum", es:"Ninguno", en:"None" },
    { pt:"Fluxo", es:"Flujo", en:"Flow" },
    { pt:"Flow", es:"Flow", en:"Flow" },
    { pt:"1 ponto", es:"1 punto", en:"1 dot" },
    { pt:"2 pontos", es:"2 puntos", en:"2 dots" },
    { pt:"3 pontos", es:"3 puntos", en:"3 dots" },
    { pt:"Cores", es:"Colores", en:"Colors" },
    { pt:"Linha", es:"Línea", en:"Line" },
    { pt:"Idioma", es:"Idioma", en:"Language" },
    { pt:"Editar Bloco", es:"Editar bloque", en:"Edit Block" },
    { pt:"Fechar", es:"Cerrar", en:"Close" },
    { pt:"Título", es:"Título", en:"Title" },
    { pt:"Tipo", es:"Tipo", en:"Type" },
    { pt:"Neutro", es:"Neutro", en:"Neutral" },
    { pt:"Canais/Martech", es:"Canales/Martech", en:"Channels/Martech" },
    { pt:"Core/Integração", es:"Core/Integración", en:"Core/Integration" },
    { pt:"Dados", es:"Datos", en:"Data" },
    { pt:"Descrição", es:"Descripción", en:"Description" },
    { pt:"Logo URL", es:"Logo URL", en:"Logo URL" },
    { pt:"Excluir", es:"Eliminar", en:"Delete" },
    { pt:"Salvar", es:"Guardar", en:"Save" },
    { pt:"Pré-visualização do Canvas", es:"Vista previa del lienzo", en:"Canvas Preview" },
    { pt:"Download PNG", es:"Descargar PNG", en:"Download PNG" },
    { pt:"Download PDF", es:"Descargar PDF", en:"Download PDF" },
    { pt:"Colar JSON Template", es:"Pegar JSON de plantilla", en:"Paste Template JSON" },
    { pt:"Cole o JSON exportado", es:"Pega el JSON exportado", en:"Paste the exported JSON" },
    { pt:"Diminuir fonte", es:"Disminuir fuente", en:"Decrease font" },
    { pt:"Aumentar fonte", es:"Aumentar fuente", en:"Increase font" },
    { pt:"Fonte", es:"Fuente", en:"Font" },
    { pt:"Cor", es:"Color", en:"Color" },
    { pt:"Alinhamento", es:"Alineación", en:"Alignment" },
    { pt:"Esq", es:"Izq", en:"Left" },
    { pt:"Centro", es:"Centro", en:"Center" },
    { pt:"Dir", es:"Der", en:"Right" },
    { pt:"Zoom out", es:"Alejar", en:"Zoom out" },
    { pt:"Zoom in", es:"Acercar", en:"Zoom in" },
    { pt:"Zoom porcentagem", es:"Porcentaje de zoom", en:"Zoom percentage" },
    { pt:"Cancelar", es:"Cancelar", en:"Cancel" },
    { pt:"Overall Information", es:"Información general", en:"Overall Information" },
    { pt:"Challenges - Current Situation", es:"Desafíos - situación actual", en:"Challenges - Current Situation" },
    { pt:"Business Goals", es:"Objetivos de negocio", en:"Business Goals" },
    { pt:"Expectations", es:"Expectativas", en:"Expectations" },
    { pt:"Adicionar Sticky Note aqui", es:"Añadir nota adhesiva aquí", en:"Add sticky note here" },
    { pt:"Adicionar Texto aqui", es:"Añadir texto aquí", en:"Add text here" },
    { pt:"Selecionar todos", es:"Seleccionar todo", en:"Select all" },
    { pt:"Centralizar tudo", es:"Centrar todo", en:"Center everything" },
    { pt:"Editar", es:"Editar", en:"Edit" },
    { pt:"Duplicar", es:"Duplicar", en:"Duplicate" },
    { pt:"Conectar daqui", es:"Conectar desde aquí", en:"Connect from here" },
    { pt:"Aplicar destaque de borda", es:"Aplicar resaltado de borde", en:"Apply border highlight" },
    { pt:"Remover destaque de borda", es:"Quitar resaltado de borde", en:"Remove border highlight" },
    { pt:"API", es:"API", en:"API" },
    { pt:"Server-to-server", es:"Servidor a servidor", en:"Server-to-server" },
    { pt:"SDK", es:"SDK", en:"SDK" },
    { pt:"App / Web", es:"App / Web", en:"App / Web" },
    { pt:"Nativo", es:"Nativo", en:"Native" },
    { pt:"Conector nativo", es:"Conector nativo", en:"Native connector" },
    { pt:"Conexões Nativas", es:"Conexiones Nativas", en:"Native Connections" },
    { pt:"Abrir conexões nativas", es:"Abrir conexiones nativas", en:"Open native connections" },
    { pt:"Abrir features", es:"Abrir features", en:"Open features" },
    { pt:"Integração interna", es:"Integración interna", en:"Internal integration" },
    { pt:"Conexão Nativa", es:"Conexión Nativa", en:"Native Connection" },
    { pt:"Analytics", es:"Analytics", en:"Analytics" },
    { pt:"Attribution", es:"Attribution", en:"Attribution" },
    { pt:"E-commerce", es:"E-commerce", en:"E-commerce" },
    { pt:"Cloud Storage", es:"Cloud Storage", en:"Cloud Storage" },
    { pt:"CDP", es:"CDP", en:"CDP" },
    { pt:"Manual", es:"Manual", en:"Manual" },
    { pt:"Operação assistida", es:"Operación asistida", en:"Assisted operation" },
    { pt:"Nome editável", es:"Nombre editable", en:"Editable name" },
    { pt:"Organizador", es:"Organizador", en:"Organizer" },
    { pt:"Container por categoria", es:"Contenedor por categoría", en:"Container by category" },
    { pt:"WhatsApp", es:"WhatsApp", en:"WhatsApp" },
    { pt:"Conversational", es:"Conversacional", en:"Conversational" },
    { pt:"RCS", es:"RCS", en:"RCS" },
    { pt:"Rich messaging", es:"Mensajería enriquecida", en:"Rich messaging" },
    { pt:"App", es:"App", en:"App" },
    { pt:"Push / In-App", es:"Push / In-App", en:"Push / In-App" },
    { pt:"Web", es:"Web", en:"Web" },
    { pt:"Web push / overlays", es:"Web push / overlays", en:"Web push / overlays" },
    { pt:"Email", es:"Email", en:"Email" },
    { pt:"HTML / templates", es:"HTML / plantillas", en:"HTML / templates" },
    { pt:"SMS", es:"SMS", en:"SMS" },
    { pt:"Transactional / promo", es:"Transaccional / promo", en:"Transactional / promo" },
    { pt:"Webhook", es:"Webhook", en:"Webhook" },
    { pt:"HTTP callbacks / automations", es:"Callbacks HTTP / automatizaciones", en:"HTTP callbacks / automations" },
    { pt:"Facebook Ads", es:"Facebook Ads", en:"Facebook Ads" },
    { pt:"TikTok Ads", es:"TikTok Ads", en:"TikTok Ads" },
    { pt:"Google Ads", es:"Google Ads", en:"Google Ads" },
    { pt:"Remarketing", es:"Remarketing", en:"Remarketing" },
    { pt:"Data Lake", es:"Data Lake", en:"Data Lake" },
    { pt:"Raw storage", es:"Almacenamiento raw", en:"Raw storage" },
    { pt:"Data Warehouse", es:"Data Warehouse", en:"Data Warehouse" },
    { pt:"BI / modelado", es:"BI / modelado", en:"BI / modeling" },
    { pt:"Data Queue", es:"Cola de datos", en:"Data Queue" },
    { pt:"Streaming buffer", es:"Búfer de streaming", en:"Streaming buffer" },
    { pt:"Martech", es:"Martech", en:"Martech" },
    { pt:"Segments", es:"Segments", en:"Segments" },
    { pt:"Analytics", es:"Analytics", en:"Analytics" },
    { pt:"Features", es:"Features", en:"Features" },
    { pt:"Events", es:"Events", en:"Events" },
    { pt:"User Properties", es:"User Properties", en:"User Properties" },
    { pt:"User Identity", es:"Identidad del usuario", en:"User Identity" },
    { pt:"Identity do usuário por Email, Telefone ou Custom ID.", es:"Identidad del usuario por Email, teléfono o Custom ID.", en:"User identity by Email, Phone or Custom ID." },
    { pt:"PII Encryption", es:"PII Encryption", en:"PII Encryption" },
    { pt:"Product Catalog", es:"Product Catalog", en:"Product Catalog" },
    { pt:"Recommendations", es:"Recommendations", en:"Recommendations" },
    { pt:"Hyper Personalization", es:"Hyper Personalization", en:"Hyper Personalization" },
    { pt:"Product Experiences", es:"Product Experiences", en:"Product Experiences" },
    { pt:"Promotions", es:"Promotions", en:"Promotions" },
    { pt:"TesseractDB™", es:"TesseractDB™", en:"TesseractDB™" },
    { pt:"ScribeAI", es:"ScribeAI", en:"ScribeAI" },
    { pt:"AskAI", es:"AskAI", en:"AskAI" },
    { pt:"AI Agent", es:"Agente de IA", en:"AI Agent" },
    { pt:"Addon CleverTap", es:"Addon CleverTap", en:"CleverTap Add-on" },
    { pt:"Bloco completo editável", es:"Bloque completamente editable", en:"Fully editable block" },
    { pt:"Bloco AI especial", es:"Bloque especial de IA", en:"Special AI block" },
    { pt:"Conector server-to-server para eventos, perfis e integracoes.", es:"Conector servidor a servidor para eventos, perfiles e integraciones.", en:"Server-to-server connector for events, profiles, and integrations." },
    { pt:"Instrumentacao App/Web para coleta e mensageria.", es:"Instrumentación App/Web para captura y mensajería.", en:"App/Web instrumentation for data capture and messaging." },
    { pt:"Capacidade nativa da plataforma (sem conector externo).", es:"Capacidad nativa de la plataforma (sin conector externo).", en:"Native platform capability (no external connector)." },
    { pt:"Plataforma de analytics com conexão nativa.", es:"Plataforma de analítica con conexión nativa.", en:"Analytics platform with native connection." },
    { pt:"Plataforma de atribuição com conexão nativa.", es:"Plataforma de atribución con conexión nativa.", en:"Attribution platform with native connection." },
    { pt:"Plataforma de e-commerce com conexão nativa.", es:"Plataforma de e-commerce con conexión nativa.", en:"E-commerce platform with native connection." },
    { pt:"Event routing / orchestration", es:"Enrutamiento / orquestación de eventos", en:"Event routing / orchestration" },
    { pt:"Object storage", es:"Almacenamiento de objetos", en:"Object storage" },
    { pt:"Cloud platform", es:"Plataforma en la nube", en:"Cloud platform" },
    { pt:"Cloud data warehouse", es:"Data warehouse en la nube", en:"Cloud data warehouse" },
    { pt:"Lakehouse / analytics", es:"Lakehouse / analítica", en:"Lakehouse / analytics" },
    { pt:"Analytics platform", es:"Plataforma de analítica", en:"Analytics platform" },
    { pt:"CDP com conexão nativa.", es:"CDP con conexión nativa.", en:"CDP with native connection." },
    { pt:"Operacao manual ou assistida, sem dependencia de API, SDK ou conector nativo.", es:"Operación manual o asistida, sin dependencia de API, SDK o conector nativo.", en:"Manual or assisted operation without API, SDK, or native connector dependency." },
    { pt:"Edite o nome e descreva a funcionalidade (ex.: Segmentacao, Journeys, Analytics).", es:"Edita el nombre y describe la funcionalidad (ej.: Segmentación, Journeys, Analytics).", en:"Edit the name and describe the functionality (e.g. Segmentation, Journeys, Analytics)." },
    { pt:"Fonte de dados", es:"Fuente de datos", en:"Data source" },
    { pt:"Mecanismo de integração", es:"Mecanismo de integración", en:"Integration mechanism" },
    { pt:"Orquestrador", es:"Orquestador", en:"Orchestrator" },
    { pt:"Canais de comunicação", es:"Canales de comunicación", en:"Communication channels" },
    { pt:"Data Layer", es:"Capa de datos", en:"Data Layer" },
    { pt:"Clever.AI", es:"Clever.AI", en:"Clever.AI" },
    { pt:"Canal conversacional (menu/flows/IA).", es:"Canal conversacional (menú/flows/IA).", en:"Conversational channel (menus/flows/AI)." },
    { pt:"Mensagens ricas (cards, botoes) via operadoras.", es:"Mensajes enriquecidos (cards, botones) vía operadoras.", en:"Rich messages (cards, buttons) via carriers." },
    { pt:"Push, In-App, App Inbox, Native Display.", es:"Push, In-App, App Inbox, Native Display.", en:"Push, In-App, App Inbox, Native Display." },
    { pt:"Web Push, Pop-ups, Exit intent, Native Display.", es:"Web Push, Pop-ups, Exit intent, Native Display.", en:"Web Push, Pop-ups, Exit intent, Native Display." },
    { pt:"Campanhas e mensagens com HTML rico.", es:"Campañas y mensajes con HTML enriquecido.", en:"Campaigns and messages with rich HTML." },
    { pt:"Mensagens transacionais e promocionais.", es:"Mensajes transaccionales y promocionales.", en:"Transactional and promotional messages." },
    { pt:"Export de audiencia para remarketing.", es:"Exportación de audiencia para remarketing.", en:"Audience export for remarketing." },
    { pt:"Armazenamento bruto/historico.", es:"Almacenamiento bruto/histórico.", en:"Raw and historical storage." },
    { pt:"Camada analitica/BI e modelagem.", es:"Capa analítica/BI y modelado.", en:"Analytics/BI and modeling layer." },
    { pt:"Streaming buffer/ingestao.", es:"Buffer de streaming/ingestión.", en:"Streaming buffer/ingestion." },
    { pt:"Assistente de conteúdo com AI generativa.", es:"Asistente de contenido con IA generativa.", en:"Generative AI content assistant." },
    { pt:"Camada de decisão e recomendação da jornada com AI.", es:"Capa de decisión y recomendación del journey con IA.", en:"Journey decision and recommendation layer with AI." },
    { pt:"Agentes inteligentes para estratégia, decisão e ação.", es:"Agentes inteligentes para estrategia, decisión y acción.", en:"Intelligent agents for strategy, decision, and action." },
    { pt:"Personalização remota e testes A/B.", es:"Personalización remota y pruebas A/B.", en:"Remote personalization and A/B testing." },
    { pt:"Experimentação", es:"Experimentación", en:"Experimentation" },
    { pt:"Campanhas batch", es:"Campañas batch", en:"Batch campaigns" },
    { pt:"Native Display", es:"Native Display", en:"Native Display" },
    { pt:"Customer Journeys", es:"Customer Journeys", en:"Customer Journeys" },
    { pt:"Campanhas Real Time", es:"Campañas en tiempo real", en:"Real-time campaigns" },
    { pt:"Audiences", es:"Audiencias", en:"Audiences" },
    { pt:"Hiperpersonalização", es:"Hiperpersonalización", en:"Hyper-personalization" },
    { pt:"RFM", es:"RFM", en:"RFM" },
    { pt:"Real-time", es:"Tiempo real", en:"Real-time" },
    { pt:"Preditiva", es:"Predictiva", en:"Predictive" },
    { pt:"Psicográfica", es:"Psicográfica", en:"Psychographic" },
    { pt:"Comportamental", es:"Conductual", en:"Behavioral" },
    { pt:"Drop offs", es:"Abandonos", en:"Drop-offs" },
    { pt:"Desinstalações", es:"Desinstalaciones", en:"Uninstalls" },
    { pt:"Cortes de Retenção", es:"Cohortes de retención", en:"Retention cohorts" },
    { pt:"Tendências", es:"Tendencias", en:"Trends" },
    { pt:"Impacto Real", es:"Impacto real", en:"Real impact" },
    { pt:"Copy Generation", es:"Generación de copies", en:"Copy Generation" },
    { pt:"Emotion Signals", es:"Señales emocionales", en:"Emotion Signals" },
    { pt:"Content Rewrite", es:"Reescritura de contenido", en:"Content Rewrite" },
    { pt:"Emotion Optimization", es:"Optimización por emoción", en:"Emotion Optimization" },
    { pt:"Channel Support", es:"Canales compatibles", en:"Channel Support" },
    { pt:"Best Time to Deliver", es:"Mejor momento para enviar", en:"Best Time to Deliver" },
    { pt:"Preferred Channel", es:"Canal preferido", en:"Preferred Channel" },
    { pt:"Predictive Segmentation", es:"Segmentación predictiva", en:"Predictive Segmentation" },
    { pt:"Lifecycle Optmizer", es:"Optimizador del ciclo de vida", en:"Lifecycle Optimizer" },
    { pt:"Strategy Agents", es:"Agentes de estrategia", en:"Strategy Agents" },
    { pt:"Decision Agents", es:"Agentes de decisión", en:"Decision Agents" },
    { pt:"Creative Agents", es:"Agentes creativos", en:"Creative Agents" },
    { pt:"Action Agents", es:"Agentes de acción", en:"Action Agents" },
    { pt:"IntelliNODE", es:"IntelliNODE", en:"IntelliNODE" },
    { pt:"Product Recommendations", es:"Recomendaciones de producto", en:"Product Recommendations" },
    { pt:"Promo Campaigns", es:"Promo Campaigns", en:"Promo Campaigns" },
    { pt:"Carteira de fidelidade", es:"Billetera de fidelidad", en:"Loyalty Wallet" },
    { pt:"Cupons", es:"Cupones", en:"Coupons" },
    { pt:"Vouchers de parceiros", es:"Vouchers de socios", en:"Partner Vouchers" },
    { pt:"Custom Rewards", es:"Custom Rewards", en:"Custom Rewards" },
    { pt:"Retenção entre 3~10 anos", es:"Retención entre 3~10 años", en:"3-10 year retention" },
    { pt:"Escala e Performance", es:"Escala y rendimiento", en:"Scale and performance" },
    { pt:"Dados em tempo real", es:"Datos en tiempo real", en:"Real-time data" },
    { pt:"Visão Unificada do Cliente", es:"Visión unificada del cliente", en:"Unified customer view" },
    { pt:"Redução de Custo e Complexidade", es:"Reducción de costo y complejidad", en:"Reduced cost and complexity" },
    { pt:"Digite aqui sua anotação...", es:"Escribe tu anotación aquí...", en:"Type your note here..." },
    { pt:"Clique para editar...", es:"Haz doble clic para editar...", en:"Double-click to edit..." },
    { pt:"Arquitetura da CleverTap", es:"Arquitectura de CleverTap", en:"CleverTap Architecture" }
  ];
  const PHRASE_INDEX = new Map();
  for(const entry of PHRASE_BUNDLES){
    for(const lang of LANGUAGES){
      const raw = (entry[lang] || "").toString().trim();
      if(!raw) continue;
      const norm = raw
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      if(norm) PHRASE_INDEX.set(norm, entry);
    }
  }

  const uid = () => Math.random().toString(16).slice(2,10);
  const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
  const screenPxToWorld = (px)=> px / Math.max(view.z, 0.0001);
  const worldToScreen = (wx, wy)=> ({ x: wx * view.z + view.x, y: wy * view.z + view.y });
  const STICKY_MIN_W = 160;
  const STICKY_MAX_W = 560;
  const STICKY_MIN_H = 80;
  const STICKY_MAX_H = 560;
  const STICKY_DEFAULT_TEXT = "Clique para editar...";
  const STICKY_DEFAULT_FONT = 14;

  function normalizeI18nText(value){
    return (value || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }
  function t(key, vars = {}){
    let template = UI_MESSAGES[currentLanguage]?.[key] ?? UI_MESSAGES.pt?.[key] ?? key;
    for(const [name, value] of Object.entries(vars)){
      template = template.replaceAll(`{${name}}`, String(value ?? ""));
    }
    return template;
  }
  function findPhraseBundle(value){
    return PHRASE_INDEX.get(normalizeI18nText(value)) || null;
  }
  function translateKnownPhrase(value, targetLanguage = currentLanguage){
    const bundle = findPhraseBundle(value);
    if(bundle) return bundle[targetLanguage] || bundle.pt || value;
    return (value || "").toString();
  }
  function buildLocalizedStringRecord(value){
    const text = (value || "").toString();
    const bundle = findPhraseBundle(text);
    if(bundle){
      return {
        pt: bundle.pt || text,
        es: bundle.es || bundle.pt || text,
        en: bundle.en || bundle.pt || text
      };
    }
    return { pt: text, es: text, en: text };
  }
  function itemLabels(items){
    return Array.isArray(items)
      ? items.map((item)=> typeof item === "string" ? item : (item?.label || ""))
      : [];
  }
  function buildLocalizedListRecord(items){
    const labels = itemLabels(items);
    const out = { pt: [], es: [], en: [] };
    for(const label of labels){
      const bundle = findPhraseBundle(label);
      if(bundle){
        out.pt.push(bundle.pt || label);
        out.es.push(bundle.es || bundle.pt || label);
        out.en.push(bundle.en || bundle.pt || label);
      } else {
        out.pt.push(label);
        out.es.push(label);
        out.en.push(label);
      }
    }
    return out;
  }
  function applyLabelsToItems(items, labels){
    if(!Array.isArray(items)) return [];
    return items.map((item, index)=>{
      const nextLabel = labels[index] ?? (typeof item === "string" ? item : (item?.label || ""));
      return typeof item === "string" ? nextLabel : { ...(item || {}), label: nextLabel };
    });
  }
  function ensureNodeI18n(node){
    if(!node || typeof node !== "object") return;
    if(!node.i18n || typeof node.i18n !== "object") node.i18n = {};
    if(!node.i18n.title || typeof node.i18n.title !== "object") node.i18n.title = buildLocalizedStringRecord(node.title || "");
    if(!node.i18n.desc || typeof node.i18n.desc !== "object") node.i18n.desc = buildLocalizedStringRecord(node.desc || "");
    if(!node.i18n.text || typeof node.i18n.text !== "object") node.i18n.text = buildLocalizedStringRecord(node.text || "");
    if(!node.i18n.items || typeof node.i18n.items !== "object") node.i18n.items = buildLocalizedListRecord(node.items || []);
    if(!node.i18n.orgOptions || typeof node.i18n.orgOptions !== "object") node.i18n.orgOptions = buildLocalizedListRecord(node.orgOptions || []);
  }
  function snapshotNodeLanguage(node, lang = currentLanguage){
    if(!node) return;
    ensureNodeI18n(node);
    node.i18n.title[lang] = (node.title || "").toString();
    node.i18n.desc[lang] = (node.desc || "").toString();
    node.i18n.text[lang] = (node.text || "").toString();
    node.i18n.items[lang] = itemLabels(node.items).slice();
    node.i18n.orgOptions[lang] = Array.isArray(node.orgOptions) ? [...node.orgOptions] : [];
  }
  function applyNodeLanguage(node, lang = currentLanguage){
    if(!node) return;
    ensureNodeI18n(node);
    node.title = (node.i18n.title[lang] ?? node.title ?? "").toString();
    node.desc = (node.i18n.desc[lang] ?? node.desc ?? "").toString();
    node.text = (node.i18n.text[lang] ?? node.text ?? "").toString();
    if(Array.isArray(node.items)){
      const labels = Array.isArray(node.i18n.items[lang]) ? node.i18n.items[lang] : itemLabels(node.items);
      node.items = applyLabelsToItems(node.items, labels);
    }
    if(Array.isArray(node.orgOptions)){
      const opts = Array.isArray(node.i18n.orgOptions[lang]) ? node.i18n.orgOptions[lang] : node.orgOptions;
      node.orgOptions = [...opts];
    }
  }
  function ensureCanvasNameI18n(){
    if(!canvasNameI18n || typeof canvasNameI18n !== "object"){
      canvasNameI18n = buildLocalizedStringRecord(canvasName || "Diagrama CleverTap");
    }
  }
  function snapshotCanvasLanguage(lang = currentLanguage){
    ensureCanvasNameI18n();
    canvasNameI18n[lang] = (canvasName || "").toString();
    nodes.forEach((node)=> snapshotNodeLanguage(node, lang));
  }
  function setButtonCopy(key, title, subtitle = ""){
    const btn = document.querySelector(`[data-add="${key}"]`);
    if(!btn) return;
    const titleEl = btn.querySelector(".txt > div");
    const subtitleEl = btn.querySelector(".txt > span");
    if(titleEl) titleEl.textContent = title;
    if(subtitleEl) subtitleEl.textContent = subtitle;
  }
  function applyLanguageToUI(){
    const sectionTitles = document.querySelectorAll(".sidebar .section .hd h2");
    if(sectionTitles[0]) sectionTitles[0].textContent = translateKnownPhrase("Conectores de Integração");
    if(sectionTitles[1]) sectionTitles[1].textContent = translateKnownPhrase("Bloco Central");
    if(sectionTitles[2]) sectionTitles[2].textContent = translateKnownPhrase("Canais");
    if(sectionTitles[3]) sectionTitles[3].textContent = translateKnownPhrase("Conectores de Dados");
    if(sectionTitles[4]) sectionTitles[4].textContent = translateKnownPhrase("Soluções CleverTap");
    if(sectionTitles[5]) sectionTitles[5].textContent = translateKnownPhrase("Bloco de área");
    const brandTitle = document.querySelector(".brand h1");
    const nativeFlyoutHead = document.getElementById("nativeFlyoutHead");
    const featuresFlyoutHead = document.getElementById("featuresFlyoutHead");
    if(brandTitle) brandTitle.textContent = translateKnownPhrase("Arquitetura CleverTap");
    if(nativeFlyoutHead) nativeFlyoutHead.textContent = translateKnownPhrase("Conexões Nativas");
    if(featuresFlyoutHead) featuresFlyoutHead.textContent = translateKnownPhrase("Features");
    document.querySelectorAll("[data-native-group]").forEach((groupEl)=>{
      const label = groupEl.getAttribute("data-native-group") || "";
      if(label) groupEl.textContent = translateKnownPhrase(label);
    });
    document.querySelectorAll(".secToggle").forEach((toggle)=>{
      const expanded = toggle.getAttribute("aria-expanded") !== "false";
      toggle.title = expanded ? translateKnownPhrase("Recolher seção") : translateKnownPhrase("Expandir seção");
    });
    setButtonCopy("integration:api", translateKnownPhrase("API"), translateKnownPhrase("Server-to-server"));
    setButtonCopy("integration:sdk", translateKnownPhrase("SDK"), translateKnownPhrase("App / Web"));
    setButtonCopy("integration:native", translateKnownPhrase("Nativo"), translateKnownPhrase("Integração interna"));
    setButtonCopy("native:connector", translateKnownPhrase("Conector nativo"), translateKnownPhrase("Integração interna"));
    setButtonCopy("native:amplitude", translateKnownPhrase("Amplitude"), translateKnownPhrase("Analytics"));
    setButtonCopy("native:mixpanel", translateKnownPhrase("Mixpanel"), translateKnownPhrase("Analytics"));
    setButtonCopy("native:posthog", translateKnownPhrase("PostHog"), translateKnownPhrase("Analytics"));
    setButtonCopy("native:adjust", translateKnownPhrase("Adjust"), translateKnownPhrase("Attribution"));
    setButtonCopy("native:airbridge", translateKnownPhrase("Airbridge"), translateKnownPhrase("Attribution"));
    setButtonCopy("native:appsflyer", translateKnownPhrase("AppsFlyer"), translateKnownPhrase("Attribution"));
    setButtonCopy("native:apptrove", translateKnownPhrase("AppTrove"), translateKnownPhrase("Attribution"));
    setButtonCopy("native:branch", translateKnownPhrase("Branch"), translateKnownPhrase("Attribution"));
    setButtonCopy("native:singular", translateKnownPhrase("Singular"), translateKnownPhrase("Attribution"));
    setButtonCopy("native:shopify", translateKnownPhrase("Shopify"), translateKnownPhrase("E-commerce"));
    setButtonCopy("native:vtex", translateKnownPhrase("VTEX"), translateKnownPhrase("E-commerce"));
    setButtonCopy("native:eventbridge", translateKnownPhrase("Amazon EventBridge"), translateKnownPhrase("Event routing / orchestration"));
    setButtonCopy("native:s3", translateKnownPhrase("AWS S3"), translateKnownPhrase("Object storage"));
    setButtonCopy("native:gcp", translateKnownPhrase("Google Cloud Platform"), translateKnownPhrase("Cloud platform"));
    setButtonCopy("native:azure", translateKnownPhrase("Microsoft Azure"), translateKnownPhrase("Cloud platform"));
    setButtonCopy("native:bigquery", translateKnownPhrase("BigQuery"), translateKnownPhrase("Cloud data warehouse"));
    setButtonCopy("native:snowflake", translateKnownPhrase("SnowFlake"), translateKnownPhrase("Cloud data warehouse"));
    setButtonCopy("native:databricks", translateKnownPhrase("Databricks"), translateKnownPhrase("Lakehouse / analytics"));
    setButtonCopy("native:redshift", translateKnownPhrase("Amazon Redshift"), translateKnownPhrase("Cloud data warehouse"));
    setButtonCopy("native:fabric", translateKnownPhrase("Microsoft Fabric"), translateKnownPhrase("Analytics platform"));
    setButtonCopy("native:hightouch", translateKnownPhrase("High Touch"), translateKnownPhrase("CDP"));
    setButtonCopy("native:segment", translateKnownPhrase("Segment"), translateKnownPhrase("CDP"));
    setButtonCopy("native:rudderstack", translateKnownPhrase("RudderStack"), translateKnownPhrase("CDP"));
    setButtonCopy("native:census", translateKnownPhrase("Census"), translateKnownPhrase("CDP"));
    setButtonCopy("native:boltic", translateKnownPhrase("Boltic"), translateKnownPhrase("CDP"));
    setButtonCopy("native:mparticle", translateKnownPhrase("mParticle"), translateKnownPhrase("CDP"));
    setButtonCopy("native:treasuredata", translateKnownPhrase("Treasure Data"), translateKnownPhrase("CDP"));
    setButtonCopy("integration:manual", translateKnownPhrase("Manual"), translateKnownPhrase("Operação assistida"));
    setButtonCopy("core:central", translateKnownPhrase("Bloco Central"), translateKnownPhrase("Nome editável"));
    setButtonCopy("core:organizer", translateKnownPhrase("Organizador"), translateKnownPhrase("Container por categoria"));
    setButtonCopy("channel:whatsapp", translateKnownPhrase("WhatsApp"), translateKnownPhrase("Conversational"));
    setButtonCopy("channel:rcs", translateKnownPhrase("RCS"), translateKnownPhrase("Rich messaging"));
    setButtonCopy("channel:app", translateKnownPhrase("App"), translateKnownPhrase("Push / In-App"));
    setButtonCopy("channel:web", translateKnownPhrase("Web"), translateKnownPhrase("Web push / overlays"));
    setButtonCopy("channel:email", translateKnownPhrase("Email"), translateKnownPhrase("HTML / templates"));
    setButtonCopy("channel:sms", translateKnownPhrase("SMS"), translateKnownPhrase("Transactional / promo"));
    setButtonCopy("channel:webhook", translateKnownPhrase("Webhook"), translateKnownPhrase("HTTP callbacks / automations"));
    setButtonCopy("channel:fbads", translateKnownPhrase("Facebook Ads"), translateKnownPhrase("Remarketing"));
    setButtonCopy("channel:tiktok", translateKnownPhrase("TikTok Ads"), translateKnownPhrase("Remarketing"));
    setButtonCopy("channel:gads", translateKnownPhrase("Google Ads"), translateKnownPhrase("Remarketing"));
    setButtonCopy("data:datalake", translateKnownPhrase("Data Lake"), translateKnownPhrase("Raw storage"));
    setButtonCopy("data:warehouse", translateKnownPhrase("Data Warehouse"), translateKnownPhrase("BI / modelado"));
    setButtonCopy("data:queue", translateKnownPhrase("Data Queue"), translateKnownPhrase("Streaming buffer"));
    setButtonCopy("solution:martech", translateKnownPhrase("Martech"), translateKnownPhrase("Bloco completo editável"));
    setButtonCopy("solution:profile", translateKnownPhrase("Profile"), translateKnownPhrase("Visão de CDP do cliente"));
    setButtonCopy("solution:segments", translateKnownPhrase("Segments"), translateKnownPhrase("Bloco completo editável"));
    setButtonCopy("solution:analytics", translateKnownPhrase("Analytics"), translateKnownPhrase("Bloco completo editável"));
    setButtonCopy("solution:features", translateKnownPhrase("Features"), translateKnownPhrase("Bloco completo editável"));
    setButtonCopy("solution:events", translateKnownPhrase("Events"), translateKnownPhrase("Features"));
    setButtonCopy("solution:userproperties", translateKnownPhrase("User Properties"), translateKnownPhrase("Features"));
    setButtonCopy("solution:useridentity", translateKnownPhrase("User Identity"), translateKnownPhrase("Identity do usuário por Email, Telefone ou Custom ID."));
    setButtonCopy("solution:piiencryption", translateKnownPhrase("PII Encryption"), translateKnownPhrase("Features"));
    setButtonCopy("solution:productcatalog", translateKnownPhrase("Product Catalog"), translateKnownPhrase("Features"));
    setButtonCopy("solution:recommendations", translateKnownPhrase("Recommendations"), translateKnownPhrase("Features"));
    setButtonCopy("solution:hyperpersonalization", translateKnownPhrase("Hyper Personalization"), translateKnownPhrase("Features"));
    setButtonCopy("solution:productexperiences", translateKnownPhrase("Product Experiences"), translateKnownPhrase("Addon CleverTap"));
    setButtonCopy("solution:promotions", translateKnownPhrase("Promotions"), translateKnownPhrase("Addon CleverTap"));
    setButtonCopy("solution:tesseractdbtm", translateKnownPhrase("TesseractDB™"), translateKnownPhrase("Bloco completo editável"));
    setButtonCopy("solution:scribeai", translateKnownPhrase("ScribeAI"), translateKnownPhrase("Bloco AI especial"));
    setButtonCopy("solution:askai", translateKnownPhrase("AskAI"), translateKnownPhrase("Bloco AI especial"));
    setButtonCopy("solution:agentai", translateKnownPhrase("AI Agent"), translateKnownPhrase("Bloco AI especial"));
    setButtonCopy("text:note", translateKnownPhrase("Texto Livre"), translateKnownPhrase("Nota flutuante no canvas"));
    setButtonCopy("text:sticky", translateKnownPhrase("Sticky Note"), translateKnownPhrase("Post-it colorido"));
    setButtonCopy("general:area", translateKnownPhrase("Bloco de área"), translateKnownPhrase("Área pontilhada redimensionável"));
    if(nativeFlyoutArrow) nativeFlyoutArrow.setAttribute("aria-label", translateKnownPhrase("Abrir conexões nativas"));
    if(featuresFlyoutArrow) featuresFlyoutArrow.setAttribute("aria-label", translateKnownPhrase("Abrir features"));
    if(btnTemplate) btnTemplate.textContent = translateKnownPhrase("Templates");
    if(btnExport) btnExport.textContent = translateKnownPhrase("Export JSON");
    if(btnImport) btnImport.textContent = translateKnownPhrase("Import JSON");
    if(btnReset) btnReset.textContent = translateKnownPhrase("Reset");
    if(search) search.placeholder = t("searchPlaceholder");
    if(btnPreview) btnPreview.textContent = translateKnownPhrase("Selecionar área");
    if(btnCenter) btnCenter.textContent = translateKnownPhrase("Centralizar");
    if(btnGenerateProject) btnGenerateProject.textContent = translateKnownPhrase("Gerar projeto");
    if(canvasNameEl){
      canvasNameEl.title = translateKnownPhrase("Clique para renomear");
      canvasNameEl.setAttribute("aria-label", translateKnownPhrase("Clique para renomear"));
    }
    if(btnSettings) btnSettings.title = translateKnownPhrase("Configurações");
    if(btnSidebar){
      btnSidebar.title = appEl?.classList.contains("sidebar-collapsed")
        ? translateKnownPhrase("Expandir sidebar")
        : translateKnownPhrase("Recolher sidebar");
      btnSidebar.setAttribute("aria-label", btnSidebar.title);
    }
    const settingsLabels = settingsPanel?.querySelectorAll(".settingsRow label");
    if(settingsLabels?.[0]) settingsLabels[0].textContent = translateKnownPhrase("Config Canva");
    if(settingsLabels?.[1]) settingsLabels[1].textContent = translateKnownPhrase("Tipo linha");
    if(settingsLabels?.[2]) settingsLabels[2].textContent = translateKnownPhrase("Conector");
    if(settingsLabels?.[3]) settingsLabels[3].textContent = translateKnownPhrase("Ponteiro");
    if(settingsLabels?.[4]) settingsLabels[4].textContent = translateKnownPhrase("Fluxo");
    if(settingsLabels?.[5]) settingsLabels[5].textContent = translateKnownPhrase("Cores");
    if(settingsLabels?.[6]) settingsLabels[6].textContent = translateKnownPhrase("Idioma");
    if(cfgLineType){
      const opts = cfgLineType.querySelectorAll("option");
      if(opts[0]) opts[0].textContent = translateKnownPhrase("Tracejada");
      if(opts[1]) opts[1].textContent = translateKnownPhrase("Sólida");
      if(opts[2]) opts[2].textContent = translateKnownPhrase("Pontilhada");
    }
    if(cfgConnectorType){
      const opts = cfgConnectorType.querySelectorAll("option");
      if(opts[0]) opts[0].textContent = translateKnownPhrase("Livre");
      if(opts[1]) opts[1].textContent = translateKnownPhrase("Reto");
    }
    if(tbAreaPattern){
      const opts = tbAreaPattern.querySelectorAll("option");
      if(opts[0]) opts[0].textContent = translateKnownPhrase("Pontilhada");
      if(opts[1]) opts[1].textContent = translateKnownPhrase("Tracejada");
      if(opts[2]) opts[2].textContent = translateKnownPhrase("Sólida");
    }
    if(cfgMarker){
      const opts = cfgMarker.querySelectorAll("option");
      if(opts[0]) opts[0].textContent = translateKnownPhrase("Seta");
      if(opts[1]) opts[1].textContent = translateKnownPhrase("Ponto");
      if(opts[2]) opts[2].textContent = translateKnownPhrase("Nenhum");
    }
    if(cfgFlowDots){
      const opts = cfgFlowDots.querySelectorAll("option");
      if(opts[0]) opts[0].textContent = translateKnownPhrase("1 ponto");
      if(opts[1]) opts[1].textContent = translateKnownPhrase("2 pontos");
      if(opts[2]) opts[2].textContent = translateKnownPhrase("3 pontos");
    }
    const colorRefs = settingsPanel?.querySelectorAll(".colorRef");
    if(colorRefs?.[0]) colorRefs[0].textContent = translateKnownPhrase("Linha");
    if(colorRefs?.[1]) colorRefs[1].textContent = translateKnownPhrase("Flow");
    if(cfgLineColor) cfgLineColor.title = translateKnownPhrase("Linha");
    if(cfgFlowColor) cfgFlowColor.title = translateKnownPhrase("Flow");
    if(cfgLanguage){
      const opts = cfgLanguage.querySelectorAll("option");
      if(opts[0]) opts[0].textContent = "Português";
      if(opts[1]) opts[1].textContent = "Español";
      if(opts[2]) opts[2].textContent = "English";
    }
    if(tbText && !tbText.disabled) tbText.placeholder = t("freeTextPlaceholder");
    if(tbDec) tbDec.title = translateKnownPhrase("Diminuir fonte");
    if(tbInc) tbInc.title = translateKnownPhrase("Aumentar fonte");
    if(tbFont) tbFont.title = translateKnownPhrase("Fonte");
    if(tbColor) tbColor.title = translateKnownPhrase("Cor");
    if(tbAlign){
      tbAlign.title = translateKnownPhrase("Alinhamento");
      const opts = tbAlign.querySelectorAll("option");
      if(opts[0]) opts[0].textContent = translateKnownPhrase("Esq");
      if(opts[1]) opts[1].textContent = translateKnownPhrase("Centro");
      if(opts[2]) opts[2].textContent = translateKnownPhrase("Dir");
    }
    if(btnZoomOut) btnZoomOut.title = translateKnownPhrase("Zoom out");
    if(btnZoomIn) btnZoomIn.title = translateKnownPhrase("Zoom in");
    if(zoomPct){
      zoomPct.title = translateKnownPhrase("Zoom porcentagem");
      zoomPct.setAttribute("aria-label", translateKnownPhrase("Zoom porcentagem"));
    }
    const hint = document.querySelector(".hint");
    if(hint) hint.innerHTML = t("hintHtml");
    const editTitle = modalBack?.querySelector(".mh h3");
    if(editTitle) editTitle.textContent = translateKnownPhrase("Editar Bloco");
    if(btnClose) btnClose.textContent = `${translateKnownPhrase("Fechar")} X`;
    if(fTitle){
      const label = fTitle.closest(".row")?.querySelector("label");
      if(label) label.textContent = translateKnownPhrase("Título");
      fTitle.placeholder = "Ex: Motor de Segmentação";
    }
    if(fType){
      const label = fType.closest(".row")?.querySelector("label");
      if(label) label.textContent = translateKnownPhrase("Tipo");
      const opts = fType.querySelectorAll("option");
      if(opts[0]) opts[0].textContent = translateKnownPhrase("Neutro");
      if(opts[1]) opts[1].textContent = translateKnownPhrase("Canais/Martech");
      if(opts[2]) opts[2].textContent = translateKnownPhrase("Core/Integração");
      if(opts[3]) opts[3].textContent = translateKnownPhrase("Dados");
    }
    if(fDesc){
      const label = fDesc.closest(".row")?.querySelector("label");
      if(label) label.textContent = translateKnownPhrase("Descrição");
    }
    if(fLogo){
      const label = fLogo.closest(".row")?.querySelector("label");
      if(label) label.textContent = translateKnownPhrase("Logo URL");
    }
    if(btnDeleteNode) btnDeleteNode.textContent = translateKnownPhrase("Excluir");
    if(btnSaveNode) btnSaveNode.textContent = translateKnownPhrase("Salvar");
    const previewTitle = previewBack?.querySelector(".mh h3");
    if(previewTitle) previewTitle.textContent = translateKnownPhrase("Pré-visualização do Canvas");
    if(btnPreviewClose) btnPreviewClose.textContent = translateKnownPhrase("Fechar");
    if(btnDownloadPng) btnDownloadPng.textContent = translateKnownPhrase("Download PNG");
    if(btnDownloadPdf) btnDownloadPdf.textContent = translateKnownPhrase("Download PDF");
    const templateTitle = tplBack?.querySelector(".mh h3");
    if(templateTitle) templateTitle.textContent = translateKnownPhrase("Templates");
    if(btnTplClose) btnTplClose.textContent = translateKnownPhrase("Fechar");
    if(btnTplPaste) btnTplPaste.textContent = translateKnownPhrase("Colar JSON Template");
    const exportTitle = exportBack?.querySelector(".mh h3");
    if(exportTitle) exportTitle.textContent = translateKnownPhrase("Export JSON");
    if(btnExportClose) btnExportClose.textContent = translateKnownPhrase("Fechar");
    const exportLabel = exportFileNameInput?.closest(".row")?.querySelector("label");
    if(exportLabel) exportLabel.textContent = translateKnownPhrase("Nome do arquivo");
    if(exportFileNameInput) exportFileNameInput.placeholder = "clevertap-canvas";
    const exportHint = exportBack?.querySelector(".importSelectedFile");
    if(exportHint) exportHint.textContent = translateKnownPhrase("Digite o nome do arquivo e siga para baixar o JSON.");
    if(btnExportCancel) btnExportCancel.textContent = translateKnownPhrase("Cancelar");
    if(btnExportApply) btnExportApply.textContent = translateKnownPhrase("Seguir");
    const importTitle = importBack?.querySelector(".mh h3");
    if(importTitle) importTitle.textContent = translateKnownPhrase("Import JSON");
    if(btnImportClose) btnImportClose.textContent = translateKnownPhrase("Fechar");
    const importModeLabel = importModeSwitch?.closest(".row")?.querySelector("label");
    if(importModeLabel) importModeLabel.textContent = translateKnownPhrase("Modo de importação");
    if(importModePasteBtn) importModePasteBtn.textContent = translateKnownPhrase("Colar JSON");
    if(importModeFileBtn) importModeFileBtn.textContent = translateKnownPhrase("Arquivo");
    const importLabel = importDropzone?.closest(".row")?.querySelector("label");
    if(importLabel) importLabel.textContent = translateKnownPhrase("Arquivo JSON");
    if(importDropTitle) importDropTitle.textContent = translateKnownPhrase("Arraste seu arquivo JSON aqui");
    if(importDropSubtitle) importDropSubtitle.textContent = translateKnownPhrase("ou clique para selecionar no computador");
    if(importPasteArea) importPasteArea.placeholder = t("importJsonPlaceholder");
    if(importSelectedFile){
      importSelectedFile.textContent = selectedImportFile
        ? t("importFileSelected", { name: selectedImportFile.name || "arquivo.json" })
        : translateKnownPhrase("Nenhum arquivo selecionado");
    }
    if(btnImportCancel) btnImportCancel.textContent = translateKnownPhrase("Cancelar");
    if(btnImportApply) btnImportApply.textContent = translateKnownPhrase("Import JSON");
    const projectTitle = projectBack?.querySelector(".mh h3");
    if(projectTitle) projectTitle.textContent = translateKnownPhrase("Overall Information");
    if(btnProjectClose) btnProjectClose.textContent = translateKnownPhrase("Fechar");
    if(btnProjectCancel) btnProjectCancel.textContent = translateKnownPhrase("Cancelar");
    if(btnProjectCreate) btnProjectCreate.textContent = translateKnownPhrase("Gerar projeto");
    const overallChallengesLabel = pOverallChallenges?.closest(".row")?.querySelector("label");
    const overallGoalsLabel = pOverallGoals?.closest(".row")?.querySelector("label");
    const overallExpectationsLabel = pOverallExpectations?.closest(".row")?.querySelector("label");
    if(overallChallengesLabel) overallChallengesLabel.textContent = translateKnownPhrase("Challenges - Current Situation");
    if(overallGoalsLabel) overallGoalsLabel.textContent = translateKnownPhrase("Business Goals");
    if(overallExpectationsLabel) overallExpectationsLabel.textContent = translateKnownPhrase("Expectations");
    if(ctxMenu){
      const edit = document.getElementById("ctx-edit");
      const dup = document.getElementById("ctx-dup");
      const connect = document.getElementById("ctx-connect");
      const highlight = document.getElementById("ctx-highlight");
      const del = document.getElementById("ctx-del");
      if(edit) edit.textContent = translateKnownPhrase("Editar");
      if(dup) dup.textContent = translateKnownPhrase("Duplicar");
      if(connect) connect.textContent = translateKnownPhrase("Conectar daqui");
      if(highlight && !ctxTargetNodeId) highlight.textContent = translateKnownPhrase("Aplicar destaque de borda");
      if(del) del.textContent = `✕ ${translateKnownPhrase("Excluir")}`;
    }
    const ctxAddNote = document.getElementById("ctx-addNote");
    const ctxAddArea = document.getElementById("ctx-addArea");
    const ctxAddText = document.getElementById("ctx-addText");
    const ctxSelectAll = document.getElementById("ctx-selectAll");
    const ctxFitAll = document.getElementById("ctx-fitAll");
    if(ctxAddNote) ctxAddNote.textContent = translateKnownPhrase("Adicionar Sticky Note aqui");
    if(ctxAddArea) ctxAddArea.textContent = translateKnownPhrase("Adicionar Bloco de área aqui");
    if(ctxAddText) ctxAddText.textContent = translateKnownPhrase("Adicionar Texto aqui");
    if(ctxSelectAll) ctxSelectAll.textContent = translateKnownPhrase("Selecionar todos");
    if(ctxFitAll) ctxFitAll.textContent = translateKnownPhrase("Centralizar tudo");
  }
  function applyCurrentLanguage(){
    ensureCanvasNameI18n();
    canvasName = (canvasNameI18n[currentLanguage] ?? canvasName ?? "").toString();
    if(canvasNameEl) canvasNameEl.textContent = canvasName;
    nodes.forEach((node)=> applyNodeLanguage(node, currentLanguage));
    applyLanguageToUI();
    refreshTextBar();
    refreshSettingsUI();
  }
  function setLanguage(lang, options = {}){
    const target = LANGUAGES.includes(lang) ? lang : "pt";
    if(!options.skipSnapshot) snapshotCanvasLanguage(currentLanguage);
    currentLanguage = target;
    if(cfgLanguage) cfgLanguage.value = currentLanguage;
    applyCurrentLanguage();
    if(!options.silent) showToast(t("languageChanged"));
    if(options.render !== false) render();
  }

  function compactToggleButtonHtml(node){
    const isCompact = !!node?.compact;
    const title = isCompact ? "Expandir bloco" : "Minimizar bloco";
    const alt = isCompact ? "Expandir" : "Minimizar";
    const iconUrl = isCompact ? MAXIMIZE_ICON_URL : COMPACT_ICON_URL;
    return `<button class="nact comp compactToggle" type="button" title="${title}" aria-label="${title}"><img src="${iconUrl}" alt="${alt}" /></button>`;
  }

  function defaultFontSizeForVariant(variant){
    return variant === "sticky" ? STICKY_DEFAULT_FONT : 28;
  }

  function isConnectableNode(node){
    if(!node) return false;
    return node.variant !== "text"
      && node.variant !== "sticky"
      && node.variant !== "area"
      && node.variant !== "profile";
  }

  function firstSelectedNodeId(){
    const it = selectedNodeIds.values().next();
    return it.done ? null : it.value;
  }
  function syncSingleSelection(){
    if(selectedNodeIds.size === 1){
      selected = { type:"node", id:firstSelectedNodeId() };
    } else if(selected.type === "node"){
      selected = { type:null, id:null };
    }
  }
  function clearNodeSelection(){
    selectedNodeIds.clear();
    if(selected.type === "node") selected = { type:null, id:null };
  }
  function setSingleNodeSelection(id){
    selectedNodeIds = new Set([id]);
    selected = { type:"node", id };
  }
  function toggleNodeInSelection(id){
    if(selectedNodeIds.has(id)) selectedNodeIds.delete(id);
    else selectedNodeIds.add(id);
    syncSingleSelection();
  }
  function nodeBounds(n){
    const el = nodesLayer.querySelector(`.node[data-id="${n.id}"]`);
    const fallbackH = (n.variant === "solution" || n.variant === "organizer" || n.variant === "ai")
      ? Math.max(n.h || 0, n.userMinH || 180, 180)
      : Math.max(n.h || 92, 92);
    const w = (n.variant === "text" || n.variant === "sticky")
      ? (el?.offsetWidth || n.w || (n.variant === "sticky" ? 200 : 220))
      : (n.w || el?.offsetWidth || 280);
    const h = (n.variant === "text" || n.variant === "sticky")
      ? (el?.offsetHeight || n.h || (n.variant === "sticky" ? 80 : 56))
      : (el?.offsetHeight || fallbackH);
    return { x:n.x, y:n.y, w:Math.max(1,w), h:Math.max(1,h) };
  }
  function allNodesBounds(){
    if(!nodes.length) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for(const n of nodes){
      const b = nodeBounds(n);
      minX = Math.min(minX, b.x);
      minY = Math.min(minY, b.y);
      maxX = Math.max(maxX, b.x + b.w);
      maxY = Math.max(maxY, b.y + b.h);
    }
    if(!Number.isFinite(minX)) return null;
    return { minX, minY, maxX, maxY, w:maxX-minX, h:maxY-minY };
  }
  function fitViewToContent(pad = 56){
    const bounds = allNodesBounds();
    if(!bounds){
      view = { x:0, y:0, z:1 };
      setTransform();
      render();
      return;
    }
    const ww = wrap.clientWidth;
    const wh = wrap.clientHeight;
    const availW = Math.max(80, ww - pad * 2);
    const availH = Math.max(80, wh - pad * 2);
    const zFit = clamp(Math.min(availW / Math.max(bounds.w, 1), availH / Math.max(bounds.h, 1)), 0.35, 2.2);
    view.z = zFit;
    view.x = (ww - bounds.w * zFit) / 2 - bounds.minX * zFit;
    view.y = (wh - bounds.h * zFit) / 2 - bounds.minY * zFit;
    setTransform();
    render();
  }
  function setZoom(nextZ, anchorClientX, anchorClientY){
    const z = clamp(nextZ, 0.35, 2.2);
    const r = wrap.getBoundingClientRect();
    const lx = (anchorClientX ?? (r.left + r.width / 2)) - r.left;
    const ly = (anchorClientY ?? (r.top + r.height / 2)) - r.top;
    const wx = (lx - view.x) / view.z;
    const wy = (ly - view.y) / view.z;
    view.z = z;
    view.x = lx - wx * view.z;
    view.y = ly - wy * view.z;
    setTransform();
  }
  function updateZoomLabel(){
    if(zoomPct) zoomPct.value = `${Math.round(view.z * 100)}%`;
  }
  function touchDistance(t1, t2){
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.hypot(dx, dy);
  }
  function touchMidpoint(t1, t2){
    return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
  }
  function applyZoomFromInput(){
    if(!zoomPct) return;
    const raw = (zoomPct.value || "").replace(",", ".").replace("%", "").trim();
    const pct = Number(raw);
    if(!Number.isFinite(pct)){
      updateZoomLabel();
      return;
    }
    setZoom(pct / 100);
    updateZoomLabel();
  }
  function showMarqueeRect(rect){
    if(!marqueeEl) return;
    marqueeEl.style.display = "block";
    marqueeEl.style.left = `${rect.x}px`;
    marqueeEl.style.top = `${rect.y}px`;
    marqueeEl.style.width = `${rect.w}px`;
    marqueeEl.style.height = `${rect.h}px`;
  }
  function hideMarquee(){
    if(!marqueeEl) return;
    marqueeEl.style.display = "none";
  }
  function applyMarqueeSelection(mq){
    const x1 = Math.min(mq.x1, mq.x2);
    const y1 = Math.min(mq.y1, mq.y2);
    const x2 = Math.max(mq.x1, mq.x2);
    const y2 = Math.max(mq.y1, mq.y2);
    if(!mq.append) selectedNodeIds.clear();
    for(const n of nodes){
      const b = nodeBounds(n);
      const intersects = !(b.x + b.w < x1 || b.x > x2 || b.y + b.h < y1 || b.y > y2);
      if(intersects) selectedNodeIds.add(n.id);
    }
    syncSingleSelection();
  }
  function computeOverlapIds(){
    const ids = new Set();
    for(let i = 0; i < nodes.length; i++){
      const a = nodes[i];
      if(a.variant === "text" || a.variant === "sticky" || a.variant === "organizer" || a.variant === "area") continue;
      const ab = nodeBounds(a);
      for(let j = i + 1; j < nodes.length; j++){
        const b = nodes[j];
        if(b.variant === "text" || b.variant === "sticky" || b.variant === "organizer" || b.variant === "area") continue;
        const bb = nodeBounds(b);
        const overlap = !(ab.x + ab.w <= bb.x || ab.x >= bb.x + bb.w || ab.y + ab.h <= bb.y || ab.y >= bb.y + bb.h);
        if(overlap){
          ids.add(a.id);
          ids.add(b.id);
        }
      }
    }
    return ids;
  }
  function showToast(msg){
    positionToastBelowHeader();
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=>toast.classList.remove("show"), 1600);
  }
  function positionToastBelowHeader(){
    if(!toast || !wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const topbarEl = mainEl?.querySelector(".topbar");
    if(!topbarEl){
      toast.style.top = "14px";
      return;
    }
    const topbarRect = topbarEl.getBoundingClientRect();
    const top = Math.max(14, Math.round(topbarRect.bottom - wrapRect.top + 8));
    toast.style.top = `${top}px`;
  }
  function clearNativeFlyoutTimers(){
    if(nativeFlyoutHoverTimer){
      clearTimeout(nativeFlyoutHoverTimer);
      nativeFlyoutHoverTimer = null;
    }
    if(nativeFlyoutHideTimer){
      clearTimeout(nativeFlyoutHideTimer);
      nativeFlyoutHideTimer = null;
    }
  }
  function clearFeaturesFlyoutTimers(){
    if(featuresFlyoutHoverTimer){
      clearTimeout(featuresFlyoutHoverTimer);
      featuresFlyoutHoverTimer = null;
    }
    if(featuresFlyoutHideTimer){
      clearTimeout(featuresFlyoutHideTimer);
      featuresFlyoutHideTimer = null;
    }
  }
  function positionNativeFlyout(){
    if(!nativeFlyout || !sidebarEl || !nativeLaunchWrap) return;
    const sidebarRect = sidebarEl.getBoundingClientRect();
    const anchorRect = nativeLaunchWrap.getBoundingClientRect();
    const panelRect = nativeFlyout.getBoundingClientRect();
    let nextLeft = sidebarRect.right + 10;
    let nextTop = anchorRect.top - 2;
    if(nextLeft + panelRect.width > window.innerWidth - 12){
      nextLeft = Math.max(12, window.innerWidth - panelRect.width - 12);
    }
    if(nextTop + panelRect.height > window.innerHeight - 12){
      nextTop = Math.max(68, window.innerHeight - panelRect.height - 12);
    }
    nativeFlyout.style.left = `${Math.round(nextLeft)}px`;
    nativeFlyout.style.top = `${Math.round(nextTop)}px`;
  }
  function positionFeaturesFlyout(){
    if(!featuresFlyout || !sidebarEl || !featuresLaunchWrap) return;
    const sidebarRect = sidebarEl.getBoundingClientRect();
    const anchorRect = featuresLaunchWrap.getBoundingClientRect();
    const panelRect = featuresFlyout.getBoundingClientRect();
    let nextLeft = sidebarRect.right + 10;
    let nextTop = anchorRect.top - 2;
    if(nextLeft + panelRect.width > window.innerWidth - 12){
      nextLeft = Math.max(12, window.innerWidth - panelRect.width - 12);
    }
    if(nextTop + panelRect.height > window.innerHeight - 12){
      nextTop = Math.max(68, window.innerHeight - panelRect.height - 12);
    }
    featuresFlyout.style.left = `${Math.round(nextLeft)}px`;
    featuresFlyout.style.top = `${Math.round(nextTop)}px`;
  }
  function openNativeFlyout({ pinned = false } = {}){
    if(!nativeFlyout || !nativeFlyoutArrow) return;
    closeFeaturesFlyout({ force:true });
    if(pinned) nativeFlyoutPinned = true;
    nativeFlyout.classList.add("open");
    nativeFlyout.setAttribute("aria-hidden", "false");
    nativeFlyoutArrow.setAttribute("aria-expanded", "true");
    requestAnimationFrame(positionNativeFlyout);
  }
  function closeNativeFlyout({ force = false } = {}){
    if(!nativeFlyout || !nativeFlyoutArrow) return;
    if(!force && nativeFlyoutPinned) return;
    nativeFlyoutPinned = false;
    clearNativeFlyoutTimers();
    nativeFlyout.classList.remove("open");
    nativeFlyout.setAttribute("aria-hidden", "true");
    nativeFlyoutArrow.setAttribute("aria-expanded", "false");
  }
  function openFeaturesFlyout({ pinned = false } = {}){
    if(!featuresFlyout || !featuresFlyoutArrow) return;
    closeNativeFlyout({ force:true });
    if(pinned) featuresFlyoutPinned = true;
    featuresFlyout.classList.add("open");
    featuresFlyout.setAttribute("aria-hidden", "false");
    featuresFlyoutArrow.setAttribute("aria-expanded", "true");
    requestAnimationFrame(positionFeaturesFlyout);
  }
  function closeFeaturesFlyout({ force = false } = {}){
    if(!featuresFlyout || !featuresFlyoutArrow) return;
    if(!force && featuresFlyoutPinned) return;
    featuresFlyoutPinned = false;
    clearFeaturesFlyoutTimers();
    featuresFlyout.classList.remove("open");
    featuresFlyout.setAttribute("aria-hidden", "true");
    featuresFlyoutArrow.setAttribute("aria-expanded", "false");
  }
  function scheduleNativeFlyoutHoverOpen(){
    if(!nativeFlyout || appEl?.classList.contains("sidebar-collapsed")) return;
    if(nativeFlyout.classList.contains("open")) return;
    if(nativeFlyoutHoverTimer) clearTimeout(nativeFlyoutHoverTimer);
    nativeFlyoutHoverTimer = setTimeout(()=>{
      nativeFlyoutPinned = false;
      openNativeFlyout();
      nativeFlyoutHoverTimer = null;
    }, 1000);
  }
  function scheduleNativeFlyoutClose(){
    if(nativeFlyoutHideTimer) clearTimeout(nativeFlyoutHideTimer);
    nativeFlyoutHideTimer = setTimeout(()=>{
      closeNativeFlyout({ force: !nativeFlyoutPinned });
      nativeFlyoutHideTimer = null;
    }, 220);
  }
  function scheduleFeaturesFlyoutHoverOpen(){
    if(!featuresFlyout || appEl?.classList.contains("sidebar-collapsed")) return;
    if(featuresFlyout.classList.contains("open")) return;
    if(featuresFlyoutHoverTimer) clearTimeout(featuresFlyoutHoverTimer);
    featuresFlyoutHoverTimer = setTimeout(()=>{
      featuresFlyoutPinned = false;
      openFeaturesFlyout();
      featuresFlyoutHoverTimer = null;
    }, 1000);
  }
  function scheduleFeaturesFlyoutClose(){
    if(featuresFlyoutHideTimer) clearTimeout(featuresFlyoutHideTimer);
    featuresFlyoutHideTimer = setTimeout(()=>{
      closeFeaturesFlyout({ force: !featuresFlyoutPinned });
      featuresFlyoutHideTimer = null;
    }, 220);
  }
  function setSidebarCollapsed(collapsed){
    if(collapsed){
      closeNativeFlyout({ force:true });
      closeFeaturesFlyout({ force:true });
    }
    appEl?.classList.toggle("sidebar-collapsed", collapsed);
    if(btnSidebar){
      btnSidebar.setAttribute("aria-expanded", collapsed ? "false" : "true");
      btnSidebar.title = collapsed
        ? translateKnownPhrase("Expandir sidebar")
        : translateKnownPhrase("Recolher sidebar");
      btnSidebar.setAttribute("aria-label", btnSidebar.title);
    }
  }
  function openCtxMenu(menu, x, y){
    if(!menu) return;
    ctxMenu?.classList.remove("open");
    ctxCanvasMenu?.classList.remove("open");
    ctxMenu?.setAttribute("aria-hidden", "true");
    ctxCanvasMenu?.setAttribute("aria-hidden", "true");
    const margin = 8;
    const mw = 220;
    const mh = 180;
    const px = Math.min(x, window.innerWidth - mw - margin);
    const py = Math.min(y, window.innerHeight - mh - margin);
    menu.style.left = `${Math.max(margin, px)}px`;
    menu.style.top = `${Math.max(margin, py)}px`;
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
  }
  function closeAllCtxMenus(){
    ctxMenu?.classList.remove("open");
    ctxCanvasMenu?.classList.remove("open");
    ctxMenu?.setAttribute("aria-hidden", "true");
    ctxCanvasMenu?.setAttribute("aria-hidden", "true");
    ctxTargetNodeId = null;
  }
  function hideEdgeTypeBar(){
    if(!edgeTypeBar) return;
    edgeTypeBar.style.display = "none";
    edgeTypeBar.innerHTML = "";
  }
  function syncResponsiveUi(){
    appEl?.classList.remove("touch-ui", "mobile-ui");
  }
  function getClientPoint(e){
    if(typeof e.clientX === "number" && typeof e.clientY === "number"){
      return { x: e.clientX, y: e.clientY };
    }
    return { x: 0, y: 0 };
  }
  function setTransform(){
    nodesLayer.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.z})`;
    svg.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.z})`;
    const step = 28;
    const gx = ((view.x % step) + step) % step;
    const gy = ((view.y % step) + step) % step;
    grid.style.backgroundPosition = `${gx}px ${gy}px`;
    updateZoomLabel();
    queuePersist();
  }

  function startMiddlePan(e){
    if(e.button !== 1) return;
    e.preventDefault();
    e.stopPropagation();
    connectFrom = null;
    isMiddlePanning = true;
    wrap.classList.add("grabbing", "middle-pan-active");
    mainEl?.classList.add("grabbing", "middle-pan-active");
    panStart = { x:e.clientX, y:e.clientY, vx:view.x, vy:view.y };

    const move = (ev)=>{
      if(!isMiddlePanning) return;
      view.x = panStart.vx + (ev.clientX - panStart.x);
      view.y = panStart.vy + (ev.clientY - panStart.y);
      setTransform();
    };
    const up = ()=>{
      isMiddlePanning = false;
      wrap.classList.remove("grabbing", "middle-pan-active");
      mainEl?.classList.remove("grabbing", "middle-pan-active");
      document.removeEventListener("mousemove", move, true);
      document.removeEventListener("mouseup", up, true);
    };
    document.addEventListener("mousemove", move, true);
    document.addEventListener("mouseup", up, true);
  }

  function worldFromClient(clientX, clientY){
    const r = wrap.getBoundingClientRect();
    return {
      x: (clientX - r.left - view.x) / view.z,
      y: (clientY - r.top - view.y) / view.z
    };
  }

  function escapeHTML(s){
    return (s ?? "").toString()
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;");
  }

  function typeClass(t){
    if(t==="red") return "red";
    if(t==="blue") return "blue";
    if(t==="green") return "green";
    return "";
  }
  function normalizeLogoUrl(v){
    const raw = (v || "").trim();
    if(!raw) return "";
    try{
      const u = new URL(raw, window.location.href);
      if(u.protocol === "http:" || u.protocol === "https:") return u.href;
    } catch {}
    return "";
  }
  function captureSafeUrl(v){
    const clean = normalizeLogoUrl(v);
    if(!clean) return "";
    try{
      const u = new URL(clean);
      const host = u.hostname.toLowerCase();
      const needsProxy = (
        host === "icons.veryicon.com" ||
        host === "images.icon-icons.com" ||
        host === "www.messangi.com" ||
        host === "messangi.com"
      );
      if(!needsProxy) return clean;
      const urlNoScheme = clean.replace(/^https?:\/\//i, "");
      return `https://images.weserv.nl/?url=${encodeURIComponent(urlNoScheme)}`;
    } catch {
      return clean;
    }
  }
  function getNodeById(id){
    return nodes.find(n=>n.id===id);
  }
  function normalizeItem(item){
    return (typeof item === "string") ? item : { ...(item || {}) };
  }
  function getSnapshotState(){
    return {
      view: { ...view },
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
      flowOn: !!flowOn,
      connectMode: !!connectMode,
      edgeCfg: { ...edgeCfg }
    };
  }
  function applySnapshotState(state){
    if(!state) return;
    restoringHistory = true;
    view = state.view ? { ...state.view } : { x:0, y:0, z:1 };
    nodes = Array.isArray(state.nodes) ? JSON.parse(JSON.stringify(state.nodes)) : [];
    edges = Array.isArray(state.edges) ? JSON.parse(JSON.stringify(state.edges)) : [];
    flowOn = typeof state.flowOn === "boolean" ? state.flowOn : flowOn;
    connectMode = typeof state.connectMode === "boolean" ? state.connectMode : connectMode;
    edgeCfg = state.edgeCfg && typeof state.edgeCfg === "object" ? { ...edgeCfg, ...state.edgeCfg } : edgeCfg;
    clearNodeSelection();
    selected = { type:null, id:null };
    connectFrom = null;
    btnConnect.classList.toggle("active", connectMode);
    btnFlow.classList.toggle("active", flowOn);
    refreshSettingsUI();
    setTransform();
    render();
    restoringHistory = false;
  }
  function rememberActionState(){
    if(restoringHistory) return;
    const snap = getSnapshotState();
    const serialized = JSON.stringify(snap);
    const last = actionHistory.undo[actionHistory.undo.length - 1];
    if(last === serialized) return;
    actionHistory.undo.push(serialized);
    if(actionHistory.undo.length > 140) actionHistory.undo.shift();
    actionHistory.redo = [];
  }
  function undoAction(){
    if(!actionHistory.undo.length){
      showToast("Nada para desfazer.");
      return;
    }
    const current = JSON.stringify(getSnapshotState());
    actionHistory.redo.push(current);
    const prev = actionHistory.undo.pop();
    applySnapshotState(JSON.parse(prev));
    showToast("Desfeito.");
  }
  function redoAction(){
    if(!actionHistory.redo.length){
      showToast("Nada para refazer.");
      return;
    }
    const current = JSON.stringify(getSnapshotState());
    actionHistory.undo.push(current);
    const next = actionHistory.redo.pop();
    applySnapshotState(JSON.parse(next));
    showToast("Refeito.");
  }
  function slugify(v){
    return (v || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item";
  }
  function deepCopyItem(item){
    return (typeof item === "string") ? item : { ...(item || {}) };
  }
  function getNodeBaseSize(node){
    const variant = node?.variant || "default";
    const w = Number(node?.w || (variant === "sticky" ? 200 : (variant === "profile" ? 300 : variant === "area" ? 420 : 280)));
    const h = Number(node?.h || (variant === "sticky" ? 110 : (variant === "solution" || variant === "organizer" || variant === "ai" ? 180 : variant === "profile" ? 198 : variant === "area" ? 220 : 92)));
    return { w, h };
  }
  function getCompactSize(node){
    if(node?.variant === "profile"){
      const base = {
        w: Number(node?.compactSize?.w || node?.w || 300),
        h: Number(node?.compactSize?.h || node?.h || 198)
      };
      return {
        w: clamp(Math.round(Math.max(base.w * 0.86, 240)), 240, 460),
        h: clamp(Math.round(Math.max(base.h * 0.8, 162)), 162, 260)
      };
    }
    const size = Number(node?.compactSize?.w || node?.compactSize?.h || 0);
    const base = getNodeBaseSize(node);
    const diameter = clamp(size || Math.round(Math.min(base.w, Math.max(base.h, 120)) * 0.46), 72, 112);
    return { w: diameter, h: diameter };
  }
  function applyNodeCompactState(node){
    if(!node || node.variant === "text" || node.variant === "sticky" || node.variant === "area") return node;
    if(node.compact){
      if(!node.compactSize || typeof node.compactSize !== "object"){
        const base = getNodeBaseSize(node);
        node.compactSize = { w: base.w, h: base.h, userMinH: Number(node.userMinH || 0) };
      }
      const compactSize = getCompactSize(node);
      node.w = compactSize.w;
      node.h = compactSize.h;
      node.userMinH = compactSize.h;
    } else if(node.compactSize && typeof node.compactSize === "object"){
      const prev = node.compactSize;
      if(prev.w) node.w = prev.w;
      if(prev.h) node.h = prev.h;
      if(prev.userMinH !== undefined) node.userMinH = Number(prev.userMinH || 0);
      delete node.compactSize;
    }
    return node;
  }
  function nodePointToPortInfo(node, clientX, clientY, excludePort = ""){
    const world = worldFromClient(clientX, clientY);
    const exclude = normalizePortKey(excludePort || "");
    let best = null;
    let bestD = Infinity;
    for(const port of PORTS){
      if(exclude && port === exclude) continue;
      const pos = portPos(node, port);
      const dx = pos.x - world.x;
      const dy = pos.y - world.y;
      const d2 = dx*dx + dy*dy;
      if(d2 < bestD){
        bestD = d2;
        best = port;
      }
    }
    return { port: best || "e", distance: Math.sqrt(bestD) };
  }
  function nodePointToPort(node, clientX, clientY, excludePort = ""){
    return nodePointToPortInfo(node, clientX, clientY, excludePort).port;
  }
  function buildPortableExportPayload(){
    snapshotCanvasLanguage(currentLanguage);
    ensureCanvasNameI18n();
    const nodeIds = new Set(nodes.map(n => n.id));
    const portableNodes = nodes.map((n, index)=>{
      ensureNodeI18n(n);
      const stacks = Array.isArray(n.stacks) ? n.stacks : [];
      return {
        id: n.id,
        nodeRef: `${slugify(n.kind || "node")}:${slugify(n.title || "bloco")}:${n.id}`,
        order: index + 1,
        kind: n.kind || "",
        variant: n.variant || "default",
        title: n.title || "",
        position: {
          x: Math.round(n.x || 0),
          y: Math.round(n.y || 0)
        },
        size: {
          w: Math.round(n.w || 280),
          h: Math.round(n.h || 92),
          userMinH: Math.round(n.userMinH || 0)
        },
        style: {
          type: n.type || "gray",
          icon: n.icon || "",
          logoUrl: n.logoUrl || "",
          organizerPreset: n.organizerPreset || "",
          stickyColor: n.stickyColor || "",
          fontSize: Number(n.fontSize || defaultFontSizeForVariant(n.variant)),
          fontFamily: n.fontFamily || "Georgia",
          color: n.color || "#1e293b",
          align: n.align || "left",
          solutionLayout: n.solutionLayout || "pills",
          solutionLogo: n.solutionLogo || "",
          stackCatalog: n.stackCatalog || "",
          areaPattern: n.areaPattern || "dotted",
          areaStrokeWidth: Number(n.areaStrokeWidth || 2),
          areaAnimated: !!n.areaAnimated,
          areaLocked: !!n.areaLocked,
          areaColor: n.areaColor || "#94a3b8",
          compact: !!n.compact,
          compactSize: n.compactSize ? {
            w: Number(n.compactSize.w || 0),
            h: Number(n.compactSize.h || 0),
            userMinH: Number(n.compactSize.userMinH || 0)
          } : null
        },
        content: {
          description: n.desc || "",
          text: n.text || "",
          items: Array.isArray(n.items) ? n.items.map(deepCopyItem) : [],
          orgOptions: Array.isArray(n.orgOptions) ? [...n.orgOptions] : [],
          profileProperties: Array.isArray(n.profileProperties) ? JSON.parse(JSON.stringify(n.profileProperties)) : [],
          profileEvents: Array.isArray(n.profileEvents) ? JSON.parse(JSON.stringify(n.profileEvents)) : [],
          profileChannels: Array.isArray(n.profileChannels) ? JSON.parse(JSON.stringify(n.profileChannels)) : [],
          stacks: stacks.map((sid)=>{
            const s = stackById(sid, n);
            return { id: sid, label: s?.label || sid };
          })
        },
        i18n: JSON.parse(JSON.stringify(n.i18n || {}))
      };
    });
    const portableEdges = edges
      .filter(e => nodeIds.has(e?.from?.node) && nodeIds.has(e?.to?.node))
      .map((e, index)=>({
        id: e.id,
        edgeRef: `link-${index + 1}-${e.id}`,
        from: { nodeId: e.from.node, port: e.from.port },
        to: { nodeId: e.to.node, port: e.to.port },
        edgeType: e.edgeType || "generic"
      }));

    return {
      format: "clevertap.canvas-doc.v1",
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      canvas: {
        view: { ...view },
        flowOn: !!flowOn,
        connectMode: !!connectMode,
        name: canvasName,
        language: currentLanguage,
        nameI18n: { ...canvasNameI18n },
        edgeCfg: { ...edgeCfg }
      },
      indexes: {
        nodeCount: portableNodes.length,
        edgeCount: portableEdges.length,
        nodeIds: portableNodes.map(n => n.id),
        edgeIds: portableEdges.map(e => e.id)
      },
      nodes: portableNodes,
      edges: portableEdges
    };
  }
  function extractImportState(obj){
    if(!obj || typeof obj !== "object") return null;

    if(obj.format === "clevertap.canvas-doc.v1" && Array.isArray(obj.nodes) && Array.isArray(obj.edges)){
      const importedNodes = obj.nodes.map((n)=>{
        const variant = (n.variant || "default").toString();
        return {
        id: n.id || ("n_" + uid()),
        x: Number(n?.position?.x ?? n?.x ?? 0),
        y: Number(n?.position?.y ?? n?.y ?? 0),
        w: Number(n?.size?.w ?? n?.w ?? (variant === "sticky" ? 200 : 280)),
        h: Number(n?.size?.h ?? n?.h ?? (variant === "sticky" ? 110 : 92)),
        title: (n.title || "").toString(),
        desc: (n?.content?.description ?? n.desc ?? "").toString(),
        type: (n?.style?.type ?? n.type ?? "gray").toString(),
        logoUrl: normalizeLogoUrl(n?.style?.logoUrl ?? n.logoUrl ?? ""),
        logoInvalid: false,
        icon: (n?.style?.icon ?? n.icon ?? "").toString(),
        kind: (n.kind || "").toString(),
        variant,
        items: Array.isArray(n?.content?.items)
          ? n.content.items.map(deepCopyItem)
          : (Array.isArray(n.items) ? n.items.map(deepCopyItem) : []),
        stacks: Array.isArray(n?.content?.stacks)
          ? n.content.stacks.map(s => (typeof s === "string" ? s : s?.id)).filter(Boolean)
          : (Array.isArray(n.stacks) ? [...n.stacks] : []),
        userMinH: Number(n?.size?.userMinH ?? n.userMinH ?? 0),
        solutionLayout: (n?.style?.solutionLayout ?? n.solutionLayout ?? "pills").toString(),
        solutionLogo: (n?.style?.solutionLogo ?? n.solutionLogo ?? "").toString(),
        orgOptions: Array.isArray(n?.content?.orgOptions)
          ? [...n.content.orgOptions]
          : (Array.isArray(n.orgOptions) ? [...n.orgOptions] : []),
        text: (n?.content?.text ?? n.text ?? "").toString(),
        fontSize: Number(n?.style?.fontSize ?? n.fontSize ?? defaultFontSizeForVariant(variant)),
        fontFamily: (n?.style?.fontFamily ?? n.fontFamily ?? "Georgia").toString(),
        color: (n?.style?.color ?? n.color ?? "#1e293b").toString(),
        align: (n?.style?.align ?? n.align ?? "left").toString(),
        stickyColor: (n?.style?.stickyColor ?? n.stickyColor ?? "#fef08a").toString(),
        stackCatalog: (n?.style?.stackCatalog ?? n.stackCatalog ?? "").toString(),
        organizerPreset: (n?.style?.organizerPreset ?? n.organizerPreset ?? "").toString(),
        areaPattern: (n?.style?.areaPattern ?? n.areaPattern ?? "dotted").toString(),
        areaStrokeWidth: Number(n?.style?.areaStrokeWidth ?? n.areaStrokeWidth ?? 2),
        areaAnimated: !!(n?.style?.areaAnimated ?? n.areaAnimated ?? false),
        areaLocked: !!(n?.style?.areaLocked ?? n.areaLocked ?? false),
        areaColor: (n?.style?.areaColor ?? n.areaColor ?? "#94a3b8").toString(),
        profileProperties: Array.isArray(n?.content?.profileProperties)
          ? JSON.parse(JSON.stringify(n.content.profileProperties))
          : (Array.isArray(n.profileProperties) ? JSON.parse(JSON.stringify(n.profileProperties)) : []),
        profileEvents: Array.isArray(n?.content?.profileEvents)
          ? JSON.parse(JSON.stringify(n.content.profileEvents))
          : (Array.isArray(n.profileEvents) ? JSON.parse(JSON.stringify(n.profileEvents)) : []),
        profileChannels: Array.isArray(n?.content?.profileChannels)
          ? JSON.parse(JSON.stringify(n.content.profileChannels))
          : (Array.isArray(n.profileChannels) ? JSON.parse(JSON.stringify(n.profileChannels)) : []),
        compact: !!(n?.style?.compact ?? n.compact ?? false),
        compactSize: (n?.style?.compactSize && typeof n.style.compactSize === "object")
          ? {
            w: Number(n.style.compactSize.w || 0),
            h: Number(n.style.compactSize.h || 0),
            userMinH: Number(n.style.compactSize.userMinH || 0)
          }
          : (n?.compactSize && typeof n.compactSize === "object"
            ? {
              w: Number(n.compactSize.w || 0),
              h: Number(n.compactSize.h || 0),
              userMinH: Number(n.compactSize.userMinH || 0)
            }
            : null),
        i18n: (n?.i18n && typeof n.i18n === "object") ? JSON.parse(JSON.stringify(n.i18n)) : null
      };
      });
      importedNodes.forEach((node)=> ensureNodeI18n(node));
      const nodeIds = new Set(importedNodes.map(n => n.id));
      const importedEdges = obj.edges
        .map((e)=>({
          id: e.id || ("e_" + uid()),
          from: {
            node: e?.from?.nodeId ?? e?.from?.node ?? e?.fromNodeId,
            port: e?.from?.port ?? e?.fromPort ?? "e"
          },
          to: {
            node: e?.to?.nodeId ?? e?.to?.node ?? e?.toNodeId,
            port: e?.to?.port ?? e?.toPort ?? "w"
          },
          edgeType: (e?.edgeType || "generic").toString()
        }))
        .filter(e => nodeIds.has(e.from.node) && nodeIds.has(e.to.node));
      return {
        view: obj?.canvas?.view,
        nodes: importedNodes,
        edges: importedEdges,
        flowOn: obj?.canvas?.flowOn,
        connectMode: obj?.canvas?.connectMode,
        canvasName: (obj?.canvas?.name || "").toString(),
        canvasNameI18n: (obj?.canvas?.nameI18n && typeof obj.canvas.nameI18n === "object")
          ? JSON.parse(JSON.stringify(obj.canvas.nameI18n))
          : null,
        language: LANGUAGES.includes(obj?.canvas?.language) ? obj.canvas.language : null,
        edgeCfg: obj?.canvas?.edgeCfg
      };
    }

    if(Array.isArray(obj.nodes) && Array.isArray(obj.edges)){
      return {
        ...obj,
        language: LANGUAGES.includes(obj?.currentLanguage) ? obj.currentLanguage : (LANGUAGES.includes(obj?.language) ? obj.language : null),
        canvasNameI18n: (obj?.canvasNameI18n && typeof obj.canvasNameI18n === "object")
          ? JSON.parse(JSON.stringify(obj.canvasNameI18n))
          : null
      };
    }
    return null;
  }
  function applyImportedState(obj){
    if(!obj) return false;
    rememberActionState();
    if(obj.view) view = obj.view;
    if(Array.isArray(obj.nodes)) nodes = obj.nodes;
    if(Array.isArray(obj.edges)) edges = obj.edges;
    nodes.forEach((node)=> ensureNodeI18n(node));
    clearNodeSelection();
    selected = { type:null, id:null };
    if(typeof obj.flowOn === "boolean") flowOn = obj.flowOn;
    if(obj.edgeCfg && typeof obj.edgeCfg === "object") edgeCfg = { ...edgeCfg, ...obj.edgeCfg };
    if(typeof obj.connectMode === "boolean"){
      setConnectMode(obj.connectMode, true);
    } else {
      btnConnect.classList.toggle("active", connectMode);
    }
    if(typeof obj.canvasName === "string" && obj.canvasName.trim()){
      canvasName = obj.canvasName.trim();
    }
    canvasNameI18n = (obj.canvasNameI18n && typeof obj.canvasNameI18n === "object")
      ? JSON.parse(JSON.stringify(obj.canvasNameI18n))
      : buildLocalizedStringRecord(canvasName || "Diagrama CleverTap");
    ensureCanvasNameI18n();
    if(typeof obj.language === "string" && LANGUAGES.includes(obj.language)){
      currentLanguage = obj.language;
    }
    if(cfgLanguage) cfgLanguage.value = currentLanguage;
    btnFlow.classList.toggle("active", flowOn);
    applyCurrentLanguage();
    setTransform();
    render();
    return true;
  }
  function openTemplateModal(){
    if(!tplBack || !tplList) return;
    const all = [...builtinCanvasTemplates, ...customCanvasTemplates];
    tplList.innerHTML = all.map((tpl)=>`
      <div class="tplCard">
        <div class="tplMeta">
          <div class="tplName">${escapeHTML(tpl.name)}</div>
          <div class="tplDesc">${escapeHTML(tpl.description || "")}</div>
        </div>
        <button class="btn2 primary tplApply" data-tpl-id="${escapeHTML(tpl.id)}" ${tpl?.data ? "" : "disabled"}>${escapeHTML(t("apply"))}</button>
      </div>
    `).join("");
    tplList.querySelectorAll(".tplApply").forEach((btn)=>{
      btn.addEventListener("click", ()=>{
        const id = btn.dataset.tplId;
        const tpl = all.find(t => t.id === id);
        if(!tpl?.data) return;
        if(nodes.length && !confirm(t("templateApplyConfirm", { name: tpl.name }))) return;
        const obj = extractImportState(tpl.data);
        if(!obj){
          alert(t("invalidTemplate"));
          return;
        }
        applyImportedState(obj);
        closeTemplateModal();
        showToast(t("templateApplied", { name: tpl.name }));
      });
    });
    tplBack.style.display = "flex";
    tplBack.setAttribute("aria-hidden", "false");
  }
  function closeTemplateModal(){
    if(!tplBack) return;
    tplBack.style.display = "none";
    tplBack.setAttribute("aria-hidden", "true");
  }
  function setSelectedImportFile(file){
    selectedImportFile = file || null;
    if(!selectedImportFile && importFileInput) importFileInput.value = "";
    if(importSelectedFile){
      importSelectedFile.textContent = file
        ? t("importFileSelected", { name: file.name || "arquivo.json" })
        : translateKnownPhrase("Nenhum arquivo selecionado");
    }
    refreshImportActionState();
  }
  function handleImportFile(file){
    if(!file) return;
    setSelectedImportFile(file);
  }
  function refreshImportActionState(){
    if(!btnImportApply) return;
    const canPaste = importMode === "paste" && (importPasteArea?.value || "").trim().length > 0;
    const canFile = importMode === "file" && !!selectedImportFile;
    btnImportApply.disabled = !(canPaste || canFile);
  }
  function setImportMode(mode){
    importMode = mode === "file" ? "file" : "paste";
    importModeSwitch?.classList.toggle("mode-file", importMode === "file");
    importModePasteBtn?.classList.toggle("active", importMode === "paste");
    importModeFileBtn?.classList.toggle("active", importMode === "file");
    importModePasteBtn?.setAttribute("aria-selected", importMode === "paste" ? "true" : "false");
    importModeFileBtn?.setAttribute("aria-selected", importMode === "file" ? "true" : "false");
    importPastePanel?.classList.toggle("active", importMode === "paste");
    importFilePanel?.classList.toggle("active", importMode === "file");
    refreshImportActionState();
    if(importMode === "paste"){
      setTimeout(()=>importPasteArea?.focus(), 0);
    } else {
      setTimeout(()=>importDropzone?.focus(), 0);
    }
  }
  function openImportFilePicker(){
    importFileInput?.click();
  }
  function getImportPayloadText(){
    if(importMode === "paste") return (importPasteArea?.value || "").trim();
    if(selectedImportFile) return readFileText(selectedImportFile);
    return Promise.resolve("");
  }
  function readFileText(file){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onload = ()=>resolve(String(reader.result || ""));
      reader.onerror = ()=>reject(reader.error || new Error("Falha ao ler arquivo"));
      reader.readAsText(file);
    });
  }
  function openImportModal(){
    if(!importBack) return;
    importBack.style.display = "flex";
    importBack.setAttribute("aria-hidden", "false");
    importDropzone?.classList.remove("is-dragover");
    importPasteArea && (importPasteArea.value = importPasteArea.value || "");
    setImportMode("paste");
    refreshImportActionState();
  }
  function closeImportModal(){
    if(!importBack) return;
    importBack.style.display = "none";
    importBack.setAttribute("aria-hidden", "true");
    importDropzone?.classList.remove("is-dragover");
    setSelectedImportFile(null);
    if(importPasteArea) importPasteArea.value = "";
    setImportMode("paste");
  }
  async function applyImportFromModal(){
    try{
      const txt = importMode === "paste"
        ? (importPasteArea?.value || "").trim()
        : await getImportPayloadText();
      if(!txt){
        showToast(importMode === "paste" ? t("importJsonEmpty") : t("importNoFile"));
        if(importMode === "file") openImportFilePicker();
        return;
      }
      const parsed = JSON.parse(txt);
      const obj = extractImportState(parsed);
      if(!obj) throw new Error("Formato invalido");
      applyImportedState(obj);
      closeImportModal();
      showToast(t("layoutImported"));
    } catch(e){
      setSelectedImportFile(null);
      alert(t("invalidJson"));
    }
  }
  function loadProjectOverallInfo(){
    try{
      const raw = localStorage.getItem(PROJECT_OVERALL_KEY);
      if(!raw) return;
      const parsed = JSON.parse(raw);
      if(!parsed || typeof parsed !== "object") return;
      projectOverallInfo = {
        ...projectOverallInfo,
        challenges: (parsed.challenges || "").toString(),
        businessGoals: (parsed.businessGoals || "").toString(),
        expectations: (parsed.expectations || "").toString(),
        l1: (parsed.l1 || "").toString(),
        l2: (parsed.l2 || "").toString(),
        l3: (parsed.l3 || "").toString()
      };
    } catch {}
  }
  function persistProjectOverallInfo(){
    try{
      localStorage.setItem(PROJECT_OVERALL_KEY, JSON.stringify(projectOverallInfo));
    } catch {}
  }
  function fillProjectOverallForm(){
    if(pOverallChallenges) pOverallChallenges.value = projectOverallInfo.challenges || "";
    if(pOverallGoals) pOverallGoals.value = projectOverallInfo.businessGoals || "";
    if(pOverallExpectations) pOverallExpectations.value = projectOverallInfo.expectations || "";
    if(pOverallL1) pOverallL1.value = projectOverallInfo.l1 || "";
    if(pOverallL2) pOverallL2.value = projectOverallInfo.l2 || "";
    if(pOverallL3) pOverallL3.value = projectOverallInfo.l3 || "";
  }
  function readProjectOverallForm(){
    projectOverallInfo = {
      challenges: (pOverallChallenges?.value || "").trim(),
      businessGoals: (pOverallGoals?.value || "").trim(),
      expectations: (pOverallExpectations?.value || "").trim(),
      l1: (pOverallL1?.value || "").trim(),
      l2: (pOverallL2?.value || "").trim(),
      l3: (pOverallL3?.value || "").trim()
    };
    persistProjectOverallInfo();
    return { ...projectOverallInfo };
  }
  function openProjectModal(){
    if(!projectBack) return;
    fillProjectOverallForm();
    projectBack.style.display = "flex";
    projectBack.setAttribute("aria-hidden", "false");
    setTimeout(()=>pOverallChallenges?.focus(), 0);
  }
  function closeProjectModal(){
    if(!projectBack) return;
    projectBack.style.display = "none";
    projectBack.setAttribute("aria-hidden", "true");
  }
  function loadTemplateLibrary(){
    try{
      const raw = localStorage.getItem(TEMPLATE_LIBRARY_KEY);
      if(!raw) return;
      const arr = JSON.parse(raw);
      if(!Array.isArray(arr)) return;
      customCanvasTemplates = arr.filter(x => x && x.id && x.name && x.data);
    } catch {}
  }
  function persistTemplateLibrary(){
    try{
      localStorage.setItem(TEMPLATE_LIBRARY_KEY, JSON.stringify(customCanvasTemplates));
    } catch {}
  }
  function queuePersist(){
    clearTimeout(persistTimer);
    persistTimer = setTimeout(()=>{
      try{
        snapshotCanvasLanguage(currentLanguage);
        const payload = {
          schemaVersion: SCHEMA_VERSION,
          data: {
            view,
            nodes,
            edges,
            flowOn,
            connectMode,
            edgeCfg,
            canvasName,
            currentLanguage,
            canvasNameI18n
          }
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {}
    }, 220);
  }
  function loadPersisted(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return false;
      const parsed = JSON.parse(raw);
      const data = parsed?.data || parsed;
      if(data?.view) view = data.view;
      if(Array.isArray(data?.nodes)) nodes = data.nodes;
      if(Array.isArray(data?.edges)) edges = data.edges;
      if(typeof data?.flowOn === "boolean") flowOn = data.flowOn;
      if(typeof data?.connectMode === "boolean") connectMode = data.connectMode;
      if(data?.edgeCfg && typeof data.edgeCfg === "object"){
        edgeCfg = { ...edgeCfg, ...data.edgeCfg };
      }
      if(typeof data?.currentLanguage === "string" && LANGUAGES.includes(data.currentLanguage)){
        currentLanguage = data.currentLanguage;
      }
      if(typeof data?.canvasName === "string" && data.canvasName.trim()){
        canvasName = data.canvasName.trim();
      }
      if(data?.canvasNameI18n && typeof data.canvasNameI18n === "object"){
        canvasNameI18n = JSON.parse(JSON.stringify(data.canvasNameI18n));
      }
      nodes.forEach((node)=> ensureNodeI18n(node));
      ensureCanvasNameI18n();
      return true;
    } catch {
      return false;
    }
  }
  function pushItemHistory(entry){
    itemHistory.undo.push(entry);
    if(itemHistory.undo.length > 200) itemHistory.undo.shift();
    itemHistory.redo = [];
  }
  function applyItemHistory(entry, reverse){
    const n = getNodeById(entry.nodeId);
    if(!n || !Array.isArray(n.items)) return false;
    const kind = entry.kind;
    if(kind === "remove"){
      if(reverse){
        n.items.splice(entry.index, 0, normalizeItem(entry.item));
      } else {
        if(entry.index >= 0 && entry.index < n.items.length) n.items.splice(entry.index, 1);
      }
      return true;
    }
    if(kind === "add"){
      if(reverse){
        if(entry.index >= 0 && entry.index < n.items.length) n.items.splice(entry.index, 1);
      } else {
        n.items.splice(entry.index, 0, normalizeItem(entry.item));
      }
      return true;
    }
    if(kind === "move"){
      const from = reverse ? entry.to : entry.from;
      const to = reverse ? entry.from : entry.to;
      if(from < 0 || from >= n.items.length || to < 0 || to > n.items.length) return false;
      const [moved] = n.items.splice(from, 1);
      n.items.splice(to, 0, moved);
      return true;
    }
    return false;
  }
  function undoItemAction(){
    const entry = itemHistory.undo.pop();
    if(!entry) return;
    if(applyItemHistory(entry, true)){
      itemHistory.redo.push(entry);
      render();
      showToast("Desfeito.");
    }
  }
  function redoItemAction(){
    const entry = itemHistory.redo.pop();
    if(!entry) return;
    if(applyItemHistory(entry, false)){
      itemHistory.undo.push(entry);
      render();
      showToast("Refeito.");
    }
  }
  function refreshTextBar(){
    const node = (selected.type === "node") ? getNodeById(selected.id) : null;
    const isSticky = !!node && node.variant === "sticky";
    const isArea = !!node && node.variant === "area";
    const isTextLike = !!node && (node.variant === "text" || isSticky);
    if(!isTextLike && !isArea){
      textBar?.classList.remove("show");
      textBar?.classList.remove("sticky-mode");
      textBar?.classList.remove("area-mode");
      textBar?.setAttribute("aria-hidden","true");
      return;
    }
    textBar?.classList.add("show");
    textBar?.classList.toggle("sticky-mode", isSticky);
    textBar?.classList.toggle("area-mode", isArea);
    textBar?.setAttribute("aria-hidden","false");
    if(tbText){
      tbText.disabled = isSticky;
      tbText.placeholder = isSticky ? t("stickyToolbarPlaceholder") : (isArea ? translateKnownPhrase("Nome da área") : t("freeTextPlaceholder"));
      tbText.value = isSticky ? "" : (node.text || "");
    }
    if(tbFont){
      tbFont.disabled = isSticky;
      tbFont.value = (node.fontFamily || "Georgia").toString();
    }
    if(tbColor){
      tbColor.disabled = isSticky;
      tbColor.value = node.color || "#1e293b";
    }
    if(tbAlign){
      tbAlign.disabled = isSticky;
      tbAlign.value = node.align || "left";
    }
    if(tbAreaTitle){
      tbAreaTitle.value = isArea ? (node.title || "") : "";
      tbAreaTitle.placeholder = translateKnownPhrase("Bloco de área");
      tbAreaTitle.disabled = !isArea;
    }
    if(tbAreaColor){
      tbAreaColor.value = isArea ? (node.areaColor || "#94a3b8") : "#94a3b8";
      tbAreaColor.title = translateKnownPhrase("Cor");
      tbAreaColor.disabled = !isArea;
    }
    if(tbAreaPattern){
      tbAreaPattern.value = isArea ? (node.areaPattern || "dotted") : "dotted";
      tbAreaPattern.title = translateKnownPhrase("Pontilhada");
      tbAreaPattern.disabled = !isArea;
    }
    if(tbAreaWidth){
      tbAreaWidth.value = isArea ? String(clamp(Number(node.areaStrokeWidth || 2), 1, 12)) : "2";
      tbAreaWidth.title = translateKnownPhrase("Espessura do pixel");
      tbAreaWidth.disabled = !isArea;
    }
    if(tbAreaAnimate){
      const on = isArea && !!node.areaAnimated;
      tbAreaAnimate.disabled = !isArea;
      tbAreaAnimate.setAttribute("aria-pressed", on ? "true" : "false");
      tbAreaAnimate.classList.toggle("active", on);
      tbAreaAnimate.title = translateKnownPhrase("Animar linha pontilhada");
    }
    if(tbAreaLock){
      const on = isArea && !!node.areaLocked;
      tbAreaLock.disabled = !isArea;
      tbAreaLock.setAttribute("aria-pressed", on ? "true" : "false");
      tbAreaLock.classList.toggle("active", on);
      tbAreaLock.title = on ? translateKnownPhrase("Desbloquear movimentação") : translateKnownPhrase("Bloquear movimentação");
      tbAreaLock.innerHTML = `<img src="https://us.123rf.com/450wm/sumberejeki/sumberejeki2007/sumberejeki200702918/151738175-ilustra%C3%A7%C3%A3o-gr%C3%A1fico-vetorial-do-%C3%ADcone-do-cadeado-apto-para-chave-seguro-senha-prote%C3%A7%C3%A3o-seguro.jpg?ver=6" alt="" aria-hidden="true" />`;
    }
  }
  function refreshSettingsUI(){
    if(cfgLineType) cfgLineType.value = edgeCfg.lineType || "dashed";
    if(cfgConnectorType) cfgConnectorType.value = edgeCfg.connectorType || "curved";
    if(cfgMarker) cfgMarker.value = edgeCfg.marker || "arrow";
    if(cfgFlowDots) cfgFlowDots.value = String(clamp(Number(edgeCfg.flowDots || 2), 1, 3));
    if(cfgLineColor) cfgLineColor.value = edgeCfg.lineColor || "#94a3b8";
    if(cfgFlowColor) cfgFlowColor.value = edgeCfg.flowColor || "#2563eb";
  }
  function lineDashForType(type){
    if(type === "solid") return "";
    if(type === "dotted") return "2 6";
    return "6 6";
  }
  const EDGE_TYPES = {
    "generic":  { label: "Generico", color: "#94a3b8", dash: "6 6", width: 2 },
    "data":     { label: "Dados", color: "#2563eb", dash: "", width: 2 },
    "event":    { label: "Evento", color: "#10b981", dash: "3 5", width: 2 },
    "audience": { label: "Audiencia", color: "#f59e0b", dash: "8 4", width: 2 },
    "api":      { label: "API Call", color: "#8b5cf6", dash: "2 4", width: 2 },
  };
  function markerUrl(isSel){
    const mode = edgeCfg.marker || "arrow";
    if(mode === "none") return "";
    if(mode === "dot") return isSel ? "url(#dotEndActive)" : "url(#dotEnd)";
    return isSel ? "url(#arrowActive)" : "url(#arrow)";
  }
  const STACK_OPTIONS = [
    { id:"ios-native", label:"iOS Native", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHWXIPNdXbKSE0eC4wiiIMmO7aTUjuws_4hw&s" },
    { id:"android-native", label:"Android Native", logo:"https://images.icon-icons.com/2415/PNG/512/android_original_logo_icon_146653.png" },
    { id:"cordova", label:"Cordova", logo:"https://cdn.freebiesupply.com/logos/large/2x/cordova-logo-png-transparent.png" },
    { id:"flutter", label:"Flutter", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flutter_logo.svg/250px-Flutter_logo.svg.png" },
    { id:"react-native", label:"React Native", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png" },
    { id:"unity", label:"Unity", logo:"https://images.seeklogo.com/logo-png/27/2/unity-logo-png_seeklogo-274050.png" },
    { id:"unity-native", label:"Unity Native", logo:"https://images.seeklogo.com/logo-png/27/2/unity-logo-png_seeklogo-274050.png" },
    { id:"web-sdk", label:"Web SDK", logo:"https://pixellot-web-sdk.pixellot.tv/v3/docs/sdk.png" },
    { id:"kaios", label:"KaiOS", logo:"https://cdn.iconscout.com/icon/free/png-256/free-kaios-logo-icon-svg-download-png-3030010.png?f=webp" },
    { id:"unreal-sdk", label:"Unreal SDK", logo:"https://static.amplitude.com/data-connections/icons/UNREAL.png" },
    { id:"smart-tv-sdk", label:"Smart TV SDK", logo:"" }
  ];
  const WHATSAPP_PROVIDER_OPTIONS = [
    { id:"direct", label:"Direct", logo:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png" },
    { id:"connect", label:"Connect", logo:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png" },
    { id:"generic", label:"Generic", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/960px-WhatsApp.svg.png" },
    { id:"8x8", label:"8x8", logo:"https://companieslogo.com/img/orig/EGHT-95dcecf5.png?t=1744724283" },
    { id:"aisensy", label:"AiSensy", logo:"https://waba.aisensy.com/static/media/logo.704a7a4bfa9c51deca0f.jpg" },
    { id:"exotel", label:"Exotel", logo:"https://exotel.com/wp-content/uploads/2025/07/green-black-logo.png" },
    { id:"gupshup", label:"Gupshup", logo:"https://companieslogo.com/img/orig/gupshup-1d75e54c.png?t=1720244494" },
    { id:"haptik", label:"Haptik", logo:"https://www.haptik.ai/hs-fs/hubfs/Business%20Blog/Haptik%20Reborn/handlogo-1-2.png?width=262&name=handlogo-1-2.png" },
    { id:"infobip", label:"Infobip", logo:"https://www.infobip.com/developers/wp-content/uploads/2023/03/Infobip_logo_favicon.png" },
    { id:"interakt", label:"Interakt", logo:"https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_7370fed2a36dc9eee7c8a2952c803b81/haptik-interakt.png" },
    { id:"kaleyra", label:"Kaleyra", logo:"https://www.tatacommunications.com/hubfs/TaCO-2024/Brand-logo/Kaleyra/Kaleyra.png" },
    { id:"msg91", label:"MSG91", logo:"https://media.trustradius.com/product-logos/7D/jl/09ULF2HP569H.PNG" },
    { id:"nexmo", label:"Nexmo", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGkTwn6R8vAhNEErNhon8OEKBNZoFvIAwYuA&s" },
    { id:"onextel", label:"OneXtel", logo:"https://onextelcommunication.com/wp-content/uploads/2024/09/OCM_Logo_OneXtel_Communication_Media_Pvt._Ltd._Logo2.png" },
    { id:"pingbix", label:"Pingbix", logo:"https://pingbix.com/static/navbar-logo.png" },
    { id:"quickreply", label:"QuickReply", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4GF507R2A_iwwxy6dPPDtnn5QBI8JmPgMyw&s" },
    { id:"route-mobile", label:"Route Mobile", logo:"https://play-lh.googleusercontent.com/nBsYx365olelYmQHPflxq8vpS5wZ17kPzOILRwbEnW2aNqttltjcHOQOF5TGlBGgmQ" },
    { id:"sinch", label:"Sinch", logo:"https://sinch.com/wp-content/themes/simpletexting-theme-blank/assets/images/logo-sinch.svg" }
  ];
  function stackCatalogForNode(n){
    if((n?.stackCatalog || "") === "whatsappProviders") return WHATSAPP_PROVIDER_OPTIONS;
    return STACK_OPTIONS;
  }
  function stackById(id, n){
    return stackCatalogForNode(n).find(s=>s.id===id);
  }
  function shortTag(label){
    const txt = (label || "").toString().trim();
    if(!txt) return "•";
    const words = txt.split(/\s+/).filter(Boolean);
    if(words.length === 1){
      const one = words[0].replace(/[^a-z0-9]/ig, "");
      return one.slice(0, 2).toUpperCase() || "•";
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  // ports definition
  const PORTS = [
    "n","e","s","w"
  ];
  const STICKY_COLORS = ["#fef08a", "#fce7f3", "#dbeafe", "#dcfce7", "#ffedd5"];
  function normalizePortKey(port){
    const key = (port || "").toString().toLowerCase();
    if(key === "n" || key.startsWith("n")) return "n";
    if(key === "e" || key.startsWith("e")) return "e";
    if(key === "s" || key.startsWith("s")) return "s";
    if(key === "w" || key.startsWith("w")) return "w";
    return "n";
  }
  function portSide(port){
    return normalizePortKey(port).charAt(0) || "n";
  }
  function portPos(n, port){
    const w = n.w || 280;
    const h = Math.max(n.h || 92, 92);
    const side = portSide(port);
    if(side === "n") return { x: n.x + w / 2, y: n.y };
    if(side === "s") return { x: n.x + w / 2, y: n.y + h };
    if(side === "e") return { x: n.x + w, y: n.y + h / 2 };
    return { x: n.x, y: n.y + h / 2 }; // w
  }
  function portHoverThresholdPx(node){
    const base = Math.min(Number(node?.w || 280), Math.max(Number(node?.h || 92), 92));
    const scaled = base * Math.max(view.z, 0.0001) * 0.08;
    return clamp(scaled, 12, 18);
  }

  function outwardDir(port){
    const side = portSide(port);
    if(side === "n") return { x: 0, y: -1 };
    if(side === "s") return { x: 0, y: 1 };
    if(side === "e") return { x: 1, y: 0 };
    return { x: -1, y: 0 };
  }
  function inwardDir(port){
    const side = portSide(port);
    if(side === "n") return { x: 0, y: 1 };
    if(side === "s") return { x: 0, y: -1 };
    if(side === "e") return { x: -1, y: 0 };
    return { x: 1, y: 0 };
  }
  function drawCurve(a, b, fromPort, toPort){
    const out = outwardDir(fromPort);
    const inn = inwardDir(toPort);
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const strength = clamp(dist * 0.35, 38, 190);
    const c1 = { x: a.x + out.x * strength, y: a.y + out.y * strength };
    const c2 = { x: b.x - inn.x * strength, y: b.y - inn.y * strength };
    return `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`;
  }
  function drawOrthogonal(a, b, _fromPort, toPort){
    const side = portSide(toPort);
    if(side === "n" || side === "s"){
      const midY = (a.y + b.y) / 2;
      return `M ${a.x} ${a.y} L ${a.x} ${midY} L ${b.x} ${midY} L ${b.x} ${b.y}`;
    }
    const midX = (a.x + b.x) / 2;
    return `M ${a.x} ${a.y} L ${midX} ${a.y} L ${midX} ${b.y} L ${b.x} ${b.y}`;
  }
  function drawEdgePath(a, b, fromPort, toPort){
    return (edgeCfg.connectorType || "curved") === "straight"
      ? drawOrthogonal(a, b, fromPort, toPort)
      : drawCurve(a, b, fromPort, toPort);
  }
  function curveMid(a, b){
    const c1 = { x:(a.x + b.x)/2, y:a.y };
    const c2 = { x:(a.x + b.x)/2, y:b.y };
    const t = 0.5;
    const mt = 1 - t;
    return {
      x: mt*mt*mt*a.x + 3*mt*mt*t*c1.x + 3*mt*t*t*c2.x + t*t*t*b.x,
      y: mt*mt*mt*a.y + 3*mt*mt*t*c1.y + 3*mt*t*t*c2.y + t*t*t*b.y
    };
  }
  function edgeMid(a, b, _fromPort, toPort){
    if((edgeCfg.connectorType || "curved") === "straight"){
      const side = portSide(toPort);
      if(side === "n" || side === "s"){
        return { x: b.x, y: (a.y + b.y) / 2 };
      }
      return { x: (a.x + b.x) / 2, y: b.y };
    }
    return curveMid(a, b);
  }
  function showEdgeTypeBar(edgeId, midScreenX, midScreenY){
    if(!edgeTypeBar) return;
    const edge = edges.find(x => x.id === edgeId);
    if(!edge){
      hideEdgeTypeBar();
      return;
    }
    edgeTypeBar.innerHTML = Object.entries(EDGE_TYPES).map(([key, cfg])=>`
      <button class="etypeBtn ${(edge.edgeType || "generic") === key ? "active" : ""}" data-etype="${escapeHTML(key)}" style="--etcolor:${escapeHTML(cfg.color)}" title="${escapeHTML(cfg.label)}"></button>
    `).join("");
    edgeTypeBar.style.left = `${Math.round(midScreenX - 60)}px`;
    edgeTypeBar.style.top = `${Math.round(midScreenY + 16)}px`;
    edgeTypeBar.style.display = "flex";
    edgeTypeBar.querySelectorAll(".etypeBtn").forEach((btn)=>{
      btn.addEventListener("click", (e)=>{
        e.stopPropagation();
        const found = edges.find(x => x.id === edgeId);
        if(!found) return;
        rememberActionState();
        found.edgeType = btn.dataset.etype || "generic";
        render();
      });
    });
  }

  let renderQueued = false;
  function requestRender(){
    if(renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(()=>{
      renderQueued = false;
      render();
    });
  }

  // --- Render ---
  function render(){
    const ORGANIZER_OPTIONS = [
      "Fonte de dados",
      "Mecanismo de integração",
      "Orquestrador",
      "Canais de comunicação",
      "Data Layer",
      "Clever.AI",
      "Remarketing"
    ];
    const TESSERACT_ITEM_ICON = "https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png";
    const TESSERACT_LOGO_URL = "https://clevertap.com/wp-content/uploads/2024/03/Hyper-personalization-image.png";
    const TESSERACT_PILL_DEFAULTS = [
      { icon:TESSERACT_ITEM_ICON, label:"Retenção entre 3~10 anos" },
      { icon:TESSERACT_ITEM_ICON, label:"Escala e Performance" },
      { icon:TESSERACT_ITEM_ICON, label:"Dados em tempo real" },
      { icon:TESSERACT_ITEM_ICON, label:"Visão Unificada do Cliente" },
      { icon:TESSERACT_ITEM_ICON, label:"Redução de Custo e Complexidade" }
    ];
    const TESSERACT_ICON_BY_LABEL = {
      "retenção entre 3~10 anos":TESSERACT_ITEM_ICON,
      "escala e performance":TESSERACT_ITEM_ICON,
      "dados em tempo real":TESSERACT_ITEM_ICON,
      "visão unificada do cliente":TESSERACT_ITEM_ICON,
      "visao unificada do cliente":TESSERACT_ITEM_ICON,
      "redução de custo e complexidade":TESSERACT_ITEM_ICON,
      "reducao de custo e complexidade":TESSERACT_ITEM_ICON
    };
    const SEGMENTS_ICON_BY_LABEL = {
      "rfm":"https://cdn-icons-png.flaticon.com/512/570/570291.png",
      "real-time":"https://marketplace.canva.com/XL6M0/MAEpMrXL6M0/1/tl/canva-clock-real-realtime-time-icon-icon-MAEpMrXL6M0.png",
      "real time":"https://marketplace.canva.com/XL6M0/MAEpMrXL6M0/1/tl/canva-clock-real-realtime-time-icon-icon-MAEpMrXL6M0.png",
      "preditiva":"https://cdn-icons-png.flaticon.com/512/5799/5799191.png",
      "psicográfica":"https://cdn-icons-png.flaticon.com/512/12282/12282281.png",
      "psicografica":"https://cdn-icons-png.flaticon.com/512/12282/12282281.png",
      "comportamental":"https://idecbrasil.com.br/wp-content/uploads/2025/03/processo-1.png"
    };
    const SEGMENTS_MONO = new Set(["psicográfica", "psicografica", "comportamental"]);
    const PROFILE_CHANNELS = [
      { label:"WhatsApp", icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/960px-WhatsApp.svg.png" },
      { label:"Email", icon:"https://static.vecteezy.com/system/resources/thumbnails/014/440/980/small/email-message-icon-design-in-blue-circle-png.png" },
      { label:"SMS", icon:"https://cdn-icons-png.flaticon.com/512/733/733533.png" },
      { label:"App", icon:"https://cdn-icons-png.flaticon.com/512/8766/8766948.png" },
      { label:"Web", icon:"https://cdn-icons-png.flaticon.com/512/5339/5339181.png" }
    ];
    const PROFILE_PROPERTIES = [
      { label:"Idade", value:"34 anos" },
      { label:"Cidade", value:"São Paulo" },
      { label:"Nascimento", value:"12/03/1991" },
      { label:"Categoria favorita", value:"Premium" }
    ];
    const PROFILE_EVENTS = [
      "Comprou produto",
      "Viu página de oferta",
      "Iniciou app",
      "Abriu push",
      "Clicou em campanha"
    ];
    const baseHeightFor = (variant) => {
      if(variant === "solution") return 180;
      if(variant === "organizer") return 220;
      if(variant === "ai") return 180;
      if(variant === "profile") return 198;
      if(variant === "area") return 220;
      if(variant === "stack") return 104;
      if(variant === "sticky") return 80;
      if(variant === "text") return 0;
      return 92;
    };

    // filter highlight by search (dim nodes not matching)
    const q = (search.value || "").trim().toLowerCase();
    const matches = (n) => {
      if(!q) return true;
      const items = Array.isArray(n.items)
        ? n.items.map(it => typeof it === "string" ? it : (it?.label || "")).join(" ")
        : "";
      const text = `${n.title||""} ${n.desc||""} ${n.kind||""} ${items} ${n.text||""}`.toLowerCase();
      return text.includes(q);
    };

    // nodes layer
    nodesLayer.innerHTML = "";
    wrap.classList.toggle("connect-mode", connectMode);
    wrap.classList.toggle("connecting", connectMode && !!connectFrom);
    for(const n of nodes){
      const el = document.createElement("div");
      el.className = "node";
      if(n.variant === "solution") el.classList.add("solution");
      if(n.variant === "organizer") el.classList.add("organizer");
      if(n.variant === "ai") el.classList.add("ai");
      if(n.variant === "profile") el.classList.add("profile");
      if(n.variant === "area") el.classList.add("area");
      if(n.variant === "text") el.classList.add("text-node");
      if(n.variant === "sticky") el.classList.add("sticky-node");
      if(n.highlightPulse) el.classList.add("highlightPulse");
      el.dataset.id = n.id;
      el.style.left = n.x + "px";
      el.style.top = n.y + "px";
      applyNodeCompactState(n);
      const isCompactNode = !!n.compact && n.variant !== "text" && n.variant !== "sticky" && n.variant !== "area";
      if(n.variant === "text"){
        el.style.width = "auto";
        el.style.minWidth = "0";
        el.style.minHeight = "0";
        el.style.height = "auto";
      } else if(n.variant === "sticky"){
        n.w = clamp(Number(n.w || 200), STICKY_MIN_W, STICKY_MAX_W);
        n.h = clamp(Number(n.h || 110), STICKY_MIN_H, STICKY_MAX_H);
        el.style.width = n.w + "px";
        el.style.minWidth = `${STICKY_MIN_W}px`;
        el.style.minHeight = `${STICKY_MIN_H}px`;
        el.style.height = n.h + "px";
      } else if(n.variant === "profile"){
        el.style.width = (n.w || 420) + "px";
        el.style.minWidth = "260px";
        el.style.minHeight = "160px";
      } else if(n.variant === "area"){
        el.style.width = (n.w || 420) + "px";
        el.style.minWidth = "220px";
        el.style.minHeight = "140px";
        el.style.height = (n.h || 220) + "px";
      } else {
        el.style.width = (n.w || 280) + "px";
      }
      if(isCompactNode){
        el.style.removeProperty("--blockScale");
        el.style.removeProperty("--tessScale");
      } else if(n.variant === "solution" || n.variant === "ai"){
        const baseW = n.variant === "ai" ? 360 : 300;
        const scale = clamp((n.w || baseW) / baseW, 0.78, 1.9);
        el.style.setProperty("--blockScale", String(scale));
      } else {
        el.style.removeProperty("--blockScale");
      }
      const isTesseractNode = n.variant === "solution"
        && ((n.solutionLayout || "") === "tesseract" || (n.title || "").toLowerCase().includes("tesseractdb"));
      if(isCompactNode){
        el.style.removeProperty("--tessScale");
      } else if(isTesseractNode){
        const baseW = 600;
        const baseH = 264;
        const currH = Math.max(n.h || 0, n.userMinH || 132, 132);
        const rightW = Math.max((n.w || baseW) - 176, 180);
        const rightH = Math.max(currH - 26, 120);
        const byW = rightW / 430;
        const byH = rightH / 220;
        const tessScale = clamp(Math.min(byW, byH) * 1.12, 0.9, 2.2);
        el.style.setProperty("--tessScale", String(tessScale));
      } else if(n.variant === "profile" || n.variant === "area"){
        el.style.removeProperty("--tessScale");
      } else {
        el.style.removeProperty("--tessScale");
      }
      const variantMinH = isTesseractNode ? 132 : (n.variant === "profile" ? 170 : n.variant === "area" ? 140 : 180);
      if(n.variant === "solution" || n.variant === "organizer" || n.variant === "ai" || n.variant === "profile"){
        el.style.height = Math.max(n.h || 0, n.userMinH || variantMinH, variantMinH) + "px";
        el.style.minHeight = "0px";
      } else if(n.variant === "area"){
        el.style.height = Math.max(n.h || 0, variantMinH) + "px";
        el.style.minHeight = `${variantMinH}px`;
      } else {
        if(n.variant !== "text" && n.variant !== "sticky"){
          el.style.height = "auto";
          el.style.minHeight = baseHeightFor(n.variant) + "px";
        }
      }
      if(selectedNodeIds.has(n.id) || (selected.type==="node" && selected.id===n.id)) el.classList.add("selected");
      if(!matches(n)) el.style.opacity = "0.25";
      if(isCompactNode){
        el.classList.add("compact");
        if(compactToggleAnim?.nodeId === n.id){
          el.classList.add("compactAnim", `compactAnim-${compactToggleAnim.mode}`);
        }
        el.title = n.title || "Bloco";
        el.style.width = `${n.w || 84}px`;
        el.style.height = `${n.h || 84}px`;
        el.style.minHeight = `${n.h || 84}px`;
        el.style.minWidth = `${n.w || 84}px`;
        if(n.variant === "profile"){
          const compactProfileProperties = Array.isArray(n.profileProperties) && n.profileProperties.length
            ? n.profileProperties
            : PROFILE_PROPERTIES;
          const compactProfileEvents = Array.isArray(n.profileEvents) && n.profileEvents.length
            ? n.profileEvents
            : PROFILE_EVENTS;
          const compactProfileChannels = Array.isArray(n.profileChannels) && n.profileChannels.length
            ? n.profileChannels
            : PROFILE_CHANNELS;
          const compactChannels = compactProfileChannels.slice(0, 4)
            .map((ch)=>{
              const label = typeof ch === "string" ? ch : (ch?.label || "");
              const icon = typeof ch === "string" ? "" : (ch?.icon || "");
              return `<span class="profileChannel"><img src="${escapeHTML(captureSafeUrl(icon) || icon)}" alt="${escapeHTML(label)}" /></span>`;
            })
            .join("");
          const compactProps = compactProfileProperties.slice(0, 3)
            .map((prop)=>{
              const label = typeof prop === "string" ? prop : (prop?.label || "");
              const value = typeof prop === "string" ? "" : (prop?.value || "");
              return `<div class="profileProp"><span class="label">${escapeHTML(translateKnownPhrase(label))}</span><span class="value">${escapeHTML(translateKnownPhrase(value))}</span></div>`;
            })
            .join("");
          const compactEvents = compactProfileEvents.slice(0, 2)
            .map((evt)=>{
              const label = typeof evt === "string" ? evt : (evt?.label || "");
              return `<div class="profileEvent">${escapeHTML(translateKnownPhrase(label))}</div>`;
            })
            .join("");
          el.innerHTML = `
            <div class="profileCard">
              <div class="profileTop">
                <img class="profileAvatar" src="https://cdn-icons-png.flaticon.com/512/12225/12225935.png" alt="John Smith" />
                <div class="profileIdentity">
                  <div class="profileName">${escapeHTML(n.title || "John Smith")}</div>
                  <div class="profileKind">${escapeHTML(translateKnownPhrase(n.desc || "Profile / CDP"))}</div>
                </div>
              </div>
              <div class="profileMeta">
                <div class="profilePanel">
                  <div class="profilePanelTitle">${escapeHTML(translateKnownPhrase("Propriedades"))}</div>
                  <div class="profileProps">${compactProps}</div>
                  <div class="profilePanelTitle">${escapeHTML(translateKnownPhrase("Canais favoritos"))}</div>
                  <div class="profileChannels">${compactChannels}</div>
                </div>
                <div class="profilePanel">
                  <div class="profilePanelTitle">${escapeHTML(translateKnownPhrase("Eventos recentes"))}</div>
                  <div class="profileEvents">${compactEvents}</div>
                </div>
              </div>
            </div>
            <div class="nodeActions">
              <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
              ${compactToggleButtonHtml(n)}
              <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
            </div>
            <div class="nodeResize" title="Redimensionar bloco" aria-hidden="true"></div>
          `;
        } else {
          el.innerHTML = `
            <div class="compactFace">
              <div class="nodeIcon compactIcon">${escapeHTML(n.icon || "BL")}</div>
            </div>
            <div class="nodeActions">
              <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
              ${compactToggleButtonHtml(n)}
              <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
            </div>
          `;
        }
      } else if(compactToggleAnim?.nodeId === n.id){
        el.classList.add("compactAnim", `compactAnim-${compactToggleAnim.mode}`);
      } else if(n.variant === "text"){
        const fontSize = clamp(Number(n.fontSize || 28), 12, 92);
        const fontFamily = (n.fontFamily || "Georgia").toString();
        const color = (n.color || "#1e293b").toString();
        const align = (n.align || "left").toString();
        const textValue = escapeHTML(n.text || "Texto livre");
        el.innerHTML = `
          <div class="textWrap">
            <div class="textNodeBody" style="font-size:${fontSize}px;font-family:${escapeHTML(fontFamily)};color:${escapeHTML(color)};text-align:${escapeHTML(align)};">${textValue}</div>
          </div>
          <div class="nodeActions">
            <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
            <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
          </div>
        `;
      } else if(n.variant === "sticky"){
        const stickyText = escapeHTML(n.text || STICKY_DEFAULT_TEXT);
        const stickyColor = (n.stickyColor || "#fef08a").toString();
        const stickyFontSize = clamp(Number(n.fontSize || STICKY_DEFAULT_FONT), 10, 42);
        const colorsHtml = STICKY_COLORS
          .map((c)=>`<button class="stickyColorBtn" type="button" data-sticky-color="${escapeHTML(c)}" style="background:${escapeHTML(c)};" title="Cor ${escapeHTML(c)}"></button>`)
          .join("");
        el.style.setProperty("--stickyColor", stickyColor);
        el.innerHTML = `
          <div class="stickyBody" contenteditable="false" spellcheck="false" style="font-size:${stickyFontSize}px;">${stickyText}</div>
          <div class="stickyFooter">
            <div class="stickyColors">${colorsHtml}</div>
          </div>
          <div class="nodeActions">
            <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
            <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
          </div>
          <div class="nodeResize" title="Redimensionar bloco" aria-hidden="true"></div>
        `;
      } else if(n.variant === "profile"){
        const profileName = escapeHTML(n.title || "John Smith");
        const profileKind = escapeHTML(translateKnownPhrase(n.desc || "Profile / CDP"));
        const profileProperties = Array.isArray(n.profileProperties) && n.profileProperties.length
          ? n.profileProperties
          : PROFILE_PROPERTIES;
        const profileEvents = Array.isArray(n.profileEvents) && n.profileEvents.length
          ? n.profileEvents
          : PROFILE_EVENTS;
        const profileChannels = Array.isArray(n.profileChannels) && n.profileChannels.length
          ? n.profileChannels
          : PROFILE_CHANNELS;
        const propsHtml = profileProperties.map((prop)=>{
          const label = typeof prop === "string" ? prop : (prop?.label || "");
          const value = typeof prop === "string" ? "" : (prop?.value || "");
          return `<div class="profileProp"><span class="label">${escapeHTML(translateKnownPhrase(label))}</span><span class="value">${escapeHTML(translateKnownPhrase(value))}</span></div>`;
        }).join("");
        const channelsHtml = profileChannels.map((ch)=>{
          const label = typeof ch === "string" ? ch : (ch?.label || "");
          const icon = typeof ch === "string" ? "" : (ch?.icon || "");
          return `<span class="profileChannel" title="${escapeHTML(label)}"><img src="${escapeHTML(captureSafeUrl(icon) || icon)}" alt="${escapeHTML(label)}" /></span>`;
        }).join("");
        const eventsHtml = profileEvents.map((evt)=>{
          const label = typeof evt === "string" ? evt : (evt?.label || "");
          return `<div class="profileEvent">${escapeHTML(translateKnownPhrase(label))}</div>`;
        }).join("");
        el.innerHTML = `
          <div class="profileCard">
            <div class="profileTop">
              <img class="profileAvatar" src="https://cdn-icons-png.flaticon.com/512/12225/12225935.png" alt="John Smith" />
              <div class="profileIdentity">
                <div class="profileName">${profileName}</div>
                <div class="profileKind">${profileKind}</div>
              </div>
            </div>
            <div class="profileMeta">
              <div class="profilePanel">
                <div class="profilePanelTitle">${escapeHTML(translateKnownPhrase("Propriedades"))}</div>
                <div class="profileProps">${propsHtml}</div>
                <div class="profilePanelTitle">${escapeHTML(translateKnownPhrase("Canais favoritos"))}</div>
                <div class="profileChannels">${channelsHtml}</div>
              </div>
              <div class="profilePanel">
                <div class="profilePanelTitle">${escapeHTML(translateKnownPhrase("Eventos recentes"))}</div>
                <div class="profileEvents">${eventsHtml}</div>
              </div>
            </div>
          </div>
          <div class="nodeActions">
            <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
            ${compactToggleButtonHtml(n)}
            <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
          </div>
          <div class="nodeResize" title="Redimensionar bloco" aria-hidden="true"></div>
        `;
      } else if(n.variant === "area"){
        const areaPattern = (n.areaPattern || "dotted").toString();
        const areaStrokeWidth = clamp(Number(n.areaStrokeWidth || 2), 1, 12);
        const areaAnimated = !!n.areaAnimated;
        const areaLocked = !!n.areaLocked;
        const areaColor = (n.areaColor || "#94a3b8").toString();
        const frameW = Math.max(80, Number(n.w || 420));
        const frameH = Math.max(60, Number(n.h || 220));
        const dashArray = areaPattern === "solid"
          ? ""
          : areaPattern === "dashed"
            ? `${areaStrokeWidth * 5} ${areaStrokeWidth * 3}`
            : `${Math.max(1, areaStrokeWidth)} ${Math.max(2, areaStrokeWidth * 2)}`;
        el.classList.toggle("is-animated", areaAnimated);
        el.classList.toggle("locked", areaLocked);
        el.style.setProperty("--areaStroke", areaColor);
        el.innerHTML = `
          <div class="areaCard">
            <div class="areaCanvasHint"></div>
            <svg class="areaFrame" viewBox="0 0 ${frameW} ${frameH}" preserveAspectRatio="none" aria-hidden="true">
              <rect class="areaStroke" x="${areaStrokeWidth / 2}" y="${areaStrokeWidth / 2}" width="${Math.max(0, frameW - areaStrokeWidth)}" height="${Math.max(0, frameH - areaStrokeWidth)}" rx="18" ry="18" stroke-width="${areaStrokeWidth}" stroke-dasharray="${escapeHTML(dashArray)}"></rect>
            </svg>
            <div class="areaLabel"><span class="areaBadge"></span>${escapeHTML(n.title || "Bloco de área")}</div>
          </div>
          <div class="nodeActions">
            <button class="nact back" type="button" title="Enviar para trás" aria-label="Enviar para trás"><img src="https://static.thenounproject.com/png/3843793-200.png" alt="Enviar para trás" /></button>
            <button class="nact front" type="button" title="Trazer para frente" aria-label="Trazer para frente"><img src="https://static.thenounproject.com/png/3843793-200.png" alt="Trazer para frente" /></button>
            <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
            <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
          </div>
          <div class="nodeResize" title="Redimensionar bloco" aria-hidden="true"></div>
        `;
      } else if(n.variant === "solution"){
        let layout = n.solutionLayout || "pills";
        const isTesseract = (n.title || "").toLowerCase().includes("tesseractdb");
        if(isTesseract){
          if(layout === "logo") layout = "tesseract";
          if(n.solutionLayout !== "tesseract") n.solutionLayout = "tesseract";
          const mapped = (Array.isArray(n.items) ? n.items : [])
            .map((it)=>{
              const rawLabel = typeof it === "string" ? it : (it?.label || "");
              const txt = (rawLabel || "").toString().trim();
              if(!txt) return null;
              if(/network\s*columnar|ncf/i.test(txt)) return null;
              let nextLabel = txt;
              if(/lookback/i.test(txt)) nextLabel = "Retenção entre 3~10 anos";
              if(/ai\s*\/\s*ml|ai\/ml|dados em tempo real/i.test(txt)) nextLabel = "Dados em tempo real";
              const key = (nextLabel || "").toLowerCase();
              const mappedIcon = TESSERACT_ICON_BY_LABEL[key];
              const nextIcon = mappedIcon || ((typeof it === "object" && it?.icon) ? it.icon : TESSERACT_ITEM_ICON);
              return { icon: nextIcon, label: nextLabel };
            })
            .filter(Boolean);
          const dedup = [];
          const seen = new Set();
          for(const it of mapped){
            const key = (it.label || "").toLowerCase();
            if(seen.has(key)) continue;
            seen.add(key);
            dedup.push(it);
          }
          if(dedup.length) n.items = dedup;
          if(!Array.isArray(n.items) || !n.items.length || (n.items.length === 1 && (typeof n.items[0] === "string") && n.items[0].toLowerCase().includes("storage"))){
            n.items = TESSERACT_PILL_DEFAULTS.map(it => ({ ...it }));
          }
        }
        if(layout === "grid" && (n.title || "").toLowerCase().includes("segments") && Array.isArray(n.items)){
          n.items = n.items.map((it)=>{
            if(typeof it === "string"){
              return { icon:"•", label:it };
            }
            const labelRaw = (it?.label || "").toString();
            const labelKey = labelRaw.trim().toLowerCase();
            const nextIcon = SEGMENTS_ICON_BY_LABEL[labelKey] || it?.icon || "•";
            const nextMono = SEGMENTS_MONO.has(labelKey) || !!it?.mono;
            return { ...it, icon: nextIcon, mono: nextMono };
          });
        }
        const solutionItems = (n.items || []).map((item, idx)=>{
          const label = typeof item === "string" ? item : (item?.label || "");
          const icon = typeof item === "string" ? "" : (item?.icon || "");
          const isIconUrl = !!normalizeLogoUrl(icon);
          const iconUrl = isIconUrl ? (captureSafeUrl(icon) || icon) : "";
          const mono = typeof item === "object" && !!item?.mono;
          const tone = typeof item === "object" ? (item?.tone || "") : "";
          const iconClasses = [mono ? "mono" : "", tone === "brand" ? "tone-brand" : ""].filter(Boolean).join(" ");
          if(layout === "grid"){
            return `
              <div class="solutionGridItem" draggable="true" data-item-index="${idx}" data-node-id="${n.id}">
                <button class="solItemDel" type="button" data-node="${n.id}" data-index="${idx}" title="Remover item" aria-label="Remover item">✕</button>
                <div class="solutionGridIcon">${isIconUrl ? `<img src="${escapeHTML(iconUrl)}" alt="${escapeHTML(label || "icon")}" ${iconClasses ? `class="${escapeHTML(iconClasses)}"` : ""} />` : escapeHTML(icon || "•")}</div>
                <div class="solutionGridLabel">${escapeHTML(label)}</div>
              </div>
            `;
          }
          return `
            <div class="solutionItem" draggable="true" data-item-index="${idx}" data-node-id="${n.id}">
              ${escapeHTML(label)}
              <button class="solItemDel" type="button" data-node="${n.id}" data-index="${idx}" title="Remover item" aria-label="Remover item">✕</button>
            </div>
          `;
        }).join("");
        const hasSolutionItems = Array.isArray(n.items) && n.items.length > 0;
        const solutionDesc = (n.desc || "").trim();
        const solutionDescHtml = solutionDesc
          ? `<div class="solutionDescription${hasSolutionItems ? "" : " isSolo"}">${escapeHTML(solutionDesc)}</div>`
          : "";
        const kindNormalized = normalizeI18nText(n.kind || "");
        const showSolutionBadge = !!kindNormalized && kindNormalized !== "solucao" && kindNormalized !== "solucion";
        const solutionBadgeHtml = showSolutionBadge
          ? `<div class="nodeType ${typeClass(n.type)}">${escapeHTML(n.kind || "")}</div>`
          : "";

        const solutionBody = !hasSolutionItems
          ? ``
          : (layout === "grid"
            ? `<div class="solutionGrid">${solutionItems}</div>`
          : (layout === "tesseract"
            ? `
              <div class="tesseractLayout">
                <div class="tesseractBrand">
                  <div class="solutionLogoBadge">
                    <img src="${escapeHTML(captureSafeUrl(n.solutionLogo || TESSERACT_LOGO_URL) || TESSERACT_LOGO_URL)}" alt="TesseractDB" />
                  </div>
                  <div class="tesseractTitle">${escapeHTML(n.title || "TesseractDB™")}</div>
                </div>
                <div class="tesseractRight">
                  <div class="tesseractTools">
                    <button class="solTool solAdd" type="button" title="Adicionar pill">+</button>
                  </div>
                  <div class="tesseractList">
                    ${(n.items || []).map((item, idx)=>{
                      const label = typeof item === "string" ? item : (item?.label || "");
                      const icon = typeof item === "string" ? TESSERACT_ITEM_ICON : (item?.icon || TESSERACT_ITEM_ICON);
                      const iconHtml = icon
                        ? `<img class="tesseractItemLogo" src="${escapeHTML(captureSafeUrl(icon) || icon)}" alt="${escapeHTML(label || "item")}" />`
                        : `<span class="tesseractItemLogoFallback">DB</span>`;
                      return `<div class="tesseractItem" draggable="true" data-item-index="${idx}" data-node-id="${n.id}">
                        <button class="solItemDel" type="button" data-node="${n.id}" data-index="${idx}" title="Remover item" aria-label="Remover item">✕</button>
                        ${iconHtml}
                        <span class="tesseractItemLabel">${escapeHTML(label)}</span>
                      </div>`;
                    }).join("")}
                  </div>
                </div>
              </div>
            `
          : (layout === "logo"
            ? `
              <div class="solutionLogoWrap">
                <div class="solutionLogoBadge">${escapeHTML(n.solutionLogo || "🧱")}</div>
                ${(n.items || []).map((item, idx)=>{
                  const label = typeof item === "string" ? item : (item?.label || "");
                  return `<div class="solutionItem" draggable="true" data-item-index="${idx}" data-node-id="${n.id}">${escapeHTML(label)}<button class="solItemDel" type="button" data-node="${n.id}" data-index="${idx}" title="Remover item" aria-label="Remover item">✕</button></div>`;
                }).join("")}
              </div>
            `
            : `<div class="solutionList">${solutionItems}</div>`)));

        el.innerHTML = `
          <div class="solutionCard">
            <div class="solutionShell">
              ${layout === "tesseract" ? "" : `
              <div class="solutionRail">
                <div class="solutionBrand">
                  <img class="solutionBrandLogo" src="https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png" alt="CleverTap" />
                  <div class="solutionBrandTitle">${escapeHTML(n.title || "Martech")}</div>
                </div>
                <div class="solutionMeta">
                  ${solutionBadgeHtml}
                  <div class="solutionTools">
                    <button class="solTool solAdd" type="button" title="Adicionar item">+</button>
                    <button class="solTool solUndo" type="button" title="Desfazer">↶</button>
                    <button class="solTool solRedo" type="button" title="Refazer">↷</button>
                  </div>
                </div>
              </div>
              `}
              <div class="solutionContent">
                ${solutionDescHtml}
                ${solutionBody}
              </div>
            </div>
          </div>
          <div class="nodeActions">
            <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
            ${compactToggleButtonHtml(n)}
            <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
          </div>
          <div class="nodeResize" title="Redimensionar bloco" aria-hidden="true"></div>
        `;
      } else if(n.variant === "organizer"){
        const extraOptions = (Array.isArray(n.orgOptions) && n.orgOptions.length) ? n.orgOptions : [];
        const orgOptions = [...new Set([...ORGANIZER_OPTIONS, ...extraOptions])];
        if(!orgOptions.includes(n.organizerPreset || "")){
          n.organizerPreset = orgOptions.includes(n.title) ? n.title : orgOptions[0];
        }
        const selectedOrg = n.organizerPreset || orgOptions[0];
        const displayTitle = (n.title || selectedOrg || orgOptions[0]).toString().trim() || orgOptions[0];
        const isAiMode = selectedOrg === "Clever.AI";
        const optHtml = orgOptions.map((opt)=>`<button class="orgOpt" type="button" data-org="${escapeHTML(opt)}">${escapeHTML(opt)}</button>`).join("");
        el.innerHTML = `
          <div class="organizerCard ${isAiMode ? "aiMode" : ""}">
            <div class="organizerHead">
              <button class="orgTitleBtn" type="button" title="Alterar categoria">${escapeHTML(displayTitle)}</button>
              <div class="orgMenu ${n.orgMenuOpen ? "show" : ""}">
                ${optHtml}
              </div>
            </div>
            <div class="organizerBody"></div>
          </div>
          <div class="nodeActions">
            <button class="nact back" type="button" title="Enviar para trás" aria-label="Enviar para trás"><img src="https://static.thenounproject.com/png/3843793-200.png" alt="Enviar para trás" /></button>
            <button class="nact front" type="button" title="Trazer para frente" aria-label="Trazer para frente"><img src="https://static.thenounproject.com/png/3843793-200.png" alt="Trazer para frente" /></button>
            <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
            ${compactToggleButtonHtml(n)}
            <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
          </div>
          <div class="nodeResize" title="Redimensionar bloco" aria-hidden="true"></div>
        `;
      } else if(n.variant === "ai"){
        const aiDefaultDesc = {
          "scribeai": "Assistente de conteúdo com AI generativa.",
          "askai": "Camada de decisão e recomendação da jornada com AI.",
          "ai agent": "Agentes inteligentes para estratégia, decisão e ação."
        };
        const aiKey = (n.title || "").toLowerCase();
        if(!(n.desc || "").trim() && aiDefaultDesc[aiKey]){
          n.desc = aiDefaultDesc[aiKey];
        }
        if((n.title || "").toLowerCase() === "scribeai"){
          const mapToEnglish = {
            "geracao de copies":"Copy Generation",
            "geração de copies":"Copy Generation",
            "analise emocional":"Emotion Signals",
            "análise emocional":"Emotion Signals",
            "reescrita de conteudo":"Content Rewrite",
            "reescrita de conteúdo":"Content Rewrite",
            "otimizacao por emocao":"Emotion Optimization",
            "otimização por emoção":"Emotion Optimization",
            "canais suportados":"Channel Support",
            "emotions":"Emotion Signals"
          };
          const cleaned = [];
          for(const raw of (Array.isArray(n.items) ? n.items : [])){
            const text = (typeof raw === "string" ? raw : (raw?.label || "")).trim();
            if(!text) continue;
            const key = text
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();
            if(key.includes("planos") || key.includes("plano") || key.includes("plan ")) continue;
            const left = text.includes(":") ? text.split(":")[0].trim() : text;
            const leftKey = left
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();
            const next = mapToEnglish[leftKey] || left;
            if(!cleaned.includes(next)) cleaned.push(next);
          }
          if(cleaned.length) n.items = cleaned;
        }
        const aiItems = (Array.isArray(n.items) ? n.items : [])
          .map((item, idx)=>{
            const rawLabel = typeof item === "string" ? item : (item?.label || "");
            const label = rawLabel.includes(":")
              ? rawLabel.split(":")[0].trim()
              : rawLabel.trim();
            return `
              <div class="solutionItem" draggable="true" data-item-index="${idx}" data-node-id="${n.id}">
                ${escapeHTML(label)}
                <button class="solItemDel" type="button" data-node="${n.id}" data-index="${idx}" title="Remover item" aria-label="Remover item">✕</button>
              </div>
            `;
          })
          .join("");
        const aiDesc = (n.desc || "").replace(/openai/ig, "AI").trim();
        const aiDescHtml = aiDesc ? `<div class="aiDesc">${escapeHTML(aiDesc)}</div>` : "";
        el.innerHTML = `
          <div class="aiCard">
            <div class="aiInner">
              <div class="aiHead">
                <div class="aiTitleRow">
                  <span class="aiIconBadge"><img src="https://img.icons8.com/ios11/512/FFFFFF/bard.png" alt="AI" /></span>
                  <div class="aiTitle">${escapeHTML(n.title || "ScribeAI")}</div>
                </div>
                ${aiDescHtml}
                <div class="aiTools">
                  <button class="solTool solAdd" type="button" title="Adicionar pill">+</button>
                </div>
              </div>
              <div class="aiList">${aiItems}</div>
            </div>
          </div>
          <div class="nodeActions">
            <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
            ${compactToggleButtonHtml(n)}
            <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
          </div>
          <div class="nodeResize" title="Redimensionar bloco" aria-hidden="true"></div>
        `;
      } else if(n.variant === "stack"){
        const stacks = Array.isArray(n.stacks) ? n.stacks : [];
        const catalog = stackCatalogForNode(n);
        const isProviderCatalog = (n.stackCatalog || "") === "whatsappProviders";
        const termSingular = isProviderCatalog ? "provedor" : "stack";
        const termPlural = isProviderCatalog ? "provedores" : "stacks";
        const termSingularCap = isProviderCatalog ? "Provedor" : "Stack";
        const pills = stacks.map((id)=>{
          const item = stackById(id, n);
          if(!item) return "";
          const logo = item.logo
            ? `<img src="${escapeHTML(captureSafeUrl(item.logo) || item.logo)}" alt="${escapeHTML(item.label)}" />`
            : `<span style="font-size:10px;font-weight:800;min-width:16px;text-align:center;">${escapeHTML(shortTag(item.label))}</span>`;
          return `
            <div class="stackPill">
              ${logo}
              <span class="label">${escapeHTML(item.label)}</span>
              <button type="button" class="stackDel" data-stack="${escapeHTML(item.id)}" title="Remover ${escapeHTML(termSingular)}">×</button>
            </div>
          `;
        }).join("");
        const options = catalog
          .filter(s => !stacks.includes(s.id))
          .map(s => `
            <button type="button" class="stackOption" data-stack="${escapeHTML(s.id)}">
              ${s.logo
                ? `<img src="${escapeHTML(captureSafeUrl(s.logo) || s.logo)}" alt="${escapeHTML(s.label)}" />`
                : `<span style="width:18px;display:inline-block;text-align:center;font-weight:800;">${escapeHTML(shortTag(s.label))}</span>`}
              <span>${escapeHTML(s.label)}</span>
            </button>
          `).join("");
        el.innerHTML = `
          <div class="hdr">
            <div class="leftHdr">
              <div class="nodeIcon">${escapeHTML(n.icon||"BL")}</div>
              <div>
                <div class="nodeTitle" title="${escapeHTML(n.title||"")}">${escapeHTML(n.title || "Bloco")}</div>
                <div class="nodeDesc">${escapeHTML(n.desc || "")}</div>
              </div>
            </div>
            <div class="nodeType ${typeClass(n.type)}">${escapeHTML(n.kind || "Box")}</div>
          </div>
          <div class="stackWrap">
            <div class="stackMain">
              <div class="stackPills">${pills || `<div class="stackEmpty">Nenhum ${escapeHTML(termSingular)} selecionado.</div>`}</div>
              <div class="stackMenu">${options || `<div class="stackEmpty" style="padding:8px;">Todos os ${escapeHTML(termPlural)} já foram adicionados.</div>`}</div>
            </div>
            <button class="stackAdd" type="button" aria-label="Adicionar ${escapeHTML(termSingular)}" title="Adicionar ${escapeHTML(termSingularCap)}">+</button>
          </div>
          <div class="nodeActions">
            <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
            ${compactToggleButtonHtml(n)}
            <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
          </div>
        `;
      } else {
        el.innerHTML = `
          <div class="hdr">
            <div class="leftHdr">
              <div class="nodeIcon">${escapeHTML(n.icon||"BL")}</div>
              <div>
                <div class="nodeTitle" title="${escapeHTML(n.title||"")}">${escapeHTML(n.title || "Bloco")}</div>
                <div class="nodeDesc">${escapeHTML(n.desc || "")}</div>
              </div>
            </div>
            <div class="nodeType ${typeClass(n.type)}">${escapeHTML(n.kind || "Box")}</div>
          </div>
          <div class="nodeActions">
            <button class="nact dup" type="button" title="Duplicar bloco" aria-label="Duplicar bloco"><img src="${DUP_ICON_URL}" alt="Duplicar" /></button>
            <button class="nact comp compactToggle" type="button" title="Minimizar bloco" aria-label="Minimizar bloco"><img src="${COMPACT_ICON_URL}" alt="Minimizar" /></button>
            <button class="nact del" type="button" title="Excluir bloco" aria-label="Excluir bloco">✕</button>
          </div>
        `;
      }

      nodesLayer.appendChild(el);
      el.querySelectorAll("img").forEach((img)=>{
        img.draggable = false;
        img.addEventListener("dragstart", (ev)=>ev.preventDefault());
      });
      if(n.variant !== "solution" && n.variant !== "text" && n.variant !== "profile" && n.variant !== "area"){
        const iconEl = el.querySelector(".nodeIcon");
        const logoUrl = normalizeLogoUrl(n.logoUrl);
        if(iconEl && logoUrl && !n.logoInvalid){
          const fallbackText = (n.icon || n.title || "BL").toString().slice(0, 3).toUpperCase();
          iconEl.textContent = "";
          const img = document.createElement("img");
          img.src = captureSafeUrl(logoUrl) || logoUrl;
          img.alt = "Logo";
          img.loading = "lazy";
          img.onerror = ()=>{
            n.logoInvalid = true;
            iconEl.textContent = fallbackText;
            showToast("Logo inválida: fallback aplicado.");
          };
          iconEl.appendChild(img);
        }
      }

      if(n.variant === "text"){
        const textEl = el.querySelector(".textNodeBody");
        textEl?.addEventListener("click", (e)=>{
          e.stopPropagation();
          selectNode(n.id);
        });
      } else if(n.variant === "sticky"){
        const stickyBody = el.querySelector(".stickyBody");
        stickyBody?.addEventListener("click", (e)=>{
          e.stopPropagation();
          if(e.shiftKey){
            selectNode(n.id, true);
            return;
          }
          if(selectedNodeIds.size === 1 && selectedNodeIds.has(n.id) && selected.type === "node" && selected.id === n.id){
            return;
          }
          setSingleNodeSelection(n.id);
          nodesLayer.querySelectorAll(".node").forEach((nodeEl)=>{
            nodeEl.classList.toggle("selected", nodeEl.dataset.id === n.id);
          });
          refreshTextBar();
        });
        stickyBody?.addEventListener("dblclick", (e)=>{
          e.stopPropagation();
          stickyBody.setAttribute("contenteditable", "true");
          stickyBody.focus();
          const sel = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(stickyBody);
          sel?.removeAllRanges();
          sel?.addRange(range);
        });
        stickyBody?.addEventListener("blur", ()=>{
          stickyBody.setAttribute("contenteditable", "false");
          n.text = (stickyBody.textContent || "").trim() || STICKY_DEFAULT_TEXT;
          stickyBody.textContent = n.text;
          ensureNodeI18n(n);
          n.i18n.text[currentLanguage] = n.text;
          queuePersist();
          refreshTextBar();
        });
        stickyBody?.addEventListener("keydown", (e)=>{
          if(e.key === "Escape"){
            e.preventDefault();
            stickyBody.textContent = n.text || STICKY_DEFAULT_TEXT;
            stickyBody.blur();
            return;
          }
          if(e.key === "Delete" || e.key === "Backspace"){
            e.stopPropagation();
          }
        });
        el.querySelectorAll(".stickyColorBtn").forEach((btn)=>{
          btn.addEventListener("click", (e)=>{
            e.stopPropagation();
            const c = btn.dataset.stickyColor;
            if(!c) return;
            n.stickyColor = c;
            render();
          });
        });
      }

      if(n.variant === "solution" || n.variant === "organizer" || n.variant === "ai"){
        el.style.height = "auto";
      }
      const measuredBase = (n.variant === "solution" && isTesseractNode) ? 132 : baseHeightFor(n.variant);
      const measuredNatural = Math.max(measuredBase, el.offsetHeight);
      const measuredH = (n.variant === "solution" || n.variant === "organizer" || n.variant === "ai")
        ? Math.max(measuredNatural, n.userMinH || 0)
        : (n.variant === "sticky" ? clamp(Number(n.h || measuredNatural), STICKY_MIN_H, STICKY_MAX_H) : measuredNatural);
      n.h = measuredH;
      if(n.variant === "solution" || n.variant === "organizer" || n.variant === "ai"){
        el.style.height = measuredH + "px";
        el.style.minHeight = "0px";
      } else if(n.variant === "sticky"){
        el.style.height = measuredH + "px";
        el.style.minHeight = `${STICKY_MIN_H}px`;
      } else if(n.variant !== "text" && n.variant !== "sticky"){
        el.style.height = measuredH + "px";
        el.style.minHeight = measuredH + "px";
      }

      // ports
      if(isConnectableNode(n)){
        for(const p of PORTS){
          const port = document.createElement("div");
          port.className = "port";
          port.dataset.node = n.id;
          port.dataset.port = p;

          const pos = portPos(n, p);
          port.style.left = (pos.x - n.x - 6) + "px"; // relative to node
          port.style.top  = (pos.y - n.y - 6) + "px";

          // active state if currently selected as connectFrom
          if(connectFrom && connectFrom.nodeId===n.id && normalizePortKey(connectFrom.port)===p){
            port.classList.add("active");
          }
          if(connectDrag?.target && connectDrag.target.nodeId===n.id && normalizePortKey(connectDrag.target.port)===p){
            port.classList.add("preview");
          }

          port.addEventListener("mousedown", (e)=>{
            startConnectDrag(e, n.id, p);
          });
      el.appendChild(port);
        }
      }

      const btnDup = el.querySelector(".nact.dup");
      const btnCompact = el.querySelector(".compactToggle");
      const btnDel = el.querySelector(".nact.del");
      const btnFront = el.querySelector(".nact.front");
      const btnBack = el.querySelector(".nact.back");
      btnDup?.addEventListener("click", (e)=>{
        e.stopPropagation();
        duplicateNode(n.id);
      });
      btnCompact?.addEventListener("click", (e)=>{
        e.stopPropagation();
        toggleNodeCompact(n.id);
      });
      btnDel?.addEventListener("click", (e)=>{
        e.stopPropagation();
        removeNodeById(n.id);
      });
      btnFront?.addEventListener("click", (e)=>{
        e.stopPropagation();
        bringNodeToFront(n.id);
      });
      btnBack?.addEventListener("click", (e)=>{
        e.stopPropagation();
        sendNodeToBack(n.id);
      });
      el.querySelectorAll(".solItemDel").forEach(btn=>{
        btn.addEventListener("click", (e)=>{
          e.stopPropagation();
          const idx = Number(btn.dataset.index);
          if(!Array.isArray(n.items) || Number.isNaN(idx)) return;
          rememberActionState();
          const removed = normalizeItem(n.items[idx]);
          n.items.splice(idx, 1);
          pushItemHistory({ kind:"remove", nodeId:n.id, index:idx, item: removed });
          showToast("Item removido.");
          render();
        });
      });
      const stackAddBtn = el.querySelector(".stackAdd");
      const stackMenu = el.querySelector(".stackMenu");
      stackAddBtn?.addEventListener("click", (e)=>{
        e.stopPropagation();
        stackMenu?.classList.toggle("show");
      });
      el.querySelectorAll(".stackOption").forEach(opt=>{
        opt.addEventListener("click", (e)=>{
          e.stopPropagation();
          const sid = opt.dataset.stack;
          if(!sid) return;
          if(!Array.isArray(n.stacks)) n.stacks = [];
          rememberActionState();
          if(!n.stacks.includes(sid)) n.stacks.push(sid);
          render();
        });
      });
      el.querySelectorAll(".stackDel").forEach(del=>{
        del.addEventListener("click", (e)=>{
          e.stopPropagation();
          const sid = del.dataset.stack;
          if(!sid || !Array.isArray(n.stacks)) return;
          rememberActionState();
          n.stacks = n.stacks.filter(s => s !== sid);
          render();
        });
      });
      const orgTitleBtn = el.querySelector(".orgTitleBtn");
      orgTitleBtn?.addEventListener("mousedown", (e)=> e.stopPropagation());
      let orgClickTimer = null;
      orgTitleBtn?.addEventListener("click", (e)=>{
        e.stopPropagation();
        if(orgClickTimer) clearTimeout(orgClickTimer);
        orgClickTimer = setTimeout(()=>{
          for(const node of nodes){
            if(node.variant === "organizer" && node.id !== n.id) node.orgMenuOpen = false;
          }
          n.orgMenuOpen = !n.orgMenuOpen;
          render();
          orgClickTimer = null;
        }, 180);
      });
      orgTitleBtn?.addEventListener("dblclick", (e)=>{
        e.stopPropagation();
        if(orgClickTimer){
          clearTimeout(orgClickTimer);
          orgClickTimer = null;
        }
        const nextTitle = prompt("Nome do organizador:", (n.title || n.organizerPreset || "").toString());
        if(nextTitle === null) return;
        const trimmed = nextTitle.trim();
        if(!trimmed) return;
        rememberActionState();
        n.title = trimmed;
        const organizerOptions = [
          "Fonte de dados",
          "Mecanismo de integração",
          "Orquestrador",
          "Canais de comunicação",
          "Data Layer",
          "Clever.AI",
          "Remarketing",
          ...(Array.isArray(n.orgOptions) ? n.orgOptions : [])
        ];
        if(organizerOptions.includes(trimmed)) n.organizerPreset = trimmed;
        ensureNodeI18n(n);
        n.i18n.title[currentLanguage] = n.title;
        n.orgMenuOpen = false;
        render();
      });
      el.querySelectorAll(".orgOpt").forEach(opt=>{
        opt.addEventListener("mousedown", (e)=> e.stopPropagation());
        opt.addEventListener("click", (e)=>{
          e.stopPropagation();
          const label = opt.dataset.org;
          if(!label) return;
          rememberActionState();
          n.organizerPreset = label;
          n.title = label;
          n.orgMenuOpen = false;
          ensureNodeI18n(n);
          n.i18n.title[currentLanguage] = n.title;
          render();
        });
      });
      const btnAddItem = el.querySelector(".solAdd");
      btnAddItem?.addEventListener("click", (e)=>{
        e.stopPropagation();
        const value = prompt("Nome do novo item:");
        if(!value) return;
        if(!Array.isArray(n.items)) n.items = [];
        const trimmed = value.trim();
        if(!trimmed) return;
        rememberActionState();
        const newItem = (n.solutionLayout === "grid")
          ? { icon:"•", label:trimmed }
          : ((n.solutionLayout === "tesseract")
            ? { icon:TESSERACT_ITEM_ICON, label:trimmed }
            : trimmed);
        n.items.push(newItem);
        pushItemHistory({ kind:"add", nodeId:n.id, index:n.items.length - 1, item: normalizeItem(newItem) });
        render();
      });
      const btnUndo = el.querySelector(".solUndo");
      btnUndo?.addEventListener("click", (e)=>{
        e.stopPropagation();
        undoItemAction();
      });
      const btnRedo = el.querySelector(".solRedo");
      btnRedo?.addEventListener("click", (e)=>{
        e.stopPropagation();
        redoItemAction();
      });

      el.querySelectorAll(".solutionItem, .solutionGridItem, .tesseractItem").forEach(itemEl=>{
        itemEl.addEventListener("dragstart", (e)=>{
          e.stopPropagation();
          const idx = Number(itemEl.dataset.itemIndex);
          if(Number.isNaN(idx)) return;
          dragSolutionItem = { nodeId: n.id, index: idx };
          itemEl.classList.add("dragging");
          if(e.dataTransfer){
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", `${n.id}:${idx}`);
          }
        });
        itemEl.addEventListener("dragend", ()=>{
          itemEl.classList.remove("dragging");
          dragSolutionItem = null;
        });
        itemEl.addEventListener("dragover", (e)=>{
          if(!dragSolutionItem || dragSolutionItem.nodeId !== n.id) return;
          e.preventDefault();
          if(e.dataTransfer) e.dataTransfer.dropEffect = "move";
        });
        itemEl.addEventListener("drop", (e)=>{
          e.preventDefault();
          e.stopPropagation();
          if(!dragSolutionItem || dragSolutionItem.nodeId !== n.id) return;
          const to = Number(itemEl.dataset.itemIndex);
          const from = dragSolutionItem.index;
          dragSolutionItem = null;
          if(Number.isNaN(from) || Number.isNaN(to) || from === to || !Array.isArray(n.items)) return;
          rememberActionState();
          const [moved] = n.items.splice(from, 1);
          const insertAt = from < to ? to - 1 : to;
          n.items.splice(insertAt, 0, moved);
          pushItemHistory({ kind:"move", nodeId:n.id, from, to: insertAt });
          render();
        });
      });
      const resizeHandle = el.querySelector(".nodeResize");
      resizeHandle?.addEventListener("mousedown", (e)=>startResizeNode(e, n.id));
      el.addEventListener("mousedown", (e)=>startDragNode(e, n.id));
      el.addEventListener("click", (e)=>{
        e.stopPropagation();
        if(e.target.closest(".orgTitleBtn") || e.target.closest(".orgMenu")) return;
        if(e.target.closest(".compactToggle")) return;
        if(e.target.closest(".port")) return;
        if(suppressNodeClick) return;
        selectNode(n.id, !!e.shiftKey);
      });
      if(n.variant !== "text" && n.variant !== "sticky"){
        el.addEventListener("dblclick", (e)=>{ e.stopPropagation(); openEdit(n.id); });
      }
    }
    const overlapIds = computeOverlapIds();
    nodesLayer.querySelectorAll(".node").forEach((nodeEl)=>{
      const id = nodeEl.dataset.id;
      nodeEl.classList.toggle("overlap", overlapIds.has(id));
    });

    // svg edges
    svg.innerHTML = "";
    svg.setAttribute("width", wrap.clientWidth);
    svg.setAttribute("height", wrap.clientHeight);

    // defs for small arrow marker
    const defs = document.createElementNS("http://www.w3.org/2000/svg","defs");
    defs.innerHTML = `
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="${edgeCfg.lineColor}"></path>
      </marker>
      <marker id="arrowActive" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="${edgeCfg.activeColor}"></path>
      </marker>
      <marker id="dotEnd" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
        <circle cx="5" cy="5" r="3" fill="${edgeCfg.lineColor}"></circle>
      </marker>
      <marker id="dotEndActive" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
        <circle cx="5" cy="5" r="3" fill="${edgeCfg.activeColor}"></circle>
      </marker>
    `;
    svg.appendChild(defs);

    let selectedEdgeMeta = null;
    for(const ed of edges){
      const aN = nodes.find(n=>n.id===ed.from.node);
      const bN = nodes.find(n=>n.id===ed.to.node);
      if(!aN || !bN) continue;

      const A = portPos(aN, ed.from.port);
      const B = portPos(bN, ed.to.port);
      const d = drawEdgePath(A, B, ed.from.port, ed.to.port);
      const isSel = selected.type==="edge" && selected.id===ed.id;
      const etype = EDGE_TYPES[ed.edgeType || "generic"] || EDGE_TYPES.generic;

      // visible path
      const path = document.createElementNS("http://www.w3.org/2000/svg","path");
      const pid = "p_" + ed.id;
      path.setAttribute("id", pid);
      path.setAttribute("d", d);
      path.setAttribute("fill","none");
      path.setAttribute("stroke", isSel ? edgeCfg.activeColor : edgeCfg.lineColor);
      path.setAttribute("stroke-width", String(isSel ? (etype.width + 1) : etype.width));
      path.setAttribute("stroke-dasharray", lineDashForType(edgeCfg.lineType));
      path.setAttribute("opacity","0.95");
      const murl = markerUrl(isSel);
      if(murl) path.setAttribute("marker-end", murl);

      // hit path for selection
      const hit = document.createElementNS("http://www.w3.org/2000/svg","path");
      hit.setAttribute("d", d);
      hit.setAttribute("fill","none");
      hit.setAttribute("stroke","transparent");
      hit.setAttribute("stroke-width","16");
      hit.style.pointerEvents = "stroke";
      hit.addEventListener("click", (e)=>{
        e.stopPropagation();
        clearNodeSelection();
        selected = { type:"edge", id: ed.id };
        connectFrom = null;
        render();
      });

      svg.appendChild(path);
      svg.appendChild(hit);

      const mid = edgeMid(A, B, ed.from.port, ed.to.port);
      if(isSel){
        const ms = worldToScreen(mid.x, mid.y);
        selectedEdgeMeta = { edgeId: ed.id, x: ms.x, y: ms.y };
      }
      const g = document.createElementNS("http://www.w3.org/2000/svg","g");
      g.setAttribute("class","edgeDel");

      const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
      c.setAttribute("cx", String(mid.x));
      c.setAttribute("cy", String(mid.y));
      c.setAttribute("r", "10");
      c.setAttribute("fill", "rgba(255,255,255,.98)");
      c.setAttribute("stroke", "rgba(239,68,68,.55)");
      c.setAttribute("stroke-width", "1.5");

      const t = document.createElementNS("http://www.w3.org/2000/svg","text");
      t.setAttribute("x", String(mid.x));
      t.setAttribute("y", String(mid.y + 0.5));
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("dominant-baseline", "middle");
      t.setAttribute("font-size", "12");
      t.setAttribute("font-weight", "900");
      t.setAttribute("fill", "rgba(185,28,28,.95)");
      t.textContent = "×";

      let overDelete = false;
      const showDelete = ()=>{
        g.style.opacity = "1";
        g.style.pointerEvents = "all";
      };
      const hideDelete = ()=>{
        if(overDelete) return;
        g.style.opacity = "0";
        g.style.pointerEvents = "none";
      };

      hit.addEventListener("mouseenter", showDelete);
      hit.addEventListener("mouseleave", ()=>setTimeout(hideDelete, 40));
      g.addEventListener("mouseenter", ()=>{
        overDelete = true;
        showDelete();
      });
      g.addEventListener("mouseleave", ()=>{
        overDelete = false;
        hideDelete();
      });
      g.addEventListener("click", (e)=>{
        e.stopPropagation();
        removeEdgeById(ed.id);
      });

      g.appendChild(c);
      g.appendChild(t);
      svg.appendChild(g);

      // continuous flow layer: an animated dash band that loops seamlessly
      if(flowOn){
        const flowColor = isSel ? edgeCfg.activeColor : edgeCfg.flowColor;
        const flowLayers = clamp(Number(edgeCfg.flowDots || 2), 1, 3);
        const flowWidth = isSel ? (etype.width + 1.4) : (etype.width + 1.1);
        const dash = Math.max(8, Math.round(10 + etype.width * 2));
        const gap = Math.max(14, Math.round(dash * 1.75));
        const cycle = dash + gap;
        const travel = Math.max(120, Math.hypot(B.x - A.x, B.y - A.y));
        const duration = clamp(travel / 120, 1.9, 4.8);
        for(let i = 0; i < flowLayers; i++){
          const flowPath = document.createElementNS("http://www.w3.org/2000/svg","path");
          flowPath.setAttribute("class", "edgeFlowLine");
          flowPath.setAttribute("d", d);
          flowPath.setAttribute("fill","none");
          flowPath.setAttribute("stroke", flowColor);
          flowPath.setAttribute("stroke-width", String(Math.max(1.5, flowWidth - (i * 0.18))));
          flowPath.setAttribute("stroke-dasharray", `${dash} ${gap}`);
          flowPath.setAttribute("stroke-linecap", "round");
          flowPath.setAttribute("stroke-linejoin", "round");
          flowPath.setAttribute("opacity", String(clamp((isSel ? 0.95 : 0.82) - (i * 0.14), 0.25, 0.98)));
          flowPath.setAttribute("vector-effect", "non-scaling-stroke");
          flowPath.style.pointerEvents = "none";
          flowPath.style.setProperty("--edge-flow-cycle", `${cycle}px`);
          flowPath.style.animation = `edgeFlowDash ${duration}s linear infinite`;
          flowPath.style.animationDelay = `${-(duration / flowLayers) * i}s`;
          svg.appendChild(flowPath);
        }
      }
    }

    // intentionally hidden: no temporary red connector preview while dragging
    if(selectedEdgeMeta){
      showEdgeTypeBar(selectedEdgeMeta.edgeId, selectedEdgeMeta.x, selectedEdgeMeta.y);
    } else {
      hideEdgeTypeBar();
    }
    refreshTextBar();
    queuePersist();
  }

  // --- Connect mode / selection ---
  function setConnectMode(v, silent = false){
    connectMode = v;
    btnConnect.classList.toggle("active", connectMode);
    wrap.classList.toggle("connect-mode", connectMode);
    wrap.classList.toggle("connecting", connectMode && !!connectFrom);
    if(!connectMode){
      connectFrom = null;
      connectDrag = null;
      hoveredNodeId = null;
    }
    if(!silent) showToast(`Conectar ${connectMode ? "habilitado" : "desabilitado"}.`);
    render();
  }

  function selectNode(id, append = false){
    if(selected.type === "edge") selected = { type:null, id:null };
    if(append){
      toggleNodeInSelection(id);
    } else {
      setSingleNodeSelection(id);
    }
    render();
  }

  function onPortClick(nodeId, port){
    if(!connectMode){
      showToast("Ative o Modo Conectar para ligar ports.");
      return;
    }

    // first click
    if(!connectFrom){
      connectFrom = { nodeId, port: normalizePortKey(port) };
      setSingleNodeSelection(nodeId);
      showToast("Port de origem definido. Clique no próximo port para conectar.");
      render();
      return;
    }

    // second click
    if(connectFrom.nodeId === nodeId && normalizePortKey(connectFrom.port) === normalizePortKey(port)){
      showToast("Escolha um PORT diferente para conectar.");
      return;
    }

    createConnection(connectFrom, { nodeId, port });
  }
  function createConnection(from, to){
    if(!from || !to) return false;
    const fromPort = normalizePortKey(from.port);
    const toPort = normalizePortKey(to.port);
    const exists = edges.some(e =>
      e.from.node===from.nodeId && normalizePortKey(e.from.port)===fromPort &&
      e.to.node===to.nodeId && normalizePortKey(e.to.port)===toPort
    );
    if(exists){
      showToast("Essa conexão já existe.");
      connectFrom = null;
      render();
      return false;
    }
    rememberActionState();
    edges.push({
      id: "e_" + uid(),
      from: { node: from.nodeId, port: fromPort },
      to:   { node: to.nodeId, port: toPort },
      edgeType: "generic"
    });
    showToast("Conexao criada (fluxo animado).");
    connectFrom = null;
    hoveredNodeId = null;
    clearNodeSelection();
    selected = { type:null, id:null };
    render();
    return true;
  }
  function findPortNear(x, y, exclude, radius){
    const worldRadius = radius ?? screenPxToWorld(22);
    let hit = null;
    let best = worldRadius * worldRadius;
    for(const n of nodes){
      if(!isConnectableNode(n)) continue;
      for(const p of PORTS){
        if(exclude && exclude.nodeId===n.id && normalizePortKey(exclude.port)===p) continue;
        const pos = portPos(n, p);
        const dx = pos.x - x;
        const dy = pos.y - y;
        const d2 = dx*dx + dy*dy;
        if(d2 <= best){
          best = d2;
          hit = { nodeId:n.id, port:p };
        }
      }
    }
    return hit;
  }
  function portLabel(port){
    const side = portSide(port);
    if(side === "n") return "Topo";
    if(side === "s") return "Base";
    if(side === "e") return "Direita";
    if(side === "w") return "Esquerda";
    return port || "";
  }
  function startConnectDrag(e, nodeId, port){
    if(e.button !== 0) return;
    if(!connectMode) return;
    e.stopPropagation();
    e.preventDefault();
    const from = { nodeId, port };
    const start = worldFromClient(e.clientX, e.clientY);
    let dragStarted = false;
    const cleanup = ()=>{
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    const move = (ev)=>{
      if(!connectMode){
        connectDrag = null;
        cleanup();
        return;
      }
      const p = worldFromClient(ev.clientX, ev.clientY);
      const moveMin = screenPxToWorld(3);
      if(!dragStarted && (Math.abs(p.x - start.x) > moveMin || Math.abs(p.y - start.y) > moveMin)){
        connectFrom = { nodeId, port: normalizePortKey(from.port) };
        connectDrag = { from:{ ...from }, to:{ x:p.x, y:p.y }, moved:true, target:null, hoverKey:"" };
        setSingleNodeSelection(nodeId);
        dragStarted = true;
        showToast("Arraste até o port de destino.");
      }
      if(!dragStarted || !connectDrag) return;
      connectDrag.to = p;
      let target = findPortNear(p.x, p.y, connectDrag.from, screenPxToWorld(26));
      connectDrag.target = target;
      const key = target ? `${target.nodeId}:${target.port}` : "";
      if(key !== connectDrag.hoverKey){
        connectDrag.hoverKey = key;
        if(target){
          const hit = getNodeById(target.nodeId);
          showToast(`Solte para conectar em ${hit?.title || "bloco"} (${portLabel(target.port)}).`);
        }
      }
      requestRender();
    };
    const up = (ev)=>{
      if(!connectMode){
        connectDrag = null;
        cleanup();
        return;
      }
      if(!dragStarted){
        cleanup();
        onPortClick(nodeId, port);
        return;
      }
      if(!connectDrag) return;

      const p = worldFromClient(ev.clientX, ev.clientY);
      let target = connectDrag.target;
      if(!target){
        target = findPortNear(p.x, p.y, connectDrag.from, screenPxToWorld(26));
      }
      const from = connectDrag.from;
      connectDrag = null;
      cleanup();

      if(target){
        createConnection(from, target);
      } else {
        connectFrom = null;
        requestRender();
      }
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  function removeEdgeById(edgeId){
    rememberActionState();
    edges = edges.filter(ed => ed.id !== edgeId);
    if(selected.type === "edge" && selected.id === edgeId){
      selected = { type:null, id:null };
    }
    requestRender();
    showToast("Conexao removida.");
  }

  function removeNodeById(nodeId){
    rememberActionState();
    nodes = nodes.filter(n=>n.id!==nodeId);
    edges = edges.filter(e => e.from.node!==nodeId && e.to.node!==nodeId);
    selectedNodeIds.delete(nodeId);
    syncSingleSelection();
    if(selected.type==="node" && selected.id===nodeId){
      selected = { type:null, id:null };
    }
    if(connectFrom?.nodeId === nodeId){
      connectFrom = null;
    }
    render();
    showToast("Bloco removido.");
  }
  function toggleNodeHighlight(nodeId){
    const n = getNodeById(nodeId);
    if(!n) return;
    rememberActionState();
    n.highlightPulse = !n.highlightPulse;
    render();
    showToast(n.highlightPulse ? "Destaque de borda ativado." : "Destaque de borda removido.");
  }
  function bringNodeToFront(nodeId){
    const idx = nodes.findIndex(n => n.id === nodeId);
    if(idx < 0 || idx === nodes.length - 1) return;
    rememberActionState();
    const [node] = nodes.splice(idx, 1);
    nodes.push(node);
    render();
    showToast("Bloco trazido para frente.");
  }
  function sendNodeToBack(nodeId){
    const idx = nodes.findIndex(n => n.id === nodeId);
    if(idx <= 0) return;
    rememberActionState();
    const [node] = nodes.splice(idx, 1);
    nodes.unshift(node);
    render();
    showToast("Bloco enviado para trás.");
  }

  function duplicateNode(nodeId){
    const src = nodes.find(n=>n.id===nodeId);
    if(!src) return;
    rememberActionState();
    const copy = {
      ...src,
      id: "n_" + uid(),
      x: src.x + 36,
      y: src.y + 36,
      title: src.title || "Bloco",
      items: Array.isArray(src.items) ? src.items.map(deepCopyItem) : [],
      stacks: Array.isArray(src.stacks) ? [...src.stacks] : [],
      text: src.text || "",
      stickyColor: src.stickyColor || "#fef08a",
      fontSize: src.fontSize || defaultFontSizeForVariant(src.variant),
      fontFamily: src.fontFamily || "Georgia",
      color: src.color || "#1e293b",
      align: src.align || "left",
      areaPattern: src.areaPattern || "dotted",
      areaStrokeWidth: Number(src.areaStrokeWidth || 2),
      areaAnimated: !!src.areaAnimated,
      areaLocked: !!src.areaLocked,
      areaColor: src.areaColor || "#94a3b8",
      profileProperties: Array.isArray(src.profileProperties) ? JSON.parse(JSON.stringify(src.profileProperties)) : [],
      profileEvents: Array.isArray(src.profileEvents) ? JSON.parse(JSON.stringify(src.profileEvents)) : [],
      profileChannels: Array.isArray(src.profileChannels) ? JSON.parse(JSON.stringify(src.profileChannels)) : [],
      compact: !!src.compact,
      compactSize: src.compactSize ? JSON.parse(JSON.stringify(src.compactSize)) : null,
      highlightPulse: !!src.highlightPulse,
      i18n: src.i18n ? JSON.parse(JSON.stringify(src.i18n)) : undefined
    };
    ensureNodeI18n(copy);
    applyNodeLanguage(copy, currentLanguage);
    nodes.push(copy);
    setSingleNodeSelection(copy.id);
    render();
    showToast("Bloco duplicado.");
  }
  function toggleNodeCompact(nodeId){
    const n = nodes.find(x=>x.id===nodeId);
    if(!n || n.variant === "text" || n.variant === "sticky" || n.variant === "area") return;
    rememberActionState();
    n.compact = !n.compact;
    applyNodeCompactState(n);
    if(!n.compact){
      n.compactSize = null;
    }
    if(compactToggleAnimTimer){
      clearTimeout(compactToggleAnimTimer);
      compactToggleAnimTimer = null;
    }
    compactToggleAnim = { nodeId, mode: n.compact ? "compact" : "expand" };
    compactToggleAnimTimer = setTimeout(()=>{
      if(compactToggleAnim?.nodeId === nodeId){
        compactToggleAnim = null;
      }
      compactToggleAnimTimer = null;
    }, 240);
    render();
    showToast(n.compact ? "Bloco minimizado." : "Bloco expandido.");
  }

  // --- Drag node ---
  let dragging = null; // {ids, startWorld, starts, moved}
  let resizing = null; // {id, startWorld, w, minH}
  function startDragNode(e, nodeId){
    if(e.button !== 0) return;
    const n = nodes.find(x=>x.id===nodeId);
    if(n?.variant === "area" && n.areaLocked) return;
    if(e.target.closest(".port")) return;
    if(e.target.closest(".nact")) return;
    if(e.target.closest(".solTool")) return;
    if(e.target.closest(".solItemDel")) return;
    if(e.target.closest(".stackAdd")) return;
    if(e.target.closest(".stackMenu")) return;
    if(e.target.closest(".stackOption")) return;
    if(e.target.closest(".stackDel")) return;
    if(e.target.closest(".compactToggle")) return;
    if(e.target.closest(".solutionItem")) return;
    if(e.target.closest(".solutionGridItem")) return;
    if(e.target.closest(".stickyColorBtn")) return;
    if(e.target.closest(".nodeResize")) return;
    if(e.target.closest(".orgTitleBtn")) return;
    if(e.target.closest(".orgMenu")) return;
    if(e.target.closest(".orgOpt")) return;
    if(e.target.closest("#tbText")) return;
    if(e.target.closest(".textCtl")) return;
    if(e.target.closest(".textFont")) return;
    if(e.target.closest('[contenteditable="true"]')) return;
    if(e.shiftKey) return;
    e.stopPropagation();
    e.preventDefault();
    rememberActionState();
    if(!selectedNodeIds.has(nodeId)) setSingleNodeSelection(nodeId);
    syncSingleSelection();

    const p = worldFromClient(e.clientX, e.clientY);
    const ids = selectedNodeIds.size ? [...selectedNodeIds] : [nodeId];
    const starts = ids.map((id)=>{
      const n = nodes.find(x=>x.id===id);
      return { id, x:n?.x || 0, y:n?.y || 0 };
    });
    dragging = { ids, startWorld: p, starts, moved:false };
    document.addEventListener("mousemove", onDragNode);
    document.addEventListener("mouseup", endDragNode, { once:true });
  }
  function onDragNode(e){
    if(!dragging) return;
    const p = worldFromClient(e.clientX, e.clientY);
    const dx = p.x - dragging.startWorld.x;
    const dy = p.y - dragging.startWorld.y;
    if(Math.abs(dx) > screenPxToWorld(2) || Math.abs(dy) > screenPxToWorld(2)){
      dragging.moved = true;
    }
    for(const s of dragging.starts){
      const n = nodes.find(x=>x.id===s.id);
      if(!n) continue;
      if(n.variant === "area" && n.areaLocked) continue;
      n.x = s.x + dx;
      n.y = s.y + dy;
    }
    requestRender();
  }
  function endDragNode(){
    if(dragging?.moved){
      suppressNodeClick = true;
      suppressWrapClick = true;
      setTimeout(()=>{
        suppressNodeClick = false;
        suppressWrapClick = false;
      }, 0);
    }
    dragging = null;
    document.removeEventListener("mousemove", onDragNode);
  }
  function startResizeNode(e, nodeId){
    if(e.button !== 0) return;
    const n = nodes.find(x=>x.id===nodeId);
    if(!n || (n.variant !== "solution" && n.variant !== "organizer" && n.variant !== "ai" && n.variant !== "sticky" && n.variant !== "profile" && n.variant !== "area")) return;
    e.stopPropagation();
    e.preventDefault();
    rememberActionState();

    const p = worldFromClient(e.clientX, e.clientY);
    resizing = {
      id: nodeId,
      startWorld: p,
      w: n.w || (n.variant === "sticky" ? 200 : n.variant === "profile" ? 300 : n.variant === "area" ? 420 : 360),
      h: Math.max(n.h || (n.variant === "sticky" ? 110 : n.variant === "profile" ? 198 : n.variant === "area" ? 220 : 240), n.variant === "sticky" ? STICKY_MIN_H : n.variant === "profile" ? 160 : n.variant === "area" ? 140 : 180),
      minH: Math.max(n.userMinH || 0, n.variant === "profile" ? 160 : (n.h || 240))
    };
    setSingleNodeSelection(nodeId);

    const move = (ev)=>{
      if(!resizing) return;
      const node = nodes.find(x=>x.id===resizing.id);
      if(!node) return;
      const wPos = worldFromClient(ev.clientX, ev.clientY);
      const dx = wPos.x - resizing.startWorld.x;
      const dy = wPos.y - resizing.startWorld.y;
      if(node.variant === "sticky"){
        node.w = clamp(resizing.w + dx, STICKY_MIN_W, STICKY_MAX_W);
        node.h = clamp(resizing.h + dy, STICKY_MIN_H, STICKY_MAX_H);
        requestRender();
        return;
      }
      if(node.variant === "area"){
        if(node.areaLocked){
          node.h = Math.max(140, resizing.h + dy);
          node.w = Math.max(220, resizing.w + dx);
        } else {
          node.w = Math.max(220, resizing.w + dx);
          node.h = Math.max(140, resizing.h + dy);
        }
        requestRender();
        return;
      }
      const isUnlimited = !!node.unboundedResize || node.variant === "organizer" || (node.title || "").toLowerCase().includes("tesseractdb");
      if(isUnlimited){
        node.w = Math.max(280, resizing.w + dx);
        node.userMinH = Math.max(180, resizing.minH + dy);
      } else {
        node.w = clamp(resizing.w + dx, node.variant === "profile" ? 260 : 280, 980);
        node.userMinH = clamp(resizing.minH + dy, node.variant === "profile" ? 160 : 180, 900);
      }
      requestRender();
    };
    const up = ()=>{
      resizing = null;
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  // --- Middle-click pan anywhere (navigation mode) ---
  wrap.addEventListener("mousedown", startMiddlePan, true);
  wrap.addEventListener("auxclick", (e)=>{
    if(e.button !== 1) return;
    e.preventDefault();
    e.stopPropagation();
  }, true);

  // --- Area selection for preview (before opening popup) ---
  wrap.addEventListener("mousedown", (e)=>{
    if(!previewPickMode || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    const r = wrap.getBoundingClientRect();
    const startX = clamp(e.clientX - r.left, 0, r.width);
    const startY = clamp(e.clientY - r.top, 0, r.height);
    previewPickDrag = { x0:startX, y0:startY };
    showPreviewPickRect({ x:startX, y:startY, w:0, h:0 });
    const move = (ev)=>{
      if(!previewPickDrag) return;
      const x = clamp(ev.clientX - r.left, 0, r.width);
      const y = clamp(ev.clientY - r.top, 0, r.height);
      const rect = {
        x: Math.min(previewPickDrag.x0, x),
        y: Math.min(previewPickDrag.y0, y),
        w: Math.abs(x - previewPickDrag.x0),
        h: Math.abs(y - previewPickDrag.y0)
      };
      showPreviewPickRect(rect);
    };
    const up = async (ev)=>{
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      if(!previewPickDrag) return;
      const x = clamp(ev.clientX - r.left, 0, r.width);
      const y = clamp(ev.clientY - r.top, 0, r.height);
      const rect = {
        x: Math.min(previewPickDrag.x0, x),
        y: Math.min(previewPickDrag.y0, y),
        w: Math.abs(x - previewPickDrag.x0),
        h: Math.abs(y - previewPickDrag.y0)
      };
      previewPickDrag = null;
      hidePreviewPickRect();
      setPreviewPickMode(false);
      if(rect.w < 10 || rect.h < 10){
        showToast("Área muito pequena. Tente novamente.");
        return;
      }
      try{
        await capturePreviewFromRect(rect);
        openPreviewModal();
      } catch(err){
        console.error(err);
        alert("Não foi possível gerar a pré-visualização.");
      }
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }, true);

  // --- Pan on background ---
  wrap.addEventListener("mousedown", (e)=>{
    if(previewPickMode) return;
    if(isMiddlePanning) return;
    if(e.button !== 0) return;
    // only pan if click background
    if(e.target !== wrap && e.target.id !== "canvas" && e.target !== grid && e.target !== svg && e.target !== nodesLayer) return;
    connectFrom = null;
    if(e.shiftKey){
      const start = worldFromClient(e.clientX, e.clientY);
      marquee = { x1:start.x, y1:start.y, x2:start.x, y2:start.y, append:true };
      const r = wrap.getBoundingClientRect();
      showMarqueeRect({ x:e.clientX - r.left, y:e.clientY - r.top, w:0, h:0 });
      const move = (ev)=>{
        if(!marquee) return;
        const p = worldFromClient(ev.clientX, ev.clientY);
        marquee.x2 = p.x;
        marquee.y2 = p.y;
        const a = worldToScreen(Math.min(marquee.x1, marquee.x2), Math.min(marquee.y1, marquee.y2));
        const b = worldToScreen(Math.max(marquee.x1, marquee.x2), Math.max(marquee.y1, marquee.y2));
        showMarqueeRect({ x:a.x, y:a.y, w:Math.max(1, b.x - a.x), h:Math.max(1, b.y - a.y) });
        applyMarqueeSelection(marquee);
        requestRender();
      };
      const up = ()=>{
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        hideMarquee();
        marquee = null;
        suppressWrapClick = true;
        setTimeout(()=>{ suppressWrapClick = false; }, 0);
        requestRender();
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
      return;
    }

    isPanning = true;
    wrap.classList.add("grabbing");
    mainEl?.classList.add("grabbing");
    panStart = { x:e.clientX, y:e.clientY, vx:view.x, vy:view.y };
    let panned = false;

    const move = (ev)=>{
      if(!isPanning) return;
      view.x = panStart.vx + (ev.clientX - panStart.x);
      view.y = panStart.vy + (ev.clientY - panStart.y);
      if(Math.abs(ev.clientX - panStart.x) > 2 || Math.abs(ev.clientY - panStart.y) > 2){
        panned = true;
      }
      setTransform();
    };
    const up = ()=>{
      isPanning = false;
      wrap.classList.remove("grabbing");
      mainEl?.classList.remove("grabbing");
      if(panned){
        suppressWrapClick = true;
        setTimeout(()=>{ suppressWrapClick = false; }, 0);
      }
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  // Zoom (Ctrl + wheel)
  wrap.addEventListener("wheel", (e)=>{
    if(!e.ctrlKey) return;
    e.preventDefault();
    const delta = -Math.sign(e.deltaY) * 0.08;
    setZoom(view.z + delta, e.clientX, e.clientY);
  }, { passive:false });

  // Desktop only: no touch handlers.

  // --- Modal edit ---
  function openEdit(nodeId){
    const n = nodes.find(x=>x.id===nodeId);
    if(!n) return;
    editingNodeId = nodeId;
    fTitle.value = n.title || "";
    fDesc.value = n.desc || "";
    fLogo.value = n.logoUrl || "";
    fType.value = n.type || "gray";
    modalBack.style.display = "flex";
    modalBack.setAttribute("aria-hidden","false");
    setTimeout(()=>fTitle.focus(), 0);
  }
  function closeEdit(){
    modalBack.style.display = "none";
    modalBack.setAttribute("aria-hidden","true");
    editingNodeId = null;
  }

  btnClose.addEventListener("click", closeEdit);
  btnPreviewClose?.addEventListener("click", closePreviewModal);
  btnProjectClose?.addEventListener("click", closeProjectModal);
  btnProjectCancel?.addEventListener("click", closeProjectModal);
  btnImportClose?.addEventListener("click", closeImportModal);
  btnImportCancel?.addEventListener("click", closeImportModal);
  btnImportApply?.addEventListener("click", applyImportFromModal);
  importModePasteBtn?.addEventListener("click", ()=>setImportMode("paste"));
  importModeFileBtn?.addEventListener("click", ()=>setImportMode("file"));
  importPasteArea?.addEventListener("input", refreshImportActionState);
  importPasteArea?.addEventListener("paste", ()=>setTimeout(refreshImportActionState, 0));
  importFileInput?.addEventListener("change", (e)=>{
    const file = e.target?.files?.[0] || null;
    handleImportFile(file);
    if(file) setImportMode("file");
  });
  importDropzone?.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openImportFilePicker();
    }
  });
  importDropzone?.addEventListener("dragenter", (e)=>{
    e.preventDefault();
    e.stopPropagation();
    importDropzone.classList.add("is-dragover");
  });
  importDropzone?.addEventListener("dragover", (e)=>{
    e.preventDefault();
    e.stopPropagation();
    importDropzone.classList.add("is-dragover");
  });
  importDropzone?.addEventListener("dragleave", (e)=>{
    e.preventDefault();
    e.stopPropagation();
    if(!importDropzone.contains(e.relatedTarget)){
      importDropzone.classList.remove("is-dragover");
    }
  });
  importDropzone?.addEventListener("drop", (e)=>{
    e.preventDefault();
    e.stopPropagation();
    importDropzone.classList.remove("is-dragover");
    const file = e.dataTransfer?.files?.[0] || null;
    handleImportFile(file);
    if(file) setImportMode("file");
  });
  importBack?.addEventListener("dragenter", (e)=>e.preventDefault());
  importBack?.addEventListener("dragover", (e)=>{
    e.preventDefault();
    if(e.dataTransfer) e.dataTransfer.dropEffect = "copy";
  });
  importBack?.addEventListener("drop", (e)=>{
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0] || null;
    handleImportFile(file);
    if(file) setImportMode("file");
  });
  previewBack?.addEventListener("click", (e)=>{ if(e.target === previewBack) closePreviewModal(); });
  modalBack.addEventListener("click", (e)=>{ if(e.target===modalBack) closeEdit(); });
  exportBack?.addEventListener("click", (e)=>{ if(e.target===exportBack) closeExportModal(); });
  importBack?.addEventListener("click", (e)=>{ if(e.target===importBack) closeImportModal(); });
  projectBack?.addEventListener("click", (e)=>{ if(e.target===projectBack) closeProjectModal(); });
  btnProjectCreate?.addEventListener("click", async ()=>{
    if(!nodes.length){
      showToast("Não há elementos para gerar o projeto.");
      closeProjectModal();
      return;
    }
    const overallInfo = readProjectOverallForm();
    closeProjectModal();
    const scope = buildProjectScopeData(overallInfo);
    try{
      const driveDocUrl = await tryCreateProjectDocOnDrive(scope);
      if(driveDocUrl){
        window.open(driveDocUrl, "_blank", "noopener,noreferrer");
        showToast("Projeto gerado no Google Drive.");
        return;
      }
      downloadProjectDoc(scope);
      showToast("Projeto gerado em .doc.");
    } catch(err){
      console.error(err);
      downloadProjectDoc(scope);
      showToast("Falha no Drive. Documento .doc baixado.");
    }
  });
  window.addEventListener("keydown", (e)=>{
    if(e.key==="Escape"){
      closeNativeFlyout({ force:true });
      closeEdit();
      closePreviewModal();
      closeImportModal();
      closeProjectModal();
      setPreviewPickMode(false);
      settingsPanel?.classList.remove("show");
      settingsPanel?.setAttribute("aria-hidden","true");
    }
  });

  btnSaveNode.addEventListener("click", ()=>{
    const n = nodes.find(x=>x.id===editingNodeId);
    if(!n) return;
    rememberActionState();
    n.title = (fTitle.value.trim() || n.title || "Bloco");
    n.desc  = (fDesc.value.trim());
    n.logoUrl = normalizeLogoUrl(fLogo.value);
    n.logoInvalid = false;
    n.type  = fType.value;
    if(n.variant === "organizer"){
      const organizerOptions = [
        "Fonte de dados",
        "Mecanismo de integração",
        "Orquestrador",
        "Canais de comunicação",
        "Data Layer",
        "Clever.AI",
        "Remarketing",
        ...(Array.isArray(n.orgOptions) ? n.orgOptions : [])
      ];
      if(organizerOptions.includes(n.title)){
        n.organizerPreset = n.title;
      } else if(!organizerOptions.includes(n.organizerPreset || "")){
        n.organizerPreset = organizerOptions[0];
      }
    }
    ensureNodeI18n(n);
    n.i18n.title[currentLanguage] = n.title;
    n.i18n.desc[currentLanguage] = n.desc;
    closeEdit();
    render();
  });

  btnDeleteNode.addEventListener("click", ()=>{
    if(!editingNodeId) return;
    const id = editingNodeId;
    closeEdit();
    removeNodeById(id);
  });

  // --- Sidebar add blocks ---
  const templates = {
    "integration:api":     { icon:"API", kind:"Integration", type:"blue",  title:"API", desc:"Conector server-to-server para eventos, perfis e integracoes.", logoUrl:"https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png" },
    "integration:sdk":     { icon:"SDK", kind:"Integration", type:"blue",  title:"SDK", desc:"Instrumentacao App/Web para coleta e mensageria.", logoUrl:"https://icons.veryicon.com/png/o/miscellaneous/hekr/open-sdk-download.png" },
    "integration:native":  { icon:"N", kind:"Integration", type:"blue",  title:"Nativo", desc:"Capacidade nativa da plataforma (sem conector externo).", logoUrl:"https://images.icon-icons.com/3251/PNG/512/plug_connected_regular_icon_202791.png" },
    "native:connector":    { icon:"N", kind:"Integration", type:"blue",  title:"Nativo", desc:"Capacidade nativa da plataforma (sem conector externo).", logoUrl:"https://images.icon-icons.com/3251/PNG/512/plug_connected_regular_icon_202791.png" },
    "native:amplitude":    { icon:"AM", kind:"Analytics", type:"blue", title:"Amplitude", desc:"Plataforma de analytics com conexão nativa.", logoUrl:"https://companieslogo.com/img/orig/AMPL-501a52ff.png?t=1720244490" },
    "native:mixpanel":     { icon:"MX", kind:"Analytics", type:"blue", title:"Mixpanel", desc:"Plataforma de analytics com conexão nativa.", logoUrl:"https://cdn.appsflyer.com/marketplace/static/logo/mixpanel.png" },
    "native:posthog":      { icon:"PH", kind:"Analytics", type:"blue", title:"PostHog", desc:"Plataforma de analytics com conexão nativa.", logoUrl:"https://posthog.com/brand/posthog-logo-stacked@2x.png" },
    "native:adjust":       { icon:"AD", kind:"Attribution", type:"blue", title:"Adjust", desc:"Plataforma de atribuição com conexão nativa.", logoUrl:"https://avatars.githubusercontent.com/u/1327203?s=280&v=4" },
    "native:airbridge":    { icon:"AB", kind:"Attribution", type:"blue", title:"Airbridge", desc:"Plataforma de atribuição com conexão nativa.", logoUrl:"https://upload.wikimedia.org/wikipedia/commons/d/d3/Airbridge_logo_CL.png" },
    "native:appsflyer":    { icon:"AF", kind:"Attribution", type:"blue", title:"AppsFlyer", desc:"Plataforma de atribuição com conexão nativa.", logoUrl:"https://cdn.prod.website-files.com/5ecbeb8d7557e7f636691721/65837c5f480644e2de769eb5_AppsFlyer_logo.png" },
    "native:apptrove":     { icon:"AT", kind:"Attribution", type:"blue", title:"AppTrove", desc:"Plataforma de atribuição com conexão nativa.", logoUrl:"https://files.readme.io/1d84909a84cbc1303083f451b01b6345f8329ac4a8bc8a0bf675153453cea99c-Apptrove.webp" },
    "native:branch":       { icon:"BR", kind:"Attribution", type:"blue", title:"Branch", desc:"Plataforma de atribuição com conexão nativa.", logoUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv6Ow_N_fGWVLscgtELG4K7j1_3LyThe-Ulg&s" },
    "native:singular":     { icon:"SG", kind:"Attribution", type:"blue", title:"Singular", desc:"Plataforma de atribuição com conexão nativa.", logoUrl:"https://www.businessofapps.com/wp-content/uploads/2019/05/singular_logo_2019.png" },
    "native:shopify":      { icon:"SH", kind:"E-commerce", type:"blue", title:"Shopify", desc:"Plataforma de e-commerce com conexão nativa.", logoUrl:"https://www.pngall.com/wp-content/uploads/13/Shopify-Logo-PNG.png" },
    "native:vtex":         { icon:"VT", kind:"E-commerce", type:"blue", title:"VTEX", desc:"Plataforma de e-commerce com conexão nativa.", logoUrl:"https://companieslogo.com/img/orig/VTEX-64045aa2.png?t=1720244494" },
    "native:eventbridge":  { icon:"EB", kind:"Cloud Storage", type:"blue", title:"Amazon EventBridge", desc:"Event routing / orchestration", logoUrl:"https://www.awsicon.com/static/images/Service-Icons/App-Integration/64/png5x/EventBridge.png" },
    "native:s3":           { icon:"S3", kind:"Cloud Storage", type:"blue", title:"AWS S3", desc:"Object storage", logoUrl:"https://logowik.com/content/uploads/images/amazon-s37765.jpg" },
    "native:gcp":          { icon:"GCP", kind:"Cloud Storage", type:"blue", title:"Google Cloud Platform", desc:"Cloud platform", logoUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8bqoxPxauHlIQdvfMHPRKRWB-SoZaDhwc-w&s" },
    "native:azure":        { icon:"AZ", kind:"Cloud Storage", type:"blue", title:"Microsoft Azure", desc:"Cloud platform", logoUrl:"https://www.northware.mx/wp-content/uploads/2022/09/northware-microsoft-azure-logo.png" },
    "native:bigquery":     { icon:"BQ", kind:"Data Warehouse", type:"blue", title:"BigQuery", desc:"Cloud data warehouse", logoUrl:"https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg" },
    "native:snowflake":    { icon:"SN", kind:"Data Warehouse", type:"blue", title:"SnowFlake", desc:"Cloud data warehouse", logoUrl:"https://companieslogo.com/img/orig/SNOW-35164165.png?t=1751096598" },
    "native:databricks":   { icon:"DB", kind:"Data Warehouse", type:"blue", title:"Databricks", desc:"Lakehouse / analytics", logoUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA9evqOC59ZcPyjL2-nnMXboMeUbhr3e266w&s" },
    "native:redshift":     { icon:"RS", kind:"Data Warehouse", type:"blue", title:"Amazon Redshift", desc:"Cloud data warehouse", logoUrl:"https://www.shareicon.net/download/2015/08/28/92232_database.ico" },
    "native:fabric":       { icon:"FB", kind:"Data Warehouse", type:"blue", title:"Microsoft Fabric", desc:"Analytics platform", logoUrl:"https://davidalzamendi.com/wp-content/uploads/2023/05/Fabric_final_x256.png" },
    "native:hightouch":    { icon:"HT", kind:"CDP", type:"blue", title:"High Touch", desc:"CDP com conexão nativa.", logoUrl:"https://static.amplitude.com/data-connections/icons/HIGHTOUCH.png" },
    "native:segment":      { icon:"SE", kind:"CDP", type:"blue", title:"Segment", desc:"CDP com conexão nativa.", logoUrl:"https://logo.svgcdn.com/logos/segment.png" },
    "native:rudderstack":  { icon:"RS", kind:"CDP", type:"blue", title:"RudderStack", desc:"CDP com conexão nativa.", logoUrl:"https://cdn.prod.website-files.com/685d3f27e667cdf05fe197f8/685d3f27e667cdf05fe1aa8b_64d3ddaa31ad7172011fd9b5_rudderstack-1.svg" },
    "native:census":       { icon:"CE", kind:"CDP", type:"blue", title:"Census", desc:"CDP com conexão nativa.", logoUrl:"https://f.hubspotusercontent10.net/hubfs/7162616/__hs-marketplace__/Census%20logo%2032x32-3-1.png" },
    "native:boltic":       { icon:"BO", kind:"CDP", type:"blue", title:"Boltic", desc:"CDP com conexão nativa.", logoUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1AWj_TRcan-rLeTFdVzDdfe98wQL5pQb-ew&s" },
    "native:mparticle":    { icon:"MP", kind:"CDP", type:"blue", title:"mParticle", desc:"CDP com conexão nativa.", logoUrl:"https://www.svgrepo.com/show/354098/mparticle-icon.svg" },
    "native:treasuredata": { icon:"TD", kind:"CDP", type:"blue", title:"Treasure Data", desc:"CDP com conexão nativa.", logoUrl:"https://www.svgrepo.com/show/354460/treasuredata-icon.svg" },
    "integration:manual":  { icon:"MAN", kind:"Integration", type:"blue",  title:"Manual", desc:"Operacao manual ou assistida, sem dependencia de API, SDK ou conector nativo.", logoUrl:"https://media.istockphoto.com/id/1187149723/pt/vetorial/touch-outline-vector-illustration-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=h2Z3b3CzeZPm5oLu_m_g6dzhhCgWWwfO5CEHTuS1E-A=" },

    "core:central":        { icon:"C", kind:"Core",        type:"blue",  title:"Bloco Central", desc:"Edite o nome e descreva a funcionalidade (ex.: Segmentacao, Journeys, Analytics).", logoUrl:"https://cdn-icons-png.flaticon.com/512/30/30254.png" },
    "core:organizer":      {
      icon:"ORG", kind:"Core", type:"blue", variant:"organizer",
      title:"Fonte de dados", desc:"",
      organizerPreset:"Fonte de dados",
      w: 360,
      userMinH: 220,
      orgOptions: [
        "Fonte de dados",
        "Mecanismo de integração",
        "Orquestrador",
        "Canais de comunicação",
        "Data Layer",
        "Clever.AI",
        "Remarketing"
      ]
    },

    "channel:whatsapp":    {
      icon:"WA", kind:"Channel", type:"red", title:"WhatsApp",
      desc:"Canal conversacional (menu/flows/IA).",
      logoUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/960px-WhatsApp.svg.png",
      variant:"stack",
      stackCatalog:"whatsappProviders",
      stacks:["direct"]
    },
    "channel:rcs":         { icon:"RCS", kind:"Channel",     type:"red",   title:"RCS", desc:"Mensagens ricas (cards, botoes) via operadoras.", logoUrl:"https://avatars.githubusercontent.com/u/67345131?s=280&v=4" },
    "channel:app":         { icon:"APP", kind:"Channel",     type:"red",   title:"App", desc:"Push, In-App, App Inbox, Native Display.", logoUrl:"https://cdn-icons-png.flaticon.com/512/8766/8766948.png", variant:"stack", stacks:["ios-native","android-native"] },
    "channel:web":         { icon:"WEB", kind:"Channel",     type:"red",   title:"Web", desc:"Web Push, Pop-ups, Exit intent, Native Display.", logoUrl:"https://cdn-icons-png.flaticon.com/512/5339/5339181.png", variant:"stack", stacks:["web-sdk"] },
    "channel:email":       { icon:"EM", kind:"Channel",     type:"red",   title:"Email", desc:"Campanhas e mensagens com HTML rico.", logoUrl:"https://static.vecteezy.com/system/resources/thumbnails/014/440/980/small/email-message-icon-design-in-blue-circle-png.png" },
    "channel:sms":         { icon:"SMS", kind:"Channel",     type:"red",   title:"SMS", desc:"Mensagens transacionais e promocionais.", logoUrl:"https://cdn-icons-png.flaticon.com/512/733/733533.png" },
    "channel:webhook":     { icon:"WH", kind:"Channel",     type:"red",   title:"Webhook", desc:"Recebe eventos em tempo real via callbacks HTTP para automações e integrações.", logoUrl:"https://www.svix.com/resources/assets/images/color-webhook-240-1deccb0e365ff4ea493396ad28638fb7.png" },
    "channel:fbads":       { icon:"FB", kind:"Ads",         type:"red",   title:"Facebook Ads", desc:"Export de audiencia para remarketing.", logoUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/960px-2023_Facebook_icon.svg.png" },
    "channel:tiktok":      { icon:"TT", kind:"Ads",         type:"red",   title:"TikTok Ads", desc:"Export de audiencia para remarketing.", logoUrl:"https://www.oviond.com/wp-content/uploads/2023/06/tiktok-ads-icon.png" },
    "channel:gads":        { icon:"GA", kind:"Ads",         type:"red",   title:"Google Ads", desc:"Export de audiencia para remarketing.", logoUrl:"https://static.vecteezy.com/system/resources/previews/042/712/671/non_2x/google-ads-icon-logo-symbol-free-png.png" },

    "data:datalake":       { icon:"DL", kind:"Data",        type:"green", title:"Data Lake", desc:"Armazenamento bruto/historico.", logoUrl:"https://images.icon-icons.com/1502/PNG/512/officedatabase_103574.png" },
    "data:warehouse":      { icon:"DW", kind:"Data",        type:"green", title:"Data Warehouse", desc:"Camada analitica/BI e modelagem.", logoUrl:"https://images.icon-icons.com/1502/PNG/512/officedatabase_103574.png" },
    "data:queue":          { icon:"DQ", kind:"Data",        type:"green", title:"Data Queue", desc:"Streaming buffer/ingestao.", logoUrl:"https://images.icon-icons.com/1502/PNG/512/officedatabase_103574.png" },
    "solution:martech":    {
      icon:"M", kind:"Solução", type:"red", variant:"solution",
      title:"Martech", desc:"",
      w: 300,
      userMinH: 220,
      solutionLayout: "pills",
      items: [
        "Experimentação",
        "Campanhas batch",
        "Native Display",
        "Customer Journeys",
        "Campanhas Real Time",
        "Audiences",
        "Hiperpersonalização"
      ]
    },
    "solution:features":    {
      icon:"F", kind:"Solução", type:"red", variant:"solution",
      title:"Features", desc:"",
      w: 320,
      userMinH: 220,
      solutionLayout: "pills",
      items: [
        "Events",
        "User Properties",
        "User Identity",
        "PII Encryption",
        "Product Catalog",
        "Recommendations",
        "Hyper Personalization"
      ]
    },
    "solution:events": {
      icon:"EV", kind:"Solução", type:"red", variant:"default",
      title:"Events", desc:"",
      w: 280,
      logoUrl:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png"
    },
    "solution:userproperties": {
      icon:"UP", kind:"Solução", type:"red", variant:"default",
      title:"User Properties", desc:"",
      w: 280,
      logoUrl:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png"
    },
    "solution:useridentity": {
      icon:"UID", kind:"Solução", type:"red", variant:"default",
      title:"User Identity", desc:"Identity do usuário por Email, Telefone ou Custom ID.",
      w: 280,
      logoUrl:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png"
    },
    "solution:piiencryption": {
      icon:"PII", kind:"Solução", type:"red", variant:"default",
      title:"PII Encryption", desc:"",
      w: 280,
      logoUrl:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png"
    },
    "solution:productcatalog": {
      icon:"CAT", kind:"Solução", type:"red", variant:"default",
      title:"Product Catalog", desc:"",
      w: 280,
      logoUrl:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png"
    },
    "solution:recommendations": {
      icon:"REC", kind:"Solução", type:"red", variant:"default",
      title:"Recommendations", desc:"",
      w: 280,
      logoUrl:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png"
    },
    "solution:hyperpersonalization": {
      icon:"HP", kind:"Solução", type:"red", variant:"default",
      title:"Hyper Personalization", desc:"",
      w: 280,
      logoUrl:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png"
    },
    "solution:segments":   {
      icon:"S", kind:"Solução", type:"red", variant:"solution",
      title:"Segments", desc:"",
      w: 300,
      userMinH: 230,
      solutionLayout: "grid",
      items: [
        { icon:"https://cdn-icons-png.flaticon.com/512/570/570291.png", label:"RFM" },
        { icon:"https://marketplace.canva.com/XL6M0/MAEpMrXL6M0/1/tl/canva-clock-real-realtime-time-icon-icon-MAEpMrXL6M0.png", label:"Real-time" },
        { icon:"https://cdn-icons-png.flaticon.com/512/5799/5799191.png", label:"Preditiva" },
        { icon:"https://cdn-icons-png.flaticon.com/512/12282/12282281.png", label:"Psicográfica", mono:true },
        { icon:"https://idecbrasil.com.br/wp-content/uploads/2025/03/processo-1.png", label:"Comportamental", mono:true }
      ]
    },
    "solution:analytics":  {
      icon:"A", kind:"Solução", type:"red", variant:"solution",
      title:"Analytics", desc:"",
      w: 300,
      userMinH: 220,
      solutionLayout: "pills",
      items: [
        "Drop offs",
        "Desinstalações",
        "Cortes de Retenção",
        "Comportamental",
        "Tendências",
        "Impacto Real"
      ]
    },
    "solution:productexperiences": {
      icon:"PX", kind:"Addon", type:"red", variant:"default",
      title:"Product Experiences",
      desc:"Personalização remota e testes A/B.",
      w: 280,
      logoUrl:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png"
    },
    "solution:promotions": {
      icon:"PR", kind:"Addon", type:"red", variant:"solution",
      title:"Promotions", desc:"",
      w: 320,
      userMinH: 248,
      solutionLayout: "grid",
      items: [
        { icon:"https://png.pngtree.com/png-vector/20230315/ourmid/pngtree-campaign-line-icon-vector-png-image_6649613.png", label:"Promo Campaigns" },
        { icon:"https://icons.iconarchive.com/icons/icons8/ios7/512/Finance-Wallet-icon.png", label:"Carteira de fidelidade" },
        { icon:"https://cdn-icons-png.flaticon.com/512/6713/6713658.png", label:"Cupons", tone:"brand" },
        { icon:"https://cdn-icons-png.freepik.com/512/7162/7162364.png", label:"Vouchers de parceiros", tone:"brand" },
        { icon:"https://cdn-icons-png.flaticon.com/512/2666/2666513.png", label:"Custom Rewards" }
      ]
    },
    "solution:tesseractdbtm": {
      icon:"T", kind:"Solução", type:"red", variant:"solution",
      title:"TesseractDB™", desc:"",
      w: 600,
      userMinH: 264,
      solutionLayout: "tesseract",
      solutionLogo: "https://clevertap.com/wp-content/uploads/2024/03/Hyper-personalization-image.png",
      unboundedResize: true,
      items: [
        { icon:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png", label:"Retenção entre 3~10 anos" },
        { icon:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png", label:"Escala e Performance" },
        { icon:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png", label:"Dados em tempo real" },
        { icon:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png", label:"Visão Unificada do Cliente" },
        { icon:"https://cdn-public.softwarereviews.com/production/favicons/offerings/8910/original/CleverTap_fav.png", label:"Redução de Custo e Complexidade" }
      ]
    },
    "solution:scribeai": {
      icon:"AI", kind:"Solução AI", type:"blue", variant:"ai",
      title:"ScribeAI",
      desc:"Assistente de conteúdo com AI generativa.",
      w: 360,
      userMinH: 220,
      items: [
        "Copy Generation",
        "Emotion Signals",
        "Content Rewrite",
        "Emotion Optimization",
        "Channel Support"
      ]
    },
    "solution:askai": {
      icon:"AI", kind:"Solução AI", type:"blue", variant:"ai",
      title:"AskAI",
      desc:"Camada de decisão e recomendação da jornada com AI.",
      w: 360,
      userMinH: 240,
      items: [
        "Best Time to Deliver",
        "Preferred Channel",
        "Predictive Segmentation",
        "Lifecycle Optmizer"
      ]
    },
    "solution:agentai": {
      icon:"AI", kind:"Solução AI", type:"blue", variant:"ai",
      title:"AI Agent",
      desc:"Agentes inteligentes para estratégia, decisão e ação.",
      w: 360,
      userMinH: 260,
      items: [
        "Strategy Agents",
        "Decision Agents",
        "Creative Agents",
        "Action Agents",
        "IntelliNODE",
        "Product Recommendations"
      ]
    },
    "solution:profile": {
      icon:"USR", kind:"Solução", type:"blue", variant:"profile",
      title:"John Smith",
      desc:"Profile / CDP",
      w: 300,
      h: 198,
      userMinH: 160,
      profileProperties: [
        { label:"Idade", value:"34 anos" },
        { label:"Cidade", value:"São Paulo" },
        { label:"Nascimento", value:"12/03/1991" },
        { label:"Categoria favorita", value:"Premium" }
      ],
      profileEvents: [
        "Comprou produto",
        "Viu página de oferta",
        "Iniciou app",
        "Abriu push",
        "Clicou em campanha"
      ],
      profileChannels: [
        { label:"WhatsApp", icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/960px-WhatsApp.svg.png" },
        { label:"Email", icon:"https://static.vecteezy.com/system/resources/thumbnails/014/440/980/small/email-message-icon-design-in-blue-circle-png.png" },
        { label:"SMS", icon:"https://cdn-icons-png.flaticon.com/512/733/733533.png" },
        { label:"App", icon:"https://cdn-icons-png.flaticon.com/512/8766/8766948.png" },
        { label:"Web", icon:"https://cdn-icons-png.flaticon.com/512/5339/5339181.png" }
      ]
    },
    "text:note": {
      icon:"T", kind:"Texto", type:"gray", variant:"text",
      title:"Texto Livre",
      text:"Digite aqui sua anotação...",
      fontSize:28,
      fontFamily:"Georgia",
      color:"#1e293b",
      align:"left",
      w: 220
    },
    "general:area": {
      icon:"AR", kind:"Anotação", type:"gray", variant:"area",
      title:"Bloco de área",
      desc:"Área pontilhada redimensionável",
      w: 420,
      h: 220,
      areaPattern: "dotted",
      areaStrokeWidth: 2,
      areaAnimated: false,
      areaLocked: false,
      areaColor: "#94a3b8"
    },
    "text:sticky": {
      icon:"📌", kind:"Nota", type:"gray", variant:"sticky",
      title:"Sticky Note",
      text:STICKY_DEFAULT_TEXT,
      stickyColor:"#fef08a",
      w: 200,
      h: 110,
      fontSize: STICKY_DEFAULT_FONT
    },
  };

  function addFromTemplateAt(key, clientX, clientY){
    const template = templates[key];
    if(!template) return;

    rememberActionState();
    const p = worldFromClient(clientX, clientY);
    const newId = "n_" + uid();
    const newNode = {
      id: newId,
      x: Math.round(p.x - 140),
      y: Math.round(p.y - 60),
      w: template.w || 280,
      h: template.h || 92,
      title: template.title,
      desc: template.desc,
      type: template.type,
      logoUrl: template.logoUrl || "",
      logoInvalid: false,
      icon: template.icon,
      kind: template.kind,
      variant: template.variant || "default",
      items: Array.isArray(template.items) ? template.items.map(deepCopyItem) : [],
      stacks: Array.isArray(template.stacks) ? [...template.stacks] : [],
      profileProperties: Array.isArray(template.profileProperties) ? JSON.parse(JSON.stringify(template.profileProperties)) : [],
      profileEvents: Array.isArray(template.profileEvents) ? JSON.parse(JSON.stringify(template.profileEvents)) : [],
      profileChannels: Array.isArray(template.profileChannels) ? JSON.parse(JSON.stringify(template.profileChannels)) : [],
      stackCatalog: template.stackCatalog || "",
      organizerPreset: template.organizerPreset || "",
      userMinH: template.userMinH || 0,
      solutionLayout: template.solutionLayout || "pills",
      solutionLogo: template.solutionLogo || "",
      orgOptions: Array.isArray(template.orgOptions) ? [...template.orgOptions] : [],
      areaPattern: template.areaPattern || "dotted",
      areaStrokeWidth: Number(template.areaStrokeWidth || 2),
      areaAnimated: !!template.areaAnimated,
      areaLocked: !!template.areaLocked,
      areaColor: template.areaColor || "#94a3b8",
      text: template.text || "",
      fontSize: template.fontSize || defaultFontSizeForVariant(template.variant),
      fontFamily: template.fontFamily || "Georgia",
      color: template.color || "#1e293b",
      align: template.align || "left",
      stickyColor: template.stickyColor || "#fef08a",
      unboundedResize: !!template.unboundedResize
    };
    ensureNodeI18n(newNode);
    applyNodeLanguage(newNode, currentLanguage);
    nodes.push(newNode);

    setSingleNodeSelection(newId);
    render();
    const newEl = nodesLayer.querySelector(`[data-id="${newId}"]`);
    newEl?.classList.add("is-new");
    setTimeout(()=> newEl?.classList.remove("is-new"), 250);
    showToast(t("blockAdded"));
  }

  function addFromTemplate(key){
    const r = wrap.getBoundingClientRect();
    addFromTemplateAt(key, r.left + r.width/2, r.top + r.height/2);
  }

  nativeLaunchWrap?.addEventListener("mouseenter", ()=>{
    if(nativeFlyoutHideTimer){
      clearTimeout(nativeFlyoutHideTimer);
      nativeFlyoutHideTimer = null;
    }
    scheduleNativeFlyoutHoverOpen();
  });
  nativeLaunchWrap?.addEventListener("mouseleave", ()=>{
    if(nativeFlyoutHoverTimer){
      clearTimeout(nativeFlyoutHoverTimer);
      nativeFlyoutHoverTimer = null;
    }
    if(!nativeFlyoutPinned) scheduleNativeFlyoutClose();
  });
  nativeFlyout?.addEventListener("mouseenter", ()=>{
    if(nativeFlyoutHideTimer){
      clearTimeout(nativeFlyoutHideTimer);
      nativeFlyoutHideTimer = null;
    }
  });
  nativeFlyout?.addEventListener("mouseleave", ()=>{
    if(!nativeFlyoutPinned) scheduleNativeFlyoutClose();
  });
  nativeFlyoutArrow?.addEventListener("click", (e)=>{
    e.stopPropagation();
    if(nativeFlyout.classList.contains("open") && nativeFlyoutPinned){
      closeNativeFlyout({ force:true });
      return;
    }
    if(nativeFlyoutHoverTimer){
      clearTimeout(nativeFlyoutHoverTimer);
      nativeFlyoutHoverTimer = null;
    }
    if(nativeFlyoutHideTimer){
      clearTimeout(nativeFlyoutHideTimer);
      nativeFlyoutHideTimer = null;
    }
    nativeFlyoutPinned = true;
    openNativeFlyout({ pinned:true });
  });
  featuresLaunchWrap?.addEventListener("mouseenter", ()=>{
    if(featuresFlyoutHideTimer){
      clearTimeout(featuresFlyoutHideTimer);
      featuresFlyoutHideTimer = null;
    }
    scheduleFeaturesFlyoutHoverOpen();
  });
  featuresLaunchWrap?.addEventListener("mouseleave", ()=>{
    if(featuresFlyoutHoverTimer){
      clearTimeout(featuresFlyoutHoverTimer);
      featuresFlyoutHoverTimer = null;
    }
    if(!featuresFlyoutPinned) scheduleFeaturesFlyoutClose();
  });
  featuresFlyout?.addEventListener("mouseenter", ()=>{
    if(featuresFlyoutHideTimer){
      clearTimeout(featuresFlyoutHideTimer);
      featuresFlyoutHideTimer = null;
    }
  });
  featuresFlyout?.addEventListener("mouseleave", ()=>{
    if(!featuresFlyoutPinned) scheduleFeaturesFlyoutClose();
  });
  featuresFlyoutArrow?.addEventListener("click", (e)=>{
    e.stopPropagation();
    if(featuresFlyout.classList.contains("open") && featuresFlyoutPinned){
      closeFeaturesFlyout({ force:true });
      return;
    }
    if(featuresFlyoutHoverTimer){
      clearTimeout(featuresFlyoutHoverTimer);
      featuresFlyoutHoverTimer = null;
    }
    if(featuresFlyoutHideTimer){
      clearTimeout(featuresFlyoutHideTimer);
      featuresFlyoutHideTimer = null;
    }
    featuresFlyoutPinned = true;
    openFeaturesFlyout({ pinned:true });
  });
  sidebarEl?.addEventListener("scroll", ()=>{
    if(nativeFlyout?.classList.contains("open")) positionNativeFlyout();
    if(featuresFlyout?.classList.contains("open")) positionFeaturesFlyout();
  });

  document.querySelectorAll("[data-add]").forEach(btn=>{
    btn.setAttribute("draggable", "true");
    btn.addEventListener("dragstart", (e)=>{
      const key = btn.dataset.add;
      if(!key) return;
      e.dataTransfer?.setData("text/plain", key);
      if(e.dataTransfer) e.dataTransfer.effectAllowed = "copy";
    });
    btn.addEventListener("click", ()=>{
      closeNativeFlyout({ force:true });
      addFromTemplate(btn.dataset.add);
    });
  });

  wrap.addEventListener("dragover", (e)=>{
    if(!e.dataTransfer) return;
    const hasKey = Array.from(e.dataTransfer.types || []).includes("text/plain");
    if(!hasKey) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  });
  wrap.addEventListener("drop", (e)=>{
    if(!e.dataTransfer) return;
    const key = e.dataTransfer.getData("text/plain");
    if(!key || !templates[key]) return;
    e.preventDefault();
    addFromTemplateAt(key, e.clientX, e.clientY);
  });
  function addFromTemplateAtWorld(key, wx, wy){
    const r = wrap.getBoundingClientRect();
    addFromTemplateAt(key, wx * view.z + view.x + r.left, wy * view.z + view.y + r.top);
  }

  // --- Buttons ---
  btnTemplate?.addEventListener("click", ()=> openTemplateModal());
  btnTplClose?.addEventListener("click", ()=> closeTemplateModal());
  tplBack?.addEventListener("click", (e)=>{
    if(e.target === tplBack) closeTemplateModal();
  });
  btnTplPaste?.addEventListener("click", ()=>{
    const txt = prompt(t("templateJsonPrompt"));
    if(!txt) return;
    try{
      const parsed = JSON.parse(txt);
      const obj = extractImportState(parsed);
      if(!obj) throw new Error("Template invalido");
      const entry = {
        id: `custom-${uid()}`,
        name: parsed?.canvas?.name || parsed?.name || `Template ${customCanvasTemplates.length + 1}`,
        description: parsed?.description || t("templateImportedDesc"),
        data: parsed
      };
      customCanvasTemplates.unshift(entry);
      persistTemplateLibrary();
      showToast(t("templateImported"));
      openTemplateModal();
    } catch {
      alert(t("templateInvalid"));
    }
  });
  btnConnect.addEventListener("click", ()=> setConnectMode(!connectMode));

  btnGrid.addEventListener("click", ()=>{
    const on = grid.style.display !== "none";
    grid.style.display = on ? "none" : "block";
    btnGrid.classList.toggle("active", !on);
    showToast(`Grid ${!on ? "habilitado" : "desabilitado"}.`);
  });

  btnFlow.addEventListener("click", ()=>{
    flowOn = !flowOn;
    btnFlow.classList.toggle("active", flowOn);
    showToast(`Flow ${flowOn ? "habilitado" : "desabilitado"}.`);
    render();
  });
  btnPreview?.addEventListener("click", ()=>{
    if(!nodes.length){
      showToast("Não há elementos para visualizar.");
      return;
    }
    setPreviewPickMode(!previewPickMode);
  });
  btnDownloadPng?.addEventListener("click", ()=> downloadDataUrl(previewDataUrl, "clevertap-canvas.png"));
  btnDownloadPdf?.addEventListener("click", ()=> downloadPreviewPdf().catch(()=>{
    alert("Não foi possível gerar o PDF.");
  }));

  btnExport.addEventListener("click", ()=> openExportModal());
  btnExportClose?.addEventListener("click", closeExportModal);
  btnExportCancel?.addEventListener("click", closeExportModal);
  btnExportApply?.addEventListener("click", confirmExportFromModal);
  exportFileNameInput?.addEventListener("input", refreshExportActionState);
  exportFileNameInput?.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      e.preventDefault();
      confirmExportFromModal();
    }
  });

  btnImport.addEventListener("click", ()=> openImportModal());

  btnReset.addEventListener("click", ()=>{
    if(!confirm(t("confirmReset"))) return;
    rememberActionState();
    view = { x: 0, y: 0, z: 1 };
    nodes = [];
    edges = [];
    canvasNameI18n = buildLocalizedStringRecord("Diagrama CleverTap");
    canvasName = canvasNameI18n[currentLanguage] || translateKnownPhrase("Diagrama CleverTap");
    if(canvasNameEl) canvasNameEl.textContent = canvasName;
    clearNodeSelection();
    selected = { type:null, id:null };
    connectFrom = null;
    edgeCfg = {
      connectorType: "curved",
      lineType: "dashed",
      marker: "arrow",
      flowDots: 2,
      lineColor: "#94a3b8",
      activeColor: "#ef4444",
      flowColor: "#2563eb"
    };
    itemHistory = { undo: [], redo: [] };
    try{ localStorage.removeItem(STORAGE_KEY); } catch {}
    refreshSettingsUI();
    setTransform();
    render();
  });

  btnCenter.addEventListener("click", ()=>{
    fitViewToContent();
    showToast("Centralizado com fit-to-content.");
  });
  btnZoomIn?.addEventListener("click", ()=> setZoom(view.z + 0.1));
  btnZoomOut?.addEventListener("click", ()=> setZoom(view.z - 0.1));
  zoomPct?.addEventListener("focus", ()=> zoomPct.select());
  zoomPct?.addEventListener("blur", applyZoomFromInput);
  zoomPct?.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      e.preventDefault();
      applyZoomFromInput();
      zoomPct.blur();
    } else if(e.key === "Escape"){
      e.preventDefault();
      updateZoomLabel();
      zoomPct.blur();
    }
  });
  if(canvasNameEl){
    canvasNameEl.textContent = canvasName;
    canvasNameEl.addEventListener("click", ()=>{
      canvasNameEl.setAttribute("contenteditable", "true");
      canvasNameEl.focus();
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(canvasNameEl);
      sel?.removeAllRanges();
      sel?.addRange(range);
    });
    canvasNameEl.addEventListener("blur", ()=>{
      canvasNameEl.setAttribute("contenteditable", "false");
      canvasName = (canvasNameEl.textContent || "").trim() || translateKnownPhrase("Diagrama CleverTap");
      canvasNameEl.textContent = canvasName;
      ensureCanvasNameI18n();
      canvasNameI18n[currentLanguage] = canvasName;
      queuePersist();
    });
    canvasNameEl.addEventListener("keydown", (e)=>{
      if(e.key === "Enter"){
        e.preventDefault();
        canvasNameEl.blur();
      }
      if(e.key === "Escape"){
        e.preventDefault();
        canvasNameEl.textContent = canvasName;
        canvasNameEl.blur();
      }
    });
  }

  btnGenerateProject?.addEventListener("click", ()=>{
    if(!nodes.length){
      showToast("Não há elementos para gerar o projeto.");
      return;
    }
    openProjectModal();
  });

  tbDec?.addEventListener("click", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || (n.variant !== "text" && n.variant !== "sticky")) return;
    const min = n.variant === "sticky" ? 10 : 12;
    const max = n.variant === "sticky" ? 42 : 92;
    n.fontSize = clamp(Number(n.fontSize || defaultFontSizeForVariant(n.variant)) - 2, min, max);
    render();
  });
  tbInc?.addEventListener("click", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || (n.variant !== "text" && n.variant !== "sticky")) return;
    const min = n.variant === "sticky" ? 10 : 12;
    const max = n.variant === "sticky" ? 42 : 92;
    n.fontSize = clamp(Number(n.fontSize || defaultFontSizeForVariant(n.variant)) + 2, min, max);
    render();
  });
  tbFont?.addEventListener("change", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "text") return;
    n.fontFamily = tbFont.value;
    render();
  });
  tbColor?.addEventListener("change", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "text") return;
    n.color = tbColor.value;
    render();
  });
  tbAlign?.addEventListener("change", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "text") return;
    n.align = tbAlign.value;
    render();
  });
  tbAreaTitle?.addEventListener("input", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "area") return;
    n.title = (tbAreaTitle.value || "").trim() || "Bloco de área";
    ensureNodeI18n(n);
    n.i18n.title[currentLanguage] = n.title;
    queuePersist();
    render();
  });
  tbAreaPattern?.addEventListener("change", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "area") return;
    n.areaPattern = tbAreaPattern.value || "dotted";
    queuePersist();
    render();
  });
  tbAreaColor?.addEventListener("input", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "area") return;
    n.areaColor = tbAreaColor.value || "#94a3b8";
    queuePersist();
    render();
  });
  tbAreaWidth?.addEventListener("input", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "area") return;
    n.areaStrokeWidth = clamp(Number(tbAreaWidth.value || 2), 1, 12);
    queuePersist();
    render();
  });
  tbAreaAnimate?.addEventListener("click", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "area") return;
    n.areaAnimated = !n.areaAnimated;
    queuePersist();
    render();
  });
  tbAreaLock?.addEventListener("click", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "area") return;
    n.areaLocked = !n.areaLocked;
    queuePersist();
    render();
  });
  tbText?.addEventListener("input", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "text") return;
    n.text = tbText.value;
    ensureNodeI18n(n);
    n.i18n.text[currentLanguage] = n.text;
    const textEl = nodesLayer.querySelector(`.node[data-id="${n.id}"] .textNodeBody`);
    if(textEl) textEl.textContent = n.text || "";
    queuePersist();
  });
  tbText?.addEventListener("change", ()=>{
    const n = (selected.type==="node") ? getNodeById(selected.id) : null;
    if(!n || n.variant !== "text") return;
    n.text = tbText.value;
    ensureNodeI18n(n);
    n.i18n.text[currentLanguage] = n.text;
    render();
  });
  btnSettings?.addEventListener("click", (e)=>{
    e.stopPropagation();
    const show = !settingsPanel?.classList.contains("show");
    settingsPanel?.classList.toggle("show", show);
    settingsPanel?.setAttribute("aria-hidden", show ? "false" : "true");
  });
  btnSidebar?.addEventListener("click", ()=>{
    const next = !appEl?.classList.contains("sidebar-collapsed");
    setSidebarCollapsed(next);
  });
  cfgLineType?.addEventListener("change", ()=>{
    edgeCfg.lineType = cfgLineType.value;
    render();
  });
  cfgConnectorType?.addEventListener("change", ()=>{
    edgeCfg.connectorType = cfgConnectorType.value;
    render();
  });
  cfgMarker?.addEventListener("change", ()=>{
    edgeCfg.marker = cfgMarker.value;
    render();
  });
  cfgFlowDots?.addEventListener("change", ()=>{
    edgeCfg.flowDots = clamp(Number(cfgFlowDots.value || 2), 1, 3);
    render();
  });
  cfgLineColor?.addEventListener("change", ()=>{
    edgeCfg.lineColor = cfgLineColor.value;
    render();
  });
  cfgFlowColor?.addEventListener("change", ()=>{
    edgeCfg.flowColor = cfgFlowColor.value;
    render();
  });
  cfgLanguage?.addEventListener("change", ()=>{
    setLanguage(cfgLanguage.value);
  });
  settingsPanel?.addEventListener("click", (e)=> e.stopPropagation());
  nativeFlyout?.addEventListener("click", (e)=> e.stopPropagation());
  featuresFlyout?.addEventListener("click", (e)=> e.stopPropagation());
  document.addEventListener("click", (e)=>{
    const target = e.target;
    if(target === btnSettings || settingsPanel?.contains(target)) return;
    settingsPanel?.classList.remove("show");
    settingsPanel?.setAttribute("aria-hidden","true");
  });
  document.addEventListener("click", (e)=>{
    const target = e.target;
    if(nativeLaunchWrap?.contains(target) || nativeFlyout?.contains(target)) return;
    closeNativeFlyout({ force:true });
  });
  document.addEventListener("click", (e)=>{
    const target = e.target;
    if(featuresLaunchWrap?.contains(target) || featuresFlyout?.contains(target)) return;
    closeFeaturesFlyout({ force:true });
  });
  ctxMenu?.addEventListener("click", (e)=> e.stopPropagation());
  ctxCanvasMenu?.addEventListener("click", (e)=> e.stopPropagation());
  edgeTypeBar?.addEventListener("click", (e)=> e.stopPropagation());
  document.addEventListener("click", ()=> closeAllCtxMenus());

  // Search
  search.addEventListener("input", ()=> render());

  // click background to clear selection
  wrap.addEventListener("click", (e)=>{
    if(suppressWrapClick){
      suppressWrapClick = false;
      return;
    }
    const ok = (e.target === wrap || e.target.id==="canvas" || e.target===grid || e.target===svg || e.target===nodesLayer);
    if(!ok) return;
    settingsPanel?.classList.remove("show");
    settingsPanel?.setAttribute("aria-hidden","true");
    nodes.forEach((n)=>{ if(n.variant === "organizer") n.orgMenuOpen = false; });
    clearNodeSelection();
    selected = { type:null, id:null };
    connectFrom = null;
    closeAllCtxMenus();
    render();
  });

  nodesLayer.addEventListener("contextmenu", (e)=>{
    const nodeEl = e.target.closest(".node");
    if(!nodeEl) return;
    e.preventDefault();
    e.stopPropagation();
    ctxTargetNodeId = nodeEl.dataset.id || null;
    if(ctxTargetNodeId){
      selectNode(ctxTargetNodeId);
      const n = getNodeById(ctxTargetNodeId);
      const ctxHighlight = document.getElementById("ctx-highlight");
      if(ctxHighlight){
        ctxHighlight.textContent = n?.highlightPulse
          ? translateKnownPhrase("Remover destaque de borda")
          : translateKnownPhrase("Aplicar destaque de borda");
      }
    }
    openCtxMenu(ctxMenu, e.clientX, e.clientY);
  });
  wrap.addEventListener("contextmenu", (e)=>{
    if(e.target.closest(".node")) return;
    e.preventDefault();
    e.stopPropagation();
    ctxClickPos = worldFromClient(e.clientX, e.clientY);
    openCtxMenu(ctxCanvasMenu, e.clientX, e.clientY);
  });
  document.getElementById("ctx-edit")?.addEventListener("click", ()=>{
    if(!ctxTargetNodeId) return;
    const n = getNodeById(ctxTargetNodeId);
    if(!n) return;
    if(n.variant === "text" || n.variant === "sticky"){
      showToast("Esse bloco é editado direto no canvas.");
    } else {
      openEdit(ctxTargetNodeId);
    }
    closeAllCtxMenus();
  });
  document.getElementById("ctx-dup")?.addEventListener("click", ()=>{
    if(ctxTargetNodeId) duplicateNode(ctxTargetNodeId);
    closeAllCtxMenus();
  });
  document.getElementById("ctx-del")?.addEventListener("click", ()=>{
    if(ctxTargetNodeId) removeNodeById(ctxTargetNodeId);
    closeAllCtxMenus();
  });
  document.getElementById("ctx-connect")?.addEventListener("click", ()=>{
    if(ctxTargetNodeId){
      const n = getNodeById(ctxTargetNodeId);
      if(isConnectableNode(n)){
        connectFrom = { nodeId: ctxTargetNodeId, port: "e" };
        showToast("Agora clique no PORT de destino…");
        render();
      } else {
        showToast("Esse bloco não possui conexão por port.");
      }
    }
    closeAllCtxMenus();
  });
  document.getElementById("ctx-highlight")?.addEventListener("click", ()=>{
    if(ctxTargetNodeId) toggleNodeHighlight(ctxTargetNodeId);
    closeAllCtxMenus();
  });
  document.getElementById("ctx-addNote")?.addEventListener("click", ()=>{
    if(ctxClickPos) addFromTemplateAtWorld("text:sticky", ctxClickPos.x, ctxClickPos.y);
    closeAllCtxMenus();
  });
  document.getElementById("ctx-addArea")?.addEventListener("click", ()=>{
    if(ctxClickPos) addFromTemplateAtWorld("general:area", ctxClickPos.x, ctxClickPos.y);
    closeAllCtxMenus();
  });
  document.getElementById("ctx-addText")?.addEventListener("click", ()=>{
    if(ctxClickPos) addFromTemplateAtWorld("text:note", ctxClickPos.x, ctxClickPos.y);
    closeAllCtxMenus();
  });
  document.getElementById("ctx-selectAll")?.addEventListener("click", ()=>{
    selected = { type:null, id:null };
    nodes.forEach(n => selectedNodeIds.add(n.id));
    syncSingleSelection();
    render();
    closeAllCtxMenus();
  });
  document.getElementById("ctx-fitAll")?.addEventListener("click", ()=>{
    btnCenter?.click();
    closeAllCtxMenus();
  });

  // Delete selected (node/edge)
  window.addEventListener("keydown", (e)=>{
    const active = document.activeElement?.tagName?.toLowerCase();
    const isTypingContext = active === "input"
      || active === "textarea"
      || active === "select"
      || !!document.activeElement?.isContentEditable;
    const cmd = e.ctrlKey || e.metaKey;
    if(cmd && !e.shiftKey && e.key.toLowerCase() === "z"){
      if(isTypingContext) return;
      e.preventDefault();
      undoAction();
      return;
    }
    if(e.key === "Escape"){
      closeAllCtxMenus();
      closeTemplateModal();
      closeProjectModal();
    }
    if(cmd && (e.key.toLowerCase() === "y" || (e.shiftKey && e.key.toLowerCase() === "z"))){
      if(isTypingContext) return;
      e.preventDefault();
      redoAction();
      return;
    }
    if(!cmd && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "t"){
      if(!isTypingContext){
        const r = wrap.getBoundingClientRect();
        addFromTemplateAt("text:note", r.left + r.width/2, r.top + r.height/2);
        e.preventDefault();
        return;
      }
    }
    if(e.key !== "Delete" && e.key !== "Backspace") return;

    if(isTypingContext) return;

    if(selectedNodeIds.size){
      rememberActionState();
      const ids = [...selectedNodeIds];
      const idSet = new Set(ids);
      nodes = nodes.filter(n => !idSet.has(n.id));
      edges = edges.filter(e => !idSet.has(e.from.node) && !idSet.has(e.to.node));
      clearNodeSelection();
      selected = { type:null, id:null };
      render();
      showToast(ids.length > 1 ? `${ids.length} blocos removidos.` : "Bloco removido.");
    } else if(selected.type==="node" && selected.id){
      removeNodeById(selected.id);
    } else if(selected.type==="edge" && selected.id){
      removeEdgeById(selected.id);
    }
  });

  // utility copy
  function copyToClipboard(text){
    navigator.clipboard?.writeText(text).catch(()=>{
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    });
  }
  function projectSafeFilename(name){
    return (name || "projeto-clevertap")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9-_ ]+/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 80) || "projeto-clevertap";
  }
  function summarizeNodeContent(n){
    const parts = [];
    if(n.desc) parts.push(`Descrição: ${n.desc}`);
    if(n.variant === "text" || n.variant === "sticky"){
      if(n.text) parts.push(`Texto: ${n.text}`);
    }
    if(Array.isArray(n.items) && n.items.length){
      const labels = n.items
        .map((it)=> typeof it === "string" ? it : (it?.label || ""))
        .filter(Boolean);
      if(labels.length) parts.push(`Itens: ${labels.join(" | ")}`);
    }
    if(Array.isArray(n.stacks) && n.stacks.length){
      const stackLabels = n.stacks
        .map((sid)=>stackById(sid, n)?.label || sid)
        .filter(Boolean);
      if(stackLabels.length) parts.push(`Stacks: ${stackLabels.join(", ")}`);
    }
    return parts.join(" ");
  }
  function collectTechStackFromCanvas(){
    const webStacks = new Set();
    const appStacks = new Set();
    const otherStacks = new Set();
    let hasWeb = false;
    let hasApp = false;

    for(const n of nodes){
      const title = (n.title || "").toLowerCase().trim();
      const stacks = Array.isArray(n.stacks) ? n.stacks : [];
      const stackLabels = stacks
        .map((sid)=>stackById(sid, n)?.label || sid)
        .filter(Boolean);

      if(title === "web"){
        hasWeb = true;
        stackLabels.forEach((s)=>webStacks.add(s));
        continue;
      }
      if(title === "app"){
        hasApp = true;
        stackLabels.forEach((s)=>appStacks.add(s));
        continue;
      }
      if(stackLabels.length){
        stackLabels.forEach((s)=>otherStacks.add(s));
      }
    }

    return {
      web: { hasChannel: hasWeb, stacks: [...webStacks] },
      app: { hasChannel: hasApp, stacks: [...appStacks] },
      other: { hasChannel: otherStacks.size > 0, stacks: [...otherStacks] }
    };
  }
  function buildProjectScopeData(overallInput){
    const overall = {
      challenges: (overallInput?.challenges || "").toString().trim(),
      businessGoals: (overallInput?.businessGoals || "").toString().trim(),
      expectations: (overallInput?.expectations || "").toString().trim(),
      l1: (overallInput?.l1 || "").toString().trim(),
      l2: (overallInput?.l2 || "").toString().trim(),
      l3: (overallInput?.l3 || "").toString().trim()
    };
    const links = edges.map((e, idx)=>{
      const from = getNodeById(e.from?.node);
      const to = getNodeById(e.to?.node);
      return {
        idx: idx + 1,
        from: from?.title || e.from?.node || "Origem",
        fromPort: e.from?.port || "",
        to: to?.title || e.to?.node || "Destino",
        toPort: e.to?.port || "",
        edgeType: e.edgeType || "generic"
      };
    });
    return {
      generatedAt: new Date().toISOString(),
      projectName: canvasName || "Diagrama CleverTap",
      totalNodes: nodes.length,
      totalEdges: edges.length,
      overall,
      techStack: collectTechStackFromCanvas(),
      links
    };
  }
  function buildProjectDocHtml(scope){
    const chipHtml = (label)=>`<span style="display:inline-block;padding:2px 8px;border:1px solid #cbd5e1;border-radius:999px;background:#f8fafc;font-size:10pt;margin:2px 4px 2px 0;">${escapeHTML(label)}</span>`;
    const stackCellHtml = (arr)=> arr.length ? arr.map(chipHtml).join("") : "-";
    const hasWeb = !!scope?.techStack?.web?.hasChannel;
    const hasApp = !!scope?.techStack?.app?.hasChannel;
    const hasOther = !!scope?.techStack?.other?.hasChannel;
    const webStacks = Array.isArray(scope?.techStack?.web?.stacks) ? scope.techStack.web.stacks : [];
    const appStacks = Array.isArray(scope?.techStack?.app?.stacks) ? scope.techStack.app.stacks : [];
    const otherStacks = Array.isArray(scope?.techStack?.other?.stacks) ? scope.techStack.other.stacks : [];
    const overallRows = [
      ["Challenges - Current Situation", scope?.overall?.challenges || "-"],
      ["Business Goals (goal they want to achieve with CleverTap)", scope?.overall?.businessGoals || "-"],
      ["Expectations", scope?.overall?.expectations || "-"],
      ["L1", scope?.overall?.l1 || "-"],
      ["L2", scope?.overall?.l2 || "-"],
      ["L3", scope?.overall?.l3 || "-"]
    ].map(([k, v])=>`<tr><td>${escapeHTML(k)}</td><td>${escapeHTML(v)}</td></tr>`).join("");
    const linkRows = scope.links.length
      ? scope.links.map((ln)=>`
        <tr>
          <td>${ln.idx}</td>
          <td>${escapeHTML(ln.from)} (${escapeHTML(ln.fromPort)})</td>
          <td>${escapeHTML(ln.to)} (${escapeHTML(ln.toPort)})</td>
          <td>${escapeHTML(ln.edgeType)}</td>
        </tr>
      `).join("")
      : `<tr><td colspan="4">Sem conexões mapeadas.</td></tr>`;
    return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>${escapeHTML(scope.projectName)} - Escopo Técnico</title>
  <style>
    body{font-family:Inter,Arial,sans-serif;color:#0f172a;font-size:11pt;line-height:1.4;margin:28px}
    h1{font-size:18pt;margin:0 0 10px}
    h2{font-size:13pt;margin:18px 0 8px}
    p{margin:4px 0}
    table{border-collapse:collapse;width:100%;margin-top:6px}
    th,td{border:1px solid #cbd5e1;padding:6px 8px;vertical-align:top}
    th{background:#f8fafc;text-align:left}
  </style>
</head>
<body>
  <h1>Escopo Técnico do Projeto</h1>
  <p><b>Projeto:</b> ${escapeHTML(scope.projectName)}</p>
  <p><b>Gerado em:</b> ${escapeHTML(new Date(scope.generatedAt).toLocaleString("pt-BR"))}</p>
  <p><b>Total de blocos:</b> ${scope.totalNodes} | <b>Total de conexões:</b> ${scope.totalEdges}</p>

  <h2>Overall Information</h2>
  <table>
    <thead><tr><th>Campo</th><th>Resposta</th></tr></thead>
    <tbody>${overallRows}</tbody>
  </table>

  <h2>Tech Stack</h2>
  <table>
    <thead>
      <tr><th>Web</th><th>App</th><th>Other (please detail)</th></tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align:center;font-size:14pt;">${hasWeb ? "☑" : "☐"}</td>
        <td style="text-align:center;font-size:14pt;">${hasApp ? "☑" : "☐"}</td>
        <td style="text-align:center;font-size:14pt;">${hasOther ? "☑" : "☐"}</td>
      </tr>
      <tr>
        <td>${stackCellHtml(webStacks)}</td>
        <td>${stackCellHtml(appStacks)}</td>
        <td>${stackCellHtml(otherStacks)}</td>
      </tr>
    </tbody>
  </table>

  <h2>Conexões Previstas</h2>
  <table>
    <thead><tr><th>#</th><th>Origem</th><th>Destino</th><th>Tipo</th></tr></thead>
    <tbody>${linkRows}</tbody>
  </table>
</body>
</html>`;
  }
  function downloadProjectDoc(scope){
    const html = buildProjectDocHtml(scope);
    const blob = new Blob(["\ufeff", html], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectSafeFilename(scope.projectName)}-escopo-tecnico.doc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  async function tryCreateProjectDocOnDrive(scope){
    if(!DRIVE_PROJECT_WEBHOOK_URL) return "";
    const html = buildProjectDocHtml(scope);
    const resp = await fetch(DRIVE_PROJECT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_project_doc",
        name: `${scope.projectName} - Escopo Técnico`,
        html,
        scope
      })
    });
    if(!resp.ok){
      throw new Error(`Falha ao criar doc no Drive (${resp.status})`);
    }
    const data = await resp.json().catch(()=>({}));
    return data.docUrl || data.url || "";
  }
  function loadScriptOnce(src, getPromise, setPromise){
    const existing = getPromise();
    if(existing) return existing;
    const promise = new Promise((resolve, reject)=>{
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = ()=>resolve();
      s.onerror = ()=>reject(new Error("Falha ao carregar script externo"));
      document.head.appendChild(s);
    });
    setPromise(promise);
    return promise;
  }
  function nextFrame(){
    return new Promise((resolve)=>requestAnimationFrame(()=>resolve()));
  }
  async function ensureHtml2Canvas(){
    if(window.html2canvas) return;
    await loadScriptOnce(
      "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
      ()=>html2canvasLoader,
      (v)=>{ html2canvasLoader = v; }
    );
  }
  async function ensureJsPdf(){
    if(window.jspdf?.jsPDF) return;
    await loadScriptOnce(
      "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
      ()=>jsPdfLoader,
      (v)=>{ jsPdfLoader = v; }
    );
  }
  function openPreviewModal(){
    if(!previewDataUrl) return;
    previewBack.style.display = "flex";
    previewBack.setAttribute("aria-hidden","false");
  }
  function closePreviewModal(){
    previewBack.style.display = "none";
    previewBack.setAttribute("aria-hidden","true");
  }
  function showPreviewPickRect(rect){
    if(!previewPickEl) return;
    previewPickEl.style.display = "block";
    previewPickEl.style.left = `${rect.x}px`;
    previewPickEl.style.top = `${rect.y}px`;
    previewPickEl.style.width = `${rect.w}px`;
    previewPickEl.style.height = `${rect.h}px`;
  }
  function hidePreviewPickRect(){
    if(!previewPickEl) return;
    previewPickEl.style.display = "none";
  }
  function setPreviewPickMode(on){
    previewPickMode = !!on;
    wrap.classList.toggle("preview-pick", previewPickMode);
    if(previewPickMode){
      showToast("Arraste a área no canvas para visualizar.");
    } else {
      previewPickDrag = null;
      hidePreviewPickRect();
    }
  }
  async function capturePreviewFromRect(selRect){
    if(!selRect || selRect.w < 8 || selRect.h < 8) return;
    const prevSettingsOpen = settingsPanel?.classList.contains("show");
    const prevTextBarOpen = textBar?.classList.contains("show");
    settingsPanel?.classList.remove("show");
    settingsPanel?.setAttribute("aria-hidden","true");
    textBar?.classList.remove("show");
    textBar?.setAttribute("aria-hidden","true");
    try{
      wrap.classList.add("exporting");
      await nextFrame();
      await nextFrame();
      await ensureHtml2Canvas();
      const baseCanvas = await window.html2canvas(wrap, {
        backgroundColor: "#ffffff",
        useCORS: true,
        scale: Math.min(2, window.devicePixelRatio || 1.5),
        logging: false
      });
      const canvas = await composeCanvasWithSvgOverlay(baseCanvas);
      const sx = canvas.width / Math.max(wrap.clientWidth, 1);
      const sy = canvas.height / Math.max(wrap.clientHeight, 1);
      const cx = clamp(Math.round(selRect.x * sx), 0, canvas.width - 1);
      const cy = clamp(Math.round(selRect.y * sy), 0, canvas.height - 1);
      const cw = clamp(Math.round(selRect.w * sx), 1, canvas.width - cx);
      const ch = clamp(Math.round(selRect.h * sy), 1, canvas.height - cy);
      const cropped = document.createElement("canvas");
      cropped.width = cw;
      cropped.height = ch;
      const ctx = cropped.getContext("2d");
      ctx.drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);
      previewDataUrl = cropped.toDataURL("image/png");
      previewImageSize = { w: cw, h: ch };
      if(previewImg) previewImg.src = previewDataUrl;
    } finally {
      wrap.classList.remove("exporting");
      if(prevSettingsOpen){
        settingsPanel?.classList.add("show");
        settingsPanel?.setAttribute("aria-hidden","false");
      }
      if(prevTextBarOpen){
        textBar?.classList.add("show");
        textBar?.setAttribute("aria-hidden","false");
      }
    }
  }
  async function composeCanvasWithSvgOverlay(baseCanvas){
    const merged = document.createElement("canvas");
    merged.width = baseCanvas.width;
    merged.height = baseCanvas.height;
    const ctx = merged.getContext("2d");
    if(!ctx) return baseCanvas;
    ctx.drawImage(baseCanvas, 0, 0);
    try{
      const svgDataUrl = serializeSvgForExport(merged.width, merged.height);
      if(!svgDataUrl) return merged;
      const img = await loadImage(svgDataUrl);
      ctx.drawImage(img, 0, 0, merged.width, merged.height);
    } catch {}
    return merged;
  }
  function serializeSvgForExport(width, height){
    if(!svg) return "";
    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", String(width));
    clone.setAttribute("height", String(height));
    clone.style.transform = svg.style.transform || "";
    clone.style.transformOrigin = svg.style.transformOrigin || "0 0";
    const xml = new XMLSerializer().serializeToString(clone);
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
  }
  function loadImage(src){
    return new Promise((resolve, reject)=>{
      const img = new Image();
      img.onload = ()=>resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  function downloadDataUrl(dataUrl, filename){
    if(!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  function downloadTextFile(text, filename, mimeType = "application/json;charset=utf-8"){
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 0);
  }
  function getDefaultExportFilename(){
    const base = (canvasName || "clevertap-canvas")
      .replace(/[\\/:*?"<>|]+/g, "-")
      .replace(/\s+/g, " ")
      .trim() || "clevertap-canvas";
    return `${base}.json`;
  }
  function normalizeExportFilename(value){
    const base = String(value || "")
      .replace(/[\\/:*?"<>|]+/g, "-")
      .replace(/\.json$/i, "")
      .replace(/\s+/g, " ")
      .trim();
    return base ? `${base}.json` : "";
  }
  function refreshExportActionState(){
    if(!btnExportApply) return;
    btnExportApply.disabled = !normalizeExportFilename(exportFileNameInput?.value);
  }
  function openExportModal(){
    if(!exportBack) return;
    if(exportFileNameInput){
      exportFileNameInput.value = getDefaultExportFilename().replace(/\.json$/i, "");
    }
    exportBack.style.display = "flex";
    exportBack.setAttribute("aria-hidden", "false");
    refreshExportActionState();
    setTimeout(()=>exportFileNameInput?.focus(), 0);
    setTimeout(()=>exportFileNameInput?.select?.(), 0);
  }
  function closeExportModal(){
    if(!exportBack) return;
    exportBack.style.display = "none";
    exportBack.setAttribute("aria-hidden", "true");
  }
  function confirmExportFromModal(){
    const filename = normalizeExportFilename(exportFileNameInput?.value);
    if(!filename){
      showToast(t("exportFileNameRequired"));
      exportFileNameInput?.focus();
      return;
    }
    const data = JSON.stringify(buildPortableExportPayload(), null, 2);
    downloadTextFile(data, filename);
    closeExportModal();
    showToast(t("exportDownloaded"));
  }
  async function downloadPreviewPdf(){
    if(!previewDataUrl) return;
    await ensureJsPdf();
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: previewImageSize.w >= previewImageSize.h ? "landscape" : "portrait",
      unit: "px",
      format: [previewImageSize.w, previewImageSize.h]
    });
    pdf.addImage(previewDataUrl, "PNG", 0, 0, previewImageSize.w, previewImageSize.h);
    pdf.save("clevertap-canvas.pdf");
  }

  // init
  loadTemplateLibrary();
  loadProjectOverallInfo();
  loadPersisted();
  const setSectionCollapsed = (section, collapsed)=>{
    const bd = section.querySelector(".bd");
    const toggle = section.querySelector(".secToggle");
    if(!bd || !toggle) return;
    const currentHeight = bd.scrollHeight;
    if(collapsed){
      bd.style.height = `${currentHeight}px`;
      requestAnimationFrame(()=>{
        section.classList.add("collapsed");
        bd.style.height = "0px";
      });
    } else {
      section.classList.remove("collapsed");
      bd.style.height = "0px";
      requestAnimationFrame(()=>{
        const targetHeight = bd.scrollHeight;
        bd.style.height = `${targetHeight}px`;
      });
    }
    toggle.textContent = collapsed ? "+" : "−";
    toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    toggle.title = collapsed
      ? translateKnownPhrase("Expandir seção")
      : translateKnownPhrase("Recolher seção");
  };
  document.querySelectorAll(".section").forEach((section)=>{
    const toggle = section.querySelector(".secToggle");
    const bd = section.querySelector(".bd");
    if(bd){
      section.classList.remove("collapsed");
      bd.style.height = "auto";
      bd.addEventListener("transitionend", (ev)=>{
        if(ev.propertyName !== "height") return;
        if(section.classList.contains("collapsed")) return;
        bd.style.height = "auto";
      });
    }
    if(!toggle) return;
    toggle.addEventListener("click", ()=>{
      const willCollapse = !section.classList.contains("collapsed");
      setSectionCollapsed(section, willCollapse);
    });
  });
  nodes.forEach((node)=> ensureNodeI18n(node));
  ensureCanvasNameI18n();
  setTransform();
  syncResponsiveUi();
  window.addEventListener("resize", ()=>{
    syncResponsiveUi();
    if(nativeFlyout?.classList.contains("open")) positionNativeFlyout();
    positionToastBelowHeader();
  });
  setConnectMode(connectMode, true);
  btnGrid.classList.toggle("active", grid.style.display !== "none");
  btnFlow.classList.toggle("active", flowOn);
  refreshSettingsUI();
  setLanguage(currentLanguage, { silent:true, skipSnapshot:true, render:false });
  positionToastBelowHeader();
  render();

})();
