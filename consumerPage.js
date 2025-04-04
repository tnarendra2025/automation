/**
 * Consumer Page Object
 * Contains all methods for interacting with the consumer registration page
 */

import { testData, elementSelectors } from '../data/consumerTestData';

export default class ConsumerPage {
  constructor(page) {
    this.page = page;
    this.selectors = elementSelectors;
    this.urls = {
      base: testData.baseUrl,
      dashboard: testData.dashboardUrl,
      registration: testData.registrationUrl,
      login: "/login"
    };
  }

  // ==================== Core Actions ====================

  /**
   * Navigate to a specific URL
   * @param {string} target - The target URL key (dashboard, registration, etc.)
   */
  async navigateTo(target) {
    const url = this.urls[target] || target;
    await this.page.goto(`${this.urls.base}${url}`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Login to the application
   * @param {object|string} credentials - Either credential key or object {username, password}
   */
  async login(credentials) {
    const creds = typeof credentials === 'string' 
      ? testData.credentials[credentials] 
      : credentials;
    
    await this.page.fill(this.selectors.usernameField, creds.username);
    await this.page.fill(this.selectors.passwordField, creds.password);
    await this.page.click(this.selectors.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Logout of the application
   */
  async logout() {
    await this.page.click(this.selectors.logoutButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill a form field
   * @param {string} field - The field to fill (name, description, etc.)
   * @param {string} value - The value to enter
   */
  async fillField(field, value) {
    const selector = this.selectors[`${field}Field`] || this.selectors[field];
    await this.page.fill(selector, value);
    
    // Auto-trigger validation if button exists
    const validateBtn = this.selectors[`${field}ValidateBtn`];
    if (validateBtn) {
      await this.page.click(validateBtn);
      await this.page.waitForTimeout(500); // Brief pause for validation
    }
  }

  /**
   * Clear a form field
   * @param {string} field - The field to clear
   */
  async clearField(field) {
    const selector = this.selectors[`${field}Field`] || this.selectors[field];
    await this.page.fill(selector, "");
  }

  /**
   * Submit the form
   */
  async submitForm() {
    await this.page.click(this.selectors.submitButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click an element
   * @param {string} element - The element to click
   */
  async click(element) {
    const selector = this.selectors[element];
    await this.page.click(selector);
  }

  // ==================== Verification Methods ====================

  /**
   * Verify the current URL
   * @param {string} expectedUrlKey - The expected URL key
   */
  async verifyUrl(expectedUrlKey) {
    const expectedUrl = `${this.urls.base}${this.urls[expectedUrlKey]}`;
    await expect(this.page).toHaveURL(expectedUrl);
  }

  /**
   * Verify element visibility
   * @param {string} element - The element to check
   * @param {boolean} expected - Whether it should be visible
   */
  async verifyVisibility(element, expected = true) {
    const selector = this.selectors[element] || element;
    const elementHandle = this.page.locator(selector);
    
    if (expected) {
      await expect(elementHandle).toBeVisible();
    } else {
      await expect(elementHandle).not.toBeVisible();
    }
  }

  /**
   * Verify element text content
   * @param {string} element - The element to check
   * @param {string} expectedText - The expected text
   */
  async verifyText(element, expectedText) {
    const selector = this.selectors[element] || element;
    await expect(this.page.locator(selector)).toHaveText(expectedText);
  }

  /**
   * Verify field value
   * @param {string} field - The field to check
   * @param {string} expectedValue - The expected value
   */
  async verifyFieldValue(field, expectedValue) {
    const selector = this.selectors[`${field}Field`] || this.selectors[field];
    await expect(this.page.locator(selector)).toHaveValue(expectedValue);
  }

  /**
   * Verify error message is displayed
   * @param {string} expectedError - The expected error message key
   */
  async verifyErrorMessage(expectedError) {
    const errorSelector = this.selectors.errorMessages[expectedError] || expectedError;
    await expect(this.page.locator(errorSelector)).toBeVisible();
  }

  /**
   * Verify multiple error messages
   * @param {array} expectedErrors - Array of expected error message keys
   */
  async verifyMultipleErrors(expectedErrors) {
    for (const error of expectedErrors) {
      await this.verifyErrorMessage(error);
    }
  }

  /**
   * Verify success message
   * @param {string} expectedMessage - The expected success message
   */
  async verifySuccessMessage(expectedMessage) {
    await expect(this.page.locator(this.selectors.successMessage)).toHaveText(expectedMessage);
  }

  /**
   * Verify element is enabled/disabled
   * @param {string} element - The element to check
   * @param {boolean} expected - Whether it should be enabled
   */
  async verifyEnabled(element, expected = true) {
    const selector = this.selectors[element];
    if (expected) {
      await expect(this.page.locator(selector)).toBeEnabled();
    } else {
      await expect(this.page.locator(selector)).not.toBeEnabled();
    }
  }

  /**
   * Verify CSS property value
   * @param {string} element - The element to check
   * @param {string} property - The CSS property
   * @param {string} value - The expected value
   */
  async verifyCss(element, property, value) {
    const selector = this.selectors[element] || element;
    await expect(this.page.locator(selector)).toHaveCSS(property, value);
  }

  /**
   * Verify HTML attribute value
   * @param {string} element - The element to check
   * @param {string} attribute - The attribute name
   * @param {string} value - The expected value
   */
  async verifyAttribute(element, attribute, value) {
    const selector = this.selectors[element] || element;
    await expect(this.page.locator(selector)).toHaveAttribute(attribute, value);
  }

  // ==================== Composite Actions ====================

  /**
   * Fill the entire form
   * @param {object|string} formData - Either form data key or object
   */
  async fillForm(formData) {
    const data = typeof formData === 'string' 
      ? testData.consumers[formData] 
      : formData;

    for (const [field, value] of Object.entries(data)) {
      if (value !== undefined) {
        await this.fillField(field, value);
      }
    }
  }

  /**
   * Execute a sequence of test steps
   * @param {array} steps - Array of test step objects
   */
  async performTestSteps(steps) {
    for (const step of steps) {
      try {
        switch (step.action) {
          // Navigation
          case 'navigateTo':
            await this.navigateTo(step.target);
            break;
          case 'goBack':
            await this.page.goBack();
            break;
          case 'refreshPage':
            await this.page.reload();
            break;
          
          // Authentication
          case 'login':
            await this.login(step.data);
            break;
          case 'logout':
            await this.logout();
            break;
          
          // Form Interactions
          case 'fillField':
            await this.fillField(step.field, step.value);
            break;
          case 'clearField':
            await this.clearField(step.field);
            break;
          case 'fillForm':
            await this.fillForm(step.data);
            break;
          case 'submitForm':
            await this.submitForm();
            break;
          case 'click':
            await this.click(step.element);
            break;
          
          // Verifications
          case 'verifyUrl':
            await this.verifyUrl(step.expected);
            break;
          case 'verifyText':
            await this.verifyText(step.element, step.expected);
            break;
          case 'verifyVisibility':
            await this.verifyVisibility(step.element, step.expected);
            break;
          case 'verifyFieldValue':
            await this.verifyFieldValue(step.field, step.expected);
            break;
          case 'verifyErrorMessage':
            await this.verifyErrorMessage(step.expected);
            break;
          case 'verifyMultipleErrors':
            await this.verifyMultipleErrors(step.expected);
            break;
          case 'verifySuccessMessage':
            await this.verifySuccessMessage(step.expected);
            break;
          case 'verifyEnabled':
            await this.verifyEnabled(step.element, step.expected);
            break;
          case 'verifyCss':
            await this.verifyCss(step.element, step.property, step.value);
            break;
          case 'verifyAttribute':
            await this.verifyAttribute(step.element, step.attribute, step.value);
            break;
          
          // Special Actions
          case 'pressTab':
            await this.page.keyboard.press('Tab');
            break;
          case 'doubleClick':
            await this.page.click(this.selectors[step.element], { clickCount: 2 });
            break;
          case 'mockNetworkError':
            await this.page.route(step.endpoint, route => route.abort());
            break;
          
          default:
            throw new Error(`Unknown action: ${step.action}`);
        }
      } catch (error) {
        throw new Error(`Step failed: ${step.action}\n${error.message}`);
      }
    }
  }
}
