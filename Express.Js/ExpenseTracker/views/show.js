async function onsignup(event) {
  event.preventDefault();

  const expense = event.target.Expense.value;
  const description = event.target.Description.value;
  const category = event.target.Category.value;

  myObj = {
    expense,
    description,
    category,
  };

  if (expense && description && category) {
    try {
      const response = await axios.post(
        "http://localhost:9000/users/createUser",
        myObj
      );
      console.log(response);
      event.target.reset(); // Reset the form after the submission
      onScreenFunction(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // console.log('sdfdsfsdfdf');
    const response = await axios.get("http://localhost:9000/getUsers");
    console.log(response);
    response.data.forEach((element) => {
      onScreenFunction(element);
    });
  } catch (err) {
    console.error(err);
  }
});

async function onScreenFunction(upprWala) {
  const ul = document.getElementById("listOnScreen");

  const li = document.createElement("li");
  li.innerHTML = `Expense:${upprWala.expense}   Description:${upprWala.description}   Category:${upprWala.category}`;

  const delBtn = document.createElement("input");
  delBtn.value = "Delete";
  delBtn.type = "button";
  delBtn.onclick = async () => {
    try {
      await axios.delete(`http://localhost:9000/deleteUser/${upprWala.id}`);
      ul.removeChild(li);
    } catch (err) {
      console.error(err);
    }
  };

  const editBtn = document.createElement("input");
  editBtn.value = "Edit";
  editBtn.type = "button";
  editBtn.onclick = async () => {
    try {
      await axios.delete(`http://localhost:9000/deleteUser/${upprWala.id}`);
      ul.removeChild(li);
    } catch (err) {
      console.error(err);
    }
    document.getElementById("Expense").value = upprWala.expense;
    document.getElementById("Description").value = upprWala.description;
    document.getElementById("Category").value = upprWala.category;
  };

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}
