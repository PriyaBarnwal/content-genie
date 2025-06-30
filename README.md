# Content GENie

> 🧠 AI-powered creative assistant for marketers — built as a hackathon proof of concept.

Content GENie is an AI-based tool designed to help marketing teams create engaging, brand-aligned content quickly and effortlessly. Developed as a hackathon PoC at Khoros, the project uses generative AI and image understanding to automate visual editing and generate multilingual captions and hashtags.

---

## ✨ Features

- **🖼️ Image Editing with Natural Language**
  - ✂️ Remove or replace objects
  - 🪄 Change image backgrounds
  - 🧽 Remove unwanted text or overlays

- **📢 Captions & Hashtags**
  - Generates catchy, multilingual hashtags & captions tailored to the image and brand tone

- **🎯 Smart Object Selection**
  - Uses the **Segment Anything Model (SAM)** to auto-select objects for editing with pixel accuracy

---

## 📽️ Demo

👉 check this link for the demo: https://drive.google.com/file/d/1evZIMx3Z06g9DjFRehXvrWbIu_ocGY__/view?usp=sharing

---
## 🧪 Sample Screenshots

### Landing page
![Landing page UI](ss/landing-page.png)

### Features
![Features](ss/features.png)


### AI/ML Workflow
<table>
  <tr>
    <td style="width: 50%;"> 
      <img src="ss/ai-ml-workflow.png" alt="AI-ML workflow" width="700"/>
    </td>
    <td style="vertical-align: top;">
      <h4> Summary</h4>
      <ul>
        <li><strong>Object Selection</strong> → Uses <em>Segment Anything Model (SAM)</em> to let users click and isolate objects with pixel-accurate masks.</li>
        <li><strong>Remove Object</strong> → Uses <em>Big Lama</em> model to smartly fill the removed area with context-aware content.</li>
        <li><strong>Replace Object</strong> → Uses <em>Kandinsky 2.2 Decoder Inpaint</em> to swap objects using prompt-guided generative inpainting.</li>
        <li><strong>Fill Background</strong> → Uses <em>Stable Diffusion 2 Inpainting</em> to regenerate removed regions using natural language prompts. </li>
        <li><strong>Image Captioning</strong> → Uses <em>BLIP 2.7B</em> to convert images into descriptive captions. </li>
        <li><strong>Captions & Hashtags</strong> → Uses <em>Claude V1 (AWS Bedrock)</em> for multilingual post text</li>
      </ul>
    </td>
  </tr>
</table>


---

## 👥 Team

- Priyanka Barnwal  
- Shreyas SK  
- Jyotsana  
- Balachander Sivaraj  
- Vivek Grewal
