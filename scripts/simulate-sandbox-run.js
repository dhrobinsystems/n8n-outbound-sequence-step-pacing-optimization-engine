#!/usr/bin/env node
/*
 * Offline sandbox simulator.
 * Runs the workflow's Code nodes from workflow.json in plain Node.js, on the
 * embedded mock fixture, with ZERO network calls (HTTP nodes are never run).
 *
 *   node scripts/simulate-sandbox-run.js            # print the audit record
 *   node scripts/simulate-sandbox-run.js --slack    # print the Slack payload
 *   BOUNCE_RATE_CRITICAL_PCT=4 node scripts/simulate-sandbox-run.js
 *
 * Threshold env vars are honored; SANDBOX_MODE is always forced to true.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const wf = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'workflow.json'), 'utf8'));
const byName = Object.fromEntries(wf.nodes.map((n) => [n.name, n]));
const outputs = {};

const env = { ...process.env, SANDBOX_MODE: 'true' };
delete env.OUTBOUND_API_KEY;

function run(name, inputItems) {
  const node = byName[name];
  if (!node || node.type !== 'n8n-nodes-base.code') throw new Error(`Not a code node: ${name}`);
  const $input = { first: () => inputItems[0], all: () => inputItems };
  const $ = (ref) => ({
    isExecuted: Boolean(outputs[ref]),
    first: () => { if (!outputs[ref]) throw new Error(`Node "${ref}" has not run`); return outputs[ref][0]; },
    all: () => outputs[ref] || [],
  });
  const fn = new Function('$env', '$input', '$', node.parameters.jsCode);
  const result = fn(env, $input, $);
  outputs[name] = result;
  return result;
}

let items = run('Config & Safety Gate', [{ json: {} }]);
if (!items[0].json.gate.sandboxMode) throw new Error('Simulator only runs the sandbox path.');
items = run('Load Mock Fixture', items);
items = run('Pacing Optimization Engine', items);
items = run('Build Pacing Update Payloads', items);
if (items[0].json.pacingUpdate.liveUpdateAllowed) throw new Error('Safety violation: live update allowed in sandbox.');
items = run('Dry-Run Pacing Preview', items);
items = run('Build RevOps Alerts', items);
const audit = run('Execution Summary & Audit', items);

if (process.argv.includes('--slack')) {
  console.log(JSON.stringify(outputs['Build RevOps Alerts'][0].json.alerts.slackPayload, null, 2));
} else if (process.argv.includes('--plan')) {
  console.log(JSON.stringify(outputs['Pacing Optimization Engine'][0].json, null, 2));
} else {
  console.log(JSON.stringify(audit[0].json, null, 2));
}
