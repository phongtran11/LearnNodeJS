import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducer/postReducer';
import { apiUrl } from './constants';
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postsLoading: true,
    });

    const [showAddModal, setAddModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    });

    // Get all Post
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post`);
            if (response.data.success) {
                dispatch({
                    type: 'POST_LOADED_SUCCESS',
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({ type: 'POST_LOADED_FAIL' });
        }
    };

    // Add post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/post`, newPost);
            if (response.data.success) {
                dispatch({
                    type: 'ADD_POST',
                    payload: response.data.posts,
                });

                return response.data;
            }
        } catch (error) {
            return error.response.message
                ? error.response.message
                : { success: false, message: 'Server error' };
        }
    };

    // Post Context Data
    const postContextData = {
        postState,
        getPosts,
        addPost,
        showAddModal,
        setAddModal,
        showToast,
        setShowToast,
    };

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
