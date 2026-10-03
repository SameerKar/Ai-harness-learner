# **Product Requirements Document (PRD): Pi E-Commerce AI Harness**

## **1\. Executive Summary**

The **Pi Harness** is a highly optimized, "less is more" software application acting as the central nervous system for an autonomous e-commerce pipeline tailored for **Zenswear** (B2B Wholesale) and **Mockinj Pro Project** (Aesthetic Retail). Inspired by lightweight agent frameworks like Hermes, this harness is built in JavaScript/TypeScript and provides both a terminal and a desktop front-end interface.

The core philosophy of Pi is **Model Agnosticism & Cost-Efficiency**. It avoids expensive SaaS platforms, heavily relies on open-source tools, and utilizes tiered intelligence—routing simple tasks to local models (via Ollama) and complex tasks to cloud APIs (HuggingFace, OpenRouter) to minimize costs while maintaining extreme reliability.

### **1.1 The MVP Philosophy: Functional from Step One**

This architecture is designed as a **Minimum Viable Product (MVP) that is fully functional from the get-go**. Instead of waiting for a massive, monolithic system to be built, the Pi Harness is modular. You can run the Module 1 (Ingestion) script entirely on its own today. Once stable, Module 2 (Vision) snaps onto it. The MVP guarantees that at any stage of development, the agent provides immediate operational value to Zenswear and Mockinj without requiring incomplete dependencies.

From this functional MVP base, the harness is designed to scale horizontally (handling more workflows) and vertically (integrating more complex AI memory models).

## **2\. System Architecture & Tech Stack**

The Pi Harness is a desktop-class software application designed for native execution on the user's local machine, acting as the orchestrator for all downstream micro-services.

### **2.1 Core Technology Table (Expanded)**

| Component | Technology / Framework | Purpose & Justification |
| :---- | :---- | :---- |
| **Core Engine** | Node.js / TypeScript | High-performance, async event-driven orchestration. Strict typing ensures data payloads between AI models don't break. |
| **Desktop UI** | Electron / React | Hermes-inspired visual dashboard for workflow management, prompt tweaking, and memory review. |
| **Terminal UI** | Blessed (Node.js) / Ink | Raw CLI for execution logs, debugging, and low-resource headless monitoring. |
| **Event Routing** | Native Node.js EventEmitters | Managing internal webhooks and module triggers natively without Redis bloat (MVP stage). |
| **Scraping & DOM** | Puppeteer / Playwright | Headless DOM monitoring for WhatsApp Web ingestion (Bypassing blob restrictions). |
| **File Watcher** | Chokidar (Node.js) | Native filesystem monitoring to detect local shop photo drops in real-time. |
| **Video Scripting** | Remotion (React) | Deterministic, code-driven video generation for reels using React components. |
| **Local Inference** | Ollama API | Serving quantized GGUF models locally with zero API cost. |
| **Document Parsing** | PDFKit / Markdown-it | Programmatic invoice generation and YAML/Markdown parsing for the database. |

### **2.2 High-Level Architecture & MVP Data Flow Diagram**

