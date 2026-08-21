#!/usr/bin/env node
// A prompt variable used in the note body must be byte-identical to one used in a property.
// Ref: obsidian-clipper/src/utils/interpreter.ts -> collectPromptVariables() keys a
// `Map<string, PromptVariable>` on the raw prompt text and scans noteContentFormat and
// properties into the same map. Identical text therefore costs one model call whose answer
// lands in both places; text that differs by so much as a space becomes a second variable,
// so the body and the frontmatter get independently generated answers that can disagree.
// That failure is silent -- both places look filled in -- hence: hard fail in CI.
import { readFileSync } from 'node:fs';

// Deliberately tolerant about the escaping: templates in this repo carry `{{\"…\"}}` while
// the upstream collector matches `{{"…"}}`. Which of those is right is a separate question;
// this check only cares that the body and the property agree, whichever form is in use.
const PROMPT = /\{\{(?:prompt:)?\\?"([\s\S]*?)\\?"(\|.*?)?\}\}/g;

const promptsIn = (text) => [...String(text ?? '').matchAll(PROMPT)].map((m) => m[1]);

let failed = false;

for (const file of process.argv.slice(2)) {
	const template = JSON.parse(readFileSync(file, 'utf8'));
	const inProperties = new Set((template.properties ?? []).flatMap((p) => promptsIn(p.value)));

	for (const prompt of promptsIn(template.noteContentFormat)) {
		if (inProperties.has(prompt)) continue;
		console.error(
			`::error file=${file}::note body asks a prompt no property asks: "${prompt}" — ` +
				`copy it verbatim into the matching property, or the model is asked twice and may answer differently`,
		);
		failed = true;
	}
}

process.exit(failed ? 1 : 0);
