async function onSignUp(event) {
  event.preventDefault();

  const price = event.target.Price.value;
  const name = event.target.Name.value;

  const myObj = {
    name,
    price,
  };

  const response = await axios.post("http://localhost:50/createItem", myObj);
  //   console.log(response)
  event.target.reset();
  onScreenFunction(response.data);
}
document.addEventListener("DOMContentLoaded", async () => {
  const response = await axios.get("http://localhost:50/getItems/");
  console.log(response);
  response.data.forEach((element) => {
    onScreenFunction(element);
  });
});

let totalPrice = 0;

async function onScreenFunction(upprWala) {
  const ul = document.getElementById("Products");

  const li = document.createElement("li");
  li.innerHTML = `${upprWala.name} ${upprWala.price}`;

  const delBtn = document.createElement("input");
  delBtn.value = "Delete";
  delBtn.type = "Button";
  delBtn.onclick = async () => {
    await axios.delete(`http://localhost:50/deleteItem/${upprWala.id}`);
    ul.removeChild(li);
    totalPrice -= upprWala.price;
    total.innerHTML = `Total Price: Rs.${totalPrice}`;
  };
  li.appendChild(delBtn);
  ul.appendChild(li);
  totalPrice += Number(upprWala.price);
  total.innerHTML = `Total Price: Rs.${totalPrice}`;
}
