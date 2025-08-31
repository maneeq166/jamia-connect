let BACKEND_URL;

console.log("VITE_ENV:", import.meta.env.VITE_ENV);
console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);
console.log("VITE_PROD_BACKEND_URL:", import.meta.env.VITE_PROD_BACKEND_URL);


if (import.meta.env.VITE_ENV === "development") {
  BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
} else {
  BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL;
}

console.log(BACKEND_URL);
export default BACKEND_URL;

