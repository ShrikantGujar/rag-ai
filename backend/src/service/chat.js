export const chat = async (req, res) => {
  const { question } = req.body;

  return res.json({
    answer: "Backend API working!",
    question
  });
};
