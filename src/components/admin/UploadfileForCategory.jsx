import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer';
import useFoodStore from '../../store/food-store';
import { CircleX } from 'lucide-react';
import { Loader } from 'lucide-react';
import { removeImgCategory, uploadImgCategory } from '../../api/Category';


const UploadfileForCategory = ({ form, setForm }) => {
    const token = useFoodStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const hdlOnChange = (e) => {
        setIsLoading(true)
        const files = e.target.files;
        if (files) {
            // console.log("files--->",e.target.files)
            setIsLoading(true);
            // let allFiles = Array.isArray(form.image) ? form.image : [];
            let allFiles = Array.isArray(form.image) ? form.image : [];
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])

                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} ไม่ใช่รูป`)
                    continue
                }
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "่่JPEG",
                    100,
                    0,
                    (data) => {
                        // console.log(token, imgData)
                        uploadImgCategory(token, data)
                            .then((res) => {
                                // console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    image: allFiles
                                })
                                setIsLoading(false)
                                toast.success('อัพรูปสำเร็จ')
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )
            }

        }

    };
    // console.log(form)

    const hdlDelete = (public_id) => {
        setIsLoading(true)
        const image = form.image
        removeImgCategory(token, public_id)
            .then((res) => {
                console.log(res)
                const filterImage = image.filter((item, index) => {
                    return item.public_id !== public_id
                })
                // console.log("filter img", filterImage)
                setIsLoading(false)
                setForm({
                    ...form,
                    image: filterImage
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }






    return (
        <div>

            <div className='w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed text-center'>
                <div className='grid gap-1 ่justtify-items-center'>

                    <div className='flex justify-center text-center items-center gap-4 my-4'>
                        {
                            form?.image?.map((item, index) =>
                                <div key={index} className='relative'>
                                    <img
                                        src={item.url}
                                        className='w-32 h-32 hover:scale-110'

                                    />
                                    <CircleX onClick={() => hdlDelete(item.public_id)} className='absolute top-0 right-0 text-white bg-red-600 rounded-md hover:scale-110' />
                                    <span className='absolute top-0 right-0 bg-re'> </span>
                                </div>
                            )
                        }
                        {
                            isLoading && <Loader className='w-16 h-16 animate-spin ' />
                        }


                    </div>

                    

                    <h2>JPEG maximum 20MB</h2>

                </div>
                <div className='grid gap-2'>
                    <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Drag and Drop your file here or</h4>
                    <div className='flex items-center justify-center'>
                        <label>

                            <input
                                onChange={hdlOnChange}
                                type="file"
                                name='image'
                                multiple
                                hidden
                            />
                            <div className="flex w-28 h-9 px-2 flex-col bg-yellow-500 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">Choose File</div>

                        </label>
                    </div>
                </div>
            </div>
            




        </div>
    )
};

export default UploadfileForCategory;


