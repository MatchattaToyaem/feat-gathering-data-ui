export const DeleteVolunteer = (name: string) =>
  new Promise((resolve, reject) => {
    const requestOption = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "delete-name": name },
    };
    fetch("http://localhost:8080/volunteers", requestOption)
      .then((response) => {
        if (response.ok) resolve(response);
        reject(response);
      })
      .catch((response) => {
        reject(response);
      });
  });
