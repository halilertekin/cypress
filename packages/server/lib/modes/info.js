/* eslint-disable no-console */
const launcher = require('@packages/launcher')
const pluralize = require('pluralize')
const { stripIndent } = require('common-tags')
const { sortWith, ascend, prop } = require('ramda')
const appData = require('../util/app_data')
const browserUtils = require('../browsers/utils')

const print = (browsers = []) => {
  console.log('Found %s', pluralize('local browser', browsers.length, true))
  console.log('')

  const sortByNameAndMajor = sortWith([
    ascend(prop('name')),
    ascend(prop('majorVersion')),
  ])
  const sortedByNameAndMajorVersion = sortByNameAndMajor(browsers)

  sortedByNameAndMajorVersion.forEach((browser) => {
    const profilePath = browserUtils.getProfileDir(browser)
    const text = stripIndent`
      ${browser.displayName}
        - Name: ${browser.name}
        - Version: ${browser.version}
        - Channel: ${browser.channel}
        - Path: ${browser.path}
        - Profile path: ${profilePath}
    `

    console.log(text)
    console.log('')
  })

  console.log('To use these browsers, pass their "Name" to the \'--browser\' field')
  console.log('such as: `cypress run --browser firefox:dev` or `cypress run --browser chrome:canary`')
  console.log('')

  console.log('Application data stored in folder: %s', appData.path())
}

const info = () => {
  return launcher.detect()
  .then(print)
}

module.exports = info