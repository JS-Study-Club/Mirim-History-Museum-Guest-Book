import './gallery.css';
import React, { useState } from 'react';

  const repeatedImages = Array.from({ length: 10 });

const Gallery = () => {

    // const [pausedRow, setPausedRow] = useState(null);
    // const [activeIndex, setActiveIndex] = useState(null);

    // const handleClick = (rowIndex, index) => {
    //     setPausedRow(rowIndex);
    //     setActiveIndex(index);

    //     // 3초 후 다시 재생
    //     setTimeout(() => {
    //     setPausedRow(null);
    //     setActiveIndex(null);
    //     }, 3000);
    // };

    return(
        <div className='g-container'>
            <div className='g-header'>
                <p className='header-text'>Mirim Gallery</p>
                <hr className='header-line'/>
            </div>
            <div className="photo-scroller">
            {[0, 1].map((row) => (
                <div className={`row ${row === 0 ? 'left' : 'right'}`} key={row}>
                {[...repeatedImages, ...repeatedImages].map((_, idx) => (
                    <img
                    key={idx}
                    src="/example.png"
                    alt="example"
                    className="photo"
                    />
                ))}
                </div>
            ))}
            </div>
        </div>

    );

};
export default Gallery;