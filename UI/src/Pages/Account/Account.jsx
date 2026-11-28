import { useState, useEffect } from 'react'
import './AccountPage.css'
import AccountDetailsSection from './AccountDetails'
import SecuritySection from './SecuritySection'
import NotificationsSection from './NotificationsSection'
import SellProducts from './SellProductsSection'
import DeleteSection from './DeleteSection'
import DeleteConfirmation from './DeleteConfirmation'
import ProfileHeader from './ProfileMainHeader'
import SideBar from './SideBar'


const Toggle = ({ checked, onChange, label }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`account-switch ${checked ? 'on' : ''}`}
        onClick={onChange}
    >
        <span className="account-switch-knob" />
    </button>
)

const AccountPage = ({ userResponse }) => {
    const [activeTab, setActiveTab] = useState('profile')

    const [profile, setProfile] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    useEffect(() => {
        setProfile(userResponse);
    }, [userResponse]);



    return (
        <>
            <div className="account-page-main">
                <title>My Account</title>

                {/* Top banner */}
                <ProfileHeader profile={profile} />


                <div className="account-layout">
                    {/* Sidebar */}
                    <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Content */}
                    <main className="account-content">

                        {/* Account Details Section */}
                        <AccountDetailsSection activeTab={activeTab} profile={profile} />

                        {/* Security Section */}
                        <SecuritySection activeTab={activeTab} Toggle={Toggle} />

                        {/* Notifications Section */}
                        <NotificationsSection activeTab={activeTab} Toggle={Toggle} />

                        {/* Sell Products Section */}
                        <SellProducts activeTab={activeTab} />

                        {/* Delete Section */}
                        <DeleteSection activeTab={activeTab} setShowDeleteModal={setShowDeleteModal} />
                    </main>
                </div>

                {/* Delete Confirmation Section */}
                <DeleteConfirmation showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            </div>
        </>
    )
}
export default AccountPage;