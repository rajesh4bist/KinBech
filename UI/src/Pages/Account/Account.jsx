import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import './AccountPage.css'

const TABS = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'sell', label: 'Sell Your Products' },
    { id: 'danger', label: 'Delete Account' },
]

const NOTIFICATION_OPTIONS = [
    { key: 'orders', title: 'Order updates', desc: 'Get notified when your order is confirmed, shipped or delivered.' },
    { key: 'offers', title: 'Offers & promotions', desc: 'Deals, discounts and new arrivals picked for you.' },
    { key: 'newsletter', title: 'Newsletter', desc: 'A weekly digest of what is new in the store.' },
    { key: 'security', title: 'Security alerts', desc: 'Warn me about new logins and password changes.' },
]

const CURRENCY = 'Rs.'

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

    const [photo, setPhoto] = useState(null)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(true)
    const [profileError, setProfileError] = useState('')
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
    const [twoFactor, setTwoFactor] = useState(false)
    const [notifications, setNotifications] = useState({
        orders: true,
        offers: false,
        newsletter: false,
        security: true,
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteText, setDeleteText] = useState('')
    const [listings, setListings] = useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:8080/users/account', {
    //         params: {
    //             email: userResponse.email
    //         }
    //     })
    //         .then((res) => setProfile(res.data))
    //         .catch(() => setProfileError("Couldn't load your account details."))
    //         .finally(() => setProfileLoading(false))
    // }, [])

    useEffect(() => {
        setProfile(userResponse);
    }, [userResponse]);

    const initial = (profile?.name?.trim()[0] || 'U').toUpperCase()
    const passwordsMismatch = passwords.confirm !== '' && passwords.next !== passwords.confirm

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if (file) setPhoto(URL.createObjectURL(file))
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswords((prev) => ({ ...prev, [name]: value }))
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (passwordsMismatch) return
        // TODO: send `passwords` to your backend
        setPasswords({ current: '', next: '', confirm: '' })
    }

    const toggleNotification = (key) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false)
        setDeleteText('')
    }

    const handleDeleteAccount = () => {
        closeDeleteModal()
    }
    const handleRemoveListing = (id) => {
        if (!window.confirm('Remove this listing?')) return
        // TODO: call your delete-product API here first
        setListings((prev) => prev.filter((item) => item.id !== id))
    }
    return (
        <>
            <div className="account-page-main">
                <title>My Account</title>

                {/* Top banner */}
                <header className="account-hero">
                    <div className="account-avatar">
                        {photo ? <img src={photo} alt="Profile" /> : initial}
                    </div>
                    <div className="account-hero-text">
                        <h1>{profile?.name || 'My Account'}</h1>
                        <p>{profile?.email || 'Manage your profile, security and preferences'}</p>
                    </div>
                    <div className="account-hero-actions">
                        <label className="account-btn account-btn-outline account-btn-sm">
                            Change Photo
                            <input
                                type="file"
                                accept="image/*"
                                className="account-visually-hidden"
                                onChange={handlePhoto}
                            />
                        </label>
                        {photo && (
                            <button
                                type="button"
                                className="account-btn account-btn-outline account-btn-sm"
                                onClick={() => setPhoto(null)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </header>

                <div className="account-layout">
                    {/* Sidebar */}
                    <aside className="account-sidebar">
                        <nav className="account-tabs">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    className={`account-tab ${tab.id === 'danger' ? 'danger' : ''} ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                        <button type="button" className="account-btn account-btn-outline account-logout">
                            Log Out
                        </button>
                    </aside>

                    {/* Content */}
                    <main className="account-content">
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

                        {activeTab === 'security' && (
                            <>
                                <section className="account-card">
                                    <div className="account-card-head">
                                        <h2>Change Password</h2>
                                        <p>Use a strong password you don't use anywhere else.</p>
                                    </div>
                                    <form onSubmit={handlePasswordSubmit}>
                                        <div className="account-grid">
                                            <label className="account-field full">
                                                <span>Current Password</span>
                                                <input type="password" name="current" placeholder="Current Password" value={passwords.current} onChange={handlePasswordChange} />
                                            </label>
                                            <label className="account-field">
                                                <span>New Password</span>
                                                <input type="password" name="next" placeholder="New Password" value={passwords.next} onChange={handlePasswordChange} />
                                                <small className="account-error" />
                                            </label>
                                            <label className="account-field">
                                                <span>Confirm New Password</span>
                                                <input type="password" name="confirm" placeholder="Confirm New Password" value={passwords.confirm} onChange={handlePasswordChange} />
                                                <small className="account-error" aria-live="polite">
                                                    {passwordsMismatch ? "Passwords don't match" : ''}
                                                </small>
                                            </label>
                                        </div>
                                        <div className="account-actions">
                                            <button type="submit" className="account-btn account-btn-primary">Update Password</button>
                                        </div>
                                    </form>
                                </section>

                                <section className="account-card">
                                    <div className="account-card-head">
                                        <h2>Account Protection</h2>
                                        <p>Extra layers of security for your account.</p>
                                    </div>
                                    <div className="account-rows">
                                        <div className="account-row">
                                            <div>
                                                <h3>Two-factor authentication</h3>
                                                <p>Ask for a verification code every time you log in on a new device.</p>
                                            </div>
                                            <Toggle checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} label="Two-factor authentication" />
                                        </div>
                                        <div className="account-row">
                                            <div>
                                                <h3>Log out of all devices</h3>
                                                <p>Sign out everywhere you're logged in, except this device.</p>
                                            </div>
                                            <button type="button" className="account-btn account-btn-outline">Log Out Everywhere</button>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {activeTab === 'notifications' && (
                            <section className="account-card">
                                <div className="account-card-head">
                                    <h2>Notifications</h2>
                                    <p>Choose what you want to hear about.</p>
                                </div>
                                <div className="account-rows">
                                    {NOTIFICATION_OPTIONS.map((option) => (
                                        <div className="account-row" key={option.key}>
                                            <div>
                                                <h3>{option.title}</h3>
                                                <p>{option.desc}</p>
                                            </div>
                                            <Toggle
                                                checked={notifications[option.key]}
                                                onChange={() => toggleNotification(option.key)}
                                                label={option.title}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}


                        {activeTab === 'sell' && (
                            <>
                                <section className="account-card">
                                    <div className="account-card-head">
                                        <h2>Sell Your Products</h2>
                                        <p>Turn what you no longer need, or what you make, into money. List a product in a few minutes.</p>
                                    </div>
                                    <ol className="account-steps">
                                        <li className="account-step">
                                            <span className="account-step-num">1</span>
                                            <div>
                                                <h3>List your product</h3>
                                                <p>Add photos, a price and a short description.</p>
                                            </div>
                                        </li>
                                        <li className="account-step">
                                            <span className="account-step-num">2</span>
                                            <div>
                                                <h3>Get orders</h3>
                                                <p>Buyers find your listing and place orders with you.</p>
                                            </div>
                                        </li>
                                        <li className="account-step">
                                            <span className="account-step-num">3</span>
                                            <div>
                                                <h3>Deliver and get paid</h3>
                                                <p>Hand over the item and receive your payment.</p>
                                            </div>
                                        </li>
                                    </ol>
                                    <div className="account-actions">
                                        <Link to="/sell/new" className="account-btn account-btn-primary">
                                            + Add New Product
                                        </Link>
                                    </div>
                                </section>

                                <section className="account-card">
                                    <div className="account-card-head">
                                        <h2>Your Listings</h2>
                                        <p>Products you have put up for sale.</p>
                                    </div>

                                    {listings.length === 0 ? (
                                        <div className="account-empty">
                                            <p>You haven't listed anything yet.</p>
                                            <Link to="/sell/new" className="account-btn account-btn-outline">
                                                List your first product
                                            </Link>
                                        </div>
                                    ) : (
                                        <ul className="account-listings">
                                            {listings.map((item) => (
                                                <li className="account-listing" key={item.id}>
                                                    <div className="account-listing-thumb">
                                                        {item.image ? <img src={item.image} alt={item.name} /> : item.name[0]}
                                                    </div>
                                                    <div className="account-listing-info">
                                                        <h3>{item.name}</h3>
                                                        <p>{CURRENCY} {item.price} · {item.quantity} in stock</p>
                                                    </div>
                                                    <div className="account-listing-actions">
                                                        <Link to={`/sell/edit/${item.id}`} className="account-btn account-btn-outline account-btn-sm">
                                                            Edit
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className="account-btn account-btn-danger account-btn-sm"
                                                            onClick={() => handleRemoveListing(item.id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </section>
                            </>
                        )}
                        {activeTab === 'danger' && (
                            <section className="account-card account-card-danger">
                                <div className="account-card-head">
                                    <h2>Delete Account</h2>
                                    <p>These actions affect your whole account, so please read carefully.</p>
                                </div>
                                <div className="account-rows">
                                    <div className="account-row">
                                        <div>
                                            <h3>Deactivate account</h3>
                                            <p>Temporarily hide your account. You can come back any time by logging in.</p>
                                        </div>
                                        <button type="button" className="account-btn account-btn-outline">Deactivate</button>
                                    </div>
                                    <div className="account-row">
                                        <div>
                                            <h3>Delete account</h3>
                                            <p>Permanently remove your profile, order history and saved details. This cannot be undone.</p>
                                        </div>
                                        <button type="button" className="account-btn account-btn-danger" onClick={() => setShowDeleteModal(true)}>
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}
                    </main>
                </div>

                {/* Delete confirmation */}
                {showDeleteModal && (
                    <div className="account-modal-overlay" onClick={closeDeleteModal}>
                        <div
                            className="account-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="delete-title"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 id="delete-title">Delete your account?</h3>
                            <p>
                                This will permanently delete your profile, order history and saved details.
                                This action cannot be undone.
                            </p>
                            <label className="account-field">
                                <span>Type <strong>DELETE</strong> to confirm</span>
                                <input
                                    type="text"
                                    placeholder="DELETE"
                                    value={deleteText}
                                    onChange={(e) => setDeleteText(e.target.value)}
                                />
                            </label>
                            <div className="account-modal-actions">
                                <button type="button" className="account-btn account-btn-outline" onClick={closeDeleteModal}>
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="account-btn account-btn-danger"
                                    disabled={deleteText !== 'DELETE'}
                                    onClick={handleDeleteAccount}
                                >
                                    Delete Forever
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default AccountPage;