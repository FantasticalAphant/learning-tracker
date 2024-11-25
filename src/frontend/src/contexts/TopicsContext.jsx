'use client'
import React, {createContext, useContext, useEffect, useState} from 'react';

const TopicsContext = createContext(null);

export function TopicsProvider({children}) {
    const [topics, setTopics] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch("http://localhost:8080/topics?limit=3");
                const data = await response.json();
                setTopics(data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        if (!topics) {
            fetchTopics();
        }
    }, [topics]);

    const refreshTopics = () => setTopics(null);

    return (
        <TopicsContext.Provider value={{topics, refreshTopics}}>
            {children}
        </TopicsContext.Provider>
    );
}

export function useTopics() {
    return useContext(TopicsContext);
}
