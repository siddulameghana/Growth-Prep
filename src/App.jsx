
import React, { useEffect, useRef, useState } from "react";

const examData = {
  SSC: {
    icon: "🏛️",
    description: "Staff Selection Commission",
    exams: {
      CGL: [
        "Assistant Section Officer",
        "Income Tax Inspector",
        "Auditor",
        "Tax Assistant",
      ],
      CHSL: [
        "LDC / JSA",
        "Postal Assistant",
        "Data Entry Operator",
      ],
      MTS: ["Multi Tasking Staff"],
      GD: ["General Duty Constable"],
      Stenographer: ["Grade C", "Grade D"],
    },
  },

  Banking: {
    icon: "🏦",
    description: "Banking Recruitment",
    exams: {
      "IBPS PO": ["Probationary Officer"],
      "IBPS Clerk": ["Customer Service Associate"],
      "SBI PO": ["Probationary Officer"],
      "SBI Clerk": ["Junior Associate"],
    },
  },

  RRB: {
    icon: "🚆",
    description: "Railway Recruitment Board",
    exams: {
      NTPC: [
        "Station Master",
        "Goods Train Manager",
        "Junior Clerk",
        "Accounts Clerk",
      ],
      "Group D": [
        "Track Maintainer",
        "Assistant Pointsman",
      ],
      ALP: ["Assistant Loco Pilot"],
      Technician: [
        "Technician Grade I",
        "Technician Grade III",
      ],
      JE: ["Junior Engineer"],
    },
  },

  Police: {
    icon: "👮",
    description: "Police Recruitment",
    exams: {
      Constable: ["Police Constable"],
      SI: ["Sub Inspector"],
      "Head Constable": ["Head Constable"],
    },
  },

  GATE: {
    icon: "🎓",
    description: "Graduate Aptitude Test",
    exams: {
      CSE: ["Computer Science & IT"],
      ECE: ["Electronics & Communication"],
      EE: ["Electrical Engineering"],
      ME: ["Mechanical Engineering"],
      CE: ["Civil Engineering"],
      DA: ["Data Science & AI"],
    },
  },

  UPSC: {
    icon: "🇮🇳",
    description: "Union Public Service Commission",
    exams: {
      "Civil Services": ["IAS", "IPS", "IFS"],
      CAPF: ["Assistant Commandant"],
      CDS: ["IMA", "INA", "AFA", "OTA"],
      NDA: ["Army", "Navy", "Air Force"],
    },
  },

  Defence: {
    icon: "🪖",
    description: "Defence Examinations",
    exams: {
      Army: ["Soldier / Agniveer"],
      Navy: ["Naval Entry"],
      "Air Force": ["Airmen / Agniveer"],
      AFCAT: ["Flying Branch", "Ground Duty"],
      NDA: ["Army", "Navy", "Air Force"],
      CDS: ["IMA", "INA", "AFA", "OTA"],
    },
  },

  ISRO: {
    icon: "🚀",
    description: "Space Research Careers",
    exams: {
      "Scientist / Engineer": [
        "Computer Science",
        "Electronics",
        "Mechanical",
      ],
      "Technical Assistant": [
        "Computer Science",
        "Electronics",
      ],
      Technician: [
        "Electronics",
        "Electrical",
        "Mechanical",
      ],
    },
  },

  Law: {
    icon: "⚖️",
    description: "Law Entrance & Recruitment",
    exams: {
      CLAT: ["UG", "PG"],
      AILET: ["UG", "PG"],
      LLB: ["3 Year LLB", "5 Year LLB"],
      LLM: ["LLM Entrance"],
      Judiciary: ["Civil Judge"],
    },
  },

  Engineering: {
    icon: "⚙️",
    description: "Engineering Entrance",
    exams: {
      "JEE Main": ["Engineering Entrance"],
      "JEE Advanced": ["Engineering Entrance"],
      "Engineering Entrance": ["General Engineering"],
    },
  },

  Medical: {
    icon: "🩺",
    description: "Medical Entrance",
    exams: {
      "NEET UG": ["MBBS", "BDS", "AYUSH"],
      "NEET PG": ["Medical PG"],
      AIIMS: ["Medical Entrance"],
    },
  },

  Management: {
    icon: "📈",
    description: "Management Entrance",
    exams: {
      CAT: ["MBA Entrance"],
      CMAT: ["MBA Entrance"],
      MAT: ["MBA Entrance"],
      XAT: ["MBA Entrance"],
      ATMA: ["MBA Entrance"],
    },
  },
};

