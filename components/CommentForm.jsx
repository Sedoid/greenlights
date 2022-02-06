import { Box, useColorModeValue } from '@chakra-ui/react';
import { comment } from 'postcss';
import React,{useState,useEffect,useRef} from 'react'
import { submitComment } from '../services';

const CommentForm = ({slug}) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storageDataEl = useRef();
    
    useEffect(() =>{
        nameEl.current.value = window.localStorage.getItem('name')
        emailEl.current.value = window.localStorage.getItem('email')
    },[])

    const handleCommentSubmission = () =>{
        setError(false);
        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storageDataEl.current;


        if(!commentEl || !nameEl || !emailEl){
            setError(true);
            return;
        }

        const commentObj = {name,email,comment,slug};
        
        if(storeData){
            window.localStorage.setItem('name',name)
            window.localStorage.setItem('email',email)
        }else{
            window.localStorage.removeItem('name',name)
            window.localStorage.removeItem('email',email)            
        }

        submitComment(commentObj)
            .then(res =>{
                setShowSuccessMessage(true);

                setTimeout(() =>{
                    setShowSuccessMessage(false);
                },3000);
            })
    }

    return (
        <Box 
        bg={useColorModeValue('grey.900', 'gray.900')}
        className={useColorModeValue('light_shadow','dark_shadow')}
        color={useColorModeValue('gray.700', 'gray.400')}
        className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8"  borderWidth='1px' borderRadius='md'>
            <h1 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h1>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea ref={commentEl} className="p-4 outline-nome w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-grey-700" placeholder="Comment" name="comment"/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input type="text" ref={nameEl} className="py-2 px-4 outline-nome w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-grey-700"  placeholder="Name" name="name" />
                <input type="text" ref={emailEl} className="py-2 px-4 outline-nome w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-grey-700"  placeholder="Email" name="email" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                    <input ref={storageDataEl} type="checkbox" id="storeData" name="storeData" value="true" />
                    <label className="text-gray-500 cursor-poiner ml-2 text-sm" htmlFor="storeData">save my mail and name for the next time I comment.</label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">All fields are required.</p>}
            <div className="mt-8">
                <button type="button" onClick={handleCommentSubmission} className="transition duration-500 ease hover:bg-green-900 inline-block bg-green-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"> Post Comment</button>
                {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for Review</span>}
            </div>

        </Box>
    )
}

export default CommentForm
