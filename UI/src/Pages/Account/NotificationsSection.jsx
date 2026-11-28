import { useState } from "react"

const NOTIFICATION_OPTIONS = [
    { key: 'orders', title: 'Order updates', desc: 'Get notified when your order is confirmed, shipped or delivered.' },
    { key: 'offers', title: 'Offers & promotions', desc: 'Deals, discounts and new arrivals picked for you.' },
    { key: 'newsletter', title: 'Newsletter', desc: 'A weekly digest of what is new in the store.' },
    { key: 'security', title: 'Security alerts', desc: 'Warn me about new logins and password changes.' },
]

const NotificationsSection = ({ activeTab, Toggle }) => {

    const [notifications, setNotifications] = useState({
        orders: true,
        offers: false,
        newsletter: false,
        security: true,
    })

    const toggleNotification = (key) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
    }


    return (
        <>
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
        </>
    )
}
export default NotificationsSection;