const {
  createDefaultDriver,
  clickElement,
  findVisibleElements,
  waitForElement
} = require('react-storefront-selenium')

const hostToTest = process.env.HOST
if (!hostToTest) {
  console.error('HOST environment variable left unset.')
  process.exit(1)
}

describe('smoke tests', () => {
  jest.setTimeout(30000)
  let driver

  beforeAll(() => {
    driver = createDefaultDriver()
  })

  afterAll(async () => {
    await driver.quit()
  })

  it('Navigate to landing page', async function() {
    await driver.get(`https://${hostToTest}`)
  })

  it('Navigate to category', async function() {
    await clickElement(driver, '[data-th="nav"]')
  })

  it('navigate to subcategory', async function() {
    await clickElement(driver, '[data-th="subcategory-link"]')
  })

  it('navigate to product', async function() {
    await clickElement(driver, '[data-th="product-link"]')
  })

  it('Add product to cart ', async function() {
    await clickElement(driver, '[data-th="add-to-cart"]')
  })

  it('Navigate to cart', async function() {
    await clickElement(driver, '[data-th="cart-link"]')
  })

  it('Verify product in cart', async function() {
    await waitForElement(driver, '[data-th="product-link"]')
    const products = await findVisibleElements(driver, '[data-th="product-link"]')
    expect(products).toHaveLength(1)
  })

  it('navigate to checkout', async function() {
    await clickElement(driver, '[data-th="checkout-link"]')
  })
})
