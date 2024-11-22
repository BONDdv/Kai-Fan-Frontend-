import React, { useEffect, useRef } from 'react';
import foodImg from '../assets/foodImg.png';
import CategoryAtHome from '../components/card/CategoryAtHome';
import useFoodStore from '../store/food-store';

const Home = () => {
  const getCategory = useFoodStore((state) => state.getCategory);
  const categories = useFoodStore((state) => state.categories);

  useEffect(() => {
    getCategory();
  }, []);

  const menuRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='flex flex-col'>

      {/* Section 1 */}
      <div className="bg-[#333030] text-white h-screen flex justify-center items-center p-4">
        <div className="container flex flex-col md:flex-row justify-center items-center gap-6">

          {/* Image Spin Section */}
          <div className="flex items-center justify-center">
            <img src={foodImg} className="w1/4 max-w-xs md:max-w-md" alt="Food" />
          </div>

          {/* Content Section */}
          <div className="content max-w-xl w-full text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">ไก๊ฟ่าน ข้าวมันไก่ไต้หวัน</h1>
            <p className="description text-lg leading-relaxed mb-4">
              ข้าวมันไก่ รสชาติแท้จากไต้หวัน และกรรมวิธีต้มสูตรพิเศษจากทางร้าน
            </p>
            <div className="btnBx flex flex-col md:flex-row justify-center gap-2">
              <button
                className="bg-yellow-500 border border-yellow-500 py-2 px-6 text-white hover:bg-yellow-600 transition-all"
                onClick={scrollToMenu}
              >
                ดูเมนู
              </button>
              {/* <button className="border border-yellow-500 py-2 px-6 text-white hover:bg-yellow-600 transition-all"
                onClick={scrollToAbout}
              >
                เกี่ยวกับเรา
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* End of Section 1 */}

      {/* Section 2 */}
      <div className="min-h-screen bg-[#333030] flex flex-col justify-center" ref={menuRef}>
        <h1 className="text-yellow-500 text-4xl mt-16 mb-8 underline text-center">เมนูอาหาร</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-8'>
          {categories.map((item, index) =>
            <CategoryAtHome key={index} item={item} />
          )}
        </div>
      </div>
      {/* End of Section 2 */}

      {/* Section 3 */}
      {/* <div className='h-screen flex flex-col'>
        <div className="flex-1 bg-white flex justify-center items-center">
          <h1 className='text-yellow-500 text-4xl underline py-2 px-4 hover:bg-yellow-500 hover:text-white transition-all' ref={aboutRef}>เกี่ยวกับร้านเรา</h1>
        </div>
        <div className="flex-1 bg-[#333030] flex justify-center items-center">
          <h1 className='text-yellow-500 text-4xl underline py-2 px-4 hover:bg-yellow-500 hover:text-white transition-all'>ช่องทางติดต่อ</h1>
        </div>
      </div> */}
      {/* End of Section 3 */}

    </div>
  );
};

export default Home;
