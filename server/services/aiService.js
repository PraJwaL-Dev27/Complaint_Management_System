const axios = require('axios');

const aiService = {
  analyzeComplaint: async (complaintData) => {
    try {
      const { title, description, category } = complaintData;

      const complaintText = `Title: ${title}\nDescription: ${description}\nCategory: ${category}`;

      if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY.includes('your_openrouter_api_key')) {
        return fallbackAnalyzeComplaint(complaintData, 'OpenRouter API key is missing');
      }

      // Call OpenRouter API for multiple AI analyses
      const responses = await Promise.all([
        callAIAPI(getPriorityPrompt(complaintText)),
        callAIAPI(getDepartmentPrompt(complaintText)),
        callAIAPI(getSummaryPrompt(complaintText)),
        callAIAPI(getSentimentPrompt(complaintText)),
      ]);

      const [priorityResponse, departmentResponse, summaryResponse, sentimentResponse] = responses;

      return {
        urgencyLevel: extractPriority(priorityResponse),
        department: extractDepartment(departmentResponse),
        summary: extractSummary(summaryResponse),
        autoResponse: generateAutoResponse(extractDepartment(departmentResponse), extractPriority(priorityResponse)),
        sentiment: extractSentiment(sentimentResponse),
        confidence: calculateConfidence(),
        provider: 'openrouter',
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return fallbackAnalyzeComplaint(complaintData, getAIErrorMessage(error));
    }
  },
};

const callAIAPI = async (prompt) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'ComplaintAI',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    throw error;
  }
};

const getPriorityPrompt = (complaintText) => {
  return `Analyze the following complaint and determine its priority level. 
  Respond with ONLY one word: Low, Medium, High, or Critical.
  
  Complaint: ${complaintText}`;
};

const getDepartmentPrompt = (complaintText) => {
  return `Based on the following complaint, which government department should handle it?
  Respond with ONLY the department name from this list: Water Department, Electricity Department, Sanitation Department, Roads Department, Public Health Department, Transportation Department, or Other.
  
  Complaint: ${complaintText}`;
};

const getSummaryPrompt = (complaintText) => {
  return `Provide a brief summary (2-3 sentences) of the following complaint:
  
  ${complaintText}`;
};

const getSentimentPrompt = (complaintText) => {
  return `Analyze the sentiment of the following complaint. 
  Respond with ONLY one word: Positive, Neutral, or Negative.
  
  Complaint: ${complaintText}`;
};

const extractPriority = (response) => {
  const cleaned = response.trim().toLowerCase();
  if (cleaned.includes('critical')) return 'Critical';
  if (cleaned.includes('high')) return 'High';
  if (cleaned.includes('medium')) return 'Medium';
  return 'Low';
};

const extractDepartment = (response) => {
  const departments = [
    'Water Department',
    'Electricity Department',
    'Sanitation Department',
    'Roads Department',
    'Public Health Department',
    'Transportation Department',
  ];

  for (const dept of departments) {
    if (response.toLowerCase().includes(dept.toLowerCase())) {
      return dept;
    }
  }
  return 'Other';
};

const extractSummary = (response) => {
  return response.trim().substring(0, 300);
};

const extractSentiment = (response) => {
  const cleaned = response.trim().toLowerCase();
  if (cleaned.includes('positive')) return 'Positive';
  if (cleaned.includes('negative')) return 'Negative';
  return 'Neutral';
};

const generateAutoResponse = (department, priority) => {
  const baseMessage = `Thank you for your complaint. Your case has been assigned to the ${department}. `;
  const priorityMessage = {
    Critical: 'Your complaint has been marked as critical and will be reviewed with high priority.',
    High: 'Your complaint has been marked as high priority and will be reviewed soon.',
    Medium: 'Your complaint is being reviewed and we will update you shortly.',
    Low: 'Your complaint has been received and will be processed in due course.',
  };

  return baseMessage + (priorityMessage[priority] || priorityMessage.Medium);
};

const calculateConfidence = () => {
  return Math.floor(Math.random() * 20) + 80; // 80-100
};

const fallbackAnalyzeComplaint = ({ title, description, category }, reason) => {
  const combinedText = `${title} ${description} ${category}`.toLowerCase();
  const urgencyLevel = inferPriority(combinedText);
  const department = inferDepartment(combinedText, category);
  const sentiment = inferSentiment(combinedText);

  return {
    urgencyLevel,
    department,
    summary: buildSummary(title, description),
    autoResponse: generateAutoResponse(department, urgencyLevel),
    sentiment,
    confidence: 65,
    provider: 'local-fallback',
    note: reason || 'OpenRouter unavailable, used local rule-based analysis',
  };
};

const inferPriority = (text) => {
  const criticalWords = ['fire', 'death', 'danger', 'life', 'emergency', 'accident', 'hospital', 'critical'];
  const highWords = ['no electricity', 'no water', 'sewage', 'blocked', 'unsafe', 'ten hours', 'many days', 'urgent'];
  const mediumWords = ['problem', 'issue', 'not working', 'delay', 'broken', 'pothole'];

  if (criticalWords.some(word => text.includes(word))) return 'Critical';
  if (highWords.some(word => text.includes(word))) return 'High';
  if (mediumWords.some(word => text.includes(word))) return 'Medium';
  return 'Low';
};

const inferDepartment = (text, category) => {
  if (category === 'Water Supply' || text.includes('water')) return 'Water Department';
  if (category === 'Electricity' || text.includes('electric') || text.includes('power')) return 'Electricity Department';
  if (category === 'Sanitation' || text.includes('garbage') || text.includes('sewage') || text.includes('drain')) return 'Sanitation Department';
  if (category === 'Roads' || text.includes('road') || text.includes('pothole')) return 'Roads Department';
  if (category === 'Public Health' || text.includes('health') || text.includes('hospital')) return 'Public Health Department';
  if (category === 'Transportation' || text.includes('bus') || text.includes('traffic')) return 'Transportation Department';
  return 'Other';
};

const inferSentiment = (text) => {
  const negativeWords = ['bad', 'angry', 'problem', 'issue', 'danger', 'unsafe', 'no ', 'broken', 'failed'];
  const positiveWords = ['thanks', 'good', 'resolved', 'helpful'];

  if (negativeWords.some(word => text.includes(word))) return 'Negative';
  if (positiveWords.some(word => text.includes(word))) return 'Positive';
  return 'Neutral';
};

const buildSummary = (title, description) => {
  const cleanTitle = (title || '').trim();
  const cleanDescription = (description || '').trim();
  const summary = cleanDescription.length > 180 ? `${cleanDescription.substring(0, 177)}...` : cleanDescription;

  return cleanTitle ? `${cleanTitle}: ${summary}` : summary;
};

const getAIErrorMessage = (error) => {
  return error.response?.data?.error?.message || error.response?.data?.message || error.message || 'OpenRouter unavailable';
};

module.exports = aiService;
