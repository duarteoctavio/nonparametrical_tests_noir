/** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  semi: true,
  printWidth: 100,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
