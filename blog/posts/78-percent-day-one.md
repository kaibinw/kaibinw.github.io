---
title: 78% of my plan on day one. The org chart was the fix.
date: 2026-11-09
summary: Fifteen bots, all talking to my Chief of Staff, all asking me for approval. By my own count I burned through about 78% of my daily platform plan that day. The biggest fix wasn’t a config setting. It was deciding who reports to whom.
tags: [pipeline, agentic-engineering]
draft: true
---
# 78% of my plan on day one. The org chart was the fix.

_Fifteen bots, all talking to my Chief of Staff, all asking me for approval. By my own count I burned through about 78% of my daily platform plan that day. The biggest fix wasn’t a config setting. It was deciding who reports to whom._

On the first day I ran my bot team for real, I checked my usage meter and it sat at 78%. That is my figure, read off my own account dashboard. What I can show is the log: every row the bots wrote, every draft change reviewed, and the bots' own back-and-forth chats. The log shows raw activity—and in multi-agent setups, runaway activity is what costs.  

A lot of that burn traces back to one mistake: I built the bots first and the org chart second.

## The chart I should have started with

The first bot spun up at 8:36 am. By mid-morning there were fifteen on the roster, and the org was flat. Every bot had an open channel directly into my Chief of Staff. On top of that, I was ping-ponging between the other bots, approving routine steps by hand.  

Each communication line is an ongoing cost. A bot wakes up, ingests its system prompt, inspects whatever workspace it is monitoring, and writes a response. When fourteen bots can all do that into the same inbox, several of them inevitably ask the exact same question within the same three minutes.

At 11:26 am, I cut the chatter and gave my Chief of Staff a new tree:

```txt
Me
└─ Chief of Staff
   ├─ Bot Designer
   │   └─ Release Manager
   │        ├─ Build Checker
   │        ├─ Compliance Gate
   │        └─ Code Auditor
   ├─ Researcher
   └─ Digest Clerk
        └─ Six domain bots (one dedicated area of life each)

[ Outside Worker ]
└─ Builder (Only opens pull requests; takes build orders only from Release Manager)
```

The Builder sits outside the reporting tree as an isolated workhorse. It executes fixes and opens draft code changes (pull requests). The analytical bots only inspect, log, and comment.

## What the chart changed

### 1. One point of contact
I talk to one bot: the Chief of Staff. It delegates, coordinates, and never attempts the execution work itself. Critically, it does not manage low-level specialist bots directly. Fourteen direct lines into its context window became three: the Bot Designer, the Researcher, and the Digest Clerk.  

That single shift drove the biggest savings. Fewer open communication lines, not fewer bots. Each bot stays in its lane, and a designated manager aggregates the results before escalating.
### 2. Routine updates route through the Digest Clerk
The six domain bots each handle one specific personal operations domain. Before 11:26 am, each pinged the top of the chain whenever it found something. Now they report exclusively to the Digest Clerk, which bundles their output and delivers a single, structured summary. Six bots asking fragmented questions became one clean morning briefing.
### 3. Reviewers report to a single scorekeeper
The Build Checker, Compliance Gate, and Code Auditor now report only to the Release Manager. When a new code change drops, the Release Manager dispatches it to all three and keeps score. It returns one unified audit per commit. The same pull request is no longer pinged into my feed three separate times by three separate inspectors.  

Escalations move up the chain in a strict sequence: inspector $\rightarrow$ Release Manager $\rightarrow$ Bot Designer $\rightarrow$ Chief of Staff $\rightarrow$ me.  

Only I have merge authority.

### 4. Approvals follow chain of command
Until 11:27 am, I was rubber-stamping routine bot actions one by one. Every approval cycle costs: an incoming alert, a bot spinning up to read it, and an execution token spent on the reply.  

Right after setting the new roster, I set a blanket protocol: _an instruction from your direct manager counts as my approval._ Only public-facing content, production deployments, and financial transactions require my direct sign-off.  

The rule stopped the bots from treating me like a micro-manager in an infinite loop.

