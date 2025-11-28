<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>StarTrack DEMO</title>

<!-- สามารถใช้บน GitHub Pages ได้ -->
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
body {
  font-family: 'Sarabun', Arial, sans-serif;
  background: linear-gradient(135deg,#f4eaff,#d3ecfd);
  color: #444;
  margin: 0;
}
header {
  text-align: center;
  background: #fcecfb;
  border-bottom:2px solid #e5d9f7;
  padding-top:1.7em; padding-bottom:.3em;
}
h1 { color: #a645ae; margin:1.5em 0 .1em 0;}
nav { text-align:center; padding:1.1em; background:#f2f7fd; }
.rolebtn {
  background:#e9dfff;
  color: #86398e;
  font-size:1.19em;
  border:none;
  border-radius:11px;
  padding:.8em 2.2em;
  margin:.4em;
  cursor:pointer;
}
.rolebtn:hover {background: #e4e5ff;}

section {
  max-width: 930px;
  margin: 2em auto;
  background: #fffefe;
  border-radius: 23px;
  padding:2em 2.2em;
  box-shadow: 0 4px 25px #e4eaf4cc;
}
.box {
  background: #f7f9fd;
  border-radius: 15px;
  padding:1.35em 2em;
  margin-bottom:2em;
  box-shadow:0 1px 18px #e7e1fa60;
}
</style>
</head>

<body>
<header>
  <h1>StarTrack DEMO</h1>
  <div style="color:#a14f88;">ระบบติดตามอารมณ์และดาวเด็กดี</div>
</header>

<nav>
  <button class="rolebtn" onclick="switchRole('student')">👦 นักเรียน</button>
  <button class="rolebtn" onclick="switchRole('teacher')">👩‍🏫 ครู</button>
  <button class="rolebtn" onclick="switchRole('admin')">🏫 ผู้บริหาร</button>
  <button class="rolebtn" style="background:#e67c96;color:white;float:right;" onclick="location.reload()">ออกจากระบบ</button>
</nav>

<!-- ===================== STUDENT ===================== -->
<section id="student-section" style="display:none">
  <div class="box">
    <h2>นักเรียน</h2>
    <!-- ⭐ วางโค้ดฟีเจอร์จริงของนักเรียน เช่น อารมณ์ รายงานประจำวัน กราฟ ฯลฯ -->
    <div>กรุณานำโค้ดฟีเจอร์ student มาใส่ที่นี่</div>
  </div>
</section>

<!-- ===================== TEACHER ===================== -->
<section id="teacher-section" style="display:none">
  <div class="box">
    <h2>ครู</h2>
    <!-- ⭐ วางโค้ดฟีเจอร์จริงของครู เช่น dashboard class ห้องเรียน สถิติ ฯลฯ -->
    <div>กรุณานำโค้ดฟีเจอร์ teacher มาใส่ที่นี่</div>
  </div>
</section>

<!-- ===================== ADMIN ===================== -->
<section id="admin-section" style="display:none">
  <div class="box">
    <h2>ผู้บริหาร</h2>
    <!-- ⭐ วางโค้ดฟีเจอร์จริงของ admin เช่น ภาพรวมสถานศึกษา Big Data -->
    <div>กรุณานำโค้ดฟีเจอร์ admin มาใส่ที่นี่</div>
  </div>
</section>

<script>
/* -------------------- SWITCH ROLE -------------------- */
function switchRole(role) {
  document.getElementById("student-section").style.display = "none";
  document.getElementById("teacher-section").style.display = "none";
  document.getElementById("admin-section").style.display = "none";

  if (role === "student") document.getElementById("student-section").style.display = "block";
  if (role === "teacher") document.getElementById("teacher-section").style.display = "block";
  if (role === "admin") document.getElementById("admin-section").style.display = "block";
}

/* ----- ถ้าจะใช้ Pie Chart ----- */
function drawPie(elementId, labels, values) {
  new Chart(document.getElementById(elementId), {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: ["#b1e5e0","#a651b1","#ffd7ef","#ffe780","#bfffa5","#8dd6ee"]
        }
      ]
    }
  });
}
</script>

</body>
</html>
