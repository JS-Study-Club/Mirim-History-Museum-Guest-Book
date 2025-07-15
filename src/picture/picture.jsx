import './picture.css';
import StepIndicator from '../stepIndicator/StepIndicator';
import Webcam from 'react-webcam';
import { useState, useEffect, useRef } from 'react';

const Picture = () => {
    const [countdown, setCountdown] = useState(5);
    const [capturedImage, setCapturedImage] = useState(null);
    const webcamRef = useRef(null);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
        }
    }, [countdown]);

    return (
        <div className='container'>
            <div className="header">
                <p className="headerEn">Look at the camera</p>
                <p className="headerKo">좌측의 카메라를 바라봐주세요!</p>
            </div>
            <div className="camera-area">
                {!capturedImage ? (
                    <>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            mirrored
                            width={971}
                            height={486}
                            videoConstraints={{
                                width: 971,
                                height: 486
                            }}
                        />
                        <div className="countdown">{countdown > 0 ? countdown : '찰칵!'}</div>
                    </>
                ) : (
                    <div className="captured-image">
                        <img src={capturedImage} alt="Captured" />
                    </div>
                )}
            </div>
            <StepIndicator currentStep={2} />
        </div>
    );
};

export default Picture;
