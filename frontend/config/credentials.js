const shouldSendCredentials =
  import.meta.env.VITE_ENV === "development" ||
  import.meta.env.VITE_ENV === "production";

export default shouldSendCredentials;