graph TD  
    %% User Interfaces  
    UI\[Pi Harness GUI / CLI\] \--\>|User Input/Manual Triggers| Core(Core Event Router / TypeScript)  
      
    %% Model Routing Tier  
    subgraph Intelligence Engine \[Intelligence Engine: Tiered Routing\]  
        Core \--\> Router{Dynamic Model Router}  
        Router \--\>|Tier 1 \- Local Zero Cost| Ollama\[Ollama Local Models\]  
        Router \--\>|Tier 2 \- Vision API| Fal\[Fal.ai / ComfyUI / HF\]  
        Router \--\>|Tier 3 \- Advanced Logic| OpenRouter\[OpenRouter API\]  
    end  
      
    %% Memory Systems  
    subgraph The Brain Dual-Memory \[The Brain: Dual-Memory Architecture\]  
        Core \--\>|Agentic Thought & Context| Mind((The Mind))  
        Mind \--\> Mnemosyne\[Mnemosyne: Episodic Memory JSON\]  
        Mind \--\> Hindsight\[Hindsight: Cognitive Graph JSON\]  
          
        Core \--\>|Hard Transactional Data| Ledger\[(The Ledger)\]  
        Ledger \--\> CSV\[Master Inventory CSV\]  
        Ledger \--\> MD\[Markdown Product DB with YAML\]  
    end  
      
    %% Execution Modules  
    subgraph Pipeline Modules \[Execution Modules\]  
        Core \--\> M1\[M1: Ingestion & Extraction Engine\]  
        Core \--\> M2\[M2: Vision & Generative Studio\]  
        Core \--\> M3\[M3: Librarian & Storage\]  
        Core \--\> M4\[M4: Logistics & Invoicing\]  
    end

    %% Internal Data Flow Links  
    M1 \-.-\>|Structured JSON Output| M2  
    M2 \-.-\>|Processed PNGs/JPGs| M3  
    M3 \-.-\>|SKU & Stock Data| Ledger

## **3\. Intelligence & Model Routing (Tiered Architecture)**

The harness operates on a strict model-agnostic hierarchy. Models are dynamically selected based on task complexity, cost, and availability. This ensures the Pi agent never stalls if a single provider goes down.

### **3.1 Detailed Model Tiering Matrix (MVP Configuration)**

| Tier | Provider | Recommended Models (MVP) | Cost Profile | Exact MVP Use Case |
| :---- | :---- | :---- | :---- | :---- |
| **Tier 1 (Local)** | Ollama | llama3:8b, qwen2:7b, phi3:mini | $0 (Hardware) | Basic text formatting, fast spellchecking, simple routing decisions ("Is this image a t-shirt or jeans?"), short memory summarization. |
| **Tier 2 (Vision)** | Fal.ai / HF | fal-ai/flux-pro, ideogram, sam-2 (Segment Anything) | Micro-cents/API | Running custom ComfyUI workflows, background removal (sam-2), and high-end aesthetic generation (flux). |
| **Tier 3 (Logic)** | OpenRouter | anthropic/claude-3.5-sonnet, google/gemini-1.5-flash | Cents/API | Complex reasoning, parsing chaotic Hinglish wholesale jargon to strict JSON, intent classification, and cognitive graph building. |

### **3.2 Dynamic Fallback Protocol & Trigger Logic**

The MVP includes an automated fallback mechanism written in the Core Router:

1. **Primary Request:** Agent attempts to parse an incoming WhatsApp message using gemini-1.5-flash via OpenRouter (Optimized for speed/cost).  
2. **Timeout/Failure:** If the API returns a 500 error or times out (\> 4000ms), the event router catches the exception.  
3. **Secondary Request:** Instantly re-routes the exact same prompt to a local fallback (llama3:8b via Ollama) to attempt extraction.  
4. **Logging:** Logs the fallback event into the Mnemosyne memory so the agent "remembers" that the cloud API was unstable at this timestamp.

## **4\. The Brain: Memory & Data Management**

The Pi Harness implements a rigid dual-layer memory system separating conversational/agentic context from hard transactional data. This prevents the LLM from hallucinating prices or inventory counts.

### **4.1 Semantic & Agentic Memory (The "Mind")**

This system learns *how* to operate better over time, tracking thoughts and contextual relationships. It operates entirely locally using JSON stores.

* **Mnemosyne-Inspired Storage (Episodic Memory):** A persistent, lightweight local storage system that tracks the agent's step-by-step thought processes.  
  * *MVP JSON Schema Example (episodic\_log.json):*  
    {  
      "timestamp": "2026-08-11T10:00:00Z",  
      "trigger": "User Manual Ingestion Start",  
      "thought": "I am initiating Puppeteer to scan for new supplier drops.",  
      "action\_taken": "Launched M1\_Ingestion\_Script",  
      "status": "Success"  
    }

