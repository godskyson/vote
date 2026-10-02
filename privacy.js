// 개인정보 처리방침: 화면 오른쪽 아래 작은 버튼 + 팝업
// 학교명·보호책임자 정보는 아래 값만 고치면 된다.
const PRIVACY = {
  org: '[학교명]',
  officerName: '[성명]',
  officerRole: '정보 교사 (서비스 운영 담당)',
  officerContact: '[연락처 또는 이메일]',
  effective: '2026년 10월 2일',
};

(() => {
  const P = PRIVACY;
  const css = `
  .pv-open {
    position: fixed; right: 10px; bottom: 6px; z-index: 50;
    font: 11px/1.4 'Gowun Dodum', 'Malgun Gothic', sans-serif;
    color: rgba(241, 239, 228, .45); background: transparent; border: 0;
    padding: 4px 6px; cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
  }
  .pv-open:hover, .pv-open:focus-visible { color: rgba(241, 239, 228, .9); }
  .pv-dialog {
    width: min(760px, calc(100vw - 32px)); max-height: min(86vh, 900px);
    padding: 0; border: 0; border-radius: 16px;
    background: #f1efe4; color: #1d2a24;
    box-shadow: 0 30px 80px rgba(0, 0, 0, .45);
    font-family: 'Gowun Dodum', 'Malgun Gothic', sans-serif;
  }
  .pv-dialog::backdrop { background: rgba(10, 20, 16, .7); }
  .pv-dialog[open] { display: flex; flex-direction: column; animation: pv-in .25s ease-out; }
  @keyframes pv-in { from { opacity: 0; transform: translateY(14px); } }
  .pv-head {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 18px 22px; border-bottom: 1px solid rgba(29, 42, 36, .15);
  }
  .pv-head h2 { margin: 0; font: 400 26px/1.2 'Do Hyeon', 'Malgun Gothic', sans-serif; }
  .pv-close {
    font: inherit; font-size: 15px; color: #1d2a24; background: rgba(29, 42, 36, .08);
    border: 0; border-radius: 8px; padding: 8px 14px; cursor: pointer;
  }
  .pv-close:hover { background: rgba(29, 42, 36, .16); }
  .pv-body { overflow-y: auto; padding: 8px 22px 26px; font-size: 15px; line-height: 1.75; }
  .pv-body h3 { font: 400 19px/1.3 'Do Hyeon', 'Malgun Gothic', sans-serif; margin: 24px 0 6px; }
  .pv-body p { margin: 6px 0; }
  .pv-body ul, .pv-body ol { margin: 6px 0; padding-left: 1.3em; }
  .pv-body li { margin: 3px 0; }
  .pv-body table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 14px; }
  .pv-body th, .pv-body td { border: 1px solid rgba(29, 42, 36, .25); padding: 7px 9px; text-align: left; vertical-align: top; }
  .pv-body th { background: rgba(29, 42, 36, .07); font-weight: 400; white-space: nowrap; }
  .pv-body .pv-lead { background: rgba(47, 143, 196, .1); border-radius: 10px; padding: 12px 14px; margin-top: 14px; }
  .pv-body .pv-date { color: #4c5c54; margin-top: 26px; }
  .pv-close:focus-visible, .pv-open:focus-visible { outline: 2px solid #f5d76e; outline-offset: 2px; }
  @media (max-width: 560px) { .pv-body table, .pv-body tbody, .pv-body tr, .pv-body th, .pv-body td { display: block; } .pv-body th { border-bottom: 0; } }
  `;

  const html = `
  <div class="pv-head">
    <h2 id="pvTitle">개인정보 처리방침</h2>
    <button class="pv-close" type="button" autofocus>닫기</button>
  </div>
  <div class="pv-body">
    <p class="pv-lead">이 서비스는 <b>이름, 학번, 연락처 등 개인을 알아볼 수 있는 정보를 수집하지 않습니다.</b>
    투표할 때는 찬성·반대 선택과 기기마다 무작위로 만든 식별값만 저장되며, 교사도 누가 무엇에 투표했는지 알 수 없습니다.</p>

    <p>${P.org}(이하 '학교')는 「개인정보 보호법」 제30조에 따라 수업용 웹 서비스 '실시간 찬반 투표'(이하 '서비스') 이용자의 개인정보를 보호하고 관련 고충을 신속하게 처리하기 위하여 다음과 같이 개인정보 처리방침을 정하여 공개합니다.</p>

    <h3>제1조 (개인정보의 처리 목적)</h3>
    <p>학교는 다음 목적을 위해서만 정보를 처리하며, 목적이 바뀌는 경우 「개인정보 보호법」 제18조에 따라 필요한 조치를 하겠습니다.</p>
    <ol>
      <li>수업 중 찬반 투표 진행, 중복 투표 방지 및 결과 집계</li>
      <li>교사(관리자) 본인 확인 및 투표 시작·마감 등 관리 기능 보호</li>
      <li>서비스의 안정적인 제공과 오류·부정 이용 방지</li>
    </ol>

    <h3>제2조 (처리하는 정보의 항목)</h3>
    <table>
      <tr><th>구분</th><th>항목</th><th>수집 방법</th></tr>
      <tr><td>학생(투표자)</td><td>투표 선택(찬성 또는 반대), 기기 임의 식별값(무작위 문자열, 중복 투표 방지용)</td><td>투표 버튼을 누를 때 자동 생성·저장</td></tr>
      <tr><td>교사(관리자)</td><td>관리자 계정 아이디(공용 계정, 실명·개인 이메일 아님), 비밀번호(암호화되어 저장)</td><td>운영 담당 교사가 직접 등록</td></tr>
      <tr><td>자동 수집</td><td>접속 IP 주소, 브라우저·기기 종류, 접속 일시</td><td>웹페이지·데이터베이스 제공 업체의 서버 기록(로그)으로 자동 생성</td></tr>
    </table>
    <p>학교는 이름, 학번, 학년·반, 연락처, 사진, 위치정보 등 개인을 직접 알아볼 수 있는 정보와 민감정보·고유식별정보(주민등록번호 등)를 수집하지 않습니다.</p>

    <h3>제3조 (처리 및 보유 기간)</h3>
    <table>
      <tr><th>항목</th><th>보유 기간</th></tr>
      <tr><td>투표 기록(선택, 기기 임의 식별값)</td><td>다음 투표를 시작할 때 즉시 삭제. 마지막 투표 기록도 해당 학기 수업이 끝나면 운영 담당 교사가 삭제합니다.</td></tr>
      <tr><td>기기 임의 식별값(이용자 기기 안)</td><td>이용자 브라우저에 남아 있으며, 이용자가 브라우저의 사이트 데이터를 지우면 즉시 삭제됩니다.</td></tr>
      <tr><td>내가 고른 선택 표시(이용자 기기 안)</td><td>브라우저 탭을 닫으면 자동 삭제</td></tr>
      <tr><td>교사 관리자 계정</td><td>서비스 운영 종료 시까지(운영 종료 시 즉시 삭제)</td></tr>
      <tr><td>서버 접속 기록(로그)</td><td>제6조의 각 업체가 정한 기간(보안·장애 대응 목적)</td></tr>
    </table>

    <h3>제4조 (개인정보의 파기 절차 및 방법)</h3>
    <ol>
      <li>학교는 보유 기간이 지나거나 처리 목적을 달성한 정보를 지체 없이 파기합니다.</li>
      <li>모든 정보는 전자적 파일 형태로만 처리하며, 데이터베이스에서 복구할 수 없는 방법으로 삭제합니다. 종이 문서로 출력하거나 따로 보관하지 않습니다.</li>
    </ol>

    <h3>제5조 (개인정보의 제3자 제공)</h3>
    <p>학교는 정보를 제1조의 목적 범위 안에서만 처리하며, 이용자의 동의나 법률의 특별한 규정 등 「개인정보 보호법」 제17조·제18조에 해당하는 경우를 제외하고는 제3자에게 제공하지 않습니다.</p>

    <h3>제6조 (처리 위탁 및 국외 이전)</h3>
    <p>학교는 서비스 제공을 위해 다음과 같이 외부 클라우드 서비스를 이용하며, 이 과정에서 정보가 국외 서버에 저장·처리됩니다(「개인정보 보호법」 제26조, 제28조의8).</p>
    <table>
      <tr><th>이전받는 자</th><th>위탁 업무</th><th>이전 국가</th><th>이전 항목</th></tr>
      <tr><td>Google LLC<br>(Firebase)</td><td>투표 기록 저장·전달, 교사 로그인 인증</td><td>싱가포르(데이터베이스), 미국(인증)</td><td>투표 선택, 기기 임의 식별값, 관리자 계정, 접속 IP·기기 정보</td></tr>
      <tr><td>GitHub, Inc.<br>(GitHub Pages)</td><td>서비스 웹페이지 제공</td><td>미국</td><td>접속 IP·브라우저 정보, 접속 일시</td></tr>
      <tr><td>Google LLC(Google Fonts), Cloudflare, Inc.(cdnjs)</td><td>화면 글꼴 및 QR 코드 프로그램 제공</td><td>미국</td><td>접속 IP·브라우저 정보</td></tr>
    </table>
    <ul>
      <li>이전 시기 및 방법: 서비스에 접속하거나 투표할 때 암호화된 네트워크(HTTPS)로 전송</li>
      <li>보유·이용 기간: 제3조와 같음(서버 기록은 각 업체 정책에 따름)</li>
      <li>거부 방법 및 효과: 이용자는 서비스에 접속하지 않는 방법으로 국외 이전을 거부할 수 있습니다. 이 경우 손들기 등 다른 방법으로 수업에 참여할 수 있으며, 거부에 따른 불이익은 없습니다.</li>
    </ul>

    <h3>제7조 (정보주체와 법정대리인의 권리·의무 및 행사 방법)</h3>
    <ol>
      <li>이용자(정보주체)는 언제든지 개인정보 열람, 정정·삭제, 처리 정지를 요구할 수 있습니다.</li>
      <li>만 14세 미만 학생의 경우 법정대리인(보호자)이 이 권리를 행사할 수 있습니다.</li>
      <li>권리 행사는 제10조의 담당자에게 말이나 서면, 이메일 등으로 할 수 있으며, 학교는 지체 없이 조치합니다.</li>
      <li>서비스에는 이름 등 개인을 알아볼 수 있는 정보가 없어 특정 학생의 투표 기록만 골라내기 어려울 수 있습니다. 이 경우 학교는 해당 투표 기록 전체를 삭제하는 방법으로 조치합니다.</li>
      <li>이용자는 자신의 기기에 저장된 임의 식별값을 브라우저 설정의 '사이트 데이터 삭제'로 직접 지울 수 있습니다.</li>
    </ol>

    <h3>제8조 (만 14세 미만 아동의 개인정보)</h3>
    <p>서비스는 이름, 연락처 등 아동 본인을 알아볼 수 있는 정보를 수집하지 않으며, 수업 중 교사의 안내에 따라서만 이용됩니다. 법정대리인은 제7조에 따라 언제든지 관련 권리를 행사할 수 있습니다.</p>

    <h3>제9조 (안전성 확보 조치)</h3>
    <ul>
      <li>관리적 조치: 운영 담당 교사 1인만 관리 기능을 사용하며, 관리자 비밀번호를 외부에 알리지 않습니다.</li>
      <li>기술적 조치: 모든 통신은 HTTPS로 암호화되고, 관리자 비밀번호는 인증 서비스(Firebase)에 암호화되어 저장됩니다. 데이터베이스 접근 규칙으로 인증된 교사만 투표 시작·마감·삭제를 할 수 있고, 학생은 투표 시간 안에 찬성·반대 한 표만 기록할 수 있습니다.</li>
      <li>물리적 조치: 정보는 보안 인증을 받은 클라우드 업체(Google, GitHub)의 데이터센터에만 저장되며, 학교 안에 별도 저장 장치를 두지 않습니다.</li>
    </ul>

    <h3>제10조 (자동 수집 장치의 설치·운영 및 거부)</h3>
    <ol>
      <li>서비스는 쿠키를 사용하지 않습니다. 다만 기능 제공을 위해 브라우저 저장소를 다음과 같이 사용합니다.
        <ul>
          <li>로컬 저장소(localStorage): 중복 투표 방지용 기기 임의 식별값, 데이터베이스 연결 정보</li>
          <li>세션 저장소(sessionStorage): 내가 고른 선택 표시, 교사 로그인 상태(탭을 닫으면 삭제)</li>
        </ul>
      </li>
      <li>이용자는 브라우저 설정에서 사이트 데이터를 지우거나 저장을 막을 수 있습니다. 이 경우 접속할 때마다 새 식별값이 만들어질 수 있습니다.</li>
      <li>서비스는 광고, 방문 통계·행태 분석 도구를 사용하지 않습니다.</li>
    </ol>

    <h3>제11조 (개인정보 보호책임자)</h3>
    <table>
      <tr><th>성명</th><td>${P.officerName}</td></tr>
      <tr><th>직위</th><td>${P.officerRole}</td></tr>
      <tr><th>연락처</th><td>${P.officerContact}</td></tr>
    </table>
    <p>개인정보 관련 문의, 불만 처리, 피해 구제 등은 위 담당자에게 요청할 수 있으며, 학교는 지체 없이 답변하고 처리합니다.</p>

    <h3>제12조 (권익 침해 구제 방법)</h3>
    <p>개인정보 침해로 인한 구제를 받으려면 아래 기관에 분쟁 해결이나 상담 등을 신청할 수 있습니다.</p>
    <ul>
      <li>개인정보분쟁조정위원회: 국번 없이 1833-6972 (www.kopico.go.kr)</li>
      <li>개인정보침해신고센터: 국번 없이 118 (privacy.kisa.or.kr)</li>
      <li>대검찰청: 국번 없이 1301 (www.spo.go.kr)</li>
      <li>경찰청: 국번 없이 182 (ecrm.police.go.kr)</li>
    </ul>

    <h3>제13조 (개인정보 처리방침의 변경)</h3>
    <p>이 개인정보 처리방침은 ${P.effective}부터 적용됩니다. 내용이 추가·삭제·수정되는 경우 시행 7일 전부터 서비스 화면을 통해 알립니다.</p>
    <p class="pv-date">공고일자: ${P.effective} · 시행일자: ${P.effective}</p>
  </div>`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const open = document.createElement('button');
  open.type = 'button';
  open.className = 'pv-open';
  open.textContent = '개인정보 처리방침';

  const dialog = document.createElement('dialog');
  dialog.className = 'pv-dialog';
  dialog.setAttribute('aria-labelledby', 'pvTitle');
  dialog.innerHTML = html;

  open.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('.pv-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });   // 바깥 클릭 시 닫기

  document.body.append(open, dialog);
})();
