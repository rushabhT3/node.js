async function dailyExpense(event) {
  event.preventDefault();

  const obj = {
    amount: event.target.amount.value,
    description: event.target.description.value,
    category: event.target.category.value,
  };

  const response = await axios.post("http://localhost:3000/dailyExpense", obj);
  onScreenFunction(response.data);
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await axios.get("http://localhost:3000/dailyExpense");
  response.data.forEach((element) => {
    onScreenFunction(element);
  });
});

async function onScreenFunction(expense) {
  // const ul = document.querySelector("#money-minus");
  const ul2 = document.querySelector("#list");

  const li = document.createElement("li");
  li.innerHTML = `${expense.amount}  ${expense.description}  ${expense.category}`;

  const delBtn = document.createElement("input");
  delBtn.value = "Delete";
  delBtn.type = "button";
  delBtn.onclick = async () => {
    ul2.removeChild(li);
    await axios.delete(`http://localhost:3000/deleteExpense/${expense.id}`);
    // ul.removeChild(li);
  };

  li.appendChild(delBtn);
  // ul.appendChild(li);
  ul2.appendChild(li);
}
