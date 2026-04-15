/* ══════════════════════════════════════════
   DATA LAYER
══════════════════════════════════════════ */
var DB = {
  KEY: 'nanum_quotes',
  load: function() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch(e) { return []; }
  },
  save: function(data) { localStorage.setItem(this.KEY, JSON.stringify(data)); },
  get: function(id) { return this.load().find(function(q){ return q.id === id; }); },
  create: function(q) {
    var list = this.load();
    q.id = Date.now().toString();
    q.createdAt = new Date().toISOString();
    list.unshift(q);
    this.save(list);
    return q;
  },
  update: function(id, q) {
    var list = this.load();
    var i = list.findIndex(function(x){ return x.id === id; });
    if (i >= 0) { list[i] = Object.assign({}, list[i], q); this.save(list); }
  },
  del: function(id) { this.save(this.load().filter(function(q){ return q.id !== id; })); }
};

/* ══════════════════════════════════════════
   SAMPLE DATA
══════════════════════════════════════════ */
function initSample() {
  if (DB.load().length > 0) return;
  DB.create({
    quoteNumber: '250715001',
    date: '2025-07-15',
    validPeriod: '견적일로부터 30일',
    delivery: '별도 협의',
    place: '지정장소',
    payment: '현금결제',
    recipient: '대구가톨릭대학교',
    supplierInfo: '사업자번호 873-81-01987 · 대표이사 윤종우',
    projectName: '대구가톨릭대학교 간호대학 홈페이지 개편 용역',
    projectNameEn: 'Website Renewal Project',
    contact: '담당자 윤종우',
    contactPhone: '010-2201-2324',
    contactEmail: 'yjw@nninc.co.kr',
    items: [
      { category:'main', name:'개요', spec:'제작기간 30일 · 투입인력 4명', qty:'1', supplyPrice:'18000000', quotePrice:'18000000', isOptional:false,
        detail:'투입인력 (4명)\n기획자 1명\n웹디자인 1명\n웹퍼블리셔 1명\n웹개발 1명\n\n개발환경\nRocky Linux\nApache2 + Tomcat\n전자정부표준프레임워크 4.x\nMariaDB' },
      { category:'main', name:'디자인 / 페이지', spec:'맞춤형 시안 2본 · W3C 웹표준', qty:'—', supplyPrice:'', quotePrice:'', isOptional:false,
        detail:'Main / Sub Design\n깔끔하고 세련된 이미지로 제작\n맞춤형 시안 제공 (2본)\n메인/서브 디자인 1본\n\nHTML 페이지\n웹표준(W3C) 준수 제작\nCSS 기반 레이아웃 구성\n크로스 브라우저 호환성 보강' },
      { category:'main', name:'관리기능개발 (NCMS v1.0)', spec:'GS인증 CMS · 보안관리', qty:'—', supplyPrice:'', quotePrice:'', isOptional:false,
        detail:'NCMS v1.0 제공\nGS(소프트웨어품질) 인증\n표준프레임워크 호환성 인증\n\n주요기능\n업무관리 : 시설예약관리\n회원관리 : 리스트, 생성, 권한관리\n부가기능 : 팝업/게시판 관리\n통계자료 : 방문자통계, 접속로그\n보안관리 : 접근/인젝션/세션 관리\n개인정보·비밀번호 DB 암호화' },
      { category:'main', name:'모바일 반응형 웹', spec:'반응형 신규 구축 · 데이터 연동', qty:'—', supplyPrice:'', quotePrice:'', isOptional:false,
        detail:'모바일 반응형웹 개발\n모바일 웹 신규 구축\nCSS 기반 레이아웃\n웹표준(W3C) 준수\nWeb 동일 화면구성\n홈페이지 데이터 연동' },
      { category:'addon', name:'유지관리', spec:'월 정기점검 · PMS · 24시간 관제', qty:'년', supplyPrice:'3600000', quotePrice:'', isOptional:true,
        detail:'유지관리서비스\n월 정기점검 : 관리자 모듈, 사용자 기능, 시스템 로그\n컨텐츠 관리 : 팝업/배너, 웹페이지 추가/수정\n사용자 프로그램 수정·변경 (기능추가 별도 견적)\n홈페이지 취약점 점검 리포트 조치\nApache + Tomcat 연동 관리\n관제서비스 24시간 이상 유무 체크 (실시간 문자전송)\nPMS 시스템 적용' },
      { category:'addon', name:'웹호스팅', spec:'1G~10G · Xeon E5-2620', qty:'년', supplyPrice:'480000', quotePrice:'', isOptional:true,
        detail:'서버호스팅\n기간 : 계약일로부터 1년\n1G : 월 15,000 × 12개월\n3G : 월 30,000 × 12개월\n5G : 월 40,000 × 12개월\n10G : 월 60,000 × 12개월\n\n서버사양\nIntel Xeon Hexa-Core E5-2620\nDDR3 8G ECC-REG × 2\n4BAY / 1U, Traffic 10Mbps\n1Gbps Dedicated Line' },
      { category:'addon', name:'서버호스팅 (단독서버)', spec:'Xeon E3-1230v5 · SSD+NVMe', qty:'년', supplyPrice:'4800000', quotePrice:'', isOptional:true,
        detail:'임대기간\n기간 : 계약일로부터 1년\n비용 : 월 400,000 × 12개월\n\n서버사양\nIntel Xeon Quad-Core E3-1230v5 / E-2224\nDDR4 U-ECC 16GB (최대 64GB)\nSSD 240GB + NVMe 400GB + SATA 1TB\n4BAY / 1U, 1Gbps Dedicated Line' },
      { category:'addon', name:'보안인증서', spec:"Let's Encrypt · 128~256bit", qty:'년', supplyPrice:'70000', quotePrice:'', isOptional:true,
        detail:"인증서 (Let's Encrypt)\n기간 : 1년 (매년 재인증)\n도메인 : www.yourdomain.com\n암호화 강도 : 128~256 bit\n브라우저 호환성 : 99.9%\n발급 : 즉시 (자동화 API)\n인증절차 : HTTP 또는 DNS" },
      { category:'addon', name:'방화벽 / 웹방화벽', spec:'SK 인포섹 · 딥파인더 WAF', qty:'년', supplyPrice:'1200000', quotePrice:'1200000', isOptional:false,
        detail:'방화벽\n사용기간 : 계약일로부터 1년\nSK 인포섹 방화벽 (Firewall)\n24시간 365일 실시간 보안 관제\n\n웹방화벽\n설치형 웹방화벽 (딥파인더)\nOWASP Top 취약점 차단\nPCI DSS 6.6 요구사항 충족\nSSL 환경 성능저하 없음\n통합 보안 관제 원격 지원\n웹방화벽 공급가 : 별도협의' }
    ]
  });
}

