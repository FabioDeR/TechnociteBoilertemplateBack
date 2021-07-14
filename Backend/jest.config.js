module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './src',
    setupFilesAfterEnv: ['./tests/setup.ts']
};
