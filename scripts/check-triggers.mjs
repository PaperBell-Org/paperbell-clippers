#!/usr/bin/env node
// Compile-check triggers exactly the way Obsidian Web Clipper does.
// Ref: obsidian-clipper/src/utils/triggers.ts -> initializeTriggers() runs
// `new RegExp(trigger.slice(1, -1))` with NO try/catch, so a single malformed
// regex trigger here throws and kills trigger matching for EVERY template in
// the user's install -- not just this one. Hence: hard fail in CI.
import { readFileSync } from 'node:fs';

let failed = false;

for (const file of process.argv.slice(2)) {
	const template = JSON.parse(readFileSync(file, 'utf8'));
	for (const trigger of template.triggers ?? []) {
		if (trigger.startsWith('schema:')) continue;

		if (trigger.startsWith('/') && trigger.endsWith('/')) {
			try {
				new RegExp(trigger.slice(1, -1));
			} catch (error) {
				console.error(`::error file=${file}::invalid regex trigger ${trigger} — ${error.message}`);
				failed = true;
			}
			continue;
		}

		// Anything else is treated by Web Clipper as a literal url.startsWith() prefix.
		if (!/^https?:\/\//.test(trigger)) {
			console.error(`::error file=${file}::prefix trigger must be an absolute http(s) URL: ${trigger}`);
			failed = true;
		}
	}
}

process.exit(failed ? 1 : 0);
