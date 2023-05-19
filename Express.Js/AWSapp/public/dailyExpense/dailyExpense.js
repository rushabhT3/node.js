function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const decodeToken = parseJwt(token);
  // console.log(decodeToken);
  const response = await axios.get("http://localhost:3000/dailyExpense", {
    headers: { Authorization: token },
  });
  response.data.forEach((element) => {
    onScreenFunction(element);
  });
  const ispremiumuser = decodeToken.ispremiumuser;
  // console.log({ decodeToken, ispremiumuser });
  if (ispremiumuser) {
    showPremiumuserMessage();
    showLeaderboard();
  }
});

async function dailyExpense(event) {
  event.preventDefault();

  const obj = {
    amount: event.target.amount.value,
    description: event.target.description.value,
    category: event.target.category.value,
  };

  const token = localStorage.getItem("token");
  const response = await axios.post("http://localhost:3000/dailyExpense", obj, {
    headers: { Authorization: token },
  });
  event.target.reset();
  onScreenFunction(response.data);
}

function showPremiumuserMessage() {
  const button = document.getElementById("rzp-button1");

  const text = document.createTextNode("You are a premium user");

  const crownIcon = document.createElement("i");
  crownIcon.classList.add("fas", "fa-crown");
  crownIcon.style.marginLeft = "5px";

  button.innerHTML = ""; // Clear existing content.
  button.appendChild(text);
  button.appendChild(crownIcon);

  // Remove event listener
  button.onclick = null;
}

function showLeaderboard() {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Show Leaderboard";
  button.addEventListener("click", handleLeaderboardClick);

  const ldrBtn = document.getElementById("leaderboard");
  ldrBtn.appendChild(button);
}

async function handleLeaderboardClick() {
  try {
    const token = localStorage.getItem("token");
    const leaderBoardBEData = await axios.get(
      "http://localhost:3000/premium/showLeaderBoard",
      { headers: { Authorization: token } }
    );
    const leaderboardHtml = document.getElementById("leaderboard");

    // ? check kr rhe leaderbrd list hain ya nahi
    const leaderboardList = document.getElementById("leaderboardList");
    if (leaderboardList) {
      leaderboardHtml.removeChild(leaderboardList);
    }

    // ? nahi hain toh bana rhe and uppr me existing check kr rhe jo yaha pr bani hogi
    const newLeaderboardList = document.createElement("ul");
    newLeaderboardList.setAttribute("id", "leaderboardList");
    newLeaderboardList.innerHTML = "<h1>Leader Board</h1>";

    leaderBoardBEData.data.forEach((element) => {
      newLeaderboardList.innerHTML += `<li>Name - ${
        element.name
      }     Total Expense - ${element.total_cost || 0}</li>`;
    });
    leaderboardHtml.appendChild(newLeaderboardList);
  } catch (error) {
    console.log("Error fetching leaderboard data:", error);
  }
}

async function onScreenFunction(expense) {
  const token = localStorage.getItem("token");

  const ul2 = document.querySelector("#list");

  const li = document.createElement("li");
  li.innerHTML = `${expense.amount}  ${expense.description}  ${expense.category}`;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";

  const icon = document.createElement("span");
  icon.className = "fas fa-trash";
  icon.style.marginLeft = "5px";

  delBtn.appendChild(icon);

  delBtn.onclick = async () => {
    await axios.delete(`http://localhost:3000/deleteExpense/${expense.id}`, {
      headers: { Authorization: token },
    });
    ul2.removeChild(li);
  };

  li.appendChild(delBtn);
  ul2.appendChild(li);
}

document.getElementById("rzp-button1").onclick = async function (e) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/purchase/premiummembership",
      { headers: { Authorization: token } }
    );
    console.log(response.data);
    var options = {
      key: response.data.key_id, // Enter the Key ID generated from the Dashboard
      order_id: response.data.order.id, // For one time payment
      description: "Laxmi chit fund",
      image:
        "https://getmemetemplates.com/wp-content/uploads/2020/01/20200114_112012-1-1226x584.jpg",
      prefill: {
        email: "gaurav.kumar@ekkadouble.com",
        contact: +919900000000,
      },
      config: {
        display: {
          blocks: {
            utib: {
              //name for Axis block
              name: "Pay using Axis Bank",
              instruments: [
                {
                  method: "card",
                  issuers: ["UTIB"],
                },
                {
                  method: "netbanking",
                  banks: ["UTIB"],
                },
              ],
            },
            other: {
              //  name for other block
              name: "Other Payment modes",
              instruments: [
                {
                  method: "card",
                  issuers: ["ICIC"],
                },
                {
                  method: "netbanking",
                },
              ],
            },
          },
          hide: [
            {
              method: "upi",
            },
          ],
          sequence: ["block.utib", "block.other"],
          preferences: {
            show_default_blocks: false, // Should Checkout show its default blocks?
          },
        },
      },
      handler: async function (response) {
        const res = await axios.post(
          "http://localhost:3000/purchase/updatetransactionstatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
        alert("You are a Premium User now! Congrats:)");
        // console.log({ responseData: res.data, token });
        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem("token"));
      },
      modal: {
        ondismiss: function () {
          if (confirm("Are you sure, you want to close the form?")) {
            txt = "You pressed OK!";
            console.log("Checkout form closed by the user");
          } else {
            txt = "You pressed Cancel!";
            console.log("Complete the Payment");
          }
        },
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    showPremiumuserMessage();
    showLeaderboard();
  } catch (error) {
    console.log("problem in the dailyExpenseJs");
  }
};