/* ══════════════════════════════════════════
   UTILS
══════════════════════════════════════════ */
function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function fmtP(val) {
  if (!val || !val.toString().trim()) return '—';
  var n = parseInt(val.toString().replace(/[^0-9]/g,''));
  return isNaN(n) ? String(val) : n.toLocaleString();
}
function calcSum(items) {
  return (items || []).reduce(function(s, it) {
    if (it.isOptional) return s;
    var n = parseInt((it.quotePrice || '').replace(/[^0-9]/g,''));
    return s + (isNaN(n) ? 0 : n);
  }, 0);
}
function fmtDate(d) {
  if (!d) return '';
  var p = d.split('-');
  return p[0] + '. ' + p[1] + '. ' + p[2];
}
function genQNum() {
  var now = new Date();
  var y = String(now.getFullYear()).slice(2);
  var m = String(now.getMonth()+1).padStart(2,'0');
  var d = String(now.getDate()).padStart(2,'0');
  var seq = String(DB.load().length + 1).padStart(3,'0');
  return y + m + d + seq;
}
function parseDetail(text) {
  if (!text || !text.trim()) return [];
  return text.split(/\n[ \t]*\n/).map(function(block) {
    var lines = block.trim().split('\n').filter(function(l){ return l.trim(); });
    if (!lines.length) return null;
    if (lines.length === 1) return { title:'', items: lines };
    return { title: lines[0], items: lines.slice(1) };
  }).filter(Boolean);
}

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
var state = { view: 'list', id: null };
var formItems = [];
var listFilter = { keyword:'', category:'', dateFrom:'', dateTo:'', amtFrom:'', amtTo:'' };

function applyFilter(quotes) {
  var kw = listFilter.keyword.toLowerCase().trim();
  var cat = listFilter.category;
  var df = listFilter.dateFrom;
  var dt = listFilter.dateTo;
  var af = parseInt(listFilter.amtFrom.replace(/[^0-9]/g,'')) || 0;
  var at = parseInt(listFilter.amtTo.replace(/[^0-9]/g,'')) || 0;
  return quotes.filter(function(q) {
    if (kw) {
      var hay = [(q.quoteNumber||''), (q.recipient||''), (q.projectName||''), (q.contact||'')].join(' ').toLowerCase();
      if (hay.indexOf(kw) === -1) return false;
    }
    if (cat) {
      var hascat = (q.items||[]).some(function(it){ return it.category === cat; });
      if (!hascat) return false;
    }
    if (df && q.date && q.date < df) return false;
    if (dt && q.date && q.date > dt) return false;
    if (af || at) {
      var sum = calcSum(q.items);
      var total = sum + Math.round(sum * 0.1);
      if (af && total < af) return false;
      if (at && total > at) return false;
    }
    return true;
  });
}

