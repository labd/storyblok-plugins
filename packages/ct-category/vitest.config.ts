import { defineConfig } from 'vitest/config'

// We use defineConfig here instead of the recommended defineProject since
// we want to set coverage.all and coverage.include when running tests in the
// package itself
export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ['src/**/*.ts'],
    },
  },
})
