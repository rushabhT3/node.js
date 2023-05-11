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
    if (response.status === 200) {
      alert(response.data.message);
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    document.body.innerHTML += `<div style="color:red">${error.message}</div>`;
  }
}