const questions = [
  {
    q: "Which is the largest planet in our Solar System?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Jupiter",
    explanation:
      "Jupiter is the largest planet in our Solar System.",
  },
  {
    q: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"],
    answer: "New Delhi",
    explanation:
      "New Delhi is the capital of India.",
  },
  {
    q: "2 + 2 × 5 = ?",
    options: ["20", "12", "10", "15"],
    answer: "12",
    explanation:
      "According to BODMAS, multiplication comes first: 2 + 10 = 12.",
  },
  {
    q: "Which organization conducts SSC examinations?",
    options: ["UPSC", "SSC", "RRB", "IBPS"],
    answer: "SSC",
    explanation:
      "SSC stands for Staff Selection Commission.",
  },
  {
    q: "Which language is widely used for Android development?",
    options: ["Kotlin", "HTML", "CSS", "SQL"],
    answer: "Kotlin",
    explanation:
      "Kotlin is officially supported for Android development.",
  },
];

function App() {
  const [page, setPage] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [group, setGroup] = useState("");
  const [exam, setExam] = useState("");
  const [branch, setBranch] = useState("");
  const [level, setLevel] = useState("");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const [doubt, setDoubt] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const login = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter Email/Mobile and Password.");
      return;
    }

    setPage("dashboard");
  };

  const startCamera = async () => {
    try {
      setCameraError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera is not supported.");
        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

      streamRef.current = stream;
      setCameraOn(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch {
      setCameraError(
        "Camera permission denied. Please allow camera access."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }

    streamRef.current = null;
    setCameraOn(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const startTest = () => {
    setQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setPage("mock");
    startCamera();
  };

  const chooseAnswer = (answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const submitTest = () => {
    let total = 0;

    questions.forEach((item, index) => {
      if (answers[index] === item.answer) {
        total++;
      }
    });

    setScore(total);
    stopCamera();
    setPage("result");
  };

  const askAI = () => {
    if (!doubt.trim()) {
      alert("Please type your doubt.");
      return;
    }

    const text = doubt.toLowerCase();

    const found = questions.find((item) =>
      text.includes(item.answer.toLowerCase())
    );

    if (found) {
      setAiAnswer(
        `Answer: ${found.answer}\n\nExplanation: ${found.explanation}`
      );
    } else {
      setAiAnswer(
        "AI Assistant: Your question has been received. A real AI API such as Gemini or OpenAI can be connected through a secure backend for live answers."
      );
    }
  };

  const logout = () => {
    stopCamera();
    setPage("login");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="app">
      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, "Segoe UI", Arial, sans-serif;
          background: #101827;
        }

        button,
        input,
        textarea {
          font-family: inherit;
        }

        button {
          cursor: pointer;
        }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 5% 0%,
              #304c7b 0,
              transparent 28%
            ),
            radial-gradient(
              circle at 95% 5%,
              #594078 0,
              transparent 27%
            ),
            #121b2b;
        }

        /* LOGIN */

        .loginPage {
          min-height: 100vh;
          width: min(1250px, 94%);
          margin: auto;
          padding: 45px 0;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 60px;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }

        .logo {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          color: white;
          font-size: 27px;
          background:
            linear-gradient(
              135deg,
              #3b82f6,
              #8b5cf6
            );
          box-shadow:
            0 15px 35px #3b82f655;
        }

        .brand h2 {
          margin: 0;
          color: white;
          letter-spacing: 1px;
        }

        .brand small {
          color: #aebbd0;
          letter-spacing: 1.5px;
        }

        .badge {
          display: inline-block;
          padding: 9px 15px;
          border-radius: 30px;
          color: #c7ddff;
          background: #2563eb22;
          border: 1px solid #60a5fa44;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .hero h1 {
          margin: 0;
          color: white;
          font-size: clamp(45px, 6vw, 74px);
          line-height: 1;
          letter-spacing: -4px;
        }

        .gradient {
          background:
            linear-gradient(
              90deg,
              #60a5fa,
              #a78bfa
            );
          -webkit-background-clip: text;
          color: transparent;
        }

        .heroText {
          max-width: 600px;
          color: #aebbd0;
          font-size: 17px;
          line-height: 1.8;
          margin: 25px 0;
        }

        .loginStats {
          display: flex;
          gap: 13px;
          flex-wrap: wrap;
        }

        .loginStat {
          padding: 16px 20px;
          border-radius: 16px;
          background: #ffffff10;
          border: 1px solid #ffffff18;
          backdrop-filter: blur(15px);
        }

        .loginStat strong {
          display: block;
          color: #93c5fd;
          font-size: 22px;
        }

        .loginStat span {
          color: #aebbd0;
          font-size: 12px;
        }

        .loginCard {
          padding: 38px;
          border-radius: 28px;
          background: rgba(248,250,252,.97);
          box-shadow: 0 30px 80px #0007;
        }

        .welcome {
          color: #2563eb;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .loginCard h2 {
          margin: 10px 0;
          font-size: 30px;
          color: #172033;
        }

        .muted {
          color: #64748b;
        }

        .label {
          display: block;
          margin: 20px 0 8px;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
        }

        .input {
          width: 100%;
          height: 52px;
          padding: 0 15px;
          border: 1px solid #d5dce7;
          border-radius: 13px;
          outline: none;
          background: white;
          color: #172033;
        }

        .input:focus {
          border-color: #60a5fa;
          box-shadow:
            0 0 0 4px #60a5fa22;
        }

        .password {
          position: relative;
        }

        .password .input {
          padding-right: 50px;
        }

        .eye {
          position: absolute;
          right: 10px;
          top: 10px;
          border: 0;
          background: transparent;
        }

        .primary {
          min-height: 50px;
          padding: 0 20px;
          border: 0;
          border-radius: 12px;
          color: white;
          font-weight: 800;
          background:
            linear-gradient(
              135deg,
              #2563eb,
              #7c3aed
            );
          box-shadow:
            0 12px 28px #2563eb44;
          transition: .2s;
        }

        .primary:hover {
          transform: translateY(-2px);
        }

        .full {
          width: 100%;
        }

        .secondary {
          min-height: 48px;
          padding: 0 18px;
          border: 1px solid #d8dee8;
          border-radius: 12px;
          color: #334155;
          background: white;
          font-weight: 700;
        }

        .secure {
          text-align: center;
          color: #94a3b8;
          font-size: 11px;
          margin-top: 20px;
        }

        /* NAVBAR */

        .navbar {
          height: 72px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafcee;
          border-bottom: 1px solid #dce2eb;
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(18px);
        }

        .navBrand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          color: #172033;
        }

        .navLogo {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: white;
          background:
            linear-gradient(
              135deg,
              #2563eb,
              #7c3aed
            );
        }

        .navLinks {
          display: flex;
          gap: 5px;
        }

        .navLinks button {
          border: 0;
          background: transparent;
          color: #475569;
          padding: 9px 12px;
          border-radius: 9px;
        }

        .navLinks button:hover {
          background: #eaf2ff;
          color: #2563eb;
        }

        .logout {
          padding: 8px 14px;
          border: 1px solid #fecaca;
          border-radius: 9px;
          background: #fff1f2;
          color: #dc2626;
        }

        /* MAIN */

        .main {
          min-height: calc(100vh - 72px);
          background:
  radial-gradient(
    circle at 15% 10%,
    #dbeafe 0,
    transparent 28%
  ),
  radial-gradient(
    circle at 85% 20%,
    #ede9fe 0,
    transparent 30%
  ),
  radial-gradient(
    circle at 50% 100%,
    #cffafe 0,
    transparent 28%
  ),
  #f4f7fc;

        .container {
          width: min(1200px, 92%);
          margin: auto;
          padding: 38px 0 70px;
        }

        .heroBox {
          padding: 38px;
          border-radius: 25px;
          background:
            linear-gradient(
              135deg,
              #dbeafe,
              #ede9fe
            );
          border: 1px solid #d7e3f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
        }

        .heroBox h1 {
          margin: 0;
          font-size: 38px;
          color: #172033;
        }

        .heroBox p {
          max-width: 650px;
          color: #64748b;
          line-height: 1.7;
        }

        .heroCircle {
          width: 150px;
          height: 150px;
          flex-shrink: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #ffffffaa;
          font-size: 62px;
          box-shadow: 0 20px 45px #6366f122;
        }

        .stats {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 15px;
          margin-top: 18px;
        }

        .stat {
          padding: 21px;
          background: #ffffffd9;
          border: 1px solid #dfe5ee;
          border-radius: 17px;
        }

        .statIcon {
          font-size: 27px;
        }

        .stat h3 {
          margin: 8px 0 3px;
        }

        .stat p {
          margin: 0;
          color: #94a3b8;
          font-size: 12px;
        }

        .section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 38px 0 17px;
        }

        .section h2 {
          margin: 0;
          color: #172033;
        }

        .section span {
          color: #2563eb;
          font-size: 13px;
        }

        /* GROUPS */

        .groupGrid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 16px;
        }

        .groupCard {
          padding: 23px;
          background: white;
          border: 1px solid #dde3eb;
          border-radius: 19px;
          transition: .2s;
        }

        .groupCard:hover {
          transform: translateY(-4px);
          border-color: #93c5fd;
          box-shadow:
            0 18px 40px #33415518;
        }

        .groupIcon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          background: #edf4ff;
          font-size: 27px;
        }

        .groupCard h3 {
          margin: 14px 0 5px;
          color: #172033;
        }

        .groupCard p {
          color: #94a3b8;
          font-size: 12px;
          min-height: 30px;
        }

        .explore {
          padding: 9px 13px;
          border: 0;
          border-radius: 9px;
          color: #2563eb;
          background: #eff6ff;
          font-weight: 700;
        }

        /* SELECTION */

        .back {
          margin-bottom: 20px;
          border: 0;
          background: transparent;
          color: #2563eb;
          font-weight: 700;
        }

        .selectionBox {
          padding: 30px;
          border-radius: 22px;
          background:
            linear-gradient(
              135deg,
              #e7f0ff,
              #f2edff
            );
          border: 1px solid #d7e3f7;
        }

        .selectionBox h1 {
          margin: 0 0 7px;
          color: #172033;
        }

        .selectionBox p {
          color: #64748b;
        }

        .itemGrid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 15px;
          margin-top: 22px;
        }

        .itemCard {
          padding: 21px;
          border-radius: 17px;
          background: white;
          border: 1px solid #dde3eb;
        }

        .itemCard h3 {
          margin-top: 0;
          color: #172033;
        }

        .itemCard p {
          color: #94a3b8;
          font-size: 13px;
        }

        .levels {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .level {
          padding: 9px 12px;
          border: 1px solid #d7deea;
          border-radius: 9px;
          background: white;
          color: #334155;
        }

        .level:hover {
          border-color: #60a5fa;
          color: #2563eb;
        }

        /* MOCK TEST */

        .testHeader {
          padding: 17px 21px;
          margin-bottom: 17px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          border: 1px solid #dde3eb;
          border-radius: 17px;
        }

        .cameraStatus {
          display: flex;
          align-items: center;
          gap: 8px;
color: #15803d;
font-size: 13px;
font-weight: 800;
}

.greenDot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 9px #22c55e;
}

