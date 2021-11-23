export const GetVolunteers = (email: string) => {
  const requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "collector-email": email,
    },
  };
  return requestOption;
};
