# ChatGPT Context Window Limits (Free vs Plus)

This document summarizes the current context window (token) limits for different ChatGPT account types as of May 2025.

## 📦 What is a Context Window?

The context window defines how much input and output ChatGPT can consider at once. It includes:
- User prompts
- Model responses
- System messages (if any)

Context is measured in **tokens**, not words.

---

## 🔓 Free Account

- **Model Access**: GPT-3.5 and limited GPT-4o
- **Context Window**: `8,000 tokens`
- **Approx. Word Count**: ~6,000 words  
  (Assumes average: 1 token ≈ 0.75 words)
- **Token Composition**: Includes both input and output
- **Note**: After ~8,000 tokens, older content drops from memory

---

## 💰 ChatGPT Plus Account

- **Model Access**: GPT-4o (default), GPT-4.1 (optionally)
- **Context Window**:
  - **GPT-4o**: `128,000 tokens` → ~96,000–170,000 words
  - **GPT-4.1** (optional): Up to `1 million tokens` (in API contexts only)
- **Token Composition**: Includes entire interaction (inputs + responses)
- **Practical Limit**: Ideal for long multi-part conversations, file uploads, and agent-style sessions

---

## 📝 Notes

- Token usage varies based on content:
  - Plain text: ~0.75 tokens per word
  - Code/JSON: ~1–1.3 tokens per word
- Uploading large files or multi-step workflows may accelerate token usage
- Free accounts have significantly lower memory capacity per session

---

## 🔧 Estimating Token Usage

| Content Type | Words per 1,000 Tokens | Approx. Words |
|--------------|------------------------|----------------|
| Plain English text | ~1,300 words | ✅ Efficient |
| Dense code/markup   | ~700–900 words | ⚠️ Token-heavy |

Use OpenAI’s [Tokenizer Tool](https://platform.openai.com/tokenizer) to get accurate counts.

---

_Last updated: May 2025_

