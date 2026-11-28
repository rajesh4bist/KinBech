import { useState } from "react"

const ProfileHeader = ({profile}) => {


    const initial = (profile?.name?.trim()[0] || 'U').toUpperCase()

    const [photo, setPhoto] = useState(null)

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if (file) setPhoto(URL.createObjectURL(file))
    }


    return (
        <>
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
        </>
    )
}
export default ProfileHeader