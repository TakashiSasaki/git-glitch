//import { _fetch, registerCredential, unregisterCredential } from "/clients.js";

const registerCredential = async () => {
  const opts = {
    attestation: "none",
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
      requireResidentKey: false,
    },
  };
  //const options = await _fetch("/auth/registerRequest", opts);
  const response1Promise = await fetch("/auth/registerRequest", {
    method: "POST",
    body: JSON.stringify(opts),
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
  const options = await response1Promise.json();

  options.user.id = base64url.decode(options.user.id);
  options.challenge = base64url.decode(options.challenge);

  if (options.excludeCredentials) {
    for (let cred of options.excludeCredentials) {
      cred.id = base64url.decode(cred.id);
    }
  }
  const cred = await navigator.credentials.create({
    publicKey: options,
  });

  const credential = {};
  credential.id = cred.id;
  credential.rawId = base64url.encode(cred.rawId);
  credential.type = cred.type;

  if (cred.response) {
    const clientDataJSON = base64url.encode(cred.response.clientDataJSON);
    const attestationObject = base64url.encode(cred.response.attestationObject);
    credential.response = {
      clientDataJSON,
      attestationObject,
    };
  }

  localStorage.setItem(`credId`, credential.id);

  //return await _fetch("/auth/registerResponse", credential);
  const response2Promise = await fetch("/auth/registerResponse", {
    method: "POST",
    body: JSON.stringify(credential),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response2Promise.json();
  return result;
};

window.addEventListener("load", (event) => {
  document.querySelector("button").addEventListener("click", (event) => {
    const result = registerCredential();
    document.querySelector("textarea").value = result;
  });
});
