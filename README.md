<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Good Student Stars - Student Dashboard</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f6fa; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px 24px; }
    h1 { color: #27589c; text-align: center; }
    .balance { text-align: center; font-size: 2em; margin-bottom: 8px; color: #ffbf00;}
    table { width: 100%; margin: 10px 0 24px 0; border-collapse: collapse;}
    th, td { padding: 8px 8px; }
    th { background: #f4f6fa; }
    tr:nth-child(even) { background: #f9f9f9; }
    .redemption-form { margin: 18px 0;}
    .star-positive { color: #30b030; }
    .star-negative { color: #d03b3b; }
    label { margin-right: 10px; font-weight: bold;}
    select, button { padding: 6px 12px; border-radius: 4px; border: 1px solid #ccc;}
    button { background: #27589c; color: #fff; }
    .reward-opt { font-size: 1em; }
    .history-list, .redeem-list { list-style: none; padding: 0; }
    .success-msg { color: #15803d; margin-top: 8px;}
    .pending { color: #edb50a; }
    .approved { color: #22c55e; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Good Student Stars</h1>
    <div class="balance" id="star-balance">⭐ 30 Stars</div>
    
    <h3>Star History</h3>
    <table id="star-history">
      <tr>
        <th>Date</th>
        <th>Amount</th>
        <th>Reason</th>
        <th>Given By</th>
      </tr>
      <!-- rows will be inserted by JS -->
    </table>
    
    <div class="redemption-form">
      <h3>Redeem your Stars</h3>
      <form id="redeem-form">
        <label>Choose reward:
          <select id="reward-select">
            <option value="break">5-minute break (10 stars)</option>
            <option value="stationery">Stationery coupon (12 stars)</option>
            <option value="food">Food/drink coupon (15 stars)</option>
          </select>
        </label>
        <button type="submit">Redeem</button>
      </form>
      <div class="success-msg" id="redeem-msg"></div>
    </div>
    <h3>Your Redemptions</h3>
    <table>
      <thead>
        <tr><th>Reward</th><th>Date</th><th>Status</th></tr>
      </thead>
      <tbody id="redemption-history">
        <!-- rows will be injected by JS -->
      </tbody>
    </table>
  </div>
  <script>
    // Demo Data -- In real system, this comes from the backend
    let starHistory = [
      {date: '2025-11-20', amount: +1, reason:'Helped classmate', teacher:'Mrs. Lee'},
      {date: '2025-11-22', amount: -1, reason:'Late homework', teacher:'Mr. Jones'},
      {date: '2025-11-25', amount: +2, reason:'Excellent project', teacher:'Mrs. Smith'}
    ];
    let redemptions = [
      {reward: '5-minute break', date: '2025-11-27', status: 'pending'},
      {reward: 'Stationery coupon', date: '2025-11-15', status: 'approved'},
    ];
    let rewards = {
      break: { label:"5-minute break", cost:10 },
      stationery: { label:"Stationery coupon", cost:12 },
      food: { label:"Food/drink coupon", cost:15 }
    };

    function updateStarBalance() {
      let stars = starHistory.reduce((sum, tx) => sum + tx.amount, 0);
      document.getElementById('star-balance').textContent = `⭐ ${stars} Stars`;
    }
    function renderStarHistory() {
      let rows = '';
      for (let tx of starHistory) {
        rows += `<tr>
          <td>${tx.date}</td>
          <td class="${tx.amount>0?'star-positive':'star-negative'}">${tx.amount>0?'+':''}${tx.amount}</td>
          <td>${tx.reason}</td>
          <td>${tx.teacher}</td>
        </tr>`;
      }
      document.getElementById('star-history').innerHTML += rows;
    }
    function renderRedemptions() {
      let rows = '';
      for (let r of redemptions) {
        rows += `<tr>
          <td>${r.reward}</td>
          <td>${r.date}</td>
          <td class="${r.status}">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</td>
        </tr>`;
      }
      document.getElementById('redemption-history').innerHTML = rows;
    }

    document.getElementById('redeem-form').onsubmit = function(e) {
      e.preventDefault();
      let sel = document.getElementById('reward-select');
      let rewardKey = sel.value;
      let cost = rewards[rewardKey].cost || 0;
      let stars = starHistory.reduce((sum, tx) => sum + tx.amount, 0);
      let msg = document.getElementById('redeem-msg');
      if (stars >= cost) {
        // Deduct stars and add redemption history (Demo only!)
        starHistory.push({date: new Date().toISOString().slice(0,10), amount: -cost, reason: 'Redemption: '+rewards[rewardKey].label, teacher:'System'});
        redemptions.unshift({reward: rewards[rewardKey].label, date: new Date().toISOString().slice(0,10), status: 'pending'});
        updateStarBalance();
        document.getElementById('star-history').innerHTML =
          `<tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Given By</th>
          </tr>`;
        renderStarHistory();
        renderRedemptions();
        msg.textContent = "Redemption submitted for approval!";
      } else {
        msg.textContent = "Not enough stars for this reward.";
      }
      setTimeout(()=>{ msg.textContent = ""; }, 2500);
    };

    // Initial render
    updateStarBalance();
    renderStarHistory();
    renderRedemptions();
  </script>
</body>
</html>
