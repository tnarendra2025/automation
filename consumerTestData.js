/**
 * Consumer Registration Test Data
 * Contains all test data, selectors, and test cases for consumer registration
 */

export const testData = {
  // Application URLs
  baseUrl: "https://hyperdrive-qa.aexp.com",
  dashboardUrl: "/consumer/dashboard",
  registrationUrl: "/consumer/addparticipant",

  // Test credentials for authentication
  credentials: {
    valid: { username: "nthodeti", password: "Hyperdrive@UI@5814" },
    invalid: { username: "invalid", password: "wrongpassword" },
    locked: { username: "lockeduser", password: "Test@123" },
    expired: { username: "expireduser", password: "Test@123" }
  },

  // Field validation limits
  fieldLimits: {
    name: { min: 1, max: 255 },
    description: { max: 1000 },
    email: { max: 254 }
  },

  // Test consumer data
  consumers: {
    valid: {
      name: "TestConsumer",
      description: "Test description for valid consumer",
      readWriteGroup: "GG-HYPERDRIVE-FEATURE-TESTER",
      emailDlAddress: "TEST.USER@AESP.COM"
    },
    specialChars: {
      name: "Consumer@#$123",
      description: "Description with special chars !@#$%",
      readWriteGroup: "GG-HYPERDRIVE-FEATURE-TESTER",
      emailDlAddress: "SPECIAL.USER@AESP.COM"
    }
  }
};

