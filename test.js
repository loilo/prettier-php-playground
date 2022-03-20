import { test, expect } from '@playwright/test'

// Just a _very_ basic check to verify that input + output are working
test('ensure that basic formatting is not broken', async ({ page }) => {
  await page.goto(
    'http://localhost:4173/prettier-php-playground/#N4IgDgTgpgLjCWUIHkwIPYDsDOIBcok8mMA6vACYwAW+AHAAwA0IMAhgEblW14AsLAK7YoAFU648AMzYAbES2zEA5rKgBFQehhR8M+VBZhqYAGpIlWfCACsAOj4gWMCG3iyVAYXQBbH2wAFAAkA-BdBQxAOVwBjKABlGABPNWswbAgAWgAmJxBoAEdBeGgA12V-PTkFEGIRCBgytgq2KoMAXxYoCngYdBQ0eCxJUDZsGDaRTtrMMEEJvBAAHgB+YzAQdqA'
  )

  let title = page.locator('.layout__output')
  await expect(title).toContainText('<?php')
})