* **Hindsight-Inspired Cognitive Engine (Mental Models):** A parallel reasoning layer that builds a knowledge graph. It uses recall functions to connect context over time.  
  * *MVP Application:* It learns that "Supplier A usually sends 5 items per photo" or "The Ideogram model performs better with specific prompts for Mockinj Pro Project." It updates a mental\_models.json file to automatically append better context to future prompts.

### **4.2 Transactional Database (The "Ledger")**

* **Strict Separation:** Hard data (SKUs, inventory counts, exact pricing) is **NOT** stored in the semantic memory or processed via standard RAG.  
* **Format:** Stored strictly in local JSON, CSV, and .md files with YAML frontmatter.  
* **Access:** Deterministic programmatic querying. When the agent needs a price, it executes standard Node.js filtering on the CSV.  
* **MVP CSV Master Ledger Structure (master\_inventory.csv):**  
  SKU,Source,Brand,Category,Color,Price\_INR,Stock\_Qty,Image\_Path\_Trust,Image\_Path\_Aesthetic  
  VEN-TSH-260811-RED-001,VendorA,Zenswear,T-Shirt,Red,550,100,./assets/trust/red1.jpg,./assets/aes/red1.jpg  
  LOC-JNS-260811-BLU-002,Local,Mockinj,Jeans,Blue,1200,15,./assets/trust/blu1.jpg,./assets/aes/blu1.jpg

## **5\. Core Pipeline Execution & Modules (MVP Phased Build)**

Every step of this pipeline is built to function independently via the CLI before the GUI is fully attached.

### **5.1 Pipeline Flowchart (Data Lifecycle)**

sequenceDiagram  
    participant W as WhatsApp Web / Local Folder  
    participant M1 as Module 1: Ingestion  
    participant M2 as Module 2: Vision Studio  
    participant M3 as Module 3: Librarian  
      
    W-\>\>M1: Raw Messy Photo \+ Hinglish Text  
    M1-\>\>M1: Tier 3 LLM (Gemini 1.5) Parses to clean JSON  
    M1-\>\>M2: Send Clean JSON Payload \+ Raw Image  
    M2-\>\>M2: Fal.ai / SAM-2: Crop & Segment  
    M2-\>\>M2: Fal.ai / Flux: Zenswear (Trust) & Mockinj (Aesthetic) Generations  
    M2-\>\>M3: Return Generated PNGs/JPGs to Local Drive  
    M3-\>\>M3: Generate Strict SKU (e.g., VEN-TSH-RED-001)  
    M3-\>\>M3: Write YAML to Markdown  
    M3-\>\>M3: Update CSV Ledger

### **5.2 Step-by-Step Module Breakdown**

#### **Module 1: Human-in-the-Loop Ingestion (Data Capture)**

* **Browser Automation:** Utilizes **Puppeteer** to scrape Zenswear wholesale suppliers on WhatsApp Web. Bypasses Blob URLs by injecting base64 conversion scripts directly into the DOM.  
* **Local Watchdog:** Uses chokidar to simultaneously monitor a local folder (/Local\_Shop\_Drops) for physically clicked photos.  
* **Session Management:** Triggered **manually** via the Pi Terminal/GUI to avoid complex timeouts and Meta ban risks. The user oversees the initial QR connection.  
* **Parsing Engine:** Tier 3 LLM reads Hinglish wholesale jargon and outputs strict JSON.  
  * *Prompt Payload:* "Extract product category, price, sizes. Output ONLY valid JSON."  
  * *Expected Output:* { "category": "t-shirt", "price": 550, "sizes": \["M", "L", "XL"\] }

#### **Module 2: The Vision Studio (ComfyUI via Fal.ai)**

* **Execution:** Instead of running heavy RunPod instances constantly, the MVP fires API requests to Fal.ai running pre-configured ComfyUI workflows (stored as templates in the Pi Harness).  
* **Generation Tracks:**  
  1. **Segmentation:** First API call runs Segment Anything (SAM-2) to isolate garments and output transparent PNGs.  
  2. **Zenswear Trust Track:** Second API call uses image-to-image to place the transparent garment onto a realistic, consistent wholesale shop counter.  
  3. **Mockinj Pro Project Track:** Third API call uses Flux/Ideogram to generate high-end streetwear studio aesthetics.  