function filterRows() {
  listFilter.keyword  = (document.getElementById('s-kw') || {}).value || '';
  listFilter.category = (document.getElementById('s-cat') || {}).value || '';
  listFilter.dateFrom = (document.getElementById('s-df') || {}).value || '';
  listFilter.dateTo   = (document.getElementById('s-dt') || {}).value || '';
  listFilter.amtFrom  = (document.getElementById('s-af') || {}).value || '';
  listFilter.amtTo    = (document.getElementById('s-at') || {}).value || '';
  var quotes = DB.load();
  var filtered = applyFilter(quotes);
  var tbody = document.getElementById('list-tbody');
  if (tbody) tbody.innerHTML = renderListRows(filtered);
  var cnt = document.getElementById('list-count');
  if (cnt) {
    cnt.innerHTML = filtered.length !== quotes.length
      ? '<strong>' + filtered.length + '건</strong> 검색됨 / 전체 ' + quotes.length + '건'
      : '전체 <strong>' + quotes.length + '</strong>건';
  }
}

function navigate(view, id) {
  state.view = view;
  state.id = id || null;
  render();
  window.scrollTo(0, 0);
}

/* ══════════════════════════════════════════
   RENDER
══════════════════════════════════════════ */
function render() {
  var app = document.getElementById('app');
  if (state.view === 'list')   app.innerHTML = renderList();
  else if (state.view === 'form')   app.innerHTML = renderForm(state.id);
  else if (state.view === 'detail') app.innerHTML = renderDetail(state.id);
  bindEvents();
}

/* ── LIST ── */
function renderListRows(quotes) {
  if (!quotes.length) return '<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📄</div><div class="empty-text">검색 결과가 없습니다</div><div class="empty-sub">검색 조건을 변경해보세요</div></div></td></tr>';
  return quotes.map(function(q) {
    var sum = calcSum(q.items);
    var vat = Math.round(sum * 0.1);
    var total = sum + vat;
    return '<tr class="list-row" data-action="detail" data-id="' + q.id + '" tabindex="0" role="row" aria-label="' + esc(q.projectName) + ' 상세보기">' +
      '<td class="td-num" title="' + esc(q.quoteNumber) + '">' + esc(q.quoteNumber) + '</td>' +
      '<td class="td-project" title="' + esc(q.projectName) + '">' + esc(q.projectName) + '</td>' +
      '<td class="td-recv" title="' + esc(q.recipient) + ' 귀하">' + esc(q.recipient) + ' 귀하</td>' +
      '<td class="td-date">' + fmtDate(q.date) + '</td>' +
      '<td class="td-amount">' + (total ? total.toLocaleString() + ' 원' : '—') + '</td>' +
      '<td class="td-actions" onclick="event.stopPropagation()">' +
        '<button class="btn btn-ghost btn-sm" data-action="edit" data-id="' + q.id + '" aria-label="' + esc(q.recipient) + ' 견적서 수정">수정</button>' +
        '<button class="btn btn-danger btn-sm" data-action="del" data-id="' + q.id + '" aria-label="' + esc(q.recipient) + ' 견적서 삭제">삭제</button>' +
      '</td></tr>';
  }).join('');
}

function renderList() {
  var quotes = DB.load();
  var filtered = applyFilter(quotes);
  var countText = filtered.length !== quotes.length
    ? '<strong>' + filtered.length + '건</strong> 검색됨 / 전체 ' + quotes.length + '건'
    : '전체 <strong>' + quotes.length + '</strong>건';

  return '<div class="view-hd">' +
    '<div class="view-hd-left"><h1 class="view-title">견적서 목록</h1></div>' +
    '<div class="hd-actions"><button class="btn btn-primary" data-action="new">+ 새 견적서</button></div>' +
    '</div>' +

    '<section class="search-panel" role="search" aria-label="견적서 상세검색">' +
    '<h2 class="search-panel-title">상세검색</h2>' +

    '<div class="search-row1">' +
      '<div class="search-group"><label class="search-label" for="s-kw">키워드</label>' +
        '<input class="search-input" id="s-kw" type="search" placeholder="견적번호 · 프로젝트명 · 수신처 · 담당자" value="' + esc(listFilter.keyword) + '" aria-label="통합 키워드 검색"></div>' +
      '<div class="search-group"><label class="search-label" for="s-cat">항목 구분</label>' +
        '<select class="search-select" id="s-cat">' +
          '<option value="">전체</option>' +
          '<option value="main"' + (listFilter.category==='main'?' selected':'') + '>제작 포함</option>' +
          '<option value="addon"' + (listFilter.category==='addon'?' selected':'') + '>부가 포함</option>' +
        '</select></div>' +
    '</div>' +

    '<div class="search-row2">' +
      '<fieldset style="border:none;padding:0;margin:0"><legend class="search-label">견적일자</legend>' +
        '<div class="search-range">' +
          '<label class="sr-only" for="s-df">시작일</label>' +
          '<input class="search-input" id="s-df" type="date" value="' + esc(listFilter.dateFrom) + '" aria-label="견적일자 시작일">' +
          '<span class="search-range-sep" aria-hidden="true">~</span>' +
          '<label class="sr-only" for="s-dt">종료일</label>' +
          '<input class="search-input" id="s-dt" type="date" value="' + esc(listFilter.dateTo) + '" aria-label="견적일자 종료일">' +
        '</div></fieldset>' +
      '<fieldset style="border:none;padding:0;margin:0"><legend class="search-label">견적금액 (VAT포함)</legend>' +
        '<div class="search-range">' +
          '<label class="sr-only" for="s-af">최솟값</label>' +
          '<input class="search-input" id="s-af" type="number" placeholder="최솟값" value="' + esc(listFilter.amtFrom) + '" aria-label="견적금액 최솟값">' +
          '<span class="search-range-sep" aria-hidden="true">~</span>' +
          '<label class="sr-only" for="s-at">최댓값</label>' +
          '<input class="search-input" id="s-at" type="number" placeholder="최댓값" value="' + esc(listFilter.amtTo) + '" aria-label="견적금액 최댓값">' +
        '</div></fieldset>' +
      '<div class="search-btns">' +
        '<button class="btn btn-primary btn-sm" data-action="dosearch" aria-label="검색 실행">검색</button>' +
        '<button class="btn btn-secondary btn-sm" data-action="resetsearch" aria-label="검색 조건 초기화">초기화</button>' +
      '</div>' +
    '</div>' +

    '<div class="search-count" id="list-count" aria-live="polite" aria-atomic="true">' + countText + '</div>' +
    '</section>' +

    '<div class="list-card"><table class="list-table" aria-label="견적서 목록">' +
    '<caption class="sr-only">견적서 목록 — 견적번호, 프로젝트명, 수신처, 견적일자, 견적금액, 관리</caption>' +
    '<colgroup><col class="col-num"><col class="col-proj"><col class="col-recv"><col class="col-date"><col class="col-amt"><col class="col-act"></colgroup>' +
    '<thead><tr>' +
    '<th scope="col">견적번호</th><th scope="col">프로젝트명</th><th scope="col">수신처</th>' +
    '<th scope="col">견적일자</th><th scope="col" class="r">견적금액</th><th scope="col" class="r">관리</th>' +
    '</tr></thead><tbody id="list-tbody">' + renderListRows(filtered) + '</tbody></table></div>';
}

