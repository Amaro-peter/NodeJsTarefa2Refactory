import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        environment: 'node',
        env: {
            DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/projetonodejsdoisfactory?schema=public'
        }
    }
})