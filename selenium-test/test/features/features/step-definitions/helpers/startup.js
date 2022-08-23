const selenium_driver = require('selenium-webdriver');

let diver;
async function initSelenium() {
	if(!driver) {
		console.log('INIT SELENIUM');
		driver = new selenium_driver.Builder()
			.forBrowser('chrome')
			.build();
		driver.manage().setTimeouts({implicit: 3 * MIN_TIMEOUT});
		await driver.manage().window().setRect({ width: 1920, height: 1080 });
	}
	console.log('return driver', driver);
	return driver;
}

export const webdriver = await initSelenium();