/* ── FORM ── */
function renderForm(id) {
  var q = id ? DB.get(id) : null;
  if (q) {
    formItems = JSON.parse(JSON.stringify(q.items || []));
  } else if (!id || formItems.length === 0) {
    formItems = [newItem()];
  }
  var title = q ? '견적서 수정' : '새 견적서 등록';
  var today = new Date().toISOString().slice(0,10);

  return '<div class="view-hd">' +
    '<div class="view-hd-left"><h1 class="view-title">' + title + '</h1></div>' +
    '<div class="hd-actions"><button class="btn btn-ghost" data-action="list" aria-label="작성 취소하고 목록으로 이동">취소</button></div>' +
    '</div>' +
    '<div class="form-body">' +

    /* 기본정보 */
    '<div class="form-card"><div class="form-card-title">기본 정보</div>' +
    '<div class="form-grid">' +
    fg('견적번호', '<input class="form-input" id="f-qnum" type="text" value="' + esc(q ? q.quoteNumber : genQNum()) + '">') +
    fg('견적일자', '<input class="form-input" id="f-date" type="date" value="' + esc(q ? q.date : today) + '">') +
    fg('수신처 <span aria-hidden="true" style="color:var(--red)">*</span>', '<input class="form-input" id="f-recipient" type="text" placeholder="회사/기관명" value="' + esc(q ? q.recipient : '') + '" required aria-required="true">') +
    fg('공급자 정보', '<input class="form-input" id="f-sinfo" type="text" placeholder="사업자번호 · 대표이사명" value="' + esc(q ? q.supplierInfo : '사업자번호 873-81-01987 · 대표이사 윤종우') + '">') +
    '</div></div>' +

    /* 프로젝트 */
    '<div class="form-card"><div class="form-card-title">프로젝트</div>' +
    '<div class="form-grid">' +
    fg('프로젝트명 국문 <span aria-hidden="true" style="color:var(--red)">*</span>', '<input class="form-input" id="f-pname" type="text" placeholder="홈페이지 개편 용역" value="' + esc(q ? q.projectName : '') + '" required aria-required="true">', true) +
    fg('프로젝트명 (영문)', '<input class="form-input" id="f-pnameen" type="text" placeholder="Website Renewal Project" value="' + esc(q ? q.projectNameEn : '') + '">', true) +
    '</div></div>' +

    /* 조건 */
    '<div class="form-card"><div class="form-card-title">견적 조건</div>' +
    '<div class="form-grid-3">' +
    fg('유효기간', '<input class="form-input" id="f-valid" type="text" value="' + esc(q ? q.validPeriod : '견적일로부터 30일') + '">') +
    fg('납기예상', '<input class="form-input" id="f-delivery" type="text" value="' + esc(q ? q.delivery : '별도 협의') + '">') +
    fg('납품장소', '<input class="form-input" id="f-place" type="text" value="' + esc(q ? q.place : '지정장소') + '">') +
    fg('지불조건', '<input class="form-input" id="f-payment" type="text" value="' + esc(q ? q.payment : '현금결제') + '">') +
    fg('담당자', '<input class="form-input" id="f-contact" type="text" value="' + esc(q ? q.contact : '담당자 윤종우') + '">') +
    fg('연락처', '<input class="form-input" id="f-cphone" type="text" value="' + esc(q ? q.contactPhone : '010-2201-2324') + '">') +
    fg('이메일', '<input class="form-input" id="f-cemail" type="text" value="' + esc(q ? q.contactEmail : 'yjw@nninc.co.kr') + '">') +
    '</div></div>' +

    /* 항목 */
    '<div class="form-card"><div class="form-card-title">견적 항목</div>' +
    '<div id="form-items">' + renderItemCards() + '</div>' +
    '<button class="btn btn-secondary" style="margin-top:4px" data-action="additem">+ 항목 추가</button>' +
    '</div>' +

    /* 저장 */
    '<div class="form-actions">' +
    '<button class="btn btn-ghost" data-action="list">취소</button>' +
    '<button class="btn btn-primary" data-action="save" data-id="' + (id || '') + '">저장</button>' +
    '</div>' +
    '</div>';
}