.mockGrid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 17px;
}

.questionCard,
.cameraCard {
  padding: 28px;
  border-radius: 21px;
  background: white;
  border: 1px solid #dde3eb;
}

.questionNo {
  color: #2563eb;
  font-size: 12px;
  font-weight: 800;
}

.questionCard h2 {
  line-height: 1.5;
  color: #172033;
}

.options {
  display: grid;
  gap: 11px;
  margin-top: 22px;
}

.option {
  padding: 15px;
  text-align: left;
  border: 1px solid #dce2eb;
  background: #f8fafc;
  border-radius: 12px;
  color: #334155;
}

.option:hover,
.option.selected {
  border-color: #60a5fa;
  background: #eff6ff;
  color: #1d4ed8;
}

.mockActions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.videoBox {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  overflow: hidden;
  background: #172033;
  display: grid;
  place-items: center;
  color: white;
}

.videoBox video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cameraInfo {
  margin-top: 10px;
  padding: 11px;
  border-radius: 9px;
  background: #ecfdf5;
  color: #15803d;
  font-size: 11px;
}

/* RESULT */

.result {
  max-width: 700px;
  margin: 50px auto;
  padding: 45px;
  background: white;
  border-radius: 24px;
  text-align: center;
  border: 1px solid #dde3eb;
}

