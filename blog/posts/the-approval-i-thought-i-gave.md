---
title: The first file I wrote for my vault wasn't a note. It was a briefing.
date: 2026-11-16
summary: My notes agent starts every session from zero. On day one I wrote down who it was talking to.
tags: [pipeline, agentic-engineering]
draft: false
---
# The first file I wrote for my vault wasn't a note. It was a briefing.

*My notes agent starts every session from zero. On day one I wrote down who it was talking to.*

On 29 April 2026 I started a vault: a folder of markdown files that an AI agent and I read and write together. By the end of that day the log had 12 entries.

Most vaults start with notes. Mine started with a rules file, an empty index, an append-only log, five page templates, and a short briefing about me.

The agent has no memory between sessions. Every morning it opens the folder knowing nothing. I could re-explain myself each time, or write it down once. I wrote it down.

## Day zero, from the log

Here is what existed when the first day ended, from my own log.

| Item | State on 29 April |
| --- | --- |
| Rules file | One schema, version 1.0 |
| Index | Empty catalog |
| Log | Append-only, newest first |
| Page templates | 5: entity, concept, topic, source, synthesis |
| Daily notes | System set up, first note created |
| Log entries | 12: the bootstrap, the daily-note system, and ten ingests |

The ingest style was written down too: guided, one source at a time. I did not want the agent filing a pile of material in one go while I looked away.

## What the briefing holds

The briefing is a plain markdown file. It has five jobs.

| Section | What it tells the agent | Why it is there |
| --- | --- | --- |
| Who I am | Name, what I go by, what the vault is for | So it stops asking |
| How I like to work | Casual and brief. Honest pushback. A collaborator, not a tool | So it stops agreeing with everything |
| Rules for the agent | Ask before changing an existing file. Timestamped files are named `YYYYMMDD_Description.ext` | So the small things stay consistent |
| Who the agent is | A disciplined librarian and editor whose output always ends up in files | So it files things instead of chatting about them |
| Session start protocol | Five steps, below | So every session begins the same way |

## The first five minutes of every session

1. Read the briefing.
2. Read the last 5 to 10 entries of the log.
3. Skim the index.
4. If the task lives in one project folder, read that folder's context and index too.
5. Open with a one-paragraph status: how many pages exist, what was last filed, and any open flags.

Underneath those steps sits one more line, in the rules: when starting fresh, say what context you have, and confirm you have no prior conversation history. I want to know who I am talking to.

That rule has earned its place. A cold start does not feel cold. The agent is fluent, so it sounds like it remembers. Making it say "here is what I was given, and nothing else" turns a feeling into a fact.

## The interview

The first draft on 29 April had structure but lacked profile data.  

On 2 May I had the agent run a structured interview: it asked questions, I answered, and it committed the output directly to the file. That session established the working profile the agent still references.  

Writing a briefing cold produces generic rules. Running an intake interview surfaces the constraints the model actually struggles with.

## Where it is weaker than it looks

- **The file is 258 lines.** A briefing that long is more like a second wiki page than a briefing. The agent reads all of it, every session, whether it needs it or not.
- **The header lies.** It says "Last Updated: 2026-05-02". The same file contains an edit dated 4 July and another dated 23 September. I changed the contents and never touched the header.
- **I live in two places.** My profile is in the briefing and also in an entity page. When a fact changes, I have to change both, and I do not always.
- **"No prior history" is a statement, not a guarantee.** The agent can only report what it was handed. It cannot prove it is not carrying something from somewhere else.

## What I would do differently

1. **Run the interview on day zero.** I waited until 2 May. Running the intake interview before filing the first source avoids four days of vague agent defaults.  
2. **Hard-cap the bootloader at 80 lines.** 258 lines dilutes session context on every cold boot. Keep the briefing to routing and protocol; link out to entity files for deep context.  
3. **Kill duplicate profile pages.** Maintain personal facts in one place. Storing identity in both the briefing and an entity page guaranteed drift.  
4. **Never trust manual date headers.** If a timestamp is not appended automatically by a script or version log, it will rot. My header has been wrong since 4 July.

## Try it yourself

Before your agent files a single note, paste this:

```text
Before we add any notes, interview me for ten minutes so you can write a briefing file.
Ask one question at a time. Cover: what I want you to call me, what this vault is for,
how I like answers (length, tone), what you should push back on, and what you must never do.
Then write it to aios/me.md in under 80 lines.
Add a "Session start" section: read this file, read the last 5 entries of wiki/log.md,
skim wiki/index.md, then tell me in one paragraph what context you have and that you
have no memory of earlier chats.
```

Notes are what the vault knows. The briefing is what the agent knows about who is asking. I wrote the rules before the notes, and the briefing before the rules.