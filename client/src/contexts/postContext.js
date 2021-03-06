import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducer/postReducer';
import { apiUrl } from './constants';
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,
    });

    const [showAddModal, setAddModal] = useState(false);
    const [showUpdatePost, setShowUpdatePost] = useState(false);
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

    // delete post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/post/${postId}`);
            if (response.data.success) {
                dispatch({ type: 'DELETE_POST', payload: postId });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Find Post when user Click edit
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId);
        dispatch({ type: 'FIND_POST', payload: post });
    };

    // update post
    const updatePost = async (updatePost) => {
        try {
            const response = await axios.put(
                `${apiUrl}/post/${updatePost._id}`,
                updatePost
            );
            if (response.data.success) {
                dispatch({
                    type: 'UPDATE_POST',
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
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
        deletePost,
        updatePost,
        findPost,
        showUpdatePost,
        setShowUpdatePost,
    };

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
