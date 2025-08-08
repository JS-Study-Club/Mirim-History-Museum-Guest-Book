import './finish.css';
import 'animate.css';
import StepIndicator from '../stepIndicator/StepIndicator';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Finish = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [countdown, setCountdown] = useState(30);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [isLoadingQR, setIsLoadingQR] = useState(true);
    
    // 이전 페이지에서 전달받은 업로드된 이미지 정보
    const uploadedImageUrl = location.state?.uploadedImage;
    const fileName = location.state?.fileName;

    // QR 코드 생성 함수
    const generateQRCode = async (imageUrl) => {
        try {
            const response = await fetch('http://localhost:3000/qr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: imageUrl
                })
            });

            if (!response.ok) {
                throw new Error('QR코드 생성 실패');
            }

            const result = await response.json();
            return result.qrimgUrl;
        } catch (error) {
            console.error('QR코드 생성 중 오류 발생:', error);
            throw error;
        }
    };

    useEffect(() => {
        // QR 코드 생성
        const createQRCode = async () => {
            if (uploadedImageUrl) {
                try {
                    setIsLoadingQR(true);
                    const qrUrl = await generateQRCode(uploadedImageUrl);
                    setQrCodeUrl(qrUrl);
                } catch (error) {
                    console.error('QR코드 생성 실패:', error);
                    // QR 코드 생성 실패시에도 페이지는 정상 동작하도록
                } finally {
                    setIsLoadingQR(false);
                }
            } else {
                console.warn('업로드된 이미지 URL이 없습니다.');
                setIsLoadingQR(false);
            }
        };

        createQRCode();
    }, [uploadedImageUrl]);
    
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

    return(
        <div className='container'>
            <div onClick={() => navigate('/')} className='home'>
                <img className='homeIcon' src='/home.png' alt='홈 아이콘'></img>
                <p className='homeText'>홈으로</p>
            </div>
            <div className='check'>
                <img src='/done.png' alt='완료 체크 아이콘'></img>
            </div>
            <p className='desc1'>갤러리에 성공적으로<br/>게시되었습니다!</p>
            <p className='desc2'>오른쪽 갤러리를 확인해주세요</p>
            
            {/* QR 코드 표시 부분 */}
            <div className='qr-container'>
                {isLoadingQR ? (
                    <div className='qr-loading'>
                        <p>QR코드 생성 중...</p>
                    </div>
                ) : qrCodeUrl ? (
                    <img 
                        className='qrcode' 
                        src={qrCodeUrl} 
                        alt='방문록 다운로드 QR코드'
                        onError={(e) => {
                            console.error('QR코드 이미지 로드 실패');
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className='qr-error'>
                        <p>QR코드를 생성할 수 없습니다</p>
                    </div>
                )}
            </div>
            
            <p className='desc3'>QR을 찍고 방문록을 다운받으세요</p>
            <p className='after302'>{countdown}초 뒤 메인화면으로 이동합니다</p>
            <StepIndicator currentStep={4} />
        </div>
    );
};

export default Finish;