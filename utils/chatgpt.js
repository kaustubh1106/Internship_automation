const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(props) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts

    // jd: jobDes,
    // role: 'frontend',
    // cn: companyname ,
    // exp: exp,
    // ach: ach

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    use name: kaustubh sharma student btech 3rd year pursuing  CSE(computer science and engineering ) from Indian Institue of Information Technology
write a cover letter for a ${props.role} in ${props.cn} company. consider these three points:
1. who am I?
2. why am I interested in the particular job role?
3. why should I be hired (most focused)?

-keep the cover letter as short as possible
- personal porfolio link "https://kaustubhsharma.netlify.app"

-expeirience-${props.exp}  !!!!!very important emphasis according to job role 50-60 words or atleast 30-40
- emphasis on acheivement-${props.ach} in !important not more than 20 words

-return only the cover !important
-start from dear hiring manager !important 
[
no need of:
John Doe
123 Main Street
Anytown, USA 12345
john.doe@example.com
June 21, 2024

Hiring Manager
XYZ Company
[Company Address]
]
-end with john doe !important
use dummy data
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

module.exports = {run};