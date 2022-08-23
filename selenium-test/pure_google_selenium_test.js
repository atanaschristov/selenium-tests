const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.manage().setTimeouts({implicit: 30 * 1000});
driver.get('http://www.google.com');

driver.findElement(By.id('L2AGLb')).click();

driver.findElement(By.name('q')).sendKeys('webdriver');

// driver.sleep(1000).then(function() {
//   driver.findElement(By.name('q')).sendKeys('webdriver');
// })

driver.findElement(By.name('q')).sendKeys(webdriver.Key.ENTER);
// driver.sleep(2000).then(function() {
//   // driver.findElement(By.name('q')).sendKeys(webdriver.Key.TAB);
//   driver.findElement(By.name('q')).sendKeys(webdriver.Key.ENTER);
// });

try {
  driver.getTitle().then(function(title) {
    if(title === 'webdriver - Hledat Googlem') {
      console.log('Test passed');
      driver.quit();
    } else {
      console.log('Test failed');
      driver.quit();
    }
  });
} catch(err) {
  console.log(err);
}


