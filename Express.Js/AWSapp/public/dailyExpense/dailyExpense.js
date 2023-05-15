document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const decodeToken = parseJwt(token);
  console.log(decodeToken);
  const response = await axios.get("http://localhost:3000/dailyExpense", {
    headers: { Authorization: token },
  });
  response.data.forEach((element) => {
    onScreenFunction(element);
  });
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
  onScreenFunction(response.data);
}

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

async function onScreenFunction(expense) {
  const token = localStorage.getItem("token");

  const ul2 = document.querySelector("#list");

  const li = document.createElement("li");
  li.innerHTML = `${expense.amount}  ${expense.description}  ${expense.category}`;

  const delBtn = document.createElement("input");
  delBtn.value = "Delete";
  delBtn.type = "button";
  delBtn.onclick = async () => {
    ul2.removeChild(li);
    await axios.delete(`http://localhost:3000/deleteExpense/${expense.id}`, {
      headers: { Authorization: token },
    });
  };

  li.appendChild(delBtn);
  ul2.appendChild(li);
}
