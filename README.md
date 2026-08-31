# AI-Driven API Design Workshop

This repository contains the exercises, prompts, examples, and supporting material for the **AI-Driven API Design** workshop.

The workshop explores how AI can assist with a sequence of API design and implementation tasks while preserving the design intent from one step to the next.

## Workshop flow

We will work through a series of transformations:

```text
API Story
   ↓
ALPS Profile
   ↓
Documentation
   ↓
OpenAPI
   ↓
Node.js Implementation
   ↓
API Tests
```

We will also explore applying **role-based access control (RBAC)** to the resulting API design.

The numbered directories correspond roughly to the workshop exercises:

1. `00-hello-coach` — introduction to using an AI coach
2. `01-api-stories-to-alps` — translate an API Story into an ALPS profile
3. `02-alps-to-html` — generate human-readable API documentation
4. `03-alps-to-open-api` — translate ALPS into an OpenAPI description
5. `04-alps-to-nodejs` — generate a working Node.js API
6. `05-nodejs-to-test` — generate and verify API tests
7. `06-rbac-security-profile` — describe API authorization rules
8. `07-rbac-alias-context` — connect RBAC concepts back to the ALPS model

Each exercise contains some combination of prompts, guidance, checklists, examples, and generated output.

## Getting started

Clone or download this repository before the workshop:

```bash
git clone https://github.com/mamund/2026-08-ai-driven-workshop.git
cd 2026-08-ai-driven-workshop
```

The `starter-files` directory contains ALPS documents that can be used as inputs during the exercises.

The `background` directory contains additional material on ALPS and the AI-driven API design approach.

## Working with AI

You can use the AI assistant of your choice for the exercises.

A recurring pattern throughout the workshop is:

```text
source material
+ instructions
+ constraints
+ verification
= generated artifact
```

Pay particular attention to the guidance and verification checklists. The goal is to use AI as part of a repeatable design process rather than treat generated output as automatically correct.

## About

Workshop materials by **Mike Amundsen**.

The exercises are part of ongoing work exploring AI-assisted API design, behavioral preservation, and the use of ALPS as an intermediate design representation.

