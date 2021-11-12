module.exports = {
  extends: ["airbnb-base", "plugin:jest/recommended"],
  plugins: ["jest"],
  env: {
    browser: true,
  },
  globals: {
    page: true,
  },
};