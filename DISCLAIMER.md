# ⚠️ Disclaimer & Liability Limitation

**Use at your own risk.** The code, workflows, and scripts in this repository (`n8n-outbound-sequence-step-pacing-optimization-engine`) are provided for educational and architectural demonstration purposes.

**No Liability:** The author and dhRobin Systems accept no responsibility or liability for any direct, indirect, incidental, or consequential damages that result from using, misusing, or deploying these scripts. That includes, without limitation, damaged sender reputation, blocklisted or suspended domains and mailboxes, lost pipeline or revenue, missed or mistimed follow-ups, emails sent too often or too rarely, and incorrect or overwritten campaign settings in any outbound or CRM platform.

**No Warranty:** All software, n8n JSON blueprints, JavaScript modules, threshold defaults and pacing formulas are provided "AS IS", without warranty of any kind, express or implied. This includes, but is not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement. The default bounce, spam-complaint, velocity and delay thresholds are illustrative starting points, not deliverability guarantees or industry-certified values.

**Production Testing Required:** Always test thoroughly in an isolated staging environment, such as a test workspace or a single low-volume test campaign on your outbound platform, with `SANDBOX_MODE=true`, `DRY_RUN=true` and `PACING_UPDATES_ENABLED=false` enabled, before you connect live outbound platform credentials or Slack webhooks. Treat every proposed pacing change as a recommendation that a person must review before it is applied to live sequences. Confirm how your platform's API handles sequence updates (for example, whether saving a delay resubmits or overwrites step content) before you enable writes.

**Deliverability Is Not Guaranteed:** This workflow reads metrics and adjusts the timing between sequence steps. It does not fix list quality, DNS authentication (SPF, DKIM, DMARC), content, or mailbox provider filtering, and it cannot guarantee inbox placement. Its safety guardrails and circuit breaker reduce risk but cannot detect every failure mode, and they depend on the accuracy and freshness of the data your platform returns.

**Third-Party APIs & Compliance:** You alone are responsible for complying with the terms of service, rate limits, data privacy regulations (GDPR/CCPA and others), anti-spam laws (such as CAN-SPAM, CASL and PECR), mailbox provider bulk-sender requirements, and the security policies of your outbound platform (for example Smartlead, Instantly or Apollo), Slack, n8n and any connected CRM or sales automation service. That includes having a lawful basis to contact every prospect, honoring opt-outs and unsubscribe requests promptly, keeping prospect personal data out of alerts and logs, protecting API keys and webhook URLs, and reviewing every automatically created or updated campaign setting.

The full disclaimer is also available in `DISCLAIMER.md`.

## License

Released under the MIT License. Copyright (c) 2026 DH Robin (dhRobin Systems). See `LICENSE`.

---

Full text: DISCLAIMER.md · Licensed under the MIT License. License: MIT © 2026 DH Robin (dhRobin Systems) · Provided as-is, see the disclaimer.