export const testCases = {
  // Authentication Test Cases (5 cases)
  authentication: [
    {
      id: "TC-001",
      description: "Successful login with valid credentials",
      type: "positive",
      steps: [
        { action: "login", data: "valid" },
        { action: "verifyUrl", expected: "dashboardUrl" }
      ]
    },
    {
      id: "TC-002",
      description: "Login fails with invalid credentials",
      type: "negative",
      steps: [
        { action: "login", data: "invalid" },
        { action: "verifyErrorMessage", expected: "Invalid credentials" }
      ]
    },
    {
      id: "TC-003",
      description: "Login fails with locked account",
      type: "negative",
      steps: [
        { action: "login", data: "locked" },
        { action: "verifyErrorMessage", expected: "Account is locked" }
      ]
    },
    {
      id: "TC-004",
      description: "Login fails with expired password",
      type: "negative",
      steps: [
        { action: "login", data: "expired" },
        { action: "verifyErrorMessage", expected: "Password expired" }
      ]
    },
    {
      id: "TC-005",
      description: "Login fails with empty credentials",
      type: "negative",
      steps: [
        { action: "login", data: { username: "", password: "" } },
        { action: "verifyErrorMessage", expected: "Username is required" }
      ]
    }
  ],

  // Navigation Test Cases (5 cases)
  navigation: [
    {
      id: "TC-006",
      description: "Access registration page from dashboard",
      type: "positive",
      steps: [
        { action: "navigateTo", target: "dashboard" },
        { action: "click", element: "addNewRegistration" },
        { action: "verifyUrl", expected: "registrationUrl" }
      ]
    },
    {
      id: "TC-007",
      description: "Cancel button returns to dashboard",
      type: "positive",
      steps: [
        { action: "navigateTo", target: "registration" },
        { action: "click", element: "cancelButton" },
        { action: "verifyUrl", expected: "dashboardUrl" }
      ]
    },
    {
      id: "TC-008",
      description: "Browser back button after submission",
      type: "negative",
      steps: [
        { action: "navigateTo", target: "registration" },
        { action: "fillForm", data: "valid" },
        { action: "submitForm" },
        { action: "goBack" },
        { action: "verifyUrl", expected: "dashboardUrl" }
      ]
    },
    {
      id: "TC-009",
      description: "Refresh maintains form data",
      type: "positive",
      steps: [
        { action: "navigateTo", target: "registration" },
        { action: "fillField", field: "name", value: "RefreshTest" },
        { action: "refreshPage" },
        { action: "verifyFieldValue", field: "name", expected: "RefreshTest" }
      ]
    },
    {
      id: "TC-010",
      description: "Direct URL access without authentication",
      type: "negative",
      steps: [
        { action: "logout" },
        { action: "navigateTo", target: "registration" },
        { action: "verifyUrl", expected: "loginUrl" }
      ]
    }
  ],

  // Field Validation Test Cases (20 cases)
  fieldValidation: [
    {
      id: "TC-011",
      description: "Name field accepts minimum length (1 char)",
      type: "positive",
      steps: [
        { action: "fillField", field: "name", value: "A" },
        { action: "verifyValidation", field: "name", expected: "valid" }
      ]
    },
    {
      id: "TC-012",
      description: "Name field shows error when empty",
      type: "negative",
      steps: [
        { action: "clearField", field: "name" },
        { action: "verifyErrorMessage", expected: "The value cannot be empty" }
      ]
    },
    {
      id: "TC-013",
      description: "Name field shows error when exceeding max length",
      type: "negative",
      steps: [
        { action: "fillField", field: "name", value: "A".repeat(256) },
        { action: "verifyErrorMessage", expected: "Name is too long" }
      ]
    },
    {
      id: "TC-014",
      description: "Name field accepts special characters",
      type: "positive",
      steps: [
        { action: "fillField", field: "name", value: "Test@#$123" },
        { action: "verifyValidation", field: "name", expected: "valid" }
      ]
    },
    {
      id: "TC-015",
      description: "Name field accepts numbers",
      type: "positive",
      steps: [
        { action: "fillField", field: "name", value: "Consumer123" },
        { action: "verifyValidation", field: "name", expected: "valid" }
      ]
    },
    {
      id: "TC-016",
      description: "Description field shows error when exceeding max length",
      type: "negative",
      steps: [
        { action: "fillField", field: "description", value: "A".repeat(1001) },
        { action: "verifyErrorMessage", expected: "Description is too long" }
      ]
    },
    {
      id: "TC-017",
      description: "Description field accepts empty value",
      type: "positive",
      steps: [
        { action: "clearField", field: "description" },
        { action: "verifyValidation", field: "description", expected: "valid" }
      ]
    },
    {
      id: "TC-018",
      description: "ReadWriteGroup field shows error when empty",
      type: "negative",
      steps: [
        { action: "clearField", field: "readWriteGroup" },
        { action: "verifyErrorMessage", expected: "The value cannot be empty" }
      ]
    },
    {
      id: "TC-019",
      description: "ReadWriteGroup field shows error for invalid group",
      type: "negative",
      steps: [
        { action: "fillField", field: "readWriteGroup", value: "INVALID-GROUP" },
        { action: "verifyErrorMessage", expected: "Group ID not found in IIQ" }
      ]
    },
    {
      id: "TC-020",
      description: "Email field shows error for empty value",
      type: "negative",
      steps: [
        { action: "clearField", field: "email" },
        { action: "verifyErrorMessage", expected: "The value cannot be empty" }
      ]
    },
    {
      id: "TC-021",
      description: "Email field shows error for invalid format",
      type: "negative",
      steps: [
        { action: "fillField", field: "email", value: "invalid-email" },
        { action: "verifyErrorMessage", expected: "Invalid email format" }
      ]
    },
    {
      id: "TC-022",
      description: "Email field shows error for wrong domain",
      type: "negative",
      steps: [
        { action: "fillField", field: "email", value: "test@wrong.com" },
        { action: "verifyErrorMessage", expected: "Email should be @aexp.com" }
      ]
    },
    {
      id: "TC-023",
      description: "Email field accepts valid @aexp.com address",
      type: "positive",
      steps: [
        { action: "fillField", field: "email", value: "VALID.USER@AESP.COM" },
        { action: "verifyValidation", field: "email", expected: "valid" }
      ]
    },
    {
      id: "TC-024",
      description: "Email field is case insensitive",
      type: "positive",
      steps: [
        { action: "fillField", field: "email", value: "Mixed.Case@AESP.COM" },
        { action: "verifyValidation", field: "email", expected: "valid" }
      ]
    },
    {
      id: "TC-025",
      description: "All fields show errors when empty form submitted",
      type: "negative",
      steps: [
        { action: "submitForm" },
        { action: "verifyMultipleErrors", expected: [
          "The value cannot be empty",
          "Group ID not found in IIQ",
          "Email should be @aexp.com"
        ]}
      ]
    },
    {
      id: "TC-026",
      description: "Validation occurs on field blur",
      type: "positive",
      steps: [
        { action: "fillField", field: "name", value: "Test" },
        { action: "triggerBlur", field: "name" },
        { action: "verifyValidation", field: "name", expected: "valid" }
      ]
    },
    {
      id: "TC-027",
      description: "Validation occurs before submission",
      type: "negative",
      steps: [
        { action: "fillField", field: "name", value: "A".repeat(256) },
        { action: "submitForm" },
        { action: "verifyErrorMessage", expected: "Name is too long" }
      ]
    },
    {
      id: "TC-028",
      description: "Field validation order (name first)",
      type: "negative",
      steps: [
        { action: "submitForm" },
        { action: "verifyFirstError", expected: "The value cannot be empty" }
      ]
    },
    {
      id: "TC-029",
      description: "Form retains values after validation error",
      type: "positive",
      steps: [
        { action: "fillForm", data: {
          name: "RetainedValue",
          emailDlAddress: "test@wrong.com"
        }},
        { action: "submitForm" },
        { action: "verifyFieldValue", field: "name", expected: "RetainedValue" }
      ]
    },
    {
      id: "TC-030",
      description: "Character counter updates in real-time",
      type: "positive",
      steps: [
        { action: "fillField", field: "name", value: "Test" },
        { action: "verifyText", element: "nameCounter", expected: "4" }
      ]
    }
  ],

  // Form Submission Test Cases (10 cases)
  formSubmission: [
    {
      id: "TC-031",
      description: "Successful submission with valid data",
      type: "positive",
      steps: [
        { action: "fillForm", data: "valid" },
        { action: "submitForm" },
        { action: "verifyUrl", expected: "dashboardUrl" },
        { action: "verifySuccessMessage", expected: "Registration successful" }
      ]
    },
    {
      id: "TC-032",
      description: "Submission fails with invalid email domain",
      type: "negative",
      steps: [
        { action: "fillForm", data: { ...testData.consumers.valid, emailDlAddress: "test@wrong.com" } },
        { action: "verifyErrorMessage", expected: "Email should be @aexp.com" }
      ]
    },
    {
      id: "TC-033",
      description: "Submission fails with invalid IIQ group",
      type: "negative",
      steps: [
        { action: "fillForm", data: { ...testData.consumers.valid, readWriteGroup: "INVALID-GROUP" } },
        { action: "verifyErrorMessage", expected: "Group ID not found in IIQ" }
      ]
    },
    {
      id: "TC-034",
      description: "Submission with special characters in name",
      type: "positive",
      steps: [
        { action: "fillForm", data: "specialChars" },
        { action: "submitForm" },
        { action: "verifySuccessMessage", expected: "Registration successful" }
      ]
    },
    {
      id: "TC-035",
      description: "Duplicate consumer name detection",
      type: "negative",
      steps: [
        { action: "fillForm", data: "valid" },
        { action: "submitForm" },
        { action: "verifyErrorMessage", expected: "Consumer name already exists" }
      ]
    },
    {
      id: "TC-036",
      description: "Submission with minimum required fields",
      type: "positive",
      steps: [
        { action: "fillForm", data: {
          name: "MinFields",
          readWriteGroup: "GG-HYPERDRIVE-FEATURE-TESTER",
          emailDlAddress: "MIN.FIELDS@AESP.COM"
        }},
        { action: "submitForm" },
        { action: "verifySuccessMessage", expected: "Registration successful" }
      ]
    },
    {
      id: "TC-037",
      description: "Submission with all optional fields",
      type: "positive",
      steps: [
        { action: "fillForm", data: {
          name: "AllFields",
          description: "All optional fields filled",
          readWriteGroup: "GG-HYPERDRIVE-FEATURE-TESTER",
          emailDlAddress: "ALL.FIELDS@AESP.COM"
        }},
        { action: "submitForm" },
        { action: "verifySuccessMessage", expected: "Registration successful" }
      ]
    },
    {
      id: "TC-038",
      description: "Submission fails when backend is down",
      type: "negative",
      steps: [
        { action: "mockNetworkError", endpoint: "/api/consumers" },
        { action: "fillForm", data: "valid" },
        { action: "submitForm" },
        { action: "verifyErrorMessage", expected: "Service unavailable" }
      ]
    },
    {
      id: "TC-039",
      description: "Submission with concurrent requests",
      type: "negative",
      steps: [
        { action: "fillForm", data: "valid" },
        { action: "doubleClick", element: "submitButton" },
        { action: "verifySingleSubmission" }
      ]
    },
    {
      id: "TC-040",
      description: "Submission preserves data after error",
      type: "positive",
      steps: [
        { action: "fillForm", data: { ...testData.consumers.valid, emailDlAddress: "test@wrong.com" } },
        { action: "submitForm" },
        { action: "verifyFieldValue", field: "name", expected: testData.consumers.valid.name }
      ]
    }
  ],

  // UI/UX Test Cases (10 cases)
  uiValidation: [
    {
      id: "TC-041",
      description: "Verify all form fields are visible",
      type: "ui",
      steps: [
        { action: "verifyVisibility", element: "nameField", expected: true },
        { action: "verifyVisibility", element: "descriptionField", expected: true },
        { action: "verifyVisibility", element: "readWriteGroupField", expected: true },
        { action: "verifyVisibility", element: "emailField", expected: true }
      ]
    },
    {
      id: "TC-042",
      description: "Verify character counter updates correctly",
      type: "ui",
      steps: [
        { action: "fillField", field: "name", value: "Test" },
        { action: "verifyText", element: "nameCounter", expected: "4" }
      ]
    },
    {
      id: "TC-043",
      description: "Verify validation icon appears after validation",
      type: "ui",
      steps: [
        { action: "fillField", field: "name", value: "Test" },
        { action: "click", element: "nameValidateBtn" },
        { action: "verifyVisibility", element: "validationIcon", expected: true }
      ]
    },
    {
      id: "TC-044",
      description: "Verify field labels are correct",
      type: "ui",
      steps: [
        { action: "verifyText", element: "nameLabel", expected: "Consumer Name" },
        { action: "verifyText", element: "descriptionLabel", expected: "Description" },
        { action: "verifyText", element: "readWriteGroupLabel", expected: "ReadWrite Group" },
        { action: "verifyText", element: "emailLabel", expected: "Email DL Address" }
      ]
    },
    {
      id: "TC-045",
      description: "Verify button states (submit disabled when invalid)",
      type: "ui",
      steps: [
        { action: "verifyEnabled", element: "submitButton", expected: false },
        { action: "fillForm", data: "valid" },
        { action: "verifyEnabled", element: "submitButton", expected: true }
      ]
    },
    {
      id: "TC-046",
      description: "Verify responsive design on mobile viewport",
      type: "ui",
      steps: [
        { action: "setViewport", size: "mobile" },
        { action: "verifyVisibility", element: "nameField", expected: true },
        { action: "verifyCss", element: "formContainer", property: "flex-direction", value: "column" }
      ]
    },
    {
      id: "TC-047",
      description: "Verify error message styling",
      type: "ui",
      steps: [
        { action: "submitForm" },
        { action: "verifyCss", element: "errorMessage", property: "color", value: "rgb(211, 47, 47)" }
      ]
    },
    {
      id: "TC-048",
      description: "Verify help text visibility",
      type: "ui",
      steps: [
        { action: "verifyText", element: "nameHelpText", 
          expected: "Make your name as descriptive as possible so you can easily identify it later." }
      ]
    },
    {
      id: "TC-049",
      description: "Verify tab order follows form flow",
      type: "ui",
      steps: [
        { action: "pressTab" },
        { action: "verifyFocused", element: "nameField" },
        { action: "pressTab" },
        { action: "verifyFocused", element: "descriptionField" }
      ]
    },
    {
      id: "TC-050",
      description: "Verify accessibility attributes",
      type: "ui",
      steps: [
        { action: "verifyAttribute", element: "nameField", attribute: "aria-label", value: "Consumer Name" },
        { action: "verifyAttribute", element: "submitButton", attribute: "aria-busy", value: "false" }
      ]
    }
  ]
};