function fg(label, input, full) {
  var m = input.match(/id="([^"]+)"/);
  var forAttr = m ? ' for="' + m[1] + '"' : '';
  return '<div class="form-group' + (full ? ' full' : '') + '"><label class="form-label"' + forAttr + '>' + label + '</label>' + input + '</div>';
}

function newItem() {
  return { category:'main', name:'', spec:'', qty:'1', supplyPrice:'', quotePrice:'', isOptional:false, detail:'' };
}

function renderItemCards() {
  return formItems.map(function(item, i) {
    var catId = 'fi-ic-' + i;
    var optId = 'fi-iopt-' + i;
    var detId = 'fi-idet-' + i;
    return '<div class="item-card" data-idx="' + i + '" role="group" aria-label="항목 ' + (i+1) + '">' +
      '<div class="item-card-hd">' +
        '<span class="item-card-num" aria-hidden="true">#' + (i+1) + '</span>' +
        '<label class="form-label" for="' + catId + '" style="margin:0">구분</label>' +
        '<select class="form-select" id="' + catId + '" style="width:90px" name="ic" data-idx="' + i + '" aria-label="항목 ' + (i+1) + ' 구분">' +
          '<option value="main"' + (item.category==='main'?' selected':'') + '>제작</option>' +
          '<option value="addon"' + (item.category==='addon'?' selected':'') + '>부가</option>' +
        '</select>' +
        '<span class="spacer"></span>' +
        (formItems.length > 1 ? '<button class="btn btn-danger btn-sm" data-action="rmitem" data-idx="' + i + '" aria-label="항목 ' + (i+1) + ' 삭제">삭제</button>' : '') +
      '</div>' +
      '<div class="item-row1">' +
        fgi('항목명', 'in', i, item.name, 'text', '항목명') +
        fgi('세부규격', 'is', i, item.spec, 'text', '규격 설명') +
      '</div>' +
      '<div class="item-row2">' +
        fgi('수량', 'iq', i, item.qty, 'text', '1') +
        fgi('공급가', 'isp', i, item.supplyPrice, 'text', '숫자 입력') +
        fgi('견적단가', 'iqp', i, item.quotePrice, 'text', '숫자 (선택사항 제외)') +
        '<div class="form-group"><label class="form-label" for="' + optId + '">&nbsp;</label>' +
          '<label class="check-label"><input type="checkbox" id="' + optId + '" name="iopt" data-idx="' + i + '"' + (item.isOptional?' checked':'') + '> 선택사항</label>' +
        '</div>' +
      '</div>' +
      '<button class="detail-toggle-btn" data-action="toggledet" data-idx="' + i + '" aria-expanded="false" aria-controls="da-' + i + '">▸ 상세내용</button>' +
      '<div class="detail-area" id="da-' + i + '" role="region" aria-label="항목 ' + (i+1) + ' 상세내용">' +
        '<label class="form-label" for="' + detId + '" style="margin-bottom:4px;display:block">상세내용 (빈 줄로 블록 구분, 첫 줄이 블록 제목)</label>' +
        '<textarea class="form-textarea" id="' + detId + '" name="idet" data-idx="' + i + '" rows="5" placeholder="블록 제목&#10;항목1&#10;항목2&#10;&#10;다음 블록 제목&#10;항목1">' + esc(item.detail) + '</textarea>' +
      '</div>' +
    '</div>';
  }).join('');
}

function fgi(label, name, idx, val, type, ph) {
  var id = 'fi-' + name + '-' + idx;
  return '<div class="form-group"><label class="form-label" for="' + id + '">' + label + '</label>' +
    '<input class="form-input" id="' + id + '" type="' + type + '" name="' + name + '" data-idx="' + idx + '" value="' + esc(val) + '" placeholder="' + esc(ph) + '"></div>';
}

