wal((event) => {
  dq("#input").addEventListener("change", (event) => {
    fetch("lookup", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: event.target.value,
    })
      .then((response) => response.json())
      .then((data) => {
        dq("#output").value = JSON.stringify(data);
      });
  });
});
