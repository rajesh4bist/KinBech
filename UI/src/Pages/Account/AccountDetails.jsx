import { Link } from 'react-router'

const AccountDetailsSection = ({ activeTab, profile }) => {
    return (
        <>
            {activeTab === 'profile' && (
                <section className="account-card">
                    <div className="account-card-head">
                        <h2>Account Details</h2>
                        <p>The personal information saved on your account.</p>
                    </div>
                    {/* 
                                {profileLoading && <p className="account-status">Loading your details...</p>}
                                {profileError && <p className="account-status account-status-error">{profileError}</p>} */}

                    {profile && (
                        <>
                            <dl className="account-details">
                                <div className="account-detail">
                                    <dt>Full Name</dt>
                                    <dd>{profile.name}</dd>
                                </div>
                                <div className="account-detail">
                                    <dt>Email Address</dt>
                                    <dd>{profile.email}</dd>
                                </div>
                            </dl>
                            <div className="account-actions">
                                <Link to="/account/edit" className="account-btn account-btn-primary">
                                    Edit Account
                                </Link>
                            </div>
                        </>
                    )}
                </section>
            )}
        </>)

}

export default AccountDetailsSection;