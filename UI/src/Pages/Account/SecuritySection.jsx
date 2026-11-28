import { useState } from 'react'


const SecuritySection = ({ activeTab, Toggle }) => {

    const [twoFactor, setTwoFactor] = useState(false)
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })

    const passwordsMismatch = passwords.confirm !== '' && passwords.next !== passwords.confirm

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (passwordsMismatch) return;

        setPasswords({ current: '', next: '', confirm: '' })
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswords((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <>
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

        </>
    )
}

export default SecuritySection;