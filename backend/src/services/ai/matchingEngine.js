const { openai, OPENAI_CONFIG } = require('../../config/openai');
const logger = require('../../config/logger');

/**
 * AI Matching Engine
 * Core service for matching seekers with experts using OpenAI GPT-4o
 */
class MatchingEngine {
  /**
   * Analyze consultation request and match with experts
   * @param {Object} consultationRequest - The consultation request from seeker
   * @param {Array} expertProfiles - Array of expert profiles to match against
   * @returns {Array} Ranked list of experts with scores and rationale
   */
  async matchExperts(consultationRequest, expertProfiles) {
    try {
      logger.info('Starting AI matching process', {
        requestId: consultationRequest.id,
        expertCount: expertProfiles.length,
      });

      // Prepare the matching prompt
      const prompt = this.buildMatchingPrompt(consultationRequest, expertProfiles);

      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: OPENAI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(),
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: OPENAI_CONFIG.temperature,
        max_tokens: OPENAI_CONFIG.maxTokens,
        response_format: { type: 'json_object' },
      });

      // Parse and process the response
      const result = JSON.parse(response.choices[0].message.content);
      
      logger.info('AI matching completed successfully', {
        requestId: consultationRequest.id,
        matchesFound: result.matches?.length || 0,
      });

      return result.matches || [];
    } catch (error) {
      logger.error('Error in AI matching engine:', error);
      throw new Error('Failed to perform AI matching: ' + error.message);
    }
  }

  /**
   * Build the matching prompt for OpenAI
   */
  buildMatchingPrompt(consultationRequest, expertProfiles) {
    return `
# Consultation Request Analysis

## Seeker's Request:
- **Title**: ${consultationRequest.title}
- **Problem Statement**: ${consultationRequest.problemStatement}
- **Expectations**: ${consultationRequest.expectations || 'Not specified'}
- **Scope**: ${consultationRequest.scope || 'Not specified'}
- **Budget**: ${consultationRequest.budget ? `$${consultationRequest.budget}` : 'Not specified'}
- **Preferred Mode**: ${consultationRequest.preferredMode?.join(', ') || 'Any'}
- **Duration**: ${consultationRequest.duration || 'Not specified'}

## Available Experts:
${expertProfiles.map((expert, index) => `
### Expert ${index + 1} (ID: ${expert.id})
- **Name**: ${expert.user.firstName} ${expert.user.lastName}
- **Headline**: ${expert.headline || 'Not provided'}
- **Bio**: ${expert.bio || 'Not provided'}
- **Years of Experience**: ${expert.yearsOfExperience || 'Not specified'}
- **Hourly Rate**: ${expert.hourlyRate ? `$${expert.hourlyRate}` : 'Not specified'}
- **Availability**: ${expert.availability}
- **Rating**: ${expert.rating || 'No ratings yet'}
- **Total Consultations**: ${expert.totalConsultations}

**Education**:
${expert.educations?.map(edu => `  - ${edu.degree} in ${edu.fieldOfStudy} from ${edu.institution} (${edu.startYear}-${edu.endYear || 'Present'})`).join('\n') || '  - Not provided'}

**Work Experience**:
${expert.workExperiences?.map(exp => `  - ${exp.title} at ${exp.company} (${exp.industry || 'Industry not specified'}) - ${exp.isCurrent ? 'Current' : 'Past'}\n    ${exp.description || ''}`).join('\n') || '  - Not provided'}

**Skills**:
${expert.skills?.map(s => `  - ${s.skill.name} (${s.proficiency}, ${s.yearsOfExp || 0} years)`).join('\n') || '  - Not provided'}

**Industries**:
${expert.industries?.map(i => `  - ${i.industry.name} (${i.yearsOfExp || 0} years experience)`).join('\n') || '  - Not provided'}

**Achievements**:
${expert.achievements?.map(a => `  - ${a.title}: ${a.description}`).join('\n') || '  - Not provided'}
`).join('\n---\n')}

# Task:
Analyze the consultation request and rank ALL experts based on their fit. For each expert, provide:
1. A matching score (0-100)
2. A detailed rationale explaining why this expert is or isn't a good match
3. Key strengths relevant to this consultation
4. Potential concerns or gaps

Return your analysis in the following JSON format:
{
  "matches": [
    {
      "expertId": "string",
      "score": number (0-100),
      "rationale": "string (detailed explanation in 2-3 sentences)",
      "strengths": ["string", "string", "string"],
      "concerns": ["string", "string"],
      "industryFit": number (0-100),
      "skillFit": number (0-100),
      "experienceFit": number (0-100),
      "budgetFit": number (0-100),
      "availabilityFit": number (0-100)
    }
  ],
  "summary": "string (overall analysis summary)"
}

Sort the matches array by score in descending order. Provide matches for ALL experts, even those with low scores.
`;
  }

  /**
   * Get system prompt for AI matching
   */
  getSystemPrompt() {
    return `You are an expert matching AI system for a professional consulting platform. Your role is to analyze consultation requests and match them with the most suitable experts.

Your analysis should consider:
1. **Industry Fit**: Does the expert have experience in the seeker's industry?
2. **Skill Match**: Do the expert's skills align with the problem statement?
3. **Experience Level**: Does the expert have appropriate seniority for this challenge?
4. **Budget Compatibility**: Is the expert's rate within the seeker's budget?
5. **Availability**: Is the expert available and willing to work in the preferred mode?
6. **Track Record**: Does the expert have proven success in similar projects?
7. **Communication**: Can the expert effectively address the stated expectations?

Provide honest, balanced assessments. Highlight both strengths and potential concerns. Be specific and reference concrete details from profiles. Your rationale should be clear enough that a non-technical person can understand why a match is good or not.

When multiple experts are equally qualified, differentiate them by:
- Specific relevant experiences
- Unique achievements
- Industry-specific insights
- Availability and working preferences

Always maintain professionalism and objectivity in your analysis.`;
  }

  /**
   * Generate embedding for semantic search (if using vector database)
   * @param {string} text - Text to generate embedding for
   * @returns {Array} Embedding vector
   */
  async generateEmbedding(text) {
    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });

      return response.data[0].embedding;
    } catch (error) {
      logger.error('Error generating embedding:', error);
      throw new Error('Failed to generate embedding: ' + error.message);
    }
  }

  /**
   * Calculate semantic similarity between two texts
   * @param {string} text1 - First text
   * @param {string} text2 - Second text
   * @returns {number} Similarity score (0-1)
   */
  async calculateSimilarity(text1, text2) {
    try {
      const [embedding1, embedding2] = await Promise.all([
        this.generateEmbedding(text1),
        this.generateEmbedding(text2),
      ]);

      // Calculate cosine similarity
      const dotProduct = embedding1.reduce((sum, val, i) => sum + val * embedding2[i], 0);
      const magnitude1 = Math.sqrt(embedding1.reduce((sum, val) => sum + val * val, 0));
      const magnitude2 = Math.sqrt(embedding2.reduce((sum, val) => sum + val * val, 0));

      return dotProduct / (magnitude1 * magnitude2);
    } catch (error) {
      logger.error('Error calculating similarity:', error);
      throw new Error('Failed to calculate similarity: ' + error.message);
    }
  }

  /**
   * Extract key requirements from consultation request
   * @param {Object} consultationRequest
   * @returns {Object} Extracted requirements
   */
  async extractRequirements(consultationRequest) {
    try {
      const prompt = `Analyze this consultation request and extract key requirements:

Title: ${consultationRequest.title}
Problem Statement: ${consultationRequest.problemStatement}
Expectations: ${consultationRequest.expectations || 'Not specified'}

Extract and return in JSON format:
{
  "requiredSkills": ["skill1", "skill2"],
  "requiredIndustries": ["industry1"],
  "problemType": "string",
  "urgency": "low|medium|high",
  "complexity": "low|medium|high",
  "keywords": ["keyword1", "keyword2"]
}`;

      const response = await openai.chat.completions.create({
        model: OPENAI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: 'You are a requirements extraction AI. Extract key information from consultation requests.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
        response_format: { type: 'json_object' },
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      logger.error('Error extracting requirements:', error);
      throw new Error('Failed to extract requirements: ' + error.message);
    }
  }
}

module.exports = new MatchingEngine();