/* ── DETAIL ── */
function renderDetail(id) {
  var q = DB.get(id);
  if (!q) return '<p style="padding:40px;color:var(--text-muted)">견적서를 찾을 수 없습니다.</p>';

  var sum = calcSum(q.items);
  var vat = Math.round(sum * 0.1);
  var total = sum + vat;

  var itemRows = (q.items || []).map(function(item, i) {
    var spHtml = item.supplyPrice ? fmtP(item.supplyPrice) : '—';
    var qpHtml = item.isOptional ? '<span class="opt-badge">선택사항</span>' : (item.quotePrice ? fmtP(item.quotePrice) : '—');
    var qpClass = item.isOptional ? '' : ' class="item-price"';
    var hasDetail = item.detail && item.detail.trim();
    var blocks = hasDetail ? parseDetail(item.detail) : [];
    var detailHtml = blocks.length ? '<div class="detail-inner"><div class="detail-grid">' +
      blocks.map(function(b) {
        return '<div>' +
          (b.title ? '<div class="detail-block-title">' + esc(b.title) + '</div>' : '') +
          '<ul class="detail-list">' + b.items.map(function(li){ return '<li>' + esc(li) + '</li>'; }).join('') + '</ul>' +
        '</div>';
      }).join('') + '</div></div>' : '';

    return '<tr class="item-row"' + (hasDetail ? ' data-detail="dp-'+i+'" aria-expanded="false" aria-controls="dp-'+i+'" tabindex="0" role="button" aria-label="' + esc(item.name) + ' 상세내용 펼치기"' : '') + '>' +
      '<td><span class="cat-badge ' + item.category + '">' + (item.category==='main'?'제작':'부가') + '</span></td>' +
      '<td><span class="item-name">' + esc(item.name) + (hasDetail ? '<span class="expand-hint" aria-hidden="true">↓</span>' : '') + '</span></td>' +
      '<td class="item-spec">' + esc(item.spec) + '</td>' +
      '<td class="item-qty">' + esc(item.qty || '—') + '</td>' +
      '<td class="item-price">' + spHtml + '</td>' +
      '<td' + qpClass + '>' + qpHtml + '</td>' +
    '</tr>' +
    (hasDetail ? '<tr class="detail-panel" id="dp-' + i + '"><td colspan="6">' + detailHtml + '</td></tr>' : '');
  }).join('');

  return '<div class="detail-actions">' +
    '<button class="btn btn-secondary" data-action="list" aria-label="견적서 목록으로 돌아가기">← 목록</button>' +
    '<span class="spacer"></span>' +
    '<button class="btn btn-ghost" data-action="edit" data-id="' + q.id + '" aria-label="' + esc(q.recipient) + ' 견적서 수정">수정</button>' +
    '<button class="btn btn-danger" data-action="del" data-id="' + q.id + '" aria-label="' + esc(q.recipient) + ' 견적서 삭제">삭제</button>' +
  '</div>' +

  '<div class="page">' +
  '<div class="topbar">' +
    '<div class="topbar-left"><div class="company">나눔아이앤씨</div><div class="tagline">Nanum I&amp;C Co., Ltd.</div></div>' +
    '<div class="topbar-right">[서울] 용산구 원효로 3가 46-1 원효빌딩 7층<br>[대구] 중구 달구벌 대로 440길 14<br>1544-9642 · yjw@nninc.co.kr</div>' +
  '</div>' +

  '<div class="hero">' +
    '<div class="hero-label" aria-hidden="true">Quotation</div>' +
    '<h1 class="hero-title">견 적 서</h1>' +
    '<p class="hero-number"><span class="sr-only">견적번호 </span>' + esc(q.quoteNumber) + '</p>' +
    '<div class="hero-divider" aria-hidden="true"></div>' +
  '</div>' +

  '<div class="info-grid">' +
    '<div class="info-card"><div class="card-label">수신</div><div class="card-value">' + esc(q.recipient) + ' 귀하<small>아래와 같이 견적 합니다</small></div></div>' +
    '<div class="info-card"><div class="card-label">공급자</div><div class="card-value">(주)나눔아이앤씨<small>' + esc(q.supplierInfo) + '</small></div></div>' +
    '<div class="info-card highlight"><div class="card-label">견적금액 (VAT 포함)</div><div class="card-value"><span id="animatedAmount" data-amount="' + total + '">0</span><span class="unit">원</span></div></div>' +
  '</div>' +

  '<div class="conditions">' +
    '<div class="cond-item"><div class="cond-label">견적일자</div><div class="cond-value">' + fmtDate(q.date) + '</div></div>' +
    '<div class="cond-item"><div class="cond-label">유효기간</div><div class="cond-value">' + esc(q.validPeriod) + '</div></div>' +
    '<div class="cond-item"><div class="cond-label">납기예상</div><div class="cond-value">' + esc(q.delivery) + '</div></div>' +
    '<div class="cond-item"><div class="cond-label">납품장소</div><div class="cond-value">' + esc(q.place) + '</div></div>' +
    '<div class="cond-item"><div class="cond-label">지불조건</div><div class="cond-value">' + esc(q.payment) + '</div></div>' +
  '</div>' +

  '<div class="project-badge">' +
    '<div class="badge-icon" aria-hidden="true">★</div>' +
    '<div><div class="badge-text">' + esc(q.projectName) + '</div><div class="badge-sub">' + esc(q.projectNameEn) + '</div></div>' +
  '</div>' +

  '<div class="items-section"><table class="items-table" aria-label="견적 항목 목록">' +
    '<caption class="sr-only">견적 항목 — 구분, 항목명, 세부규격, 수량, 공급가, 견적단가</caption>' +
    '<thead><tr>' +
    '<th scope="col" style="width:70px">구분</th><th scope="col">항목</th><th scope="col" style="width:240px">세부규격</th>' +
    '<th scope="col" style="width:55px">수량</th><th scope="col" style="width:120px">공급가</th><th scope="col" style="width:120px">견적단가</th>' +
  '</tr></thead><tbody>' + itemRows + '</tbody></table></div>' +

  '<div class="summary-section"><div class="summary-box">' +
    '<div class="summary-row"><span class="s-label">최종금액</span><span class="s-value">' + (sum ? sum.toLocaleString() : '—') + '</span></div>' +
    '<div class="summary-row"><span class="s-label">부가세 (VAT 10%)</span><span class="s-value">' + (vat ? vat.toLocaleString() : '—') + '</span></div>' +
    '<div class="summary-row total"><span class="s-label">합계금액 (VAT 포함)</span><span class="s-value">' + (total ? total.toLocaleString() : '—') + '<span class="unit"> 원</span></span></div>' +
  '</div></div>' +

  '<div class="doc-footer">' +
    '<div class="footer-contact"><strong>' + esc(q.contact) + '</strong> &nbsp;·&nbsp; ' + esc(q.contactPhone) + ' &nbsp;·&nbsp; ' + esc(q.contactEmail) + '</div>' +
    '<div class="footer-copy">&copy; 나눔아이앤씨 Nanum I&amp;C</div>' +
  '</div>' +
  '</div>';
}

