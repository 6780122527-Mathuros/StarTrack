<!doctype html>
<html lang="th">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StarTrack DEMO</title>
  <script src="/_sdk/data_sdk.js"></script>
  <script src="/_sdk/element_sdk.js"></script>
  <style>
    body {
      box-sizing: border-box;
      font-family: 'Sarabun', Arial, sans-serif;
      margin: 0;
      padding: 0;
      height: 100%;
      background: linear-gradient(135deg, #f4eaff, #d3ecfd);
      color: #444;
    }
    html {
      height: 100%;
    }
    .app-wrapper {
      width: 100%;
      min-height: 100%;
    }
    header {
      text-align: center;
      padding: 1.2em 0;
      background: #fcecfb;
      border-bottom: 2px solid #e5d9f7;
    }
    h1 { color: #a645ae; margin: 0.2em 0; }
    .subtitle { color: #94488f; }
    nav {
      padding: 1em;
      text-align: center;
      background: #f2f7fd;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .rolebtn {
      background: #e9dfff;
      color: #86398e;
      font-size: 1.1em;
      border: none;
      padding: .7em 1.7em;
      border-radius: 10px;
      margin: .3em;
      cursor: pointer;
    }
    .rolebtn:hover { background: #e4e5ff; }
    .rolebtn.active { background: #d4c5ff; }
    section {
      max-width: 900px;
      margin: 1.5em auto;
      background: #fff;
      padding: 1.8em;
      border-radius: 20px;
      box-shadow: 0 4px 20px #dcdcff;
    }
    .box {
      background: #f7f9fd;
      padding: 1.2em;
      border-radius: 15px;
      margin-bottom: 1em;
    }
    .emotion-btns button {
      font-size: 1.5em;
      margin: 0.2em;
      padding: .2em .5em;
      border-radius: 50%;
      border: 1px solid #ccc;
      background: #fff;
      cursor: pointer;
    }
    .emotion-btns button.selected {
      background: #ffd7ef;
      border-color: #d14da5;
    }
    textarea {
      width: 100%;
      height: 90px;
      padding: .7em;
      border-radius: 10px;
      border: 1px solid #d5d5ff;
      background: #fff5fb;
      box-sizing: border-box;
    }
    input[type="text"] {
      width: 100%;
      padding: .7em;
      border-radius: 10px;
      border: 1px solid #d5d5ff;
      background: #fff5fb;
      box-sizing: border-box;
      margin: .5em 0;
    }
    .btn-main {
      background: #a651b1;
      color: #fff;
      border: none;
      padding: .7em 1.5em;
      border-radius: 10px;
      cursor: pointer;
      margin-top: .6em;
    }
    .btn-main:hover { background: #cda8e6; color:#5e1a6e; }
    .btn-main:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .diary-entry {
      background: #f3f1fc;
      padding: .7em;
      border-radius: 10px;
      margin: .5em 0;
      position: relative;
    }
    .diary-del {
      position: absolute;
      top: .5em;
      right: .5em;
      background: #ffd4e5;
      padding: .2em .6em;
      border-radius: 7px;
      cursor: pointer;
      border: none;
      font-size: 0.9em;
    }
    .diary-del:hover {
      background: #ffb3d1;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: .5em;
      background: #fafaff;
    }
    th, td {
      border: 1px solid #ccc;
      padding: .5em;
      text-align: center;
    }
    th { background: #e9dfff; }
    .student-card {
      background: #f9f5ff;
      padding: 1em;
      border-radius: 10px;
      margin: .5em 0;
      border: 1px solid #e5d9f7;
    }
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #a651b1;
      color: white;
      padding: 1em 2em;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .toast.show {
      opacity: 1;
    }
    .loading {
      opacity: 0.6;
      pointer-events: none;
    }
    .chart-container {
      position: relative;
      height: 300px;
      margin: 1em 0;
    }
    .reward-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1em;
      margin-top: 1em;
    }
    .reward-card {
      background: linear-gradient(135deg, #fff5f7, #f0f4ff);
      border: 2px solid #e5d9f7;
      border-radius: 15px;
      padding: 1.2em;
      text-align: center;
      transition: transform 0.2s;
    }
    .reward-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(166, 69, 174, 0.2);
    }
    .reward-icon {
      font-size: 3em;
      margin-bottom: 0.3em;
    }
    .reward-name {
      font-weight: bold;
      color: #86398e;
      margin: 0.5em 0;
      font-size: 1.05em;
    }
    .reward-cost {
      color: #a459c7;
      font-size: 1.3em;
      font-weight: bold;
      margin: 0.5em 0;
    }
    .btn-reward {
      background: #a651b1;
      color: #fff;
      border: none;
      padding: .6em 1.8em;
      border-radius: 10px;
      cursor: pointer;
      margin-top: .5em;
      font-size: 1em;
      width: 100%;
    }
    .btn-reward:hover {
      background: #cda8e6;
      color: #5e1a6e;
    }
    .btn-reward:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .redemption-item {
      background: #f9f5ff;
      padding: 0.8em;
      border-radius: 10px;
      margin: 0.5em 0;
      border-left: 4px solid #a651b1;
    }
    .person-stats-card {
      background: #fff;
      border: 2px solid #e5d9f7;
      border-radius: 12px;
      padding: 1em;
      margin: 0.8em 0;
    }
    .person-name {
      font-weight: bold;
      font-size: 1.1em;
      color: #86398e;
      margin-bottom: 0.5em;
    }
    .emotion-bar {
      margin: 0.5em 0;
    }
    .emotion-bar-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.9em;
      margin-bottom: 0.2em;
    }
    .emotion-bar-track {
      background: #f0f0f0;
      border-radius: 10px;
      height: 18px;
      overflow: hidden;
    }
    .emotion-bar-fill {
      height: 100%;
      transition: width 0.3s;
      border-radius: 10px;
    }
    .role-tabs {
      display: flex;
      gap: 0.5em;
      margin-bottom: 1em;
      border-bottom: 2px solid #e5d9f7;
    }
    .role-tab {
      background: transparent;
      border: none;
      padding: 0.8em 1.5em;
      cursor: pointer;
      color: #666;
      font-size: 1em;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
    }
    .role-tab:hover {
      color: #a651b1;
    }
    .role-tab.active {
      color: #a651b1;
      border-bottom-color: #a651b1;
      font-weight: bold;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>@view-transition { navigation: auto; }</style>
  <script src="https://cdn.tailwindcss.com" type="text/javascript"></script>
 </head>
 <body>
  <div class="app-wrapper">
   <header>
    <h1 id="app-title">StarTrack DEMO</h1>
    <div class="subtitle" id="app-subtitle">
     ระบบติ��ตามอารมณ์ &amp; ดาวเด็กดี
    </div>
   </header>
   <nav><button class="rolebtn" id="student-btn" onclick="switchRole('student')">👦 นักเรียน</button> <button class="rolebtn" id="teacher-btn" onclick="switchRole('teacher')">👩‍🏫 ครู</button> <button class="rolebtn" id="admin-btn" onclick="switchRole('admin')">🏫 ผู้บริหาร</button>
   </nav><!-- นักเรียน -->
   <section id="student-section" style="display:none">
    <h2>👦 นักเรียน</h2>
    <div class="box"><label for="student-name-input">ชื่อของคุณ:</label> <input type="text" id="student-name-input" placeholder="กรอกชื่อของคุณ">
    </div>
    <div class="box">
     <h3>เลือ���อารมณ์วันนี้</h3>
     <div class="emotion-btns"><button data-emotion="happy" onclick="selectEmotion('happy')">😄</button> <button data-emotion="normal" onclick="selectEmotion('normal')">😐</button> <button data-emotion="sad" onclick="selectEmotion('sad')">😢</button> <button data-emotion="angry" onclick="selectEmotion('angry')">😡</button> <button data-emotion="surprise" onclick="selectEmotion('surprise')">😲</button>
     </div><button class="btn-main" id="save-emotion-btn" onclick="saveEmotion()">บันทึกอารมณ์</button>
     <div id="emotion-msg"></div>
    </div>
    <div class="box">
     <h3>ไดอารี่</h3><textarea id="diary-text" placeholder="เขียนบันทึกของคุณ..."></textarea> <button class="btn-main" id="save-diary-btn" onclick="saveDiary()">บันทึกไดอารี่</button>
     <div id="diary-list"></div>
    </div>
    <div class="box">
     <h3>⭐ ดาวเด็กดี</h3>
     <div id="star-count" style="margin-top:.6em;font-size:1.2em;color:#a459c7"></div>
    </div>
    <div class="box">
     <h3>🎁 แลกของรางวัล</h3>
     <div class="reward-grid">
      <div class="reward-card">
       <div class="reward-icon">
        ⏰
       </div>
       <div class="reward-name">
        ขอเวลาพัก 5 นาที
       </div>
       <div class="reward-cost">
        10 ⭐
       </div><button class="btn-reward" onclick="redeemReward('break5min', 10)">แลก</button>
      </div>
      <div class="reward-card">
       <div class="reward-icon">
        ✏️
       </div>
       <div class="reward-name">
        คูปองเครื่องเขียน
       </div>
       <div class="reward-cost">
        12 ⭐
       </div><button class="btn-reward" onclick="redeemReward('stationery', 12)">แลก</button>
      </div>
      <div class="reward-card">
       <div class="reward-icon">
        🍔
       </div>
       <div class="reward-name">
        คูปองอาหารและเครื่องดื่ม
       </div>
       <div class="reward-cost">
        15 ⭐
       </div><button class="btn-reward" onclick="redeemReward('food', 15)">แลก</button>
      </div>
     </div>
     <div id="redemption-history" style="margin-top:1.5em;">
      <h4>ประวัติการแลก</h4>
      <div id="redemption-list"></div>
     </div>
    </div>
   </section><!-- ครู -->
   <section id="teacher-section" style="display:none">
    <h2>👩‍🏫 ครู</h2>
    <div class="box">
     <h3>บันทึกอารมณ์ของคุณ</h3><label for="teacher-name-input">ชื่อของคุณ:</label> <input type="text" id="teacher-name-input" placeholder="กรอกชื่อครู"> <label style="display:block;margin-top:1em;">เลือกอารมณ์วันนี้:</label>
     <div class="emotion-btns" id="teacher-own-emotion-btns"><button data-emotion="happy" onclick="selectTeacherOwnEmotion('happy')">😄</button> <button data-emotion="normal" onclick="selectTeacherOwnEmotion('normal')">😐</button> <button data-emotion="sad" onclick="selectTeacherOwnEmotion('sad')">😢</button> <button data-emotion="angry" onclick="selectTeacherOwnEmotion('angry')">😡</button> <button data-emotion="surprise" onclick="selectTeacherOwnEmotion('surprise')">😲</button>
     </div><button class="btn-main" id="teacher-save-own-emotion-btn" onclick="teacherSaveOwnEmotion()">บันทึกอารมณ์ของฉัน</button>
    </div>
    <div class="box">
     <h3>มอบดาวให้��ักเรียน</h3><label for="teacher-student-select">เลือกนักเรียน:</label> <select id="teacher-student-select" style="width:100%;padding:.5em;margin:.5em 0;border-radius:8px;border:1px solid #d5d5ff;"> <option value="">-- เลือกนักเรียน --</option> </select> <button class="btn-main" id="give-star-btn" onclick="giveStar()">มอบ 1 ดาว ⭐</button>
    </div>
    <div class="box">
     <h3>�� สถิติอารมณ์นักเรียน</h3><label for="teacher-stats-select">เลือกนักเรียน:</label> <select id="teacher-stats-select" onchange="updateTeacherStats()" style="width:100%;padding:.5em;margin:.5em 0;border-radius:8px;border:1px solid #d5d5ff;"> <option value="">-- เลือกนักเรียน --</option> </select>
     <div id="teacher-stats-display"></div>
    </div>
    <div class="box">
     <h3>ข้อมูลอารมณ์นักเรียนล่าสุด</h3>
     <div id="teacher-emotion-list"></div>
    </div>
    <div class="box">
     <h3>🎁 คำขอแลกของรางวัล</h3>
     <div id="redemption-requests"></div>
    </div>
   </section><!-- ��ู้บริหาร -->
   <section id="admin-section" style="display:none">
    <h2>🏫 ผู้บริหาร</h2>
    <div class="box">
     <h3>📊 สถิติอารมณ์ท��้งหมด</h3>
     <div class="role-tabs"><button class="role-tab active" onclick="switchAdminChart('all')">ทั้งหมด</button> <button class="role-tab" onclick="switchAdminChart('student')">👦 นักเรียน</button> <button class="role-tab" onclick="switchAdminChart('teacher')">👩‍🏫 ครู</button>
     </div>
     <div class="chart-container">
      <canvas id="emotion-chart"></canvas>
     </div>
    </div>
    <div class="box">
     <h3>👦 สถิติอารมณ์แยกตามบุคคล - นักเรียน</h3>
     <div id="admin-student-stats"></div>
    </div>
    <div class="box">
     <h3>👩‍🏫 สถิติอารมณ์แยกตามบุคคล - ครู</h3>
     <div id="admin-teacher-stats"></div>
    </div>
    <div class="box">
     <h3>⭐ รายงานดาวเด็กดี</h3>
     <table id="star-report-table">
      <thead>
       <tr>
        <th>ชื่อนักเรียน</th>
        <th>จำนวนดาว ⭐</th>
       </tr>
      </thead>
      <tbody id="star-report-body"></tbody>
     </table>
    </div>
   </section>
   <div id="toast" class="toast"></div>
  </div>
  <script>
  let allData = [];
  let selectedEmotion = null;
  let selectedTeacherOwnEmotion = null;
  let currentRole = 'student';
  let emotionChart = null;
  let currentAdminChartView = 'all';

  const defaultConfig = {
    app_title: "StarTrack DEMO",
    app_subtitle: "ระบบติดตามอารมณ์ & ดาวเด็กด��",
    student_tab: "👦 นักเรียน",
    teacher_tab: "👩‍🏫 ครู",
    admin_tab: "🏫 ผู้บริหาร",
    background_color: "#f4eaff",
    primary_color: "#a651b1",
    text_color: "#444444"
  };

  const dataHandler = {
    onDataChanged(data) {
      allData = data;
      updateStudentView();
      updateTeacherView();
      updateAdminView();
    }
  };

  async function initApp() {
    const initResult = await window.dataSdk.init(dataHandler);
    if (!initResult.isOk) {
      showToast('เกิดข้อผิดพลาดในการเริ่มต้นระบบ');
      return;
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
          document.getElementById('app-title').textContent = config.app_title || defaultConfig.app_title;
          document.getElementById('app-subtitle').textContent = config.app_subtitle || defaultConfig.app_subtitle;
          document.getElementById('student-btn').textContent = config.student_tab || defaultConfig.student_tab;
          document.getElementById('teacher-btn').textContent = config.teacher_tab || defaultConfig.teacher_tab;
          document.getElementById('admin-btn').textContent = config.admin_tab || defaultConfig.admin_tab;

          document.querySelector('.app-wrapper').style.background = `linear-gradient(135deg, ${config.background_color || defaultConfig.background_color}, #d3ecfd)`;
          
          const buttons = document.querySelectorAll('.btn-main');
          buttons.forEach(btn => {
            btn.style.backgroundColor = config.primary_color || defaultConfig.primary_color;
          });

          document.body.style.color = config.text_color || defaultConfig.text_color;
        },
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (value) => {
                window.elementSdk.config.background_color = value;
                window.elementSdk.setConfig({ background_color: value });
              }
            },
            {
              get: () => config.primary_color || defaultConfig.primary_color,
              set: (value) => {
                window.elementSdk.config.primary_color = value;
                window.elementSdk.setConfig({ primary_color: value });
              }
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value) => {
                window.elementSdk.config.text_color = value;
                window.elementSdk.setConfig({ text_color: value });
              }
            }
          ],
          borderables: [],
          fontEditable: undefined,
          fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
          ["app_title", config.app_title || defaultConfig.app_title],
          ["app_subtitle", config.app_subtitle || defaultConfig.app_subtitle],
          ["student_tab", config.student_tab || defaultConfig.student_tab],
          ["teacher_tab", config.teacher_tab || defaultConfig.teacher_tab],
          ["admin_tab", config.admin_tab || defaultConfig.admin_tab]
        ])
      });
    }

    switchRole('student');
  }

  function switchRole(role) {
    currentRole = role;
    document.getElementById('student-section').style.display = 'none';
    document.getElementById('teacher-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'none';

    document.querySelectorAll('.rolebtn').forEach(btn => btn.classList.remove('active'));

    if (role === 'student') {
      document.getElementById('student-section').style.display = 'block';
      document.getElementById('student-btn').classList.add('active');
      updateStudentView();
    } else if (role === 'teacher') {
      document.getElementById('teacher-section').style.display = 'block';
      document.getElementById('teacher-btn').classList.add('active');
      updateTeacherView();
    } else if (role === 'admin') {
      document.getElementById('admin-section').style.display = 'block';
      document.getElementById('admin-btn').classList.add('active');
      updateAdminView();
    }
  }

  function switchAdminChart(view) {
    currentAdminChartView = view;
    document.querySelectorAll('.role-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    updateAdminChart();
  }

  function selectEmotion(emotion) {
    selectedEmotion = emotion;
    document.querySelectorAll('.emotion-btns button').forEach(btn => {
      btn.classList.remove('selected');
    });
    document.querySelector(`button[data-emotion="${emotion}"]`).classList.add('selected');
  }

  function selectTeacherOwnEmotion(emotion) {
    selectedTeacherOwnEmotion = emotion;
    document.querySelectorAll('#teacher-own-emotion-btns button').forEach(btn => {
      btn.classList.remove('selected');
    });
    document.querySelector(`#teacher-own-emotion-btns button[data-emotion="${emotion}"]`).classList.add('selected');
  }

  async function saveEmotion() {
    const studentName = document.getElementById('student-name-input').value.trim();
    
    if (!studentName) {
      showToast('กรุณากรอกชื่อของคุ���');
      return;
    }

    if (!selectedEmotion) {
      showToast('กรุณาเลือกอารมณ์');
      return;
    }

    if (allData.length >= 999) {
      showToast('ถึงขีดจำกัดการบันทึกแล้ว (999 รายการ)');
      return;
    }

    const btn = document.getElementById('save-emotion-btn');
    btn.disabled = true;
    btn.textContent = 'กำลังบันทึก...';

    const result = await window.dataSdk.create({
      type: 'emotion',
      student_name: studentName,
      emotion: selectedEmotion,
      date: new Date().toISOString(),
      diary_text: '',
      stars: 0,
      timestamp: Date.now(),
      user_type: 'student'
    });

    btn.disabled = false;
    btn.textContent = 'บันทึกอ��รมณ์';

    if (result.isOk) {
      showToast('บันทึกอารมณ์สำเร็จ!');
      selectedEmotion = null;
      document.querySelectorAll('.emotion-btns button').forEach(btn => {
        btn.classList.remove('selected');
      });
    } else {
      showToast('เกิดข้อผิดพลาด: ' + result.error.message);
    }
  }

  async function saveDiary() {
    const studentName = document.getElementById('student-name-input').value.trim();
    const diaryText = document.getElementById('diary-text').value.trim();

    if (!studentName) {
      showToast('กรุณากรอกชื่อของคุณ');
      return;
    }

    if (!diaryText) {
      showToast('กรุณาเขียนไดอารี่');
      return;
    }

    if (allData.length >= 999) {
      showToast('ถึงขีดจำกัดการบันทึกแล้ว (999 รายการ)');
      return;
    }

    const btn = document.getElementById('save-diary-btn');
    btn.disabled = true;
    btn.textContent = 'กำลังบันทึก...';

    const result = await window.dataSdk.create({
      type: 'diary',
      student_name: studentName,
      emotion: '',
      date: new Date().toISOString(),
      diary_text: diaryText,
      stars: 0,
      timestamp: Date.now()
    });

    btn.disabled = false;
    btn.textContent = 'บันทึกไดอารี่';

    if (result.isOk) {
      showToast('บันทึกไดอารี่สำเร็จ!');
      document.getElementById('diary-text').value = '';
    } else {
      showToast('เกิดข้อผิดพลาด: ' + result.error.message);
    }
  }

  async function deleteDiary(record) {
    const result = await window.dataSdk.delete(record);
    if (result.isOk) {
      showToast('ลบไดอารี่สำเร็จ');
    } else {
      showToast('เกิดข้อผิดพล��ด: ' + result.error.message);
    }
  }

  async function teacherSaveOwnEmotion() {
    const teacherName = document.getElementById('teacher-name-input').value.trim();

    if (!teacherName) {
      showToast('กรุณากรอกชื่อของคุณ');
      return;
    }

    if (!selectedTeacherOwnEmotion) {
      showToast('กรุณาเล��อกอารมณ์');
      return;
    }

    if (allData.length >= 999) {
      showToast('ถึงขีดจำกัดการบันทึกแล้ว (999 รายการ)');
      return;
    }

    const btn = document.getElementById('teacher-save-own-emotion-btn');
    btn.disabled = true;
    btn.textContent = 'กำลังบันทึก...';

    const result = await window.dataSdk.create({
      type: 'emotion',
      student_name: teacherName,
      emotion: selectedTeacherOwnEmotion,
      date: new Date().toISOString(),
      diary_text: '',
      stars: 0,
      timestamp: Date.now(),
      user_type: 'teacher'
    });

    btn.disabled = false;
    btn.textContent = 'บันทึกอารมณ์ของฉัน';

    if (result.isOk) {
      showToast('บันทึกอารมณ์ของคุณสำเร็จ!');
      selectedTeacherOwnEmotion = null;
      document.querySelectorAll('#teacher-own-emotion-btns button').forEach(btn => {
        btn.classList.remove('selected');
      });
    } else {
      showToast('เกิดข้อผิดพลาด: ' + result.error.message);
    }
  }

  async function redeemReward(rewardType, cost) {
    const studentName = document.getElementById('student-name-input').value.trim();
    
    if (!studentName) {
      showToast('กรุณากรอกชื่อของคุณ');
      return;
    }

    const earnedStars = allData
      .filter(d => d.type === 'star' && d.student_name === studentName)
      .reduce((sum, d) => sum + d.stars, 0);
    
    const spentStars = allData
      .filter(d => d.type === 'redemption' && d.student_name === studentName && (d.status === 'approved' || d.status === 'pending'))
      .reduce((sum, d) => sum + d.stars, 0);
    
    const currentStars = earnedStars - spentStars;

    if (currentStars < cost) {
      showToast(`ดาวไม่พอ! คุณมี ${currentStars} ดาว ต้องการ ${cost} ดาว`);
      return;
    }

    if (allData.length >= 999) {
      showToast('ถึงขีดจำกัดการบันทึกแล้ว (999 รายการ)');
      return;
    }

    const rewardNames = {
      'break5min': 'ขอเวลาพัก 5 นาที',
      'stationery': 'คูปองเครื่องเขียน',
      'food': 'คูปองอาหารและเครื่องดื่ม'
    };

    const result = await window.dataSdk.create({
      type: 'redemption',
      student_name: studentName,
      emotion: '',
      date: new Date().toISOString(),
      diary_text: '',
      stars: cost,
      timestamp: Date.now(),
      reward_type: rewardType,
      reward_name: rewardNames[rewardType],
      status: 'pending'
    });

    if (result.isOk) {
      showToast(`แลก${rewardNames[rewardType]}สำเร็จ! 🎉`);
    } else {
      showToast('เกิดข้อผิดพลาด: ' + result.error.message);
    }
  }

  async function teacherSaveEmotion() {
    const selectEl = document.getElementById('teacher-student-emotion-select');
    const studentName = selectEl.value;

    if (!studentName) {
      showToast('กรุณาเลือกนักเรียน');
      return;
    }

    if (!selectedTeacherEmotion) {
      showToast('กรุณาเลือกอารมณ์');
      return;
    }

    if (allData.length >= 999) {
      showToast('ถึงขีดจำ��ัดการบันทึก���ล้ว (999 รายการ)');
      return;
    }

    const btn = document.getElementById('teacher-save-emotion-btn');
    btn.disabled = true;
    btn.textContent = 'กำลังบันทึก...';

    const result = await window.dataSdk.create({
      type: 'emotion',
      student_name: studentName,
      emotion: selectedTeacherEmotion,
      date: new Date().toISOString(),
      diary_text: '',
      stars: 0,
      timestamp: Date.now(),
      user_type: 'teacher'
    });

    btn.disabled = false;
    btn.textContent = 'บันทึกอารมณ์นักเรียน';

    if (result.isOk) {
      showToast(`บันทึกอารมณ์ของ ${studentName} สำเร็จ!`);
      selectedTeacherEmotion = null;
      document.querySelectorAll('#teacher-emotion-btns button').forEach(btn => {
        btn.classList.remove('selected');
      });
      selectEl.value = '';
    } else {
      showToast('เกิดข้อผ������พลาด: ' + result.error.message);
    }
  }

  async function giveStar() {
    const selectEl = document.getElementById('teacher-student-select');
    const studentName = selectEl.value;

    if (!studentName) {
      showToast('กรุณาเลือกนัก��รียน');
      return;
    }

    if (allData.length >= 999) {
      showToast('ถึงขีดจำกัดการบันทึกแล้ว (999 รายการ)');
      return;
    }

    const btn = document.getElementById('give-star-btn');
    btn.disabled = true;
    btn.textContent = 'กำลังมอบดาว...';

    const result = await window.dataSdk.create({
      type: 'star',
      student_name: studentName,
      emotion: '',
      date: new Date().toISOString(),
      diary_text: '',
      stars: 1,
      timestamp: Date.now()
    });

    btn.disabled = false;
    btn.textContent = 'มอบ 1 ด���ว ⭐';

    if (result.isOk) {
      showToast(`มอบดาวให้ ${studentName} สำเร็จ!`);
      selectEl.value = '';
    } else {
      showToast('เกิดข้อผิดพลาด: ' + result.error.message);
    }
  }

  async function approveRedemption(record) {
    const updatedRecord = { ...record, status: 'approved' };
    const result = await window.dataSdk.update(updatedRecord);
    
    if (result.isOk) {
      showToast('อนุมัติการแลกดาวสำเร็จ! ✅');
    } else {
      showToast('เกิดข้อผิดพลาด: ' + result.error.message);
    }
  }

  async function rejectRedemption(record) {
    const updatedRecord = { ...record, status: 'rejected' };
    const result = await window.dataSdk.update(updatedRecord);
    
    if (result.isOk) {
      showToast('ปฏิเสธการแลกดาว');
    } else {
      showToast('เกิดข้อผิดพลาด: ' + result.error.message);
    }
  }

  function updateStudentView() {
    const studentName = document.getElementById('student-name-input').value.trim();
    
    const diaryList = document.getElementById('diary-list');
    const studentDiaries = allData.filter(d => d.type === 'diary' && d.student_name === studentName);
    
    if (studentDiaries.length === 0) {
      diaryList.innerHTML = '<p style="color:#999;margin-top:1em;">ยังไม่มีไดอารี่</p>';
    } else {
      diaryList.innerHTML = studentDiaries.map(diary => {
        const date = new Date(diary.date);
        return `
          <div class="diary-entry">
            <button class="diary-del" onclick='deleteDiary(${JSON.stringify(diary)})'>ลบ</button>
            <strong>${date.toLocaleDateString('th-TH')}</strong><br>
            ${diary.diary_text}
          </div>
        `;
      }).join('');
    }

    const earnedStars = allData
      .filter(d => d.type === 'star' && d.student_name === studentName)
      .reduce((sum, d) => sum + d.stars, 0);
    
    const spentStars = allData
      .filter(d => d.type === 'redemption' && d.student_name === studentName && (d.status === 'approved' || d.status === 'pending'))
      .reduce((sum, d) => sum + d.stars, 0);
    
    const currentStars = earnedStars - spentStars;
    
    document.getElementById('star-count').textContent = `คุณมี ${currentStars} ดาว ⭐ (ได้มา ${earnedStars} ดาว, ใช้ไป ${spentStars} ดาว)`;

    const redemptionList = document.getElementById('redemption-list');
    const redemptions = allData
      .filter(d => d.type === 'redemption' && d.student_name === studentName)
      .sort((a, b) => b.timestamp - a.timestamp);
    
    if (redemptions.length === 0) {
      redemptionList.innerHTML = '<p style="color:#999;margin-top:0.5em;">ยังไม่เคยแลกของรางวัล</p>';
    } else {
      redemptionList.innerHTML = redemptions.map(item => {
        const date = new Date(item.date);
        const status = item.status || 'approved';
        const statusText = status === 'pending' ? '⏳ รอยืนยัน' : status === 'approved' ? '✅ อนุมัติ���ล้ว' : '❌ ปฏิเสธ';
        const statusColor = status === 'pending' ? '#ff9800' : status === 'approved' ? '#4caf50' : '#f44336';
        return `
          <div class="redemption-item">
            <strong>${item.reward_name}</strong>
            <span style="float:right;color:${statusColor};font-size:0.9em;">${statusText}</span><br>
            <small>ใช้ ${item.stars} ดาว | ${date.toLocaleDateString('th-TH')} ${date.toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})}</small>
          </div>
        `;
      }).join('');
    }
  }

  function updateTeacherView() {
    const students = [...new Set(allData.map(d => d.student_name))].filter(name => name);
    
    const selectEl = document.getElementById('teacher-student-select');
    selectEl.innerHTML = '<option value="">-- เลือกนักเรียน --</option>' + 
      students.map(name => `<option value="${name}">${name}</option>`).join('');

    const emotionSelectEl = document.getElementById('teacher-student-emotion-select');
    emotionSelectEl.innerHTML = '<option value="">-- เลือกนักเรียน --</option>' + 
      students.map(name => `<option value="${name}">${name}</option>`).join('');

    const statsSelectEl = document.getElementById('teacher-stats-select');
    statsSelectEl.innerHTML = '<option value="">-- เลือกนักเรียน --</option>' + 
      students.map(name => `<option value="${name}">${name}</option>`).join('');

    const emotionList = document.getElementById('teacher-emotion-list');
    const recentEmotions = allData
      .filter(d => d.type === 'emotion')
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);

    if (recentEmotions.length === 0) {
      emotionList.innerHTML = '<p style="color:#999;">ยังไม่มีข้อมูลอารมณ์</p>';
    } else {
      emotionList.innerHTML = recentEmotions.map(emo => {
        const date = new Date(emo.date);
        const emotionMap = {
          happy: '😄 มีความสุข',
          normal: '😐 ปกติ',
          sad: '😢 เศร��า',
          angry: '😡 โกรธ',
          surprise: '😲 แปลกใจ'
        };
        return `
          <div class="student-card">
            <strong>${emo.student_name}</strong><br>
            ${emotionMap[emo.emotion] || emo.emotion}<br>
            <small>${date.toLocaleDateString('th-TH')} ${date.toLocaleTimeString('th-TH')}</small>
          </div>
        `;
      }).join('');
    }

    // Update redemption requests
    const redemptionRequests = document.getElementById('redemption-requests');
    const pendingRedemptions = allData
      .filter(d => d.type === 'redemption' && d.status === 'pending')
      .sort((a, b) => b.timestamp - a.timestamp);

    if (pendingRedemptions.length === 0) {
      redemptionRequests.innerHTML = '<p style="color:#999;text-align:center;padding:1em;">ไม่มีคำขอแลกดาวที่รอยืนยัน</p>';
    } else {
      redemptionRequests.innerHTML = pendingRedemptions.map(req => {
        const date = new Date(req.date);
        return `
          <div class="student-card" style="position:relative;padding-right:140px;">
            <strong>${req.student_name}</strong><br>
            <span style="color:#a459c7;font-weight:bold;">${req.reward_name}</span><br>
            <small>ใช้ ${req.stars} ���าว | ${date.toLocaleDateString('th-TH')} ${date.toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})}</small>
            <div style="position:absolute;right:10px;top:50%;transform:translateY(-50%);display:flex;gap:0.5em;">
              <button onclick='approveRedemption(${JSON.stringify(req).replace(/'/g, "&apos;")})' 
                style="background:#4caf50;color:white;border:none;padding:0.5em 1em;border-radius:8px;cursor:pointer;font-size:0.9em;">
                ✓ อนุมัติ
              </button>
              <button onclick='rejectRedemption(${JSON.stringify(req).replace(/'/g, "&apos;")})' 
                style="background:#f44336;color:white;border:none;padding:0.5em 1em;border-radius:8px;cursor:pointer;font-size:0.9em;">
                ✗ ป��ิเสธ
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function updateTeacherStats() {
    const selectEl = document.getElementById('teacher-stats-select');
    const studentName = selectEl.value;
    const displayEl = document.getElementById('teacher-stats-display');

    if (!studentName) {
      displayEl.innerHTML = '<p style="color:#999;margin-top:1em;">กรุณาเลือก��ักเรียน</p>';
      return;
    }

    const studentEmotions = allData.filter(d => d.type === 'emotion' && d.student_name === studentName);

    if (studentEmotions.length === 0) {
      displayEl.innerHTML = '<p style="color:#999;margin-top:1em;">นักเรียนคนนี้ยังไม่มีข้อมูลอารมณ์</p>';
      return;
    }

    const emotionCounts = {
      happy: studentEmotions.filter(d => d.emotion === 'happy').length,
      normal: studentEmotions.filter(d => d.emotion === 'normal').length,
      sad: studentEmotions.filter(d => d.emotion === 'sad').length,
      angry: studentEmotions.filter(d => d.emotion === 'angry').length,
      surprise: studentEmotions.filter(d => d.emotion === 'surprise').length
    };

    const total = studentEmotions.length;
    const emotionMap = {
      happy: '😄 มีความสุข',
      normal: '😐 ปกติ',
      sad: '😢 เศร้า',
      angry: '😡 โ���รธ',
      surprise: '😲 แปลกใจ'
    };

    let statsHtml = `
      <div style="margin-top:1em;">
        <p style="font-weight:bold;color:#86398e;font-size:1.1em;">สถิติอารมณ์ของ ${studentName}</p>
        <p style="margin-bottom:1em;color:#666;">บันทึกทั้งหมด: ${total} ครั้ง</p>
    `;

    Object.entries(emotionCounts).forEach(([key, count]) => {
      if (count > 0) {
        const percentage = ((count / total) * 100).toFixed(1);
        statsHtml += `
          <div style="margin:0.8em 0;">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.3em;">
              <span>${emotionMap[key]}</span>
              <span style="font-weight:bold;">${count} ครั้ง (${percentage}%)</span>
            </div>
            <div style="background:#e5d9f7;border-radius:10px;height:20px;overflow:hidden;">
              <div style="background:#a651b1;height:100%;width:${percentage}%;transition:width 0.3s;"></div>
            </div>
          </div>
        `;
      }
    });

    const recentEmotions = studentEmotions
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);

    statsHtml += `
      <div style="margin-top:1.5em;">
        <p style="font-weight:bold;color:#86398e;margin-bottom:0.5em;">บันทึกล่าสุด 5 ครั้ง</p>
    `;

    recentEmotions.forEach(emo => {
      const date = new Date(emo.date);
      statsHtml += `
        <div style="background:#f9f5ff;padding:0.6em;border-radius:8px;margin:0.4em 0;border-left:3px solid #a651b1;">
          ${emotionMap[emo.emotion]} - <small>${date.toLocaleDateString('th-TH')} ${date.toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})}</small>
        </div>
      `;
    });

    statsHtml += '</div></div>';
    displayEl.innerHTML = statsHtml;
  }

  function updateAdminView() {
    updateAdminChart();
    updateAdminPersonStats();
    updateStarReport();
  }

  function updateAdminChart() {
    let emotionData = allData.filter(d => d.type === 'emotion');
    
    if (currentAdminChartView === 'student') {
      emotionData = emotionData.filter(d => d.user_type === 'student' || !d.user_type);
    } else if (currentAdminChartView === 'teacher') {
      emotionData = emotionData.filter(d => d.user_type === 'teacher');
    }

    const emotionCounts = {
      happy: emotionData.filter(d => d.emotion === 'happy').length,
      normal: emotionData.filter(d => d.emotion === 'normal').length,
      sad: emotionData.filter(d => d.emotion === 'sad').length,
      angry: emotionData.filter(d => d.emotion === 'angry').length,
      surprise: emotionData.filter(d => d.emotion === 'surprise').length
    };

    const ctx = document.getElementById('emotion-chart');
    if (ctx) {
      if (emotionChart) {
        emotionChart.destroy();
      }

      emotionChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['😄 มีค���ามสุข', '😐 ปกติ', '😢 เศร้า', '😡 โกรธ', '😲 แปลกใจ'],
          datasets: [{
            label: 'จำนวนครั้ง',
            data: [emotionCounts.happy, emotionCounts.normal, emotionCounts.sad, emotionCounts.angry, emotionCounts.surprise],
            backgroundColor: ['#ffd700', '#87ceeb', '#add8e6', '#ff6b6b', '#ffa500']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
  }

  function updateAdminPersonStats() {
    const emotionMap = {
      happy: '😄',
      normal: '😐',
      sad: '😢',
      angry: '😡',
      surprise: '😲'
    };

    const emotionColors = {
      happy: '#ffd700',
      normal: '#87ceeb',
      sad: '#add8e6',
      angry: '#ff6b6b',
      surprise: '#ffa500'
    };

    // Student stats
    const studentEmotions = allData.filter(d => d.type === 'emotion' && (d.user_type === 'student' || !d.user_type));
    const studentNames = [...new Set(studentEmotions.map(d => d.student_name))];
    
    const studentStatsEl = document.getElementById('admin-student-stats');
    if (studentNames.length === 0) {
      studentStatsEl.innerHTML = '<p style="color:#999;text-align:center;padding:1em;">ยังไม่มีข้���มูลนักเรียน</p>';
    } else {
      let studentHtml = '';
      studentNames.forEach(name => {
        const emotions = studentEmotions.filter(d => d.student_name === name);
        const total = emotions.length;
        
        const counts = {
          happy: emotions.filter(d => d.emotion === 'happy').length,
          normal: emotions.filter(d => d.emotion === 'normal').length,
          sad: emotions.filter(d => d.emotion === 'sad').length,
          angry: emotions.filter(d => d.emotion === 'angry').length,
          surprise: emotions.filter(d => d.emotion === 'surprise').length
        };

        studentHtml += `<div class="person-stats-card">
          <div class="person-name">👦 ${name} <span style="color:#999;font-size:0.9em;font-weight:normal;">(${total} ครั้ง)</span></div>`;

        Object.entries(counts).forEach(([emotion, count]) => {
          if (count > 0) {
            const percentage = ((count / total) * 100).toFixed(1);
            studentHtml += `
              <div class="emotion-bar">
                <div class="emotion-bar-label">
                  <span>${emotionMap[emotion]} ${count} ครั้ง</span>
                  <span>${percentage}%</span>
                </div>
                <div class="emotion-bar-track">
                  <div class="emotion-bar-fill" style="width:${percentage}%;background:${emotionColors[emotion]}"></div>
                </div>
              </div>`;
          }
        });

        studentHtml += '</div>';
      });
      studentStatsEl.innerHTML = studentHtml;
    }

    // Teacher stats
    const teacherEmotions = allData.filter(d => d.type === 'emotion' && d.user_type === 'teacher');
    const teacherNames = [...new Set(teacherEmotions.map(d => d.student_name))];
    
    const teacherStatsEl = document.getElementById('admin-teacher-stats');
    if (teacherNames.length === 0) {
      teacherStatsEl.innerHTML = '<p style="color:#999;text-align:center;padding:1em;">ยังไม่มีข้อมูลครู</p>';
    } else {
      let teacherHtml = '';
      teacherNames.forEach(name => {
        const emotions = teacherEmotions.filter(d => d.student_name === name);
        const total = emotions.length;
        
        const counts = {
          happy: emotions.filter(d => d.emotion === 'happy').length,
          normal: emotions.filter(d => d.emotion === 'normal').length,
          sad: emotions.filter(d => d.emotion === 'sad').length,
          angry: emotions.filter(d => d.emotion === 'angry').length,
          surprise: emotions.filter(d => d.emotion === 'surprise').length
        };

        teacherHtml += `<div class="person-stats-card">
          <div class="person-name">👩‍🏫 ${name} <span style="color:#999;font-size:0.9em;font-weight:normal;">(${total} ครั้ง)</span></div>`;

        Object.entries(counts).forEach(([emotion, count]) => {
          if (count > 0) {
            const percentage = ((count / total) * 100).toFixed(1);
            teacherHtml += `
              <div class="emotion-bar">
                <div class="emotion-bar-label">
                  <span>${emotionMap[emotion]} ${count} ครั้ง</span>
                  <span>${percentage}%</span>
                </div>
                <div class="emotion-bar-track">
                  <div class="emotion-bar-fill" style="width:${percentage}%;background:${emotionColors[emotion]}"></div>
                </div>
              </div>`;
          }
        });

        teacherHtml += '</div>';
      });
      teacherStatsEl.innerHTML = teacherHtml;
    }
  }

  function updateStarReport() {
    const starsByStudent = {};
    allData.filter(d => d.type === 'star').forEach(star => {
      if (!starsByStudent[star.student_name]) {
        starsByStudent[star.student_name] = 0;
      }
      starsByStudent[star.student_name] += star.stars;
    });

    const tbody = document.getElementById('star-report-body');
    const entries = Object.entries(starsByStudent).sort((a, b) => b[1] - a[1]);
    
    if (entries.length === 0) {
      tbody.innerHTML = '<tr><td colspan="2" style="color:#999;">ยังไม่มีข้อมูล</td></tr>';
    } else {
      tbody.innerHTML = entries.map(([name, stars]) => `
        <tr>
          <td>${name}</td>
          <td>${stars} ⭐</td>
        </tr>
      `).join('');
    }
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  initApp();
</script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9a57bbdf904f7329',t:'MTc2NDMxMDU1OS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
