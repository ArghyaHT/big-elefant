import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './utils/scrollToTop'
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
import SingleProductPage from './Pages/SingleProductPage'
import Beverages from './Pages/Beverages'
import DeathToPlasticPage from './Pages/DeathToPlasticPage'
import MerchPage from './Pages/Merch'
import SingleMerchPage from './Pages/SingleMerchPage'
import ContactUs from './Pages/ContactUs'
import FaqPage from './Pages/FaqPage'
import CheckOutPage from './Pages/CheckOutPage'
import SignInPage from './Pages/SignInPage'
import SignUpPage from './Pages/SignUpPage'
import DashboardPage from './Pages/DashboardPage'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import PrivacyPolicyPage from './Pages/PrivacyPolicy'
import TermsContionsPage from './Pages/T&CPage'
import ElefantsClubPage from './Pages/ElefantClubPage'
import ForgetPasswordPage from './Pages/ForgetPasswordpage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/single-product-page/:id" element={<SingleProductPage />} />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/death-to-plastic" element={<DeathToPlasticPage />} />
        <Route path="/merch" element={<MerchPage />} />
        <Route path="/single-merch-page/:id" element={<SingleMerchPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/check-out" element={<CheckOutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/user-dashboard" element={<DashboardPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsContionsPage />} />
        <Route path="/elefant-club" element={<ElefantsClubPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />



      </Routes>

    </BrowserRouter>

  )
}

export default App
