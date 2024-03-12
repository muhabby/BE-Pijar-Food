module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        // "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        // "stylelint-config-standard"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}
