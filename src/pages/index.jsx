import Layout from "./Layout.jsx";

import Home from "./Home";

import ComingSoon from "./ComingSoon";

import MemberDashboard from "./MemberDashboard";

import PrivacyPolicy from "./PrivacyPolicy";

import Terms from "./Terms";

import AuthPage from "./AuthPage";

import Checkout from "./Checkout";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    ComingSoon: ComingSoon,
    
    MemberDashboard: MemberDashboard,
    
    PrivacyPolicy: PrivacyPolicy,
    
    Terms: Terms,
    
    AuthPage: AuthPage,
    
    Checkout: Checkout,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/ComingSoon" element={<ComingSoon />} />
                
                <Route path="/MemberDashboard" element={<MemberDashboard />} />
                
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                
                <Route path="/Terms" element={<Terms />} />
                
                <Route path="/AuthPage" element={<AuthPage />} />
                
                <Route path="/checkout" element={<Checkout />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}