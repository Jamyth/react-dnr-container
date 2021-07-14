/** @type {import('eslint').Linter.Config} */
const config = {
    ignorePatterns: ['**/node_modules/**', '**/dist/**'],
    extends: ['iamyth/preset/react'],
    root: true,
};

module.exports = config;