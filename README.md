# HappySchool

ระบบติดตามอารมณ์และดาวเด็กดี (HappySchool) คือแอปพลิเคชันตัวอย่างสำหรับติดตามสุขภาพจิตของนักเรียน ให้รางวัลด้วยระบบดาว และวิเคราะห์ข้อมูลสำหรับคุณครูและผู้บริหาร ขับเคลื่อนด้วย **Gemini API**

## Features

- **Student Dashboard**: บันทึกไดอารี่ประจำวัน, เช็คอินอารมณ์, รับคำปรึกษาจาก AI, และดูนัดหมายครู
- **Teacher Dashboard**: จัดการดาวเด็กดี, อนุมัตินัดหมาย, บันทึกอารมณ์ตนเอง
- **Admin Dashboard**: ดูภาพรวมสถิติอารมณ์ทั้งโรงเรียน

## Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- Lucide React (Icons)
- Recharts (Charts)
- @google/genai (Gemini API)

## Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Setup Environment Variables**:
    - Copy `.env.example` to `.env`
    - Enter your Google GenAI API Key in `.env`:
      ```
      API_KEY=your_actual_api_key
      ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## License

MIT