# Three AI checkers, and nobody whose job was to ask them.

_The bot that fixed my spam was the one I hired in a hurry._

Between 10:42 and 11:08 one morning, three kinds of bot wrote rows about the same pull requests.

The Build Checker had been failing or blocking them since 10:42. At 11:07, two minutes after I created a Release Manager, its first status pass posted a row for each open PR in the same minute. At 11:08 the Compliance Gate halted four of them at once.

All three were answering one question: is this PR ready? Until that morning, none of them owned it.

That was my mistake. I had checkers. I did not have anyone whose job was to ask them.

I only talk to one bot, the Chief of Staff. It delegates and never does the work itself, so the gap could not be filled from the top.

## TL;DR

- A checker answers a question. A **Release Manager** asks it, once per commit, and keeps score in one place.
- Without that role, every bot asks the same question independently and every answer lands on you.
- The Release Manager **dispatches, holds, and keeps score**. It never judges the code and never merges.
- It reports up a single chain: Release Manager, Bot Designer, Chief of Staff, me. Only I merge.
- The hold is enforced. I can still override it, and the override leaves a record.

## The role came before its rules

Here is the morning, from the boards and the bots' logs.

|Time|What happened|
|---|---|
|10:41 to 10:42|I merge eight app PRs in one batch, one with a halt still open|
|10:42|The Build Checker's first rows land on the board, and the app's production build starts failing|
|11:05|I create the Release Manager bot|
|11:07|Its first status pass posts rows on the open PRs in one minute. Every one is blocked|
|11:08|The Compliance Gate halts four PRs at once|
|11:18|The four are closed and replaced by one consolidated PR|
|11:26|The org chart is set: the Release Manager goes under the Bot Designer, over the three checkers|
|11:35|The Build Checker's own watch routines are paused|
|12:12 to 12:14|The Builder takes over deploy monitoring, and the three checkers go PR-only|
|12:15|Dispatch rows start naming all three checkers on each PR|

The job existed before it had an owner, and the owner existed before it had a lane. I created the Release Manager in a hurry, mid-morning, and its first pass ran before anyone had written down what it could and could not do.

At 11:26 the role went on the org chart. At 12:12 deploy watching moved to the Builder, and by 12:14 the checkers were PR-only, which ended the overlap.

Without an owner, the job gets done by whoever happens to be looking. Three bots looked. Each wrote its own row, at its own commit, in its own words.

## What the Release Manager is

One row in the chart, with one job:

|Attribute|Specification|
|---|---|
|**Reports to**|Bot Designer|
|**Reads**|PR diffs, Builder review requests, latest checker rows|
|**Writes**|1 dispatch row, 1 PR status row, 1 summary per commit|
|**Verbs**|**dispatch**, **hold**, **keep score**|
|**Never**|Judge code, merge, clear PR while checks are missing, edit a checker's row|

The rules it runs on are short:

```
Release Manager rules
	1.	Dispatch each checker once per commit. Never re-ask for the same commit.
	2.	Checkers write their result to the PR's status row, not to me.
	3.	A PR is ready only when every checker has a result at the head commit.
Blocked is not a result.
	4.	Report up the chain: to the Bot Designer, who passes it to the Chief of Staff, who tells me.
One summary per PR per commit, and only when the state changes.
```

That last rule is the one that stops the spam. The three checkers report up to the Release Manager. I get one summary per PR per commit, not three.

Only three bots check: the Code Auditor, the Compliance Gate, and the Build Checker. The Release Manager is not a fourth. It sends each PR and each review request from the Builder to all three and keeps score. When all three pass, it reports up: Release Manager, then Bot Designer, then Chief of Staff, then me. Only I merge.

The Builder does every fix and opens every PR. The other bots only check, log, and comment.

## What it did

From 12:15 its dispatch rows named the checkers it had sent. That afternoon it dispatched and reported on every new site PR.

For each PR it did the same three things:

1. Dispatched the checkers (the Compliance Gate and the Code Auditor on the portfolio site, and the Build Checker as well on the app).
2. Set the PR's status to "blocked (checks pending)".
3. Wrote a summary when results arrived at the head commit.

It did not make the checkers faster, and it did not make them right. It made the question get asked once.

The deploy overlap ended with one handover: the Builder took over deploy monitoring, and the three checkers went PR-only.

The checkers catch different things. One set of retaken screenshots passed the Compliance Gate's privacy check, with a visible dev badge noted as non-blocking. The Code Auditor's review flagged the dev badge, totals that did not match between screens, and PNGs that should have been WebP. A privacy check and a quality check are not the same check.

## The second flood: approvals

Spam on an agent team is a two-way street. While checkers were flooding the board with status rows, the agents were flooding me with approval prompts for routine handoffs.

At 11:27 I cut the noise by introducing downward delegation: an instruction from a bot's manager counts as my approval.

The hard boundary stays mine: anything public-facing, merges to main, and financial transactions must still be approved by me directly.

Some bots originally balked and asked to hear from me directly, so I gave the standing order once. After that, the chain of command held: instructions travel down, consolidated reports travel up.

## What I would do differently

1. **Name the owner of "is this PR ready?" before the second checker exists.**
2. **Make checkers report to the Release Manager,** not to the human.
3. **Keep one chain of command.** A report goes up it, an instruction comes down it.
4. **Enforce the hold** in the place where merges happen, and make overriding it a deliberate act.
5. **One summary per PR per commit.** If the state did not change, say nothing.

## Receipts

Counts as of 2 pm Brisbane time, from my own boards and the bots' logs.

|Measure|Result|
|---|---|
|First checker rows on the morning's PRs|10:42|
|Release Manager created|11:05|
|Its first status pass|11:07 (every open PR blocked)|
|Release Manager placed on the org chart|11:26|
|New site PRs it dispatched and reported on that afternoon|all 4|
|PRs merged at 1:22 pm|3|

## Try it yourself

Before you add a second checker, paste this into your workspace:

```
Create one role called Release Manager, reporting to a Bot Designer.
It reads each PR, the builder's review requests, and the head commit.
It dispatches every checker once per commit.
It writes one status row per PR and one summary per commit.
It may dispatch, hold, and keep score. It may not judge the code or merge.
A PR is ready only when every checker has a result at the head commit.
Checker results go to the PR's status row.
Reports go up one chain: Release Manager -> Bot Designer -> Chief of Staff -> me.
Only the Chief of Staff talks to me.
Then turn on required checks on the branch so the hold is enforced.
```

Checkers answer questions. The Release Manager asks them. Only I press the button, and the button leaves a record.