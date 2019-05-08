var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.build();

driver.get('https://portal.staging.brightelabs.com.au/pre-approvals/how-much-can-i-borrow');
driver.manage().window().maximize();
driver.findElement(By.id('full-name')).sendKeys('Tester');
driver.findElement(By.id('mobile')).sendKeys('0000000000');
driver.findElement(By.id('email')).sendKeys('tester@gmail.com');
driver.findElement(By.xpath('//*[@id="pre-approval-details-form"]/button')).click();

//Select Marital statues as Married
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[2]/div'))).click();
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[2]/div/ul/li/span[contains(text(), "Married")]'))).click();

//Select dependants as 2
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[3]/div'))).click();
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[3]/div/ul/li/span[contains(text(), "2")]'))).click();

//Fill Income and Expense Details with frequency as Fortnightly
driver.wait(until.elementLocated(By.id('base-net-income-amount'))).sendKeys('2000');
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[4]/div/span/div'))).click();
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[4]/div/span/div/ul/li/span[contains(text(), "Fortnightly")]'))).click();

driver.wait(until.elementLocated(By.id('partners-base-net-income-amount'))).sendKeys('100');
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[5]/div/span/div'))).click();
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[5]/div/span/div/ul/li/span[contains(text(), "Fortnightly")]'))).click();

driver.wait(until.elementLocated(By.id('other-taxable-net-income-amount'))).sendKeys('100');
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[6]/div/span/div'))).click();
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[6]/div/span/div/ul/li/span[contains(text(), "Fortnightly")]'))).click();

driver.wait(until.elementLocated(By.id('mortgage-repayment-amount'))).sendKeys('0');
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[7]/div/span/div'))).click();
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[7]/div/span/div/ul/li/span[contains(text(), "Fortnightly")]'))).click();

driver.wait(until.elementLocated(By.id('other-loan-commitments-amount'))).sendKeys('0');
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[8]/div/span/div'))).click();
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[8]/div/span/div/ul/li/span[contains(text(), "Fortnightly")]'))).click();

driver.wait(until.elementLocated(By.id('household-credit-card-limit-amount'))).sendKeys('5000');
driver.wait(until.elementLocated(By.id('household-living-costs-amount'))).sendKeys('1000');
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[10]/div/span/div'))).click();
driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/div[10]/div/span/div/ul/li/span[contains(text(), "Fortnightly")]'))).click();

driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-how-much-can-i-borrow-form"]/button'))).click();

//assert amount user is eligible and maximum repayment amount
var msg = driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[2]/div[2]/div/h4'))).getText();
if (msg == "Congratulations Tester!"){
	console.log("User is eligible");
var maximum_repayment_amount = driver.wait(until.elementLocated(By.xpath('//*[@id="pre-approval-apply-form"]/div[4]/div[1]/span[1]'))).getText();
	console.log('Maximum repayment amount is: ' + maximum_repayment_amount);
}else{
	console.log("User is NOT eligible");
};

