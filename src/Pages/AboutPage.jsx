import AboutStory from '@/components/AboutPage/AboutStory';
import ExecutiveCommittee from '@/components/AboutPage/ExecutiveCommittee';
import React from 'react';

const AboutPage = () => {
    return (
        <div className='bg-slate-50'>
            <AboutStory />
            <ExecutiveCommittee/>
        </div>
    );
};

export default AboutPage;