/* ══════════════════════════════════════════
   SYNC FORM ITEMS FROM DOM
══════════════════════════════════════════ */
function syncItems() {
  formItems.forEach(function(item, i) {
    var nameEl = document.querySelector('[name="in"][data-idx="' + i + '"]');
    if (!nameEl) return;
    item.category = (document.querySelector('.item-card[data-idx="' + i + '"] [name="ic"]') || {}).value || item.category;
    item.name = nameEl.value;
    item.spec = (document.querySelector('[name="is"][data-idx="' + i + '"]') || {}).value || '';
    item.qty = (document.querySelector('[name="iq"][data-idx="' + i + '"]') || {}).value || '';
    item.supplyPrice = (document.querySelector('[name="isp"][data-idx="' + i + '"]') || {}).value || '';
    item.quotePrice = (document.querySelector('[name="iqp"][data-idx="' + i + '"]') || {}).value || '';
    item.isOptional = !!(document.querySelector('[name="iopt"][data-idx="' + i + '"]') || {}).checked;
    item.detail = (document.querySelector('[name="idet"][data-idx="' + i + '"]') || {}).value || '';
  });
}

function refreshItems() {
  var el = document.getElementById('form-items');
  if (el) el.innerHTML = renderItemCards();
}

/* ══════════════════════════════════════════
   SAVE FORM
══════════════════════════════════════════ */
function saveForm(editId) {
  syncItems();
  var data = {
    quoteNumber: (document.getElementById('f-qnum') || {}).value || '',
    date: (document.getElementById('f-date') || {}).value || '',
    recipient: (document.getElementById('f-recipient') || {}).value || '',
    supplierInfo: (document.getElementById('f-sinfo') || {}).value || '',
    projectName: (document.getElementById('f-pname') || {}).value || '',
    projectNameEn: (document.getElementById('f-pnameen') || {}).value || '',
    validPeriod: (document.getElementById('f-valid') || {}).value || '',
    delivery: (document.getElementById('f-delivery') || {}).value || '',
    place: (document.getElementById('f-place') || {}).value || '',
    payment: (document.getElementById('f-payment') || {}).value || '',
    contact: (document.getElementById('f-contact') || {}).value || '',
    contactPhone: (document.getElementById('f-cphone') || {}).value || '',
    contactEmail: (document.getElementById('f-cemail') || {}).value || '',
    items: JSON.parse(JSON.stringify(formItems))
  };
  if (!data.recipient.trim()) { alert('수신처를 입력해주세요.'); return; }
  if (!data.projectName.trim()) { alert('프로젝트명을 입력해주세요.'); return; }

  if (editId) {
    DB.update(editId, data);
    navigate('detail', editId);
  } else {
    var q = DB.create(data);
    navigate('detail', q.id);
  }
}

