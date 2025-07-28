import './selectFrame.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from '../stepIndicator/StepIndicator';
import Webcam from "react-webcam";

const SelectFrame = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [countdown, setCountdown] = useState(30);

    const handleClick = () => {
      if (selected !== null) {
        navigate('/picture');
      }
    };

    useEffect(() => {
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
          navigate("/");
        }, 30000);

        return () => {
          clearInterval(timer);
          clearTimeout(timeout);
        };
    }, [navigate]);

    return (
      <div className='container'>
        <div className="header">
          <p className="headerEn">Choose Frame</p>
          <p className="headerKo">프레임을 선택해주세요</p>
        </div>

        <div className="frame-container">
          <Webcam
            audio={false}
            className="webcam"
            videoConstraints={{ facingMode: "user" }}
            mirrored
          />
          {selected === 3 && (
            <img src="/kimkb.png" alt="kimkb frame" className="frame-overlay" />
          )}
        </div>


        <div className="frames">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isSelected = selected === num;
            const isAnythingSelected = selected !== null;

            return (
              <div
                key={num}
                className={`thumbnail${num} ${
                  isSelected ? 'selected' : isAnythingSelected ? 'unselected' : 'initial'
                }`}
                onClick={() => setSelected(num)}
              >
                {num === 1 && (
                  <img src="/noIcon.png" alt="no frame" className="no-frame-icon" />
                )}
              </div>
            );
          })}
        </div>

        <button className='nextbutton' onClick={handleClick} disabled={selected === null}>
          다음
        </button>
        <p className='after30'>{countdown}초 뒤 메인화면으로 이동합니다</p>
        <StepIndicator currentStep={1} />
      </div>
    );
};

export default SelectFrame;
