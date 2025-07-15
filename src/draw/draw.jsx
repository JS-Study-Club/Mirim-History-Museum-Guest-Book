import './draw.css';
import StepIndicator from '../stepIndicator/StepIndicator';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';

const Draw = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/selectPicture');
    };


    return(
        <div className='container'>
            <div className="header">
                <button className="back-button" onClick={handleBack}>
                    <IoChevronBackOutline size={64} />
                </button>                
                <p className="headerEn">Visitor's book</p>
                <p className="headerKo">방문록을 작성해주세요</p>
            </div>
            <StepIndicator currentStep={3} />

        </div>
    );
};

export default Draw;