/* ══════════════════════════════════════════
   EVENTS
══════════════════════════════════════════ */
function bindEvents() {
  var app = document.getElementById('app');
  if (!app) return;

  app.addEventListener('click', function(e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.dataset.action;
    var id = el.dataset.id;
    var idx = el.dataset.idx !== undefined ? parseInt(el.dataset.idx) : -1;

    if (action === 'list') { formItems = []; navigate('list'); }
    else if (action === 'new') { formItems = [newItem()]; navigate('form', null); }
    else if (action === 'detail') { if (e.target.closest('.td-actions')) return; navigate('detail', id); }
    else if (action === 'edit') { formItems = []; navigate('form', id); }
    else if (action === 'del') {
      if (confirm('이 견적서를 삭제하시겠습니까?')) { DB.del(id); navigate('list'); }
    }
    else if (action === 'save') { saveForm(id || null); }
    else if (action === 'additem') {
      syncItems();
      formItems.push(newItem());
      refreshItems();
    }
    else if (action === 'rmitem') {
      syncItems();
      formItems.splice(idx, 1);
      refreshItems();
    }
    else if (action === 'dosearch') { filterRows(); }
    else if (action === 'resetsearch') {
      listFilter = { keyword:'', category:'', dateFrom:'', dateTo:'', amtFrom:'', amtTo:'' };
      ['s-kw','s-cat','s-df','s-dt','s-af','s-at'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
      filterRows();
    }
    else if (action === 'toggledet') {
      var da = document.getElementById('da-' + idx);
      if (da) {
        da.classList.toggle('open');
        el.textContent = da.classList.contains('open') ? '▾ 상세내용' : '▸ 상세내용';
      }
    }
  });

  /* detail accordion */
  function toggleAccordion(row) {
    var panel = document.getElementById(row.dataset.detail);
    if (!panel) return;
    var isActive = panel.classList.contains('active');
    app.querySelectorAll('.detail-panel.active').forEach(function(p){ p.classList.remove('active'); });
    app.querySelectorAll('tr.item-row[data-detail]').forEach(function(r){
      r.style.background='';
      r.setAttribute('aria-expanded','false');
    });
    if (!isActive) {
      panel.classList.add('active');
      row.style.background='var(--surface-2)';
      row.setAttribute('aria-expanded','true');
    }
  }
  app.querySelectorAll('tr.item-row[data-detail]').forEach(function(row) {
    row.addEventListener('click', function(){ toggleAccordion(this); });
    row.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAccordion(this); }
    });
  });

  /* form detail toggle aria-expanded */
  app.querySelectorAll('[data-action="toggledet"]').forEach(function(btn) {
    btn.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
    });
  });

  /* number animation */
  var amt = document.getElementById('animatedAmount');
  if (amt) {
    var target = parseInt(amt.dataset.amount) || 0;
    var t0 = performance.now();
    (function tick(now) {
      var p = Math.min((now - t0) / 1200, 1);
      amt.textContent = Math.floor(target * (1 - Math.pow(1-p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else amt.textContent = target.toLocaleString();
    })(t0);
  }

  /* list row keyboard */
  app.querySelectorAll('.list-row').forEach(function(row) {
    row.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('detail', this.dataset.id); }
    });
  });

  /* search realtime */
  var skw = document.getElementById('s-kw');
  if (skw) skw.addEventListener('input', function() { filterRows(); });
  var scat = document.getElementById('s-cat');
  if (scat) scat.addEventListener('change', function() { filterRows(); });

  /* nav brand */
  var brand = document.querySelector('.nav-brand');
  if (brand) brand.addEventListener('click', function(){ formItems=[]; navigate('list'); });
}

/* ══════════════════════════════════════════
   DARK MODE
══════════════════════════════════════════ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var label = document.getElementById('toggle-label');
  var icon  = document.getElementById('toggle-icon');
  if (label) label.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
  if (icon)  icon.textContent  = theme === 'dark' ? '◑' : '◐';
}

function toggleDark() {
  var current = document.documentElement.getAttribute('data-theme');
  var next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('nanum_theme', next); } catch(e) {}
}

(function initTheme() {
  var saved;
  try { saved = localStorage.getItem('nanum_theme'); } catch(e) {}
  var preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (preferDark ? 'dark' : 'light');
  applyTheme(theme);
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      try { if (!localStorage.getItem('nanum_theme')) applyTheme(e.matches ? 'dark' : 'light'); } catch(ex) { applyTheme(e.matches ? 'dark' : 'light'); }
    });
  }
})();

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
// 기존 데이터 마이그레이션: "NANUM I&C — XXXXXXXXX" → "XXXXXXXXX"
(function migrateQNum() {
  var list = DB.load();
  var changed = false;
  list.forEach(function(q) {
    var m = (q.quoteNumber || '').match(/—\s*(\S+)\s*$/);
    if (m) { q.quoteNumber = m[1]; changed = true; }
  });
  if (changed) DB.save(list);
})();

initSample();
render();
