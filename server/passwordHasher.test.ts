const bcrypt = require('bcrypt');

test('hashing a password returns a non-empty string', async () => {
  const hash = await bcrypt.hash('mypassword', 10);
  expect(hash).toBeTruthy();
});

test('hashed password is different from the original', async () => {
  const hash = await bcrypt.hash('mypassword', 10);
  expect(hash).not.toBe('mypassword');
});

test('correct password passes verification', async () => {
  const hash = await bcrypt.hash('mypassword', 10);
  const result = await bcrypt.compare('mypassword', hash);
  expect(result).toBe(true);
});

test('wrong password fails verification', async () => {
  const hash = await bcrypt.hash('mypassword', 10);
  const result = await bcrypt.compare('wrongpassword', hash);
  expect(result).toBe(false);
});

test('two hashes of the same password are different (salt)', async () => {
  const hash1 = await bcrypt.hash('mypassword', 10);
  const hash2 = await bcrypt.hash('mypassword', 10);
  expect(hash1).not.toBe(hash2);
});

test('hashing completes within 3 seconds', async () => {
  const start = Date.now();
  await bcrypt.hash('mypassword', 10);
  const elapsed = Date.now() - start;
  expect(elapsed).toBeLessThan(3000);
});
