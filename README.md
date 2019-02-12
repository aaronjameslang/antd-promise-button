# 🥑 antd-promise-button [![Typed](https://img.shields.io/npm/types/antd-promise-button.svg)]() 

[![Build Status](https://travis-ci.org/aaronjameslang/antd-promise-button.svg?branch=master)](https://travis-ci.org/aaronjameslang/antd-promise-button)
[![Maintainability](http://api.codeclimate.com/v1/badges/7448d8dedd399ce1889b/maintainability)](//codeclimate.com/github/aaronjameslang/antd-promise-button/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7448d8dedd399ce1889b/test_coverage)](//antd-promise-button.netlify.com/coverage/lcov-report)
[![Known Vulnerabilities](http://snyk.io/test/github/aaronjameslang/antd-promise-button/badge.svg)](//snyk.io/test/github/aaronjameslang/antd-promise-button)
[![Netlify Status](https://api.netlify.com/api/v1/badges/deaec922-cae4-4fab-967e-c8ffd6ac037d/deploy-status)](https://app.netlify.com/sites/antd-promise-button/deploys)

A Promising Button Component ([Demo](//antd-promise-button.netlify.com/storybook))

## Why?

Promise buttons can be used to make many interfaces feel more responsive and intuitive.

When the user clicks a promise button, a loading spinner is shown and the button is disabled.
This feedback assures the user that their action is being processed,
and prevents accidental double-clicks and other bugs.

If the action is successful, the button turns green and shows a success message. This makes the page feel more responsive while the user waits for data to load, the page to redirection or other slow processes to complete.

If the action is unsuccessful, the button will turn red and show an error message.

## Installation [![npm version](https://badge.fury.io/js/antd-promise-button.svg)](//npmjs.com/package/antd-promise-button)

```shell
npm i antd-promise-button
```

## Usage [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](//antd-promise-button.netlify.com/storybook)

See the [demo](//antd-promise-button.netlify.com/storybook) for live examples

```js
import { Button } from 'antd-promise-button';
import 'antd/lib/button/style/css' // Don't forget styles!

// In the simplest case, you just need to return a promise
//   from your onClick handler
const onClick = () => new Promise(res => setTimeout(res, 1000))
return <Button onClick={onClick}>Click Me!</Button>

// For better UX, customise the labels based on the status
return (
  <Button
    type="primary"
    onClick={login}
    labels={{
      [Button.FULFILLED]: 'Logged In',
      [Button.INITIALISED]: 'Log In',
      [Button.PENDING]: 'Logging In',
      [Button.REJECTED]: 'Log In Failed',
    }}
  />
)

// You can even customise the green/red colors
return (
  <Button
    onClick={signUp}
    labels={{
      [Button.FULFILLED]: 'Signed Up',
      [Button.INITIALISED]: 'Sign Up',
      [Button.PENDING]: 'Signing Up',
      [Button.REJECTED]: 'Sign Up Failed',
    }}
    colors={{
      [Button.FULFILLED]: '#00FF00',
      [Button.REJECTED]: '#FF69B4',
    }}
  />
)
```

Promise button is backwards compatible, if your onClick handler doesn't
return a promise, it behaves just like a normal button.

## Contribution & Feedback [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg)](https://conventionalcommits.org)

Question? Bug? Feature request? Not sure? [Open an issue!](//github.com/aaronjameslang/antd-promise-button/issues/new)

If this is *almost* what you were looking for, let me know and I can probably help!

Pull requests welcome, but please get in touch first. I don't want to waste your time 😁

See the code on [GitHub](//github.com/aaronjameslang/antd-promise-button)


