const assert = require('assert').strict;
const webdriver = require('selenium-webdriver'),
	By = webdriver.By
const { Background, Given, Then, When } = require('@cucumber/cucumber')

let driver;

Given('I go to {string} page', function(url) {
	driver = new webdriver.Builder()
		.forBrowser('chrome')
		.build();

	driver.manage().setTimeouts({implicit: 30 * 1000});
	driver.get(url);
})

When('I fill the {string} field with {string} value', async function(element, value) {
	// await driver.findElement(By.id('L2AGLb')).click();

	await driver.findElement(By.name('q')).sendKeys('webdriver');
});

When('I click on the {string} button', async function(button) {
	await driver.findElement(By.name('q')).sendKeys(webdriver.Key.ENTER);
});

Then('I will be redirected to the search result page', function() {
	driver.getTitle().then(function(title) {
		console.log("Redirected to: " + title)
		// assert.match(title, /Hledat/);
	});
})

Then('the page title will contain {string} in it', function(value) {
	driver.getTitle().then(function(title) {
		const rex = new RegExp(value);
		console.log("value: " + value + " title: " + title);
		assert.match(title, rex);
	});
	driver.quit();
});
