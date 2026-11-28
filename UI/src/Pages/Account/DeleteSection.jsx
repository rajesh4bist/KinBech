const DeleteSection = ({ activeTab, setShowDeleteModal }) => {
    return (
        <>
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
        </>
    )
}
export default DeleteSection;