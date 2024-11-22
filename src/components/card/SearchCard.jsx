import React, { useState, useEffect } from 'react';
import useFoodStore from '../../store/food-store';

const SearchCard = () => {
    const getMenu = useFoodStore((state) => state.getMenu);
    const actionSearchFillter = useFoodStore((state) => state.actionSearchFillter);
    const getCategory = useFoodStore((state) => state.getCategory);
    const categories = useFoodStore((state) => state.categories);

    const [text, setText] = useState('');
    const [categorySelected, setCategorySelected] = useState([]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // State for toggling categories

    useEffect(() => {
        getCategory();
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFillter({ query: text });
            } else {
                getMenu();
            }
        }, 1000);

        return () => clearTimeout(delay);
    }, [text]);

    const hdlCheck = (e) => {
        const inCheck = e.target.value;
        const inState = [...categorySelected];
        const findCheck = inState.indexOf(inCheck);

        if (findCheck === -1) {
            inState.push(inCheck);
        } else {
            inState.splice(findCheck, 1);
        }
        setCategorySelected(inState);

        if (inState.length > 0) {
            actionSearchFillter({ category: inState });
        } else {
            getMenu();
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <input
                onChange={(e) => setText(e.target.value)}
                type='text'
                placeholder='ค้นหาเมนู'
                className='border rounded-md w-full mb-4 p-2'
            />
            <hr />
            <div className="my-4">
                <h1 className="text-lg font-semibold cursor-pointer" onClick={() => setIsCategoriesOpen(prev => !prev)}>
                    ประเภทรายการเมนู
                </h1>
                {isCategoriesOpen && (
                    <div className="mt-2">
                        {categories.map((item, index) => (
                            <div key={index} className='flex gap-2 my-2 items-center'>
                                <input
                                    type='checkbox'
                                    value={item.id}
                                    onChange={hdlCheck}
                                    className="cursor-pointer"
                                />
                                <label className="cursor-pointer">{item.name}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchCard;
