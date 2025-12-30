import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        dir: 'src',
        environment: 'node',
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    dir: 'src/use-cases',
                }
            },
            {
                extends: true,
                test: {
                    name: 'e2e',
                    dir: 'src/http/controllers',
                    environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
                }
            },
            {
                extends: true,
                test: {
                    name: 'users',
                    dir: 'src/http/controllers/users',
                    environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
                }
            }
        ]
    }
})