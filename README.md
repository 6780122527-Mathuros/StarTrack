
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>StarTrack DEMO</title>

<!-- FIX: Tailwind CDN เวอร์ชันเสถียร -->
<script src="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.10/dist/tailwind.min.js"></script>

<!-- Google Font -->
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- FIX: Chart.js เวอร์ชันที่ทำงานบน GitHub Pages แน่นอน -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<style>
body {
  font-family: 'Sarabun', Arial, sans-serif;
  background: linear-gradient(135deg,#f4eaff,#d3ecfd);
  color: #444;
}
</style>
</head>

<body class="pb-20">

<header class="text-center bg-pink-100 border-b-2 border-purple-200 py-6">
  <h1 class="text-4xl font-bold text-purple-600">StarTrack DEMO</h1>
  <p class="text-pink-700 text-lg">ระบบติดตามอารมณ์และดาวเด็กดี</p>
</header>

<nav class="text-center bg-blue-50 py-4 sticky top-0 shadow z-50">
  <button onclick="switchRole('student')" class="px-6 py-2 mx-1 rounded-lg bg-purple-100 hover:bg-purple-200">👦 นักเรียน</button>
  <button onclick="switchRole('teacher')" class="px-6 py-2 mx-1 rounded-lg bg-purple-100 hover:bg-purple-200">👩‍🏫 ครู</button>
  <button onclick="switchRole('admin')" class="px-6 py-2 mx-1 rounded-lg bg-purple-100 hover:bg-purple-200">🏫 ผู้บริหาร</button>
  <button onclick="location.reload()" class="px-5 py-2 bg-red-400 text-white rounded-lg float-right">ออกจากระบบ</button>
</nav>

<!-- STUDENT -->
<section id="student-section" class="max-w-3xl mx-auto mt-8 hidden">

  <div class="bg-white shadow-xl rounded-2xl p-6 mb-6">
    <h2 class="text-2xl font-bold text-purple-700 mb-3">เลือกอารมณ์วันนี้</h2>
    <div class="flex space-x-3 text-4xl">
      <button onclick="selectEmotion('happy')" class="emotion">😄</button>
      <button onclick="selectEmotion('normal')" class="emotion">😐</button>
      <button onclick="selectEmotion('sad')" class="emotion">😢</button>
      <button onclick="selectEmotion('angry')" class="emotion">😡</button>
      <button onclick="selectEmotion('surprise')" class="emotion">😲</button>
    </div>

    <button onclick="saveEmotion()" class="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg">บันทึกอารมณ์</button>
    <p id="emotion-msg" class="mt-2 text-green-600"></p>
  </div>

  <div class="bg-white shadow-xl rounded-2xl p-6 mb-6">
    <h2 class="text-2xl font-bold text-purple-700 mb-3">ไดอารี่ประจำวัน</h2>
    <textarea id="diary-input" class="w-full h-28 p-3 border rounded-lg border-purple-200" placeholder="เขียนความรู้สึกของวันนี้…"></textarea>

    <button onclick="saveDiary()" class="mt-3 px-5 py-2 bg-purple-600 text-white rounded-lg">บันทึก</button>

    <div id="diary-list" class="mt-4"></div>
  </div>

  <div class="bg-white shadow-xl rounded-2xl p-6 mb-6">
    <h2 class="text-2xl font-bold text-purple-700 mb-3">⭐ ดาวเด็กดี</h2>
    <button onclick="addStar()" class="px-5 py-2 bg-yellow-400 text-black rounded-lg">เพิ่มดาว</button>
    <p id="star-count" class="text-xl mt-2 text-purple-700"></p>
  </div>

</section>

<!-- TEACHER -->
<section id="teacher-section" class="max-w-3xl mx-auto mt-8 hidden">
  <div class="bg-white shadow-xl rounded-2xl p-6 mb-6">
    <h2 class="text-2xl font-bold text-purple-700 mb-4">รายชื่อนักเรียน</h2>

    <table class="w-full text-center border">
      <thead>
        <tr class="bg-purple-100">
          <th class="border py-2">ชื่อ</th>
          <th class="border py-2">อารมณ์ล่าสุด</th>
          <th class="border py-2">ดาว</th>
          <th class="border py-2">ดูไดอารี่</th>
        </tr>
      </thead>
      <tbody id="teacher-student-table"></tbody>
    </table>
  </div>

  <div class="bg-white shadow-xl rounded-2xl p-6">
    <h2 class="text-2xl font-bold text-purple-700 mb-3">ไดอารี่ของนักเรียน</h2>
    <div id="teacher-diary"></div>
  </div>
</section>

<!-- ADMIN -->
<section id="admin-section" class="max-w-3xl mx-auto mt-8 hidden">

  <div class="bg-white shadow-xl rounded-2xl p-6 mb-6">
    <h2 class="text-2xl font-bold text-purple-700">สถิติอารมณ์รวม</h2>
    <canvas id="chart-emotion" class="mt-4"></canvas>
  </div>

  <div class="bg-white shadow-xl rounded-2xl p-6">
    <h2 class="text-2xl font-bold text-purple-700">ตารางดาวเด็กดี</h2>

    <table class="w-full text-center border mt-3">
      <thead>
        <tr class="bg-purple-100">
          <th class="border py-2">ชื่อ</th>
          <th class="border py-2">ดาว</th>
        </tr>
      </thead>
      <tbody id="admin-star-table"></tbody>
    </table>
  </div>
</section>

<!-- JAVASCRIPT -->
<script>
let db = JSON.parse(localStorage.getItem("startrackDB")) || {
  students: {
    "เด็ก A": { emotion:"", diary:[], stars:0 },
    "เด็ก B": { emotion:"", diary:[], stars:0 },
    "เด็ก C": { emotion:"", diary:[], stars:0 }
  }
};

let selectedEmotion = "";

function switchRole(role){
  document.querySelectorAll("section").forEach(sec=>sec.classList.add("hidden"));
  document.getElementById(role+"-section").classList.remove("hidden");

  if(role==="student") loadStudent();
  if(role==="teacher") loadTeacher();
  if(role==="admin") loadAdmin();
}

function selectEmotion(e){
  selectedEmotion = e;
}

function saveEmotion(){
  db.students["เด็ก A"].emotion = selectedEmotion;
  localStorage.setItem("startrackDB", JSON.stringify(db));
  document.getElementById("emotion-msg").innerText = "✔ บันทึกแล้ว";
}

function saveDiary(){
  let txt = document.getElementById("diary-input").value;
  if(!txt) return;

  db.students["เด็ก A"].diary.push({
    text: txt,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("startrackDB", JSON.stringify(db));
  document.getElementById("diary-input").value="";
  loadStudent();
}

function loadStudent(){
  let list = document.getElementById("diary-list");
  list.innerHTML = "";

  db.students["เด็ก A"].diary.forEach((d,i)=>{
    list.innerHTML += `
      <div class="bg-purple-50 p-3 rounded-xl mb-2 border">
        <div class="font-bold">${d.date}</div>
        ${d.text}
      </div>`;
  });

  document.getElementById("star-count").innerText =
    "จำนวนดาว: " + db.students["เด็ก A"].stars;
}

function addStar(){
  db.students["เด็ก A"].stars++;
  localStorage.setItem("startrackDB", JSON.stringify(db));
  loadStudent();
}

function loadTeacher(){
  let tb = document.getElementById("teacher-student-table");
  tb.innerHTML = "";

  for(let name in db.students){
    let st = db.students[name];
    tb.innerHTML += `
      <tr>
        <td class="border py-2">${name}</td>
        <td class="border py-2">${st.emotion || "-"}</td>
        <td class="border py-2">${st.stars}</td>
        <td class="border py-2">
          <button onclick="showDiary('${name}')" class="px-3 py-1 bg-purple-300 rounded-lg">ดู</button>
        </td>
      </tr>`;
  }
}

function showDiary(name){
  let box = document.getElementById("teacher-diary");
  box.innerHTML = `<h3 class="text-xl font-bold mb-2">${name}</h3>`;

  db.students[name].diary.forEach(d=>{
    box.innerHTML += `
      <div class="bg-purple-50 p-3 rounded-xl mb-2 border">
        <div class="font-bold">${d.date}</div>
        ${d.text}
      </div>`;
  });
}

function loadAdmin(){
  loadAdminStarTable();
  drawChart();
}

function loadAdminStarTable(){
  let tb = document.getElementById("admin-star-table");
  tb.innerHTML = "";

  for(let s in db.students){
    tb.innerHTML += `
      <tr>
        <td class="border py-2">${s}</td>
        <td class="border py-2">${db.students[s].stars}</td>
      </tr>`;
  }
}

function drawChart(){
  let counts = {happy:0, normal:0, sad:0, angry:0, surprise:0};

  for(let s in db.students){
    let e = db.students[s].emotion;
    if(e) counts[e]++;
  }

  new Chart(document.getElementById("chart-emotion"), {
    type:"pie",
    data:{
      labels:["ดีใจ", "เฉยๆ", "เศร้า", "โกรธ", "ประหลาดใจ"],
      datasets:[{
        data:[ counts.happy, counts.normal, counts.sad, counts.angry, counts.surprise ],
        backgroundColor:["#ffc2df","#b1e5e0","#ffd480","#ff9999","#cdb6ff"]
      }]
    }
  });
}
</script>

</body>
</html>