.score {
  font-size: 68px;
  font-weight: 900;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  color: transparent;
}

/* AI */

.ai {
  max-width: 800px;
  margin: auto;
}

.aiHeader {
  padding: 30px;
  border-radius: 23px;
  background: linear-gradient(135deg, #e7f0ff, #f3edff);
  border: 1px solid #d7e3f7;
}

.aiHeader h1 {
  color: #172033;
}

.aiInput {
  width: 100%;
  min-height: 140px;
  margin-top: 17px;
  padding: 15px;
  resize: vertical;
  border: 1px solid #d7deea;
  border-radius: 14px;
  outline: none;
}

.aiAnswer {
  white-space: pre-line;
  margin-top: 17px;
  padding: 20px;
  background: white;
  border: 1px solid #dde3eb;
  border-radius: 15px;
  line-height: 1.7;
}

/* PREMIUM */

.premium {
  padding: 55px 30px;
  border-radius: 27px;
  background: linear-gradient(135deg, #e8edff, #f4edff);
  border: 1px solid #d9d6fe;
  text-align: center;
}

.crown {
  font-size: 60px;
}

.price {
  color: #4f46e5;
  font-size: 55px;
  font-weight: 900;
  margin: 12px 0;
}

.benefits {
  max-width: 650px;
  margin: 25px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
  text-align: left;
}

.benefit {
  padding: 15px;
  background: white;
  border-radius: 11px;
  border: 1px solid #e1e5ed;
}

/* PAYMENT */

.payment {
  max-width: 700px;
  margin: auto;
  padding: 32px;
  background: white;
  border-radius: 23px;
  border: 1px solid #dde3eb;
}

.amount {
  padding: 18px;
  border-radius: 14px;
  background: #eff6ff;
  margin: 20px 0;
}

.amount strong {
  display: block;
  font-size: 37px;
  color: #2563eb;
}

.methods {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 9px;
}

.method {
  padding: 14px 7px;
  border-radius: 10px;
  border: 1px solid #d7deea;
  background: white;
}

.method.active {
  border-color: #2563eb;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 800;
}

.notice {
  padding: 12px;
  border-radius: 9px;
  background: #fff7ed;
  color: #c2410c;
  font-size: 12px;
}

/* RESPONSIVE */

@media (max-width: 950px) {
  .loginPage {
    grid-template-columns: 1fr;
    padding: 30px 20px;
  }

  .hero {
    text-align: center;
  }

  .heroText {
    margin-left: auto;
    margin-right: auto;
  }

  .loginStats {
    justify-content: center;
  }

  .groupGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .mockGrid {
    grid-template-columns: 1fr;
  }

  .navLinks {
    display: none;
  }
}

@media (max-width: 600px) {
  .loginCard {
    padding: 25px;
  }

  .hero h1 {
    font-size: 45px;
  }

  .groupGrid,
  .itemGrid,
  .stats {
    grid-template-columns: 1fr;
  }

  .heroCircle {
    display: none;
  }

  .navbar {
    padding: 0 15px;
  }

  .container {
    width: 94%;
  }

  .benefits {
    grid-template-columns: 1fr;
  }

  .methods {
    grid-template-columns: repeat(2, 1fr);
  }
}}

        /* RESPONSIVE */

        @media (max-width: 950px) {
          .loginPage {
            grid-template-columns: 1fr;
            padding: 30px 20px;
          }

          .hero {
            text-align: center;
          }

          .heroText {
            margin-left: auto;
            margin-right: auto;
          }

          .loginStats {
            justify-content: center;
          }

          .groupGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .mockGrid {
            grid-template-columns: 1fr;
          }

          .navLinks {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .loginCard {
            padding: 25px;
          }

          .hero h1 {
            font-size: 45px;
          }

          .groupGrid,
          .itemGrid,
          .stats {
            grid-template-columns: 1fr;
          }

          .heroCircle {
            display: none;
          }

          .navbar {
            padding: 0 15px;
          }

          .container {
            width: 94%;
          }

          .benefits {
            grid-template-columns: 1fr;
          }

          .methods {
            grid-template-columns: repeat(2, 1fr);
          }
        }

      `}</style>

      {/* ================= LOGIN ================= */}

      {page === "login" && (
        <div className="loginPage">

          <div className="hero">

            <div className="brand">

              <div className="logo">
                ✦
              </div>

              <div>
                <h2>GROWTHPREP</h2>

                <small>
                  AI • EXAM • PREPARATION
                </small>
              </div>

            </div>

            <div className="badge">
              🚀 Smart Competitive Exam Platform
            </div>

            <h1>
              Prepare Smarter.
              <br />

              <span className="gradient">
                Perform Better.
              </span>
            </h1>

            <p className="heroText">
              Practice competitive exams, take
              monitored mock tests, track your
              performance and clear your doubts
              with intelligent assistance.
            </p>

            <div className="loginStats">

              <div className="loginStat">
                <strong>12+</strong>
                <span>Exam Categories</span>
              </div>

              <div className="loginStat">
                <strong>180</strong>
                <span>Questions</span>
              </div>

              <div className="loginStat">
                <strong>AI</strong>
                <span>Doubt Assistant</span>
              </div>

            </div>

          </div>

          <div className="loginCard">

            <div className="welcome">
              WELCOME BACK
            </div>

            <h2>
              Ready to grow? 👋
            </h2>

            <p className="muted">
              Login and continue your preparation journey.
            </p>

            <form onSubmit={login}>

              <label className="label">
                Email / Mobile Number
              </label>

              <input
                className="input"
                placeholder="Enter email or mobile"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <label className="label">
                Password
              </label>

              <div className="password">

                <input
                  className="input"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  className="eye"
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

              <button
                className="primary full"
                style={{ marginTop: 22 }}
              >
                Login to GrowthPrep →
              </button>

            </form>

            <button
              className="secondary full"
              style={{ marginTop: 12 }}
              onClick={() =>
                alert(
                  "Registration page will be added next."
                )
              }
            >
              Create New Account
            </button>

            <div className="secure">
              🔒 Secure preparation environment
            </div>

          </div>

        </div>
      )}

      {/* ================= AFTER LOGIN ================= */}

      {page !== "login" && (
        <div>

          <Navbar
            setPage={setPage}
            logout={logout}
          />

          <div className="main">

            {/* DASHBOARD */}

            {page === "dashboard" && (
              <div className="container">

                <div className="heroBox">

                  <div>

                    <h1>
                      Hello, Meghana 👋
                    </h1>

                    <p>
                      Welcome to GrowthPrep.
                      Choose your exam, select your
                      branch or post and improve your
                      performance.
                    </p>

                    <button
                      className="primary"
                      onClick={() =>
                        setPage("categories")
                      }
                    >
                      Explore Exams 🚀
                    </button>

                  </div>

                  <div className="heroCircle">
                    📚
                  </div>

                </div>

                <div className="stats">

                  <Stat
                    icon="📝"
                    title="Mock Tests"
                    text="Practice exams"
                  />

                  <Stat
                    icon="📊"
                    title="Performance"
                    text="Track progress"
                  />

                  <Stat
                    icon="📚"
                    title="Papers"
                    text="Previous papers"
                  />

                  <Stat
                    icon="🤖"
                    title="AI"
                    text="Clear doubts"
                  />

                </div>

                <div className="section">

                  <h2>
                    Popular Exam Categories
                  </h2>

                  <span>
                    12 Categories
                  </span>

                </div>

                <div className="groupGrid">

                  {Object.entries(examData).map(
                    ([name, data]) => (

                      <GroupCard
                        key={name}
                        name={name}
                        data={data}
                        onClick={() => {
                          setGroup(name);
                          setPage("group");
                        }}
                      />

                    )
                  )}

                </div>

              </div>
            )}

            {/* CATEGORIES */}

            {page === "categories" && (
              <div className="container">

                <div className="selectionBox">

                  <h1>
                    📚 Explore All Exams
                  </h1>

                  <p>
                    Select a category to continue
                    your preparation.
                  </p>

                </div>

                <div
                  className="groupGrid"
                  style={{ marginTop: 22 }}
                >

                  {Object.entries(examData).map(
                    ([name, data]) => (

                      <GroupCard
                        key={name}
                        name={name}
                        data={data}
                        onClick={() => {
                          setGroup(name);
                          setPage("group");
                        }}
                      />

                    )
                  )}

                </div>

              </div>
            )}

            {/* GROUP */}

            {page === "group" && group && (
              <div className="container">

                <button
                  className="back"
                  onClick={() =>
                    setPage("categories")
                  }
                >
                  ← All Categories
                </button>

                <div className="selectionBox">

                  <h1>
                    {examData[group].icon}{" "}
                    {group}
                  </h1>

                  <p>
                    {examData[group].description}
                  </p>

                </div>

                <div className="section">
                  <h2>Select Exam</h2>
                </div>

                <div className="itemGrid">

                  {Object.keys(
                    examData[group].exams
                  ).map((examName) => (

                    <div
                      className="itemCard"
                      key={examName}
                    >

                      <h3>
                        {examName}
                      </h3>

                      <p>
                        View branches and
                        available posts.
                      </p>

                      <button
                        className="primary"
                        onClick={() => {
                          setExam(examName);
                          setPage("exam");
                        }}
                      >
                        View Branches →
                      </button>

                    </div>

                  ))}

                </div>

              </div>
            )}

            {/* EXAM → BRANCH / POST */}

            {page === "exam" &&
              group &&
              exam && (
                <div className="container">

                  <button
                    className="back"
                    onClick={() =>
                      setPage("group")
                    }
                  >
                    ← {group}
                  </button>

                  <div className="selectionBox">

                    <h1>
                      {examData[group].icon}{" "}
                      {exam}
                    </h1>

                    <p>
                      Select your branch / post.
                    </p>

                  </div>

                  <div className="section">
                    <h2>
                      Branches / Posts
                    </h2>
                  </div>

                  <div className="itemGrid">

                    {examData[group].exams[
                      exam
                    ].map((post) => (

                      <div
                        className="itemCard"
                        key={post}
                      >

                        <h3>
                          {post}
                        </h3>

                        <p>
                          Select preparation level.
                        </p>

                        <div className="levels">

                          {[
                            "Beginner",
                            "Intermediate",
                            "Advanced",
                          ].map((item) => (

                            <button
                              className="level"
                              key={item}
                              onClick={() => {
                                setBranch(post);
                                setLevel(item);
                                setPage("ready");
                              }}
                            >
                              {item}
                            </button>

                          ))}

                        </div>

                      </div>

                    ))}

                  </div>

                </div>
              )}

            {/* READY */}

            {page === "ready" && (
              <div className="container">

                <button
                  className="back"
                  onClick={() =>
                    setPage("exam")
                  }
                >
                  ← Back
                </button>

                <div className="heroBox">

                  <div>

                    <h1>
                      {group} → {exam}
                    </h1>

                    <p>
                      <b>Post:</b> {branch}
                      <br />
                      <b>Level:</b> {level}
                      <br />
                      Your personalised mock test
                      is ready.
                    </p>

                    <button
                      className="primary"
                      onClick={startTest}
                    >
                      📷 Start Monitored Mock Test
                    </button>

                  </div>

                  <div className="heroCircle">
                    📝
                  </div>

                </div>

              </div>
            )}
            {/* ================= MOCK TEST ================= */}

            {page === "mock" && (
              <div className="container">

                <div className="testHeader">

                  <div>
                    <b>
                      {group || "General"} •{" "}
                      {exam || "Mock Test"}
                    </b>

                    <div className="muted">
                      {branch || "Practice"} • Question{" "}
                      {questionIndex + 1}/{questions.length}
                    </div>
                  </div>

                  <div className="cameraStatus">

                    <span className="greenDot"></span>

                    {cameraOn
                      ? "Camera Monitoring ON"
                      : "Camera OFF"}

                  </div>

                </div>

                <div className="mockGrid">

                  {/* QUESTION */}

                  <div className="questionCard">

                    <div className="questionNo">
                      QUESTION {questionIndex + 1}
                    </div>

                    <h2>
                      {questions[questionIndex].q}
                    </h2>

                    <div className="options">

                      {questions[questionIndex].options.map(
                        (option) => (

                          <button
                            key={option}
                            className={
                              "option " +
                              (answers[questionIndex] === option
                                ? "selected"
                                : "")
                            }
                            onClick={() =>
                              chooseAnswer(option)
                            }
                          >
                            {option}
                          </button>

                        )
                      )}

                    </div>

                    <div className="mockActions">

                      <button
                        className="secondary"
                        disabled={questionIndex === 0}
                        onClick={() =>
                          setQuestionIndex(
                            questionIndex - 1
                          )
                        }
                      >
                        ← Previous
                      </button>

                      {questionIndex <
                      questions.length - 1 ? (

                        <button
                          className="primary"
                          onClick={() =>
                            setQuestionIndex(
                              questionIndex + 1
                            )
                          }
                        >
                          Next →
                        </button>

                      ) : (

                        <button
                          className="primary"
                          onClick={submitTest}
                        >
                          Submit Test ✓
                        </button>

                      )}

                    </div>

                  </div>

                  {/* CAMERA */}

                  <div className="cameraCard">

                    <h3>
                      📷 Exam Monitoring
                    </h3>

                    <div className="videoBox">

                      {cameraOn ? (

                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          playsInline
                        />

                      ) : (

                        <span>
                          Camera is OFF
                        </span>

                      )}

                    </div>

                    {cameraOn && (
                      <div className="cameraInfo">
                        🟢 Camera is active during
                        the mock test.
                      </div>
                    )}

                    {cameraError && (
                      <p
                        style={{
                          color: "#dc2626",
                          fontSize: 12,
                        }}
                      >
                        {cameraError}
                      </p>
                    )}

                  </div>

                </div>

              </div>
            )}

            {/* ================= RESULT ================= */}

            {page === "result" && (
              <div className="container">

                <div className="result">

                  <div style={{ fontSize: 55 }}>
                    🎉
                  </div>

                  <h1>
                    Test Completed
                  </h1>

                  <div className="score">
                    {score}/{questions.length}
                  </div>

                  <p className="muted">
                    Your mock test has been completed.
                    Camera monitoring has been stopped.
                  </p>

                  <button
                    className="primary"
                    onClick={() =>
                      setPage("ai")
                    }
                  >
                    🤖 Ask AI About a Question
                  </button>

                  <br />
                  <br />

                  <button
                    className="secondary"
                    onClick={() =>
                      setPage("dashboard")
                    }
                  >
                    Dashboard
                  </button>

                </div>

              </div>
            )}

            {/* ================= AI ================= */}

            {page === "ai" && (
              <div className="container">

                <div className="ai">

                  <div className="aiHeader">

                    <h1>
                      🤖 GrowthPrep AI Assistant
                    </h1>

                    <p className="muted">
                      Ask your doubts after completing
                      the mock test.
                    </p>

                  </div>

                  <textarea
                    className="aiInput"
                    placeholder="Type your question here..."
                    value={doubt}
                    onChange={(e) =>
                      setDoubt(e.target.value)
                    }
                  />

                  <button
                    className="primary"
                    style={{
                      marginTop: 15,
                    }}
                    onClick={askAI}
                  >
                    ✨ Explain Answer
                  </button>

                  {aiAnswer && (
                    <div className="aiAnswer">

                      <h3>
                        AI Explanation
                      </h3>

                      {aiAnswer}

                    </div>
                  )}

                </div>

              </div>
            )}

            {/* ================= PREMIUM ================= */}

            {page === "premium" && (
              <div className="container">

                <div className="premium">

                  <div className="crown">
                    👑
                  </div>

                  <h1>
                    GrowthPrep Premium
                  </h1>

                  <p className="muted">
                    Unlock the complete preparation
                    platform.
                  </p>

                  <div className="price">
                    ₹250
                  </div>

                  <div className="benefits">

                    {[
                      "All Mock Tests",
                      "Previous Year Papers",
                      "All Exam Categories",
                      "Performance Analytics",
                      "AI Doubt Assistant",
                      "Unlimited Practice",
                    ].map((item) => (

                      <div
                        className="benefit"
                        key={item}
                      >
                        ✅ {item}
                      </div>

                    ))}

                  </div>

                  <button
                    className="primary"
                    onClick={() =>
                      setPage("payment")
                    }
                  >
                    Unlock for ₹250 →
                    </button>

                </div>

              </div>
            )}

            {/* ================= PAYMENT ================= */}

            {page === "payment" && (
              <div className="container">

                <div className="payment">

                  <button
                    className="back"
                    onClick={() =>
                      setPage("premium")
                    }
                  >
                    ← Premium
                  </button>

                  <h1>
                    Secure Payment 💳
                  </h1>

                  <p className="muted">
                    Complete your GrowthPrep Premium
                    purchase.
                  </p>

                  <div className="amount">
                    GrowthPrep Premium

                    <strong>
                      ₹250
                    </strong>
                  </div>

                  <div className="notice">
                    🔐 Secure payment interface.
                    Real UPI/Card payment gateway
                    can be connected here.
                  </div>

                  <h3>
                    Choose Payment Method
                  </h3>

                  <div className="methods">

                    {[
                      "UPI",
                      "Google Pay",
                      "PhonePe",
                      "Paytm",
                    ].map((method) => (

                      <button
                        key={method}
                        className={
                          "method " +
                          (paymentMethod === method
                            ? "active"
                            : "")
                        }
                        onClick={() =>
                          setPaymentMethod(method)
                        }
                      >
                        {method}
                      </button>

                    ))}

                  </div>

                  <button
                    className={
                      "method " +
                      (paymentMethod === "Card"
                        ? "active"
                        : "")
                    }
                    style={{
                      width: "100%",
                      marginTop: 10,
                    }}
                    onClick={() =>
                      setPaymentMethod("Card")
                    }
                  >
                    💳 Debit / Credit Card
                  </button>

                  {paymentMethod !== "Card" && (
                    <div
                      style={{
                        width: 170,
                        height: 170,
                        margin: "25px auto",
                        display: "grid",
                        placeItems: "center",
                        background: "white",
                        border: "8px solid #172033",
                        borderRadius: 12,
                        fontSize: 48,
                      }}
                    >
                      ▦
                    </div>
                  )}

                  {paymentMethod === "Card" && (
                    <div
                      style={{
                        marginTop: 20,
                        padding: 18,
                        border: "1px solid #d7deea",
                        borderRadius: 14,
                      }}
                    >

                      <label className="label">
                        Card Number
                      </label>

                      <input
                        className="input"
                        placeholder="1234 5678 9012 3456"
                      />

                      <label className="label">
                        Card Holder Name
                      </label>

                      <input
                        className="input"
                        placeholder="Enter card holder name"
                      />

                    </div>
                  )}

                  <button
                    className="primary full"
                    style={{
                      marginTop: 22,
                    }}
                    onClick={() =>
                      alert(
                        "Real payment gateway will be connected here."
                      )
                    }
                  >
                    Pay ₹250 Securely 🔒
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

/* ================= NAVBAR ================= */

function Navbar({
  setPage,
  logout,
}) {
  return (
    <nav className="navbar">

      <div className="navBrand">

        <div className="navLogo">
          ✦
        </div>

        GROWTHPREP

      </div>

      <div className="navLinks">

        <button
          onClick={() =>
            setPage("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            setPage("categories")
          }
        >
          Exams
        </button>

        <button
          onClick={() =>
            setPage("ai")
          }
        >
          🤖 AI
        </button>

        <button
          onClick={() =>
            setPage("premium")
          }
        >
          👑 Premium
        </button>

      </div>

      <button
        className="logout"
        onClick={logout}
      >
        Logout
      </button>

    </nav>
  );
}

/* ================= STAT ================= */

function Stat({
  icon,
  title,
  text,
}) {
  return (
    <div className="stat">

      <div className="statIcon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}

/* ================= GROUP CARD ================= */

function GroupCard({
  name,
  data,
  onClick,
}) {
  return (
    <div className="groupCard">

      <div className="groupIcon">
        {data.icon}
      </div>

      <h3>
        {name}
      </h3>

      <p>
        {data.description}
      </p>

      <button
        className="explore"
        onClick={onClick}
      >
        Explore →
      </button>

    </div>
  );
}

export default App;