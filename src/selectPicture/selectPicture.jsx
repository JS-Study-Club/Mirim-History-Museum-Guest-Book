import './selectPicture.css';
import StepIndicator from '../stepIndicator/StepIndicator';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';

const SelectPicture = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const image = location.state?.image;

    const handleBack = () => {
        navigate('/selectFrame');
    };

    const handleRetake = () => {
        navigate('/picture');
    };

    const handleSave = () => {
        navigate('/draw', { state: { image } });
    };

    return (
        <div className='container'>
            <div className="header">
                <button className="back-button" onClick={handleBack}>
                    <IoChevronBackOutline size={64} />
                </button>                
                <p className="headerEn">Save Photo</p>
                <p className="headerKo">사진을 저장하시겠습니까?</p>
            </div>
            {image ? (
                <img src={image} alt="Captured" className="preview-image" />
            ) : (
                <p>사진이 없습니다.</p>
            )}
            <div className="button-group">
                <button className="retake-button" onClick={handleRetake}>다시 찍기</button>
                <button className="save-button" onClick={handleSave}>다음</button>
            </div>
            <StepIndicator currentStep={2} />

        </div>
    );

};
export default SelectPicture;