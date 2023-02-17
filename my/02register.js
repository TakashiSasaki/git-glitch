//import { _fetch, registerCredential, unregisterCredential } from "/clients.js";

export const registerCredential = async () => {
  const opts = {
    attestation: "none",
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
      requireResidentKey: false,
    },
  };
  //const options = await _fetch("/auth/registerRequest", opts);
  const options = await fetch("/auth/registerRequest", {
    method: "POST",
    body: JSON.stringify(opts),
  }).then((response) => response.json());

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
  await fetch("/auth/registerResponse", {
    
  })
};

window.addEventListener("load", (event) => {
  document.querySelector("button").addEventListener("click", (event) => {
    registerCredential();
  });
});
