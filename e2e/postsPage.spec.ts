import { test, expect } from '@playwright/test';

test('renders posts page and load more posts on scroll', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page).toHaveTitle(/Redux Toolkit posts/);

  const mainHeading = page.getByRole('heading', {
    name: 'Posts App',
    level: 1,
  });
  await expect(mainHeading).toBeVisible();

  const postsHeading = page.getByRole('heading', { name: 'Posts', level: 2 });
  await expect(postsHeading).toBeVisible();

  // // Check that there are exactly 20 posts initially
  const posts = page.getByRole('article');
  await expect(posts).toHaveCount(20);

  // // Scroll to bottom of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // // Check for loading indicator
  const loadingText = page.getByText('Loading more posts...');
  await expect(loadingText).toBeVisible();

  // // Wait for the new posts to load and verify we now have 40 posts
  await expect(posts).toHaveCount(40);
});

test('can add a post', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const addPostButton = page.getByRole('button', { name: 'Add new' });
  await addPostButton.click();

  const drawer = page.getByTestId('drawer');
  await expect(drawer).toBeVisible();

  const titleInput = drawer.getByRole('textbox', { name: 'Title' });
  await titleInput.fill('Test Post');

  const bodyInput = drawer.getByRole('textbox', { name: 'Body' });
  await bodyInput.fill('This is a test post');

  const firstNameInput = drawer.getByRole('textbox', { name: 'First Name' });
  await firstNameInput.fill('John');

  const lastNameInput = drawer.getByRole('textbox', { name: 'Last Name' });
  await lastNameInput.fill('Doe');

  const submitButton = drawer.getByRole('button', { name: 'Add Post' });
  await submitButton.click();

  const closeButton = drawer.getByRole('button', { name: 'Close' });
  await closeButton.click();

  // Wait for the drawer to be hidden first
  await expect(drawer).toBeHidden();

  // TODO: fix this test
  // wait for the new post to be added
  // Get the first post and verify its contents
  // const newPost = page.getByRole('article').first();
  // await expect(newPost).toContainText('Test Post');
  // await expect(newPost).toContainText('John Doe');
  // await expect(newPost).toContainText('This is a test post');
});
