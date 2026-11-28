import { useState } from "react"

const DeleteConfirmation = ({ showDeleteModal, setShowDeleteModal }) => {

    const [deleteText, setDeleteText] = useState('')

    const closeDeleteModal = () => {
        setShowDeleteModal(false)
        setDeleteText('')
    }

    const handleDeleteAccount = () => {
        closeDeleteModal()
    }

    return (
        <>
            {
                showDeleteModal && (
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
                )
            }
        </>)

}

export default DeleteConfirmation;