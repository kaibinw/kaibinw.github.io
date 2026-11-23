---
title: I wrote the rules on day one. Then I audited 96 sessions to see which held.
date: 2026-11-24
summary: Some of my rules were followed, some were bent, and one was rubber-stamped every time. The transcripts told me which was which
tags: [pipeline, agentic-engineering, knowledgemanagement, aiagents, obsidian]
# image: /assets/og/my-post.png   # optional custom link-preview image; default is the generated card in blog/og/
draft: false
---
# I wrote the rules on day one. Then I audited 96 sessions to see which held.

_Some of my rules were followed, some were bent, and one was rubber-stamped every time. The transcripts told me which was which._  

On 29 April 2026 I wrote the rules for my vault. On 4 July, 66 days later, I audited them against reality. I did not evaluate what I intended to follow. The audit parsed 96 session transcripts and a complete vault scan to report what the system had actually done.  

The log entry from that day documents what broke. Read together, the edits form an autopsy of operational drift.

The hard rules  
These are the operational constraints from day one:  

1. Never modify `raw/`. Sources are immutable.  
2. Never delete a page. Supersede or archive it.     
3. After any write, update the index and append to the log.  
4. During an ingest, discuss before filing.  
5. Every page has frontmatter.  
6. Link liberally.  
7. Never silently overwrite a contradiction.  
8. Page status must match a controlled vocabulary (initially: stub, developing, mature).

## What the audit found
|Rule|What transcripts and files showed|Action taken|Result|
|---|---|---|---|
|Controlled status vocabulary (3 values)|24 ad-hoc status values appeared across files|Expanded allowed list to 9; normalised non-compliant pages; dated the rule change|Changed the rule to match use; changed files to match rule|
|Discuss before filing, every time|The confirmation step became a pure rubber stamp ("go" or "yep" across the board)|Established trusted mode: internal daily notes and logs run automatically after takeaway extraction. External sources still require confirmation|Narrowed the rule|
|Update the index after every write|Index claimed 160 pages; actual count was 151. 17 "updated" dates had drifted|Re-synced catalog and frontmatter timestamps|Enforced the rule|
|Trigger skills on intent keywords|One skill recorded zero activations. Another missed three required trigger events|Slated dead skill for retirement; patched keyword list on the active skill|Re-tuned tooling|
Two findings exposed gaps in governance; two exposed mechanical failures in the automation layer.

## The rubber stamp  
"Discuss before filing" was supposed to be the core safeguard. The agent read a source, surfaced three to five key takeaways, and waited for clearance.  
The transcripts proved the gate was useless. For internal work notes, my response was identical across dozens of runs: "go". Pausing for permission on my own thoughts burned an unnecessary round trip without preventing a single error.  
I bifurcated the gate. Internal notes now proceed automatically once the agent logs its takeaways and target pages. The agent pauses only if it detects a direct contradiction with an existing entity, requires a brand new page, or flags ambiguous project boundaries. External ingest still waits every time.  
I ran into the same pattern on 23 September. A blanket "always ask for approval" directive conflicted directly with an intake routing table that triaged requests by type. The fix was the same: narrow the rule to match risk. Explicit instructions execute immediately; ambiguous feature exploration requires sign-off.  

If every answer to a confirmation is yes, the gate is just latency.

## Where it is weaker than it looks

- **Zero permission enforcement.** The `raw/` directory is an ordinary folder on a local drive. An agent can overwrite it at any time. A markdown rule is a polite request, not an access control list.
- **Audits decay immediately.** My log records one comprehensive transcript audit, dated 4 July. The rules and agent prompts have drifted continuously since.  
- **No undo mechanism.** The vault operates without local git tracking at its root. Reverting a destructive batch edit requires manual reconstruction from external backups.  
- **Controlled vocabularies still rot.** Normalising 24 ad-hoc values to 9 cleaned the baseline on 4 July, but prose rules cannot stop a model from inventing a 10th value tomorrow.

## What I would do differently

1. **Bootstrap with three hard constraints, not eight**. Add an operational rule only after a specific failure demonstrates the need.  
2. **Audit at week six, not day 66**. Nine weeks of autonomous writes allowed minor vocabulary drift to metastasize across 24 ad-hoc terms.  
3. **Anchor every rule to an incident log**. A constraint without a failure ticket attached will be bypassed within a month.  
4. **Kill any confirmation check with a 100% approval rate**. If you never say no, eliminate the round trip.  
5. **Enforce boundaries at the filesystem layer.** If an agent must not edit a folder, revoke write permissions via OS-level controls instead of asking nicely in markdown.

## Try it yourself

Once your vault accumulates 30 days of session logs, paste this prompt into your agent:

```txt
Read my rules file and the last 30 session transcripts. Do not edit anything.
For each rule, tell me: followed, bent, or ignored. Quote one session as evidence.
For every rule that was bent or ignored, give me two options: change the rule to match
what we actually did, or change the habit to match the rule. Say which you would pick and why.
Flag any confirmation step where I said yes almost every time.
Finish with the three rules I should write an incident note for.
```

The rules were never wrong or right. They were guesses, and the transcripts were the first honest test.

