# AI Providers

## Purpose

Provide a unified interface for all AI services.

---

# Supported Providers

- OpenAI
- Anthropic Claude
- Google Gemini
- Google Veo
- Google Flow
- Runway
- Leonardo AI
- ComfyUI
- Stable Diffusion
- ElevenLabs

---

# Interface

Every provider implements:

- initialize()
- validate()
- generate()
- status()
- cancel()

---

# Categories

## LLM

- OpenAI
- Claude
- Gemini

---

## Video

- Veo
- Flow
- Runway

---

## Image

- Leonardo
- ComfyUI
- Stable Diffusion

---

## Audio

- ElevenLabs

---

# Rules

- Provider Independent
- Retry Support
- Timeout Support
- Queue Support
- Streaming Support

---

# Future

- Local LLM
- Ollama
- LM Studio
- Azure OpenAI
- AWS Bedrock

---

# Status

Provider Layer V2

Planning