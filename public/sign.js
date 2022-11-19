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
  x.challenge = atob(x.challenge.replace("-","+").replace("_","/"));
  const cred = await navigator.credentials.create({
    publicKey: x,
  });

  document.querySelector("#signature").value = 5;
}
