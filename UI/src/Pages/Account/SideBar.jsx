const TABS = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'sell', label: 'Sell Your Products' },
    { id: 'danger', label: 'Delete Account' },
]

const SideBar = ({activeTab,setActiveTab}) => {
    return (
        <>
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
        </>
    )
}
export default SideBar;