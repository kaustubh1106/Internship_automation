const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function assesment(props) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = ` 
    ${props.text}
    -answer in more human way! 
    - in a way a  of a btech third year student
    - use professional / formal tone and language 
    - !! remember to return only the answer 
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

module.exports = {assesment};