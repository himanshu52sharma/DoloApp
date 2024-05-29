module.exports = {
  "no-unused-vars": [
    "error",
    {
        "ignoreRestSiblings": true,
        "destructuredArrayIgnorePattern": "[A-Z]",
        "caughtErrors": "none"
    }
],


  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
  },
};

