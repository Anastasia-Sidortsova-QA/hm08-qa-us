module.exports = {

    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    codeCreditCard: '.card-number #number',
    cvvCreditCard: '.card-second-row #code',
    messegeDriver: '#comment',

    // Buttons
    callTaxiBtn: 'button=Call a taxi',
    phoneNumberBtn: '//div[starts-with(text(), "Phone number")]',
    nextBtn: 'button=Next',
    confirmBtn: 'button=Confirm',
    cardCreditBtn: '//div[@class="pp-text"]',
    addCreditCardBtn: '//div[text()="Add card"]',
    btnLink: 'button=Link',
    btnCancel: 'button=Cancel',
    confirmRideBtn: '//button[@class="smart-button"]',
    detailsOrderBtn: '//div[@class="order-btn-group"]//button[@class="order-button"]//img[@alt="burger"]',
    iceCreamBtn: '//div[@class="counter-plus"]',
    iceCreamValue: '//div[@class="counter-value"]',
    orderRequairments: '/html/body/div/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div',
    blanketSwitch: '/html/body/div/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div/input',
    
    supportivePlan: '//div[starts-with(text(), "Supportive")]',
    supportiveIcon: '//div[@class="tcard active"]//button[@data-for="tariff-card-4"]',
    selectCeditCard: '//div[starts-with(text(), "Card")]',
    orderTime: '//div[@class="order-header-time"]',
    orderProgress: '//div[@class="order-progress"]',

    // Modals
    phoneNumberModal: '.modal',
    paymentMetodModal: '.payment-picker.open',
    closeModalBtn: '/html/body/div/div/div[2]/div[2]/div[1]/button',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
    },

    callTaxiButton: async function () {
        const callTaxiBtn = await $(this.callTaxiBtn);
        await callTaxiBtn.waitForDisplayed();
        await callTaxiBtn.click();
    },

    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberBtn = await $(this.phoneNumberBtn);
        await phoneNumberBtn.waitForDisplayed();
        await phoneNumberBtn.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },

    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        await browser.setupInterceptor();
        await $(this.nextBtn).click();
        await browser.pause(1500);
        const codeField = await $(this.codeField);
        const requests = await browser.getRequests();
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmBtn).click()
    },

    paymentCreditCard: async function (creditCardNumber, creditCardCode) {
        const cardCreditBtn = await $(this.cardCreditBtn);
        await cardCreditBtn.waitForDisplayed();
        await cardCreditBtn.click();
        const paymentMetodModal = await $(this.paymentMetodModal);
        await paymentMetodModal.waitForDisplayed();
        const addCreditCardBtn = await $(this.addCreditCardBtn);
        await addCreditCardBtn.waitForDisplayed();
        await addCreditCardBtn.click();
        const codeCreditCard = await $(this.codeCreditCard);
        await codeCreditCard.waitForDisplayed();
        const cvvCreditCard = await $(this.cvvCreditCard);
        await cvvCreditCard.waitForDisplayed();
        await codeCreditCard.setValue(creditCardNumber);
        await cvvCreditCard.setValue(creditCardCode);
        const btnLink = await $(this.btnLink);
        await btnLink.click();
        await browser.pause(1500);
        const closeModalBtn = await $(this.closeModalBtn);
        await closeModalBtn.waitForDisplayed();
        await closeModalBtn.click();
    },

    driverMessegeField: async function (messege) {
        const messegeDriver = await $(this.messegeDriver);
        await messegeDriver.waitForDisplayed();
        await messegeDriver.setValue(messege);
    },

    clickBlanketSwitch: async function () {
        const orderRequairments = await $(this.orderRequairments);
        await orderRequairments.waitForDisplayed();
        await orderRequairments.click();
    },

    orderIceCream: async function () {
        const iceCreamBtn = await $(this.iceCreamBtn);
        await iceCreamBtn.waitForDisplayed();
        await iceCreamBtn.click();
        await iceCreamBtn.click();
    },

    confirmRide: async function () {
        const confirmRideBtn = await $(this.confirmRideBtn);
        await confirmRideBtn.waitForDisplayed();
        await confirmRideBtn.click();
    },

    showDetailsOrder: async function () {
        const detailsOrderBtn = await $(this.detailsOrderBtn);
        await detailsOrderBtn.waitForDisplayed();
        await detailsOrderBtn.click();
    },

    instalationValues: async function (timeValue, timeRate) {
        const orderTime = await $(this.orderTime);
        await orderTime.waitForDisplayed();
        await orderTime.setValue(timeValue);
        const orderProgress = await $(this.orderProgress);
        await orderProgress.waitForDisplayed();
        await orderProgress.setValue(timeRate);
    },
};