import './picture.css';
import StepIndicator from '../stepIndicator/StepIndicator';
import Webcam from 'react-webcam';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.jsx';

const Picture = () => {
    const [countdown, setCountdown] = useState(5);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const { selectedFrame } = useAppContext();

    const getFrameImage = (frameNumber) => {
        return `/frame${frameNumber}.png`;
    };

    const frameImageSrc = selectedFrame ? getFrameImage(selectedFrame) : null;

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();

            setTimeout(() => {
                navigate('/selectPicture', { state: { image: imageSrc } });
            }, 500);
        }
    }, [countdown, navigate]);

    return (
        <div className='container'>
            <div className="header">
                <p className="headerEn">Look at the camera</p>
                <p className="headerKo">좌측의 카메라를 바라봐주세요!</p>
            </div>
           <div className="camera-area">
            <div className="webcam-wrapper">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={971}
                    height={486}
                    mirrored
                    videoConstraints={{
                        facingMode: 'user',
                        width: 971,
                        height: 486
                    }}
                />
                {/* 프레임 이미지 오버레이 */}
                {selectedFrame && (
                    <img
                        src={
                            selectedFrame === 3
                                ? '/kimkb.png' // 프레임 3번이면 kimkb 이미지
                                : getFrameImage(selectedFrame)
                        }
                        alt="frame overlay"
                        className="frame-overlay"
                    />
                )}
            </div>
            <div className="countdown">{countdown}</div>
        </div>

            <StepIndicator currentStep={2} />
        </div>
    );
};

export default Picture;
