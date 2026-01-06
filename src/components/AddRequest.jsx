import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRequest() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        date: new Date().toISOString().split('T')[0], // Defaults to today
        imageUrl: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            Item: {
                Description: formData.description,
                Name: formData.name,
            },
            Bounty: 0,
            LastLocation: formData.location,
            LastDate: formData.date,
            requestingUser: {
                userId: user.userId,
            }
        };

        try {
            const response = await fetch("http://localhost:8080/api/item/post_request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Request submitted successfully!");
                navigate("/dashboard");
            } else {
                alert("Request failed.");
            }
        } catch (error) {
            alert("Failed to submit request.");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Report an Item</h1>
                <p style={styles.subtitle}>Provide details about the lost or found item</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Item Name</label>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="e.g. Silver iPhone 13"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />

                    <label style={styles.label}>Description</label>
                    <textarea
                        style={{...styles.input, height: "80px", resize: "none"}}
                        placeholder="Describe the item's condition or unique marks"
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />

                    <label style={styles.label}>Location</label>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="e.g. Science Building Cafeteria"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />

                    {/* --- DATE SELECTOR --- */}
                    <label style={styles.label}>Date Found/Lost</label>
                    <input
                        style={styles.input}
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />

                    <button type="submit" style={styles.submitButton}>Submit Request</button>
                    <button type="button" onClick={() => navigate(-1)} style={styles.cancelButton}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

const styles = {

    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
        padding: "40px"
    },
    container: {
        maxWidth: "600px", // Form is usually narrower for better readability
        margin: "0 auto"
    },
    title: {
        fontSize: "32px",
        marginBottom: "6px"
    },
    subtitle: {
        fontSize: "14px",
        color: "#6b7280",
        marginBottom: "32px"
    },

    form: {
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e5e7eb"
    },
    label: {
        fontSize: "14px",
        fontWeight: "600",
        marginBottom: "8px",
        color: "#374151"
    },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        marginBottom: "20px",
        fontSize: "16px",
        fontFamily: "inherit"
    },
    submitButton: {
        background: "#000",
        color: "#fff",
        padding: "14px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "16px",
        marginTop: "10px",
        transition: "opacity 0.2s"
    },
    cancelButton: {
        background: "transparent",
        color: "#6b7280",
        padding: "10px",
        border: "none",
        cursor: "pointer",
        textAlign: "center",
        marginTop: "5px"
    }
};

export default AddRequest;