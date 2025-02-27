const page = require('../../page');
const helper = require('../../helper');

const currentFromAddress = 'East 2nd Street, 601';
const currentToAddress = '1300 1st St';
const messegeToDriver = 'I am waiting for you near the store';

describe('Create an order', () => {


    it('Setting the address', async () => {
        await browser.url('/');
        await page.fillAddresses(currentFromAddress, currentToAddress);
        await browser.pause(1500);
        await expect($(page.fromField)).toHaveValue(currentFromAddress);
        await expect($(page.toField)).toHaveValue(currentToAddress);
    })

    it('Selecting supportive plan', async () => {
        await browser.url('/');
        await page.fillAddresses(currentFromAddress, currentToAddress);
        await page.callTaxiButton();
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();
        await browser.pause(1500);
        await expect($(page.supportiveIcon)).toBeExisting();
    })

    it('Add and save the number phone', async () => {
        await browser.url(`/`);
        await page.fillAddresses(currentFromAddress, currentToAddress);
        await page.callTaxiButton();
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();
        await expect($(page.supportiveIcon)).toBeExisting();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        await browser.pause(1500);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('Adding a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses(currentFromAddress, currentToAddress);
        await page.callTaxiButton();
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();
        await expect($(page.supportiveIcon)).toBeExisting();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        const creditCardNumber = helper.getCardNumber();
        const creditCardCode = helper.getCardCode();
        await page.paymentCreditCard(creditCardNumber, creditCardCode);
        await browser.pause(1500);
        await expect($(page.selectCeditCard)).toBeExisting();
    })

    it('Messege for the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses(currentFromAddress, currentToAddress);
        await page.callTaxiButton();
        await page.driverMessegeField(messegeToDriver);
        await browser.pause(1500);
        await expect($(page.messegeDriver)).toHaveValue(messegeToDriver);
    })

    it('Ordering a Blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses(currentFromAddress, currentToAddress);
        await page.callTaxiButton();
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click()
        await page.clickBlanketSwitch()
        await browser.pause(1500)
        await expect($(page.blanketSwitch)).toBeChecked()
    })

    it('Ordering 2 Ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses(currentFromAddress, currentToAddress);
        await page.callTaxiButton();
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();
        page.orderIceCream();
        await browser.pause(1500);
        await expect($(page.iceCreamValue)).toHaveText('2');
    })

    it('The car search modal appears', async () => {
        await browser.url(`/`);
        await page.fillAddresses(currentFromAddress, currentToAddress);
        await page.callTaxiButton();
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();
        await page.driverMessegeField(messegeToDriver);
        await page.confirmRide();
        await browser.pause(1500);
        await expect($(page.confirmRideBtn)).toBeExisting();
    })

    it('Driver information after searching for a order', async () => {
        await browser.url(`/`);
        await page.fillAddresses(currentFromAddress, currentToAddress);
        await page.callTaxiButton();
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();
        await page.driverMessegeField(messegeToDriver);
        await page.confirmRide();
        await page.showDetailsOrder();
        await browser.pause(3500);
        await expect($(page.confirmRideBtn)).toBeExisting();
        await expect($(page.detailsOrderBtn)).toBeExisting();
    })
})

