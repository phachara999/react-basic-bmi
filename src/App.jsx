import { useRef, useState } from "react";
import "./App.css";

function App() {
  // มีสูตรการคำนวณ = น้ำหนักตัว[Kg] / (ส่วนสูง[m] ยกกำลังสอง)
  const [bmiStatusStyle, setBmiStatusStyle] = useState({
    style: "bg-gray-200",
    text: "",
  });
  const [bmi, setBmi] = useState(0);
  const wRef = useRef("");
  const hRef = useRef("");
  const calBmi = () => {
    let w = wRef.current?.value;
    let h = hRef.current?.value;

    if (isNaN(w) || isNaN(h) || h <= 0 || w <= 0) {
      hRef.current.value = "";
      wRef.current.value = "";
      // ตรวจสอบว่าน้ำหนักและส่วนสูงมีค่าที่ถูกต้องหรือไม่
      alert("กรุณากรอกข้อมูลน้ำหนักและส่วนสูงให้ถูกต้อง");
      return;
    }
    const calculatedBmi = w / (h / 100) ** 2;
    setBmi(calculatedBmi);

    const { style, text } = getBmiStatus(calculatedBmi);
    setBmiStatusStyle({
      style,
      text,
    });
  };
  const getBmiStatus = (bmi) => {
    if (bmi >= 30) {
      return {
        style: "bg-red-700 text-white",
        text: "คุณอ้วนมาก",
      };
    } else if (bmi >= 25) {
      return {
        style: "bg-red-200 ",
        text: "คุณอ้วน",
      };
    } else if (bmi >= 18.5) {
      return {
        style: "bg-green-100",
        text: "คุณน้ำหนักปกติ",
      };
    } else {
      return {
        style: "bg-yellow-100",
        text: "คุณผอมเกินไป",
      };
    }
  };

  return (
    <>
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <p className="text-2xl text-gray-900 dark:text-white text-center">
          คำนวณค่า BMI
        </p>
        <p className="mt-3">
          สูตรการคำนวณ = น้ำหนักตัว[Kg] / (ส่วนสูง[m] ยกกำลังสอง)
        </p>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">
            น้ำหนัก (กิโลกรัม)
          </label>
          <input
            ref={wRef}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรอกน้ำหนัก"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">
            ส่วนสูง (ซม.)
          </label>
          <input
            ref={hRef}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรอกส่วนสูง"
            required
          />
        </div>
        <button
          onClick={calBmi}
          className="focus:outline-none w-full mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          คำนวณ
        </button>
        <p className="text-center mt-2 font-black">ผลการคำนวณ</p>
        <p className="text-center mt-1">bmi : {bmi == 0 ? "" : bmi}</p>
        <div
          className={`${bmiStatusStyle.style} w-full h-16 rounded-lg mt-3 flex items-center justify-center`}
        >
          <p>{bmiStatusStyle.text}</p>
        </div>
      </div>
    </>
  );
}

export default App;