export const elementSelectors = {
  // Authentication Elements
  usernameField: "#username",
  passwordField: "#password",
  loginButton: "#login-button",
  logoutButton: "#logout-button",
  
  // Navigation Elements
  profileMenu: "#profile-menu",
  consumerOption: "text=Consumer",
  addNewRegistration: "text=Add New Registration",
  
  // Form Fields
  nameField: "#name",
  nameLabel: "label[for='name']",
  nameHelpText: "#name-helper-text",
  nameValidateBtn: "//input[@id='name']//following-sibling::button",
  descriptionField: "#description",
  descriptionLabel: "label[for='description']",
  readWriteGroupField: "#readWriteGroup",
  readWriteGroupLabel: "label[for='readWriteGroup']",
  emailField: "#emailDlAddress",
  emailLabel: "label[for='emailDlAddress']",
  
  // Buttons
  submitButton: '[data-testid="submitBtn"]',
  cancelButton: '[data-testid="cancelBtn"]',
  
  // Validation Elements
  nameCounter: "//span[normalize-space()='4']",
  validationIcon: "(//span[@class='display-block css-ab09iz'])[1]",
  errorMessage: ".error-message",
  
  // Messages
  successMessage: ".success-message",
  errorMessages: {
    emptyField: '//span[text()="The value cannot be empty"]',
    nameTooLong: '//span[text()="Name is too long"]',
    invalidEmail: '//div/span[text()="Email should be @aexp.com"]',
    invalidGroup: '//div/span[text()="Group ID not found in IIQ"]'
  },
  
  // Layout
  formContainer: ".form-container"
};
