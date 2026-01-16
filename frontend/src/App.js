import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/upload/file",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async () => {
    if (!query) return alert("Please enter a query");
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/upload/query",
        { query }
      );
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Document Chat AI
      </Typography>

      {/* Upload Section */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Upload File
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </Stack>
        {message && <Typography sx={{ mt: 2 }} color="green">{message}</Typography>}
      </Card>

      {/* Query Section */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Ask a Question
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <TextField
            fullWidth
            placeholder="Enter your question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleQuery}
            disabled={loading}
          >
            {loading ? "Querying..." : "Ask"}
          </Button>
        </Stack>

        <Stack spacing={2}>
          {results.map((res, i) => (
            <Card key={i} sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
              <CardContent>{res}</CardContent>
            </Card>
          ))}
        </Stack>
      </Card>
    </Container>
  );
}

export default App;
