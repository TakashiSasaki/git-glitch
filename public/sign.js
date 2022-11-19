async function generateRegistrationOptions() {
  const x = await fetch("generateRegistrationOptions", {});
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
  x.user = { name: "unknown_user_name", displayName: "Unknown User Name",
           id: Uint8Array.from("unknown_user_id")};
  const cred = await navigator.credentials.create({
    publicKey: x,
  });

  document.querySelector("#signature").value = 5;
}
