async function login(event) {
  try {
    event.preventDefault();

    const loginDetails = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const response = await axios.post(
      "http://localhost:3000/user/login",
      loginDetails
    );
    alert(response.data.message);
    event.target.reset();
    // if (response.status === 404) {
    //   console.log("ddsfd");
    //window.location.href can also be used to change the URL of the current web page by assigning a new value to it.
    // }
  } catch (error) {
    console.log(JSON.stringify(error));
    document.body.innerHTML += `<div style="color:red">${error.message}</div>`;
    // window.location.href = "../signUp/signUp.html";
  }
}
