import FeatureGrid from '@/components/HomePage/FeatureGrid';
import Hero from '@/components/HomePage/Hero';
import JourneySection from '@/components/HomePage/JourneySection';
import LatestNewsSection from '@/components/HomePage/LatestNewsSection';
import MembershipCTA from '@/components/HomePage/MembershipCTA';
import MessageSection from '@/components/HomePage/MessageSection';
import PhotoGallery from '@/components/HomePage/PhotoGallery';
import WelcomeSection from '@/components/HomePage/WelcomeSection';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <WelcomeSection />
            <FeatureGrid />
            <JourneySection />
            <PhotoGallery />
            <MessageSection />
            <LatestNewsSection/>
            <MembershipCTA/>
        </div>
    );
};

export default HomePage;