// src/aigenerate/AIGenerate.jsx
import { useState } from "react";
import { jsPDF } from "jspdf";
import styles from "./AIGenerate.module.css"; // CSS Module import

function AIGenerate() {
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("fantasy");
  const [numChapters, setNumChapters] = useState(1);
  const [generatedStory, setGeneratedStory] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || !genre || !numChapters) return;

    setLoading(true);
    setGeneratedStory("");

    try {
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Generate a novel based on the following details:
Story idea: "${description}"
Genre: ${genre}
Number of chapters: ${numChapters}

Please include chapter titles and detailed content.`,
              },
            ],
          },
        ],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        (data.error ? `⚠️ API Error: ${data.error.message}` : "");

      setGeneratedStory(text || "⚠️ No story generated. Try again.");
    } catch (error) {
      console.error("Error generating story:", error);
      setGeneratedStory("⚠️ Error generating story. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!generatedStory) return;
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(generatedStory, 20, 20, { maxWidth: 170 });
    doc.save("Generated_Novel.pdf");
  };

  return (
    <div className={styles.aigenWrapper}>
      <h1>Generate Your Novel</h1>

      <form onSubmit={handleSubmit} className={styles.aigenForm}>
        <div>
          <label>Enter a brief story idea:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="A young hero discovers a hidden world beneath their city..."
            required
          />
        </div>

        <div>
          <label>Select a Genre:</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="fantasy">Fantasy</option>
            <option value="science fiction">Science Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="horror">Horror</option>
            <option value="thriller">Thriller</option>
            <option value="historical fiction">Historical Fiction</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>

        <div>
          <label>Number of Chapters:</label>
          <input
            type="number"
            value={numChapters}
            onChange={(e) => setNumChapters(e.target.value)}
            min="1"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Novel"}
        </button>
      </form>

      {generatedStory && (
        <div className={styles.aigenOutput}>
          <h2>Your Generated Novel</h2>
          <pre>{generatedStory}</pre>
          <button onClick={handleDownloadPDF}>Download as PDF</button>
        </div>
      )}
    </div>
  );
}

export default AIGenerate;