const assert = require('assert').strict;
const By = require('selenium-webdriver').By
const { Given, Then, When } = require('@cucumber/cucumber');
const selenium_driver = require('selenium-webdriver');

const MIN_TIMEOUT = 10000;
const AUTH_URL = 'https://annapurna:mountain@test.wwe-massive.com/';
// const AUTH_URL = 'http://localhost:9000/';
const CLICKABLE_CTA = {
	'watch CTA': '//button[contains(@class,\'hero__actions__button\')]',
	'superstars CTA': '//a[contains(., \'uperstar\')]',
	'tickets CTA': '//a[contains(., \'Ticket\')]',
	'shop CTA': '//a[contains(., \'Shop\')]',
	'logo': '//div[@class=\'logo\']',
	'search CTA': '//a[@href=\'/search\']',
	'account CTA/icon': '//div[contains(@class,\'account-nav--signed-in\')]',
	'My account': ''
};
const PAGES = {
	'watch featured page (default page)': { tab: false, link: `${AUTH_URL}episode/` },
	'favourites page within superstar': { tab: true, link: 'https://www.wwe.com/superstars' },
	'external tickets page (HTML link to wwe.com)': { tab: true, link: 'https://www.wwe.com/events' },
	'external shop page (HTML link to wwe.com)': { tab: true, link: 'https://shop.wwe.com/' },
	'homepage': { tab: true, link: 'https://www.wwe.com/' },
	'search page': { tab: false, link: `${AUTH_URL}search` },
	'accounts page': { tab: false, link: `${AUTH_URL}account` }
};

let driver;
const cleanup = async () => {
	if( driver ) await driver.quit();
}

const handleErr = async (err) => {
	await cleanup();
	throw err;
}

Given('I am on home page', {timeout: MIN_TIMEOUT}, async function() {
	driver = new selenium_driver.Builder()
		.forBrowser('chrome')
		.build();
	driver.manage().setTimeouts({implicit: 3 * MIN_TIMEOUT});
	await driver.manage().window().setRect({ width: 1920, height: 1080 });
	await driver.get(AUTH_URL);
})

Given('I accept cookies', {timeout: MIN_TIMEOUT}, async function() {
	try {
		const cookies_iframe = await driver.findElement(By.xpath('//iframe[contains(@id, \'pop-frame\')]'));
		await driver.switchTo().frame(cookies_iframe);
		const accept_cta = await driver.findElement(By.className('call'));
		await accept_cta.click();
	} catch(err) { handleErr(err) }
});

Given('I am a logged in user', {timeout: 3 * MIN_TIMEOUT}, async function() {
	try {
		await driver.switchTo().defaultContent();
		const sign_in_cta = await driver.findElement(By.xpath('//a[@href=\'/signin\']'));
		await sign_in_cta.click();
		const email_field =  await driver.findElement(By.xpath('//input[@id=\'email\']'));
		await email_field.sendKeys('uu@nn.uu');
		const pass_field =  await driver.findElement(By.xpath('//input[@id=\'password\']'));
		await pass_field.sendKeys('aaa111');
		const submit_btn =  await driver.findElement(By.xpath('//button[@type=\'submit\']'));
		await submit_btn.click();
	} catch(err) { handleErr(err) }
});

Given('the global navigation menu is visible', {timeout: MIN_TIMEOUT}, async function() {
	try {
		await driver.switchTo().defaultContent();
		assert(await driver.findElement(By.className('header__nav-top')));
	} catch(err) { handleErr(err) }
});

// Given('the global navigation menu is visible', { timeout: MIN_TIMEOUT}, async function() {
// 	try {
// 		await driver.switchTo().defaultContent();
// 		assert(await driver.findElement('//nav[contains(@class, \'primary-nav\')]'))
// 	} catch(err) { handleErr(err) }
// });

When('I click on the {string}', {timeout: MIN_TIMEOUT}, async function(clickable) {
	try {
		const element = await driver.findElement(By.xpath(CLICKABLE_CTA[clickable]));
		assert(element);
		await element.click();
	} catch(err) { handleErr(err) }
});

When('I hover over the {string}', { timeout: MIN_TIMEOUT }, async function(clickable) {
	try {
		const element = await driver.findElement(By.xpath(CLICKABLE_CTA[clickable]));
		await driver.actions({ bridge:true}).move({origin: element}).perform();
	} catch(err) { handleErr(err) }
});

When('the home page is being surfaced a spinner is displayed', {timeout: MIN_TIMEOUT}, async function() {
	const delay = ms => new Promise(res => {
		console.log('delay', ms);
		setTimeout(res, ms)
	});
	try {
		let spinner
		spinner = await driver.findElement(By.xpath('//div[contains(@class,\'pg-auth__spinner\')]'));
		assert(spinner);
	} catch(err) { handleErr(err) }
});

Then('the home page is loading', {timeout: MIN_TIMEOUT}, async function() {
	try {
		await driver.switchTo().defaultContent();
		const page = await driver.findElement(By.xpath('//div[@class=\'page\']'));
		assert(page);
		const row0 = await driver.findElement(By.xpath('//section[@id=\'row0\']'));
		assert(row0);
		const row1 = await driver.findElement(By.xpath('//section[@id=\'row1\']'));
		assert(row1);
		const row2 = await driver.findElement(By.xpath('//section[@id=\'row2\']'));
		assert(row2);
	} catch(err) { handleErr(err) }
});

Then('I should arrive on the {string}', {timeout: 2 * MIN_TIMEOUT}, async function(page) {
	try {
		if(PAGES[page].tab)
			await driver.switchTo().window((await driver.getAllWindowHandles())[1]);

		const currentPage = await driver.getCurrentUrl()
		assert(currentPage);
		assert(currentPage.match(new RegExp(PAGES[page].link)));
	} catch(err) { handleErr(err) }
});

Then('a dropdown list will appear', { timeout: MIN_TIMEOUT }, async function() {
	try {
		const drop_menu = await driver.findElement(By.xpath('//div[@class=\'drop-menu\']'));
		assert(drop_menu);
	} catch(err) { handleErr(err) }
});

Then('it will contain My account, Continue Watching, Watchlist, Sign Out CTA', { timeout: MIN_TIMEOUT }, async function() {
	try {
		const my_account = await driver.findElement(By.xpath('//a[@href=\'/account\']'));
		assert(my_account);
		const my_list = await driver.findElement(By.xpath('//a[@href=\'/account/profiles/bookmarks\']'));
		assert(my_list);
		const continue_watching = await driver.findElement(By.xpath('//a[@href=\'/account/profiles/watched\']'));
		assert(continue_watching);
	} catch(err) { handleErr(err) }
});

Then('the top navigation bar is displayed', { timeout: MIN_TIMEOUT }, async function() {
	try {
		assert(await driver.findElement(By.xpath('//header[@role=\'menubar\']')))
	} catch(err) { handleErr(err) }
});

Then('the end', async function() {
	await cleanup();
});
