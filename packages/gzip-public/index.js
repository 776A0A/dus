#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const filePath = path.resolve(__dirname, './index.ts');

spawn(
	`pnpm dlx esmo ${filePath}`,
	{
		stdio: 'inherit',
		shell: true,
	},
);
