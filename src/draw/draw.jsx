import './draw.css';
import StepIndicator from '../stepIndicator/StepIndicator';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useRef, useState } from 'react';

const Draw = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate('/selectPicture');

  const location = useLocation();
  const image = location.state?.image;

  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [undoCount, setUndoCount] = useState(0);

  const handleRedoClick = () => {
    if (canRedo) {
      canvasRef.current?.redo();
      setUndoCount(undoCount - 1);
      updateButtonStates(strokeCount, undoCount - 1);
    }
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handleUndoClick = () => {
    if (canUndo) {
      canvasRef.current?.undo();
      setUndoCount(undoCount + 1);
      updateButtonStates(strokeCount, undoCount + 1);
    }
  };

  const handleStroke = () => {
    // 새로운 스트로크가 추가될 때
    const newStrokeCount = strokeCount + 1;
    setStrokeCount(newStrokeCount);
    setUndoCount(0); // 새로 그리면 undo 스택 초기화
    updateButtonStates(newStrokeCount, 0);
  };

  const updateButtonStates = (strokes, undos) => {
    // undo 가능: 실제로 그린 스트로크가 있고, 아직 undo할 게 남아있을 때
    setCanUndo(strokes > 0 && undos < strokes);
    // redo 가능: undo를 한 적이 있을 때
    setCanRedo(undos > 0);
  };

  const handleDoneClick = async () => {
    const dataUrl = await canvasRef.current?.exportImage('png');
    console.log(dataUrl);
    // navigate('/complete', { state: { drawing: dataUrl } }); // 예시
  };

  return (
    <div className="container">
      <div className="header">
        <button className="back-button" onClick={handleBack}>
          <IoChevronBackOutline size={64} />
        </button>
        <p className="headerEn">Visitor's book</p>
        <p className="headerKo">방문록을 작성해주세요</p>
      </div>

      {image ? (
        <div className="preview-wrap">
          <img src={image} alt="Captured" className="preview-image" />
          <div className="canvas-wrapper">
            <ReactSketchCanvas
              ref={canvasRef}
              strokeWidth={4}
              strokeColor="black"
              canvasColor="transparent"
              style={{ width: '972px', height: '390px' }}
              onStroke={handleStroke}
            />
          </div>
        </div>
      ) : (
        <p>사진이 없습니다.</p>
      )}

      <div className="tools">
        <button 
          onClick={handleUndoClick} 
          className={canUndo ? "undo-button active" : "undo-button"}
          disabled={!canUndo}
        >
            <img src="/undoIcon.svg" alt="undo" className="tool-icon" />
        </button>
        <button
          onClick={handlePenClick}
          className={eraseMode ? 'tool-button' : 'tool-button active'}
        >
            <img src="/pencilIcon.svg" alt="펜" className="tool-icon" />
        </button>
        <button
          onClick={handleEraserClick}
          className={eraseMode ? 'tool-button active' : 'tool-button'}
        >
            <img src="/eraserIcon.svg" alt="지우개" className="tool-icon" />
        </button>
        <button 
          onClick={handleRedoClick} 
          className={canRedo ? "redo-button active" : "redo-button"}
          disabled={!canRedo}
        >
            <img src="/redoIcon.svg" alt="redo" className="tool-icon" />
        </button>
      </div>

      <button className="done-button" onClick={handleDoneClick}>완료</button>

      <StepIndicator currentStep={3} />
    </div>
  );
};

export default Draw;