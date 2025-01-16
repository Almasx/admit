// Define types for our content
type Prompt = {
  text: string;
};

type BrainstormMode = {
  id: "new ideas" | "based on background";
  text: string;
  imageSrc: string;
  altText: string;
};

export const CTA_LINK = "/essay";

export const COMMON_APP_PROMPTS: Prompt[] = [
  {
    text: "Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.",
  },
  {
    text: "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
  },
  {
    text: "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?",
  },
  {
    text: "Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?",
  },
  {
    text: "Describe a person who has had a significant influence on your life.",
  },
  {
    text: "Describe a place or environment where you are perfectly content.",
  },
  {
    text: "Reflect on a time when you faced a challenge, setback, or failure. How did you react? What did you learn from the experience?",
  },
];

export const BRAINSTORM_MODES: BrainstormMode[] = [
  {
    id: "new ideas",
    text: "I want new ideas",
    imageSrc: "/new-idea.svg",
    altText: "new ideas",
  },
  {
    id: "based on background",
    text: "I want ideas based on my background",
    imageSrc: "/bg-idea.svg",
    altText: "based on background",
  },
];

export const HEADER_TEXT = {
  prompt: "Choose essay prompt",
  questions: "Generate questions",
  topics: "Generate essay topics",
  details: "Answer detailed questions",
  essay: "Generate essay",
};

// src/lib/const.ts
export const RECOMMENDATION_QUESTIONS = [
  "What is the context and duration of the relationship?",
  "What are the student’s main academic strengths?",
  "What does the student show a particular interest in?",
  "How does the student approach learning?",
  "Can you provide an example of a significant academic achievement or project?",
  "How does the student handle challenging material?",
  "Is there any academic improvement or growth to highlight?",
  "What kind of impact will this student likely have on a college or professional community?",
  "How would this student contribute to a team or group environment in the future?",
  "What do you believe this student will achieve in the future? Describe potential in their chosen field or area of interest.",
  "Is there anything you’ll personally miss about this student? Explain why.",
];

// 1. Basic Information
// Who is the recommender? (e.g., teacher, counselor, employer, coach)
// What is the context and duration of the relationship? (e.g., number of years, specific subjects or activities taught, professional projects)
// 2. Academic Performance and Intellectual Vitality
// What are the student’s main academic strengths? (specific subjects, types of skills, learning styles)
// Does the student show a particular interest in any subject or topic? Describe any specific areas of passion or curiosity.
// How does the student approach learning? (e.g., proactive, curious, independent, collaborative)
// Can you provide an example of a significant academic achievement or project? (e.g., research paper, presentation, experiment, competition)
// How does the student handle challenging material? (e.g., asks questions, seeks help, self-studies)
// Is there any academic improvement or growth to highlight? (e.g., overcoming struggles in specific areas, working with tutors)
// Does the student’s work demonstrate creativity or an unusual approach? If yes, provide an example.
// 3. Personal Qualities and Character
// What personal qualities stand out most in this student? (e.g., resilience, empathy, honesty, enthusiasm)
// Does the student display any unique personality traits? (e.g., humor, patience, independence, critical thinking)
// How does the student react to feedback or criticism? Provide an example, if possible.
// Are there any moments where the student demonstrated maturity beyond their years?
// How does the student handle setbacks or obstacles? Describe a time when they faced a challenge.
// What qualities make this student unique or irreplaceable?
// 4. Peer and Community Interaction
// How does the student interact with their peers? (e.g., collaborative, supportive, mentor-like)
// Does the student demonstrate leadership qualities? If so, describe specific examples (e.g., leading a team, proposing initiatives).
// How does the student contribute to group work? (e.g., leads, supports, mediates, problem-solves)
// Is the student involved in any peer support or mentorship roles? Describe.
// How do classmates, teachers, or colleagues perceive this student? (e.g., admired, trusted, respected)
// Does the student bring a positive impact to the class or community environment? Provide examples if possible.
// 5. Initiative and Motivation
// Has the student demonstrated initiative beyond assigned tasks? Describe a time when they took initiative.
// Is the student involved in any extracurricular activities, clubs, or projects? Explain their role, achievements, and impact.
// Has the student proposed or led any projects, activities, or groups? Describe.
// What motivates this student in academic or extracurricular activities? (e.g., a particular goal, passion for learning, helping others)
// 6. Specific Achievements and Recognition
// Has the student received any awards, recognitions, or honors? (academic, athletic, artistic, community-based)
// Can you provide examples of outstanding work? (e.g., writing samples, science projects, art portfolios, leadership activities)
// Are there any anecdotes that exemplify the student’s dedication or achievements?
// 7. Extracurricular and Community Involvement
// What extracurricular activities does the student participate in? Describe their contributions and any leadership roles.
// How has the student contributed to the school or local community? (e.g., volunteer work, community service)
// Is the student a member of any clubs, organizations, or volunteer groups? Provide details about their involvement and impact.
// How does the student balance academics with extracurriculars or personal commitments?
// 8. Personal Development and Growth
// Have you observed personal growth in the student? Describe areas of growth over time.
// Has the student faced any personal challenges or obstacles? If so, how did they manage these while pursuing their goals?
// Does the student exhibit self-awareness or reflective qualities? Provide an example, if possible.
// In what ways does this student demonstrate resilience or adaptability?
// 9. Future Potential and Impact

// What kind of impact will this student likely have on a college or professional community?
// How would this student contribute to a team or group environment in the future?
// What do you believe this student will achieve in the future? Describe potential in their chosen field or area of interest.
// Is there anything you’ll personally miss about this student? Explain why.
// 10. Final Recommendation and Overall Impression
// Why do you believe this student stands out compared to others you’ve worked with?
// What would you say is this student’s “ethos” or core character message?
// What is the one thing you most want the admissions committee (or employer) to understand about this student?
