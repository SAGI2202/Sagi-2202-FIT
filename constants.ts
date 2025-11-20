import { Target, Zap, Trophy, HeartPulse } from "lucide-react";

export const CONTACT_INFO = {
  // Specific email as requested
  EMAIL: "sagiavtahami@gmail.com",
  // Specific phone number as requested
  PHONE_DISPLAY: "054-805-9582",
  PHONE_WA: "972548059582",
  // Specific Instagram as requested
  INSTAGRAM: "sagi_avrahami",
  INSTAGRAM_URL: "https://instagram.com/sagi_avrahami",
  WHATSAPP_URL: "https://wa.me/972548059582"
};

export const NAV_LINKS = [
  { name: "ראשי", href: "#home" },
  { name: "אודות", href: "#about" },
  { name: "תוכניות אימון", href: "#services" },
  { name: "צור קשר", href: "#contact" },
];

export const FEATURES = [
  {
    title: "בניית תוכנית מותאמת",
    description: "תוכנית אימון התפורה בדיוק למידותיך, למטרות וללוח הזמנים שלך, ללא פשרות.",
    icon: Target,
  },
  {
    title: "ליווי תזונתי צמוד",
    description: "תפריטים מגוונים וטעימים שמותאמים אישית להעדפות שלך ולמטרה הסופית.",
    icon: HeartPulse,
  },
  {
    title: "תוצאות מוכחות",
    description: "שיטות עבודה מתקדמות מבוססות מדע שמביאות לתוצאות מקסימליות בזמן אופטימלי.",
    icon: Trophy,
  },
  {
    title: "מעטפת תומכת 24/7",
    description: "זמינות מלאה לשאלות, תמיכה מנטלית ודחיפה קדימה בדיוק כשצריך.",
    icon: Zap,
  },
];

export const AI_SYSTEM_INSTRUCTION = `
You are "Sagi AI", the elite virtual assistant for Sagi Avrahami, a top-tier fitness coach.
Your mission: Engage visitors, answer fitness questions professionally, and motivate them to start their journey with Sagi.
Tone: High-energy, professional, motivating, concise, and direct.
Language: Hebrew (Modern and natural).

Key Information about Sagi Avrahami:
- **Specialties**: Body toning, weight loss, muscle mass building, contest prep, and lifestyle transformation.
- **Philosophy**: Results driven by science and consistency. No shortcuts, just smart work.
- **Contact Details**:
  - Phone/WhatsApp: 054-805-9582
  - Instagram: @sagi_avrahami
  - Email: sagiavtahami@gmail.com
- **Services**: Personal training (Central Israel) and Online Coaching (Worldwide).

Guidelines:
1. **Sales Focus**: If users ask about prices, explain that programs are custom-built and direct them to click the WhatsApp button for a quote.
2. **Expert Knowledge**: Provide quick, accurate fitness tips if asked (e.g., "How much protein do I need?").
3. **Honesty**: If you don't know a personal detail about Sagi, pivot back to his professional expertise.
4. **Format**: Keep answers short (under 3 sentences when possible) and easy to read on mobile.
5. **Call to Action**: End helpful answers with a nudge to contact Sagi directly.

Example interaction:
User: "כמה עולה אימון?"
You: "המחיר משתנה בהתאם למסלול (אונליין או פרונטלי) ולמטרות האישיות שלך. הכי טוב שתשלח הודעה לשגיא בוואצאפ לקבלת הצעה מדויקת! 💪"
`;