### 5. Strict ownership of every pipeline job
Before the chart, multiple bots were inspecting pull requests while simultaneously checking deployment servers. Because neither job had an exclusive owner, every bot kept checking in: _"Is this ready yet?"_  

At 12:14 pm, I restricted the three reviewer bots strictly to pull requests, and routed deploy-monitoring solely through the Release Manager. The duplicate chatter dropped to zero.

## What the chart did not fix on its own

An org chart defines communication paths. It doesn't automatically stop an individual bot from spinning in circles. Here were the other heavy token drains in the log:

### Uncalibrated watch loops
The Build Checker was polling deploy status every 30 minutes from 10:50 until I killed the timer at 11:35 am. The Release Manager ran an aggressive pull-request watch loop from 11:05 until I paused it at 1:53 pm. Earlier that morning, the Build Checker ran repeatedly against the same two pull requests, spitting out identical checks and comments because nothing had changed.  

A bot that wakes on an arbitrary clock timer costs tokens every time it opens its eyes—whether work exists or not.
### Re-running full sweeps on every micro-commit
My rule is that any code approval is tied to a specific commit. That keeps code secure, but it isn't free. Every tiny commit restarts the entire suite of checks. One website update triggered 14 audit rows across four commits. An app update logged 10 audit rows across three.
### Throwaway work from autonomous agents
An automated coding agent spun up four overlapping pull requests back-to-back. The Compliance Gate halted all four, the Build Checker attempted to build all four, and the Release Manager wrote status reports for each—only for the agent to discard them and collapse the work into a single unified branch.  

Six pull requests were reviewed and thrown out unmerged that day. That is why code generation is now strictly locked to one Builder.
### The halt-fix-recheck tax
The Compliance Gate tripped and halted builds six times. Each halt bounced the task back to the Builder, the Builder pushed a patch, and the entire audit battery fired again. A halt proves the guardrails work—but every review loop burns another full cycle of compute.
### Long context-window archaeology
To verify a timeline dispute in my draft notes, one bot read through all eleven of its team's historical chat logs end-to-end, while another ingested ten. My first write-up was rewritten five times in an afternoon, dumping thirty reference files into a single context directory. In LLM land, every full rewrite requires reading the past before drafting the future.

## What I would do differently

1. **Draw the hierarchy before you write prompt #2**. Cap lines into your top coordinator at three. Put operational bots behind a digest clerk, and specialist checkers behind a single manager. 
2. **Wake on state changes, never on clocks**. Polling timers run up your bill on empty air. Trigger bots on inbound webhooks or actual repository events. If a timer is unavoidable, back it off and exit instantly if zero files changed.  
3. **Isolate your worker bot**. Never let multiple agents autonomously open competing tasks. Restrict writing and building to one worker, and batch your fixes before re-triggering expensive review sweeps.  
4. **Delegate operational sign-off early**. Instruct your bots that instructions from their parent manager constitute valid approval. If you are manually approving internal bot handoffs, you aren't managing a multi-agent system—you're the bottleneck in its execution loop.

## Try it yourself

```txt
Before you add your second bot, draw the tree:
- The one bot you talk to (Chief of Staff); it delegates, never executes
- At most three lines reporting directly into it
- Routine updates report to a Digest Clerk, which sends you one unified daily log
- Checkers report to one manager, which produces one consolidated audit per task
- Escalations move up in fixed order; only you hold the keys to merge, publish, or spend

Then, for every single bot, write down:
- Who it reports to
- What wakes it (an event, a message, or a back-off timer)
- What it is permitted to write, and when it must stay silent
- Its max retry cap

Approval rule: "An instruction from your manager counts as my approval,
except for public posts, production deploys, and financial transactions."
Make every bot recite this rule back to you before letting it loose.
```

The bots did real work on day one. But they also did that work twice, three times over, and all at once, because fourteen of them were shouting into the same room. Most of that 78% was the noise of overlapping chatter. The fix wasn't fancier models—it was the org chart.