* **Deterministic Video Generation (Reels):** Pure AI text-to-video generation is deprioritized due to high cost and hallucination risk. The MVP uses **Remotion** (React). A local Node script injects the *Mockinj Aesthetic Image* into a Remotion template, adding programmatic camera pans, text overlays, and transitions, exporting a perfect 3-second .mp4 locally.

#### **Module 3: File System & Directory Management (The Librarian)**

* **Regex SKU Engine:** Automatically renames raw assets based on the parsed JSON (e.g., \[SOURCE\]-\[CATEGORY\]-\[DATE\]-\[COLOR\]-\[UNIQUE\_ID\]).  
* **Folder Architecture Enforcement:** Moves files into 1\_Raw\_Assets, 2\_Processed\_Assets, and 3\_Publishable\_Generations.  
* **Database Writing:** 1\. Appends the new SKU row to master\_inventory.csv. 2\. Generates an Obsidian-ready .md file containing the YAML frontmatter and image links for the AI's future contextual reading.

#### **Module 4: Logistics & Finalization (Prep for Expansion)**

* **Brand-Aware Invoicing:** Uses pdfkit locally. Based on the SKU (Zenswear vs Mockinj), the agent generates a styled PDF invoice locally.  
* **Ledger Deduction (Mutation):** A script that subtracts stock quantity from the .md file and CSV file upon manual trigger/confirmation of payment.

## **6\. Paused / Future Scope**

To maintain the "less is more" constraint, protect the local-first architecture, and avoid unexpected API costs during the MVP phase, the following features are temporarily parked but planned for horizontal scaling:

| Feature | Reason for Pause (MVP Constraint) | Future Activation Condition |
| :---- | :---- | :---- |
| **OpenWA CRM Integration** | High complexity and potential third-party DB dependencies. | Will activate once the internal Pi agent pipeline (Modules 1-3) is 100% stable natively via terminal. |
| **Automated Bulk WhatsApp Messaging** | Meta charges per message for marketing broadcasts via the official API. | Will integrate when a dedicated marketing budget is allocated and R.O.I is proven. |
| **Generative AI Video (Kling/Veo)** | Text-to-Video models are expensive and lack precise, deterministic brand control. | Will replace Remotion when open-source video models run efficiently locally or API costs drop significantly. |
| **Automated Shipping Routing (Shiprocket)** | Requires live API keys and strict address parsing. | To be integrated in Phase 2 of the MVP rollout after manual shipping workflows are verified. |

## **7\. Next Steps for Implementation (Phased Rollout Plan)**

To ensure the Pi Harness functions step-by-step from the get-go, we will build in this exact sequence:

1. **Step 1: Initialize Core & Terminal UI.** Set up the Node.js/TypeScript environment. Build the raw Terminal interface using blessed to view logs. Establish the local folder hierarchy (Vaults).  
2. **Step 2: Build the Tiered Model Router.** Create the API wrappers for Ollama (local) and OpenRouter (cloud), establishing the fallback hierarchy matrix and testing latency.  
3. **Step 3: Deploy Module 1 (Ingestion).** Build the Puppeteer script and the Gemini 1.5 JSON parsing prompt. Test end-to-end extraction from a live WhatsApp group into a local JSON file.  
4. **Step 4: Deploy Module 3 (The Ledger).** Build the script that converts the extracted JSON into the strict SKU format, writes to the CSV, and generates the Markdown files.  
5. **Step 5: Deploy Module 2 (Vision Studio).** Map out the exact JSON payloads required to trigger the Zenswear and Mockinj image generation templates remotely via Fal.ai.  
6. **Step 6: Attach Desktop GUI.** Wrap the functional CLI application into an Electron/React dashboard for visual workflow management.