import { useRef, useState, useEffect } from "react";

export default function OTP() {
    const [val, setVal] = useState({ num1: '', num2: '', num3: '', num4: '' });
    const data = [
        { name: 'num1', value: val.num1 },
        { name: 'num2', value: val.num2 },
        { name: 'num3', value: val.num3 },
        { name: 'num4', value: val.num4 },
    ];
    const inputRefs = useRef([]);
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function submitButton() {
        if (phone.length === 10) {
            setSubmitted(true);
        } else {
            alert("Enter a valid phone number");
        }
    }

    function handleOTPChange(e, index) {
        const { name, value } = e.target;
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            setVal((prev) => ({
                ...prev,
                [name]: value,
            }));
            if (value && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    }
    
    function handleKeyDown(e, index) {
        if (index > 0 && !val[`num${index + 1}`] && e.key == "Backspace") {
            inputRefs.current[index - 1].focus();
        }
    }

    useEffect(() => {
        if (submitted) {
            inputRefs.current[0]?.focus();
        }
    }, [submitted]);

    return (
        <div>
            {!submitted ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="flex flex-col items-center bg-white w-[500px] h-[500px] rounded-lg shadow-2xl border border-gray-300">
                        <p className="font-bold mt-10 mb-7 text-lg text-gray-800">Login via OTP</p>
                        <input
                            type="text"
                            placeholder="Enter your mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-[250px] border border-gray-400 shadow-md rounded-md p-2 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="bg-blue-500 mt-[40px] text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
                            onClick={submitButton}
                        >
                            Send OTP
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="flex flex-col items-center bg-white w-[500px] h-[300px] rounded-lg shadow-2xl border border-gray-300 p-6">
                        <p className="text-2xl font-bold text-gray-800 mb-4">Enter OTP</p>
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {data.map((elem, index) => (
                                <input
                                    type="text"
                                    maxLength="1"
                                    key={index}
                                    name={elem.name}
                                    value={elem.value}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onChange={(e) => handleOTPChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-12 text-center text-lg font-bold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                                />
                            ))}
                        </div>
                        <button
                            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
                            onClick={() => setSubmitted(false)}
                        >
                            Submit OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
