async function generateRegistrationOptions() {
  const x = await fetch("generateRegistrationOptions", {});
  x.json().then((y) => {
    document.querySelector("#textareaRegistrationOptions").value = JSON.stringify(y);
  });
}

async function createSignature(){
  alert(1);
  const x = JSON.parse(document.querySelector("#textareaRegistrationOptions").value);
  const cred = await navigator.credentials.create({
    publicKey: x
  });
  alert(cred);
}