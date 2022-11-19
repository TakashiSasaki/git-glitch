async function generateRegistrationOptions() {
  const x = await fetch("generateRegistrationOptions", {
    credentials: "same-origin",
  });
  x.json().then((y) => {
    document.querySelector("#textareaRegistrationOptions").value =
      JSON.stringify(y);
  });
}

async function createSignature() {
  const x = JSON.parse(
    document.querySelector("#textareaRegistrationOptions").value
  );
  x.challenge = base64url.decode(x.challenge);
  x.user.id = Uint8Array.from()
  //x.user = { name: "unknown_user_name", displayName: "Unknown User Name",
  //         id: Uint8Array.from("unknown_user_id")};
  navigator.credentials.create({
    publicKey: x,
  }).then(credentials => {
    document.querySelector("#signature").value = credentials;
  }).catch(error => {
    document.querySelector("#signature").value = error;
  });
}
