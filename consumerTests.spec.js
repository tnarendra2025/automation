/**
 * Consumer Registration Test Suite
 * Contains all test cases for consumer registration
 */

import { test, expect } from '@playwright/test';
import { testCases } from '../data/consumerTestData';
import ConsumerPage from '../pages/consumerPage/consumerPage';

// Configure test suite to run tests in serial mode
test.describe.configure({ mode: 'serial' });

let consumerPage;

// Initialize page before all tests
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  consumerPage = new ConsumerPage(page);
});

// Authentication Test Suite
test.describe('Authentication Tests', () => {
  test.beforeEach(async () => {
    await consumerPage.navigateTo('login');
  });

  testCases.authentication.forEach(testCase => {
    test(`[${testCase.id}] ${testCase.description}`, async () => {
      await consumerPage.performTestSteps(testCase.steps);
    });
  });
});

// Navigation Test Suite
test.describe('Navigation Tests', () => {
  test.beforeEach(async () => {
    // Ensure we're logged in for navigation tests
    await consumerPage.navigateTo('login');
    await consumerPage.login('valid');
  });

  testCases.navigation.forEach(testCase => {
    test(`[${testCase.id}] ${testCase.description}`, async () => {
      await consumerPage.performTestSteps(testCase.steps);
    });
  });
});

// Field Validation Test Suite
test.describe('Field Validation Tests', () => {
  test.beforeEach(async () => {
    await consumerPage.navigateTo('login');
    await consumerPage.login('valid');
    await consumerPage.navigateTo('registration');
  });

  testCases.fieldValidation.forEach(testCase => {
    test(`[${testCase.id}] ${testCase.description}`, async () => {
      await consumerPage.performTestSteps(testCase.steps);
    });
  });
});

// Form Submission Test Suite
test.describe('Form Submission Tests', () => {
  test.beforeEach(async () => {
    await consumerPage.navigateTo('login');
    await consumerPage.login('valid');
    await consumerPage.navigateTo('registration');
  });

  testCases.formSubmission.forEach(testCase => {
    test(`[${testCase.id}] ${testCase.description}`, async () => {
      await consumerPage.performTestSteps(testCase.steps);
    });
  });
});

// UI/UX Test Suite
test.describe('UI/UX Tests', () => {
  test.beforeEach(async () => {
    await consumerPage.navigateTo('login');
    await consumerPage.login('valid');
    await consumerPage.navigateTo('registration');
  });

  testCases.uiValidation.forEach(testCase => {
    test(`[${testCase.id}] ${testCase.description}`, async () => {
      await consumerPage.performTestSteps(testCase.steps);
    });
  });
});

// Clean up after all tests
test.afterAll(async () => {
  await consumerPage.page.close();
});
