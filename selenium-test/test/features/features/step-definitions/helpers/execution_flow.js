// import { driver } from './startup';
const driver = require('/startup');
console.log('aaaaaaaaaaaaaaaaaaaa',driver);

export const cleanup = async () => {
	console.log('cleanup', driver);
	if( driver ) await driver.quit();
}

export const handleErr = async (err) => {
	await cleanup();
	throw err;
}
